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

interface InvoiceReceiptEmailProps {
  invoiceNumber?: string;
  amountPaid?: string;
  planName?: string;
  date?: string;
  customerName?: string;
  downloadUrl?: string;
}

export const InvoiceReceiptEmail = ({
  invoiceNumber = 'INV-2026-0982',
  amountPaid = '$99.00',
  planName = 'NextLaunch Pro Plan (Monthly)',
  date = 'September 13, 2026',
  customerName = 'Alex Rivera (Acme SaaS Inc.)',
  downloadUrl = 'https://nextlaunch.dev/invoices/INV-2026-0982.pdf',
}: InvoiceReceiptEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Receipt for Invoice {invoiceNumber} — {amountPaid} Paid</Preview>
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
                <Text style={categoryBadge}>TAX INVOICE</Text>
              </Column>
            </Row>
          </Section>

          {/* Success Banner */}
          <Section style={successBanner}>
            <Row>
              <Column style={{ width: '40px', verticalAlign: 'middle' }}>
                <div style={successIcon}>✓</div>
              </Column>
              <Column style={{ paddingLeft: '8px' }}>
                <Heading style={heading}>Payment Successful</Heading>
                <Text style={subheading}>
                  Thank you! We received your payment of <strong>{amountPaid}</strong>.
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Invoice Summary Box */}
          <Section style={invoiceCard}>
            <div style={invoiceHeader}>
              <Row>
                <Column>
                  <Text style={invoiceLabel}>INVOICE NUMBER</Text>
                  <Text style={invoiceValue}>{invoiceNumber}</Text>
                </Column>
                <Column style={{ textAlign: 'right' }}>
                  <Text style={invoiceLabel}>DATE ISSUED</Text>
                  <Text style={invoiceValue}>{date}</Text>
                </Column>
              </Row>
            </div>

            <div style={customerRow}>
              <Text style={invoiceLabel}>BILLED TO</Text>
              <Text style={customerValue}>{customerName}</Text>
            </div>

            {/* Line items table */}
            <div style={tableContainer}>
              <div style={tableHeader}>
                <Row>
                  <Column style={{ width: '70%' }}>
                    <Text style={thText}>DESCRIPTION</Text>
                  </Column>
                  <Column style={{ width: '30%', textAlign: 'right' }}>
                    <Text style={thText}>AMOUNT</Text>
                  </Column>
                </Row>
              </div>

              <div style={tableRow}>
                <Row>
                  <Column style={{ width: '70%' }}>
                    <Text style={itemTitle}>{planName}</Text>
                    <Text style={itemDesc}>Billing period: Sep 13, 2026 – Oct 13, 2026</Text>
                  </Column>
                  <Column style={{ width: '30%', textAlign: 'right' }}>
                    <Text style={itemPrice}>{amountPaid}</Text>
                  </Column>
                </Row>
              </div>
            </div>

            {/* Total breakdown */}
            <div style={totalContainer}>
              <Row style={{ marginBottom: '6px' }}>
                <Column style={{ width: '70%' }}>
                  <Text style={subtotalLabel}>Subtotal</Text>
                </Column>
                <Column style={{ width: '30%', textAlign: 'right' }}>
                  <Text style={subtotalValue}>{amountPaid}</Text>
                </Column>
              </Row>
              <Row style={{ marginBottom: '10px' }}>
                <Column style={{ width: '70%' }}>
                  <Text style={subtotalLabel}>VAT / Sales Tax (0% Reverse Charge)</Text>
                </Column>
                <Column style={{ width: '30%', textAlign: 'right' }}>
                  <Text style={subtotalValue}>$0.00</Text>
                </Column>
              </Row>
              <div style={totalDivider} />
              <Row>
                <Column style={{ width: '70%' }}>
                  <Text style={totalLabel}>Total Paid (USD)</Text>
                </Column>
                <Column style={{ width: '30%', textAlign: 'right' }}>
                  <Text style={totalValue}>{amountPaid}</Text>
                </Column>
              </Row>
            </div>
          </Section>

          {/* Primary CTA */}
          <Section style={ctaSection}>
            <Button style={primaryButton} href={downloadUrl}>
              Download Official PDF Receipt (VAT) →
            </Button>
          </Section>

          <Section style={polarNotice}>
            <Text style={polarText}>
              🔒 <strong>Merchant of Record:</strong> Payments processed securely via Polar MoR. Full EU/US tax compliance and sales remittance handled automatically.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footerSection}>
            <Text style={footerBrand}>NextLaunch Pro — Enterprise SaaS Foundation</Text>
            <Text style={footerLinks}>
              <Link href="https://nextlaunch.dev/billing" style={footerLink}>Manage Billing</Link> •{' '}
              <Link href="https://nextlaunch.dev/docs" style={footerLink}>Documentation</Link> •{' '}
              <Link href="https://nextlaunch.dev/support" style={footerLink}>Support</Link>
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

