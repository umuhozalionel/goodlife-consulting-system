// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import ClientToaster from '@/components/client-toaster'

export const metadata: Metadata = {
  title: 'Goodlife Consulting Partners',
  description: 'Learn about our mission, vision, impact stats, and sector insights.',
  metadataBase: new URL('https://goodlifeconsultingpartners.org'),
  openGraph: {
    title: 'Goodlife Consulting Partners',
    description: 'Learn about our mission, vision, impact stats, and sector insights.',
    url: 'https://goodlifeconsultingpartners.org/about',
    siteName: 'Goodlife Consulting Partners',
    images: [
      {
        url: 'https://goodlifeconsultingpartners.org/images/og-about.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Goodlife Consulting Partners',
    description: 'Learn about our mission, vision, impact stats, and sector insights.',
    images: ['https://goodlifeconsultingpartners.org/images/og-about.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Goodlife Consulting Partners',
              url: '/images/logo.png',
              logo: '/images/logo.png',
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
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased overflow-visible">
        <main id="main" aria-label="Page content" className="flex-1 relative z-0 overflow-visible">
          {children}
        </main>
        <ClientToaster />
      </body>
    </html>
  )
}