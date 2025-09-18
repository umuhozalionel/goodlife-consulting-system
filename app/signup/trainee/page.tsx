// app/signup/trainee/page.tsx
'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  isSignInWithEmailLink,
  signInWithEmailLink,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { FaGoogle, FaApple } from 'react-icons/fa'
import { useToast } from '@/components/ui/use-toast'

export default function TraineeAuthPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  // Handle magic-link sign-in
  useEffect(() => {
    const href = window.location.href
    if (isSignInWithEmailLink(auth, href)) {
      setLoading(true)
      let storedEmail = localStorage.getItem('emailForSignIn') || ''
      if (!storedEmail) {
        const promptEmail = window
          .prompt('Please confirm your email for sign-in')
          ?.trim()
        if (!promptEmail) {
          setLoading(false)
          return
        }
        storedEmail = promptEmail
      }

      signInWithEmailLink(auth, storedEmail, href)
        .then(async ({ user }) => {
          await setDoc(
            doc(db, 'users', user.uid),
            { email: user.email, role: 'trainee', createdAt: new Date() },
            { merge: true }
          )
          localStorage.removeItem('emailForSignIn')
          toast({ title: 'Signed in', description: `Welcome ${user.email}` })
          router.push('/signup/trainee/dashboard')
        })
        .catch(err => {
          toast({
            title: 'Error',
            description:
              err.code === 'auth/invalid-action-code'
                ? 'Invalid or expired link. Request a new one.'
                : err.message,
            variant: 'destructive',
          })
        })
        .finally(() => setLoading(false))
    }
  }, [router, toast])

  // Send magic link to email
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      localStorage.setItem('emailForSignIn', email)
      const res = await fetch('/api/send-magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        body: JSON.stringify({ email }),
      })
      const text = await res.text()
      const data = JSON.parse(text)
      if (!res.ok) throw new Error(data.error || 'Failed to send link')
      toast({ title: 'Magic link sent', description: 'Check your inbox.' })
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  // Google OAuth
  const onGoogle = async () => {
    setLoading(true)
    try {
      const { user } = await signInWithPopup(auth, new GoogleAuthProvider())
      await setDoc(
        doc(db, 'users', user.uid),
        { email: user.email, role: 'trainee', createdAt: new Date() },
        { merge: true }
      )
      toast({ title: 'Google Sign In', description: 'Success' })
      router.push('/signup/trainee/dashboard')
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  // Apple OAuth
  const onApple = async () => {
    setLoading(true)
    try {
      const provider = new OAuthProvider('apple.com')
      const { user } = await signInWithPopup(auth, provider)
      await setDoc(
        doc(db, 'users', user.uid),
        { email: user.email, role: 'trainee', createdAt: new Date() },
        { merge: true }
      )
      toast({ title: 'Apple Sign In', description: 'Success' })
      router.push('/signup/trainee/dashboard')
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      className="min-h-screen bg-fixed bg-cover bg-center"
      style={{ backgroundImage: 'url("/community/community-5.jpg")' }}
    >
      <section className="flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-[68%] md:grid md:grid-cols-2 overflow-hidden">
          {/* Left info + QR panel */}
          <div className="bg-primary-dark text-white p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4">Professional Training</h2>
              <ul className="space-y-2 text-sm mb-6">
                <li>• Certified Programs</li>
                <li>• Expert-Led Workshops</li>
                <li>• Flexible Schedule</li>
                <li>• Lifetime Access</li>
              </ul>
              <div className="flex justify-center">
                <Image
                  src="/qr/trainee-registration.png"
                  alt="QR code to registration form"
                  width={200}
                  height={200}
                  className="rounded-lg shadow-md bg-white"
                />
              </div>
            </div>
            <footer className="mt-8 text-xs space-y-1">
              <p>© 2025 Goodlife Consulting Partners</p>
              <div className="flex space-x-4">
                <Link href="/cookie-policy" className="underline">
                  Cookie Policy
                </Link>
                <Link href="/privacy-policy" className="underline">
                  Privacy Policy
                </Link>
              </div>
            </footer>
          </div>

          {/* Right form panel */}
          <div className="p-8 flex flex-col justify-center">
            <div className="text-right mb-4">
              <Link
                href="/"
                className="text-sm text-gray-500 hover:text-accent underline"
              >
                ← Back Home
              </Link>
            </div>

            <h1 className="text-2xl font-semibold text-primary">Sign in</h1>
            <p className="mt-2 text-sm text-gray-600">
              Use the email you submitted via the QR form
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <Button
                type="submit"
                className="w-full flex items-center justify-center"
                disabled={loading}
              >
                {loading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Send Signup Link
              </Button>
            </form>

            <div className="mt-6 flex items-center">
              <div className="flex-grow border-t border-gray-200" />
              <span className="mx-4 text-sm text-gray-400">OR</span>
              <div className="flex-grow border-t border-gray-200" />
            </div>

            <div className="mt-6 space-y-3">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center space-x-2"
                onClick={onGoogle}
                disabled={loading}
              >
                <FaGoogle className="h-5 w-5 text-red-500" />
                <span>Continue with Google</span>
              </Button>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center space-x-2"
                onClick={onApple}
                disabled={loading}
              >
                <FaApple className="h-5 w-5 text-black" />
                <span>Continue with Apple</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}