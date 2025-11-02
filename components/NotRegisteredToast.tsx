'use client'

import React, { useEffect, useRef, useState } from 'react'

export default function NotRegisteredToast({
  email,
  open,
  onClose,
}: {
  email?: string | null
  open: boolean
  onClose: () => void
}) {
  const timerRef = useRef<number | null>(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (!open) return
    const start = () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(onClose, 6000)
    }
    if (!paused) start()
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [open, onClose, paused])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      role="status"
      aria-live="assertive"
      className={`fixed inset-x-4 top-6 z-50 pointer-events-none flex justify-center transition-all duration-300 opacity-100 translate-y-0`}
    >
      <div
        className="pointer-events-auto w-full max-w-md"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="rounded-lg bg-white shadow-lg ring-1 ring-black/5 overflow-hidden">
          <div className="flex">
            <div className="flex-shrink-0 p-4 bg-yellow-50 flex items-center">
              <svg className="w-6 h-6 text-yellow-600 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <path d="M12 9v4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 17h.01" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </div>

            <div className="flex-1 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-yellow-800">Account not registered</p>
                  <p className="mt-1 text-sm text-gray-600">
                    No user record found for{' '}
                    <span className="font-medium text-gray-800">{email ?? 'this email'}</span>.
                  </p>
                </div>

                <div className="flex items-start">
                  <button
                    onClick={onClose}
                    className="ml-3 inline-flex rounded-md bg-transparent p-1 text-yellow-700 hover:text-yellow-900 focus:outline-none"
                    aria-label="Dismiss"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                      <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <a
                  href={`/auth/register?email=${encodeURIComponent(email ?? '')}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 transition"
                >
                  Complete registration
                </a>

                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-md border border-transparent px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>

          <div className="h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 animate-[pulse_2s_infinite]" />
        </div>
      </div>
    </div>
  )
}