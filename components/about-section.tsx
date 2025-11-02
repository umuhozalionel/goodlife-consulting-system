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
import { MapPin, Phone, Mail, Users, Target, ArrowRight, BookOpen, Globe, TrendingUp } from 'lucide-react'

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

const COLORS = ['#1b6981', '#769f3f', '#d25c27', '#dd8426']

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

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

      <section id="about" aria-labelledby="about-heading" className="relative bg-white w-full py-12 md:py-16 lg:py-20">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* Main Content Grid */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            
            {/* Left Sidebar - Navigation */}
            <motion.aside 
              className="lg:col-span-3"
              variants={itemVariants}
            >
              {/* Welcome Message */}
              <motion.div 
                className="bg-[#1b6981] text-white p-6 rounded-xl mb-6 shadow-lg"
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="h-6 w-6" />
                  <h3 className="text-xl font-bold">Explore Our Story</h3>
                </div>
                <p className="text-sm leading-relaxed">
                  Discover how we're transforming professional development in Rwanda through innovative training and strategic partnerships.
                </p>
              </motion.div>

              {/* Navigation */}
              <nav aria-label="About navigation" className="space-y-2 bg-white border border-[#e2e8f0] rounded-xl p-4 sm:p-6 shadow-sm">
                {sections.map((sec, index) => (
                  <motion.button
                    key={sec.id}
                    onClick={() => setActiveId(sec.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1b6981] focus:ring-offset-2 ${
                      activeId === sec.id
                        ? 'bg-[#383f41] text-white font-semibold shadow-md'
                        : 'text-[#383f41] hover:bg-[#1b6981] hover:text-white'
                    }`}
                    aria-current={activeId === sec.id ? 'page' : undefined}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {sec.title}
                  </motion.button>
                ))}
              </nav>
            </motion.aside>

            {/* Center Featured Content */}
            <motion.div 
              className="lg:col-span-6"
              variants={itemVariants}
            >
              <div className="mb-6 sm:mb-8">
                <h2 id="about-heading" className="text-2xl sm:text-3xl font-bold text-[#383f41]">About Us</h2>
                <div className="w-16 sm:w-20 h-1 bg-[#1b6981] mt-2 rounded-full"></div>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  className="bg-white border border-[#e2e8f0] p-6 sm:p-8 rounded-xl shadow-sm"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-[#383f41] mb-4">{active.title}</h3>
                  <p className="mb-6 text-[#383f41] text-base sm:text-lg leading-relaxed">{active.description}</p>

                  <motion.div 
                    className="relative w-full h-48 sm:h-64 rounded-lg overflow-hidden mb-6"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={active.image}
                      alt={active.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="bg-[#383f41] p-4 sm:p-6 rounded-xl"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Globe className="h-5 w-5 text-[#769f3f]" />
                      <h4 className="text-lg font-semibold text-white">
                        UN & WEF Alignment
                      </h4>
                    </div>
                    <p className="text-white text-sm sm:text-base">
                      Aligned with UN Sustainable Development Cooperation Framework
                      2025–2029 and the WEF Regional Competitiveness Report.
                    </p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Right Sidebar - Contact & Newsletter */}
            <motion.aside 
              className="lg:col-span-3 space-y-6"
              variants={itemVariants}
            >
              {/* Welcome Message */}
              <motion.div 
                className="bg-[#383f41] text-white p-6 rounded-xl shadow-lg"
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Users className="h-6 w-6" />
                  <h3 className="text-xl font-bold">Join Our Community</h3>
                </div>
                <p className="text-sm leading-relaxed">
                  Connect with industry leaders, access exclusive resources, and stay updated on our latest training programs and opportunities.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardContent className="bg-white p-4 sm:p-6 rounded-xl border border-[#e2e8f0]">
                    <h3 className="text-lg font-semibold text-[#383f41] mb-4">Contact Information</h3>
                    <div className="flex items-start space-x-3 mb-4">
                      <MapPin className="h-5 w-5 mt-1 flex-shrink-0 text-[#1b6981]" />
                      <div>
                        <p className="font-semibold text-[#383f41]">Address</p>
                        <p className="text-sm text-[#383f41] mt-1">
                          PO Box 6061, Kicukiro Kagarama<br />
                          Kigali, Rwanda
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 mb-4">
                      <Phone className="h-5 w-5 mt-1 flex-shrink-0 text-[#1b6981]" />
                      <div>
                        <p className="font-semibold text-[#383f41]">Phone</p>
                        <p className="text-sm text-[#383f41] mt-1">
                          +250 790 363 700<br />
                          Toll Free: 9001
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Mail className="h-5 w-5 mt-1 flex-shrink-0 text-[#1b6981]" />
                      <div>
                        <p className="font-semibold text-[#383f41]">Email</p>
                        <p className="text-sm text-[#383f41] mt-1">
                          info@goodlifeconsultingpartners.org
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-4 sm:p-6 bg-[#1b6981] text-white rounded-xl">
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="h-5 w-5" />
                      <h3 className="text-lg font-semibold">Stay Connected</h3>
                    </div>
                    <p className="mb-4 text-sm">
                      Get the latest insights, program updates & sector reports delivered to your inbox.
                    </p>
                    <form className="flex flex-col space-y-3">
                      <input
                        type="email"
                        placeholder="Your email address"
                        aria-label="Your email address"
                        className="border border-[#e2e8f0] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-[#383f41] text-sm"
                      />
                      <motion.button
                        type="submit"
                        className="bg-[#d25c27] text-white rounded-lg px-4 py-3 font-semibold hover:bg-[#bb3b32] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1b6981] flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Subscribe Now
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.aside>
          </motion.div>

          {/* Charts Section */}
          <motion.div 
            className="mt-12 sm:mt-16 p-6 sm:p-8 bg-[#f8fafc] rounded-xl border border-[#e2e8f0]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
              <TrendingUp className="h-6 w-6 text-[#1b6981]" />
              <h3 className="text-xl sm:text-2xl font-bold text-[#383f41] text-center">Our Impact & Metrics</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Business Investment */}
              <motion.div 
                className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-[#e2e8f0]"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <h4 className="text-lg font-semibold text-[#383f41] mb-4">
                  Business Investment (2021–2024)
                </h4>
                <div role="img" aria-label="Bar chart of business investments from 2021 to 2024 in billions USD">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={bizData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="year" stroke="#64748b" />
                      <YAxis unit="B" stroke="#64748b" />
                      <Tooltip 
                        formatter={(val) => [`${val}B USD`, 'Investment']}
                        contentStyle={{ backgroundColor: '#1b6981', color: 'white', border: 'none', borderRadius: '8px' }}
                      />
                      <Bar dataKey="investment" fill="#1b6981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-[#383f41] mt-3">
                  USD 3.2B commitments in 2024, up 32% since 2023.
                </p>
              </motion.div>

              {/* Trainees & Partners Impact */}
              <motion.div 
                className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-[#e2e8f0]"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <h4 className="text-lg font-semibold text-[#383f41] mb-4">
                  Trainees & Partners Impact
                </h4>
                <div role="img" aria-label="Stacked bar chart of trainees, partners, and impacted counts by category">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={traineesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="category" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1b6981', color: 'white', border: 'none', borderRadius: '8px' }}
                      />
                      <Bar dataKey="trainees" fill="#1b6981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="partners" fill="#769f3f" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="impacted" fill="#d25c27" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-[#383f41] mt-3">
                  Shows trainees trained, partner orgs, and total impacted per category.
                </p>
              </motion.div>

              {/* Tourism Revenue */}
              <motion.div 
                className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-[#e2e8f0]"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <h4 className="text-lg font-semibold text-[#383f41] mb-4">
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
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1b6981', color: 'white', border: 'none', borderRadius: '8px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-[#383f41] mt-3">
                  USD 647M total, led by Gorilla Tours at USD 200M.
                </p>
              </motion.div>

              {/* ICT & Innovation */}
              <motion.div 
                className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-[#e2e8f0]"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <h4 className="text-lg font-semibold text-[#383f41] mb-4">
                  ICT & Innovation (2021–2024)
                </h4>
                <div role="img" aria-label="Line chart tracking ICT & innovation metrics from 2021 to 2024">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={ictData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="year" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1b6981', color: 'white', border: 'none', borderRadius: '8px' }}
                      />
                      <Line type="monotone" dataKey="schools" stroke="#1b6981" strokeWidth={3} dot={{ fill: '#1b6981', r: 4 }} />
                      <Line type="monotone" dataKey="internet" stroke="#769f3f" strokeWidth={3} dot={{ fill: '#769f3f', r: 4 }} />
                      <Line type="monotone" dataKey="services" stroke="#d25c27" strokeWidth={3} dot={{ fill: '#d25c27', r: 4 }} />
                      <Line type="monotone" dataKey="startups" stroke="#dd8426" strokeWidth={3} dot={{ fill: '#dd8426', r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-[#383f41] mt-3">
                  Tracks % schools connected, internet penetration, online services, & startups.
                </p>
              </motion.div>
            </div>

            {/* Read More */}
            <motion.div 
              className="flex justify-center mt-6 sm:mt-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/more"
                className="bg-[#d25c27] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#bb3b32] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1b6981] focus:ring-offset-2 flex items-center gap-2"
              >
                Read More About Our Impact
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}