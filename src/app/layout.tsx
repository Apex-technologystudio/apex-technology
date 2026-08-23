import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { site } from '@/lib/site'
import { graph, jsonLdProps, organizationSchema, websiteSchema } from '@/lib/schema'
import { CITY_KEYWORDS, KEYWORDS } from '@/lib/seo'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BottomNav } from '@/components/layout/BottomNav'
import { ContactDrawer } from '@/components/layout/ContactDrawer'
import { Preloader } from '@/components/layout/Preloader'
import { SpeedInsights } from '@vercel/speed-insights/next'

/**
 * Inter is the brand's primary family. Self-hosted by next/font so there is no
 * request to Google's CDN and no layout shift; Arial is the documented fallback.
 */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['Arial', 'Helvetica', 'sans-serif'],
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'POS Software Pakistan — PKR 30,000 One-Time, No Monthly Fee',
    // No template on purpose. A "| APEX TECHNOLOGY" suffix cost 7-18 characters
    // on every page and pushed most titles past Google's truncation point,
    // spending the most valuable pixels in the SERP on a brand name nobody is
    // searching for yet. Each page title below is written to stand alone and
    // already carries the keyword and, where it matters, the price.
    template: '%s',
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    ...KEYWORDS.core,
    ...KEYWORDS.problem,
    ...KEYWORDS.trades,
    ...KEYWORDS.payments,
    ...CITY_KEYWORDS,
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: site.url,
    siteName: site.name,
    title: 'POS Software Pakistan — PKR 30,000 One-Time, No Monthly Fee',
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'POS Software Pakistan — PKR 30,000 One-Time, No Monthly Fee',
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'technology',
  formatDetection: { telephone: true, address: false, email: true },
}

export const viewport: Viewport = {
  themeColor: '#071A2E',
  colorScheme: 'light',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en-PK" className={`${inter.variable} h-full antialiased`}>
      <body className="pb-bottomnav flex min-h-full flex-col bg-white">
        {/* Keyboard users land here first; the target is <main> below. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-cyan focus:px-4 focus:py-2 focus:font-semibold focus:text-navy"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />

        {/* Client-only chrome. None of this is in the server HTML, so crawlers
            and the no-JS experience get the page exactly as before. */}
        <Preloader />
        <BottomNav />
        <ContactDrawer />

        {/*
          Vercel Speed Insights — real-user Core Web Vitals from actual
          visitors, which is the only way to know whether the LCP/CLS work
          holds up on Pakistani mobile connections rather than on this machine.
          Cookieless and no visitor identifiers, but it is still measurement:
          the privacy policy is updated to say so.
          Requires enabling under Speed Insights in the Vercel dashboard; it is
          inert until then and collects nothing in local development.
        */}
        <SpeedInsights />

        <script {...jsonLdProps(graph(organizationSchema(), websiteSchema()))} />
      </body>
    </html>
  )
}
