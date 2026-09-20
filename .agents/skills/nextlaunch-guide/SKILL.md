---
name: nextlaunch-guide
description: Complete full-stack SaaS development and AI agent playbook for NextLaunch Pro with Next.js 16, React 19, Prisma, Vitest backend testing, Outgoing Webhooks, Audit Logs, 2FA/TOTP security, DevPreFlight UI Kit, Polar & Stripe payments, Gemini AI, and senior craftsmanship standards.
---

# NextLaunch Pro — AI Developer & Feature Playbook

Use this skill when scaffolding SaaS features, API routes, database models, payment gates, outgoing webhooks, security audit logs, 2FA workflows, transactional emails, or custom UI screens in NextLaunch Pro.

---

## 🏛️ 1. Architecture & Directory Conventions

```text
src/
├── app/
│   ├── page.tsx                # Clean, minimal developer status & service hub (zero-bloat entry)
│   ├── layout.tsx              # Root HTML/Head layout with Outfit & JetBrains Mono typography
│   ├── globals.css             # Tailwind CSS v4 design tokens and theme variables
│   ├── actions/                # React 19 Server Actions ('use server')
│   │   ├── auth.ts             # Passwordless / cookie session auth actions
│   │   ├── billing.ts          # Stripe & Polar checkout / portal actions
│   │   └── impersonate.ts      # Superadmin backoffice impersonation actions
│   ├── admin/                  # Superadmin Backoffice & impersonation portal
│   └── api/                    # RESTful programmatic endpoints
│       ├── auth/2fa/           # 2FA setup, activation, and challenge verification
│       ├── auth/sessions/      # Multi-device active sessions & session revocation
│       ├── audit-logs/         # Enterprise audit logs query & CSV/JSON export
│       ├── webhooks/outgoing/  # Outgoing Webhooks management & retry delivery
│       ├── webhooks/polar/     # Inbound Polar subscription webhook handler
│       ├── webhooks/stripe/    # Inbound Stripe checkout/subscription webhook handler
│       ├── ai/chat/            # Gemini AI streaming endpoint
│       └── emails/preview/     # Resend email template visual preview
├── components/
│   ├── preflight-ui/           # 💎 DEVPREFLIGHT FLAT UI KIT (WCAG AAA Standalone Kit)
│   │   ├── primitives/         # Button, TextInput, Textarea, SelectDropdown, ToggleSwitch, Chip, etc.
│   │   ├── feedback/           # ModalDialog, SlideOverDrawer, AlertBanner, ToastNotification
│   │   ├── commerce/           # PricingCard, PricingMatrix, PaywallGate, InvoicingReceiptCard
│   │   └── types/              # Component design tokens & TypeScript definitions
│   ├── dashboard/              # Metrics, DataTables, FilterSearchBar, StatusBadge
│   └── layout/                 # Minimal layout primitives
├── services/                   # Decoupled business logic
│   ├── outgoing-webhook.service.ts # Webhook signing (v1 HMAC-SHA256), fan-out, & delivery retry
│   ├── audit-log.service.ts    # Enterprise audit trail recording, filtering, & CSV/JSON export
│   ├── two-factor.service.ts   # RFC 6238 TOTP engine & SHA-256 hashed recovery backup codes
│   ├── session.service.ts      # Device user-agent classification & session revocation
│   ├── api-key.service.ts      # Cryptographic SHA-256 API key hashing & prefix validation
│   ├── auth.service.ts         # User provisioning & cookie session management
│   ├── billing.service.ts      # Dual Stripe & Polar subscription sync
│   ├── ai.service.ts           # Gemini GenAI copilot & token metering
│   ├── email.service.ts        # Resend transactional email templates
│   └── workspace.service.ts    # Multi-tenant workspace management
├── lib/
│   ├── db.ts                   # Prisma 6 singleton client (`prisma` / `db`)
│   ├── auth.ts                 # Session guards & RBAC workspace permissions
│   ├── ai/                     # Gemini AI SDK 2.x client
│   └── payments/               # Unified payment adapters (Polar, Stripe, Midtrans)
tests/
└── unit/                       # Vitest backend unit test suites (100% test coverage)
    ├── services/
    │   ├── audit-log.test.ts
    │   ├── two-factor.test.ts
    │   ├── session.test.ts
    │   ├── api-key.test.ts
    │   ├── auth.test.ts
    │   └── billing.test.ts
    └── webhooks/
        └── outgoing-webhook.test.ts
```

---

## 💎 2. Core Backend Modules Cheat Sheet

NextLaunch Pro provides pure, zero-bloat, production-tested services that are **100% plug-and-play**:

### 1️⃣ Outgoing Webhooks System
Allows customers to register webhook endpoints and receive signed event notifications (like Stripe/GitHub):
```typescript
import { OutgoingWebhookService } from '@/services';

// Dispatch event across all subscribed endpoints in workspace:
await OutgoingWebhookService.dispatchEvent(workspaceId, 'member.invited', {
  memberId: 'mem_123',
  email: 'colleague@company.com',
  role: 'ADMIN',
});
```

