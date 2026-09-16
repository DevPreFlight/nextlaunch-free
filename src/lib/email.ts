import { Resend } from 'resend';
import { renderEmail } from '@/emails/components';
import React from 'react';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  template: React.ReactElement;
  from?: string;
}

/**
 * Universal NextLaunch Email Dispatcher
 * Seamlessly handles production dispatch via Resend, or falls back to development logging.
 */
export async function sendTransactionalEmail({
  to,
  subject,
  template,
  from = process.env.EMAIL_FROM || 'NextLaunch <notifications@nextlaunch.dev>',
}: SendEmailOptions) {
  try {
    if (!resend) {
      console.log(`\n📧 [DEV EMAIL SIMULATOR] Dispatch to: ${to} | Subject: "${subject}"`);
      const html = await renderEmail(template);
      console.log(`📧 [EMAIL BODY PREVIEW]: Rendered ${html.length} bytes successfully.\n`);
      return { success: true, messageId: `mock_msg_${Date.now()}`, simulated: true };
    }

    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      react: template,
    });

    if (error) {
      console.error('Resend email error:', error);
      return { success: false, error };
    }

    return { success: true, messageId: data?.id };
  } catch (err: any) {
    console.error('Failed to send transactional email:', err);
    return { success: false, error: err.message || 'Unknown error' };
  }
}
