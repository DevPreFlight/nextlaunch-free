---
name: nextlaunch-guide
description: Complete full-stack SaaS development and AI agent playbook for NextLaunch Pro with Next.js 16, React 19, DevPreFlight Flat UI Kit, Prisma 7, Polar & Stripe payments, Gemini AI, and Resend emails.
---

# NextLaunch Pro — AI Developer & Feature Playbook

Use this skill when scaffolding new SaaS features, API routes, database models, payment gates, AI workflows, transactional emails, or customer portals in NextLaunch Pro.

---

## 🏛️ 1. Architecture & Directory Conventions

```text
src/
├── app/
│   ├── (auth)/                 # Zero-friction Cookie sessions & 1-Click Demo fast-track
│   ├── (marketing)/            # High-converting Landing page, Pricing & MDX Blog
│   ├── (dashboard)/[workspaceId]/ # Multi-tenant team workspace dashboards
│   │   ├── overview/           # KPI cards, MRR, sparklines
│   │   ├── analytics/          # Funnel & traffic metrics
│   │   ├── team/               # RBAC seat management & member invitations
│   │   ├── billing/            # Stripe / Polar subscription portal & invoices
│   │   ├── ai-studio/          # Multi-LLM Copilot Studio with credit metering
│   │   ├── ui-showcase/        # Live interactive gallery of 60+ UI components
│   │   └── settings/           # Workspace profile & API keys
│   ├── p/[slug]/               # Public customer-facing portals (feedback, roadmap, status)
│   ├── admin/                  # Superadmin Backoffice with zero-password impersonation
│   ├── actions/                # React 19 Server Actions ('use server')
│   └── api/webhooks/           # Stripe & Polar webhook signature verification
├── components/
│   ├── preflight-ui/           # 💎 DEVPREFLIGHT FLAT UI KIT (WCAG AAA Standalone Kit)
│   │   ├── primitives/         # Button, TextInput, Textarea, SelectDropdown, ToggleSwitch, Chip, etc.
│   │   ├── feedback/           # ModalDialog, SlideOverDrawer, AlertBanner, ToastNotification
│   │   ├── commerce/           # PricingCard, PricingMatrix, PaywallGate, InvoicingReceiptCard
│   │   └── types/              # Component design tokens & TypeScript definitions
│   ├── dashboard/              # Workspace metrics, DataTables, FilterSearchBar, StatusBadge
│   └── layout/                 # Sidebar, Navbar, Header, ImpersonationBanner
├── services/                   # Decoupled business logic (Auth, Billing, Workspace, AI, Email)
└── lib/
    ├── db.ts                   # Prisma singleton client
    ├── auth.ts                 # Session guards & RBAC permissions
    └── payments/               # Unified payment adapters (Polar, Stripe, Midtrans)
```

---

## 💎 2. DevPreFlight Flat UI Component Kit

Always import UI components directly from `@/components/preflight-ui` or `@/components/dashboard`.

### Quick Component Cheat Sheet:
```typescript
import {
  // Primitives
  Button,
  LoadingButton,
  TextInput,
  PasswordInput,
  Textarea,
  SelectDropdown,
  ToggleSwitch,
  Checkbox,
  RadioGroup,
  Chip,
  Avatar,
  Tooltip,
  
  // Feedback & Overlays
  ModalDialog,
  SlideOverDrawer,
  AlertBanner,
  ToastNotification,
  
  // Commerce & Monetization
  PricingCard,
  PricingMatrix,
  PaywallGate,
  PaywallModal,
  DiscountCopyBar,
  InvoicingReceiptCard,
} from '@/components/preflight-ui';

import {
  StatusBadge,
  MetricCard,
  MetricSparklineCard,
  QuickStatsBar,
  DataTable,
  FilterSearchBar,
} from '@/components/dashboard';
```

