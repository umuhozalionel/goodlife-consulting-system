'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { FaGoogle } from 'react-icons/fa'
import { OAUTH_FLAG } from '@/lib/auth'

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [role, setRole] = useState<'intern' | 'admin' | 'corporate' | 'counselling'>('intern')
  const [loading, setLoading] = useState(false)

  const sanitizeRole = (r?: string) => {
    const allowed: Record<string, boolean> = { intern: true, corporate: true, counselling: true }
    return r && allowed[r] ? (r as 'intern' | 'corporate' | 'counselling') : 'intern'
  }

  const writeUserDoc = async (uid: string, emailVal: string, name?: string, r?: string) => {
    const safeRole = sanitizeRole(r)
    const payload = {
      email: (emailVal || '').trim().toLowerCase(),
      role: safeRole,
      displayName: name || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }
    // merge: preserve existing server-side fields and avoid overwriting sensitive data
    await setDoc(doc(db, 'users', uid), payload, { merge: true })
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await createUserWithEmailAndPassword(auth, email.trim(), password)
      const u = res.user
      await writeUserDoc(u.uid, u.email || email.trim(), displayName, role)
      toast({ title: 'Registered', description: `Welcome ${u.email}` })
      if (sanitizeRole(role) === 'admin') router.push('/admin')
      else router.push('/dashboard')
    } catch (err: any) {
      toast({ title: 'Error', description: err?.message || 'Registration failed', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  const onGoogle = async () => {
    setLoading(true)
    try {
      // Set a short-lived flag so guards can pause role checks while OAuth completes
      try {
        if (typeof window !== 'undefined') localStorage.setItem(OAUTH_FLAG, '1')
      } catch {}

      const provider = new GoogleAuthProvider()
      const res = await signInWithPopup(auth, provider)
      const u = res.user

      // Always normalize email when writing
      const returnedEmail = (u.email || '').trim().toLowerCase()

      // Write/merge user doc - keep client minimal; server-side must enforce role assignment rules
      await writeUserDoc(u.uid, returnedEmail, u.displayName || displayName, role)

      toast({ title: 'Signed in', description: `Welcome ${returnedEmail || u.uid}` })
      if (sanitizeRole(role) === 'admin') router.push('/admin')
      else router.push('/dashboard')
    } catch (err: any) {
      toast({ title: 'Error', description: err?.message || 'Google sign-in failed', variant: 'destructive' })
    } finally {
      // clear the oauth flag quickly so guards resume
      try {
        if (typeof window !== 'undefined') localStorage.removeItem(OAUTH_FLAG)
      } catch {}
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted p-6">
      <div className="w-full max-w-md bg-surface rounded-lg p-6 shadow">
        <h1 className="text-xl font-semibold mb-4">Create account</h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full name</label>
            <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Jane Doe" />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Choose a strong password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="mt-1 block w-full rounded-md border border-soft px-3 py-2 bg-surface"
            >
              <option value="intern">Trainee / Intern</option>
              <option value="corporate">Corporate</option>
              <option value="counselling">Counselling</option>
              <option value="admin">Admin</option>
            </select>
            <p className="text-xs text-muted-foreground mt-1">
              Admin selection is accepted here but will be normalized to intern unless granted server-side.
            </p>
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1" disabled={loading}>
              Create account
            </Button>
            <Button variant="outline" onClick={onGoogle} disabled={loading} className="flex items-center gap-2">
              <FaGoogle /> Google
            </Button>
          </div>
        </form>

        <div className="mt-4 text-xs text-[var(--color-text-muted)]">
          By creating an account you agree to the terms and privacy policy.
        </div>
      </div>
    </main>
  )
}