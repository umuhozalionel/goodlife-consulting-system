// app/layout.tsx
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
      <body className="min-h-screen flex flex-col bg-[#ffffff] text-foreground antialiased overflow-visible">
        {/* Header */}
        <Header />

        {/* Your page content */}
        <main className="flex-1 relative z-0 overflow-visible">
          {children}
        </main>

        {/* Toasts */}
        <ClientToaster />
      </body>
    </html>
  )
}