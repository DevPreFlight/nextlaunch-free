import crypto from 'crypto';
import { prisma } from '@/lib/db';

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

export class TwoFactorService {
  /**
   * Encodes a buffer into RFC 4648 Base32 string (without padding)
   */
  static encodeBase32(buffer: Buffer): string {
    let bits = 0;
    let value = 0;
    let output = '';

    for (let i = 0; i < buffer.length; i++) {
      value = (value << 8) | buffer[i];
      bits += 8;

      while (bits >= 5) {
        output += BASE32_ALPHABET[(value >>> (bits - 5)) & 31];
        bits -= 5;
      }
    }

    if (bits > 0) {
      output += BASE32_ALPHABET[(value << (5 - bits)) & 31];
    }

    return output;
  }

  /**
   * Decodes a Base32 string into a Buffer
   */
  static decodeBase32(input: string): Buffer {
    const cleaned = input.toUpperCase().replace(/=+$/, '').replace(/[\s-]/g, '');
    let bits = 0;
    let value = 0;
    const output: number[] = [];

    for (let i = 0; i < cleaned.length; i++) {
      const idx = BASE32_ALPHABET.indexOf(cleaned[i]);
      if (idx === -1) {
        continue;
      }

      value = (value << 5) | idx;
      bits += 5;

      if (bits >= 8) {
        output.push((value >>> (bits - 8)) & 255);
        bits -= 8;
      }
    }

    return Buffer.from(output);
  }

  /**
   * Generates a 20-byte cryptographically secure Base32 secret for TOTP
   */
  static generateSecret(): string {
    const randomBytes = crypto.randomBytes(20);
    return this.encodeBase32(randomBytes);
  }

  /**
   * Generates standard OTPAuth URL for QR code generation in authenticator apps
   */
  static getOtpAuthUri(secret: string, email: string, issuer = 'NextLaunch'): string {
    const encodedIssuer = encodeURIComponent(issuer);
    const encodedEmail = encodeURIComponent(email);
    return `otpauth://totp/${encodedIssuer}:${encodedEmail}?secret=${secret}&issuer=${encodedIssuer}&algorithm=SHA1&digits=6&period=30`;
  }

  /**
   * Generates a 6-digit TOTP token for a given timestamp step according to RFC 6238
   */
  static generateTOTP(secret: string, timeStep?: number): string {
    const step = timeStep ?? Math.floor(Date.now() / 1000 / 30);
    const key = this.decodeBase32(secret);

    // 8-byte big-endian counter
    const timeBuffer = Buffer.alloc(8);
    timeBuffer.writeBigUInt64BE(BigInt(step), 0);

    const hmac = crypto.createHmac('sha1', key).update(timeBuffer).digest();

    // Dynamic truncation (RFC 4226)
    const offset = hmac[hmac.length - 1] & 0x0f;
    const binary =
      ((hmac[offset] & 0x7f) << 24) |
      ((hmac[offset + 1] & 0xff) << 16) |
      ((hmac[offset + 2] & 0xff) << 8) |
      (hmac[offset + 3] & 0xff);

    const otp = binary % 1000000;
    return otp.toString().padStart(6, '0');
  }

  /**
   * Verifies an incoming 6-digit TOTP token against secret with ±1 time step tolerance (90s window)
   */
  static verifyTOTP(secret: string, token: string, window = 1): boolean {
    if (!token || token.trim().length !== 6) {
      return false;
    }

    const currentStep = Math.floor(Date.now() / 1000 / 30);

    for (let offset = -window; offset <= window; offset++) {
      const generated = this.generateTOTP(secret, currentStep + offset);
      if (crypto.timingSafeEqual(Buffer.from(generated), Buffer.from(token.trim()))) {
        return true;
      }
    }

    return false;
  }

  /**
   * Normalizes and hashes a backup recovery code with SHA-256
   */
  static hashBackupCode(code: string): string {
    const normalized = code.toUpperCase().replace(/[^A-Z0-9]/g, '');
    return crypto.createHash('sha256').update(normalized).digest('hex');
  }

  /**
   * Generates 8 one-time backup recovery codes
   */
  static generateBackupCodes(count = 8): { rawCodes: string[]; hashedCodes: string[] } {
    const rawCodes: string[] = [];
    const hashedCodes: string[] = [];

    for (let i = 0; i < count; i++) {
      const part1 = crypto.randomBytes(2).toString('hex').toUpperCase();
      const part2 = crypto.randomBytes(2).toString('hex').toUpperCase();
      const raw = `${part1}-${part2}`;
      rawCodes.push(raw);
      hashedCodes.push(this.hashBackupCode(raw));
    }

    return { rawCodes, hashedCodes };
  }

  /**
   * Initiates 2FA setup for a user, returning secret and otpauth URI
   */
  static async initiateSetup(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, twoFactorEnabled: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const secret = this.generateSecret();
    const otpAuthUri = this.getOtpAuthUri(secret, user.email);

    return {
      secret,
      otpAuthUri,
      alreadyEnabled: user.twoFactorEnabled,
    };
  }

  /**
   * Verifies initial token and enables 2FA for the user, returning one-time recovery backup codes
   */
  static async enableTwoFactor(userId: string, secret: string, verificationToken: string) {
    const isValid = this.verifyTOTP(secret, verificationToken);
    if (!isValid) {
      throw new Error('Invalid verification code. Please check your authenticator app and try again.');
    }

    const { rawCodes, hashedCodes } = this.generateBackupCodes(8);

    await prisma.user.update({
      where: { id: userId },
      data: {
        twoFactorEnabled: true,
        twoFactorSecret: secret,
        twoFactorBackupCodes: hashedCodes,
      },
    });

    return {
      success: true,
      backupCodes: rawCodes, // User must save these now
    };
  }

  /**
   * Verifies a 2FA challenge during login using either TOTP token or single-use recovery backup code
   */
  static async verifyLoginChallenge(userId: string, tokenOrCode: string): Promise<{ success: boolean; usedBackupCode?: boolean }> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        twoFactorEnabled: true,
        twoFactorSecret: true,
        twoFactorBackupCodes: true,
      },
    });

    if (!user || !user.twoFactorEnabled || !user.twoFactorSecret) {
      return { success: true }; // 2FA not enabled
    }

    const cleaned = tokenOrCode.trim();

    // 1. Try TOTP code first
    if (cleaned.length === 6 && /^\d+$/.test(cleaned)) {
      const isValidTotp = this.verifyTOTP(user.twoFactorSecret, cleaned);
      if (isValidTotp) {
        return { success: true, usedBackupCode: false };
      }
    }

    // 2. Try Backup Recovery Codes
    const hashedAttempt = this.hashBackupCode(cleaned);
    const codeIndex = user.twoFactorBackupCodes.indexOf(hashedAttempt);

    if (codeIndex !== -1) {
      // Invalidate the used backup code (one-time use)
      const updatedCodes = [...user.twoFactorBackupCodes];
      updatedCodes.splice(codeIndex, 1);

      await prisma.user.update({
        where: { id: userId },
        data: { twoFactorBackupCodes: updatedCodes },
      });

      return { success: true, usedBackupCode: true };
    }

    return { success: false };
  }

  /**
   * Disables 2FA for a user
   */
  static async disableTwoFactor(userId: string) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        twoFactorEnabled: false,
        twoFactorSecret: null,
        twoFactorBackupCodes: [],
      },
    });

    return { success: true };
  }
}
