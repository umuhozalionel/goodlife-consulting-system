"use client"

import Link from "next/link"
import TrainingHeader from "@/components/layout/TrainingHeader"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import {
  Languages,
  BookOpen,
  CloudSun,
  Volume2,
} from "lucide-react"

export default function LanguageTrainingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-terracotta-50 px-4 py-10">
      <TrainingHeader title="Languages & Environment" />

      <div className="max-w-screen-md mx-auto space-y-12 mt-8">
        {/* 🌐 Intro */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-green-700">
            Language & Environmental Awareness Programs
          </h1>
          <p className="text-md text-gray-700">
            Bridge global conversations through multilingual fluency and climate-conscious messaging. These trainings elevate communication, cultural exchange, and community impact.
          </p>
        </div>

        {/* 📘 Training Cards */}
        <div className="grid gap-8 sm:grid-cols-2">
          {/* English Communication */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-4 text-green-700">
              <Languages className="h-6 w-6" />
              <h2 className="font-semibold text-lg">English Communication</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Strengthen writing, listening, and verbal fluency for academic, business, or social settings.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/signup/trainee">Register Now</Link>
            </Button>
          </div>

          {/* French for Professionals */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-4 text-green-700">
              <BookOpen className="h-6 w-6" />
              <h2 className="font-semibold text-lg">French for Professional Use</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Learn how to write, read, and communicate fluently in French for work and diplomacy.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/signup/trainee">Register Now</Link>
            </Button>
          </div>

          {/* Kiswahili Fundamentals */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-4 text-green-700">
              <Volume2 className="h-6 w-6" />
              <h2 className="font-semibold text-lg">Kiswahili Fundamentals</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Discover the roots and rhythm of East African expression — from greetings to grammar.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/signup/trainee">Register Now</Link>
            </Button>
          </div>

          {/* Climate Change Messaging */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-4 text-green-700">
              <CloudSun className="h-6 w-6" />
              <h2 className="font-semibold text-lg">Climate Change Communication</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Develop campaigns and conversations that inspire climate action across languages and sectors.
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