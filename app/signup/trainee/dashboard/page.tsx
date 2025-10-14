// app/signup/trainee/dashboard/page.tsx
'use client'

import React, { useEffect, useRef, useState } from 'react'
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
import Image from 'next/image'

type View = 'home' | 'planning' | 'quizzes' | 'logbook' | 'profile'

type LogStatus = 'draft' | 'submitted' | 'approved'

type WeeklyLog = {
  id: string
  weekNumber: number
  startDate: string
  endDate: string
  tasks: string
  challenges: string
  achievements: string
  hours: number
  attachments: { name: string; size: number }[]
  status: LogStatus
  supervisorFeedback?: { rating: number; comments: string; by: string; at: string }
  updatedAt: string
}

const SAMPLE_LOGS: WeeklyLog[] = [
  {
    id: 'tmp-1',
    weekNumber: 1,
    startDate: '2025-07-01',
    endDate: '2025-07-07',
    tasks: 'Orientation, environment setup, onboarding tasks.',
    challenges: 'Configuring VPN and local dev environment delays.',
    achievements: 'Completed first ticket and environment setup.',
    hours: 40,
    attachments: [],
    status: 'approved',
    supervisorFeedback: { rating: 4, comments: 'Good start. Keep detailed notes.', by: 'Mentor A', at: '2025-07-08T10:00:00Z' },
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tmp-2',
    weekNumber: 2,
    startDate: '2025-07-08',
    endDate: '2025-07-14',
    tasks: 'Feature work on project A, unit tests.',
    challenges: 'Test flakiness; needing supervisor guidance.',
    achievements: 'Merged first PR.',
    hours: 38,
    attachments: [],
    status: 'submitted',
    updatedAt: new Date().toISOString(),
  },
]

const LOCALSTORAGE_PREFIX = 'goodlife:logbook:'

