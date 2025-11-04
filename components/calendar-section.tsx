'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Filter, Calendar, Building, Clock, MapPin, UserCheck, Star, Target, Zap, ArrowRight, ChevronDown, Users, TrendingUp, BookOpen } from 'lucide-react'

const upcomingTrainings = [
  { 
    id: 1, 
    title: 'Leadership Excellence Workshop',     
    date: '2026-01-15', 
    time: '09:00 - 17:00', 
    location: 'Goodlife Training Center', 
    mode: 'Physical',  
    category: 'Leadership', 
    spots: 12,
    duration: 'Full Day',
    level: 'All Levels',
    language: 'English',
    intensity: 'Intensive'
  },
  { 
    id: 2, 
    title: 'Digital Marketing Fundamentals',      
    date: '2026-01-20', 
    time: '14:00 - 16:00', 
    location: 'Goodlife Training Center', 
    mode: 'Physical',  
    category: 'Digital',    
    spots: 25,
    duration: 'Half Day',
    level: 'Beginner',
    language: 'English',
    intensity: 'Standard'
  },
  { 
    id: 3, 
    title: 'Public Speaking Mastery',             
    date: '2026-01-25', 
    time: '10:00 - 15:00', 
    location: 'Goodlife Training Center', 
    mode: 'Physical',  
    category: 'Communication', 
    spots: 8,
    duration: 'Half Day',
    level: 'Intermediate',
    language: 'English',
    intensity: 'Workshop'
  },
]

const categories = ['All', 'Leadership', 'Digital', 'Communication', 'Finance'] as const
const durations = ['All', 'Full Day', 'Half Day'] as const
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'] as const

type Category = typeof categories[number]
type Duration = typeof durations[number]
type Level = typeof levels[number]

