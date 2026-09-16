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

interface MagicLinkEmailProps {
  loginUrl?: string;
  authCode?: string;
}

export const MagicLinkEmail = ({
  loginUrl = 'https://nextlaunch.dev/auth/verify?token=ml_9128308491823',
  authCode = '482-910',
}: MagicLinkEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your NextLaunch sign-in code is {authCode}</Preview>
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
                <Text style={categoryBadge}>AUTH</Text>
              </Column>
            </Row>
          </Section>

          {/* Hero Banner */}
          <Section style={heroSection}>
            <Heading style={heading}>Sign in to NextLaunch</Heading>
            <Text style={subheading}>
              We received a request to sign in to your NextLaunch account. Use the one-click instant button or enter the security code below.
            </Text>
          </Section>

          {/* Primary CTA */}
          <Section style={ctaSection}>
            <Button style={primaryButton} href={loginUrl}>
              Sign In to Your Account →
            </Button>
          </Section>

          {/* Code Section */}
          <Section style={codeCard}>
            <Text style={codeLabel}>OR ENTER THIS ONE-TIME CODE</Text>
            <div style={codeBox}>
              <Text style={codeDigits}>{authCode}</Text>
            </div>
            <Text style={codeHint}>Valid for 10 minutes. Single-use only.</Text>
          </Section>

          {/* Security Alert Box */}
          <Section style={securityBox}>
            <Text style={securityText}>
              🛡️ <strong>Security Notice:</strong> If you didn't attempt to sign in, someone may have mistyped their email. Your account remains completely safe and you can ignore this message.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footerSection}>
            <Text style={footerBrand}>NextLaunch Pro — Enterprise SaaS Foundation</Text>
            <Text style={footerLinks}>
              <Link href="https://nextlaunch.dev/security" style={footerLink}>Security</Link> •{' '}
              <Link href="https://nextlaunch.dev/docs" style={footerLink}>Docs</Link> •{' '}
              <Link href="https://nextlaunch.dev/privacy" style={footerLink}>Privacy</Link>
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

export default MagicLinkEmail;

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
  color: '#0284c7',
  backgroundColor: '#f0f9ff',
  border: '1px solid #bae6fd',
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

const ctaSection = {
  textAlign: 'center' as const,
  margin: '28px 0 24px',
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

const codeCard = {
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  padding: '20px',
  textAlign: 'center' as const,
  margin: '20px 0',
};

const codeLabel = {
  fontSize: '10px',
  fontWeight: '700' as const,
  color: '#94a3b8',
  letterSpacing: '0.8px',
  margin: '0 0 10px',
};

const codeBox = {
  backgroundColor: '#ffffff',
  border: '1px dashed #cbd5e1',
  borderRadius: '8px',
  padding: '12px 20px',
  display: 'inline-block',
};

const codeDigits = {
  fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
  fontSize: '28px',
  fontWeight: '800' as const,
  letterSpacing: '4px',
  color: '#0f172a',
  margin: 0,
};

const codeHint = {
  fontSize: '11px',
  color: '#64748b',
  margin: '10px 0 0',
};

const securityBox = {
  backgroundColor: '#fffbeb',
  border: '1px solid #fef3c7',
  borderRadius: '8px',
  padding: '12px 16px',
  margin: '20px 0',
};

const securityText = {
  fontSize: '11px',
  lineHeight: '1.5',
  color: '#92400e',
  margin: 0,
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
