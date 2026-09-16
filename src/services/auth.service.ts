import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import crypto from 'crypto';

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: string;
  currentWorkspaceId: string;
  workspaces?: Array<{
    id: string;
    name: string;
    slug: string;
    plan: string;
    role: string;
  }>;
}

export type AuthResult =
  | { success: true; workspaceSlug: string; user?: { id: string; name: string; email: string }; error?: never }
  | { success: false; error: string; workspaceSlug?: never; user?: never };

const SESSION_COOKIE_NAME = 'nextlaunch_session';
const SESSION_DURATION_DAYS = 30;

export class AuthService {
  /**
   * Generates a cryptographically secure random session token
   */
  private generateToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Creates a database session and writes a secure HTTP-only cookie
   */
  async createSession(userId: string): Promise<string> {
    const token = this.generateToken();
    const expires = new Date();
    expires.setDate(expires.getDate() + SESSION_DURATION_DAYS);

    try {
      await db.session.create({
        data: {
          sessionToken: token,
          userId,
          expires,
        },
      });

      const cookieStore = await cookies();
      cookieStore.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires,
        path: '/',
      });

      return token;
    } catch (error) {
      console.error('[AuthService] Error creating session:', error);
      throw error;
    }
  }

  /**
   * Authenticates a user by email and creates an active session.
   * If the user doesn't exist yet, creates user and a default personal workspace.
   */
  async loginWithEmail(email: string, name?: string): Promise<AuthResult> {
    try {
      const normalizedEmail = email.trim().toLowerCase();

      let user = await db.user.findUnique({
        where: { email: normalizedEmail },
        include: {
          memberships: {
            include: { workspace: true },
          },
        },
      });

      if (!user) {
        // Auto-provision user & workspace on first passwordless login
        const defaultName = name || normalizedEmail.split('@')[0];
        const defaultSlug = `ws-${defaultName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Math.floor(100 + Math.random() * 900)}`;

        user = await db.user.create({
          data: {
            email: normalizedEmail,
            name: defaultName,
            memberships: {
              create: {
                role: 'OWNER',
                workspace: {
                  create: {
                    name: `${defaultName}'s Workspace`,
                    slug: defaultSlug,
                    plan: 'free',
                  },
                },
              },
            },
          },
          include: {
            memberships: {
              include: { workspace: true },
            },
          },
        });
      }

      await this.createSession(user.id);
      const primaryWorkspace = user.memberships[0]?.workspace;

      return {
        success: true,
        user: {
          id: user.id,
          name: user.name || 'User',
          email: user.email,
        },
        workspaceSlug: primaryWorkspace?.slug || 'ws_demo_cloud_01',
      };
    } catch (error: unknown) {
      const err = error as Error;
      console.error('[AuthService] Login error:', err);
      return { success: false, error: err.message || 'Login failed' };
    }
  }

  /**
   * Registers a new user with an initial workspace
   */
  async registerUser({
    name,
    email,
    workspaceName,
  }: {
    name: string;
    email: string;
    workspaceName?: string;
  }): Promise<AuthResult> {
    try {
      const normalizedEmail = email.trim().toLowerCase();

      const existingUser = await db.user.findUnique({
        where: { email: normalizedEmail },
      });

      if (existingUser) {
        return { success: false, error: 'An account with this email already exists. Please log in.' };
      }

      const orgName = workspaceName?.trim() || `${name.trim()}'s Workspace`;
      const baseSlug = orgName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const uniqueSlug = `${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}`;

      const newUser = await db.user.create({
        data: {
          name: name.trim(),
          email: normalizedEmail,
          memberships: {
            create: {
              role: 'OWNER',
              workspace: {
                create: {
                  name: orgName,
                  slug: uniqueSlug,
                  plan: 'free',
                },
              },
            },
          },
        },
        include: {
          memberships: {
            include: { workspace: true },
          },
        },
      });

      await this.createSession(newUser.id);
      const workspace = newUser.memberships[0]?.workspace;

      return {
        success: true,
        workspaceSlug: workspace?.slug || uniqueSlug,
      };
    } catch (error: unknown) {
      const err = error as Error;
      console.error('[AuthService] Registration error:', err);
      return { success: false, error: err.message || 'Registration failed' };
    }
  }

  /**
   * Instantly creates a demo session for the Alex Rivera sample account
   */
  async loginDemoUser(): Promise<AuthResult> {
    try {
      const demoEmail = 'alex@devpreflight.com';
      let user = await db.user.findUnique({
        where: { email: demoEmail },
        include: {
          memberships: { include: { workspace: true } },
        },
      });

      if (!user) {
        user = await db.user.create({
          data: {
            id: 'usr_demo_founder_01',
            name: 'Alex Rivera',
            email: demoEmail,
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=face',
            memberships: {
              create: {
                role: 'OWNER',
                workspace: {
                  create: {
                    id: 'ws_demo_cloud_01',
                    name: 'Acme Cloud Platform',
                    slug: 'ws_demo_cloud_01',
                    plan: 'pro',
                  },
                },
              },
            },
          },
          include: {
            memberships: { include: { workspace: true } },
          },
        });
      }

      await this.createSession(user.id);
      return { success: true, workspaceSlug: 'ws_demo_cloud_01' };
    } catch (error: unknown) {
      console.warn('[AuthService] Demo DB fallback active:', error);
      return { success: true, workspaceSlug: 'ws_demo_cloud_01' };
    }
  }

  /**
   * Terminates active session and clears the cookie
   */
  async logout() {
    try {
      const cookieStore = await cookies();
      const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

      if (sessionToken) {
        try {
          await db.session.delete({
            where: { sessionToken },
          });
        } catch {
          // Ignore if already expired/deleted
        }
      }

      cookieStore.delete(SESSION_COOKIE_NAME);
      return { success: true };
    } catch (error: unknown) {
      console.error('[AuthService] Logout error:', error);
      return { success: false };
    }
  }

  /**
   * Retrieves current authenticated user with workspace context
   */
  async getCurrentUser(): Promise<SessionUser | null> {
    try {
      const cookieStore = await cookies();
      const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

      if (!sessionToken) {
        if (process.env.NEXT_PUBLIC_DEMO_MODE === 'true' || (!process.env.DATABASE_URL && process.env.NODE_ENV === 'development')) {
          return {
            id: 'usr_demo_founder_01',
            name: 'Alex Rivera',
            email: 'alex@devpreflight.com',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=face',
            role: 'OWNER',
            currentWorkspaceId: 'ws_demo_cloud_01',
            workspaces: [
              {
                id: 'ws_demo_cloud_01',
                name: 'Acme Cloud Platform',
                slug: 'ws_demo_cloud_01',
                plan: 'pro',
                role: 'OWNER',
              },
            ],
          };
        }
        return null;
      }

      const session = await db.session.findUnique({
        where: { sessionToken },
        include: {
          user: {
            include: {
              memberships: {
                include: {
                  workspace: true,
                },
              },
            },
          },
        },
      });

      if (!session || session.expires < new Date()) {
        return null;
      }

      const firstMembership = session.user.memberships[0];

      return {
        id: session.user.id,
        name: session.user.name || 'User',
        email: session.user.email,
        image: session.user.image,
        role: firstMembership?.role || 'MEMBER',
        currentWorkspaceId: firstMembership?.workspaceId || 'ws_demo_cloud_01',
        workspaces: session.user.memberships.map((m) => ({
          id: m.workspace.id,
          name: m.workspace.name,
          slug: m.workspace.slug,
          plan: m.workspace.plan,
          role: m.role,
        })),
      };
    } catch (error) {
      if (error && typeof error === 'object' && 'digest' in error) {
        throw error;
      }
      console.error('[AuthService] Error fetching current user:', error);
      return null;
    }
  }
}

export const authService = new AuthService();
