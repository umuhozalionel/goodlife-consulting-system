'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'

type Props = {
  children: React.ReactNode
  allow: string[]
  redirectTo?: string
}

/**
 * RoleGuard
 * - short pause to avoid OAuth popup/redirect races
 * - does not redirect while role is unresolved (null) so onboarding flows can complete
 * - redirects when user is missing or role is resolved and not allowed
 */
export default function RoleGuard({ children, allow, redirectTo = '/auth/login' }: Props) {
  const router = useRouter()
  const { user, role, loading } = useAuth()
  const [paused, setPaused] = useState(true)

  useEffect(() => {
    let mounted = true
    const t = window.setTimeout(() => {
      if (mounted) setPaused(false)
    }, 250)
    return () => {
      mounted = false
      window.clearTimeout(t)
    }
  }, [])

  useEffect(() => {
    if (paused) return
    if (loading) return

    // not signed in => redirect immediately
    if (!user) {
      router.replace(redirectTo)
      return
    }

    // role explicitly resolved and not in allow list => redirect
    if (role !== null && !allow.includes(role)) {
      router.replace(redirectTo)
    }
  }, [paused, loading, user, role, allow, redirectTo, router])

  // while pausing or loading, render children to avoid visual bounce
  if (paused || loading) return <>{children}</>

  // if not authenticated (should be redirected above), render nothing
  if (!user) return null

  return <>{children}</>
}