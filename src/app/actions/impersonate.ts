'use server';

import { impersonationService } from '@/services/impersonation.service';

/**
 * Superadmin Impersonation Server Actions
 * Allows authorized admins to sign in as any tenant user to debug or provide support.
 */

export async function startImpersonation(targetUserId: string, targetEmail: string, targetWorkspaceId: string) {
  return await impersonationService.startSession(targetUserId, targetEmail, targetWorkspaceId);
}

export async function stopImpersonation() {
  return await impersonationService.stopSession();
}

export async function getImpersonationSession() {
  return await impersonationService.getSession();
}
