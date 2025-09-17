// app/signup/trainee/dashboard/page.tsx
'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Calendar from 'react-calendar'
import { Html5Qrcode } from 'html5-qrcode'
import { Bars3Icon, UserCircleIcon } from '@heroicons/react/24/outline'
import { auth } from '@/lib/firebase'
import { signOut, User } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

const modules = [
  { id: 1, title: 'Orientation & Safety', complete: 100 },
  { id: 2, title: 'Equipment Handling', complete: 45 },
  { id: 3, title: 'Logbook Reporting', complete: 20 },
  { id: 4, title: 'Site Assessment', complete: 0 },
]

const recommendations = [
  { id: 1, title: 'Advanced Tool Calibration', desc: 'Deepen your technical expertise' },
  { id: 2, title: 'Team Leadership Basics', desc: 'Lead your peers with confidence' },
]

export default function TraineeDashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [showProfile, setShowProfile] = useState(false)
  const [scanMode, setScanMode] = useState(false)
  const [date, setDate] = useState(new Date())
  const qrRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(u => {
      setUser(u)
      setLoading(false)
    })
    return unsub
  }, [])

  useEffect(() => {
    if (!loading && !user) router.replace('/signup/trainee')
  }, [loading, user, router])

  useEffect(() => {
    if (!scanMode || !qrRef.current) return
    const qrId = 'qr-reader'
    qrRef.current.innerHTML = `<div id="${qrId}"></div>`
    const html5Qrcode = new Html5Qrcode(qrId)
    html5Qrcode
      .start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 250 },
        decodedText => {
          toast({ title: 'Checked in', description: decodedText })
          html5Qrcode.stop()
          setScanMode(false)
        }
      )
      .catch(console.error)
    return () => { html5Qrcode.stop().catch(() => {}) }
  }, [scanMode, toast])

  const handleSignOut = async () => {
    await signOut(auth)
    router.push('/signup/trainee')
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
      </main>
    )
  }
  if (!user) return null

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 flex items-center space-x-2">
          <Bars3Icon className="h-6 w-6 text-orange-600" />
          <span className="text-xl font-bold text-gray-800">Goodlife</span>
        </div>
        <nav className="mt-6">
          <Link href="#" className="block px-6 py-2 text-gray-700 hover:bg-orange-50">Dashboard</Link>
          <Link href="#" className="block px-6 py-2 text-gray-700 hover:bg-orange-50">Courses</Link>
          <Link href="#" className="block px-6 py-2 text-gray-700 hover:bg-orange-50">Calendar</Link>
          <button
            onClick={() => setShowProfile(true)}
            className="w-full text-left px-6 py-2 text-gray-700 hover:bg-orange-50 flex items-center"
          >
            <UserCircleIcon className="h-5 w-5 mr-2" /> Profile
          </button>
          <button
            onClick={handleSignOut}
            className="w-full text-left px-6 py-2 mt-4 text-gray-700 hover:bg-red-50"
          >
            Sign Out
          </button>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Welcome, {user.email}</h1>
          <button
            onClick={() => setShowProfile(true)}
            className="flex items-center space-x-2 text-gray-700 hover:text-orange-600"
          >
            <UserCircleIcon className="h-6 w-6" />
            <span>Edit Profile</span>
          </button>
        </header>

        {/* Upcoming Session & Calendar */}
        <section className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-medium mb-2">Next On-Site Session</h2>
            <p className="text-gray-600">Thursday, Sep 18 · 2:00 PM</p>
            <p className="text-gray-600 mt-1">Location: Main Training Hall</p>
            <Button
              onClick={() => setScanMode(true)}
              className="mt-4 bg-orange-600 text-white"
            >
              Check-In via QR
            </Button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-medium mb-4">Your Calendar</h2>
            <Calendar onChange={setDate} value={date} className="text-sm" />
          </div>
        </section>

        {/* Progress & Recommendations */}
        <section className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-medium mb-4">Module Progress</h2>
            <ul className="space-y-4">
              {modules.map(m => (
                <li key={m.id}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{m.title}</span>
                    <span className="text-sm text-gray-600">{m.complete}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-600 h-2 rounded-full"
                      style={{ width: `${m.complete}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-medium mb-4">Recommended Next</h2>
            <ul className="space-y-4">
              {recommendations.map(r => (
                <li key={r.id} className="p-4 border rounded hover:shadow">
                  <h3 className="font-semibold">{r.title}</h3>
                  <p className="text-gray-600 text-sm">{r.desc}</p>
                  <Button variant="link" className="text-orange-600">
                    Start Now
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="fixed inset-0 bg-black opacity-30"
            onClick={() => setShowProfile(false)}
          />
          <div className="bg-white rounded-lg max-w-md w-full p-6 z-10">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <Input type="text" defaultValue="Dr Joyce" />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <Input type="email" defaultValue={user.email || ''} />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowProfile(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowProfile(false)}>
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Scan Overlay */}
      {scanMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Scan QR to Check-In</h3>
            <div ref={qrRef} className="w-80 h-80" />
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setScanMode(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}