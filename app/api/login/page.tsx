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
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { toast } = useToast()

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
        toast({ title: "Login Successful", description: `Welcome back, ${data.email}` })
        router.push("/dashboard")
      } else {
        throw new Error(data.message || "Invalid credentials")
      }
    } catch (err: any) {
      toast({ title: "Login Failed", description: err.message, variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-terracotta-100 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-800">Goodlife Login</h1>
          <p className="text-sm text-gray-600">Sign in to access your personalized dashboard.</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md space-y-6">
          <div>
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : null}
            Log In
          </Button>
        </form>
      </div>
    </main>
  )
}