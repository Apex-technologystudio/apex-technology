import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { site } from '@/lib/site'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = `${site.name} — ${site.tagline}`

/**
 * Default social share card.
 *
 * Drawn rather than photographed so it stays on-brand at any crop, and built
 * from primitives only — next/og has no access to the site's Tailwind classes,
 * so every style here is inline.
 *
 * Inter is loaded from a vendored WOFF rather than relying on next/font: the OG
 * renderer accepts TTF/OTF/WOFF but not WOFF2, which is the only format
 * next/font emits. Without this the card falls back to a system face with no
 * heavy weight, and the headline renders light — off-brand for a type system
 * built on weight contrast. Inter is OFL-licensed, so shipping the file is fine
 * (licence alongside it in src/assets/fonts).
 */
const loadFont = (file: string) =>
  readFile(join(process.cwd(), 'src', 'assets', 'fonts', file))

export default async function OpengraphImage() {
  const [regular, extraBold] = await Promise.all([
    loadFont('Inter-Regular.woff'),
    loadFont('Inter-ExtraBold.woff'),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#071A2E',
          padding: 72,
          position: 'relative',
          fontFamily: 'Inter',
        }}
      >
        {/* Cyan glow, echoing the hero */}
        <div
          style={{
            position: 'absolute',
            top: -180,
            left: 360,
            width: 620,
            height: 420,
            background: '#18B7E8',
            opacity: 0.22,
            filter: 'blur(120px)',
            borderRadius: 999,
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: 14,
              background: '#18B7E8',
              color: '#071A2E',
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            A
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 30,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: 2,
            }}
          >
            APEX TECHNOLOGY
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 68,
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.1,
              letterSpacing: -2,
              maxWidth: 940,
            }}
          >
            POS software for Pakistani shops
          </div>
          <div style={{ display: 'flex', fontSize: 32, color: '#18B7E8', fontWeight: 600 }}>
            Works offline · No monthly fee · From PKR 30,000
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255,255,255,0.15)',
            paddingTop: 28,
            fontSize: 24,
            color: '#90AECB',
          }}
        >
          <div style={{ display: 'flex' }}>{site.tagline}</div>
          <div style={{ display: 'flex' }}>{site.phoneDisplay}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Inter', data: regular, weight: 400, style: 'normal' },
        { name: 'Inter', data: extraBold, weight: 800, style: 'normal' },
      ],
    },
  )
}