### Example: Modal Dialog with Form Inputs
```tsx
<ModalDialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Create Resource"
  description="Fill in the details to deploy your new service."
  size="md"
  footer={
    <div className="flex justify-end gap-2">
      <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>Cancel</Button>
      <Button variant="primary" size="sm" onClick={handleSubmit}>Save Changes</Button>
    </div>
  }
>
  <TextInput label="Resource Name" isRequired placeholder="e.g. Production Cluster" />
  <SelectDropdown label="Region" options={[{ value: 'us-east', label: 'US East' }]} />
  <Textarea label="Description" rows={3} />
</ModalDialog>
```

---

## 🗄️ 3. Database Models & Prisma ORM

### Convention:
1. Define model in `prisma/schema.prisma`.
2. Always relate to `Workspace` with `onDelete: Cascade`.
3. Import `db` singleton from `@/lib/db`.

```prisma
model CustomFeature {
  id          String    @id @default(cuid())
  workspaceId String
  title       String
  status      String    @default("ACTIVE")
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  workspace   Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)

  @@index([workspaceId])
}
```

---

## 🔐 4. Auth & RBAC Workspace Protection

Protect Server Actions and Route Handlers using `@/lib/auth`:

```typescript
import { requireAuth, requireWorkspaceAccess } from '@/lib/auth';

// 1. Require active session user
export async function myUserAction() {
  'use server';
  const user = await requireAuth();
  // ...
}

// 2. Require workspace member with specific role ('OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER')
export async function updateWorkspaceSettingsAction(workspaceId: string, data: any) {
  'use server';
  const { user, role } = await requireWorkspaceAccess(workspaceId, ['OWNER', 'ADMIN']);
  // Safe mutation logic...
}
```

---

## 💳 5. Gating Features by Subscription Tier (Polar / Stripe)

Gate premium functionality using the workspace plan:

```typescript
import { db } from '@/lib/db';

export async function requireProPlan(workspaceId: string) {
  const workspace = await db.workspace.findUnique({ where: { id: workspaceId } });
  if (workspace?.plan !== 'pro' && workspace?.plan !== 'enterprise') {
    throw new Error('Upgrade required: This feature is available on Pro plans');
  }
}
```

In UI components, wrap gated content with `<PaywallGate>`:
```tsx
<PaywallGate
  isLocked={currentPlan === 'free'}
  title="Export Data & Custom Domains"
  description="Upgrade to Pro to unlock advanced reporting and custom SSL domains."
  onUpgrade={() => router.push(`/${workspaceId}/billing`)}
>
  <AdvancedReportTable data={reports} />
</PaywallGate>
```

---

## 🤖 6. AI Studio & Gemini SDK Integration

NextLaunch Pro includes `@google/genai` for multi-turn chat, streaming, and background prompt execution:

```typescript
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateContent(prompt: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });
  return response.text;
}
```

---

## 📧 7. Transactional Emails (Resend + React Email)

Send responsive emails using `src/services/email.service.ts`:

```typescript
import { emailService } from '@/services/email.service';

await emailService.sendNotificationEmail({
  to: 'user@example.com',
  subject: 'Your feature request was approved!',
  title: 'Feature Status Update',
  description: 'Your request "Figma Sync" has moved to In Progress.',
  actionUrl: `https://yourapp.com/ws-demo/feedback`,
  actionText: 'View on Roadmap',
});
```

---

## 🚀 8. Additive-Only Scaffolding Rule (Best Practice)

When creating new features for NextLaunch Pro:
1. **Do not modify core auth or layout primitives**.
2. **Add a new Service** in `src/services/<feature>.service.ts`.
3. **Add React Server Actions** in `src/app/actions/<feature>.ts`.
4. **Assemble Feature Components** in `src/components/<feature>/` leveraging `@/components/preflight-ui`.
5. **Create Pages** under `src/app/(dashboard)/[workspaceId]/<feature>/page.tsx` and public portal `src/app/p/[slug]/page.tsx`.
