import { cookies } from 'next/headers';

export interface ImpersonationSessionData {
  impersonatedUserId: string;
  impersonatedEmail: string;
  impersonatedWorkspaceId: string;
  startedAt: string;
}

const COOKIE_NAME = 'nextlaunch_impersonation';
const MAX_AGE_SECONDS = 60 * 60 * 2; // 2 hours

export class ImpersonationService {
  /**
   * Starts an impersonation session by issuing a secure HttpOnly cookie
   */
  async startSession(targetUserId: string, targetEmail: string, targetWorkspaceId: string) {
    const cookieStore = await cookies();

    const sessionData: ImpersonationSessionData = {
      impersonatedUserId: targetUserId,
      impersonatedEmail: targetEmail,
      impersonatedWorkspaceId: targetWorkspaceId,
      startedAt: new Date().toISOString(),
    };

    cookieStore.set(COOKIE_NAME, JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: MAX_AGE_SECONDS,
      path: '/',
    });

    return { success: true, redirectUrl: `/${targetWorkspaceId}` };
  }

  /**
   * Terminates active impersonation session
   */
  async stopSession() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
    return { success: true, redirectUrl: '/admin' };
  }

  /**
   * Retrieves active impersonation session metadata if present
   */
  async getSession(): Promise<ImpersonationSessionData | null> {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(COOKIE_NAME);
    if (!cookie?.value) return null;

    try {
      return JSON.parse(cookie.value) as ImpersonationSessionData;
    } catch {
      return null;
    }
  }
}

export const impersonationService = new ImpersonationService();
