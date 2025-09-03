// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
// import DebugCSSVariables from "@/components/DebugCSSVariables";

export const metadata: Metadata = {
  title: "Goodlife Consulting Platform",
  description: "Empowering trainers and trainees to thrive",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className="
          min-h-screen
          bg-[url('/images/layout.jpg')]
          bg-cover
          bg-center
          bg-background
          text-foreground
          antialiased
          flex
          justify-center
        "
      >
        {/* Skip link for keyboard users */}
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-green-700 text-white px-3 py-2 rounded-md"
        >
          Skip to main content
        </a>

        {/* <DebugCSSVariables /> */}

        {/* Centered “card” container for your entire site */}
        <div className="w-full max-w-7xl bg-[#0a1932] shadow-xl overflow-hidden">
          {children}
        </div>

        <Toaster />
      </body>
    </html>
  );
}