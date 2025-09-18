// components/HeroSection.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

// Load Inter font weights
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export default function HeroSection() {
  return (
    <section
      id="home"
      className="
        relative flex items-center justify-center
        h-[75vh] sm:h-[85vh]
        overflow-hidden
      "
    >
      {/* Background image + dark overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-background.jpg"
          alt="Hero background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Main content */}
      <div
        className={`
          relative z-10 mx-auto max-w-3xl px-6 text-center
          flex flex-col items-center
          ${inter.className}
        `}
      >
        <h1
          className="
            text-4xl sm:text-6xl md:text-7xl
            font-bold text-white drop-shadow-lg
            leading-tight mb-4
          "
        >
          Welcome to Goodlife Consulting Partners
        </h1>
        <p className="text-lg sm:text-xl text-gray-200 italic mb-8 max-w-xl">
          Empowering Rwanda’s future leaders to become tomorrow’s change-makers.
        </p>

        {/* Call-to-action buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/programs" className="group">
            <Button
              size="lg"
              className="
                border-2 border-white text-white
                rounded-none px-8 py-3
                hover:bg-white hover:text-black
                hover:shadow-lg hover:-translate-y-1
                transition ease-out duration-200
              "
            >
              Learn More
            </Button>
          </Link>

          <Link href="/signup/trainee" className="group">
            <Button
              size="lg"
              className="
                bg-orange-500 text-white
                rounded-none px-8 py-3
                hover:bg-orange-600
                hover:shadow-lg hover:-translate-y-1
                transition ease-out duration-200
                flex items-center justify-center
              "
            >
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}