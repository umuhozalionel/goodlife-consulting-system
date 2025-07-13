"use client"

import Link from "next/link"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import {
  BriefcaseBusiness,
  Users,
  Cpu,
  Mic,
  Languages,
} from "lucide-react"

export default function TrainingIndexPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-terracotta-50 via-white to-emerald-50 px-4 py-10">
      <div className="max-w-screen-lg mx-auto space-y-12">
        {/* 🧭 Page Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-terracotta-700">
            Explore Our Training Categories
          </h1>
          <p className="text-md text-gray-600 max-w-2xl mx-auto">
            Discover growth-focused programs across leadership, communication, digital skills, corporate culture, and multilingual fluency. Each category leads to specialized sessions designed to empower you.
          </p>
        </div>

        {/* 📦 Category Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Link href="/training/leadership">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer">
              <div className="flex items-center gap-3 mb-3 text-terracotta-600">
                <BriefcaseBusiness className="h-6 w-6" />
                <h2 className="font-semibold text-lg">Leadership & Business</h2>
              </div>
              <p className="text-sm text-gray-600">
                Strategic thinking, management, and planning tools for professionals.
              </p>
            </div>
          </Link>

          <Link href="/training/corporate">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer">
              <div className="flex items-center gap-3 mb-3 text-terracotta-600">
                <Users className="h-6 w-6" />
                <h2 className="font-semibold text-lg">Corporate Culture & HR</h2>
              </div>
              <p className="text-sm text-gray-600">
                Workplace ethics, talent strategy, and organizational culture.
              </p>
            </div>
          </Link>

          <Link href="/training/digital">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer">
              <div className="flex items-center gap-3 mb-3 text-green-700">
                <Cpu className="h-6 w-6" />
                <h2 className="font-semibold text-lg">Digital & Tech</h2>
              </div>
              <p className="text-sm text-gray-600">
                SPSS, AI, websites, and cybersecurity — all built for today’s world.
              </p>
            </div>
          </Link>

          <Link href="/training/communication">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer">
              <div className="flex items-center gap-3 mb-3 text-terracotta-600">
                <Mic className="h-6 w-6" />
                <h2 className="font-semibold text-lg">Communication & Growth</h2>
              </div>
              <p className="text-sm text-gray-600">
                Public speaking, productivity, and leadership presence.
              </p>
            </div>
          </Link>

          <Link href="/training/languages">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer">
              <div className="flex items-center gap-3 mb-3 text-green-700">
                <Languages className="h-6 w-6" />
                <h2 className="font-semibold text-lg">Languages & Climate</h2>
              </div>
              <p className="text-sm text-gray-600">
                Multilingual fluency plus climate messaging for impact.
              </p>
            </div>
          </Link>
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