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

interface WelcomeEmailProps {
  userName?: string;
  workspaceName?: string;
  dashboardUrl?: string;
}

export const WelcomeEmail = ({
  userName = 'Alex Rivera',
  workspaceName = 'Acme SaaS Inc.',
  dashboardUrl = 'https://nextlaunch.dev/acme-corp',
}: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to NextLaunch — Your SaaS foundation is ready</Preview>
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
                <Text style={categoryBadge}>ONBOARDING</Text>
              </Column>
            </Row>
          </Section>

          {/* Hero Banner */}
          <Section style={heroSection}>
            <Heading style={heading}>Welcome aboard, {userName}!</Heading>
            <Text style={subheading}>
              Your full-stack workspace <strong>{workspaceName}</strong> has been successfully provisioned. You now have complete access to the production SaaS foundation, AI studio, and PreFlight UI kit.
            </Text>
          </Section>

          {/* Workspace Quick-Access Card */}
          <Section style={workspaceCard}>
            <Row>
              <Column style={{ width: '48px' }}>
                <div style={workspaceAvatar}>A</div>
              </Column>
              <Column>
                <Text style={workspaceTitle}>{workspaceName}</Text>
                <Text style={workspaceMeta}>Owner • Pro Launch Plan • Active</Text>
              </Column>
            </Row>
          </Section>

          {/* Primary CTA */}
          <Section style={ctaSection}>
            <Button style={primaryButton} href={dashboardUrl}>
              Open Your Workspace Dashboard →
            </Button>
          </Section>

          {/* 3 Step Onboarding Guide Cards */}
          <Section style={stepsContainer}>
            <Text style={sectionTitle}>3 Quick Steps to Launch:</Text>

            {/* Step 1 */}
            <div style={stepCard}>
              <Row>
                <Column style={{ width: '32px', verticalAlign: 'top' }}>
                  <div style={stepNumber}>1</div>
                </Column>
                <Column style={{ paddingLeft: '12px' }}>
                  <Text style={stepHeading}>Configure Payment Gateway</Text>
                  <Text style={stepDesc}>
                    Add your Polar / Stripe credentials in <code>.env.local</code> to activate automated subscriptions and VAT receipts.
                  </Text>
                </Column>
              </Row>
            </div>

            {/* Step 2 */}
            <div style={stepCard}>
              <Row>
                <Column style={{ width: '32px', verticalAlign: 'top' }}>
                  <div style={stepNumber}>2</div>
                </Column>
                <Column style={{ paddingLeft: '12px' }}>
                  <Text style={stepHeading}>Explore AI Copilot Studio</Text>
                  <Text style={stepDesc}>
                    Test Gemini 2.5 Flash & GPT-4o streaming with your complimentary 1,000 token credits ledger.
                  </Text>
                </Column>
              </Row>
            </div>

            {/* Step 3 */}
            <div style={stepCard}>
              <Row>
                <Column style={{ width: '32px', verticalAlign: 'top' }}>
                  <div style={stepNumber}>3</div>
                </Column>
                <Column style={{ paddingLeft: '12px' }}>
                  <Text style={stepHeading}>Invite Your Teammates</Text>
                  <Text style={stepDesc}>
                    Add developers and stakeholders with granular role-based access control.
                  </Text>
                </Column>
              </Row>
            </div>
          </Section>

          {/* Help Box */}
          <Section style={helpBox}>
            <Text style={helpTitle}>💡 Need developer assistance?</Text>
            <Text style={helpText}>
              Explore our comprehensive <Link href="https://nextlaunch.dev/docs" style={link}>Documentation</Link> or reply directly to this email to reach our engineering team.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footerSection}>
            <Text style={footerBrand}>NextLaunch Pro — Enterprise SaaS Foundation</Text>
            <Text style={footerLinks}>
              <Link href="https://nextlaunch.dev/dashboard" style={footerLink}>Dashboard</Link> •{' '}
              <Link href="https://nextlaunch.dev/docs" style={footerLink}>Docs</Link> •{' '}
              <Link href="https://nextlaunch.dev/changelog" style={footerLink}>Changelog</Link> •{' '}
              <Link href="https://nextlaunch.dev/privacy" style={footerLink}>Privacy Policy</Link>
            </Text>
            <Text style={footerCopyright}>
              © 2026 NextLaunch Inc. 548 Market St, San Francisco, CA 94104.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;

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
  marginBottom: '28px',
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
  color: '#64748b',
  letterSpacing: '1px',
  margin: 0,
};

const heroSection = {
  marginBottom: '24px',
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

const workspaceCard = {
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  padding: '16px 20px',
  margin: '24px 0',
};

const workspaceAvatar = {
  width: '40px',
  height: '40px',
  backgroundColor: '#2563eb',
  color: '#ffffff',
  borderRadius: '8px',
  fontWeight: '700' as const,
  fontSize: '16px',
  textAlign: 'center' as const,
  lineHeight: '40px',
};

const workspaceTitle = {
  fontSize: '14px',
  fontWeight: '700' as const,
  color: '#0f172a',
  margin: '0 0 2px',
};

const workspaceMeta = {
  fontSize: '12px',
  color: '#64748b',
  margin: 0,
};

const ctaSection = {
  textAlign: 'center' as const,
  margin: '28px 0',
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
  padding: '14px 28px',
  boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)',
};

const stepsContainer = {
  margin: '32px 0',
};

const sectionTitle = {
  fontSize: '13px',
  fontWeight: '700' as const,
  color: '#0f172a',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '0 0 16px',
};

const stepCard = {
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '10px',
  padding: '14px 16px',
  marginBottom: '10px',
};

const stepNumber = {
  width: '24px',
  height: '24px',
  backgroundColor: '#eff6ff',
  border: '1px solid #bfdbfe',
  color: '#2563eb',
  borderRadius: '50%',
  fontWeight: '700' as const,
  fontSize: '12px',
  textAlign: 'center' as const,
  lineHeight: '24px',
};

const stepHeading = {
  fontSize: '13px',
  fontWeight: '700' as const,
  color: '#0f172a',
  margin: '0 0 3px',
};

const stepDesc = {
  fontSize: '12px',
  lineHeight: '1.5',
  color: '#64748b',
  margin: '0',
};

const helpBox = {
  backgroundColor: '#eff6ff',
  border: '1px solid #dbeafe',
  borderRadius: '10px',
  padding: '16px 20px',
  margin: '24px 0',
};

const helpTitle = {
  fontSize: '13px',
  fontWeight: '700' as const,
  color: '#1e40af',
  margin: '0 0 4px',
};

const helpText = {
  fontSize: '12px',
  lineHeight: '1.5',
  color: '#1e3a8a',
  margin: 0,
};

const link = {
  color: '#2563eb',
  fontWeight: '600' as const,
  textDecoration: 'underline',
};

const divider = {
  borderColor: '#f1f5f9',
  margin: '32px 0 24px',
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
