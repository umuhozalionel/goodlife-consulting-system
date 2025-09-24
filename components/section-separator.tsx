'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

type Variant = 'wave' | 'curve' | 'diagonal' | 'zigzag'

interface SectionSeparatorProps {
  variant?: Variant
  className?: string
}

export default function SectionSeparator({
  variant = 'wave',
  className = '',
}: SectionSeparatorProps) {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, 80])

  const shapePaths: Record<Variant, string> = {
    wave:     'M0,0 C300,100 900,0 1200,100 L1200,120 L0,120 Z',
    curve:    'M0,0 C400,120 800,0 1200,120 L1200,120 L0,120 Z',
    diagonal: 'M0,0 L1200,120 L1200,120 L0,120 Z',
    zigzag:   'M0,0 L200,120 L400,0 L600,120 L800,0 L1000,120 L1200,0 L1200,120 L0,120 Z',
  }

  const fills: Record<Variant, string> = {
    wave:     'rgba(255,243,205,0.8)',
    curve:    'rgba(224,242,254,0.8)',
    diagonal: 'rgba(237,247,237,0.8)',
    zigzag:   'rgba(254,243,224,0.8)',
  }

  return (
    <motion.svg
      className={`w-full h-32 ${className}`}
      style={{ y }}
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path d={shapePaths[variant]} fill={fills[variant]} />
    </motion.svg>
  )
}