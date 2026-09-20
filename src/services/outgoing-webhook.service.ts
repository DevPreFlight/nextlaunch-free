import crypto from 'crypto';
import { prisma } from '@/lib/db';
import { WebhookDeliveryStatus, Prisma } from '@prisma/client';


export interface CreateEndpointInput {
  workspaceId: string;
  url: string;
  description?: string;
  events: string[];
}

export interface UpdateEndpointInput {
  url?: string;
  description?: string;
  events?: string[];
  enabled?: boolean;
}

export interface WebhookPayload<T = unknown> {
  id: string;
  type: string;
  created_at: string;
  workspace_id: string;
  data: T;
}

export class OutgoingWebhookService {
  /**
   * Generates a secure random webhook signing secret prefixed with `whsec_`
   */
  static generateSecret(): string {
    const bytes = crypto.randomBytes(24);
    return `whsec_${bytes.toString('base64url')}`;
  }

  /**
   * Signs a payload using HMAC-SHA256 according to Standard Webhooks format
   * Signature header format: v1,<base64_hmac>
   */
  static signPayload(secret: string, payloadString: string, timestamp: number, eventId: string): string {
    // Secret without prefix if present
    const rawSecret = secret.startsWith('whsec_') ? secret.slice(6) : secret;
    const toSign = `${eventId}.${timestamp}.${payloadString}`;
    const hmac = crypto
      .createHmac('sha256', Buffer.from(rawSecret, 'utf-8'))
      .update(toSign)
      .digest('base64');
    return `v1,${hmac}`;
  }

  /**
   * Verifies standard webhook signature
   */
  static verifySignature(
    secret: string,
    payloadString: string,
    signatureHeader: string,
    timestamp: number,
    eventId: string,
    toleranceSeconds = 300
  ): boolean {
    const now = Math.floor(Date.now() / 1000);
    if (Math.abs(now - timestamp) > toleranceSeconds) {
      return false;
    }

    const expectedSignature = this.signPayload(secret, payloadString, timestamp, eventId);

    // Split and find v1 signature
    const signatures = signatureHeader.split(' ');
    for (const sig of signatures) {
      if (sig === expectedSignature) {
        return true;
      }
    }
    return false;
  }

  /**
   * Create new webhook endpoint for a workspace
   */
  static async createEndpoint(input: CreateEndpointInput) {
    const secret = this.generateSecret();
    return prisma.webhookEndpoint.create({
      data: {
        workspaceId: input.workspaceId,
        url: input.url,
        description: input.description,
        events: input.events.length === 0 ? ['*'] : input.events,
        secret,
        enabled: true,
      },
    });
  }

  /**
   * Update existing webhook endpoint
   */
  static async updateEndpoint(endpointId: string, input: UpdateEndpointInput) {
    return prisma.webhookEndpoint.update({
      where: { id: endpointId },
      data: {
        ...(input.url !== undefined && { url: input.url }),
        ...(input.description !== undefined && { description: input.description }),
        ...(input.events !== undefined && { events: input.events }),
        ...(input.enabled !== undefined && { enabled: input.enabled }),
      },
    });
  }

  /**
   * Delete webhook endpoint
   */
  static async deleteEndpoint(endpointId: string) {
    return prisma.webhookEndpoint.delete({
      where: { id: endpointId },
    });
  }

