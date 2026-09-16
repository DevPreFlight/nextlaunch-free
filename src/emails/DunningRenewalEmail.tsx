import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from './components';

interface DunningRenewalEmailProps {
  userName?: string;
  planName?: string;
  renewalDate?: string;
  amount?: string;
  updatePaymentUrl?: string;
}

export const DunningRenewalEmail = ({
  userName = 'Alex Rivera',
  planName = 'NextLaunch Pro Plan (Monthly)',
  renewalDate = 'September 20, 2026',
  amount = '$49.00',
  updatePaymentUrl = 'https://nextlaunch.dev/acme-corp/billing',
}: DunningRenewalEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Upcoming renewal reminder for {planName} — {amount}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header Brand Bar */}
          <Section style={headerSection}>
            <Row>
              <Column style={{ width: '36px' }}>
                <div style={logoIcon}>▲</div>
              </Column>
              <Column>
                <Text style={logoText}>NextLaunch <span style={proBadge}>PRO</span></Text>
              </Column>
              <Column style={{ textAlign: 'right' }}>
                <Text style={categoryBadge}>BILLING NOTICE</Text>
              </Column>
            </Row>
          </Section>

          {/* Hero Banner */}
          <Section style={heroSection}>
            <Heading style={heading}>Upcoming Subscription Renewal</Heading>
            <Text style={subheading}>
              Hi {userName}, this is an automated reminder that your subscription will renew on <strong>{renewalDate}</strong>.
            </Text>
          </Section>

          {/* Renewal Summary Card */}
          <Section style={renewalCard}>
            <Row style={{ paddingBottom: '12px', borderBottom: '1px solid #e2e8f0' }}>
              <Column>
                <Text style={metaLabel}>SUBSCRIPTION PLAN</Text>
                <Text style={metaValue}>{planName}</Text>
              </Column>
              <Column style={{ textAlign: 'right' }}>
                <Text style={metaLabel}>RENEWAL AMOUNT</Text>
                <Text style={amountValue}>{amount}</Text>
              </Column>
            </Row>

            <Row style={{ paddingTop: '12px' }}>
              <Column>
                <Text style={metaLabel}>SCHEDULED CHARGE DATE</Text>
                <Text style={metaValue}>{renewalDate}</Text>
              </Column>
              <Column style={{ textAlign: 'right' }}>
                <Text style={metaLabel}>PAYMENT METHOD</Text>
                <Text style={metaValue}>Visa ending in 4242</Text>
              </Column>
            </Row>
          </Section>

          {/* Info Card */}
          <Section style={infoBox}>
            <Text style={infoTitle}>💡 Need to update your billing details?</Text>
            <Text style={infoText}>
              You can modify your credit card, update company VAT info, or switch plans anytime before {renewalDate} in your customer billing portal.
            </Text>
          </Section>

          {/* Primary CTA */}
          <Section style={ctaSection}>
            <Button style={primaryButton} href={updatePaymentUrl}>
              Manage Billing & Invoices →
            </Button>
          </Section>

          <Text style={cancelNotice}>
            To cancel or pause your plan without being charged, please update your subscription before {renewalDate}.
          </Text>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footerSection}>
            <Text style={footerBrand}>NextLaunch Pro — Enterprise SaaS Foundation</Text>
            <Text style={footerLinks}>
              <Link href="https://nextlaunch.dev/billing" style={footerLink}>Billing Portal</Link> •{' '}
              <Link href="https://nextlaunch.dev/docs" style={footerLink}>Docs</Link> •{' '}
              <Link href="https://nextlaunch.dev/support" style={footerLink}>Contact Support</Link>
            </Text>
            <Text style={footerCopyright}>
              © 2026 NextLaunch Inc. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default DunningRenewalEmail;

// --- Styles ---
const main = {
  backgroundColor: '#f1f5f9',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
  padding: '40px 0',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '36px 40px',
  borderRadius: '16px',
  border: '1px solid #e2e8f0',
  maxWidth: '580px',
  boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
};

const headerSection = {
  marginBottom: '24px',
  paddingBottom: '20px',
  borderBottom: '1px solid #f1f5f9',
};

const logoIcon = {
  width: '32px',
  height: '32px',
  backgroundColor: '#2563eb',
  color: '#ffffff',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold' as const,
  fontSize: '16px',
  textAlign: 'center' as const,
  lineHeight: '32px',
};

const logoText = {
  fontSize: '17px',
  fontWeight: '700' as const,
  color: '#0f172a',
  margin: '0 0 0 10px',
};

const proBadge = {
  fontSize: '10px',
  fontWeight: '800' as const,
  color: '#2563eb',
  backgroundColor: '#eff6ff',
  border: '1px solid #bfdbfe',
  borderRadius: '4px',
  padding: '2px 6px',
  marginLeft: '4px',
};

const categoryBadge = {
  fontSize: '10px',
  fontWeight: '700' as const,
  color: '#d97706',
  backgroundColor: '#fffbeb',
  border: '1px solid #fde68a',
  borderRadius: '4px',
  padding: '3px 8px',
  letterSpacing: '0.5px',
  margin: 0,
};

const heroSection = {
  marginBottom: '20px',
};

const heading = {
  fontSize: '24px',
  letterSpacing: '-0.6px',
  lineHeight: '1.25',
  fontWeight: '800' as const,
  color: '#0f172a',
  margin: '0 0 12px',
};

const subheading = {
  fontSize: '14px',
  lineHeight: '1.65',
  color: '#475569',
  margin: '0',
};

const renewalCard = {
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  padding: '20px 24px',
  margin: '24px 0',
};

const metaLabel = {
  fontSize: '10px',
  fontWeight: '700' as const,
  color: '#94a3b8',
  letterSpacing: '0.8px',
  margin: '0 0 4px',
};

const metaValue = {
  fontSize: '13px',
  fontWeight: '700' as const,
  color: '#0f172a',
  margin: 0,
};

const amountValue = {
  fontSize: '16px',
  fontWeight: '800' as const,
  color: '#2563eb',
  margin: 0,
};

const infoBox = {
  backgroundColor: '#eff6ff',
  border: '1px solid #dbeafe',
  borderRadius: '10px',
  padding: '14px 18px',
  margin: '20px 0',
};

const infoTitle = {
  fontSize: '12px',
  fontWeight: '700' as const,
  color: '#1e40af',
  margin: '0 0 4px',
};

const infoText = {
  fontSize: '12px',
  lineHeight: '1.5',
  color: '#1e3a8a',
  margin: 0,
};

const ctaSection = {
  textAlign: 'center' as const,
  margin: '28px 0 16px',
};

const primaryButton = {
  backgroundColor: '#2563eb',
  borderRadius: '10px',
  fontWeight: '700' as const,
  color: '#ffffff',
  fontSize: '14px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 32px',
  boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)',
};

const cancelNotice = {
  textAlign: 'center' as const,
  fontSize: '11px',
  color: '#94a3b8',
  margin: '0 0 20px',
};

const divider = {
  borderColor: '#f1f5f9',
  margin: '28px 0 20px',
};

const footerSection = {
  textAlign: 'center' as const,
};

const footerBrand = {
  fontSize: '12px',
  fontWeight: '700' as const,
  color: '#475569',
  margin: '0 0 8px',
};

const footerLinks = {
  fontSize: '11px',
  color: '#94a3b8',
  margin: '0 0 10px',
};

const footerLink = {
  color: '#64748b',
  textDecoration: 'none',
};

const footerCopyright = {
  fontSize: '11px',
  color: '#94a3b8',
  margin: 0,
};
