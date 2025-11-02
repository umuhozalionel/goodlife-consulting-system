// components/TrainingProgram.tsx
'use client'

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ArrowRight, Users, Target, TrendingUp, QrCode, X } from 'lucide-react'
import { useState } from 'react'

const programs = [
  {
    slug: 'leadership',
    category: 'Leadership & Management',
    image: '/images/cheerful-mood-group-people-business-conference-modern-classroom-daytime.jpg',
    description: 'Master leadership strategies and effective team management.',
  },
  {
    slug: 'corporate',
    category: 'Corporate Trainings',
    image: '/images/entrepreneur-videocall-with-clients.jpg',
    description: 'Tailored corporate skill-building for organizational growth.',
  },
  {
    slug: 'digital',
    category: 'Digital & Innovation',
    image: '/images/team-businessmen-listening-business-lecture-briefing.jpg',
    description: 'Harness the latest digital tools and innovation practices.',
  },
  {
    slug: 'communication',
    category: 'Communication & Personal Growth',
    image: '/images/corporate-business-people-meeting-boardroom-african-manager-brainstorming-with-colleagues-discussing-strategy-sharing-problem-solving-ideas-collaborating-conference-room-company.jpg',
    description: 'Enhance communication skills and personal development.',
  },
  {
    slug: 'languages',
    category: 'Languages & Social Impact',
    image: '/images/full-shot-woman-working-out-with-trainer.jpg',
    description: 'Learn new languages and drive social impact initiatives.',
  },
  {
    slug: 'team-building',
    category: 'Team Building',
    image: '/images/man-participation-training-after-being-hired-his-new-office-job.jpg',
    description: 'Engage in dynamic exercises to strengthen team cohesion.',
  },
  {
    slug: 'industrial-attachment',
    category: 'Industrial Attachment',
    image: '/images/african-american-businessman-giving-presentation-explaining-new-marketing-plan-meeting.jpg',
    description: 'Hands-on industry exposure with mentorship & career planning.',
  },
  {
    slug: 'counselling',
    category: 'Counselling',
    image: '/images/beginner-average-skilled-expert-productivity.jpg',
    description: 'Professional support for trauma, mental health & GBV recovery.',
  },
  {
    slug: 'career-guidance',
    category: 'Career Guidance',
    image: '/images/male-employee-participating-training-session-his-new-office-job.jpg',
    description: 'Navigate career paths, employability gaps & work-life balance.',
  },
  {
    slug: 'field-trips',
    category: 'Field Trips & Site Visits',
    image: '/images/confident-african-speaker-business-coach-giving-presentation-team.jpg',
    description: 'Explore real-world industries and innovation hubs on site visits.',
  },
]

