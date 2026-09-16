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

interface TeamInviteEmailProps {
  inviterName?: string;
  inviterEmail?: string;
  workspaceName?: string;
  role?: string;
  inviteUrl?: string;
}

export const TeamInviteEmail = ({
  inviterName = 'Alex Rivera',
  inviterEmail = 'alex@acme.inc',
  workspaceName = 'Acme SaaS Inc.',
  role = 'Administrator',
  inviteUrl = 'https://nextlaunch.dev/invite/token_88712399a',
}: TeamInviteEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>{inviterName} invited you to join {workspaceName} on NextLaunch</Preview>
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
                <Text style={categoryBadge}>COLLABORATION</Text>
              </Column>
            </Row>
          </Section>

          {/* Hero Banner */}
          <Section style={heroSection}>
            <Heading style={heading}>You've been invited!</Heading>
            <Text style={subheading}>
              <strong>{inviterName}</strong> ({inviterEmail}) has invited you to collaborate on the <strong>{workspaceName}</strong> workspace.
            </Text>
          </Section>

          {/* Invitation Details Card */}
          <Section style={inviteCard}>
            <Row style={{ marginBottom: '12px' }}>
              <Column style={{ width: '48px' }}>
                <div style={workspaceAvatar}>A</div>
              </Column>
              <Column>
                <Text style={workspaceTitle}>{workspaceName}</Text>
                <Text style={workspaceRole}>Role: <span style={rolePill}>{role}</span></Text>
              </Column>
            </Row>

            <div style={permissionBox}>
              <Text style={permissionTitle}>As an {role}, you will be able to:</Text>
              <ul style={permissionList}>
                <li style={permissionItem}>Deploy server actions & configure API keys</li>
                <li style={permissionItem}>Access Multi-LLM AI Copilot Studio prompts</li>
                <li style={permissionItem}>Review audit logs & team activity traces</li>
              </ul>
            </div>
          </Section>

          {/* Primary CTA */}
          <Section style={ctaSection}>
            <Button style={primaryButton} href={inviteUrl}>
              Accept Invitation & Join Team →
            </Button>
          </Section>

          <Text style={expirationNotice}>
            ⏰ This invitation was sent to your email and expires in <strong>7 days</strong>.
          </Text>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footerSection}>
            <Text style={footerBrand}>NextLaunch Pro — Enterprise SaaS Foundation</Text>
            <Text style={footerLinks}>
              <Link href="https://nextlaunch.dev" style={footerLink}>Homepage</Link> •{' '}
              <Link href="https://nextlaunch.dev/docs" style={footerLink}>Docs</Link> •{' '}
              <Link href="https://nextlaunch.dev/security" style={footerLink}>Security</Link>
            </Text>
            <Text style={footerCopyright}>
              If you did not expect this invite, you can safely ignore this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default TeamInviteEmail;

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
  color: '#4f46e5',
  backgroundColor: '#eef2ff',
  border: '1px solid #c7d2fe',
  borderRadius: '4px',
  padding: '3px 8px',
  letterSpacing: '0.5px',
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

const inviteCard = {
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  padding: '20px 24px',
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
  fontSize: '15px',
  fontWeight: '700' as const,
  color: '#0f172a',
  margin: '0 0 4px',
};

const workspaceRole = {
  fontSize: '12px',
  color: '#64748b',
  margin: 0,
};

const rolePill = {
  backgroundColor: '#eff6ff',
  color: '#2563eb',
  fontWeight: '700' as const,
  border: '1px solid #bfdbfe',
  borderRadius: '4px',
  padding: '1px 6px',
};

const permissionBox = {
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  padding: '14px 16px',
  marginTop: '16px',
};

const permissionTitle = {
  fontSize: '12px',
  fontWeight: '700' as const,
  color: '#334155',
  margin: '0 0 8px',
};

const permissionList = {
  margin: 0,
  paddingLeft: '18px',
};

const permissionItem = {
  fontSize: '12px',
  lineHeight: '1.6',
  color: '#64748b',
  marginBottom: '4px',
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
  padding: '14px 28px',
  boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)',
};

const expirationNotice = {
  textAlign: 'center' as const,
  fontSize: '12px',
  color: '#94a3b8',
  margin: '0 0 24px',
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