export default function TraineeDashboard() {
  const router = useRouter()
  const { toast } = useToast()

  const [user, setUser] = useState<User | null>(null)
  const [displayName, setDisplayName] = useState('')
  const [loading, setLoading] = useState(true)

  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [isLarge, setIsLarge] = useState(false)

  const [currentView, setCurrentView] = useState<View>('home')
  const [scanMode, setScanMode] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [profilePopupOpen, setProfilePopupOpen] = useState(false)
  const qrRef = useRef<HTMLDivElement>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  const [profileState, setProfileState] = useState({
    program: 'AWS Cloud Practitioner',
    average: 89.0,
    latestScore: 92,
    preferredFirstName: 'Umuhoza',
    firstName: 'UMUHOZA',
    lastName: 'Lionel',
    internshipStart: '2025-07-01',
    internshipEnd: '2025-09-28',
  })

  const [logs, setLogs] = useState<WeeklyLog[]>([])
  const [editing, setEditing] = useState<WeeklyLog | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [stagedFiles, setStagedFiles] = useState<File[]>([])
  const [enableServerSync] = useState(false)

  useEffect(() => {
    return onAuthStateChanged(auth, async u => {
      setUser(u)
      setDisplayName(u?.displayName || '')
      setLoading(false)
      if (u) {
        const snap = await getDoc(doc(db, 'trainees', u.uid)).catch(() => null)
        if (snap && snap.exists()) {
          const data = snap.data() as any
          setAvatarUrl(data?.avatarUrl || null)
          if (data?.preferredFirstName) setProfileState(prev => ({ ...prev, preferredFirstName: data.preferredFirstName }))
          if (data?.internshipStart) setProfileState(prev => ({ ...prev, internshipStart: data.internshipStart }))
          if (data?.internshipEnd) setProfileState(prev => ({ ...prev, internshipEnd: data.internshipEnd }))
        }
        const key = LOCALSTORAGE_PREFIX + u.uid
        const raw = localStorage.getItem(key)
        if (raw) {
          try {
            const parsed = JSON.parse(raw) as WeeklyLog[]
            setLogs(parsed)
          } catch {
            setLogs(SAMPLE_LOGS)
          }
        } else {
          setLogs(SAMPLE_LOGS)
        }
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const update = () => setIsLarge(window.innerWidth >= 1024)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    if (isLarge) setMobileOpen(false)
  }, [isLarge])

  useEffect(() => {
    if (!loading && !user) router.replace('/signup/trainee')
  }, [loading, user, router])

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
          toast({ title: 'Checked in', description: String(decoded) })
          scanner.stop()
          setScanMode(false)
        }
      )
      .catch(console.error)
    return () => scanner.stop().catch(() => {})
  }, [scanMode, toast])

  // lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!isLarge && mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [mobileOpen, isLarge])

  const persistLogs = (next: WeeklyLog[]) => {
    setLogs(next)
    if (!user) return
    try {
      localStorage.setItem(LOCALSTORAGE_PREFIX + user.uid, JSON.stringify(next))
    } catch {}
  }

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/signup/trainee')
  }

  const openNewLog = () => {
    const nextWeek = (logs.length ? Math.max(...logs.map(l => l.weekNumber)) + 1 : 1)
    const start = new Date()
    const end = new Date(start)
    end.setDate(start.getDate() + 6)
    const newLog: WeeklyLog = {
      id: `temp-${Date.now()}`,
      weekNumber: nextWeek,
      startDate: start.toISOString().slice(0, 10),
      endDate: end.toISOString().slice(0, 10),
      tasks: '',
      challenges: '',
      achievements: '',
      hours: 0,
      attachments: [],
      status: 'draft',
      updatedAt: new Date().toISOString(),
    }
    setEditing(newLog)
    setStagedFiles([])
    setModalOpen(true)
  }

  const openEditLog = (l: WeeklyLog) => {
    setEditing({ ...l })
    setStagedFiles([])
    setModalOpen(true)
  }

  const saveLogDraft = (partial: Partial<WeeklyLog>) => {
    if (!editing) return
    const updated = { ...editing, ...partial, updatedAt: new Date().toISOString() }
    setEditing(updated)
    if (user) {
      const draftKey = `${LOCALSTORAGE_PREFIX}${user.uid}:draft:${updated.id}`
      try {
        localStorage.setItem(draftKey, JSON.stringify(updated))
      } catch {}
    }
  }

  const commitSave = () => {
    if (!editing) return
    const exists = logs.findIndex(l => l.id === editing.id)
    const toSave = { ...editing, attachments: [...editing.attachments, ...stagedFiles.map(f => ({ name: f.name, size: f.size }))] }
    let next: WeeklyLog[]
    if (exists >= 0) {
      next = logs.map(l => (l.id === toSave.id ? { ...toSave, updatedAt: new Date().toISOString() } : l))
    } else {
      next = [toSave, ...logs].sort((a, b) => a.weekNumber - b.weekNumber)
    }
    persistLogs(next)
    setModalOpen(false)
    setEditing(null)
    setStagedFiles([])
    toast({ title: 'Saved', description: 'Weekly log saved locally' })
    if (enableServerSync) {
      setTimeout(() => {
        toast({ title: 'Synced', description: 'Log synced with server (mock)' })
      }, 600)
    }
  }

  const submitLog = (id: string) => {
    const next = logs.map(l => (l.id === id ? { ...l, status: 'submitted', updatedAt: new Date().toISOString() } : l))
    persistLogs(next)
    toast({ title: 'Submitted', description: 'Weekly log submitted for review' })
  }

  const approveLog = (id: string) => {
    const next = logs.map(l => (l.id === id ? { ...l, status: 'approved', updatedAt: new Date().toISOString(), supervisorFeedback: { rating: 5, comments: 'Approved', by: 'Supervisor', at: new Date().toISOString() } } : l))
    persistLogs(next)
    toast({ title: 'Approved', description: 'Supervisor approved this log (mock)' })
  }

  const deleteLog = (id: string) => {
    const next = logs.filter(l => l.id !== id)
    persistLogs(next)
    toast({ title: 'Deleted', description: 'Weekly log removed' })
  }

  const exportCSV = () => {
    const header = ['Week', 'Start', 'End', 'Tasks', 'Challenges', 'Achievements', 'Hours', 'Status', 'UpdatedAt']
    const rows = logs.map(l => [
      l.weekNumber,
      l.startDate,
      l.endDate,
      `"${(l.tasks || '').replace(/"/g, '""')}"`,
      `"${(l.challenges || '').replace(/"/g, '""')}"`,
      `"${(l.achievements || '').replace(/"/g, '""')}"`,
      l.hours,
      l.status,
      l.updatedAt,
    ])
    const csv = [header.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `logbook-${user?.uid || 'anon'}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const computeProgress = () => {
    const start = new Date(profileState.internshipStart)
    const end = new Date(profileState.internshipEnd)
    const total = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)))
    const elapsed = Math.max(0, Math.round((Date.now() - start.getTime()) / (1000 * 60 * 60 * 24)))
    const pct = Math.min(100, Math.round((elapsed / total) * 100))
    const weeksCompleted = logs.filter(l => l.status === 'approved' || l.status === 'submitted').length
    return { pct, elapsed, total, weeksCompleted }
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
    { id: 'home', label: 'Home', Icon: HomeIcon },
    { id: 'planning', label: 'My Planning', Icon: CalIcon },
    { id: 'quizzes', label: 'Evaluation Quizzes', Icon: QuizIcon },
    { id: 'logbook', label: 'Logbook', Icon: BookOpenIcon },
  ]

  const sidebarWidth = collapsed ? 80 : 256
  const progress = computeProgress()

  return (
    <div
      className="min-h-screen bg-muted text-[var(--color-text)] app-grid-flush"
      style={{ gridTemplateColumns: isLarge ? `${sidebarWidth}px 1fr` : '1fr', gridTemplateRows: 'auto 1fr', minHeight: '100vh' }}
    >
      {/* Sidebar (fixed off-canvas on mobile, inline on desktop) */}
      <aside
        style={{
          gridColumn: isLarge ? '1 / 2' : undefined,
          gridRow: isLarge ? '1 / 3' : undefined,
          backgroundColor: 'var(--color-primary-dark)',
          color: 'var(--color-surface)',
        }}
        className={`fixed z-50 top-0 left-0 h-full w-64 max-w-[80%] transition-transform duration-200 ease-in-out
          ${isLarge ? 'relative h-auto w-auto max-w-none translate-x-0' : ''}
          ${!isLarge && mobileOpen ? 'translate-x-0' : !isLarge ? '-translate-x-full' : ''}
          ${collapsed && isLarge ? 'w-20' : ''}
          flex flex-col`}
        aria-hidden={!isLarge && !mobileOpen}
      >
        <div className="flex items-center justify-between px-3 py-3 lg:px-4">
          <div className="flex items-center gap-3">
            <button
              aria-label="Toggle sidebar"
              onClick={() => {
                if (!isLarge) {
                  setMobileOpen(v => !v)
                } else {
                  setCollapsed(v => !v)
                }
              }}
              className="p-2 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center"
            >
              <Bars3Icon className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        <nav className="flex-1 px-1 py-2 space-y-1 overflow-auto">
          {navItems.map(({ id, label, Icon }) => {
            const active = currentView === id
            return (
              <button
                key={id}
                onClick={() => {
                  setCurrentView(id)
                  if (!isLarge) setMobileOpen(false)
                }}
                className={`flex items-center w-full gap-3 px-3 py-2 rounded-md transition-colors duration-150
                  ${active ? 'bg-primary text-white border-l-4 border-accent' : 'text-white hover:bg-primary/80'}
                  ${collapsed ? 'justify-center' : 'justify-start'}
                `}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="ml-1 text-sm font-medium">{label}</span>}
              </button>
            )
          })}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={() => {
              setCurrentView('profile')
              if (!isLarge) setMobileOpen(false)
            }}
            className={`flex items-center w-full gap-3 text-white transition-colors ${collapsed ? 'justify-center' : ''}`}
          >
            <div className="h-10 w-10 rounded-full overflow-hidden bg-surface flex items-center justify-center">
              {avatarUrl ? (
                <Image src={avatarUrl} alt="avatar" width={40} height={40} style={{ objectFit: 'cover' }} />
              ) : (
                <UserCircleIcon className="h-8 w-8 text-[var(--color-primary)]" />
              )}
            </div>
            {!collapsed && (
              <div className="text-left">
                <div className="text-sm font-medium">{displayName || user.email}</div>
                <div className="text-xs text-[var(--color-surface)]/80">View profile</div>
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile overlay backdrop */}
      {!isLarge && (
        <div
          className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setMobileOpen(false)}
        />
      )}

      <header
        className="header-foreground px-4 py-3 sticky top-0 header-flush header-flush--overlap shadow-md-custom flex items-center justify-between"
        style={{
          gridColumn: isLarge ? '2 / 3' : '1 / 2',
          gridRow: '1 / 2',
          backgroundColor: 'var(--color-primary-dark)',
          color: 'var(--color-surface)',
        }}
      >
        <div className="flex items-center gap-4">
          <button
            aria-label="Open sidebar"
            onClick={() => setMobileOpen(v => !v)}
            className="lg:hidden p-2 rounded-md bg-white/10 hover:bg-white/20 mr-2"
          >
            <Bars3Icon className="h-5 w-5 text-white" />
          </button>

          <div>
            <div className="text-sm font-semibold">{profileState.program}</div>
            <div className="text-xs opacity-90">Program</div>
          </div>

          <div className="hidden sm:flex items-center gap-6 ml-4">
            <div className="text-center">
              <div className="text-sm opacity-90">Average</div>
              <div className="text-lg font-bold">{profileState.average}%</div>
            </div>
            <div className="text-center">
              <div className="text-sm opacity-90">Latest score</div>
              <div className="text-lg font-bold">{profileState.latestScore}/100</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => {
                setNotifOpen(v => !v)
                setProfilePopupOpen(false)
              }}
              aria-label="Notifications"
              className="p-2 rounded-md bg-white/10 text-white hover:bg-white/20"
            >
              <BellIcon className="h-5 w-5" />
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-surface rounded-md shadow-md-custom ring-1 ring-black ring-opacity-5 z-40 border border-soft">
                <div className="p-3 border-b">
                  <div className="text-sm font-semibold text-[var(--color-text)]">Notifications</div>
                </div>
                <ul className="p-2 max-h-56 overflow-auto">
                  {['You have a pending submission', 'Supervisor commented on week 2'].map((n, i) => (
                    <li key={i} className="p-3 rounded-md hover:bg-muted text-[var(--color-text)] font-medium">
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setProfilePopupOpen(v => !v)
                setNotifOpen(false)
              }}
              aria-label="Profile"
              className="p-1 rounded-full bg-white/10"
            >
              <div className="h-9 w-9 rounded-full overflow-hidden bg-surface">
                {avatarUrl ? (
                  <Image src={avatarUrl} alt="avatar" fill style={{ objectFit: 'cover' }} />
                ) : (
                  <UserCircleIcon className="h-9 w-9 text-white" />
                )}
              </div>
            </button>

            {profilePopupOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-surface rounded-md shadow-md-custom ring-1 ring-black ring-opacity-5 z-40 border border-soft">
                <ul className="divide-y">
                  <li>
                    <button
                      onClick={() => {
                        router.push('/signup/trainee/profile')
                        setProfilePopupOpen(false)
                      }}
                      className="flex items-center w-full px-4 py-2 hover:bg-muted gap-3 text-sm text-[var(--color-text)]"
                    >
                      <EyeIcon className="h-5 w-5 text-primary" />
                      View Profile
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        router.push('/signup/trainee/profile#settings')
                        setProfilePopupOpen(false)
                      }}
                      className="flex items-center w-full px-4 py-2 hover:bg-muted gap-3 text-sm text-[var(--color-text)]"
                    >
                      <Cog6ToothIcon className="h-5 w-5 text-primary" />
                      Settings
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        router.push('/signup/trainee/support')
                        setProfilePopupOpen(false)
                      }}
                      className="flex items-center w-full px-4 py-2 hover:bg-muted gap-3 text-sm text-[var(--color-text)]"
                    >
                      <LifebuoyIcon className="h-5 w-5 text-primary" />
                      Support
                    </button>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 hover:bg-muted gap-3 text-sm text-[var(--color-text)]">
                      <ArrowLeftOnRectangleIcon className="h-5 w-5 text-primary" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      <main style={{ gridColumn: isLarge ? '2 / 3' : '1 / 2', gridRow: '2 / 3' }} className="overflow-y-auto p-4 sm:p-6">
        {currentView === 'profile' ? (
          <div className="max-w-4xl mx-auto card-surface rounded-md p-6">
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">My profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="text-sm text-[var(--color-text-muted)]">Program</div>
                <div className="text-md font-medium text-[var(--color-text)]">{profileState.program}</div>
                <div className="mt-4 text-sm text-[var(--color-text-muted)]">Average</div>
                <div className="text-md font-medium text-[var(--color-text)]">{profileState.average}%</div>
                <div className="mt-4 text-sm text-[var(--color-text-muted)]">Latest score</div>
                <div className="text-md font-medium text-[var(--color-text)]">{profileState.latestScore}/100</div>
              </div>
              <div className="md:col-span-2 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)]">Preferred first name</label>
                  <input className="mt-1 block w-full rounded-md border border-soft px-3 py-2 bg-surface text-[var(--color-text)]" value={profileState.preferredFirstName} onChange={e => setProfileState(prev => ({ ...prev, preferredFirstName: e.target.value }))} />
                </div>
              </div>
            </div>
          </div>
        ) : currentView === 'logbook' ? (
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="card-surface p-4 rounded-md w-full max-w-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-[var(--color-text-muted)]">Internship progress</div>
                    <div className="text-2xl font-bold">{progress.pct}%</div>
                    <div className="text-xs text-[var(--color-text-muted)]">{progress.elapsed}/{progress.total} days</div>
                    <div className="mt-2 text-xs">Weeks completed: <strong>{progress.weeksCompleted}</strong></div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-2 bg-accent" style={{ width: `${progress.pct}%` }} />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={openNewLog}>New Weekly Log</Button>
                <Button variant="outline" onClick={exportCSV}>Export CSV</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-3">
                {logs.length === 0 ? (
                  <div className="card-surface p-6 text-[var(--color-text-muted)]">No logs yet. Create your first weekly log.</div>
                ) : (
                  logs.map(l => (
                    <div key={l.id} className="card-surface p-4 rounded-md flex items-start justify-between">
                      <div className="w-full">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-semibold">Week {l.weekNumber} · {l.startDate} — {l.endDate}</div>
                            <div className="text-xs text-[var(--color-text-muted)]">Updated {new Date(l.updatedAt).toLocaleString()}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${l.status === 'draft' ? 'bg-yellow-200 text-yellow-800' : l.status === 'submitted' ? 'bg-blue-200 text-blue-800' : 'bg-green-200 text-green-800'}`}>
                              {l.status.toUpperCase()}
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 text-[var(--color-text-muted)]">
                          <div><strong>Tasks:</strong> {l.tasks || '—'}</div>
                          <div className="mt-1"><strong>Challenges:</strong> {l.challenges || '—'}</div>
                          <div className="mt-1"><strong>Achievements:</strong> {l.achievements || '—'}</div>
                        </div>

                        <div className="mt-3 flex items-center gap-3">
                          <Button size="sm" onClick={() => openEditLog(l)}>Edit</Button>
                          {l.status === 'draft' && <Button size="sm" variant="outline" onClick={() => submitLog(l.id)}>Submit</Button>}
                          {l.status === 'submitted' && <Button size="sm" onClick={() => approveLog(l.id)}>Mark Approve (mock)</Button>}
                          <Button size="sm" variant="destructive" onClick={() => deleteLog(l.id)}>Delete</Button>
                        </div>

                        <div className="mt-3">
                          {l.attachments.length > 0 && (
                            <div className="text-xs">
                              <strong>Attachments:</strong> {l.attachments.map(a => a.name).join(', ')}
                            </div>
                          )}
                        </div>

                        <div className="mt-3">
                          <strong>Supervisor feedback</strong>
                          <div className="mt-1 text-xs text-[var(--color-text-muted)]">
                            {l.supervisorFeedback ? `${l.supervisorFeedback.rating}/5 — ${l.supervisorFeedback.comments}` : 'No feedback yet.'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <aside className="space-y-3">
                <div className="card-surface p-4 rounded-md">
                  <div className="text-sm font-semibold">Guidance</div>
                  <div className="text-xs text-[var(--color-text-muted)] mt-2">
                    Use weekly logs to detail tasks, challenges and achievements. Keep attachments small for now; uploads will sync when backend is enabled.
                  </div>
                </div>

                <div className="card-surface p-4 rounded-md">
                  <div className="text-sm font-semibold">Actions</div>
                  <div className="mt-2 flex flex-col gap-2">
                    <Button onClick={() => toast({ title: 'Tip', description: 'Drafts autosave every 8s' })}>Autosave info</Button>
                    <Button variant="outline" onClick={() => toast({ title: 'Mock sync', description: enableServerSync ? 'Server sync ON' : 'Server sync OFF (mock)' })}>Sync status</Button>
                  </div>
                </div>
              </aside>
            </div>

            {modalOpen && editing && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                <div className="bg-surface rounded-md w-full max-w-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold">Weekly Log — Week {editing.weekNumber}</div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-[var(--color-text-muted)]">Status: <strong>{editing.status}</strong></div>
                      <button onClick={() => { setModalOpen(false); setEditing(null) }} className="text-sm text-[var(--color-text-muted)]">Close</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium">Start date</label>
                      <input type="date" className="mt-1 block w-full rounded-md border border-soft px-3 py-2" value={editing.startDate} onChange={e => { saveLogDraft({ startDate: e.target.value }) }} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">End date</label>
                      <input type="date" className="mt-1 block w-full rounded-md border border-soft px-3 py-2" value={editing.endDate} onChange={e => { saveLogDraft({ endDate: e.target.value }) }} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Tasks</label>
                    <textarea className="mt-1 block w-full rounded-md border border-soft px-3 py-2" rows={3} value={editing.tasks} onChange={e => saveLogDraft({ tasks: e.target.value })} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium">Challenges</label>
                      <textarea className="mt-1 block w-full rounded-md border border-soft px-3 py-2" rows={3} value={editing.challenges} onChange={e => saveLogDraft({ challenges: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm font medium text-[var(--color-text)]">Achievements</label>
                      <textarea className="mt-1 block w-full rounded-md border border-soft px-3 py-2" rows={3} value={editing.achievements} onChange={e => saveLogDraft({ achievements: e.target.value })} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
                    <div>
                      <label className="block text-sm font-medium">Hours</label>
                      <input type="number" className="mt-1 block w-full rounded-md border border-soft px-3 py-2" value={editing.hours} onChange={e => saveLogDraft({ hours: Number(e.target.value) || 0 })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Attachments</label>
                      <input type="file" className="mt-1 block w-full text-sm" onChange={e => {
                        const f = e.target.files?.[0]
                        if (!f) return
                        if (f.size > 8 * 1024 * 1024) {
                          toast({ title: 'File too large', description: 'Max 8MB per file' })
                          return
                        }
                        setStagedFiles(s => [...s, f])
                        saveLogDraft({ attachments: editing.attachments })
                      }} />
                      <div className="text-xs text-[var(--color-text-muted)] mt-1">Files staged only in browser until server sync enabled</div>
                      {stagedFiles.length > 0 && (
                        <ul className="mt-2 text-xs">
                          {stagedFiles.map((f, i) => <li key={i}>{f.name} · {(f.size / 1024).toFixed(1)} KB</li>)}
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" onClick={() => { setModalOpen(false); setEditing(null) }}>Cancel</Button>
                    <Button onClick={commitSave}>Save</Button>
                    <Button variant="destructive" onClick={() => { if (editing) { setEditing({ ...editing, status: 'submitted' }); commitSave(); submitLog(editing.id) }}}>Save & Submit</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {currentView === 'home' ? (
              <div className="space-y-6">
                <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                  <div className="card-surface rounded-md p-4">
                    <h2 className="text-lg font-semibold text-[var(--color-text)]">Next On-Site Session</h2>
                    <p className="mt-2 text-[var(--color-text-muted)]">Thursday, Sep 18 · 2:00 PM</p>
                    <p className="text-[var(--color-text-muted)] mt-1">Main Training Hall</p>
                    <Button onClick={() => setScanMode(true)} className="mt-4 btn-accent px-4 py-2 rounded-md">
                      Check-In via QR
                    </Button>
                  </div>

                  <div className="card-surface rounded-md p-4">
                    <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3">Your Calendar</h2>
                    <Calendar className="rounded-md border border-soft" onChange={() => { }} value={new Date()} />
                  </div>

                  <div className="card-surface rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-[var(--color-text-muted)]">Logbook progress</div>
                        <div className="text-2xl font-bold">{progress.pct}%</div>
                        <div className="text-xs text-[var(--color-text-muted)]">{progress.elapsed}/{progress.total} days</div>
                        <div className="mt-2 text-xs">Weeks recorded: <strong>{logs.length}</strong></div>
                      </div>
                      <div className="w-36">
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-2 bg-accent" style={{ width: `${progress.pct}%` }} />
                        </div>
                        <div className="text-xs mt-2">
                          <button onClick={() => setCurrentView('logbook')} className="text-sm text-accent hover:underline">Open Logbook</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
                  {[
                    { title: 'Upcoming Events', desc: 'No upcoming events' },
                    { title: 'Current Learning', desc: '—' },
                    { title: 'Current Projects', desc: 'No current projects' },
                  ].map(item => (
                    <div key={item.title} className="card-surface rounded-md p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="text-md font-semibold text-[var(--color-text)]">{item.title}</h3>
                        <p className="mt-1 text-[var(--color-text-muted)]">{item.desc}</p>
                      </div>
                      <button className="self-end flex items-center text-sm text-accent hover:text-orange-600">
                        View <ChevronRightIcon className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                  {[
                    { title: 'Scores', value: '—', status: 'In Progress', icon: <BellIcon className="h-5 w-5" /> },
                    { title: 'Reports', value: '—', status: '', icon: null },
                  ].map(({ title, value, status, icon }) => (
                    <div key={title} className="card-surface rounded-md p-4 flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-md font-semibold text-[var(--color-text)]">{title}</h3>
                          <p className="text-2xl font-bold text-primary mt-1">{value}</p>
                        </div>
                        {status && (
                          <div className="flex items-center space-x-1 text-sm text-[var(--color-text-muted)]">
                            {icon}
                            <span className="uppercase">{status}</span>
                          </div>
                        )}
                      </div>
                      <div className="self-end text-sm text-[var(--color-text-muted)]">View Details</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-60 text-[var(--color-text-muted)] card-surface rounded-md">
                {currentView === 'planning' && <p>My Planning coming soon…</p>}
                {currentView === 'quizzes' && <p>Evaluation Quizzes coming soon…</p>}
                {currentView === 'logbook' && <p>Logbook coming soon…</p>}
              </div>
            )}
          </>
        )}
      </main>

      {scanMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-md p-4 shadow-md-custom w-full max-w-md space-y-4 border border-soft">
            <h3 className="text-lg font-semibold text-[var(--color-text)]">Scan QR to Check-In</h3>
            <div ref={qrRef} className="w-full aspect-[1/1] rounded-md border border-soft overflow-hidden" aria-label="QR scanner" />
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setScanMode(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}