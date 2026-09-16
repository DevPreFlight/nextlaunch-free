export interface CreateCheckoutParams {
  productId: string;
  workspaceId: string;
  customerEmail?: string;
  successUrl?: string;
  cancelUrl?: string;
}

export interface CheckoutResult {
  success: boolean;
  url?: string;
  snapToken?: string; // For Midtrans popup checkout
  error?: string;
}

export interface CustomerPortalResult {
  success: boolean;
  url?: string;
  error?: string;
}

export interface WebhookVerificationResult {
  isValid: boolean;
  eventType?: string;
  data?: any;
  error?: string;
}

export interface PaymentProvider {
  name: 'polar' | 'stripe' | 'midtrans';
  createCheckoutSession(params: CreateCheckoutParams): Promise<CheckoutResult>;
  createCustomerPortalSession(customerId: string): Promise<CustomerPortalResult>;
  verifyWebhook(req: Request, rawBody: string): Promise<WebhookVerificationResult>;
}