export default InvoiceReceiptEmail;

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
  color: '#059669',
  backgroundColor: '#ecfdf5',
  border: '1px solid #a7f3d0',
  borderRadius: '4px',
  padding: '3px 8px',
  letterSpacing: '0.5px',
  margin: 0,
};

const successBanner = {
  marginBottom: '24px',
};

const successIcon = {
  width: '32px',
  height: '32px',
  backgroundColor: '#ecfdf5',
  border: '1px solid #a7f3d0',
  color: '#059669',
  borderRadius: '50%',
  fontWeight: 'bold' as const,
  fontSize: '16px',
  textAlign: 'center' as const,
  lineHeight: '32px',
};

const heading = {
  fontSize: '22px',
  letterSpacing: '-0.5px',
  lineHeight: '1.2',
  fontWeight: '800' as const,
  color: '#0f172a',
  margin: '0 0 4px',
};

const subheading = {
  fontSize: '14px',
  lineHeight: '1.5',
  color: '#475569',
  margin: '0',
};

const invoiceCard = {
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  padding: '20px 24px',
  margin: '24px 0',
};

const invoiceHeader = {
  paddingBottom: '16px',
  borderBottom: '1px solid #e2e8f0',
};

const invoiceLabel = {
  fontSize: '10px',
  fontWeight: '700' as const,
  color: '#94a3b8',
  letterSpacing: '0.8px',
  margin: '0 0 4px',
};

const invoiceValue = {
  fontSize: '13px',
  fontWeight: '700' as const,
  color: '#0f172a',
  margin: 0,
};

const customerRow = {
  padding: '16px 0',
  borderBottom: '1px solid #e2e8f0',
};

const customerValue = {
  fontSize: '13px',
  fontWeight: '600' as const,
  color: '#334155',
  margin: 0,
};

const tableContainer = {
  margin: '16px 0',
};

const tableHeader = {
  paddingBottom: '8px',
  borderBottom: '1px solid #e2e8f0',
};

const thText = {
  fontSize: '10px',
  fontWeight: '700' as const,
  color: '#94a3b8',
  letterSpacing: '0.8px',
  margin: 0,
};

const tableRow = {
  padding: '12px 0',
  borderBottom: '1px solid #e2e8f0',
};

const itemTitle = {
  fontSize: '13px',
  fontWeight: '700' as const,
  color: '#0f172a',
  margin: '0 0 2px',
};

const itemDesc = {
  fontSize: '11px',
  color: '#64748b',
  margin: 0,
};

const itemPrice = {
  fontSize: '13px',
  fontWeight: '700' as const,
  color: '#0f172a',
  margin: 0,
};

const totalContainer = {
  paddingTop: '12px',
};

const subtotalLabel = {
  fontSize: '12px',
  color: '#64748b',
  margin: 0,
};

const subtotalValue = {
  fontSize: '12px',
  fontWeight: '600' as const,
  color: '#334155',
  margin: 0,
};

const totalDivider = {
  height: '1px',
  backgroundColor: '#cbd5e1',
  margin: '8px 0 10px',
};

const totalLabel = {
  fontSize: '14px',
  fontWeight: '800' as const,
  color: '#0f172a',
  margin: 0,
};

const totalValue = {
  fontSize: '18px',
  fontWeight: '800' as const,
  color: '#2563eb',
  margin: 0,
};

const ctaSection = {
  textAlign: 'center' as const,
  margin: '28px 0 16px',
};

const primaryButton = {
  backgroundColor: '#0f172a',
  borderRadius: '10px',
  fontWeight: '700' as const,
  color: '#ffffff',
  fontSize: '13px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 28px',
  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.15)',
};

const polarNotice = {
  backgroundColor: '#eff6ff',
  border: '1px solid #dbeafe',
  borderRadius: '8px',
  padding: '12px 16px',
  margin: '16px 0 24px',
};

const polarText = {
  fontSize: '11px',
  lineHeight: '1.5',
  color: '#1e40af',
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
