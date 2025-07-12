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

  // undefined = not yet known, null = definitely not logged in, User = logged in
  const [user, setUser] = useState<User | null | undefined>(undefined)
  const [roleLoading, setRoleLoading] = useState(true)
  const [role, setRole] = useState<string | null>(null)

  // Step 1: Watch Firebase Auth initialization
  useEffect(() => {
    const auth = getAuth()
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
    })
    return () => unsub()
  }, [])

  // Step 2: Once we know user (could be null), handle redirect or fetch role
  useEffect(() => {
    // still waiting on auth init
    if (user === undefined) return

    // no user → send to /auth
    if (user === null) {
      router.replace("/auth")
      return
    }

    // we have a real user → fetch their role
    ;(async () => {
      try {
        console.log("🔥 Checking role for UID:", user.uid)
        const snapshot = await getDoc(doc(db, "users", user.uid))

        if (!snapshot.exists()) {
          throw new Error("User record not found")
        }

        const fetchedRole = snapshot.data()?.role
        console.log("🧠 Role fetched:", fetchedRole)
        setRole(fetchedRole || null)
      } catch (err) {
        console.error("🔴 Role fetch error:", err)
        router.replace("/auth")
      } finally {
        setRoleLoading(false)
      }
    })()
  }, [user, router])

  // Still loading either auth or role
  if (user === undefined || roleLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-terracotta-700" />
      </main>
    )
  }

  // Authenticated but wrong role → bounce
  if (role !== "trainer") {
    const redirectTo = role === "trainee" ? "/dashboard" : "/auth"
    router.replace(redirectTo)
    return null
  }

  // Perfect: authenticated + trainer role
  return (
    <main className="min-h-screen p-8 bg-terracotta-50">
      <h1 className="text-3xl font-bold text-terracotta-700">
        🎓 Trainer Panel
      </h1>
      <p className="mt-4 text-gray-700">
        Manage your programs, review feedback, and guide your trainees here.
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