import Stripe from 'stripe';
import {
  PaymentProvider,
  CreateCheckoutParams,
  CheckoutResult,
  CustomerPortalResult,
  WebhookVerificationResult,
} from './types';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';

export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      typescript: true,
    })
  : null;

export const stripeProvider: PaymentProvider = {
  name: 'stripe',

  async createCheckoutSession(params: CreateCheckoutParams): Promise<CheckoutResult> {
    try {
      const origin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const successUrl = params.successUrl || `${origin}/${params.workspaceId}/billing?session_id={CHECKOUT_SESSION_ID}&success=true`;
      const cancelUrl = params.cancelUrl || `${origin}/${params.workspaceId}/billing?canceled=true`;

      if (!stripe) {
        console.warn('[Stripe Adapter] STRIPE_SECRET_KEY not configured.');
        return {
          success: false,
          error: 'STRIPE_SECRET_KEY is not configured in environment variables.',
        };
      }

      // Check if productId is a Stripe Price ID or identifier
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price: params.productId,
            quantity: 1,
          },
        ],
        customer_email: params.customerEmail,
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          workspaceId: params.workspaceId,
        },
        subscription_data: {
          metadata: {
            workspaceId: params.workspaceId,
          },
        },
      });

      if (!session.url) {
        throw new Error('Failed to generate Stripe checkout session URL');
      }

      return {
        success: true,
        url: session.url,
      };
    } catch (error: unknown) {
      const err = error as Error;
      console.error('[Stripe Payment Adapter Error]:', err);
      return { success: false, error: err.message };
    }
  },

  async createCustomerPortalSession(customerId: string): Promise<CustomerPortalResult> {
    try {
      if (!stripe) {
        return { success: false, error: 'STRIPE_SECRET_KEY is not configured' };
      }

      const origin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${origin}/`,
      });

      return {
        success: true,
        url: portalSession.url,
      };
    } catch (error: unknown) {
      const err = error as Error;
      console.error('[Stripe Portal Adapter Error]:', err);
      return { success: false, error: err.message };
    }
  },

  async verifyWebhook(req: Request, rawBody: string): Promise<WebhookVerificationResult> {
    try {
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
      if (!webhookSecret || !stripe) {
        return { isValid: false, error: 'STRIPE_WEBHOOK_SECRET or STRIPE_SECRET_KEY is not configured' };
      }

      const sig = req.headers.get('stripe-signature') || '';
      if (!sig) {
        return { isValid: false, error: 'Missing stripe-signature header' };
      }

      const event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);

      return {
        isValid: true,
        eventType: event.type,
        data: event.data.object,
      };
    } catch (error: unknown) {
      const err = error as Error;
      console.error('[Stripe Webhook Signature Verification Error]:', err.message);
      return { isValid: false, error: err.message };
    }
  },
};
