"use client"

import Link from "next/link"
import TrainingHeader from "@/components/layout/TrainingHeader"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import {
  GraduationCap,
  BriefcaseBusiness,
  BarChart2,
  ClipboardList,
} from "lucide-react"

export default function LeadershipTrainingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-terracotta-50 via-white to-emerald-50 px-4 py-10">
      <TrainingHeader title="Leadership & Business" />

      <div className="max-w-screen-md mx-auto space-y-12 mt-8">
        {/* 📢 Intro */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-terracotta-800">
            Leadership & Business Training Programs
          </h1>
          <p className="text-md text-gray-700">
            Unlock your potential with strategic leadership modules and actionable business frameworks.
            Whether you aim to lead teams, manage operations, or scale impact — we’ve built the path.
          </p>
        </div>

        {/* 📚 Training Cards */}
        <div className="grid gap-8 sm:grid-cols-2">
          {/* Business Management */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-4 text-terracotta-700">
              <BriefcaseBusiness className="h-6 w-6" />
              <h2 className="font-semibold text-lg">Business Management</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Build leadership instincts and operational fluency for managing teams and organizations.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/signup/trainee">Register Now</Link>
            </Button>
          </div>

          {/* Project Management */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-4 text-terracotta-700">
              <ClipboardList className="h-6 w-6" />
              <h2 className="font-semibold text-lg">Project Management</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Learn how to scope, budget, and execute impactful projects using global standards.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/signup/trainee">Register Now</Link>
            </Button>
          </div>

          {/* Strategic Planning */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-4 text-terracotta-700">
              <BarChart2 className="h-6 w-6" />
              <h2 className="font-semibold text-lg">Strategic Planning</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Master the tools and mindset required for long-term visioning and sustainable execution.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/signup/trainee">Register Now</Link>
            </Button>
          </div>

          {/* Business Communication */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-4 text-terracotta-700">
              <GraduationCap className="h-6 w-6" />
              <h2 className="font-semibold text-lg">Business Communication</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Develop high-impact communication habits to lead with clarity and influence across sectors.
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