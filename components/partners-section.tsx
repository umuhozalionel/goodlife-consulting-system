'use client'

import React from 'react'
import { motion } from 'framer-motion'

const partners = [
  '/logos/gov1.png',
  '/logos/ngo1.png',
  '/logos/partner5.png',
  '/logos/partner6.png',
  '/logos/partner7.png',
  '/logos/partner8.png',
]
const loop = [...partners, ...partners]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, when: 'beforeChildren' } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function PartnersSection() {
  return (
    <section id="partners" className="relative bg-white overflow-hidden">
      {/* top wave separator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-full overflow-visible pointer-events-none"
      >
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-16 sm:h-20 md:h-24 lg:h-28 fill-white"
        >
          <path d="M0,0L1200,0L1200,120L0,16Z" opacity=".25" />
          <path d="M0,0L1200,0L1200,80L0,32Z" opacity=".5" />
          <path d="M0,0L1200,0L1200,40L0,48Z" />
        </svg>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-screen-xl mx-auto px-4 sm:px-6 pt-20 pb-12"
      >
        <h2 className="text-3xl font-bold text-center mb-4 underline underline-offset-4 decoration-indigo-500">
          Our Partners
        </h2>
        <p className="max-w-2xl mx-auto text-center text-gray-600 mb-12">
          We proudly collaborate with government bodies, NGOs, and community organizations to empower Rwanda’s communities.
        </p>

        <div className="relative overflow-hidden">
          <div className="flex items-center space-x-8 animate-marquee py-4">
            {loop.map((src, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="
                  flex-shrink-0
                  p-4 bg-gray-50 rounded-xl
                  shadow-md transition-transform duration-300
                  hover:scale-105 hover:shadow-lg
                "
              >
                <motion.img
                  src={src}
                  alt={`Partner ${i + 1}`}
                  variants={itemVariants}
                  className="h-12 w-auto object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}