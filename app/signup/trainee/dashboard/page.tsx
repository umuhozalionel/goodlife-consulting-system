// app/signup/trainee/dashboard/page.tsx
'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { Html5Qrcode } from 'html5-qrcode'
import {
  Bars3Icon,
  HomeIcon,
  CalendarDaysIcon as CalIcon,
  ClipboardDocumentCheckIcon as QuizIcon,
  BookOpenIcon,
  UserCircleIcon,
  ChevronRightIcon,
  BellIcon,
  EyeIcon,
  Cog6ToothIcon,
  LifebuoyIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { Loader2 } from 'lucide-react'
import { auth, db } from '@/lib/firebase'
import { signOut, onAuthStateChanged, User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

type View = 'home' | 'planning' | 'quizzes' | 'logbook'

export default function TraineeDashboard() {
  const router = useRouter()
  const { toast } = useToast()

  const [user, setUser] = useState<User | null>(null)
  const [displayName, setDisplayName] = useState('')
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentView, setCurrentView] = useState<View>('home')
  const [scanMode, setScanMode] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const qrRef = useRef<HTMLDivElement>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  // Auth + load avatar
  useEffect(() => {
    return onAuthStateChanged(auth, async u => {
      setUser(u)
      setDisplayName(u?.displayName || '')
      setLoading(false)
      if (u) {
        const snap = await getDoc(doc(db, 'trainees', u.uid))
        if (snap.exists()) setAvatarUrl(snap.data().avatarUrl || null)
      }
    })
  }, [])

  // redirect non-users
  useEffect(() => {
    if (!loading && !user) router.replace('/signup/trainee')
  }, [loading, user, router])

  // QR check-in
  useEffect(() => {
    if (!scanMode || !qrRef.current) return
    const id = 'qr-reader'
    qrRef.current.innerHTML = `<div id="${id}"></div>`
    const scanner = new Html5Qrcode(id)
    scanner
      .start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 250 },
        decoded => {
          toast({ title: 'Checked in', description: decoded })
          scanner.stop()
          setScanMode(false)
        }
      )
      .catch(console.error)
    return () => scanner.stop().catch(() => {})
  }, [scanMode, toast])

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/signup/trainee')
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-50">
        <Loader2 className="h-10 w-10 animate-spin text-accent" />
      </main>
    )
  }
  if (!user) return null

  const navItems: { id: View; label: string; Icon: React.FC<any> }[] = [
    { id: 'home',     label: 'Home',               Icon: HomeIcon },
    { id: 'planning', label: 'My Planning',        Icon: CalIcon },
    { id: 'quizzes',  label: 'Evaluation Quizzes', Icon: QuizIcon },
    { id: 'logbook',  label: 'Logbook',            Icon: BookOpenIcon },
  ]

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`
          flex-shrink-0 transition-all duration-300
          ${sidebarOpen ? 'w-64' : 'w-16'}
          bg-primary-dark text-white border-r border-primary
        `}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between px-6 py-4">
            {sidebarOpen && (
              <span className="text-xl font-semibold">Goodlife</span>
            )}
            <button
              onClick={() => setSidebarOpen(v => !v)}
              aria-label="Toggle sidebar"
              className="p-1 text-white hover:text-accent transition-colors"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 px-2 space-y-1">
            {navItems.map(({ id, label, Icon }) => {
              const active = currentView === id
              return (
                <button
                  key={id}
                  onClick={() => setCurrentView(id)}
                  className={`
                    flex items-center w-full px-4 py-2 rounded-md
                    transition-colors duration-200
                    ${active
                      ? 'bg-primary text-white border-l-4 border-accent'
                      : 'text-white hover:bg-primary'}
                  `}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {sidebarOpen && (
                    <span className="ml-3 text-sm font-medium">{label}</span>
                  )}
                </button>
              )
            })}
          </nav>
          <div className="px-4 py-6 border-t border-primary">
            <button
              onClick={() => setShowProfileMenu(v => !v)}
              className="flex items-center space-x-2 w-full text-white hover:text-accent transition-colors"
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="h-6 w-6 rounded-full object-cover"
                />
              ) : (
                <UserCircleIcon className="h-6 w-6" />
              )}
              {sidebarOpen && (
                <span className="text-sm font-medium">Profile</span>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Profile menu */}
      {showProfileMenu && (
        <div className="absolute top-16 right-4 z-50 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <ul className="divide-y divide-neutral-200">
            <li>
              <button
                onClick={() => {
                  router.push('/signup/trainee/profile')
                  setShowProfileMenu(false)
                }}
                className="flex items-center w-full px-4 py-2 hover:bg-neutral-100 transition-colors"
              >
                <EyeIcon className="h-5 w-5 text-primary" />
                <span className="ml-3 text-gray-800 text-sm">View Profile</span>
              </button>
            </li>
            <li>
              <button className="flex items-center w-full px-4 py-2 hover:bg-neutral-100 transition-colors">
                <Cog6ToothIcon className="h-5 w-5 text-primary" />
                <span className="ml-3 text-gray-800 text-sm">Settings</span>
              </button>
            </li>
            <li>
              <button className="flex items-center w-full px-4 py-2 hover:bg-neutral-100 transition-colors">
                <LifebuoyIcon className="h-5 w-5 text-primary" />
                <span className="ml-3 text-gray-800 text-sm">Support</span>
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 hover:bg-neutral-100 transition-colors"
              >
                <ArrowLeftOnRectangleIcon className="h-5 w-5 text-primary" />
                <span className="ml-3 text-gray-800 text-sm">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between bg-primary px-6 py-4 shadow-sm">
          <h1 className="text-2xl font-semibold text-white">
            {displayName || user.email}
          </h1>
          <button
            onClick={() => setShowProfileMenu(v => !v)}
            aria-label="Toggle profile menu"
            className="flex items-center space-x-2 text-white hover:text-accent transition-colors"
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Avatar"
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <UserCircleIcon className="h-8 w-8" />
            )}
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {currentView === 'home' && (
            <div className="grid gap-6">
              {/* Top */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-md shadow-md hover:shadow-lg transition-shadow p-6">
                  <h2 className="text-xl font-semibold text-primary">
                    Next On-Site Session
                  </h2>
                  <p className="mt-2 text-gray-600">
                    Thursday, Sep 18 · 2:00 PM
                  </p>
                  <p className="text-gray-600 mt-1">Main Training Hall</p>
                  <Button
                    onClick={() => setScanMode(true)}
                    className="mt-4 bg-accent hover:bg-orange-600 text-white px-5 py-2 rounded-md focus:ring-2 focus:ring-accent"
                  >
                    Check-In via QR
                  </Button>
                </div>
                <div className="bg-white rounded-md shadow-md hover:shadow-lg transition-shadow p-6">
                  <h2 className="text-xl font-semibold text-primary mb-4">
                    Your Calendar
                  </h2>
                  <Calendar
                    className="rounded-md border border-neutral-200"
                    onChange={() => {}}
                    value={new Date()}
                  />
                </div>
              </div>

              {/* Middle */}
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { title: 'Upcoming Events', desc: 'No upcoming events' },
                  { title: 'Current Learning', desc: '—' },
                  { title: 'Current Projects', desc: 'No current projects' },
                ].map(item => (
                  <div
                    key={item.title}
                    className="bg-white rounded-md shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-primary">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-gray-500">{item.desc}</p>
                    </div>
                    <button className="self-end flex items-center text-sm text-accent hover:text-orange-600 transition-colors">
                      View <ChevronRightIcon className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Bottom */}
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Scores',
                    value: '—',
                    status: 'In Progress',
                    icon: <BellIcon className="h-5 w-5" />,
                  },
                  {
                    title: 'Reports',
                    value: '—',
                    status: '',
                    icon: null,
                  },
                ].map(({ title, value, status, icon }) => (
                  <div
                    key={title}
                    className="bg-white rounded-md shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col justify-between"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-primary">
                          {title}
                        </h3>
                        <p className="text-3xl font-bold text-primary mt-1">
                          {value}
                        </p>
                      </div>
                      {status && (
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          {icon}
                          <span className="uppercase">{status}</span>
                        </div>
                      )}
                    </div>
                    <div className="self-end text-sm text-gray-400">
                      View Details
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView !== 'home' && (
            <div className="flex items-center justify-center h-64 text-gray-500">
              {currentView === 'planning' && <p>My Planning coming soon…</p>}
              {currentView === 'quizzes' && <p>Evaluation Quizzes coming soon…</p>}
              {currentView === 'logbook' && <p>Logbook coming soon…</p>}
            </div>
          )}
        </main>
      </div>

      {/* QR Overlay */}
      {scanMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
          <div className="bg-white rounded-md p-6 shadow-lg space-y-4">
            <h3 className="text-lg font-semibold text-primary">
              Scan QR to Check-In
            </h3>
            <div ref={qrRef} className="w-80 h-80 rounded-md border border-neutral-200" />
            <Button variant="outline" className="mt-2">
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}