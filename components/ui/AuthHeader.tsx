"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { languages } from "@/lib/i18n"
import { useToast } from "@/components/ui/use-toast"

export default function AuthHeader() {
  const [language, setLanguage] = useState("EN")
  const [isLangOpen, setIsLangOpen] = useState(false)
  const { toast } = useToast()

  return (
    <header className="w-full bg-white shadow-sm px-4 py-3 fixed top-0 z-40">
      <div className="max-w-screen-lg mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-terracotta-500 to-forest-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">G</span>
          </div>
          <div>
            <h1 className="font-bold text-gray-900">Goodlife Consulting</h1>
            <p className="text-xs text-gray-600">Partners</p>
          </div>
        </div>

        {/* Right Menu */}
        <div className="flex items-center gap-6">
          {/* Language Selector */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-gray-600 hover:text-green-700"
              onClick={() => setIsLangOpen(!isLangOpen)}
            >
              <Globe className="w-4 h-4" />
              {language}
              <ChevronDown className="w-4 h-4" />
            </Button>

            {isLangOpen && (
              <div className="absolute top-10 right-0 bg-white border rounded-md shadow-lg w-32 z-50">
                {Object.entries(languages).map(([code, label]) => (
                  <button
                    key={code}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-emerald-50 ${
                      code === language ? "text-emerald-700 font-semibold" : "text-gray-700"
                    }`}
                    onClick={() => {
                      setLanguage(code)
                      setIsLangOpen(false)
                      toast({
                        title: "Language Selected",
                        description: `You switched to ${label}`,
                      })
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dropdown Menu (you can expand this later) */}
          <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
            <Link href="/#about" className="hover:text-green-700 transition">About</Link>
            <Link href="/#contact" className="hover:text-green-700 transition">Contact</Link>
            <Link href="/" className="hover:text-green-700 transition">Home</Link>
          </div>
        </div>
      </div>
    </header>
  )
}