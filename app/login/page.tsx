"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Mail, Lock, Loader2, Apple, Github, Google } from "lucide-react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login (replace with actual logic)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-terracotta-100 px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Branding */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-terracotta-500 to-forest-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">Goodlife Login</h1>
          </div>
          <p className="text-sm text-gray-600">Welcome back! Sign in to manage your training progress.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="email"
                id="email"
                required
                className="pl-10"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="password"
                id="password"
                required
                className="pl-10"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-terracotta-600 to-forest-600 hover:from-terracotta-700 hover:to-forest-700 text-white py-3 font-semibold rounded-full transition-all duration-300"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Signing in...
              </span>
            ) : (
              "Log In"
            )}
          </Button>
        </form>

        {/* OAuth Buttons (Optional / Future Use) */}
        <div className="text-center space-y-2">
          <p className="text-gray-500 text-sm">or continue with</p>
          <div className="flex justify-center gap-4">
            <Button variant="ghost" size="icon" className="hover:text-green-600">
              <Google className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-black">
              <Apple className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-gray-700">
              <Github className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}