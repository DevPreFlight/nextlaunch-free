import { NextRequest, NextResponse } from 'next/server';
import { OutgoingWebhookService } from '@/services';
import { z } from 'zod';

const createEndpointSchema = z.object({
  workspaceId: z.string().min(1),
  url: z.string().url(),
  description: z.string().optional(),
  events: z.array(z.string()).default(['*']),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workspaceId = searchParams.get('workspaceId');

    if (!workspaceId) {
      return NextResponse.json({ error: 'workspaceId query parameter is required' }, { status: 400 });
    }

    const endpoints = await OutgoingWebhookService.listEndpoints(workspaceId);
    return NextResponse.json({ data: endpoints });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to list webhook endpoints';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createEndpointSchema.parse(body);

    const endpoint = await OutgoingWebhookService.createEndpoint(validated);
    return NextResponse.json({ data: endpoint }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.format() }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : 'Failed to create webhook endpoint';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
