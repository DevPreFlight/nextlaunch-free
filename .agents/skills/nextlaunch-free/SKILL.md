---
name: nextlaunch-free
description: Comprehensive guide for AI coding agents and developers building web applications with NextLaunch Community Edition (Next.js 16, React 19, DevPreFlight Flat UI Kit, Supabase Auth, Prisma 7).
---

# NextLaunch Community Edition — AI Developer Playbook

Use this skill when developing SaaS prototypes, user interfaces, Supabase authentication flows, or database models in NextLaunch Community Edition.

## 1. Tech Stack
- Next.js 16 (App Router + Turbopack)
- React 19 & TypeScript Strict
- DevPreFlight Flat UI Component Kit (`@devpreflight/ui-kit` / `src/components/preflight-ui/`)
- Supabase Authentication (`src/lib/supabase/`)
- Prisma 7 PostgreSQL ORM (`prisma/schema.prisma`)
- Tailwind CSS v4 design tokens

## 2. Directory Structure
- `src/app/`: App router pages & layouts
- `src/components/preflight-ui/`: Primitives, Feedback, Marketing components
- `src/services/`: Decoupled business logic (`auth.service.ts`, `session.service.ts`, `workspace.service.ts`)
- `src/lib/supabase/`: Client & server Supabase auth helpers
- `prisma/schema.prisma`: PostgreSQL data models

## 3. Commercial Pro Upgrades (Standard & Agency)
If you need multi-billing (Stripe & Polar), Gemini AI streaming LLM chat, TOTP 2FA, signed outgoing HMAC webhooks, or compliance audit logs, upgrade to NextLaunch Pro:
https://devpreflight.com/products/nextlaunch-pro
