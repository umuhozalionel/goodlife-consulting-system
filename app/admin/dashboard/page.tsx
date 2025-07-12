"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getAuth } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Loader2 } from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [accessGranted, setAccessGranted] = useState(false)

  useEffect(() => {
    const verifyAdminAccess = async () => {
      const auth = getAuth()
      const user = auth.currentUser

      if (!user) {
        router.push("/auth")
        return
      }

      const ref = doc(db, "users", user.uid)
      const snap = await getDoc(ref)

      if (!snap.exists()) {
        router.push("/dashboard")
        return
      }

      const { role } = snap.data()
      if (role === "trainer") {
        setAccessGranted(true)
      } else {
        router.push("/dashboard")
      }

      setLoading(false)
    }

    verifyAdminAccess()
  }, [router])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="h-6 w-6 animate-spin text-terracotta-700" />
      </main>
    )
  }

  if (!accessGranted) return null // block render if not allowed

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
      </div>
    </main>
  )
}