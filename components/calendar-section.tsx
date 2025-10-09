'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Filter, MapPin, Monitor, Clock, Users } from 'lucide-react'
import ThemeToggle from '@/components/theme-toggle'

const upcomingTrainings = [
  { id: 1, title: 'Leadership Excellence Workshop',     date: '2025-01-15', time: '09:00 - 17:00', location: 'Goodlife Training Center', mode: 'Physical',  category: 'Leadership', spots: 12 },
  { id: 2, title: 'Digital Marketing Fundamentals',      date: '2025-01-20', time: '14:00 - 16:00', location: 'Goodlife Training Center', mode: 'Physical',  category: 'Digital',    spots: 25 },
  { id: 3, title: 'Public Speaking Mastery',             date: '2025-01-25', time: '10:00 - 15:00', location: 'Goodlife Training Center', mode: 'Physical',  category: 'Communication', spots: 8 },
  { id: 4, title: 'Financial Literacy for Professionals',date: '2025-02-01', time: '09:00 - 12:00', location: 'Goodlife Training Center', mode: 'Physical',  category: 'Finance',     spots: 30 },
  { id: 5, title: 'Project Management Certification Prep',date: '2025-02-05', time: '08:00 - 18:00', location: 'Goodlife Training Center', mode: 'Physical',  category: 'Leadership', spots: 15 },
  { id: 6, title: 'AI Tools for Report Writing',         date: '2025-02-10', time: '15:00 - 17:00', location: 'Goodlife Training Center', mode: 'Physical',  category: 'Digital',    spots: 40 },
]

const categories = ['All', 'Leadership', 'Digital', 'Communication', 'Finance'] as const
type Category = typeof categories[number]

export default function CalendarSection() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All')
  const [showAll, setShowAll] = useState(false)

  const filtered =
    selectedCategory === 'All'
      ? upcomingTrainings
      : upcomingTrainings.filter((t) => t.category === selectedCategory)

  const visible = showAll ? filtered : filtered.slice(0, 3)

  return (
    <section
      id="calendar"
      className="py-20 bg-background dark:bg-background"
    >
      <div className="container mx-auto px-4 flex justify-end mb-6">
        <ThemeToggle />
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-foreground mb-2">
              Upcoming Training Calendar
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-5 w-5 text-primary dark:text-primary" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat)
                  setShowAll(false)
                }}
                aria-pressed={selectedCategory === cat}
                className={`rounded-full px-4 py-2 text-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground border-primary shadow'
                    : 'border-border text-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <AnimatePresence>
            {visible.map((tr, idx) => (
              <motion.div
                key={tr.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Card className="border border-border bg-card dark:bg-card shadow transition hover:shadow-md overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-1 bg-primary text-primary-foreground p-6 flex flex-col items-center justify-center min-w-[3.5rem]">
                        <div className="text-2xl font-bold">
                          {new Date(tr.date).getDate()}
                        </div>
                        <div className="text-sm opacity-90 mt-1">
                          {new Date(tr.date).toLocaleDateString('en-US', {
                            month: 'short',
                          })}
                        </div>
                        <div className="text-xs opacity-75 mt-1">
                          {new Date(tr.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                          })}
                        </div>
                      </div>

                      <div className="md:col-span-4 p-6 bg-card dark:bg-card flex flex-col">
                        <div className="flex flex-col lg:flex-row gap-4 mb-4">
                          <div className="flex-1 space-y-4">
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge className="bg-blue-50 text-blue-600 border-blue-200">
                                {tr.mode === 'Online' ? (
                                  <Monitor className="h-3 w-3 mr-1 inline align-middle" />
                                ) : (
                                  <MapPin className="h-3 w-3 mr-1 inline align-middle" />
                                )}
                                <span className="text-foreground">
                                  {tr.mode}
                                </span>
                              </Badge>
                              <Badge variant="outline" className="text-muted-foreground border-muted">
                                {tr.category}
                              </Badge>
                            </div>

                            <h3 className="text-xl font-semibold text-foreground leading-tight">
                              {tr.title}
                            </h3>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4 text-primary inline align-middle" />
                                {tr.time}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4 text-primary inline align-middle" />
                                {tr.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4 text-primary inline align-middle" />
                                {tr.spots} spots
                              </div>
                            </div>
                          </div>

                          <div className="flex-shrink-0 flex lg:self-end">
                            <Link href={`/signup/trainee?program=${tr.id}`}>
                              <Button className="bg-primary text-primary-foreground px-6 py-2 rounded font-medium transition hover:bg-primary-dark focus:ring-2 focus:ring-primary">
                                Register Now
                              </Button>
                            </Link>
                          </div>
                        </div>

                        <div className="border-t border-border pt-4 grid grid-cols-2 md:grid-cols-4 gap-4 mt-auto text-sm text-foreground">
                          <div>
                            <span className="font-medium">Duration:</span>{' '}
                            <span className="ml-1">
                              {tr.time.includes('08:00 - 18:00')
                                ? 'Full Day Intensive'
                                : tr.time.includes('09:00 - 17:00')
                                ? 'Full Day'
                                : 'Half Day'}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">Format:</span>{' '}
                            <span className="ml-1">{tr.mode}</span>
                          </div>
                          <div>
                            <span className="font-medium">Level:</span>{' '}
                            <span className="ml-1">All Levels</span>
                          </div>
                          <div>
                            <span className="font-medium">Language:</span>{' '}
                            <span className="ml-1">English</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length > 3 && (
          <div className="mt-12 text-center">
            <Button
              onClick={() => setShowAll(!showAll)}
              variant="outline"
              className="inline-flex items-center px-8 py-3 border-primary text-primary rounded hover:bg-muted focus:ring-2 focus:ring-primary"
            >
              {showAll ? 'Show Less' : `View All ${filtered.length} Trainings`}
            </Button>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/programs"
            className="inline-flex items-center text-primary font-medium hover:text-primary-dark focus:ring-2 focus:ring-primary transition"
          >
            Explore all training programs
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}