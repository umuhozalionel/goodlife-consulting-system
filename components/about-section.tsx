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
import { MapPin, Phone, Mail, Users, Target } from 'lucide-react'

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
    description: 'To be Rwanda\'s premier catalyst for professional development, shaping a generation of confident, skilled leaders.',
    image: '/community/community-1.jpg',
  },
  {
    id: 'mission',
    title: 'Our Mission',
    description: 'We empower individuals and organizations through hands-on training, mentorship, and strategic partnerships, aligned with the UN Sustainable Development Goals.',
    image: '/community/community-2.jpg',
  },
  {
    id: 'about-us',
    title: 'About Us',
    description: 'Goodlife Consulting Partners bridges theory and practice via immersive training programs and industry internships across business, tourism, and tech.',
    image: '/community/community-3.jpg',
  },
  {
    id: 'how-we-work',
    title: 'How We Work',
    description: 'Our project-based modules and mentor-led labs place trainees in real roles, under industry expert supervision.',
    image: '/community/community-4.jpg',
  },
  {
    id: 'who-we-work-with',
    title: 'Who We Work With',
    description: 'We partner with Fortune 500 firms, local SMEs, non-profits, and UNDP/WEF initiatives to maximize impact.',
    image: '/community/community-5.jpg',
  },
  {
    id: 'business-training',
    title: 'Business Training',
    description: 'Led by strategy and finance leaders, our modules sharpen critical thinking, leadership, and market analysis skills.',
    image: '/community/community-6.jpg',
  },
  {
    id: 'tourism-development',
    title: 'Tourism Development',
    description: 'Internships in eco-lodges, heritage sites, and hospitality startups to advance sustainable tourism.',
    image: '/community/community-7.jpg',
  },
  {
    id: 'tech-innovation',
    title: 'Tech Innovation',
    description: 'Hackathons, labs, and digital projects in partnership with top tech firms drive practical coding and product design.',
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

const COLORS = ['#0f172a', '#0c4a6e', '#1e40af', '#1d4ed8']

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

      <section id="about" aria-labelledby="about-heading" className="relative bg-white py-12">
        <div className="max-w-full mx-auto px-6 md:px-8 lg:px-12">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Sidebar - Navigation */}
            <aside className="lg:col-span-3">
              {/* Welcome Message */}
              <div className="bg-[#0c4a6e] text-white p-6 rounded-lg mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="h-6 w-6" />
                  <h3 className="text-xl font-bold">Explore Our Story</h3>
                </div>
                <p className="text-sm leading-relaxed">
                  Discover how we're transforming professional development in Rwanda through innovative training and strategic partnerships.
                </p>
              </div>

              {/* Navigation */}
              <nav aria-label="About navigation" className="space-y-2 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                {sections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => setActiveId(sec.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0c4a6e] focus:ring-offset-2 ${
                      activeId === sec.id
                        ? 'bg-[#0f172a] text-white font-semibold'
                        : 'text-[#0f172a] hover:bg-[#0c4a6e] hover:text-white'
                    }`}
                    aria-current={activeId === sec.id ? 'page' : undefined}
                  >
                    {sec.title}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Center Featured Content */}
            <div className="lg:col-span-6">
              <div className="mb-8">
                <h2 id="about-heading" className="text-3xl font-bold text-[#0f172a]">About Us</h2>
                <div className="w-20 h-1 bg-[#0c4a6e] mt-2"></div>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  className="bg-white border border-gray-200 p-8 rounded-lg shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-2xl font-bold text-[#0f172a] mb-4">{active.title}</h3>
                  <p className="mb-6 text-[#0f172a] text-lg leading-relaxed">{active.description}</p>

                  <div className="relative w-full h-64 rounded-lg overflow-hidden mb-6">
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
                    className="bg-[#0f172a] p-6 rounded-lg"
                  >
                    <h4 className="text-lg font-semibold text-white mb-3">
                      UN & WEF Alignment
                    </h4>
                    <p className="text-white">
                      Aligned with UN Sustainable Development Cooperation Framework
                      2025–2029 and the WEF Regional Competitiveness Report.
                    </p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Sidebar - Contact & Newsletter */}
            <aside className="lg:col-span-3 space-y-6">
              {/* Welcome Message */}
              <div className="bg-[#0f172a] text-white p-6 rounded-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <Users className="h-6 w-6" />
                  <h3 className="text-xl font-bold">Join Our Community</h3>
                </div>
                <p className="text-sm leading-relaxed">
                  Connect with industry leaders, access exclusive resources, and stay updated on our latest training programs and opportunities.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardContent className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-[#0f172a] mb-4">Contact Information</h3>
                    <div className="flex items-start space-x-3 mb-4">
                      <MapPin className="h-5 w-5 mt-1 flex-shrink-0 text-[#0c4a6e]" />
                      <div>
                        <p className="font-semibold text-[#0f172a]">Address</p>
                        <p className="text-sm text-[#0f172a] mt-1">
                          PO Box 6061, Kicukiro Kagarama<br />
                          Kigali, Rwanda
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 mb-4">
                      <Phone className="h-5 w-5 mt-1 flex-shrink-0 text-[#0c4a6e]" />
                      <div>
                        <p className="font-semibold text-[#0f172a]">Phone</p>
                        <p className="text-sm text-[#0f172a] mt-1">
                          +250 790 363 700<br />
                          Toll Free: 9001
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Mail className="h-5 w-5 mt-1 flex-shrink-0 text-[#0c4a6e]" />
                      <div>
                        <p className="font-semibold text-[#0f172a]">Email</p>
                        <p className="text-sm text-[#0f172a] mt-1">
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
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6 bg-[#0c4a6e] text-white rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
                    <p className="mb-4 text-sm">
                      Get the latest insights, program updates & sector reports delivered to your inbox.
                    </p>
                    <form className="flex flex-col space-y-3">
                      <input
                        type="email"
                        placeholder="Your email address"
                        aria-label="Your email address"
                        className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-[#0f172a]"
                      />
                      <button
                        type="submit"
                        className="bg-[#0f172a] text-white rounded-lg px-4 py-3 font-semibold hover:bg-[#1e293b] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0c4a6e]"
                      >
                        Subscribe Now
                      </button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </aside>
          </div>

          {/* Charts Section */}
          <div className="mt-16 p-8 bg-gray-50 rounded-lg">
            <h3 className="text-2xl font-bold text-[#0f172a] mb-8 text-center">Our Impact & Metrics</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Business Investment */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-lg font-semibold text-[#0f172a] mb-4">
                  Business Investment (2021–2024)
                </h4>
                <div role="img" aria-label="Bar chart of business investments from 2021 to 2024 in billions USD">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={bizData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis unit="B" />
                      <Tooltip formatter={(val) => `${val}B USD`} />
                      <Bar dataKey="investment" fill="#0f172a" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-[#0f172a] mt-3">
                  USD 3.2B commitments in 2024, up 32% since 2023.
                </p>
              </div>

              {/* Trainees & Partners Impact */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-lg font-semibold text-[#0f172a] mb-4">
                  Trainees & Partners Impact
                </h4>
                <div role="img" aria-label="Stacked bar chart of trainees, partners, and impacted counts by category">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={traineesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="trainees" fill="#0f172a" />
                      <Bar dataKey="partners" fill="#0c4a6e" />
                      <Bar dataKey="impacted" fill="#1e40af" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-[#0f172a] mt-3">
                  Shows trainees trained, partner orgs, and total impacted per category.
                </p>
              </div>

              {/* Tourism Revenue */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-lg font-semibold text-[#0f172a] mb-4">
                  Tourism Revenue (2024)
                </h4>
                <div role="img" aria-label="Pie chart showing 2024 tourism revenue breakdown">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={tourismData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {tourismData.map((_, idx) => (
                          <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-[#0f172a] mt-3">
                  USD 647M total, led by Gorilla Tours at USD 200M.
                </p>
              </div>

              {/* ICT & Innovation */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-lg font-semibold text-[#0f172a] mb-4">
                  ICT & Innovation (2021–2024)
                </h4>
                <div role="img" aria-label="Line chart tracking ICT & innovation metrics from 2021 to 2024">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={ictData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="schools" stroke="#0f172a" strokeWidth={3} dot={{ fill: '#0f172a' }} />
                      <Line type="monotone" dataKey="internet" stroke="#0c4a6e" strokeWidth={3} dot={{ fill: '#0c4a6e' }} />
                      <Line type="monotone" dataKey="services" stroke="#1e40af" strokeWidth={3} dot={{ fill: '#1e40af' }} />
                      <Line type="monotone" dataKey="startups" stroke="#1d4ed8" strokeWidth={3} dot={{ fill: '#1d4ed8' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-[#0f172a] mt-3">
                  Tracks % schools connected, internet penetration, online services, & startups.
                </p>
              </div>
            </div>

            {/* Read More */}
            <div className="flex justify-center mt-8">
              <Link
                href="/more"
                className="bg-[#0f172a] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0c4a6e] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0c4a6e] focus:ring-offset-2"
              >
                Read More About Our Impact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}