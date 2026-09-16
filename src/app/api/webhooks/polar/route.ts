import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'standardwebhooks';
import { billingService } from '@/services/billing.service';
import { webhookEventService } from '@/services/webhook-event.service';
import { SubscriptionStatus } from '@prisma/client';

const webhookSecret = process.env.POLAR_WEBHOOK_SECRET || '';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const webhookHeaders = {
      'webhook-id': req.headers.get('webhook-id') || '',
      'webhook-timestamp': req.headers.get('webhook-timestamp') || '',
      'webhook-signature': req.headers.get('webhook-signature') || '',
    };

    if (!webhookSecret) {
      console.warn('[Polar Webhook] POLAR_WEBHOOK_SECRET is not configured in environment variables');
      return NextResponse.json({ error: 'Webhook secret misconfigured' }, { status: 500 });
    }

    // Verify cryptographic signature via Standard Webhooks
    const wh = new Webhook(webhookSecret);
    let event: any;
    try {
      event = wh.verify(rawBody, webhookHeaders);
    } catch (err: any) {
      console.error('[Polar Webhook Signature Verification Failed]:', err.message);
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
    }

    const { type, data } = event;
    const eventId = data?.id || event.id || `${type}-${Date.now()}`;
    console.log(`[Polar Webhook] Processing event: ${type}`);

    // Store raw event log via centralized service for audit trails
    await webhookEventService.logEvent({
      eventId,
      eventType: type,
      payload: data,
    });

    // Handle Polar Lifecycle Events via Billing Service
    switch (type) {
      case 'subscription.created':
      case 'subscription.updated':
      case 'subscription.active': {
        const workspaceId = data.metadata?.workspaceId || data.custom_field_data?.workspaceId;
        const customerId = data.customer_id;
        const subscriptionId = data.id;
        const status =
          data.status === 'active'
            ? SubscriptionStatus.ACTIVE
            : data.status === 'past_due'
            ? SubscriptionStatus.PAST_DUE
            : SubscriptionStatus.ACTIVE;
        const periodEnd = data.current_period_end ? new Date(data.current_period_end) : null;

        await billingService.syncSubscriptionState({
          provider: 'polar',
          workspaceId,
          customerId,
          subscriptionId,
          plan: 'pro',
          status,
          currentPeriodEnd: periodEnd,
        });
        console.log(`[Polar Webhook] Synced workspace ${workspaceId || customerId} to PRO plan`);
        break;
      }

      case 'subscription.canceled':
      case 'subscription.revoked': {
        const workspaceId = data.metadata?.workspaceId || data.custom_field_data?.workspaceId;
        const customerId = data.customer_id;

        await billingService.cancelSubscription({
          provider: 'polar',
          workspaceId,
          customerId,
        });
        console.log(`[Polar Webhook] Downgraded workspace ${workspaceId || customerId} to FREE plan`);
        break;
      }

      case 'order.created': {
        console.log(`[Polar Webhook] Order created for customer ${data.customer_id}`);
        break;
      }

      default:
        console.log(`[Polar Webhook] Unhandled event type: ${type}`);
    }

    return NextResponse.json({ received: true, type });
  } catch (error: any) {
    console.error('[Polar Webhook Handler Error]:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
