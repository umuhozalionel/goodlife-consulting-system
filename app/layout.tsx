import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import ClientToaster from '@/components/client-toaster'

export const metadata: Metadata = {
  title: 'Goodlife Consulting Platform',
  description: 'Empowering trainers and trainees to thrive',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-foreground antialiased overflow-visible">
        {/* Header always at the top */}
        <Header />

        {/* 
          flex-1 lets HeroSection fill remaining space 
          removed pb-16 so no extra gap under the hero 
        */}
        <div className="flex-1 w-full bg-gradient-to-br from-terracotta-50 to-forest-50 shadow-xl relative z-0 overflow-visible">
          <main className="flex-1 pt-16 relative z-10">
            {children}
          </main>
        </div>

        {/* Client-only Toaster */}
        <ClientToaster />
      </body>
    </html>
  )
}