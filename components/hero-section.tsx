// components/HeroSection.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Load Inter font weights
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export default function HeroSection() {
  return (
    <section
      id="home"
      className="
        relative flex items-center justify-center
        h-[70vh] sm:h-[80vh]
        overflow-hidden
      "
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/community/community-6.jpg"
          alt="Training session outdoors"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-y-0 left-0 w-full sm:w-1/2 bg-gradient-to-r from-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div
        className={`
          relative z-20 w-full px-6 sm:px-12 max-w-screen-xl mx-auto
          flex flex-col justify-center h-full
        `}
      >
        <div className={inter.className}>
          <h1 className="filter brightness-110 text-4xl sm:text-6xl md:text-7xl font-bold text-[#E9F5FF] drop-shadow-md mb-4 leading-tight">
            Welcome to Goodlife Consulting Partners
          </h1>
          <p className="text-base sm:text-lg italic text-[#FFF1D4] leading-snug mb-8">
            Empowering young Rwanda’s future leaders to become tomorrow’s change-makers.
          </p>
        </div>

        {/* Two CTAs side by side */}
        <div className="flex space-x-4">
          {/* Learn More */}
          <Link href="/programs" className="inline-block">
            <Button
              size="lg"
              className="
                bg-black text-white
                rounded-none
                hover:bg-white hover:text-black
                focus-visible:ring-black
                transition-colors duration-200 ease-in-out
                text-sm sm:text-base
              "
            >
              Learn More
            </Button>
          </Link>

          {/* Apply Now */}
          <Link href="/signup/trainee" className="inline-block">
            <Button
              size="lg"
              className="
                bg-[#FFFBEB] text-black
                rounded-none
                hover:bg-[#0a1932] hover:text-white
                focus-visible:ring-[#0a1932]
                transition-colors duration-200 ease-in-out
                flex items-center justify-center
                text-sm sm:text-base
              "
            >
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Animated scroll arrow */}
        <div className="flex justify-center mt-16">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 animate-bounce text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}