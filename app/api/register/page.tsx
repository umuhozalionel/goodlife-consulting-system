"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export default function TrainingRegisterPage() {
  const [fullName, setFullName] = useState("")
  const [program, setProgram] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ fullName, email, phone, program }),
        headers: { "Content-Type": "application/json" },
      })

      const data = await res.json()
      if (data.status === "success") {
        toast({
          title: "Registered",
          description: "Thank you for signing up for training!",
        })
        setFullName("")
        setEmail("")
        setPhone("")
        setProgram("")
      } else {
        throw new Error(data.message || "Registration failed")
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-white to-terracotta-50">
      <div className="max-w-md w-full space-y-6 bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold text-center text-terracotta-700">
          📚 Register for Goodlife Training
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Full Name</Label>
            <Input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div>
            <Label>Training Program</Label>
            <Input type="text" value={program} onChange={(e) => setProgram(e.target.value)} required />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Submitting...
              </span>
            ) : (
              "Submit Registration"
            )}
          </Button>
        </form>
      </div>
    </main>
  )
}