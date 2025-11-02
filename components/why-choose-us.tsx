// File: pages/why-choose-us.tsx
'use client'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Award, Briefcase, BookOpen, Users, Globe, ArrowRight, Play, Star, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { motion, Variants } from 'framer-motion'

type Feature = {
  icon: React.ComponentType<any>
  title: string
  description: string
  imgSrc: string
  imgAlt?: string
  stats?: string
}

const features: Feature[] = [
  {
    icon: Briefcase,
    title: 'Industry-Integrated Internships',
    description: 'Gain hands-on professional experience through our corporate partnerships, accelerating your career trajectory and employability quotient.',
    imgSrc: '/community/community-1.jpg',
    imgAlt: 'Professional workplace environment at GoodLife',
    stats: '95% Placement Success'
  },
  {
    icon: BookOpen,
    title: 'Comprehensive Skill Development',
    description: 'Master cutting-edge competencies through our curated curriculum, delivered by industry practitioners and subject matter experts.',
    imgSrc: '/community/community-2.jpg',
    imgAlt: 'Interactive training session at GoodLife',
    stats: '1,200+ Learning Modules'
  },
  {
    icon: Users,
    title: 'Personalized Mentorship',
    description: 'Receive tailored career guidance from seasoned professionals to navigate your professional development journey successfully.',
    imgSrc: '/community/community-3.jpg',
    imgAlt: 'Mentorship sessions at GoodLife',
    stats: '50+ Industry Mentors'
  },
  {
    icon: Globe,
    title: 'Global Competency Building',
    description: 'Develop cross-cultural business acumen through international projects and global partnership initiatives.',
    imgSrc: '/community/community-4.jpg',
    imgAlt: 'Global learning environment at GoodLife',
    stats: '15+ Countries Network'
  },
]

const stats = [
  { icon: Award, value: '300+', label: 'Career Placements', suffix: '', color: '#1b6981' },
  { icon: Award, value: '90%', label: 'Employment Success Rate', suffix: '', color: '#769f3f' },
  { icon: Award, value: '50', label: 'Corporate Alliances', suffix: '+', color: '#d25c27' },
]

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}

