import { NextRequest, NextResponse } from 'next/server';
import { TwoFactorService } from '@/services';
import { z } from 'zod';

const verifySchema = z.object({
  userId: z.string().min(1),
  code: z.string().min(1), // Can be 6-digit TOTP or backup recovery code
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, code } = verifySchema.parse(body);

    const result = await TwoFactorService.verifyLoginChallenge(userId, code);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid authentication code or recovery code.' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      usedBackupCode: result.usedBackupCode || false,
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.format() }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : 'Verification failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
