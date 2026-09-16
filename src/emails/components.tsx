import * as React from 'react';

export interface BaseEmailProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const Html: React.FC<BaseEmailProps & { lang?: string; dir?: string }> = ({
  children,
  lang = 'en',
  dir = 'ltr',
  style,
}) => (
  <html lang={lang} dir={dir} style={style}>
    {children}
  </html>
);

export const Head: React.FC<BaseEmailProps> = ({ children }) => (
  <head>
    <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    {children}
  </head>
);

export const Body: React.FC<BaseEmailProps> = ({ children, style, className }) => (
  <body style={{ margin: 0, padding: 0, backgroundColor: '#f8fafc', ...style }} className={className}>
    {children}
  </body>
);

export const Container: React.FC<BaseEmailProps> = ({ children, style, className }) => (
  <div
    style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      ...style,
    }}
    className={className}
  >
    {children}
  </div>
);

export const Section: React.FC<BaseEmailProps> = ({ children, style, className }) => (
  <table
    align="center"
    width="100%"
    border={0}
    cellPadding="0"
    cellSpacing="0"
    role="presentation"
    style={{ width: '100%', ...style }}
    className={className}
  >
    <tbody>
      <tr>
        <td>{children}</td>
      </tr>
    </tbody>
  </table>
);

export const Row: React.FC<BaseEmailProps> = ({ children, style, className }) => (
  <table
    align="center"
    width="100%"
    border={0}
    cellPadding="0"
    cellSpacing="0"
    role="presentation"
    style={{ width: '100%', ...style }}
    className={className}
  >
    <tbody style={{ width: '100%' }}>
      <tr style={{ width: '100%' }}>{children}</tr>
    </tbody>
  </table>
);

export const Column: React.FC<BaseEmailProps & { align?: 'left' | 'center' | 'right' }> = ({
  children,
  style,
  align,
  className,
}) => (
  <td align={align} style={style} className={className}>
    {children}
  </td>
);

export const Heading: React.FC<
  BaseEmailProps & { as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' }
> = ({ children, as: Tag = 'h1', style, className }) => (
  <Tag style={{ margin: '0 0 16px', color: '#0f172a', ...style }} className={className}>
    {children}
  </Tag>
);

export const Text: React.FC<BaseEmailProps> = ({ children, style, className }) => (
  <p style={{ margin: '0 0 16px', color: '#334155', fontSize: '14px', lineHeight: '24px', ...style }} className={className}>
    {children}
  </p>
);

export const Link: React.FC<BaseEmailProps & { href: string; target?: string }> = ({
  children,
  href,
  target = '_blank',
  style,
  className,
}) => (
  <a
    href={href}
    target={target}
    rel="noopener noreferrer"
    style={{ color: '#4f46e5', textDecoration: 'underline', ...style }}
    className={className}
  >
    {children}
  </a>
);

export const Button: React.FC<
  BaseEmailProps & { href: string; target?: string }
> = ({ children, href, target = '_blank', style, className }) => (
  <a
    href={href}
    target={target}
    rel="noopener noreferrer"
    style={{
      display: 'inline-block',
      padding: '12px 24px',
      backgroundColor: '#4f46e5',
      color: '#ffffff',
      textDecoration: 'none',
      borderRadius: '8px',
      fontWeight: 'bold',
      fontSize: '14px',
      textAlign: 'center',
      ...style,
    }}
    className={className}
  >
    {children}
  </a>
);

export const Hr: React.FC<BaseEmailProps> = ({ style, className }) => (
  <hr
    style={{
      border: 'none',
      borderTop: '1px solid #e2e8f0',
      margin: '24px 0',
      ...style,
    }}
    className={className}
  />
);

export const Preview: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      display: 'none',
      overflow: 'hidden',
      lineHeight: '1px',
      opacity: 0,
      maxHeight: 0,
      maxWidth: 0,
    }}
  >
    {children}
  </div>
);

// Re-export email renderer helper
export async function renderEmail(element: React.ReactElement): Promise<string> {
  const ReactDOMServer = (await import('react-dom/server')).default;
  const markup = ReactDOMServer.renderToStaticMarkup(element);
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n${markup}`;
}
