import { db } from '@/lib/db';

export class WorkspaceService {
  /**
   * Fetches workspace by unique slug
   */
  async getWorkspaceBySlug(slug: string) {
    try {
      return await db.workspace.findUnique({
        where: { slug },
        include: {
          members: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  image: true,
                },
              },
            },
          },
        },
      });
    } catch (error: unknown) {
      console.error('[WorkspaceService] Failed to find workspace by slug:', error);
      return null;
    }
  }

  /**
   * Fetches workspace by unique ID
   */
  async getWorkspaceById(id: string) {
    try {
      return await db.workspace.findUnique({
        where: { id },
        include: {
          members: true,
        },
      });
    } catch (error: unknown) {
      console.error('[WorkspaceService] Failed to find workspace by id:', error);
      return null;
    }
  }

  /**
   * Lists all workspaces for platform admin management
   */
  async listWorkspacesForAdmin(limit: number = 50) {
    try {
      return await db.workspace.findMany({
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          members: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
      });
    } catch (error: unknown) {
      console.error('[WorkspaceService] Failed to list workspaces for admin:', error);
      return [];
    }
  }
}

export const workspaceService = new WorkspaceService();
