"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { toast } = useToast()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      })

      const data = await res.json()
      if (data.status === "success") {
        toast({ title: "Account Created", description: "Welcome aboard!" })
        router.push("/dashboard")
      } else {
        throw new Error(data.message || "Signup failed")
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-terracotta-100 px-4">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-xl font-bold text-gray-800 text-center">Create Your Account</h1>
        <form onSubmit={handleSignup} className="bg-white p-6 rounded-lg shadow space-y-4">
          <div>
            <Label>Full Name</Label>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : null}
            Sign Up
          </Button>
        </form>
      </div>
    </main>
  )
}