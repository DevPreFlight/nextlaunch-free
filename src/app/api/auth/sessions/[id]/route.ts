import { NextRequest, NextResponse } from 'next/server';
import { SessionService } from '@/services';
import { z } from 'zod';

const revokeSingleSchema = z.object({
  userId: z.string().min(1),
});

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: sessionId } = await params;
    const body = await request.json();
    const { userId } = revokeSingleSchema.parse(body);

    await SessionService.revokeSession(sessionId, userId);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.format() }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : 'Failed to revoke session';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
