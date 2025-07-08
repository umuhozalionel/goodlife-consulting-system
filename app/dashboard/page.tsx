"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Simulate loading or session check
    const timeout = setTimeout(() => setIsMounted(true), 800)
    return () => clearTimeout(timeout)
  }, [])

  if (!isMounted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="h-6 w-6 text-terracotta-700 animate-spin" />
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-terracotta-100 px-4">
      <div className="w-full max-w-2xl text-center space-y-6">
        <h1 className="text-3xl font-bold text-terracotta-700">Welcome to your dashboard</h1>
        <p className="text-gray-600">
          You're officially logged in, and we’re ready to roll. In future updates, this page can show your
          testimonials, training progress, or admin tools based on your user role.
        </p>
      </div>
    </main>
  )
}