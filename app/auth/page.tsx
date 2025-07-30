// app/ath/page.tsx

"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import AuthHeader from "@/components/ui/AuthHeader"

export default function RoleSelectionPage() {
  const router = useRouter()

  return (
    <>
      <AuthHeader />

      {/* Full-screen BG with Auth.jpg */}
      <div className="relative w-full min-h-screen flex items-center justify-center
                      bg-[url('/images/life-7.jpg')] bg-cover bg-center">
        {/* Overlay to darken & blur */}
        <div className="absolutae inset-0 bg-black/30 backdrop-blur-sm" />

        {/* Content panel */}
        <main className="relative z-10 w-full max-w-xl p-8 bg-white/70 backdrop-blur-md
                         rounded-2xl space-y-8 text-center shadow-xl">
          <h1 className="text-4xl font-bold text-gray-800">
            Choose Your Journey with Goodlife
          </h1>
          <p className="text-md text-gray-600">
            Whether you're here to learn or lead, we've built a space where both roles shine.
          </p>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <Button
                className="w-full py-6 text-lg font-semibold rounded-xl
                           bg-gradient-to-br from-green-500 to-teal-600
                           text-white hover:scale-[1.02] transition"
                onClick={() => router.push("/signup/trainee")}
              >
                🧑‍🎓 I’m Here to Learn
              </Button>
              <p className="text-sm text-gray-500">
                Sign up as a trainee to access trainings, receive feedback, and grow with expert guidance.
              </p>
            </div>

            <div className="flex-1 space-y-4">
              <Button
                className="w-full py-6 text-lg font-semibold rounded-xl
                           bg-gradient-to-br from-terracotta-600 to-red-500
                           text-white hover:scale-[1.02] transition"
                onClick={() => router.push("/signup/trainer")}
              >
                🎓 I’m Leading the Way
              </Button>
              <p className="text-sm text-gray-500">
                Register as a trainer to build sessions, manage trainees, and shape impactful learning.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}