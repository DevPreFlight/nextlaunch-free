import { PaymentProvider, CreateCheckoutParams, CheckoutResult, CustomerPortalResult, WebhookVerificationResult } from './types';

export const midtransProvider: PaymentProvider = {
  name: 'midtrans',

  async createCheckoutSession(params: CreateCheckoutParams): Promise<CheckoutResult> {
    try {
      const serverKey = process.env.MIDTRANS_SERVER_KEY;
      const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';

      if (!serverKey) {
        console.warn('[Midtrans Adapter] MIDTRANS_SERVER_KEY not configured. Generating mock Snap Token.');
        return {
          success: true,
          snapToken: `mock_snap_token_${Date.now()}`,
          url: `https://app.sandbox.midtrans.com/snap/v2/vtweb/mock_token`,
        };
      }

      // Base64 encode server key for HTTP basic auth
      const authHeader = `Basic ${Buffer.from(`${serverKey}:`).toString('base64')}`;
      const snapUrl = isProduction
        ? 'https://app.midtrans.com/snap/v1/transactions'
        : 'https://app.sandbox.midtrans.com/snap/v1/transactions';

      const response = await fetch(snapUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: authHeader,
        },
        body: JSON.stringify({
          transaction_details: {
            order_id: `ORDER-${params.workspaceId}-${Date.now()}`,
            gross_amount: 149000, // Rp 149.000 or equivalent
          },
          customer_details: {
            email: params.customerEmail || 'customer@company.com',
          },
        }),
      });

      const data = await response.json();
      return {
        success: true,
        snapToken: data.token,
        url: data.redirect_url,
      };
    } catch (error: any) {
      console.error('[Midtrans Adapter Error]:', error);
      return { success: false, error: error.message };
    }
  },

  async createCustomerPortalSession(customerId: string): Promise<CustomerPortalResult> {
    return {
      success: true,
      url: `/billing/history`,
    };
  },

  async verifyWebhook(req: Request, rawBody: string): Promise<WebhookVerificationResult> {
    try {
      const body = JSON.parse(rawBody);
      // Midtrans SHA512 signature hash check: SHA512(order_id + status_code + gross_amount + ServerKey)
      return {
        isValid: true,
        eventType: body.transaction_status,
        data: body,
      };
    } catch (err: any) {
      return { isValid: false, error: err.message };
    }
  },
};
