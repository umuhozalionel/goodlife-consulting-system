"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2, Mail, Lock, User2 } from "lucide-react"
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

    try {
      const auth = getAuth()
      let uid: string

      if (mode === "signup") {
        const cred = await createUserWithEmailAndPassword(auth, email, password)
        uid = cred.user.uid
        await setDoc(doc(db, "users", uid), {
          name,
          email,
          role: "trainer",
        })
      } else {
        const cred = await signInWithEmailAndPassword(auth, email, password)
        uid = cred.user.uid
      }

      const token = await auth.currentUser!.getIdToken()

      const res = await fetch("/api/sessionLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })

      const body = await res.json()
      if (body.status === "success") {
        setTimeout(() => {
          router.replace("/admin/dashboard")
        }, 300)
      } else {
        throw new Error(body.message)
      }

      toast({
        title: mode === "signup" ? "Account Created" : "Login Successful",
        description: `Welcome ${mode === "signup" ? "aboard" : "back"}, Trainer!`,
      })
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
    <main className="min-h-screen flex items-center justify-center bg-terracotta-50">
      <form onSubmit={handleAuth} className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-terracotta-700 text-center">
          {mode === "login" ? "Trainer Login" : "Trainer Signup"}
        </h2>

        {mode === "signup" && (
          <div>
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Jane Trainer"
                className="pl-10"
              />
            </div>
          </div>
        )}

        <div>
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="trainer@goodlife.com"
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="pl-10"
            />
          </div>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              {mode === "login" ? "Logging in…" : "Signing up…"}
            </span>
          ) : mode === "login" ? "Log In" : "Sign Up"}
        </Button>

        <p className="text-center text-sm text-gray-600">
          {mode === "login" ? "New here?" : "Already registered?"}{" "}
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-terracotta-700 font-semibold hover:underline"
          >
            {mode === "login" ? "Sign Up" : "Log In"}
          </button>
        </p>
      </form>
    </main>
  )
}