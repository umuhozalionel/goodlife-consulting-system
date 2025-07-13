import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Goodlife Consulting Platform",
  description: "Empowering trainers and trainees to thrive",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}