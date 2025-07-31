import "./globals.css"
import type { Metadata } from "next"
import { Toaster } from "@/components/ui/toaster"
// Optional debug component to help visualize color tokens
// import DebugCSSVariables from "@/components/DebugCSSVariables"

export const metadata: Metadata = {
  title: "Goodlife Consulting Platform",
  description: "Empowering trainers and trainees to thrive",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-background text-foreground antialiased">
        {/* <DebugCSSVariables /> */}
        {children}
        <Toaster />
      </body>
    </html>
  )
}