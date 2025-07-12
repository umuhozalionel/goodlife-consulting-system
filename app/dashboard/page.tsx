"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getAuth, onAuthStateChanged, User } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Loader2 } from "lucide-react"

export default function TraineeDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null | undefined>(undefined)
  const [roleLoading, setRoleLoading] = useState(true)
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(getAuth(), (u) => {
      setUser(u)
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    if (user === undefined) return
    if (user === null) {
      router.replace("/auth")
      return
    }

    ;(async () => {
      try {
        console.log("🔥 Checking role for UID:", user.uid)
        const snap = await getDoc(doc(db, "users", user.uid))
        if (!snap.exists()) throw new Error("User record not found")
        setRole(snap.data()?.role || null)
      } catch {
        router.replace("/auth")
      } finally {
        setRoleLoading(false)
      }
    })()
  }, [user, router])

  if (user === undefined || roleLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-700" />
      </main>
    )
  }

  if (role !== "trainee") {
    const dest = role === "trainer" ? "/admin/dashboard" : "/auth"
    router.replace(dest)
    return null
  }

  return (
    <main className="min-h-screen p-8 bg-emerald-50">
      <h1 className="text-3xl font-bold text-emerald-700">
        🧑‍🎓 Trainee Dashboard
      </h1>
      <p className="mt-4 text-gray-700">
        Welcome back! Here are your courses, feedback, and progress stats.
      </p>
    </main>
  )
}