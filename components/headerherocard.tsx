// components/headerherocard.tsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/header'
import HeroSection from '@/components/hero-section'

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export default function HeaderHeroCard() {
  return (
    <motion.div
      className="w-full h-[clamp(500px,80vh,1000px)] bg-transparent overflow-hidden shadow-none"
      style={{
        backgroundImage: "url('/images/hero-bg/yakin-19.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <div className="h-full flex flex-col max-w-screen-xl mx-auto px-6 sm:px-12">
        <div className="sticky top-0 z-20">
          <Header />
        </div>
        <div className="flex-1">
          <HeroSection />
        </div>
      </div>
    </motion.div>
  )
}