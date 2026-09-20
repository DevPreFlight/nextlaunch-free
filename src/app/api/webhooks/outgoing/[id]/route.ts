import { NextRequest, NextResponse } from 'next/server';
import { OutgoingWebhookService } from '@/services';
import { z } from 'zod';

const updateEndpointSchema = z.object({
  url: z.string().url().optional(),
  description: z.string().optional(),
  events: z.array(z.string()).optional(),
  enabled: z.boolean().optional(),
});

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const endpoint = await OutgoingWebhookService.getEndpoint(id);

    if (!endpoint) {
      return NextResponse.json({ error: 'Webhook endpoint not found' }, { status: 404 });
    }

    return NextResponse.json({ data: endpoint });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to get webhook endpoint';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validated = updateEndpointSchema.parse(body);

    const updated = await OutgoingWebhookService.updateEndpoint(id, validated);
    return NextResponse.json({ data: updated });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.format() }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : 'Failed to update webhook endpoint';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await OutgoingWebhookService.deleteEndpoint(id);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to delete webhook endpoint';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
