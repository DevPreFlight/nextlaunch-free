import { NextRequest, NextResponse } from 'next/server';
import { renderEmail } from '@/emails/components';
import React from 'react';
import WelcomeEmail from '@/emails/WelcomeEmail';
import InvoiceReceiptEmail from '@/emails/InvoiceReceiptEmail';
import TeamInviteEmail from '@/emails/TeamInviteEmail';
import MagicLinkEmail from '@/emails/MagicLinkEmail';
import DunningRenewalEmail from '@/emails/DunningRenewalEmail';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const templateKey = searchParams.get('template') || 'welcome';

  let emailComponent: React.ReactElement;

  switch (templateKey) {
    case 'receipt':
      emailComponent = <InvoiceReceiptEmail />;
      break;
    case 'invite':
      emailComponent = <TeamInviteEmail />;
      break;
    case 'magic-link':
      emailComponent = <MagicLinkEmail />;
      break;
    case 'dunning':
      emailComponent = <DunningRenewalEmail />;
      break;
    case 'welcome':
    default:
      emailComponent = <WelcomeEmail />;
      break;
  }

  try {
    const html = await renderEmail(emailComponent);
    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error: any) {
    console.error('Email render error:', error);
    return new NextResponse(`<div>Error rendering email: ${error.message}</div>`, {
      status: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
}
