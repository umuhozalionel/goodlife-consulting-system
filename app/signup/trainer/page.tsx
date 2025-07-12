"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Mail, Lock, User2, Loader2, Github } from "lucide-react"
import { FaGoogle, FaApple } from "react-icons/fa"
import { useToast } from "@/components/ui/use-toast"

export default function TrainerAuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { toast } = useToast()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const endpoint = mode === "login" ? "/api/login" : "/api/signup"
    const payload =
      mode === "login"
        ? { email, password }
        : { name, email, password, role: "trainer" }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      })

      const data = await res.json()
      if (data.status === "success") {
        toast({
          title: mode === "login" ? "Login Successful" : "Account Created",
          description: `Welcome ${mode === "login" ? "back" : "aboard"}, ${data.email}`,
        })

        const roleRes = await fetch(`/api/role?uid=${data.uid}`)
        const roleData = await roleRes.json()
        const userRole = roleData.status === "success" ? roleData.role : "trainer"

        setTimeout(() => {
          router.push(userRole === "trainer" ? "/admin/dashboard" : "/dashboard")
        }, 1200)
      } else {
        throw new Error(data.message || "Unexpected error")
      }
    } catch (err: any) {
      toast({
        title: "Authentication Error",
        description: err.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-white via-terracotta-50 to-forest-100">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-terracotta-700">
            {mode === "login" ? "Trainer Login" : "Trainer Signup"}
          </h1>
          <p className="text-sm text-gray-600">
            {mode === "login"
              ? "Sign in to manage your training dashboard."
              : "Create your trainer account and lead sessions."}
          </p>
        </div>

        <form onSubmit={handleAuth} className="bg-white p-6 rounded-lg shadow-md space-y-6">
          {mode === "signup" && (
            <div>
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="pl-10"
                  placeholder="Jane Trainer"
                />
              </div>
            </div>
          )}

          <div>
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
                placeholder="trainer@goodlife.com"
              />
            </div>
          </div>

          <div>
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

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                {mode === "login" ? "Logging in..." : "Creating account..."}
              </span>
            ) : mode === "login" ? "Log In" : "Sign Up"}
          </Button>

          <div className="text-right">
            <button type="button" className="text-sm text-gray-500 underline hover:text-red-600">
              Forgot password?
            </button>
          </div>
        </form>

        <div className="text-center space-y-3">
          <p className="text-sm text-gray-500">Or continue with</p>
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

        <p className="text-center text-sm text-gray-600">
          {mode === "login" ? "Don't have a trainer account?" : "Already registered?"}{" "}
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-terracotta-600 font-semibold hover:underline ml-1"
          >
            {mode === "login" ? "Sign Up" : "Log In"}
          </button>
        </p>
      </div>
    </main>
  )
}