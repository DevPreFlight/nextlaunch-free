import { NextRequest, NextResponse } from 'next/server';
import { TwoFactorService } from '@/services';
import { z } from 'zod';

const enableSchema = z.object({
  userId: z.string().min(1),
  secret: z.string().min(1),
  token: z.string().length(6),
});

const disableSchema = z.object({
  userId: z.string().min(1),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId parameter is required' }, { status: 400 });
    }

    const setup = await TwoFactorService.initiateSetup(userId);
    return NextResponse.json({ data: setup });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to initiate 2FA setup';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, secret, token } = enableSchema.parse(body);

    const result = await TwoFactorService.enableTwoFactor(userId, secret, token);
    return NextResponse.json({ data: result });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.format() }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : 'Failed to enable 2FA';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = disableSchema.parse(body);

    await TwoFactorService.disableTwoFactor(userId);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to disable 2FA';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
