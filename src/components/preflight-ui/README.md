# 🎨 DevPreflight Flat UI Component Kit

> **Enterprise-Grade, Zero-Bloat Flat UI Component System for React 19 & Next.js 16**  
> Built by [DevPreFlight](https://devpreflight.com). Designed for high-converting SaaS applications, B2B dashboards, and seamless monetization.

---

## 📦 What is inside this UI Kit?

This UI Kit is structured as an **independent, portable design system** that can be used directly inside NextLaunch or copied to any other React/Next.js project.

```text
preflight-ui/
├── primitives/         # Core interactive elements (Buttons, Inputs, Toggles, Selects, Radios)
├── feedback/           # Modals, SlideOver Drawers, Alert Banners, Toasts, Popovers
├── commerce/           # Pricing Tables, Paywall Gates, Invoicing Receipts, Discount Bars
└── types/              # Full TypeScript typings for all UI primitives
```

---

## 🚀 Quick Usage

Import components directly from `@/components/preflight-ui`:

```tsx
import {
  Button,
  TextInput,
  PasswordInput,
  ToggleSwitch,
  AlertBanner,
  ModalDialog,
  PaywallGate,
  PricingCard,
} from '@/components/preflight-ui';

export function MySaaSFeature() {
  return (
    <div className="space-y-4">
      <AlertBanner
        variant="info"
        title="Pro Feature"
        description="Upgrade your workspace to invite unlimited teammates."
      />
      <Button variant="primary" size="md">
        Explore Features
      </Button>
    </div>
  );
}
```

---

## 🎨 Design System & Color Tokens

The UI Kit uses a **Flat Clean Blue & Slate** aesthetic that provides crisp contrast, accessibility, and modern SaaS vibes:

* **Primary Blue:** `bg-blue-600` (Hover: `hover:bg-blue-700`, Ring: `ring-blue-600/20`)
* **Neutral Slate:** `text-slate-900`, `text-slate-600`, `border-slate-200`, `bg-slate-50`
* **Feedback Green (Success):** `emerald-600`
* **Feedback Amber (Warning):** `amber-600`
* **Feedback Rose (Danger):** `rose-600`
* **Border Radius:** `rounded-xl` (inputs/buttons) and `rounded-2xl` (cards/modals)

---

## 📋 Porting to Another Project

To copy this entire UI Kit into a separate React or Next.js repository:

1. Copy the `src/components/preflight-ui/` directory to your new project's `components/` folder.
2. Ensure you have `lucide-react`, `clsx`, and `tailwind-merge` installed:
   ```bash
   npm install lucide-react clsx tailwind-merge
   ```
3. Enjoy your standalone WCAG AAA accessible Flat UI kit!
