import { NextRequest, NextResponse } from 'next/server';
import { stripeProvider } from '@/lib/payments/stripe';
import { billingService } from '@/services/billing.service';
import { webhookEventService } from '@/services/webhook-event.service';
import { SubscriptionStatus, Prisma } from '@prisma/client';
import type Stripe from 'stripe';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const verification = await stripeProvider.verifyWebhook(req, rawBody);

    if (!verification.isValid || !verification.data) {
      console.error('[Stripe Webhook Error]:', verification.error);
      return NextResponse.json({ error: verification.error || 'Invalid signature' }, { status: 400 });
    }

    const eventType = verification.eventType || '';
    const eventObject = verification.data;
    const eventId = (eventObject?.id as string) || `evt_${Date.now()}`;

    console.log(`[Stripe Webhook] Received event: ${eventType} (ID: ${eventId})`);

    // Store raw event log via centralized service for audit trails
    await webhookEventService.logEvent({
      eventId,
      eventType,
      payload: eventObject as Prisma.InputJsonValue,
    });

    // Handle Stripe Lifecycle Events
    switch (eventType) {
      case 'checkout.session.completed': {
        const session = eventObject as Stripe.Checkout.Session;
        const workspaceId = session.metadata?.workspaceId;
        const customerId =
          typeof session.customer === 'string'
            ? session.customer
            : session.customer?.id || null;
        const subscriptionId =
          typeof session.subscription === 'string'
            ? session.subscription
            : session.subscription?.id || null;

        if (workspaceId || customerId) {
          await billingService.syncSubscriptionState({
            provider: 'stripe',
            workspaceId,
            customerId,
            subscriptionId,
            plan: 'pro',
            status: SubscriptionStatus.ACTIVE,
          });
          console.log(`[Stripe Webhook] Workspace ${workspaceId || customerId} activated via checkout session.`);
        }
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = eventObject as Stripe.Subscription;
        const workspaceId = subscription.metadata?.workspaceId;
        const customerId =
          typeof subscription.customer === 'string'
            ? sessionCustomer(subscription.customer)
            : null;
        const subscriptionId = subscription.id;

        // Map Stripe status to Prisma SubscriptionStatus enum
        let status: SubscriptionStatus = SubscriptionStatus.ACTIVE;
        if (subscription.status === 'active') status = SubscriptionStatus.ACTIVE;
        else if (subscription.status === 'trialing') status = SubscriptionStatus.TRIALING;
        else if (subscription.status === 'past_due') status = SubscriptionStatus.PAST_DUE;
        else if (subscription.status === 'canceled') status = SubscriptionStatus.CANCELED;
        else if (subscription.status === 'unpaid') status = SubscriptionStatus.UNPAID;
        else if (subscription.status === 'incomplete') status = SubscriptionStatus.INCOMPLETE;
        else if (subscription.status === 'incomplete_expired') status = SubscriptionStatus.INCOMPLETE_EXPIRED;

        const periodEndTimestamp = (subscription as unknown as { current_period_end?: number })?.current_period_end;
        const periodEnd = periodEndTimestamp ? new Date(periodEndTimestamp * 1000) : null;
        const isPlanActive = status === SubscriptionStatus.ACTIVE || status === SubscriptionStatus.TRIALING;

        await billingService.syncSubscriptionState({
          provider: 'stripe',
          workspaceId,
          customerId,
          subscriptionId,
          plan: isPlanActive ? 'pro' : 'free',
          status,
          currentPeriodEnd: periodEnd,
        });
        console.log(`[Stripe Webhook] Updated subscription for workspace ${workspaceId || customerId} to status: ${status}`);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = eventObject as Stripe.Subscription;
        const workspaceId = subscription.metadata?.workspaceId;
        const customerId =
          typeof subscription.customer === 'string'
            ? sessionCustomer(subscription.customer)
            : null;

        await billingService.cancelSubscription({
          provider: 'stripe',
          workspaceId,
          customerId,
        });
        console.log(`[Stripe Webhook] Canceled subscription for workspace ${workspaceId || customerId}`);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = eventObject as Stripe.Invoice;
        console.log(`[Stripe Webhook] Invoice ${invoice.id} payment succeeded for customer ${invoice.customer}`);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = eventObject as Stripe.Invoice;
        console.warn(`[Stripe Webhook] Invoice ${invoice.id} payment failed for customer ${invoice.customer}`);
        break;
      }

      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${eventType}`);
    }

    return NextResponse.json({ received: true, type: eventType });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('[Stripe Webhook Handler Critical Error]:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

function sessionCustomer(customer: string | Stripe.Customer | Stripe.DeletedCustomer | null): string | null {
  if (!customer) return null;
  if (typeof customer === 'string') return customer;
  return customer.id || null;
}
