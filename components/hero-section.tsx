// components/HeroSection.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/life-11.jpg"
          alt="Training session outdoors"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 w-full px-6 sm:px-12 max-w-screen-xl mx-auto flex flex-col justify-between h-full py-24 space-y-12">
        {/* Welcome Text (left-aligned) */}
        <div className="text-white text-left">
          <p className="text-3xl sm:text-5xl font-medium text-emerald-300 tracking-wide mb-1">
            Welcome to
          </p>
          <h2 className="text-5xl sm:text-7xl font-bold text-white drop-shadow-md">
            Goodlife Consulting partners.
          </h2>
        </div>

        {/* Headline + CTA (right-aligned) */}
        <div className="text-white text-right">
          <h1 className="text-base sm:text-xl font-light italic text-white/90 leading-snug mb-4">
            Empowering young Rwanda’s Future Leaders
Building Tomorrow’s Change-makers
          </h1>
          <Link href="/signup/trainee">
            <Button
              size="lg"
              className="bg-black hover:bg-neutral-900 text-white text-sm sm:text-base focus-visible:ring-white"
            >
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-12 sm:mt-0">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start p-1 animate-bounce">
            <span className="block w-1 h-3 bg-white rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}