export const FEATURES = {
  enableAiStudio: false,
  enableAuditLogs: false,
  enableAdminBackoffice: false,
  enableEmails: false,
  enableMdxBlog: false,
  enableTeamWorkspaces: false,
  paymentProvider: 'polar',
};

export type FeatureKey = keyof typeof FEATURES;
