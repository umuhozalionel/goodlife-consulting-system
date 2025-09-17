"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Mail } from "lucide-react"

export function MagicLinkForm() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/send-magic-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send magic link")
      }

      setSent(true)
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <Alert>
          <Mail className="h-4 w-4" />
          <AlertDescription>
            Magic link sent to <strong>{email}</strong>. Check your inbox and click the link to sign in.
          </AlertDescription>
        </Alert>
        <Button
          variant="outline"
          onClick={() => {
            setSent(false)
            setEmail("")
          }}
          className="w-full"
        >
          Send Another Link
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" className="w-full" disabled={loading || !email}>
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            Sending Magic Link...
          </>
        ) : (
          <>
            <Mail className="h-4 w-4 mr-2" />
            Send Magic Link
          </>
        )}
      </Button>
    </form>
  )
}
