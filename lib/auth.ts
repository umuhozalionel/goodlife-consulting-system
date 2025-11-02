'use client'

import { useEffect, useState } from 'react'
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from './firebase'

export type Role = 'admin' | 'intern' | 'corporate' | 'counselling' | null

export const OAUTH_FLAG = 'auth:oauth' // optional flag set by sign-in flows to pause guards

async function waitForOauthFlagClear(timeoutMs = 10000): Promise<void> {
  if (typeof window === 'undefined') return
  if (!localStorage.getItem(OAUTH_FLAG)) return

  return new Promise<void>((resolve) => {
    let resolved = false

    const cleanup = () => {
      if (resolved) return
      resolved = true
      window.clearInterval(interval)
      window.clearTimeout(timeout)
      window.removeEventListener('storage', onStorage)
    }

    const onStorage = (e: StorageEvent) => {
      if (e.key === OAUTH_FLAG && !localStorage.getItem(OAUTH_FLAG)) {
        cleanup()
        resolve()
      }
    }

    const interval = window.setInterval(() => {
      if (!localStorage.getItem(OAUTH_FLAG)) {
        cleanup()
        resolve()
      }
    }, 300)

    const timeout = window.setTimeout(() => {
      cleanup()
      resolve()
    }, timeoutMs)

    window.addEventListener('storage', onStorage)
  })
}

export function useAuth() {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [role, setRole] = useState<Role>(null)
  const [loading, setLoading] = useState(true)
  const [readError, setReadError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    const resolveRoleFromUser = async (u: FirebaseUser | null) => {
      if (!u) return null
      try {
        const ref = doc(db, 'users', u.uid)
        const snap = await getDoc(ref)
        if (!snap.exists()) return null
        const data = snap.data() as any
        return (data.role as Role) ?? null
      } catch (err: any) {
        console.warn('useAuth: error reading user doc', err)
        return null
      }
    }

    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!mounted) return

      try {
        if (typeof window !== 'undefined' && localStorage.getItem(OAUTH_FLAG)) {
          await waitForOauthFlagClear(10000)
        }
      } catch {
        // ignore and continue
      }

      setLoading(true)
      setUser(u)
      setRole(null)
      setReadError(null)

      if (!u) {
        setLoading(false)
        return
      }

      try {
        const resolvedRole = await resolveRoleFromUser(u)
        if (!mounted) return
        setRole(resolvedRole)
      } catch (err: any) {
        console.warn('useAuth: role resolution failed', err)
        setReadError(String(err?.message ?? err))
        setRole(null)
      } finally {
        if (mounted) setLoading(false)
      }
    })

    return () => {
      mounted = false
      unsub()
    }
  }, [])

  return { user, role, loading, readError } as const
}