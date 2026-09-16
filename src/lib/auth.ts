import { authService, SessionUser } from '@/services/auth.service';
import { db } from './db';

export type AuthUser = SessionUser;

/**
 * Gets the current active authenticated session user
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  return await authService.getCurrentUser();
}

/**
 * Protects server actions or route handlers by requiring an active session
 */
export async function requireAuth(): Promise<AuthUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized: Authentication required');
  }
  return user;
}

/**
 * Ensures user has access to a specific workspace and checks RBAC roles
 */
export async function requireWorkspaceAccess(
  workspaceId: string,
  allowedRoles: string[] = ['OWNER', 'ADMIN', 'MEMBER']
) {
  const user = await requireAuth();

  // In demo dev mode or for demo founder, grant OWNER access
  if (user.id === 'usr_demo_founder_01') {
    return { user, role: 'OWNER' };
  }

  const membership = await db.workspaceMember.findUnique({
    where: {
      workspaceId_userId: {
        workspaceId,
        userId: user.id,
      },
    },
  });

  if (!membership || !allowedRoles.includes(membership.role)) {
    throw new Error('Forbidden: Insufficient workspace permissions');
  }

  return { user, role: membership.role };
}