### 2️⃣ Enterprise Audit Logs & Activity Trail
Records tamper-proof security audit logs with actor attribution, metadata diffs, and SIEM CSV/JSON exports:
```typescript
import { AuditLogService } from '@/services';

await AuditLogService.record({
  workspaceId,
  action: 'apikey.created',
  resource: 'apikey',
  resourceId: apiKey.id,
  actorId: user.id,
  metadata: { name: 'Production Bot', prefix: apiKey.prefix },
});
```

### 3️⃣ 2FA / TOTP Security & Session Management
RFC 6238 TOTP authenticator engine + 8-digit hashed recovery backup codes:
```typescript
import { TwoFactorService, SessionService } from '@/services';

// 1. Setup 2FA:
const { secret, otpAuthUri } = await TwoFactorService.initiateSetup(userId);

// 2. Verify login challenge (supports 6-digit TOTP or one-time backup recovery code):
const result = await TwoFactorService.verifyLoginChallenge(userId, inputCode);

// 3. Multi-device session manager:
const sessions = await SessionService.listActiveSessions(userId, currentSessionToken);
await SessionService.revokeOtherSessions(userId, currentSessionToken);
```

### 4️⃣ API Key Management
Generates cryptographically secure API keys with SHA-256 database hashing (`nl_live_...`):
```typescript
import { ApiKeyService } from '@/services';

// Generate key (raw key returned ONLY once to the user):
const { apiKey, rawKey } = await ApiKeyService.createApiKey({ workspaceId, name: 'Prod API' });

// Verify incoming API requests in route handlers:
const verifiedKey = await ApiKeyService.verifyApiKey(rawKeyFromHeader);
```

### 5️⃣ Auth & RBAC Workspace Protection
Protect Server Actions and Route Handlers:
```typescript
import { requireAuth, requireWorkspaceAccess } from '@/lib/auth';

// Enforce active session
const user = await requireAuth();

// Enforce workspace member role ('OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER')
const { user, role } = await requireWorkspaceAccess(workspaceId, ['OWNER', 'ADMIN']);
```

---

## 🧪 3. Backend Unit Testing Protocol (Vitest)

All backend logic, services, and API helpers must have unit tests.
- Run tests: `npm test` or `npx vitest run`
- Watch mode: `npm run test:watch`

When creating a new service in `src/services/<name>.service.ts`, always create the matching test suite in `tests/unit/services/<name>.test.ts`.

---

## 🎨 4. UI Component Kit & Styling Standard

NextLaunch Pro uses **Tailwind CSS v4** with the standalone **DevPreFlight Flat UI Kit** (`@/components/preflight-ui` and `@/components/dashboard`).

### Key Primitives:
```typescript
import {
  Button,
  LoadingButton,
  TextInput,
  PasswordInput,
  Textarea,
  SelectDropdown,
  ToggleSwitch,
  Checkbox,
  Chip,
  Avatar,
  ModalDialog,
  SlideOverDrawer,
  AlertBanner,
  ToastNotification,
  PricingCard,
  PaywallGate,
} from '@/components/preflight-ui';

import {
  StatusBadge,
  MetricCard,
  DataTable,
  FilterSearchBar,
} from '@/components/dashboard';
```

### Styling Rules:
- **Use Semantic Tokens**: Use CSS theme variables registered in `src/app/globals.css`.
- ❌ **STRICTLY FORBIDDEN**: Inlining brittle arbitrary hex colors (`bg-[#1a2b3c]`). Use semantic utility classes.
- **Micro-Interactions**: Add subtle hover and active feedback (`transition-all duration-150 active:scale-[0.98]`).

---

## 🤖 5. Gemini AI SDK 2.x Integration

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

## 🗄️ 6. Database Migrations & Prisma 6

1. Edit or add models in `prisma/schema.prisma`.
2. Always link workspace-scoped data to `Workspace` with `onDelete: Cascade`.
3. Generate client: `npx prisma generate`.
4. Push changes to database: `npx prisma db push`.

---

## 🚀 7. Protocol for AI Agents Building New Features

When an AI agent is asked to build a new feature or full SaaS app in this repository:
1. **Zero Template Bloat**: Do not resurrect old unneeded marketing or demo simulator bars. Keep the codebase clean and fast.
2. **Real Persistence First**: Always create real Prisma models in `prisma/schema.prisma` and execute real queries in `src/services/`—never rely on temporary in-memory dummy arrays.
3. **Protect Mutations**: Secure server actions with `requireWorkspaceAccess(workspaceId, allowedRoles)`.
4. **Log Sensitive Operations**: Record mutations in `AuditLogService.record(...)`.
5. **Write Unit Tests**: Add corresponding test suites under `tests/unit/` and verify with `npm test`.
6. **Compile Verification**: Always run `npx tsc --noEmit` and `npm run build` before completing the task.
