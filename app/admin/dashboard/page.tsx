"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [accessGranted, setAccessGranted] = useState(false)

  useEffect(() => {
    const auth = getAuth()

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("🔥 onAuthStateChanged fired")
      if (!user) {
        console.warn("🚫 No user detected — redirecting to /auth")
        router.push("/auth")
        return
      }

      console.log("✅ Firebase user detected:", user.uid)

      try {
        const ref = doc(db, "users", user.uid)
        const snap = await getDoc(ref)

        console.log("📄 Firestore snap exists:", snap.exists())
        console.log("📄 Firestore snap data:", snap.data())

        if (!snap.exists()) {
          console.warn("⚠️ Firestore document missing — redirecting to /auth")
          router.push("/auth")
          return
        }

        const { role } = snap.data()
        console.log("🧠 Retrieved role:", role)

        if (role === "trainer") {
          setAccessGranted(true)
        } else {
          console.warn("⛔ Role mismatch — redirecting to /dashboard")
          router.push("/dashboard")
        }
      } catch (error: any) {
        console.error("🔥 Error during role verification:", error)
        router.push("/auth")
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  if (loading || !accessGranted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="h-6 w-6 animate-spin text-terracotta-700" />
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-white to-terracotta-50">
      <div className="max-w-2xl w-full text-center space-y-6">
        <h1 className="text-3xl font-bold text-terracotta-700">🎓 Trainer Panel</h1>
        <p className="text-gray-600 text-md">
          Welcome trainer! Here you’ll be able to manage programs, review feedback,
          update schedules, and monitor trainee progress.
        </p>

        <div className="bg-white shadow-md rounded-lg p-6 mt-4 space-y-3 text-left text-gray-700">
          <p>✅ Manage upcoming trainings</p>
          <p>✅ Approve testimonials and registration</p>
          <p>✅ Add or edit training categories</p>
          <p>✅ View registered trainees</p>
        </div>

        <Button
          className="mt-6 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={async () => {
            await signOut(getAuth())
            router.push("/auth")
          }}
        >
          Sign Out
        </Button>
      </div>
    </main>
  )
}