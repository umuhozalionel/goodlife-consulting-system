'use client'

import React, { useState, useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { Button } from '@/components/ui/button'

type UserData = {
  email: string
  name?: string
  phone?: string
  program?: string
  session?: string
}

export default function TraineeDashboardPage() {
  const uid = auth.currentUser!.uid
  const [user, setUser] = useState<UserData | null>(null)

  useEffect(() => {
    const ref = doc(db, 'users', uid)
    return onSnapshot(ref, (snap) => setUser(snap.data() as UserData))
  }, [uid])

  if (!user) return <p>Loading…</p>

  return (
    <main className="p-8 space-y-8 max-w-md mx-auto">
      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-xl mb-2">Your Profile</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Name:</strong> {user.name || '-'}</p>
        <p><strong>Phone:</strong> {user.phone || '-'}</p>
        <p><strong>Program:</strong> {user.program || '-'}</p>
        <p><strong>Session:</strong> {user.session || '-'}</p>
      </section>
      <Button onClick={() => auth.signOut()} className="w-full">
        Sign Out
      </Button>
    </main>
  )
}