import { NextRequest, NextResponse } from 'next/server';
import { SessionService } from '@/services';
import { cookies } from 'next/headers';
import { z } from 'zod';

const revokeOthersSchema = z.object({
  userId: z.string().min(1),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId parameter is required' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const currentSessionToken = cookieStore.get('nextlaunch_session')?.value;

    const sessions = await SessionService.listActiveSessions(userId, currentSessionToken);
    return NextResponse.json({ data: sessions });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to list sessions';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = revokeOthersSchema.parse(body);

    const cookieStore = await cookies();
    const currentSessionToken = cookieStore.get('nextlaunch_session')?.value;

    if (!currentSessionToken) {
      return NextResponse.json({ error: 'No active session token found' }, { status: 401 });
    }

    const result = await SessionService.revokeOtherSessions(userId, currentSessionToken);
    return NextResponse.json({ success: true, ...result });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.format() }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : 'Failed to revoke sessions';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