// Image Slider Component
const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const slides = [
    {
      image: '/community/community-5.jpg',
      title: 'Collaborative Learning Environment',
      description: 'State-of-the-art facilities designed for professional development'
    },
    {
      image: '/community/community-6.jpg',
      title: 'Interactive Workshop Sessions',
      description: 'Practical skill-building in collaborative settings'
    },
    {
      image: '/community/community-7.jpg',
      title: 'Professional Networking Events',
      description: 'Connecting talent with industry opportunities'
    },
    {
      image: '/community/community-8.jpg',
      title: 'Team Building Activities',
      description: 'Building strong professional relationships'
    },
    {
      image: '/community/community-9.jpg',
      title: 'Modern Learning Spaces',
      description: 'Innovative environments for growth'
    },
    {
      image: '/community/community-10.jpg',
      title: 'Career Development Workshops',
      description: 'Hands-on career preparation sessions'
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  // Auto-advance slides
  React.useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
      <div className="relative h-80 md:h-[500px]">
        <Image
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          fill
          className="object-cover transition-transform duration-700"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Slide Info */}
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <h3 className="text-xl font-bold mb-2">{slides[currentSlide].title}</h3>
          <p className="text-white/90 text-base">{slides[currentSlide].description}</p>
        </div>

        {/* Navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-3 text-white hover:bg-[#1b6981] transition-all duration-300"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-3 text-white hover:bg-[#1b6981] transition-all duration-300"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function WhyChooseUsPage(): JSX.Element {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <>
      <Head>
        <title>Why Choose GoodLife Consulting Partners | Career Excellence</title>
        <meta
          name="description"
          content="Industry-integrated internships, comprehensive skill development, personalized mentorship and global competency building — GoodLife prepares professionals for real-world career success."
        />
        <meta property="og:title" content="Why Choose GoodLife Consulting Partners" />
        <meta
          property="og:description"
          content="Hands-on internships, expert trainings, and personalized mentorship—see why organizations trust GoodLife."
        />
        <meta property="og:image" content="/community/community-1.jpg" />
      </Head>

      {/* Video Popup Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" onClick={() => setShowVideo(false)}>
          <button 
            onClick={() => setShowVideo(false)} 
            className="absolute top-6 right-6 p-3 rounded-full bg-white hover:bg-[#769f3f] transition-all duration-300 z-50"
          >
            <X className="h-6 w-6 text-[#383f41]" />
          </button>
          <div className="max-w-5xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <video
              controls
              autoPlay
              className="w-full rounded-2xl shadow-2xl"
              poster="/community/community-1.jpg"
            >
              <source src="/videos/36c6-5860-4eab-9378-01f509998ae2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      <main className="w-full">
        {/* Hero Section */}
        <section className="w-full py-20 bg-gradient-to-br from-white to-gray-50">
          <div className="w-full">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Hero Content */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  <div className="inline-flex items-center gap-3 bg-white rounded-full px-4 py-2 border border-[#769f3f]/20 shadow-sm">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#dd8426] text-[#dd8426]" />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-[#383f41]">Rated 4.9/5 by 500+ Professionals</span>
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#383f41] leading-tight">
                    Launch Your{' '}
                    <span className="text-[#1b6981]">Career</span>{' '}
                    With Confidence
                  </h1>
                  
                  <p className="text-xl text-[#383f41] leading-relaxed">
                    Industry-integrated internships, expert mentorship, and global exposure that transform 
                    learning into meaningful career opportunities and professional growth.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href="/programs"
                        className="inline-flex items-center justify-center bg-[#1b6981] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:bg-[#15536b] transition-all duration-300 group"
                      >
                        Start Your Journey
                        <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                    
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <button
                        onClick={() => setShowVideo(true)}
                        className="inline-flex items-center justify-center bg-white text-[#383f41] px-8 py-4 rounded-xl font-semibold text-lg border-2 border-[#d25c27] shadow-lg hover:shadow-xl hover:bg-[#d25c27] hover:text-white transition-all duration-300 group"
                      >
                        <Play className="mr-3 h-5 w-5" />
                        Virtual Tour
                      </button>
                    </motion.div>
                  </div>

                  {/* Stats Preview */}
                  <div className="grid grid-cols-3 gap-6 pt-8">
                    {stats.map((stat, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        className="text-center"
                      >
                        <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}{stat.suffix}</div>
                        <div className="text-sm font-medium text-[#383f41]">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Hero Visual - Image Slider */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="relative"
                >
                  <ImageSlider />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="w-full">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#383f41] mb-6">
                  Our Career Development Methodology
                </h2>
                <div className="w-20 h-1.5 bg-gradient-to-r from-[#1b6981] to-[#769f3f] rounded-full mx-auto mb-6"></div>
                <p className="text-xl text-[#383f41] max-w-4xl mx-auto leading-relaxed">
                  We employ a holistic approach to professional development, combining theoretical knowledge 
                  with practical application to ensure comprehensive career readiness.
                </p>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={containerVariants}
              >
                {features.map((feat, i) => {
                  const Icon = feat.icon
                  const colorVariants = [
                    'bg-[#1b6981]',
                    'bg-[#769f3f]',
                    'bg-[#d25c27]',
                    'bg-[#dd8426]'
                  ]
                  return (
                    <motion.div key={i} variants={itemVariants} custom={i}>
                      <Card className="group relative bg-white border-2 border-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                        <CardContent className="p-0">
                          <div className="grid grid-cols-1 md:grid-cols-3">
                            {/* Image Section */}
                            <div className="md:col-span-1 relative h-48 md:h-full">
                              <Image
                                src={feat.imgSrc}
                                alt={feat.imgAlt ?? feat.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, 33vw"
                              />
                              
                              {/* Stats Badge */}
                              {feat.stats && (
                                <div className="absolute top-4 right-4 bg-white/95 rounded-full px-3 py-2 shadow-lg">
                                  <span className="text-sm font-bold text-[#383f41]">{feat.stats}</span>
                                </div>
                              )}
                            </div>

                            {/* Content Section */}
                            <div className="md:col-span-2 p-6 flex flex-col justify-center">
                              <div className="flex items-center gap-4 mb-4">
                                <div className={`${colorVariants[i]} p-3 rounded-xl shadow-lg`}>
                                  <Icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-[#383f41]">
                                  {feat.title}
                                </h3>
                              </div>
                              <p className="text-[#383f41] mb-6 text-base leading-relaxed">{feat.description}</p>
                              <Link
                                href="/programs"
                                className="inline-flex items-center text-[#1b6981] font-semibold hover:text-[#769f3f] transition-colors group/link self-start text-base"
                              >
                                Explore Program
                                <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Community Showcase Section */}
        <section className="w-full py-20 bg-gradient-to-br from-white to-gray-50">
          <div className="w-full">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#383f41] mb-6">
                  Life in Our Community
                </h2>
                <div className="w-20 h-1.5 bg-gradient-to-r from-[#1b6981] to-[#769f3f] rounded-full mx-auto mb-6"></div>
                <p className="text-xl text-[#383f41] max-w-4xl mx-auto leading-relaxed">
                  Experience the vibrant GoodLife community through collaborative learning, networking events, 
                  and professional development activities.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                  { src: '/community/community-11.jpg', title: 'Collaborative Workspaces', desc: 'Modern environments for team projects', color: '#1b6981' },
                  { src: '/community/community-12.jpg', title: 'Networking Events', desc: 'Building professional relationships', color: '#769f3f' },
                  { src: '/community/community-13.jpg', title: 'Learning Sessions', desc: 'Interactive knowledge sharing', color: '#d25c27' },
                  { src: '/community/community-14.jpg', title: 'Career Workshops', desc: 'Practical skill development', color: '#dd8426' },
                  { src: '/community/community-15.jpg', title: 'Community Gatherings', desc: 'Building strong connections', color: '#1b6981' },
                  { src: '/community/community-16.jpg', title: 'Professional Development', desc: 'Continuous growth opportunities', color: '#769f3f' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <Card className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                      <CardContent className="p-0">
                        <div className="relative h-56 overflow-hidden">
                          <Image
                            src={item.src}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                            <p className="text-white/90 text-sm">{item.desc}</p>
                          </div>
                          <div className="absolute top-4 left-4 w-12 h-1 rounded-full" style={{ backgroundColor: item.color }} />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Link
                  href="/gallery"
                  className="inline-flex items-center bg-gradient-to-r from-[#1b6981] to-[#769f3f] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
                >
                  Explore Our Community Gallery
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
            >
              {stats.map((stat, idx) => {
                const StatIcon = stat.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                    className="text-center group"
                  >
                    <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105">
                      <div 
                        className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                        style={{ backgroundColor: stat.color }}
                      >
                        <StatIcon className="h-10 w-10 text-white" />
                      </div>
                      <div className="text-4xl md:text-5xl font-bold text-[#383f41] mb-4">
                        {stat.value}{stat.suffix}
                      </div>
                      <div className="text-lg font-semibold" style={{ color: stat.color }}>{stat.label}</div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 bg-gradient-to-br from-white to-gray-50">
          <div className="w-full">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-[#1b6981] to-[#769f3f] rounded-3xl p-12 text-center shadow-2xl"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to Join Our Community?
                </h2>
                <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of professionals who have transformed their careers through our industry-integrated 
                  development programs and vibrant community.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      href="/programs" 
                      className="inline-flex items-center bg-white text-[#1b6981] px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 group"
                    >
                      Start Your Application
                      <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <button 
                      onClick={() => setShowVideo(true)}
                      className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-[#1b6981] transition-all duration-300 group"
                    >
                      <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                      Watch Virtual Tour
                    </button>
                  </motion.div>
                </div>

                <div className="mt-8 text-white/80 text-base font-medium">
                  ⚡ Next cohort starts: March 15, 2024 • Limited enrollment available
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}