export default function CalendarSection() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All')
  const [selectedDuration, setSelectedDuration] = useState<Duration>('All')
  const [selectedLevel, setSelectedLevel] = useState<Level>('All')
  const [showAll, setShowAll] = useState(false)

  const filtered = upcomingTrainings.filter(t => {
    const categoryMatch = selectedCategory === 'All' || t.category === selectedCategory
    const durationMatch = selectedDuration === 'All' || t.duration === selectedDuration
    const levelMatch = selectedLevel === 'All' || t.level === selectedLevel
    return categoryMatch && durationMatch && levelMatch
  })

  const visible = showAll ? filtered : filtered.slice(0, 3)

  // Smooth scroll to about section
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <section className="bg-white py-20">
      <div className="max-w-full mx-auto px-6 md:px-8 lg:px-12">
        
        {/* Main Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-[#383f41] mb-6"
          >
            Upcoming Training Calendar
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2 }}
            className="w-32 h-1 bg-[#1b6981] rounded-full mx-auto mb-8"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-[#383f41] max-w-2xl mx-auto"
          >
            Browse and register for our upcoming professional development sessions
          </motion.p>
        </div>

        {/* Content Grid - Reorganized Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column - Welcome & Stats */}
          <div className="lg:col-span-4 space-y-8">
            {/* Welcome Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#1b6981] text-white rounded-xl p-8 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">Plan Your Growth Journey</h3>
              </div>
              
              <p className="text-white/90 mb-8 leading-relaxed">
                Reserve your spot in our upcoming sessions. Each training is designed to provide practical skills 
                that you can immediately apply in your professional life.
              </p>

              {/* Stats */}
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="text-white/80">Total Sessions</span>
                  <span className="text-white font-bold text-lg">24</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="text-white/80">Available Spots</span>
                  <span className="text-white font-bold text-lg">130+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Success Rate</span>
                  <span className="text-[#769f3f] font-bold text-lg">95%</span>
                </div>
              </div>
            </motion.div>

            {/* Additional Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-6"
            >
              {/* Quick Stats Card */}
              <Card className="border-0 bg-gradient-to-br from-[#1b6981] to-[#155870] text-white shadow-lg rounded-xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="h-6 w-6" />
                    <h4 className="text-lg font-bold">Training Impact</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">1,200+</div>
                      <div className="text-sm opacity-90">Trainees</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">50+</div>
                      <div className="text-sm opacity-90">Organizations</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Action Card */}
              <Card className="border-0 bg-white shadow-lg border border-[#e2e8f0] rounded-xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <BookOpen className="h-6 w-6 text-[#1b6981]" />
                    <h4 className="text-lg font-bold text-[#383f41]">Need Help?</h4>
                  </div>
                  <p className="text-sm text-[#383f41] mb-4">
                    Can't find what you're looking for? Contact our training advisors.
                  </p>
                  <Button 
                    onClick={scrollToAbout}
                    className="w-full bg-[#d25c27] text-white hover:bg-[#bb3b32] transition-colors rounded-lg"
                  >
                    Contact Advisor
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Training Listings */}
          <div className="lg:col-span-8">
            {/* Interactive Filter Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/90 backdrop-blur-lg border border-[#e2e8f0] rounded-xl p-6 mb-8 shadow-sm"
            >
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <Filter className="h-6 w-6 text-[#1b6981]" />
                  <span className="text-lg font-semibold text-[#383f41]">Filter Trainings</span>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  {/* Category Filter */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[#383f41]">Category:</span>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            selectedCategory === cat
                              ? 'bg-[#1b6981] text-white shadow-md'
                              : 'bg-[#f8fafc] text-[#383f41] border border-[#e2e8f0] hover:bg-[#1b6981] hover:text-white'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Duration Filter */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[#383f41]">Duration:</span>
                    <div className="flex flex-wrap gap-2">
                      {durations.map((dur) => (
                        <button
                          key={dur}
                          onClick={() => setSelectedDuration(dur)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                            selectedDuration === dur
                              ? 'bg-[#769f3f] text-white'
                              : 'bg-[#f8fafc] text-[#383f41] border border-[#e2e8f0] hover:bg-[#769f3f] hover:text-white'
                          }`}
                        >
                          {dur}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Training Listings */}
            <div className="space-y-6">
              <AnimatePresence>
                {visible.map((training, index) => (
                  <motion.div
                    key={training.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="border border-[#e2e8f0] bg-white shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden rounded-xl">
                      <CardContent className="p-0">
                        <div className="grid grid-cols-1 md:grid-cols-12">
                          
                          {/* Date Badge */}
                          <div className="md:col-span-2 bg-gradient-to-br from-[#1b6981] to-[#155870] text-white p-6 flex flex-col items-center justify-center relative">
                            <div className="text-3xl font-bold mb-1">
                              {new Date(training.date).getDate()}
                            </div>
                            <div className="text-sm font-medium mb-1">
                              {new Date(training.date).toLocaleDateString('en-US', { month: 'short' })}
                            </div>
                            <div className="text-xs opacity-90">
                              {new Date(training.date).toLocaleDateString('en-US', { year: 'numeric' })}
                            </div>
                            <div className="absolute bottom-2 text-xs bg-white/20 px-2 py-1 rounded-lg">
                              {training.duration}
                            </div>
                          </div>

                          {/* Training Content */}
                          <div className="md:col-span-8 p-6">
                            <div className="flex flex-wrap gap-2 mb-4">
                              <Badge className="bg-[#1b6981] text-white border-0 rounded-lg">
                                <Building className="h-3 w-3 mr-1" />
                                {training.mode}
                              </Badge>
                              <Badge variant="outline" className="border-[#383f41] text-[#383f41] rounded-lg">
                                <Star className="h-3 w-3 mr-1" />
                                {training.category}
                              </Badge>
                              <Badge variant="outline" className="border-[#769f3f] text-[#769f3f] rounded-lg">
                                {training.intensity}
                              </Badge>
                            </div>

                            <h3 className="text-xl font-bold text-[#383f41] mb-3 group-hover:text-[#1b6981] transition-colors">
                              {training.title}
                            </h3>

                            <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-[#383f41]">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-[#1b6981]" />
                                <span>{training.time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-[#1b6981]" />
                                <span>{training.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <UserCheck className="h-4 w-4 text-[#1b6981]" />
                                <span>{training.spots} spots left</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Target className="h-4 w-4 text-[#1b6981]" />
                                <span>{training.level}</span>
                              </div>
                            </div>
                          </div>

                          {/* Action Section */}
                          <div className="md:col-span-2 bg-[#f8fafc] p-6 flex flex-col justify-center items-center border-l border-[#e2e8f0]">
                            <Link href={`https://goodlifeconsulting.pro/auth?program=${training.id}`}>
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button className="bg-[#d25c27] text-white w-full mb-3 hover:bg-[#bb3b32] transition-colors rounded-lg">
                                  Register
                                </Button>
                              </motion.div>
                            </Link>
                            <Link href={`/programs/${training.id}`}>
                              <Button variant="outline" className="border-[#383f41] text-[#383f41] w-full hover:bg-[#383f41] hover:text-white rounded-lg">
                                Details
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Action Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-12"
            >
              {/* View More/Less Button */}
              {filtered.length > 3 && (
                <div className="text-center mb-8">
                  <Button
                    onClick={() => setShowAll(!showAll)}
                    variant="outline"
                    className="border-[#383f41] text-[#383f41] px-8 py-3 hover:bg-[#383f41] hover:text-white transition-colors group rounded-lg"
                  >
                    {showAll ? 'Show Less' : `View All ${filtered.length} Trainings`}
                    <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
                  </Button>
                </div>
              )}

              {/* Explore Link - Bottom Right */}
              <div className="flex justify-end">
                <Link
                  href="/programs"
                  className="inline-flex items-center bg-[#1b6981] text-white px-6 py-3 rounded-lg hover:bg-[#155870] transition-colors group shadow-md hover:shadow-lg"
                >
                  <span className="font-semibold">Explore all training programs</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}