import { NextRequest, NextResponse } from 'next/server';
import { OutgoingWebhookService } from '@/services';

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ deliveryId: string }> }
) {
  try {
    const { deliveryId } = await params;
    const retryResult = await OutgoingWebhookService.retryDelivery(deliveryId);
    return NextResponse.json({ data: retryResult });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to retry webhook delivery';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
