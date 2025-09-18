// app/signup/trainee/profile/page.tsx
'use client'

import React, { useState, useEffect, Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  UserCircleIcon,
  DocumentDuplicateIcon,
  PhotoIcon,
  PencilIcon,
  XMarkIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react'
import { Loader2 } from 'lucide-react'
import { auth, db } from '@/lib/firebase'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // cover & avatar URLs
  const [coverUrl, setCoverUrl] = useState('/cover-placeholder.jpg')
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  // profile data
  const [personalInfo, setPersonalInfo] = useState({ name: '', email: '' })
  const [languages, setLanguages] = useState<{ lang: string; level: string }[]>([])
  const [phone, setPhone] = useState<{ label: string; value: string }[]>([])
  const [social, setSocial] = useState<{ label: string; value: string }[]>([])
  const [interests, setInterests] = useState<string[]>([])
  const [location, setLocation] = useState({ origin: '', residence: '' })

  // inline edit modal state
  const [editSection, setEditSection] = useState<string | null>(null)
  const [formValue, setFormValue] = useState('')

  // Auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u)
      setLoading(false)
    })
    return unsub
  }, [])

  // Redirect & load Firestore data
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/signup/trainee')
      return
    }
    if (user) {
      ;(async () => {
        const snap = await getDoc(doc(db, 'trainees', user.uid))
        if (snap.exists()) {
          const data = snap.data()
          setPersonalInfo(data.personalInfo || { name: '', email: user.email! })
          setLanguages(data.languages || [])
          setPhone(data.phone || [])
          setSocial(data.social || [])
          setInterests(data.interests || [])
          setLocation(data.location || { origin: '', residence: '' })
          setCoverUrl(data.coverUrl || '/cover-placeholder.jpg')
          setAvatarUrl(data.avatarUrl || null)
        } else {
          setPersonalInfo({ name: '', email: user.email! })
        }
      })()
    }
  }, [user, loading, router])

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/signup/trainee')
  }

  // file pickers
  const handleCoverFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setCoverUrl(URL.createObjectURL(e.target.files[0]))
    }
  }
  const handleAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setAvatarUrl(URL.createObjectURL(e.target.files[0]))
    }
  }

  // inline editing
  const openEdit = (section: string, initial = '') => {
    setEditSection(section)
    setFormValue(initial)
  }
  const saveEdit = () => {
    switch (editSection) {
      case 'personal':
        setPersonalInfo(prev => ({ ...prev, name: formValue }))
        break
      case 'languages':
        setLanguages([{ lang: formValue, level: 'Fluent' }])
        break
      case 'phone':
        setPhone([{ label: 'Primary', value: formValue }])
        break
      case 'social':
        setSocial([{ label: 'Profile', value: formValue }])
        break
      case 'interests':
        setInterests([formValue])
        break
      case 'location':
        setLocation(prev => ({ ...prev, residence: formValue }))
        break
    }
    setEditSection(null)
  }

  // save to Firestore
  const handleSaveProfile = async () => {
    if (!user) return
    setIsSaving(true)
    try {
      await setDoc(
        doc(db, 'trainees', user.uid),
        {
          personalInfo,
          languages,
          phone,
          social,
          interests,
          location,
          coverUrl,
          avatarUrl,
        },
        { merge: true }
      )
      toast({ title: 'Profile saved', description: 'Your changes have been stored.' })
    } catch (err: any) {
      console.error(err)
      toast({
        title: err.code === 'permission-denied' ? 'Permission denied' : 'Error',
        description:
          err.code === 'permission-denied'
            ? 'Check your Firestore rules.'
            : 'Could not save profile.',
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (loading || !user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between bg-white px-6 py-4 shadow">
        <Link href="/signup/trainee/dashboard">
          <Button variant="link" className="text-gray-600 hover:text-orange-600">
            Back to Dashboard
          </Button>
        </Link>
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleSaveProfile}
            disabled={isSaving}
            className={`flex items-center ${
              isSaving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSaving && <Loader2 className="h-5 w-5 animate-spin mr-2" />}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
          <button onClick={handleLogout} className="text-gray-600 hover:text-red-600">
            Logout
          </button>
        </div>
      </header>

      {/* Cover + Avatar */}
      <div className="relative h-64 bg-gray-200 flex items-end p-6">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${coverUrl}')` }}
        />
        <input
          id="cover-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleCoverFile}
        />
        <button
          onClick={() => document.getElementById('cover-upload')?.click()}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow hover:bg-gray-100"
        >
          <PhotoIcon className="h-6 w-6 text-gray-600" />
        </button>

        <div className="flex items-center space-x-4">
          <div className="relative">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="avatar"
                className="h-24 w-24 object-cover rounded-full border-2 border-white"
              />
            ) : (
              <UserCircleIcon className="h-24 w-24 text-gray-400 bg-white rounded-full p-1" />
            )}
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarFile}
            />
            <button
              onClick={() => document.getElementById('avatar-upload')?.click()}
              className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow hover:bg-gray-100"
            >
              <PhotoIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          <Button
            variant="outline"
            onClick={() => navigator.clipboard.writeText(window.location.href)}
          >
            <DocumentDuplicateIcon className="h-5 w-5 mr-2" />
            Copy Profile Link
          </Button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="p-6 grid gap-6 md:grid-cols-2">
        <InfoCard
          title="Personal Information"
          onEdit={() => openEdit('personal', personalInfo.name)}
        >
          <p className="text-gray-700">{personalInfo.name}</p>
          <p className="text-gray-500 mt-1">{personalInfo.email}</p>
        </InfoCard>

        <InfoCard title="Languages" onEdit={() => openEdit('languages', languages[0]?.lang || '')}>
          {languages.map((l, i) => (
            <p key={i} className="text-gray-700">
              {l.lang} – {l.level}
            </p>
          ))}
        </InfoCard>

        <InfoCard title="Phone Numbers" onEdit={() => openEdit('phone', phone[0]?.value || '')}>
          {phone.map((p, i) => (
            <p key={i} className="text-gray-700">
              {p.label}: {p.value}
            </p>
          ))}
        </InfoCard>

        <InfoCard title="Social Profiles" onEdit={() => openEdit('social', social[0]?.value || '')}>
          {social.map((s, i) => (
            <p key={i} className="text-gray-700">
              {s.label}: {s.value}
            </p>
          ))}
        </InfoCard>

        <InfoCard
          title="Interests"
          onEdit={() => openEdit('interests', interests[0] || '')}
        >
          {interests.map((i, idx) => (
            <p key={idx} className="text-gray-700">
              {i}
            </p>
          ))}
        </InfoCard>

        <InfoCard
          title="Location"
          onEdit={() => openEdit('location', location.residence)}
        >
          <p className="text-gray-700">Origin: {location.origin}</p>
          <p className="text-gray-700">Residence: {location.residence}</p>
        </InfoCard>
      </div>

      {/* Edit Modal */}
      <Transition.Root show={!!editSection} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setEditSection(null)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="mx-auto w-full max-w-md rounded bg-white p-6 shadow">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title className="text-lg font-medium">
                    {`Edit ${editSection}`}
                  </Dialog.Title>
                  <button onClick={() => setEditSection(null)}>
                    <XMarkIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
                  </button>
                </div>
                <Input
                  value={formValue}
                  onChange={e => setFormValue(e.target.value)}
                  placeholder={`Enter new ${editSection}`}
                />
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setEditSection(null)}>
                    Cancel
                  </Button>
                  <Button onClick={saveEdit}>Save</Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}

function InfoCard({
  title,
  children,
  onEdit,
}: {
  title: string
  children: React.ReactNode
  onEdit: () => void
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="mt-2 space-y-1">{children}</div>
      </div>
      <button
        onClick={onEdit}
        className="mt-4 self-end text-sm text-gray-400 hover:text-gray-600 flex items-center"
      >
        <PencilIcon className="h-4 w-4 mr-1" /> Edit
      </button>
    </div>
  )
}