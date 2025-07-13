"use client"

import Link from "next/link"
import TrainingHeader from "@/components/layout/TrainingHeader"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import {
  Cpu,
  Globe,
  Shield,
  BarChart,
} from "lucide-react"

export default function DigitalTrainingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-terracotta-50 px-4 py-10">
      <TrainingHeader title="Digital & Technology" />

      <div className="max-w-screen-md mx-auto space-y-12 mt-8">
        {/* 📢 Intro */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-green-700">
            Digital & Technology Training Programs
          </h1>
          <p className="text-md text-gray-700">
            Get hands-on with the tools shaping today’s world — from data to design, security to software.
            Build digital confidence with programs crafted for relevance, access, and impact.
          </p>
        </div>

        {/* 🔧 Training Cards */}
        <div className="grid gap-8 sm:grid-cols-2">
          {/* Artificial Intelligence */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-4 text-green-700">
              <Cpu className="h-6 w-6" />
              <h2 className="font-semibold text-lg">Artificial Intelligence (AI)</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Understand foundational AI concepts, ethical implications, and real-world applications.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/signup/trainee">Register Now</Link>
            </Button>
          </div>

          {/* Website Development */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-4 text-green-700">
              <Globe className="h-6 w-6" />
              <h2 className="font-semibold text-lg">Website Development</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Build responsive websites from scratch using modern tools like HTML, CSS, and JavaScript.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/signup/trainee">Register Now</Link>
            </Button>
          </div>

          {/* SPSS & Data Analysis */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-4 text-green-700">
              <BarChart className="h-6 w-6" />
              <h2 className="font-semibold text-lg">SPSS & Data Analysis</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Learn statistical modeling and survey analysis using SPSS for research and decision-making.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/signup/trainee">Register Now</Link>
            </Button>
          </div>

          {/* Cybersecurity Awareness */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-4 text-green-700">
              <Shield className="h-6 w-6" />
              <h2 className="font-semibold text-lg">Cybersecurity & Safety</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Protect your digital presence with tools and tactics for safe internet use and data handling.
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