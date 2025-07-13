"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 text-center py-6 text-sm text-gray-500">
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-2">
        <Link href="/" className="hover:text-green-600">Home</Link>
        <Link href="/training" className="hover:text-green-600">Trainings</Link>
        <Link href="/calendar" className="hover:text-green-600">Calendar</Link>
        <Link href="/auth" className="hover:text-green-600">Sign In</Link>
      </div>
      <p>&copy; {new Date().getFullYear()} Goodlife Consulting Partners. All rights reserved.</p>
    </footer>
  )
}