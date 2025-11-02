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
  { icon: Award, value: '300+', label: 'Career Placements', suffix: '' },
  { icon: Award, value: '90%', label: 'Employment Success Rate', suffix: '' },
  { icon: Award, value: '50', label: 'Corporate Alliances', suffix: '+' },
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
    <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
      <div className="relative h-80 md:h-96">
        <Image
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          fill
          className="object-cover transition-transform duration-700"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent" />
        
        {/* Slide Info */}
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <h3 className="text-xl font-bold mb-2">{slides[currentSlide].title}</h3>
          <p className="text-blue-100 text-sm md:text-base">{slides[currentSlide].description}</p>
        </div>

        {/* Navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={() => setShowVideo(false)}>
          <button 
            onClick={() => setShowVideo(false)} 
            className="absolute top-6 right-6 p-3 rounded-full bg-white/90 hover:bg-white transition z-50"
          >
            <X className="h-6 w-6 text-slate-900" />
          </button>
          <div className="max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
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

      <main>
        {/* Premium Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute top-0 right-0 w-72 h-72 bg-slate-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-slate-700">Rated 4.9/5 by 500+ Professionals</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  Launch Your 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-slate-800"> Career </span>
                  With Confidence
                </h1>
                
                <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                  Industry-integrated internships, expert mentorship, and global exposure that transform 
                  learning into meaningful career opportunities and professional growth.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/programs"
                      className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-slate-800 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      Start Your Journey
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <button
                      onClick={() => setShowVideo(true)}
                      className="inline-flex items-center justify-center bg-white text-slate-700 px-8 py-4 rounded-xl font-semibold border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group"
                    >
                      <Play className="mr-2 h-5 w-5" />
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
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-2xl font-bold text-slate-900">{stat.value}{stat.suffix}</div>
                      <div className="text-sm text-slate-600">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Hero Visual - Image Slider */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <ImageSlider />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Premium Features Section */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                Our Career Development 
                <span className="text-blue-600"> Methodology</span>
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-slate-800 rounded-full mx-auto mb-6"></div>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                We employ a holistic approach to professional development, combining theoretical knowledge 
                with practical application to ensure comprehensive career readiness and market relevance.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
            >
              {features.map((feat, i) => {
                const Icon = feat.icon
                return (
                  <motion.div key={i} variants={itemVariants} custom={i}>
                    <Card className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                      <CardContent className="p-0">
                        <div className="grid grid-cols-1 md:grid-cols-3">
                          {/* Image Section */}
                          <div className="md:col-span-1 relative h-48 md:h-full min-h-[200px]">
                            <Image
                              src={feat.imgSrc}
                              alt={feat.imgAlt ?? feat.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-slate-900/10 group-hover:from-blue-600/10 group-hover:to-slate-900/5 transition-colors" />
                            
                            {/* Stats Badge */}
                            {feat.stats && (
                              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                                <span className="text-sm font-bold text-slate-900">{feat.stats}</span>
                              </div>
                            )}
                          </div>

                          {/* Content Section */}
                          <div className="md:col-span-2 p-6 flex flex-col justify-center">
                            <div className="flex items-center gap-4 mb-4">
                              <div className="bg-gradient-to-br from-blue-600 to-slate-800 p-3 rounded-xl shadow-lg">
                                <Icon className="h-6 w-6 text-white" />
                              </div>
                              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                {feat.title}
                              </h3>
                            </div>
                            <p className="text-slate-600 mb-6 leading-relaxed">{feat.description}</p>
                            <Link
                              href="/programs"
                              className="inline-flex items-center text-blue-600 font-semibold hover:text-slate-800 transition-colors group/link self-start"
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
        </section>

        {/* Community Showcase Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                Life in Our 
                <span className="text-blue-600"> Community</span>
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-slate-800 rounded-full mx-auto mb-6"></div>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Experience the vibrant GoodLife community through collaborative learning, networking events, 
                and professional development activities that create lasting connections.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { src: '/community/community-11.jpg', title: 'Collaborative Workspaces', desc: 'Modern environments for team projects' },
                { src: '/community/community-12.jpg', title: 'Networking Events', desc: 'Building professional relationships' },
                { src: '/community/community-13.jpg', title: 'Learning Sessions', desc: 'Interactive knowledge sharing' },
                { src: '/community/community-14.jpg', title: 'Career Workshops', desc: 'Practical skill development' },
                { src: '/community/community-15.jpg', title: 'Community Gatherings', desc: 'Building strong connections' },
                { src: '/community/community-16.jpg', title: 'Professional Development', desc: 'Continuous growth opportunities' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                    <CardContent className="p-0">
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={item.src}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                          <p className="text-sm opacity-90">{item.desc}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Link
                href="/gallery"
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-slate-800 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Explore Our Community Gallery
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Premium Stats Section */}
        <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {stats.map((stat, idx) => {
                const StatIcon = stat.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                    className="text-center group"
                  >
                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl hover:bg-white/15 transition-all duration-500">
                      <div className="bg-gradient-to-br from-blue-400 to-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                        <StatIcon className="h-10 w-10 text-slate-900" />
                      </div>
                      <div className="text-5xl md:text-6xl font-bold text-white mb-3 group-hover:scale-105 transition-transform duration-300">
                        {stat.value}{stat.suffix}
                      </div>
                      <div className="text-xl text-blue-200 font-semibold">{stat.label}</div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Premium CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
              <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob" />
              <div className="absolute top-0 right-0 w-72 h-72 bg-slate-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000" />
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000" />
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                  Ready to Join Our Community?
                </h2>
                <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
                  Join thousands of professionals who have transformed their careers through our industry-integrated 
                  development programs and vibrant community.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      href="/programs" 
                      className="inline-flex items-center bg-white text-slate-900 px-8 py-4 rounded-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 group"
                    >
                      Start Your Application
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <button 
                      onClick={() => setShowVideo(true)}
                      className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-slate-900 transition-all duration-300 group backdrop-blur-sm"
                    >
                      <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                      Watch Virtual Tour
                    </button>
                  </motion.div>
                </div>

                <div className="mt-8 text-blue-200 text-sm">
                  ⚡ Next cohort starts: March 15, 2024 • Limited enrollment available
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}