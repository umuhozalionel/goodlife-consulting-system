// components/HeroSection.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex items-center justify-center h-screen overflow-hidden"
    >
      {/* Background image with responsive sizes, blur placeholder */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-background.jpg"
          alt="Hero background"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 768px) 800px,
                 (max-width: 1200px) 1280px,
                 1920px"
          quality={70}
          placeholder="blur"
          blurDataURL="/images/hero-background-blur.jpg"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Floating gradient blobs */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0.6 }}
        animate={{ scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-10 left-10 w-56 h-56 bg-gradient-to-tr from-purple-500 to-pink-400 rounded-full mix-blend-screen filter blur-md"
      />
      <motion.div
        initial={{ scale: 1, opacity: 0.5 }}
        animate={{ x: [-50, 50, -50], y: [20, -20, 20] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-16 right-20 w-64 h-64 bg-gradient-to-bl from-blue-400 to-green-300 rounded-full mix-blend-screen filter blur-md"
      />

      {/* Main content */}
      <div className="relative z-10 max-w-3xl px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="
            text-4xl sm:text-6xl md:text-7xl 
            font-extrabold 
            bg-clip-text text-transparent
            bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500
            leading-snug
          "
        >
          Welcome to Goodlife Consulting Partners
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-lg sm:text-xl text-gray-200 italic max-w-xl mx-auto"
        >
          Empowering Rwanda’s future leaders to become tomorrow’s change-makers.
        </motion.p>

        {/* CTA buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Link href="/programs" className="group">
              <Button
                size="lg"
                className="
                  border-2 border-white text-white
                  px-8 py-3 rounded-none
                  hover:bg-white hover:text-black
                  hover:shadow-xl hover:-translate-y-1
                  transition ease-out duration-200
                "
              >
                Learn More
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Link href="/signup/trainee" className="group">
              <Button
                size="lg"
                className="
                  bg-orange-500 text-white
                  px-8 py-3 rounded-none
                  hover:bg-orange-600
                  hover:shadow-xl hover:-translate-y-1
                  transition ease-out duration-200
                  flex items-center justify-center
                "
              >
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* SVG wave at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-0 w-full overflow-hidden leading-none"
        style={{ lineHeight: 0 }}
      >
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-24 fill-white"
        >
          <path d="M0,0L1200,0L1200,120L0,16Z" opacity=".25" />
          <path d="M0,0L1200,0L1200,80L0,32Z" opacity=".5" />
          <path d="M0,0L1200,0L1200,40L0,48Z" />
        </svg>
      </motion.div>
    </section>
  )
}