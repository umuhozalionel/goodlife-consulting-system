// File: pages/why-choose-us.tsx
'use client'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Award, Briefcase, BookOpen, Users, Globe } from 'lucide-react'
import { motion, Variants } from 'framer-motion'

type Feature = {
  icon: React.ComponentType<any>
  title: string
  description: string
  // image path under public/images
  imgSrc: string
  imgAlt?: string
}

const features: Feature[] = [
  {
    icon: Briefcase,
    title: 'Industry-Led Internships',
    description:
      'Partner with top employers for hands-on internship experiences that accelerate career readiness.',
    imgSrc: '/images/illus-internship.jpg',
    imgAlt: 'Students in workplace illustration',
  },
  {
    icon: BookOpen,
    title: 'Comprehensive Trainings',
    description:
      'Deep-dive modules covering technical skills and soft skills delivered by seasoned practitioners.',
    imgSrc: '/images/illus-training.jpg',
    imgAlt: 'Training illustration',
  },
  {
    icon: Users,
    title: 'One-on-One Mentorship',
    description:
      'Personal guidance from expert mentors to help you navigate challenges and chart your professional path.',
    imgSrc: '/images/illus-mentorship.jpg',
    imgAlt: 'Mentorship illustration',
  },
  {
    icon: Globe,
    title: 'Global Exposure',
    description:
      'Work on real-world projects with international partners to gain cross-cultural business insight.',
    imgSrc: '/images/illus-global.jpg',
    imgAlt: 'Global projects illustration',
  },
]

const stats = [
  { icon: Award, value: '300+', label: 'Interns Placed' },
  { icon: Award, value: '90%', label: 'Job Offer Rate' },
  { icon: Award, value: '1,200+', label: 'Training Sessions' },
]

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease: 'easeOut' } },
}

export default function WhyChooseUsPage(): JSX.Element {
  return (
    <>
      <Head>
        <title>Why Choose GoodLife Consulting Partners</title>
        <meta
          name="description"
          content="Industry-led internships, hands-on trainings, one-on-one mentorship and global exposure — GoodLife prepares professionals for real-world careers."
        />
        <meta property="og:title" content="Why Choose GoodLife Consulting Partners" />
        <meta
          property="og:description"
          content="Hands-on internships, expert trainings, and personalized mentorship—see why organizations trust GoodLife."
        />
        <meta property="og:image" content="/images/internships-og.jpg" />
      </Head>

      <main>
        {/* Hero */}
        <section
          className="relative flex items-center justify-center h-[420px] bg-cover bg-center"
          style={{ backgroundImage: "url('/images/internships-hero.jpg')" }}
          aria-label="Why Choose GoodLife hero"
        >
          <div className="absolute inset-0 bg-black/45 dark:bg-black/55" />
          <div className="relative z-10 text-center px-6">
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
              Launch Your Career with GoodLife
            </h1>
            <p className="max-w-2xl mx-auto text-base md:text-lg text-white/90 mb-6">
              Industry-led internships and focused trainings that bridge the gap between learning and meaningful employment.
            </p>
            <Link
              href="#features"
              className="inline-block bg-primary text-primary-foreground px-6 md:px-8 py-2.5 rounded-lg font-medium hover:bg-primary-dark transition"
            >
              Discover Programs
            </Link>
          </div>
        </section>

        {/* Features with image backgrounds */}
        <section id="features" className="py-16 md:py-20 bg-background dark:bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Why organizations partner with GoodLife</h2>
              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                Practical learning, measurable outcomes, and partnerships with employers to place talent where it matters.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={containerVariants}
            >
              {features.map((feat, i) => {
                const Icon = feat.icon
                return (
                  <motion.div key={i} variants={itemVariants}>
                    <Card
                      className="group relative overflow-visible text-left border-0 shadow-lg transition-transform duration-350 hover:shadow-2xl"
                      aria-labelledby={`feature-title-${i}`}
                      role="article"
                    >
                      {/* Motion wrapper for hover / tilt effect */}
                      <motion.div
                        className="relative rounded-xl overflow-hidden min-h-[220px] md:min-h-[260px] flex flex-col justify-end"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                      >
                        {/* Background image filling card */}
                        <div className="absolute inset-0 z-0">
                          <Image
                            src={feat.imgSrc}
                            alt={feat.imgAlt ?? feat.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            style={{ objectFit: 'cover' }}
                            priority={false}
                          />
                          {/* soft dark overlay to increase text contrast */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
                        </div>

                        {/* Content over image */}
                        <CardContent className="relative z-10 p-6 md:p-8 bg-transparent text-white">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                            <h3 id={`feature-title-${i}`} className="text-lg md:text-xl font-semibold">
                              {feat.title}
                            </h3>
                          </div>

                          <p className="text-sm md:text-base opacity-95 max-w-prose">{feat.description}</p>

                          <div className="mt-4">
                            <Link
                              href="/programs"
                              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md text-sm transition"
                              aria-label={`Learn more about ${feat.title}`}
                            >
                              Learn more
                            </Link>
                          </div>
                        </CardContent>
                      </motion.div>

                      {/* bottom decorative band (matches page lower bg) */}
                      <div className="absolute left-0 right-0 bottom-0 h-6 bg-gradient-to-t from-terracotta-50 to-transparent dark:from-forest-900/20" />
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Metrics */}
        <section className="py-12 md:py-16 bg-muted dark:bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
              {stats.map((s, idx) => {
                const StatIcon = s.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                  >
                    <Card className="bg-white dark:bg-card rounded-2xl p-6 md:p-8 shadow-md flex flex-col items-center justify-center text-center">
                      <StatIcon className="h-7 w-7 text-primary mb-3" />
                      <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">{s.value}</div>
                      <div className="text-sm text-muted-foreground">{s.label}</div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-forest-50 to-terracotta-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">Ready to apply or host interns?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Submit an application to join our next intake or partner with GoodLife to host interns and shape future talent.
            </p>
            <div className="flex flex-col sm:flex-row sm:justify-center gap-3">
              <Link href="/signup" className="inline-block bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium hover:bg-primary-dark transition">
                Apply Now
              </Link>
              <Link href="/partners" className="inline-block border border-border text-foreground px-6 py-2.5 rounded-lg font-medium hover:bg-muted transition">
                Partner With Us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}