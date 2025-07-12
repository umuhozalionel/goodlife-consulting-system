"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Mail, Lock, User2, Loader2, Github } from "lucide-react"
import { FaGoogle, FaApple } from "react-icons/fa"

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("trainee")

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const endpoint = mode === "login" ? "/api/login" : "/api/signup"
    const payload =
      mode === "login" ? { email, password } : { name, email, password, role }

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
          description: `Welcome ${mode === "login" ? "back" : "to Goodlife"}, ${data.email || email}`,
        })

        const roleCheck = await fetch(`/api/role?uid=${data.uid}`)
        const roleData = await roleCheck.json()
        const userRole = roleData.status === "success" ? roleData.role : "trainee"

        // ✅ Fixed redirect path for trainer
        setTimeout(() => {
          const target =
            userRole === "trainer" ? "/admin/dashboard" : "/dashboard"
          router.push(target)
        }, 1200) // Give toast time to render
      } else {
        throw new Error(data.message || "Unexpected error occurred")
      }
    } catch (err: any) {
      const msg =
        err.message.includes("auth/email-already-in-use")
          ? "This email is already registered."
          : err.message.includes("auth/invalid-credential")
          ? "Incorrect email or password."
          : err.message.includes("auth/network-request-failed")
          ? "Network error. Please try again."
          : err.message

      toast({
        title: "Authentication Error",
        description: msg,
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
            <h1 className="text-xl font-bold text-gray-800">
              {mode === "login" ? "Goodlife Login" : "Create Account"}
            </h1>
          </div>
          <p className="text-sm text-gray-600">
            {mode === "login"
              ? "Welcome back! Sign in to manage your training progress."
              : "Create your account to start learning and managing training."}
          </p>
        </div>

        <form onSubmit={handleAuth} className="bg-white p-6 rounded-lg shadow-md space-y-6">
          {mode === "signup" && (
            <>
              <div className="space-y-2">
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
                    placeholder="Your name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className="w-full border rounded-md px-4 py-2 text-sm bg-white"
                >
                  <option value="trainee">Trainee</option>
                  <option value="trainer">Trainer</option>
                </select>
              </div>
            </>
          )}

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
                {mode === "login" ? "Signing in..." : "Creating account..."}
              </span>
            ) : mode === "login" ? (
              "Log In"
            ) : (
              "Sign Up"
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

        <p className="text-center text-sm text-gray-600">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
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