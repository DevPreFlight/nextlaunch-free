import { NextRequest, NextResponse } from 'next/server';
import { AuditLogService } from '@/services';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workspaceId = searchParams.get('workspaceId');
    const format = (searchParams.get('format') || 'json') as 'json' | 'csv';

    if (!workspaceId) {
      return NextResponse.json({ error: 'workspaceId query parameter is required' }, { status: 400 });
    }

    const exportedData = await AuditLogService.exportLogs(workspaceId, format);

    if (format === 'csv') {
      return new NextResponse(exportedData, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="audit-logs-${workspaceId}-${Date.now()}.csv"`,
        },
      });
    }

    return new NextResponse(exportedData, {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Disposition': `attachment; filename="audit-logs-${workspaceId}-${Date.now()}.json"`,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to export audit logs';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
