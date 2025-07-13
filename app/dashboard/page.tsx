"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged, User } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TraineeDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null | undefined>(undefined)
  const [routingBlocked, setRoutingBlocked] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (user === undefined) return
    if (user === null) {
      router.replace("/auth")
    } else {
      setRoutingBlocked(false)
    }
  }, [user, router])

  if (user === undefined || routingBlocked) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-700" />
      </main>
    )
  }

  return (
    <main className="min-h-screen p-8 bg-emerald-50">
      <h1 className="text-3xl font-bold text-emerald-700">🧑‍🎓 Trainee Dashboard</h1>

      {user && (
        <p className="mt-4 text-gray-700">
          Welcome back, {user.displayName || user.email}! Here's your personal training space.
        </p>
      )}

      <section className="mt-8 space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-emerald-600">📘 Your Active Courses</h2>
          <ul className="mt-2 list-disc list-inside text-gray-700">
            <li>Goal Setting Fundamentals</li>
            <li>Mindset & Productivity Boost</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-emerald-600">📊 Progress Overview</h2>
          <p className="mt-2 text-gray-700">You're 72% through your current track — keep going strong!</p>
        </div>
      </section>

      <div className="mt-10">
        <Button
          variant="destructive"
          onClick={async () => {
            await auth.signOut()
            router.replace("/auth")
          }}
        >
          Sign Out
        </Button>
      </div>
    </main>
  )
}