"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getAuth, onAuthStateChanged, User } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TrainerDashboardPage() {
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
        const snap = await getDoc(doc(db, "users", user.uid))
        if (!snap.exists()) throw new Error("User not found")
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
      <main className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-terracotta-700" />
      </main>
    )
  }

  if (role !== "trainer") {
    const redirectTo = role === "trainee" ? "/dashboard" : "/auth"
    router.replace(redirectTo)
    return null
  }

  return (
    <main className="min-h-screen p-8 bg-terracotta-50">
      <h1 className="text-3xl font-bold text-terracotta-700">🎓 Trainer Panel</h1>
      <p className="mt-4 text-gray-700">
        Welcome back, Jane! Your programs, feedback, and trainees are ready.
      </p>

      <Button
        variant="destructive"
        className="mt-6"
        onClick={async () => {
          await getAuth().signOut()
          router.replace("/auth")
        }}
      >
        Sign Out
      </Button>
    </main>
  )
}