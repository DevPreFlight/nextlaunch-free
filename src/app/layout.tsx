import type { Metadata } from 'next';
import './globals.css';

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nextlaunch.devpreflight.com';

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: 'NextLaunch Pro | Enterprise Next.js 16 & React 19 Full-Stack SaaS Boilerplate',
  description:
    'Ship full-stack SaaS apps with Next.js 16 App Router, React 19, Server Actions, Stripe & Polar Subscriptions, Prisma ORM, and PreFlight Flat UI components.',
  keywords: [
    'Next.js 16 boilerplate',
    'React 19 SaaS starter',
    'Stripe boilerplate',
    'Polar payment integration',
    'Next.js SaaS template',
    'DevPreFlight',
    'Flat UI kit',
    'Server Actions SaaS',
    'Multi-Tenant SaaS'
  ],
  authors: [{ name: 'DevPreFlight', url: 'https://devpreflight.com' }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/logo.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.svg',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'NextLaunch Pro — Enterprise Full-Stack SaaS Boilerplate (Live Demo)',
    description:
      'Ship high-converting SaaS apps in hours with Next.js 16, React 19, Dual Stripe & Polar Billing, Multi-Tenant Workspaces, and 60+ PreFlight Flat UI.',
    url: appUrl,
    siteName: 'NextLaunch Pro',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NextLaunch Pro Boilerplate & Interactive Live Demo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NextLaunch Pro — Full-Stack SaaS Boilerplate & Live Demo',
    description: 'Next.js 16, React 19, Stripe & Polar MoR, Prisma ORM, 60+ Flat UI Kit.',
    images: ['/og-image.png'],
    creator: '@devpreflight',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-slate-50 text-slate-900 antialiased scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
