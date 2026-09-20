/**
 * NextLaunch Pro & Core Feature Configuration Flags
 * Easily toggle or configure modules without editing routing logic.
 */
export const FEATURES = {
  // AI Multi-LLM Studio & Token Credits
  enableAiStudio: process.env.NEXT_PUBLIC_ENABLE_AI_STUDIO !== 'false',

  // Enterprise Security & Immutable Audit Logs
  enableAuditLogs: process.env.NEXT_PUBLIC_ENABLE_AUDIT_LOGS !== 'false',

  // Admin Superuser Backoffice & User Impersonation
  enableAdminBackoffice: process.env.NEXT_PUBLIC_ENABLE_ADMIN_BACKOFFICE !== 'false',

  // Transactional Email Suite (Resend & React Email)
  enableEmails: process.env.NEXT_PUBLIC_ENABLE_EMAILS !== 'false',

  // MDX SEO Blog & Documentation Machine
  enableMdxBlog: process.env.NEXT_PUBLIC_ENABLE_MDX_BLOG !== 'false',

  // Multi-Tenant Workspaces & Member Invitations
  enableTeamWorkspaces: process.env.NEXT_PUBLIC_ENABLE_TEAM_WORKSPACES !== 'false',

  // Selected Payment Gateway: 'polar' | 'stripe' | 'midtrans'
  paymentProvider: (process.env.NEXT_PUBLIC_PAYMENT_PROVIDER as 'polar' | 'stripe' | 'midtrans') || 'polar',
};

export type FeatureKey = keyof typeof FEATURES;
