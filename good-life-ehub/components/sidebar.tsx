"use client"

import Link from "next/link"
import { Home, BookOpen, Users, Gift, HelpCircle, ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"

export function Sidebar() {
  const [isProgramsOpen, setProgramsOpen] = useState(true)

  const navigation = [
    { name: "Home", href: "/dashboard", icon: Home, current: false },
    { name: "Learning", href: "/learning", icon: BookOpen, current: true },
    { name: "Community", href: "/community", icon: Users, current: false },
    { name: "Rewards", href: "/rewards", icon: Gift, current: false },
    { name: "Support", href: "/support", icon: HelpCircle, current: false },
  ]

  const myPrograms = ["AWS Cloud Computing", "Data Analytics", "Project Management"]

  return (
    <div className="flex flex-col w-64 bg-slate-900 text-white">
      {/* Logo Section */}
      <div className="flex flex-col items-center py-6 px-4 border-b border-slate-700">
        <h1 className="text-xl font-bold text-white">Good life eHub</h1>
        <p className="text-sm text-slate-300 text-center mt-1">Powered by Bravonet Technologies</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                item.current ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          )
        })}

        <div className="mt-6">
          <button
            onClick={() => setProgramsOpen(!isProgramsOpen)}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            {isProgramsOpen ? <ChevronDown className="w-4 h-4 mr-2" /> : <ChevronRight className="w-4 h-4 mr-2" />}
            My Programs
          </button>

          {isProgramsOpen && (
            <div className="ml-6 mt-2 space-y-1">
              {myPrograms.map((program) => (
                <Link
                  key={program}
                  href={`/programs/${program.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block px-3 py-1 text-xs text-slate-400 hover:text-slate-300 transition-colors"
                >
                  {program}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Footer */}
      <div className="px-4 py-6 border-t border-slate-700">
        <div className="space-y-2 text-xs text-slate-400">
          <div className="flex space-x-4">
            <Link href="/privacy" className="hover:text-slate-300">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-slate-300">
              Terms
            </Link>
            <Link href="/legal" className="hover:text-slate-300">
              Legal
            </Link>
          </div>
          <p>© 2025 Good life eHub. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
