// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import ClientToaster from '@/components/client-toaster'

const SITE_URL = 'https://goodlife.partners'
const SITE_NAME = 'Goodlife Consulting Partners'
const SITE_DESCRIPTION =
  "Welcome to Goodlife consultin partners website. Learn about our mission, vision, impact stats, and sector insights."
const OG_IMAGE = `${SITE_URL}/images/og-why-choose-us.jpg`
const LOGO = `${SITE_URL}/images/logo.png`

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
<html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={SITE_URL} />
        <link rel="icon" href="/images/logo.png" />
        <meta name="theme-color" content="#ffffff" />
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: SITE_NAME,
              url: SITE_URL,
              logo: LOGO,
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  telephone: '+250-790-363-700',
                  contactType: 'Customer Service',
                  areaServed: 'RW',
                  availableLanguage: ['English'],
                },
              ],
              sameAs: [
                'https://www.linkedin.com/company/goodlife-consulting-partners',
                'https://twitter.com/GoodlifeCP',
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-foreground antialiased overflow-visible">
        <div className="fixed inset-0 -z-10 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.02)_25%,rgba(0,0,0,0.02)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.02)_75%)] bg-[length:40px_40px] opacity-[0.03]" />

        <main id="main" aria-label="Page content" className="flex-1 relative z-0 overflow-visible">
          {children}
        </main>
        <ClientToaster />
      </body>
    </html>
  )
}