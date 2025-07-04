import type { Metadata } from "next"
import "./globals.css"
import { ToastProvider } from "@/components/ToastProvider"

export const metadata: Metadata = {
  title: "Goodlife Consulting Partners",
  description: "Empowering Rwanda's future leaders through professional training and development",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <title>Goodlife Consulting Partners</title>
      </head>
      <body className="antialiased text-gray-900 bg-white">
        <ToastProvider />
        {children}
      </body>
    </html>
  )
}