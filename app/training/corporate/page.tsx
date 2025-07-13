"use client"

import Link from "next/link"
import TrainingHeader from "@/components/layout/TrainingHeader"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import {
  Users,
  ShieldCheck,
  Briefcase,
  Landmark,
} from "lucide-react"

export default function CorporateTrainingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-terracotta-100 via-white to-emerald-50 px-4 py-10">
      <TrainingHeader title="Corporate & HR" />

      <div className="max-w-screen-md mx-auto space-y-12 mt-8">
        {/* 📢 Intro */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-terracotta-800">
            Corporate & HR Training Programs
          </h1>
          <p className="text-md text-gray-700">
            Strengthen organizational culture, drive ethical workplace behaviors, and build agile HR teams. These programs set the foundation for scalable growth and people-first policies.
          </p>
        </div>

        {/* 🧠 Training Cards */}
        <div className="grid gap-8 sm:grid-cols-2">
          {/* HR Strategy & Planning */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-4 text-terracotta-700">
              <Users className="h-6 w-6" />
              <h2 className="font-semibold text-lg">HR Strategy & Planning</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Develop long-term talent plans, recruitment roadmaps, and retention systems that empower growth.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/signup/trainee">Register Now</Link>
            </Button>
          </div>

          {/* Workplace Ethics */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-4 text-terracotta-700">
              <ShieldCheck className="h-6 w-6" />
              <h2 className="font-semibold text-lg">Workplace Ethics & Compliance</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Equip yourself with frameworks for inclusive conduct, conflict resolution, and professional integrity.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/signup/trainee">Register Now</Link>
            </Button>
          </div>

          {/* Talent Acquisition & Onboarding */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-4 text-terracotta-700">
              <Briefcase className="h-6 w-6" />
              <h2 className="font-semibold text-lg">Talent Acquisition & Onboarding</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Learn modern hiring tactics, candidate evaluation tools, and onboarding flows that stick.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/signup/trainee">Register Now</Link>
            </Button>
          </div>

          {/* Organizational Culture */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-4 text-terracotta-700">
              <Landmark className="h-6 w-6" />
              <h2 className="font-semibold text-lg">Organizational Culture & Change</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Explore values-driven growth, internal communication habits, and frameworks for change management.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/signup/trainee">Register Now</Link>
            </Button>
          </div>
        </div>

        {/* 🔙 Back to Home */}
        <div className="text-center pt-4">
          <Link href="/">
            <button className="text-sm text-gray-500 hover:text-green-700 transition">
              ← Back to Home
            </button>
          </Link>
        </div>
      </div>

      {/* ⬇️ Global Footer */}
      <Footer />
    </main>
  )
}