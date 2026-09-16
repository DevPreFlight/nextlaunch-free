import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'NextLaunch Pro — Next.js 16 SaaS Foundation';
    const subtitle = searchParams.get('subtitle') || 'Production SaaS Boilerplate with Multi-Tenant, Polar & Stripe, AI Studio & Flat UI Kit';
    const category = searchParams.get('category') || 'NEXTLAUNCH PRO';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#0f172a',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #1e293b 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1e293b 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            padding: '60px 80px',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#2563eb',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: 'bold',
                }}
              >
                ▲
              </div>
              <span style={{ color: 'white', fontSize: '28px', fontWeight: 'bold' }}>NextLaunch</span>
            </div>
            <div
              style={{
                backgroundColor: 'rgba(37, 99, 235, 0.15)',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                borderRadius: '8px',
                padding: '8px 16px',
                color: '#60a5fa',
                fontSize: '16px',
                fontWeight: 'bold',
                letterSpacing: '1px',
              }}
            >
              {category}
            </div>
          </div>

          {/* Main Title & Subtitle */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h1
              style={{
                fontSize: '54px',
                fontWeight: '900',
                color: '#ffffff',
                lineHeight: 1.15,
                letterSpacing: '-1px',
                margin: 0,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: '22px',
                color: '#94a3b8',
                lineHeight: 1.5,
                margin: 0,
                maxWidth: '900px',
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Footer Metadata */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid #1e293b',
              paddingTop: '30px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', color: '#64748b', fontSize: '18px' }}>
              <span>🚀 Next.js 16 (Turbopack)</span>
              <span>⚡ React 19</span>
              <span>💳 Polar & Stripe MoR</span>
              <span>✨ 60+ UI Kit Components</span>
            </div>
            <div style={{ color: '#3b82f6', fontSize: '18px', fontWeight: 'bold' }}>nextlaunch.dev</div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate the image: ${e.message}`, {
      status: 500,
    });
  }
}
