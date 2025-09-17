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

  // handle incoming magic-link
  useEffect(() => {
    const href = window.location.href
    if (isSignInWithEmailLink(auth, href)) {
      setLoading(true)
      let storedEmail = localStorage.getItem('emailForSignIn') || ''
      if (!storedEmail) {
        const promptEmail = window.prompt('Please confirm your email for sign-in')?.trim()
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
          console.error('🔴 signInWithEmailLink ▶', err.code, err.message)
          if (err.code === 'auth/invalid-action-code') {
            toast({
              title: 'Invalid or expired link',
              description: 'Request a new magic link.',
              variant: 'destructive',
            })
          } else {
            toast({ title: 'Error', description: err.message, variant: 'destructive' })
          }
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [router, toast])

  // send magic-link
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
      let data: any
      try {
        data = JSON.parse(text)
      } catch {
        throw new Error(`Server error: ${text}`)
      }

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send link')
      }

      toast({ title: 'Magic link sent', description: 'Check your inbox.' })
    } catch (err: any) {
      console.error('🔴 send-magic-link front ▶', err)
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
      console.error('🔴 Google signIn ▶', err)
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
      console.error('🔴 Apple signIn ▶', err)
      toast({ title: 'Error', description: err.message, variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen">
      {/* Left promo panel */}
      <aside
        className="hidden md:flex md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: 'url("/community/community-5.jpg")' }}
      >
        <div className="flex flex-col justify-between bg-gray-900/70 p-12 text-white w-full">
          <div>
            <Image
              src="/community/community-2.jpg"
              alt="Group training"
              width={160}
              height={160}
              className="rounded-full border-4 border-white mb-6"
            />
            <h2 className="text-3xl font-bold">Professional Training</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>• Certified Programs</li>
              <li>• Expert-Led Workshops</li>
              <li>• Flexible Schedule</li>
              <li>• Lifetime Access</li>
            </ul>
          </div>
          <div className="text-xs space-y-1">
            <p>© 2025 Goodlife Consulting Partners</p>
            <div className="flex space-x-4">
              <Link href="/cookie-policy" className="underline">
                Cookie Policy
              </Link>
              <Link href="/privacy-policy" className="underline">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Right form panel */}
      <section className="relative flex w-full flex-col justify-center p-8 md:w-1/2">
        <div className="absolute top-4 right-4">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-orange-600 underline"
          >
            ← Back Home
          </Link>
        </div>

        <div className="mx-auto w-full max-w-sm">
          <h1 className="text-2xl font-semibold">Sign in</h1>
          <p className="mt-2 text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link href="/signup" className="text-orange-600 hover:underline">
              Create now
            </Link>
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
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send Signup Link
            </Button>
          </form>

          <div className="mt-6 flex items-center">
            <div className="flex-grow border-t border-gray-200" />
            <span className="mx-4 text-sm text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-200" />
          </div>

          <div className="mt-6 flex justify-center">
            <Image
              src="/community/community-13.jpg"
              alt="Interactive workshop"
              width={240}
              height={140}
              className="rounded-lg shadow-md"
            />
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
      </section>
    </main>
  )
}