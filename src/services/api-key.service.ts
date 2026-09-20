import crypto from 'crypto';
import { prisma } from '@/lib/db';

export interface CreateApiKeyInput {
  workspaceId: string;
  name: string;
  prefix?: string;
}

export class ApiKeyService {
  /**
   * Generates a raw API key and its SHA-256 hash.
   * Returns { rawKey, keyHash, prefix }
   */
  static generateKey(customPrefix = 'nl_live'): { rawKey: string; keyHash: string; prefix: string } {
    const randomHex = crypto.randomBytes(20).toString('hex');
    const rawKey = `${customPrefix}_${randomHex}`;
    const keyHash = this.hashKey(rawKey);
    const prefix = `${customPrefix}_${randomHex.slice(0, 4)}...`;

    return { rawKey, keyHash, prefix };
  }

  /**
   * Hashes an API key with SHA-256 for secure database lookup
   */
  static hashKey(rawKey: string): string {
    return crypto.createHash('sha256').update(rawKey).digest('hex');
  }

  /**
   * Creates and stores a new API key for a workspace.
   * The rawKey is returned ONLY ONCE upon creation.
   */
  static async createApiKey(input: CreateApiKeyInput) {
    const { rawKey, keyHash, prefix } = this.generateKey(input.prefix || 'nl_live');

    const record = await prisma.apiKey.create({
      data: {
        workspaceId: input.workspaceId,
        name: input.name,
        keyHash,
        prefix,
      },
    });

    return {
      apiKey: record,
      rawKey, // returned once to user
    };
  }

  /**
   * Verifies an incoming raw API key and updates lastUsedAt
   */
  static async verifyApiKey(rawKey: string) {
    if (!rawKey || typeof rawKey !== 'string') return null;

    const keyHash = this.hashKey(rawKey);
    const apiKey = await prisma.apiKey.findUnique({
      where: { keyHash },
      include: { workspace: true },
    });

    if (!apiKey) return null;

    // Update lastUsedAt in background
    await prisma.apiKey.update({
      where: { id: apiKey.id },
      data: { lastUsedAt: new Date() },
    }).catch(() => {
      // non-blocking
    });

    return apiKey;
  }

  /**
   * Revoke / delete API key
   */
  static async revokeApiKey(keyId: string) {
    return prisma.apiKey.delete({
      where: { id: keyId },
    });
  }

  /**
   * List active API keys for workspace (safe - no raw keys or hashes exposed)
   */
  static async listApiKeys(workspaceId: string) {
    return prisma.apiKey.findMany({
      where: { workspaceId },
      select: {
        id: true,
        workspaceId: true,
        name: true,
        prefix: true,
        lastUsedAt: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
