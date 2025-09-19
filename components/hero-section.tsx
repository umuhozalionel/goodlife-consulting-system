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
      className="relative flex items-start justify-center h-[85vh] pt-24 overflow-hidden"
    >
      {/* full-bleed background + dark overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/community/community-15.jpg"
          alt="Training session background"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 640px) 640px,
                 (max-width: 1024px) 1024px,
                 1920px"
          quality={70}
          placeholder="blur"
          blurDataURL="/community/community-15-blur.jpg"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* hero text + CTAs */}
      <div className="relative z-10 max-w-3xl px-6 text-center">
        <motion.h1
          initial={{ y: 50 }}
          animate={{
            y: 0,
            color: ['#ffffff', '#fbbf24', '#ffffff'],
          }}
          transition={{
            y: { duration: 1 },
            color: {
              duration: 3,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            },
          }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-normal mb-8"
        >
          Welcome to Goodlife Consulting Partners
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-lg sm:text-xl text-gray-200 italic max-w-lg mx-auto mb-12"
        >
          Empowering Rwanda’s future leaders to become tomorrow’s change-makers.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
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
            transition={{ delay: 1.1, duration: 0.6 }}
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

      {/* full-width flipped wave separator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none"
        style={{ height: '80px' }}
      >
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full fill-terracotta-50 transform rotate-180"
        >
          <path d="M0,0L1200,0L1200,120L0,16Z" opacity=".25" />
          <path d="M0,0L1200,0L1200,80L0,32Z" opacity=".5" />
          <path d="M0,0L1200,0L1200,40L0,48Z" />
        </svg>
      </motion.div>
    </section>
  )
}