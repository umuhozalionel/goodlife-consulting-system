// components/AboutSection.tsx
'use client'

import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Phone, Mail } from 'lucide-react'

interface Section {
  id: string
  title: string
  description: string
  image: string
}

const sections: Section[] = [
  {
    id: 'vision',
    title: 'Our Vision',
    description:
      'To be Rwanda’s premier catalyst for professional development, shaping a generation of confident, skilled leaders.',
    image: '/community/community-1.jpg',
  },
  {
    id: 'mission',
    title: 'Our Mission',
    description:
      'We empower individuals and organizations through hands-on training, mentorship, and strategic partnerships, aligned with the UN Sustainable Development Goals.',
    image: '/community/community-2.jpg',
  },
  {
    id: 'about-us',
    title: 'About Us',
    description:
      'Goodlife Consulting Partners bridges theory and practice via immersive training programs and industry internships across business, tourism, and tech.',
    image: '/community/community-3.jpg',
  },
  {
    id: 'how-we-work',
    title: 'How We Work',
    description:
      'Our project-based modules and mentor-led labs place trainees in real roles, under industry expert supervision.',
    image: '/community/community-4.jpg',
  },
  {
    id: 'who-we-work-with',
    title: 'Who We Work With',
    description:
      'We partner with Fortune 500 firms, local SMEs, non-profits, and UNDP/WEF initiatives to maximize impact.',
    image: '/community/community-5.jpg',
  },
  {
    id: 'business-training',
    title: 'Business Training',
    description:
      'Led by strategy and finance leaders, our modules sharpen critical thinking, leadership, and market analysis skills.',
    image: '/community/community-6.jpg',
  },
  {
    id: 'tourism-development',
    title: 'Tourism Development',
    description:
      'Internships in eco-lodges, heritage sites, and hospitality startups to advance sustainable tourism.',
    image: '/community/community-7.jpg',
  },
  {
    id: 'tech-innovation',
    title: 'Tech Innovation',
    description:
      'Hackathons, labs, and digital projects in partnership with top tech firms drive practical coding and product design.',
    image: '/community/community-8.jpg',
  },
]

const bizData = [
  { year: 2021, investment: 2.1 },
  { year: 2022, investment: 2.7 },
  { year: 2023, investment: 2.4 },
  { year: 2024, investment: 3.2 },
]

const traineesData = [
  { category: 'Business', trainees: 60, partners: 15, impacted: 120 },
  { category: 'Tourism', trainees: 50, partners: 12, impacted: 90 },
  { category: 'Tech', trainees: 80, partners: 20, impacted: 150 },
]

const tourismData = [
  { name: 'Gorilla Tours', value: 200 },
  { name: 'MICE', value: 85 },
  { name: 'Park Visits', value: 120 },
  { name: 'Other', value: 242 },
]

const ictData = [
  { year: 2021, schools: 80, internet: 65, services: 85, startups: 100 },
  { year: 2022, schools: 85, internet: 70, services: 90, startups: 200 },
  { year: 2023, schools: 90, internet: 75, services: 95, startups: 300 },
  { year: 2024, schools: 92, internet: 78, services: 100, startups: 400 },
]

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']

