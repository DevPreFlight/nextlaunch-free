'use server';

import { billingService } from '@/services/billing.service';
import type { CreateCheckoutParams } from '@/lib/payments';

/**
 * Server Action: Creates a hosted checkout session using the active Payment Provider (Polar/Stripe/Midtrans)
 */
export async function createCheckoutSessionAction(params: CreateCheckoutParams) {
  return await billingService.createCheckoutSession(params);
}

/**
 * Server Action: Generates a Customer Portal session for managing subscriptions
 */
export async function createCustomerPortalSessionAction(customerId: string) {
  return await billingService.createCustomerPortalSession(customerId);
}

/**
 * Server Action: Retrieves workspace subscription details
 */
export async function getWorkspaceBillingStatus(workspaceId: string) {
  return await billingService.getWorkspaceBillingStatus(workspaceId);
}
