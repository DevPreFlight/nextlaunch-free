# NextLaunch Pro Guidelines

NextLaunch Pro is an enterprise full-stack Next.js 16 + React 19 SaaS starter with Polar billing, Prisma ORM, and PreFlight Flat UI components.

## Commands
- `npm run dev`: Start local development server on http://localhost:3000
- `npm run build`: Build production bundle
- `npx prisma generate`: Generate Prisma Client types
- `npx prisma db push`: Push schema changes to database
- `npx prisma studio`: Open interactive database browser

## Architecture
- `src/app/(marketing)`: Public landing page and pricing matrix
- `src/app/(auth)`: Login and registration flows
- `src/app/(dashboard)/[workspaceId]`: Multi-tenant workspace overview, team, billing, settings
- `src/app/api/webhooks/polar`: Polar webhook handler with Standard Webhooks signature verification
- `src/lib/polar.ts`: Polar SDK configuration & plan tiers
- `src/lib/db.ts`: Global Prisma singleton client
