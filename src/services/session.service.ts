import { prisma } from '@/lib/db';

export interface CreateSessionOptions {
  userId: string;
  sessionToken: string;
  expires: Date;
  ipAddress?: string;
  userAgent?: string;
}

export class SessionService {
  /**
   * Helper to parse user agent into a clean human-readable device string
   */
  static parseDevice(userAgent?: string | null): string {
    if (!userAgent) return 'Unknown Device';

    let os = 'Unknown OS';
    if (/iPhone|iPad|iPod/i.test(userAgent)) os = 'iOS';
    else if (/Android/i.test(userAgent)) os = 'Android';
    else if (/Macintosh|Mac OS X/i.test(userAgent)) os = 'macOS';
    else if (/Windows NT/i.test(userAgent)) os = 'Windows';
    else if (/Linux/i.test(userAgent)) os = 'Linux';


    let browser = 'Browser';
    if (/Chrome/i.test(userAgent) && !/Edg|OPR/i.test(userAgent)) browser = 'Chrome';
    else if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) browser = 'Safari';
    else if (/Firefox/i.test(userAgent)) browser = 'Firefox';
    else if (/Edg/i.test(userAgent)) browser = 'Edge';
    else if (/OPR|Opera/i.test(userAgent)) browser = 'Opera';

    return `${os} • ${browser}`;
  }

  /**
   * Creates a session with device and telemetry metadata
   */
  static async createSession(options: CreateSessionOptions) {
    const device = this.parseDevice(options.userAgent);

    return prisma.session.create({
      data: {
        userId: options.userId,
        sessionToken: options.sessionToken,
        expires: options.expires,
        ipAddress: options.ipAddress,
        userAgent: options.userAgent,
        device,
        lastActiveAt: new Date(),
      },
    });
  }

  /**
   * Lists active sessions for a user and flags the current session
   */
  static async listActiveSessions(userId: string, currentSessionToken?: string) {
    const sessions = await prisma.session.findMany({
      where: {
        userId,
        expires: { gt: new Date() },
      },
      orderBy: { lastActiveAt: 'desc' },
      select: {
        id: true,
        sessionToken: true,
        ipAddress: true,
        userAgent: true,
        device: true,
        lastActiveAt: true,
        expires: true,
      },
    });

    return sessions.map((s) => ({
      id: s.id,
      device: s.device || this.parseDevice(s.userAgent),
      ipAddress: s.ipAddress || 'Unknown IP',
      lastActiveAt: s.lastActiveAt,
      expires: s.expires,
      isCurrent: currentSessionToken ? s.sessionToken === currentSessionToken : false,
    }));
  }

  /**
   * Revokes a specific session belonging to a user
   */
  static async revokeSession(sessionId: string, userId: string) {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session || session.userId !== userId) {
      throw new Error('Session not found or unauthorized');
    }

    return prisma.session.delete({
      where: { id: sessionId },
    });
  }

  /**
   * Revokes all other sessions for a user except the active current session
   */
  static async revokeOtherSessions(userId: string, currentSessionToken: string) {
    const result = await prisma.session.deleteMany({
      where: {
        userId,
        sessionToken: { not: currentSessionToken },
      },
    });

    return {
      revokedCount: result.count,
    };
  }
}
