import { prisma } from '@/lib/db';
import { Prisma } from '@prisma/client';

export interface RecordAuditLogInput {
  workspaceId: string;
  action: string;
  resource: string;
  resourceId?: string;
  actorId?: string;
  actorEmail?: string;
  actorName?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

export interface ListAuditLogsOptions {
  workspaceId: string;
  action?: string;
  resource?: string;
  actorId?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  page?: number;
  limit?: number;
}

export class AuditLogService {
  /**
   * Records an audit log event in the workspace audit trail
   */
  static async record(input: RecordAuditLogInput) {
    let actorEmail = input.actorEmail;
    let actorName = input.actorName;

    // If actorId provided but name/email missing, resolve user info
    if (input.actorId && (!actorEmail || !actorName)) {
      try {
        const user = await prisma.user.findUnique({
          where: { id: input.actorId },
          select: { email: true, name: true },
        });
        if (user) {
          actorEmail = actorEmail || user.email;
          actorName = actorName || user.name || user.email;
        }
      } catch {
        // Non-blocking fallback
      }
    }

    return prisma.auditLog.create({
      data: {
        workspaceId: input.workspaceId,
        action: input.action,
        resource: input.resource,
        resourceId: input.resourceId,
        actorId: input.actorId,
        actorEmail,
        actorName,
        metadata: input.metadata as unknown as Prisma.InputJsonValue,
        ipAddress: input.ipAddress,
        userAgent: input.userAgent,
      },
    });
  }

  /**
   * Queries audit logs with filtering and pagination
   */
  static async listLogs(options: ListAuditLogsOptions) {
    const page = Math.max(1, options.page || 1);
    const limit = Math.min(100, Math.max(1, options.limit || 20));
    const skip = (page - 1) * limit;

    const where: Prisma.AuditLogWhereInput = {
      workspaceId: options.workspaceId,
    };

    if (options.action) {
      where.action = options.action;
    }

    if (options.resource) {
      where.resource = options.resource;
    }

    if (options.actorId) {
      where.actorId = options.actorId;
    }

    if (options.startDate || options.endDate) {
      where.createdAt = {};
      if (options.startDate) {
        where.createdAt.gte = new Date(options.startDate);
      }
      if (options.endDate) {
        where.createdAt.lte = new Date(options.endDate);
      }
    }

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.auditLog.count({ where }),
    ]);

    return {
      logs,
      total,
      totalPages: Math.ceil(total / limit),
      page,
      limit,
    };
  }

  /**
   * Gets log summary statistics for security dashboards
   */
  static async getStats(workspaceId: string) {
    const [totalLogs, actionCounts] = await Promise.all([
      prisma.auditLog.count({ where: { workspaceId } }),
      prisma.auditLog.groupBy({
        by: ['action'],
        where: { workspaceId },
        _count: { action: true },
        orderBy: { _count: { action: 'desc' } },
        take: 5,
      }),
    ]);

    return {
      totalLogs,
      topActions: actionCounts.map((a) => ({
        action: a.action,
        count: a._count.action,
      })),
    };
  }

  /**
   * Exports workspace audit logs for compliance, SOC2, or SIEM ingest
   */
  static async exportLogs(workspaceId: string, format: 'json' | 'csv' = 'json') {
    const logs = await prisma.auditLog.findMany({
      where: { workspaceId },
      orderBy: { createdAt: 'desc' },
      take: 10000,
    });

    if (format === 'json') {
      return JSON.stringify(logs, null, 2);
    }

    // CSV format
    const headers = [
      'ID',
      'Timestamp',
      'Action',
      'Resource',
      'Resource ID',
      'Actor ID',
      'Actor Name',
      'Actor Email',
      'IP Address',
      'User Agent',
      'Metadata',
    ];

    const escapeCsv = (val: unknown) => {
      if (val === null || val === undefined) return '""';
      const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
      return `"${str.replace(/"/g, '""')}"`;
    };

    const rows = logs.map((log) => [
      escapeCsv(log.id),
      escapeCsv(log.createdAt.toISOString()),
      escapeCsv(log.action),
      escapeCsv(log.resource),
      escapeCsv(log.resourceId),
      escapeCsv(log.actorId),
      escapeCsv(log.actorName),
      escapeCsv(log.actorEmail),
      escapeCsv(log.ipAddress),
      escapeCsv(log.userAgent),
      escapeCsv(log.metadata),
    ]);

    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  }
}