export default function AboutSection(): JSX.Element {
  const [activeId, setActiveId] = useState<string>(sections[0].id)
  const active = sections.find((s) => s.id === activeId)!

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
{
  "@context":"https://schema.org",
  "@graph":[
    {"@type":"Organization","name":"Goodlife Consulting Partners","url":"https://goodlifeconsultingpartners.org","logo":"https://goodlifeconsultingpartners.org/logo.png"},
    {"@type":"BreadcrumbList","itemListElement":[
      {"@type":"ListItem","position":1,"name":"Home","item":"https://goodlifeconsultingpartners.org"},
      {"@type":"ListItem","position":2,"name":"About Us","item":"https://goodlifeconsultingpartners.org/about"}
    ]}
  ]
}
`.trim(),
          }}
        />
      </Head>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <section id="about" aria-labelledby="about-heading" className="relative">
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/about-bg.jpg')" }}
            aria-hidden="true"
          />

          <div className="relative bg-gray-50 bg-opacity-90 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left Nav */}
              <aside className="hidden md:block md:col-span-3 bg-gradient-to-br from-primary to-secondary rounded-lg p-6">
                <nav aria-label="About navigation" className="space-y-2">
                  {sections.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => setActiveId(sec.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ${
                        activeId === sec.id
                          ? 'bg-white text-primary'
                          : 'text-white hover:bg-black hover:bg-opacity-20'
                      }`}
                      aria-current={activeId === sec.id ? 'page' : undefined}
                    >
                      {sec.title}
                    </button>
                  ))}
                </nav>
              </aside>

              {/* Center Featured */}
              <div className="md:col-span-6">
                <div className="mb-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900">About Us</h3>
                  <hr className="border-gray-300 mt-1" />
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active.id}
                    className="bg-gradient-to-br from-primary to-secondary text-white p-6 rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h2 id="about-heading" className="text-2xl font-bold mb-4">
                      {active.title}
                    </h2>
                    <p className="mb-6">{active.description}</p>

                    <div className="relative w-full h-48 rounded-lg overflow-hidden mb-6">
                      <Image
                        src={active.image}
                        alt={active.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="bg-white p-4 rounded-lg"
                    >
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        UN & WEF Alignment
                      </h3>
                      <p className="text-sm text-primary">
                        Aligned with UN Sustainable Development Cooperation Framework
                        2025–2029 and the WEF Regional Competitiveness Report.
                      </p>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Contact & Subscribe */}
              <aside className="md:col-span-3 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="shadow-lg">
                    <CardContent className="bg-gradient-to-br from-primary to-secondary text-white p-6">
                      <div className="flex items-start space-x-3 mb-4">
                        <MapPin className="h-5 w-5 mt-1" />
                        <div>
                          <p className="font-medium">Address</p>
                          <p className="text-sm">
                            PO Box 6061, Kicukiro Kagarama<br />
                            Kigali, Rwanda
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 mb-4">
                        <Phone className="h-5 w-5 mt-1" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-sm">
                            +250 790 363 700<br />
                            Toll Free: 9001
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Mail className="h-5 w-5 mt-1" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-sm">
                            info@goodlifeconsultingpartners.org
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <Card className="shadow-lg">
                    <CardContent className="p-6 bg-white">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Subscribe to Our Newsletter
                      </h3>
                      <p className="text-gray-700 mb-4 text-sm">
                        Latest insights, program updates & sector reports in your inbox.
                      </p>
                      <form className="flex flex-col space-y-2">
                        <input
                          type="email"
                          placeholder="Your email"
                          aria-label="Your email"
                          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        />
                        <button
                          type="submit"
                          className="bg-primary text-white rounded-lg px-4 py-2 font-semibold hover:bg-primary-dark transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                          Subscribe
                        </button>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              </aside>
            </div>

            {/* Charts */}
            <div className="mt-12 p-6 bg-white bg-opacity-10 backdrop-blur-md rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Business Investment */}
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    Business Investment (2021–2024)
                  </h4>
                  <div role="img" aria-label="Bar chart of business investments from 2021 to 2024 in billions USD">
                    <ResponsiveContainer width="100%" height={150}>
                      <BarChart
                        data={bizData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis unit="B" />
                        <Tooltip formatter={(val) => `${val}B USD`} />
                        <Bar dataKey="investment" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-sm text-gray-800 mt-2">
                    USD 3.2B commitments in 2024, up 32% since 2023.
                  </p>
                </div>

                {/* Trainees & Partners Impact */}
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    Trainees & Partners Impact
                  </h4>
                  <div role="img" aria-label="Stacked bar chart of trainees, partners, and impacted counts by category">
                    <ResponsiveContainer width="100%" height={150}>
                      <BarChart
                        data={traineesData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="trainees" fill="#10b981" />
                        <Bar dataKey="partners" fill="#f59e0b" />
                        <Bar dataKey="impacted" fill="#ef4444" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-sm text-gray-800 mt-2">
                    Shows trainees trained, partner orgs, and total impacted per category.
                  </p>
                </div>

                {/* Tourism Revenue */}
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    Tourism Revenue (2024)
                  </h4>
                  <div role="img" aria-label="Pie chart showing 2024 tourism revenue breakdown">
                    <ResponsiveContainer width="100%" height={150}>
                      <PieChart>
                        <Pie
                          data={tourismData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={60}
                          label
                        >
                          {tourismData.map((_, idx) => (
                            <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-sm text-gray-800 mt-2">
                    USD 647M total, led by Gorilla Tours at USD 200M.
                  </p>
                </div>

                {/* ICT & Innovation */}
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    ICT & Innovation (2021–2024)
                  </h4>
                  <div role="img" aria-label="Line chart tracking ICT & innovation metrics from 2021 to 2024">
                    <ResponsiveContainer width="100%" height={150}>
                      <LineChart
                        data={ictData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="schools" stroke="#2563EB" dot={false} strokeWidth={2} />
                        <Line type="monotone" dataKey="internet" stroke="#059669" dot={false} strokeWidth={2} />
                        <Line type="monotone" dataKey="services" stroke="#D97706" dot={false} strokeWidth={2} />
                        <Line type="monotone" dataKey="startups" stroke="#B91C1C" dot={false} strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-sm text-gray-800 mt-2">
                    Tracks % schools connected, internet penetration, online services,
                    & startups.
                  </p>
                </div>
              </div>
            </div>

            {/* Read More */}
            <div className="flex justify-end mt-4">
              <Link
                href="/more"
                className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary-dark transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Read more
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}