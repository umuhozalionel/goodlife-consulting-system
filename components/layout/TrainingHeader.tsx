"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function TrainingHeader({ title }: { title: string }) {
  return (
    <header className="backdrop-blur-md bg-white/30 border-b border-white/40 sticky top-0 z-50">
      <div className="max-w-screen-md mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/training">
          <span className="text-green-700 hover:text-green-900 text-sm flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Training Page
          </span>
        </Link>
        <h1 className="text-base font-semibold text-terracotta-700">{title}</h1>
      </div>
    </header>
  )
}