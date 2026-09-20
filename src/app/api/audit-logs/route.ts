import { NextRequest, NextResponse } from 'next/server';
import { AuditLogService } from '@/services';
import { z } from 'zod';

const recordLogSchema = z.object({
  workspaceId: z.string().min(1),
  action: z.string().min(1),
  resource: z.string().min(1),
  resourceId: z.string().optional(),
  actorId: z.string().optional(),
  actorEmail: z.string().email().optional(),
  actorName: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workspaceId = searchParams.get('workspaceId');

    if (!workspaceId) {
      return NextResponse.json({ error: 'workspaceId query parameter is required' }, { status: 400 });
    }

    const action = searchParams.get('action') || undefined;
    const resource = searchParams.get('resource') || undefined;
    const actorId = searchParams.get('actorId') || undefined;
    const startDate = searchParams.get('startDate') || undefined;
    const endDate = searchParams.get('endDate') || undefined;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page')!, 10) : 1;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : 20;

    const result = await AuditLogService.listLogs({
      workspaceId,
      action,
      resource,
      actorId,
      startDate,
      endDate,
      page,
      limit,
    });

    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to query audit logs';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = recordLogSchema.parse(body);

    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    const userAgent = request.headers.get('user-agent') || 'Unknown';

    const log = await AuditLogService.record({
      ...validated,
      ipAddress,
      userAgent,
    });

    return NextResponse.json({ data: log }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.format() }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : 'Failed to record audit log';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