export default function TrainingProgram() {
  const spotlight = programs.slice(0, 3)
  const duration = '3 months'
  const [isQrPopupOpen, setIsQrPopupOpen] = useState(false)

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Inter-VariableFont_slnt,wght.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </Head>

      <section
        id="programs"
        role="region"
        aria-labelledby="programs-heading"
        className="bg-white py-16"
      >
        <div className="max-w-full mx-auto px-6 md:px-8 lg:px-12">
          {/* Header Section with Welcome Message */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            {/* Left: Welcome Message */}
            <div className="lg:col-span-4">
              <div className="bg-[#0c4a6e] text-white p-8 rounded-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="h-6 w-6" />
                  <h3 className="text-xl font-bold">Transform Your Career</h3>
                </div>
                <p className="text-sm leading-relaxed mb-6">
                  Discover comprehensive training programs designed to elevate your skills and unlock your professional potential. 
                  Our expert-led courses bridge theory with real-world application.
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>1000+ Graduates</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>95% Success Rate</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Title and Description */}
            <div className="lg:col-span-8">
              <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-sm">
                <h2
                  id="programs-heading"
                  className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4"
                >
                  Our Training Programs
                </h2>
                <div className="w-24 h-1 bg-[#0c4a6e] rounded-full mb-6" />
                <p className="text-lg text-[#0f172a] leading-relaxed max-w-2xl">
                  Comprehensive solutions to elevate your skills and unlock your potential through 
                  industry-relevant training and hands-on experience.
                </p>
              </div>
            </div>
          </div>

          {/* Spotlight Programs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {spotlight.map((prog, index) => (
              <motion.article 
                key={prog.slug} 
                aria-labelledby={`${prog.slug}-title`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-[#0c4a6e] group">
                  <CardHeader className="p-0">
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={prog.image}
                        alt={prog.category}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <h3
                      id={`${prog.slug}-title`}
                      className="text-xl font-semibold text-[#0f172a] mb-3"
                    >
                      {prog.category}
                    </h3>
                    <p className="text-[#0f172a] mb-4 leading-relaxed">
                      {prog.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-[#0c4a6e]">
                        Duration: {duration}
                      </span>
                      <span className="text-sm text-[#0f172a] bg-gray-100 px-2 py-1 rounded">
                        Featured
                      </span>
                    </div>
                    <div className="flex space-x-3">
                      <Link href={`/programs/${prog.slug}`} prefetch={false}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button 
                            variant="outline" 
                            className="border-[#0f172a] text-[#0f172a] hover:bg-[#0f172a] hover:text-white transition-colors"
                          >
                            View Details
                          </Button>
                        </motion.div>
                      </Link>
                      <Link href={`/signup/trainee?program=${prog.slug}`} prefetch={false}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button className="bg-[#0f172a] text-white hover:bg-[#0c4a6e] transition-colors">
                            Enroll Now
                          </Button>
                        </motion.div>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.article>
            ))}
          </div>

          {/* View More Programs */}
          <div className="text-center">
            <Link href="/programs" prefetch>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-[#0f172a] text-white px-8 py-3 hover:bg-[#0c4a6e] transition-colors group">
                  <span>View All Programs</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </Link>
            
            {/* Additional Info with QR Code */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="text-center p-4">
                <div className="bg-[#0c4a6e] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6" />
                </div>
                <h4 className="font-semibold text-[#0f172a]">Expert Instructors</h4>
                <p className="text-sm text-[#0f172a] mt-1">Industry professionals with real-world experience</p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-[#0f172a] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="h-6 w-6" />
                </div>
                <h4 className="font-semibold text-[#0f172a]">Practical Focus</h4>
                <p className="text-sm text-[#0f172a] mt-1">Hands-on learning with immediate application</p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-[#0c4a6e] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h4 className="font-semibold text-[#0f172a]">Proven Results</h4>
                <p className="text-sm text-[#0f172a] mt-1">95% of graduates report career advancement</p>
              </div>

              {/* QR Code Section */}
              <div className="text-center p-4">
                <div className="bg-white border border-gray-200 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <QrCode className="h-6 w-6 text-[#0f172a]" />
                </div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-[#0f172a]">Quick Register</h4>
                  <motion.button
                    onClick={() => setIsQrPopupOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#0f172a] text-white px-3 py-1 rounded text-sm font-medium hover:bg-[#0c4a6e] transition-colors"
                  >
                    Show QR
                  </motion.button>
                </div>
                <p className="text-sm text-[#0f172a]">Click to scan and register instantly</p>
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Popup */}
        <AnimatePresence>
          {isQrPopupOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setIsQrPopupOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-8 max-w-sm w-full relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsQrPopupOpen(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-[#0f172a] transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>

                {/* QR Code Content */}
                <div className="text-center">
                  <div className="bg-[#0c4a6e] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <QrCode className="h-8 w-8" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#0f172a] mb-2">
                    Quick Registration
                  </h3>
                  
                  <p className="text-[#0f172a] mb-6">
                    Scan this QR code to register instantly
                  </p>

                  {/* QR Code Image */}
                  <div className="bg-white p-4 rounded-xl border-2 border-[#0c4a6e] mb-4 mx-auto max-w-xs">
                    <Image 
                      src="/qr/trainee-registration.png" 
                      alt="Trainee Registration QR Code" 
                      width={300}
                      height={300}
                      className="w-full h-auto"
                    />
                  </div>

                  <p className="text-sm text-[#0f172a] font-medium">
                    Use your camera to scan this QR code
                  </p>
                  
                  <p className="text-xs text-gray-600 mt-2">
                    Point your phone's camera at the code to open registration
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  )
}