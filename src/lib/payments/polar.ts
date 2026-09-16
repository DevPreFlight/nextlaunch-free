import { Polar } from '@polar-sh/sdk';
import { Webhook } from 'standardwebhooks';
import { PaymentProvider, CreateCheckoutParams, CheckoutResult, CustomerPortalResult, WebhookVerificationResult } from './types';

const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN || '',
  server: process.env.POLAR_ENVIRONMENT === 'sandbox' ? 'sandbox' : 'production',
});

export const polarProvider: PaymentProvider = {
  name: 'polar',

  async createCheckoutSession(params: CreateCheckoutParams): Promise<CheckoutResult> {
    try {
      const origin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const redirectTarget = params.successUrl || `${origin}/${params.workspaceId}/billing?success=true`;

      const checkout = await polarClient.checkouts.create({
        products: [params.productId],
        customerEmail: params.customerEmail || undefined,
        successUrl: redirectTarget,
        metadata: {
          workspaceId: params.workspaceId,
        },
      });

      if (!checkout.url) {
        throw new Error('Failed to generate Polar checkout URL');
      }

      return { success: true, url: checkout.url };
    } catch (error: any) {
      console.error('[Polar Payment Adapter Error]:', error);
      return { success: false, error: error.message };
    }
  },

  async createCustomerPortalSession(customerId: string): Promise<CustomerPortalResult> {
    try {
      const session = await polarClient.customerSessions.create({
        customerId,
      });

      if (!session.customerPortalUrl) {
        throw new Error('Customer portal session failed to generate');
      }

      return { success: true, url: session.customerPortalUrl };
    } catch (error: any) {
      console.error('[Polar Portal Adapter Error]:', error);
      return { success: false, error: error.message };
    }
  },

  async verifyWebhook(req: Request, rawBody: string): Promise<WebhookVerificationResult> {
    try {
      const webhookSecret = process.env.POLAR_WEBHOOK_SECRET || '';
      if (!webhookSecret) {
        return { isValid: false, error: 'POLAR_WEBHOOK_SECRET is not configured' };
      }

      const headers = {
        'webhook-id': req.headers.get('webhook-id') || '',
        'webhook-timestamp': req.headers.get('webhook-timestamp') || '',
        'webhook-signature': req.headers.get('webhook-signature') || '',
      };

      const wh = new Webhook(webhookSecret);
      const event: any = wh.verify(rawBody, headers);

      return {
        isValid: true,
        eventType: event.type,
        data: event.data,
      };
    } catch (err: any) {
      return { isValid: false, error: err.message };
    }
  },
};
