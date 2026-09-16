import { Polar } from '@polar-sh/sdk';

/**
 * Official Polar SDK Client instance
 * Configured with environment access token & sandbox/production server target.
 */
export const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN || '',
  server: process.env.POLAR_ENVIRONMENT === 'sandbox' ? 'sandbox' : 'production',
});

/**
 * Available Subscription Tiers & Feature Matrix Configuration
 */
export const PLANS = {
  FREE: {
    id: 'free',
    name: 'Starter (Free)',
    price: 0,
    priceId: null,
    features: ['1 Workspace Member', 'Up to 1,000 API calls/mo', 'Community Support', 'Basic Analytics'],
    limits: {
      maxMembers: 1,
      maxProjects: 3,
      apiCallsLimit: 1000,
    },
  },
  PRO: {
    id: 'pro',
    name: 'Pro Launch',
    price: 29,
    productId: process.env.NEXT_PUBLIC_POLAR_PRO_PRODUCT_ID || '',
    features: [
      'Unlimited Workspace Members',
      'Unlimited API calls & Webhooks',
      'Priority Email & Discord Support',
      'Custom Domain Integration',
      'Advanced Audit Logs & RBAC',
    ],
    limits: {
      maxMembers: 50,
      maxProjects: 100,
      apiCallsLimit: 1000000,
    },
  },
  ENTERPRISE: {
    id: 'enterprise',
    name: 'Enterprise Scale',
    price: 99,
    productId: process.env.NEXT_PUBLIC_POLAR_ENTERPRISE_PRODUCT_ID || '',
    features: [
      'Dedicated Infrastructure Instance',
      'Custom SLA & 24/7 Phone Support',
      'Custom Contracts & Invoicing',
      'SOC2 & HIPAA Compliance Reports',
    ],
    limits: {
      maxMembers: 9999,
      maxProjects: 9999,
      apiCallsLimit: 100000000,
    },
  },
} as const;

export type PlanKey = keyof typeof PLANS;
