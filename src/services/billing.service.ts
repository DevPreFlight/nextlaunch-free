import { payment, CreateCheckoutParams } from '@/lib/payments';
import { db } from '@/lib/db';
import { SubscriptionStatus } from '@prisma/client';

export interface SyncSubscriptionParams {
  provider: 'polar' | 'stripe' | 'midtrans';
  workspaceId?: string;
  customerId?: string | null;
  subscriptionId?: string | null;
  plan?: string;
  status: SubscriptionStatus;
  currentPeriodEnd?: Date | null;
}

export class BillingService {
  /**
   * Initiates a checkout session via the configured payment provider (Polar, Stripe, or Midtrans)
   */
  async createCheckoutSession(params: CreateCheckoutParams) {
    try {
      return await payment.createCheckoutSession(params);
    } catch (error: unknown) {
      const err = error as Error;
      console.error('[BillingService] Checkout session creation error:', err);
      return { success: false, error: err.message || 'Unable to initiate checkout' };
    }
  }

  /**
   * Generates a Customer Portal URL session for subscription management
   */
  async createCustomerPortalSession(customerId: string) {
    try {
      return await payment.createCustomerPortalSession(customerId);
    } catch (error: unknown) {
      const err = error as Error;
      console.error('[BillingService] Customer portal session error:', err);
      return { success: false, error: err.message || 'Unable to open billing portal' };
    }
  }

  /**
   * Fetches the billing details and subscription status of a workspace
   */
  async getWorkspaceBillingStatus(workspaceId: string) {
    try {
      const workspace = await db.workspace.findUnique({
        where: { id: workspaceId },
        select: {
          id: true,
          name: true,
          plan: true,
          subscriptionStatus: true,
          currentPeriodEnd: true,
          polarCustomerId: true,
          polarSubscriptionId: true,
          stripeCustomerId: true,
          stripeSubscriptionId: true,
        },
      });

      return { success: true, workspace };
    } catch (error: unknown) {
      const err = error as Error;
      console.error('[BillingService] Fetch workspace billing error:', err);
      return { success: false, error: err.message };
    }
  }

  /**
   * Synchronizes active or updated subscription state from webhook events (Polar / Stripe)
   */
  async syncSubscriptionState({
    provider,
    workspaceId,
    customerId,
    subscriptionId,
    plan = 'pro',
    status,
    currentPeriodEnd,
  }: SyncSubscriptionParams) {
    try {
      const updateData: Record<string, unknown> = {
        plan,
        subscriptionStatus: status,
        currentPeriodEnd: currentPeriodEnd ?? null,
      };

      if (provider === 'polar') {
        if (customerId) updateData.polarCustomerId = customerId;
        if (subscriptionId) updateData.polarSubscriptionId = subscriptionId;
      } else if (provider === 'stripe') {
        if (customerId) updateData.stripeCustomerId = customerId;
        if (subscriptionId) updateData.stripeSubscriptionId = subscriptionId;
      }

      if (workspaceId) {
        return await db.workspace.update({
          where: { id: workspaceId },
          data: updateData,
        });
      }

      // Fallback: look up workspace by provider customerId if workspaceId is not provided
      if (customerId) {
        const whereClause =
          provider === 'polar'
            ? { polarCustomerId: customerId }
            : { stripeCustomerId: customerId };

        const existingWorkspace = await db.workspace.findUnique({
          where: whereClause,
        });

        if (existingWorkspace) {
          return await db.workspace.update({
            where: { id: existingWorkspace.id },
            data: updateData,
          });
        }
      }

      console.warn(`[BillingService] No workspace found to update subscription for customer: ${customerId}`);
      return null;
    } catch (error: unknown) {
      const err = error as Error;
      console.error(`[BillingService] Failed to sync ${provider} subscription:`, err);
      throw err;
    }
  }

  /**
   * Cancels/Downgrades a workspace subscription to free tier
   */
  async cancelSubscription({
    provider,
    workspaceId,
    customerId,
  }: {
    provider: 'polar' | 'stripe';
    workspaceId?: string;
    customerId?: string | null;
  }) {
    try {
      if (workspaceId) {
        return await db.workspace.update({
          where: { id: workspaceId },
          data: {
            plan: 'free',
            subscriptionStatus: SubscriptionStatus.CANCELED,
          },
        });
      }

      if (customerId) {
        const whereClause =
          provider === 'polar'
            ? { polarCustomerId: customerId }
            : { stripeCustomerId: customerId };

        const workspace = await db.workspace.findUnique({
          where: whereClause,
        });

        if (workspace) {
          return await db.workspace.update({
            where: { id: workspace.id },
            data: {
              plan: 'free',
              subscriptionStatus: SubscriptionStatus.CANCELED,
            },
          });
        }
      }

      return null;
    } catch (error: unknown) {
      const err = error as Error;
      console.error(`[BillingService] Failed to cancel ${provider} subscription:`, err);
      throw err;
    }
  }
}

export const billingService = new BillingService();
