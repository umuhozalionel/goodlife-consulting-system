'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { FaGoogle } from 'react-icons/fa'
import NotRegisteredToast from '@/components/NotRegisteredToast'
import { getUserByEmail, ensureUserDoc } from '@/lib/user'

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const [nrOpen, setNrOpen] = useState(false)
  const [nrEmail, setNrEmail] = useState<string | null>(null)

  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  useEffect(() => {
    const onUnhandled = (e: PromiseRejectionEvent) => {
      e.preventDefault()
      const msg = e.reason && e.reason.message ? e.reason.message : String(e.reason)
      console.warn('Unhandled promise rejection caught (suppressed overlay):', msg)
    }
    window.addEventListener('unhandledrejection', onUnhandled)
    return () => window.removeEventListener('unhandledrejection', onUnhandled)
  }, [])

  const validateEmail = (value: string) => {
    const trimmed = value.trim()
    if (!trimmed) return 'Email cannot be empty'
    if (!/\S+@\S+\.\S+/.test(trimmed)) return 'Enter a valid email address'
    return null
  }

  const validatePassword = (value: string) => {
    if (!value) return 'Password cannot be empty'
    if (value.length < 8) return 'Password must be at least 8 characters'
    return null
  }

  const canSubmit = useMemo(() => {
    return !validateEmail(email) && !validatePassword(password) && !loading
  }, [email, password, loading])

  const showCredentialToast = (code: string | undefined, message: string) => {
    if (code === 'auth/user-not-found') {
      setNrEmail(email.trim() || null)
      setNrOpen(true)
      setErrorMessage('No user record found for this email.')
      return
    }
    if (code === 'auth/invalid-email') {
      setErrorMessage('Please enter a valid email address.')
      toast({ title: 'Invalid email', description: 'Please enter a valid email address.', variant: 'destructive' })
      return
    }
    if (code === 'auth/wrong-password') {
      setErrorMessage('The password is incorrect.')
      toast({ title: 'Wrong password', description: 'The password is incorrect. Use "Forgot password" if needed.', variant: 'destructive' })
      return
    }
    if (code === 'auth/invalid-credential') {
      setErrorMessage('Credentials are invalid or not usable. If you recently registered, try again.')
      toast({ title: 'Invalid credential', description: 'Authentication credential is invalid or malformed. Try signing in again.', variant: 'destructive' })
      void signOut(auth).catch(() => {})
      return
    }
    setErrorMessage(message)
    toast({ title: 'Sign in failed', description: message, variant: 'destructive' })
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setEmailError(null)
    setPasswordError(null)

    const eErr = validateEmail(email)
    const pErr = validatePassword(password)
    setEmailError(eErr)
    setPasswordError(pErr)
    if (eErr || pErr) return

    setLoading(true)
    try {
      const trimmed = email.trim()
      const res = await signInWithEmailAndPassword(auth, trimmed, password)
      setErrorMessage(null)
      toast({ title: 'Signed in', description: `Welcome ${res.user.email}` })
      await ensureUserDoc(res.user.uid, { email: res.user.email ?? undefined, displayName: res.user.displayName ?? undefined })
    } catch (err: any) {
      console.error('Email sign-in error', err)
      const code = err?.code
      const message = err?.message ?? String(err)
      if (code === 'auth/invalid-credential' && /user not found|no user/i.test(message)) {
        showCredentialToast('auth/user-not-found', 'No user record found for this email.')
      } else {
        showCredentialToast(code, message)
      }
    } finally {
      setLoading(false)
    }
  }

  const onGoogle = async () => {
    setErrorMessage(null)
    setLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      const res = await signInWithPopup(auth, provider)
      const returnedEmail = res.user?.email
      if (!returnedEmail) {
        throw new Error('no-email-from-provider')
      }

      // Check Firestore users collection for that email
      const found = await getUserByEmail(returnedEmail)
      if (!found) {
        // not registered -> sign out and show registration toast/UI
        await signOut(auth)
        setNrEmail(returnedEmail)
        setNrOpen(true)
        setErrorMessage('Account not registered for this Google email.')
        return
      }

      // user exists -> ensure users/<uid> doc shape and proceed
      await ensureUserDoc(res.user.uid, { email: returnedEmail, displayName: res.user.displayName ?? undefined })
      toast({ title: 'Signed in', description: `Welcome ${returnedEmail}` })
    } catch (err: any) {
      console.error('Google sign-in error', err)
      const code = err?.code
      const message = err?.message ?? String(err)
      if (code === 'auth/popup-blocked' || code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        setErrorMessage('Google sign-in was cancelled or blocked.')
        toast({ title: 'Google sign-in', description: 'Popup blocked or closed. Try again or use email sign-in.', variant: 'destructive' })
      } else if (code === 'no-email-from-provider' || /no-email/i.test(message)) {
        setErrorMessage('Google did not return an email address. Use another sign-in method.')
      } else {
        setErrorMessage(message)
        toast({ title: 'Google sign-in failed', description: message, variant: 'destructive' })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <main className="min-h-screen flex items-center justify-center bg-muted p-6">
        <div className="w-full max-w-md bg-surface rounded-lg p-6 shadow">
          <h1 className="text-xl font-semibold mb-4">Sign in</h1>

          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (emailError) setEmailError(null)
                }}
                placeholder="you@example.com"
                disabled={loading}
                autoComplete="email"
              />
              {emailError && <div className="mt-1 text-sm text-red-700">{emailError}</div>}
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (passwordError) setPasswordError(null)
                }}
                placeholder="Your password"
                disabled={loading}
                autoComplete="current-password"
              />
              {password && password.length < 8 && (
                <div className="mt-1 text-sm text-yellow-700">Password must be at least 8 characters</div>
              )}
              {passwordError && <div className="mt-1 text-sm text-red-700">{passwordError}</div>}
            </div>

            {errorMessage && (
              <div className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-800">
                {errorMessage}
              </div>
            )}

            <div className="flex gap-2">
              <Button type="submit" className="flex-1" disabled={!canSubmit}>
                Sign in
              </Button>
              <Button
                variant="outline"
                onClick={onGoogle}
                disabled={loading}
                className="flex items-center gap-2"
              >
                <FaGoogle /> Google
              </Button>
            </div>
          </form>

          <div className="mt-4 text-sm text-[var(--color-text-muted)]">
            <a href="/auth/register" className="text-accent underline">
              Create an account
            </a>
          </div>
        </div>
      </main>

      <NotRegisteredToast email={nrEmail} open={nrOpen} onClose={() => setNrOpen(false)} />
    </>
  )
}