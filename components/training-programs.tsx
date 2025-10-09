// components/TrainingProgram.tsx
'use client'

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const programs = [
  {
    slug: 'leadership',
    category: 'Leadership & Management',
    image:
      '/images/cheerful-mood-group-people-business-conference-modern-classroom-daytime.jpg',
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
    image:
      '/images/team-businessmen-listening-business-lecture-briefing.jpg',
    description: 'Harness the latest digital tools and innovation practices.',
  },
  {
    slug: 'communication',
    category: 'Communication & Personal Growth',
    image:
      '/images/corporate-business-people-meeting-boardroom-african-manager-brainstorming-with-colleagues-discussing-strategy-sharing-problem-solving-ideas-collaborating-conference-room-company.jpg',
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
    image:
      '/images/man-participation-training-after-being-hired-his-new-office-job.jpg',
    description: 'Engage in dynamic exercises to strengthen team cohesion.',
  },
  {
    slug: 'industrial-attachment',
    category: 'Industrial Attachment',
    image:
      '/images/african-american-businessman-giving-presentation-explaining-new-marketing-plan-meeting.jpg',
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
    image:
      '/images/male-employee-participating-training-session-his-new-office-job.jpg',
    description:
      'Navigate career paths, employability gaps & work-life balance.',
  },
  {
    slug: 'field-trips',
    category: 'Field Trips & Site Visits',
    image:
      '/images/confident-african-speaker-business-coach-giving-presentation-team.jpg',
    description:
      'Explore real-world industries and innovation hubs on site visits.',
  },
]

export default function TrainingProgram() {
  const spotlight = programs.slice(0, 3)
  const duration = '3 months'

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
        className="bg-white"
      >
        <div className="container mx-auto px-4">
          {/* Header: title in top-right, description on left */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-16">
            <p className="text-lg text-gray-600 max-w-md md:max-w-lg">
              Comprehensive solutions to elevate your skills and unlock your
              potential.
            </p>
            <div className="mt-6 md:mt-0 text-right">
              <h2
                id="programs-heading"
                className="text-3xl md:text-4xl font-bold text-gray-900"
              >
                Our Training Programs
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-terracotta-500 to-forest-500 mx-auto rounded-full mt-2" />
            </div>
          </div>

          {/* Spotlight cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {spotlight.map((prog) => (
              <article key={prog.slug} aria-labelledby={`${prog.slug}-title`}>
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="p-0">
                    <div style={{ height: '160px' }} className="relative w-full">
                      <Image
                        src={prog.image}
                        alt={prog.category}
                        width={400}
                        height={160}
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3
                      id={`${prog.slug}-title`}
                      className="text-lg font-semibold text-gray-900"
                    >
                      {prog.category}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {prog.description}
                    </p>
                    <p className="text-sm text-gray-600 mt-1 font-medium">
                      Duration: {duration}
                    </p>
                    <div className="flex space-x-3 mt-4">
                      <Link href={`/programs/${prog.slug}`} prefetch={false}>
                        <Button variant="outline" className="rounded-none">
                          View Details
                        </Button>
                      </Link>
                      <Link
                        href={`/signup/trainee?program=${prog.slug}`}
                        prefetch={false}
                      >
                        <Button className="rounded-none">Enroll Now</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </article>
            ))}
          </div>

          {/* View More Programs button */}
          <div className="mt-12 text-center">
            <Link href="/programs" prefetch>
              <Button
                variant="outline"
                className="inline-flex items-center space-x-2 transform transition-transform duration-300 hover:scale-105 rounded-none"
              >
                <span>View More Programs</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}