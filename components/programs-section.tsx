'use client'

import React from 'react'
import SectionSeparator from '@/components/section-separator'

export default function ProgramsSection() {
  return (
    <>
      <SectionSeparator />

      <section
        id="programs"
        className="relative bg-white py-24 px-6 text-center"
        aria-label="Programs"
      >
        <h2 className="text-2xl font-semibold mb-4">
          Our Programs
        </h2>
        <p className="max-w-2xl mx-auto text-slate-700 leading-relaxed">
          Explore hands-on internships, corporate training, and leadership workshops designed
          to elevate your career. Each program is tailored for immediate impact and long-term growth.
        </p>
        {/* …your cards here… */}
      </section>
    </>
  )
}
