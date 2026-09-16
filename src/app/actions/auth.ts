'use server';

import { authService, type AuthResult } from '@/services/auth.service';
import { redirect } from 'next/navigation';

/**
 * Server Action: Authenticates a user with email and starts a session
 */
export async function loginAction(data: { email: string; name?: string }): Promise<AuthResult> {
  if (!data.email || !data.email.includes('@')) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  return await authService.loginWithEmail(data.email, data.name);
}

/**
 * Server Action: Registers a new user and provisions their first workspace
 */
export async function registerAction(data: {
  name: string;
  email: string;
  workspaceName?: string;
}): Promise<AuthResult> {
  if (!data.name || data.name.trim().length === 0) {
    return { success: false, error: 'Please enter your full name.' };
  }

  if (!data.email || !data.email.includes('@')) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  return await authService.registerUser(data);
}

/**
 * Server Action: Instantly starts a demo session for Alex Rivera
 */
export async function demoLoginAction(): Promise<AuthResult> {
  return await authService.loginDemoUser();
}

/**
 * Server Action: Terminates the current session and redirects to login
 */
export async function logoutAction() {
  await authService.logout();
  redirect('/login');
}