  /**
   * Get single webhook endpoint by ID
   */
  static async getEndpoint(endpointId: string) {
    return prisma.webhookEndpoint.findUnique({
      where: { id: endpointId },
      include: {
        deliveries: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });
  }

  /**
   * List all webhook endpoints for a workspace
   */
  static async listEndpoints(workspaceId: string) {
    return prisma.webhookEndpoint.findMany({
      where: { workspaceId },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { deliveries: true },
        },
      },
    });
  }

  /**
   * Deliver webhook payload to a specific endpoint
   */
  static async deliverToEndpoint(
    endpoint: { id: string; url: string; secret: string },
    eventId: string,
    eventType: string,
    payload: WebhookPayload
  ) {
    const timestamp = Math.floor(Date.now() / 1000);
    const payloadString = JSON.stringify(payload);
    const signature = this.signPayload(endpoint.secret, payloadString, timestamp, eventId);

    const startTime = Date.now();
    let statusCode: number | null = null;
    let responseBody: string | null = null;
    let errorMsg: string | null = null;
    let status: WebhookDeliveryStatus = WebhookDeliveryStatus.FAILED;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const response = await fetch(endpoint.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'NextLaunch-Webhook/1.0',
          'webhook-id': eventId,
          'webhook-timestamp': timestamp.toString(),
          'webhook-signature': signature,
        },
        body: payloadString,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      statusCode = response.status;
      const responseText = await response.text();
      responseBody = responseText.slice(0, 1000); // truncate if long

      if (response.ok) {
        status = WebhookDeliveryStatus.SUCCESS;
      } else {
        errorMsg = `HTTP Error ${response.status}: ${response.statusText}`;
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        errorMsg = err.message;
      } else {
        errorMsg = 'Unknown network error';
      }
    }

    const durationMs = Date.now() - startTime;

    // Record delivery attempt in database
    return prisma.webhookDelivery.create({
      data: {
        endpointId: endpoint.id,
        eventId,
        eventType,
        payload: payload as unknown as Prisma.InputJsonValue,
        statusCode,
        responseBody,
        error: errorMsg,
        durationMs,
        status,
        attempts: 1,
      },
    });

  }

  /**
   * Dispatches a webhook event to all subscribed endpoints in a workspace
   */
  static async dispatchEvent<T = unknown>(workspaceId: string, eventType: string, data: T) {
    const endpoints = await prisma.webhookEndpoint.findMany({
      where: {
        workspaceId,
        enabled: true,
      },
    });

    if (endpoints.length === 0) {
      return [];
    }

    const eventId = `evt_${crypto.randomBytes(12).toString('hex')}`;
    const payload: WebhookPayload<T> = {
      id: eventId,
      type: eventType,
      created_at: new Date().toISOString(),
      workspace_id: workspaceId,
      data,
    };

    // Filter endpoints that subscribe to this event or wildcard '*'
    const targetEndpoints = endpoints.filter((ep) => {
      return ep.events.includes('*') || ep.events.includes(eventType);
    });

    const deliveries = await Promise.allSettled(
      targetEndpoints.map((ep) => this.deliverToEndpoint(ep, eventId, eventType, payload))
    );

    return deliveries;
  }

  /**
   * Retry a failed webhook delivery
   */
  static async retryDelivery(deliveryId: string) {
    const existing = await prisma.webhookDelivery.findUnique({
      where: { id: deliveryId },
      include: { endpoint: true },
    });

    if (!existing) {
      throw new Error(`Webhook delivery with id ${deliveryId} not found`);
    }

    const endpoint = existing.endpoint;
    const timestamp = Math.floor(Date.now() / 1000);
    const payloadString = JSON.stringify(existing.payload);
    const signature = this.signPayload(endpoint.secret, payloadString, timestamp, existing.eventId);

    const startTime = Date.now();
    let statusCode: number | null = null;
    let responseBody: string | null = null;
    let errorMsg: string | null = null;
    let status: WebhookDeliveryStatus = WebhookDeliveryStatus.FAILED;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(endpoint.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'NextLaunch-Webhook/1.0',
          'webhook-id': existing.eventId,
          'webhook-timestamp': timestamp.toString(),
          'webhook-signature': signature,
        },
        body: payloadString,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      statusCode = response.status;
      const text = await response.text();
      responseBody = text.slice(0, 1000);

      if (response.ok) {
        status = WebhookDeliveryStatus.SUCCESS;
      } else {
        errorMsg = `HTTP Error ${response.status}: ${response.statusText}`;
      }
    } catch (err: unknown) {
      errorMsg = err instanceof Error ? err.message : 'Unknown network error';
    }

    const durationMs = Date.now() - startTime;

    return prisma.webhookDelivery.update({
      where: { id: deliveryId },
      data: {
        statusCode,
        responseBody,
        error: errorMsg,
        durationMs,
        status,
        attempts: { increment: 1 },
      },
    });
  }
}
