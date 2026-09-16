import { db } from '@/lib/db';
import { Prisma } from '@prisma/client';

export interface LogWebhookEventParams {
  eventId: string;
  eventType: string;
  payload: Prisma.InputJsonValue | Record<string, unknown>;
}

export class WebhookEventService {
  /**
   * Records or updates a webhook event in the database for auditing and idempotency
   */
  async logEvent({ eventId, eventType, payload }: LogWebhookEventParams) {
    try {
      return await db.webhookEvent.upsert({
        where: { eventId },
        update: { processedAt: new Date() },
        create: {
          eventId,
          eventType,
          payload: payload as Prisma.InputJsonValue,
        },
      });
    } catch (error: unknown) {
      const err = error as Error;
      console.warn(`[WebhookEventService] Could not persist webhook event log ${eventId}:`, err?.message);
      return null;
    }
  }

  /**
   * Retrieves recent webhook events for admin monitoring
   */
  async getRecentEvents(limit: number = 20) {
    try {
      return await db.webhookEvent.findMany({
        take: limit,
        orderBy: { createdAt: 'desc' },
      });
    } catch (error: unknown) {
      console.error('[WebhookEventService] Failed to fetch webhook events:', error);
      return [];
    }
  }
}

export const webhookEventService = new WebhookEventService();
