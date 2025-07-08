"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Mail, Lock, Loader2, Github } from "lucide-react"
import { FaGoogle, FaApple } from "react-icons/fa"
import { useToast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      })

      const data = await res.json()

      if (data.status === "success") {
        toast({
          title: "Login Successful",
          description: `Welcome back, ${data.email}`,
        })
        router.push("/") // 🔁 Redirect to homepage (update later to dashboard)
      } else {
        throw new Error(data.message || "Invalid credentials")
      }
    } catch (err: any) {
      toast({
        title: "Login Failed",
        description: err.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-terracotta-100 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-terracotta-500 to-forest-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">Goodlife Login</h1>
          </div>
          <p className="text-sm text-gray-600">Welcome back! Sign in to manage your training progress.</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

        <div className="text-center space-y-2">
          <p className="text-gray-500 text-sm">or continue with</p>
          <div className="flex justify-center gap-4">
            <Button variant="ghost" size="icon" className="hover:text-green-600">
              <FaGoogle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-black">
              <FaApple className="h-5 w-5" />
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