// File: components/team-section.tsx
'use client'

import React, { useEffect, useRef, useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Linkedin, Twitter, Github, Mail, Award, BookOpen, Users, Star, ChevronRight, X, Play, MapPin, Calendar, ArrowRight } from 'lucide-react'

type PortfolioItem = { title: string; description: string }
type TeamMember = {
  id: number
  name: string
  honorific?: string
  credentials?: string
  role: string
  bio: string
  portfolio: PortfolioItem[]
  honors?: string[]
  imageSrc: string
  linkedin: string | null
  twitter: string | null
  github: string | null
  location?: string
  experience?: string
  specialties?: string[]
}

/* ---------- Data: Enhanced team members ---------- */
const teamMembers: TeamMember[] = [
  {
    id: 7,
    name: 'Margaret Jjuuko',
    honorific: 'Professor',
    credentials: 'PhD',
    role: 'Board Member | Governance & Strategic Leadership',
    bio: 'Professor Margaret Jjuuko combines governance and academic leadership with decades of work in media studies and institutional capacity building. She has led departments and multi-country projects, advises regional media initiatives, and champions gender-equitable training and policy.',
    portfolio: [
      { title: 'Academic Leadership', description: 'Led journalism and communication programs across multiple universities.' },
      { title: 'Capacity Building', description: 'Developed large-scale training initiatives focused on gender equity and institutional growth.' },
    ],
    honors: [
      'Professor of Media and Communication; former department head at Makerere University with 20+ years of academic leadership.',
      'Principal Investigator, NORHED II capacity‑building grant; led multi‑country research consortium and delivered institutional strengthening outcomes.',
      'Lead trainer for international ethics and journalism workshops across East Africa; trained 1,200+ professionals.',
      'Published author of peer‑reviewed articles and two edited volumes on media ethics and governance.',
      'Senior advisor to regional media development NGOs and donor programmes (GIZ, UNESCO).',
      'Recipient of national teaching and service awards for excellence in higher education.',
      'Board member and trustee in academic and professional associations; keynote speaker at international conferences.',
    ],
    imageSrc: '/team/margaret-jjuuko.jpg',
    linkedin: '#',
    twitter: null,
    github: null,
    location: 'Kampala, Uganda',
    experience: '20+ years',
    specialties: ['Strategic Leadership', 'Media Ethics', 'Capacity Building', 'Academic Governance']
  },
  {
    id: 8,
    name: 'Joy Bateta',
    role: 'Board Member | HR & Organizational Development',
    bio: 'Joy Bateta is an experienced HR and organizational development leader with over a decade of strategic work across government and NGOs.',
    portfolio: [
      { title: 'Strategic HR', description: 'Led recruitment and organizational design initiatives across sectors.' },
      { title: 'Culturally Relevant Training', description: 'Localized curricula to improve adoption and impact.' },
    ],
    honors: ['11+ years in strategic HR and organizational development across public and private sectors.'],
    imageSrc: '/team/joy-bateta.jpg',
    linkedin: '#',
    twitter: null,
    github: null,
    location: 'Kigali, Rwanda',
    experience: '11+ years',
    specialties: ['HR Strategy', 'Organizational Development', 'Training Design', 'Talent Management']
  },
  {
    id: 9,
    name: 'Kirabo Joyce',
    honorific: 'Dr.',
    credentials: 'PhD',
    role: 'Managing Director | Trainer & Coach',
    bio: 'Dr. Kirabo Joyce is Managing Director of Goodlife Company Limited. She combines academic rigour with practical program design to deliver high-impact, contextual training that opens career pathways for participants.',
    portfolio: [
      { title: 'Strategic Leadership', description: 'Directed organizational strategy and training excellence across East Africa.' },
      { title: 'Training Impact', description: 'Designed signature courses that opened new career pathways for participants.' },
    ],
    honors: [
      'PhD in Business Administration; multiple Masters degrees.',
      'Designed national curricula and led impact evaluations demonstrating measurable outcomes.',
    ],
    imageSrc: '/team/kirabo-joyce.jpg',
    linkedin: '#',
    twitter: null,
    github: null,
    location: 'Kampala, Uganda',
    experience: '15+ years',
    specialties: ['Business Strategy', 'Program Design', 'Leadership Coaching', 'Impact Evaluation']
  },
  {
    id: 101,
    name: 'Margaret Jjuuko',
    honorific: 'Professor',
    credentials: 'PhD',
    role: 'Trainer | Communication, Management & Ethical Leadership',
    bio: 'Margaret Jjuuko is a distinguished scholar and international trainer in communication, management, ethical standards, and soft skills development. She leads regional and global initiatives to strengthen professional excellence and integrity in media and education.',
    portfolio: [
      { title: 'International Training', description: 'Led regional workshops and ethics-focused training programs.' },
      { title: 'Research Leadership', description: 'Principal Investigator on NORHED II and other capacity-building grants.' },
    ],
    honors: [
      'Professor of Media and Communication; former department head at Makerere University with 20+ years of academic leadership.',
      'Principal Investigator, NORHED II capacity‑building grant; led multi‑country research consortium and delivered institutional strengthening outcomes.',
      'Lead trainer for international ethics and journalism workshops across East Africa; trained 1,200+ professionals and designed national curricula.',
      'Published author of peer‑reviewed articles and two edited volumes on media ethics and governance.',
      'Senior advisor to regional media development NGOs and donor programmes (GIZ, UNESCO).',
      'Recipient of national teaching and service awards for excellence in higher education.',
      'Board member and trustee in academic and professional associations; keynote speaker at international conferences.',
    ],
    imageSrc: '/team/margaret-jjuuko.jpg',
    linkedin: '#',
    twitter: null,
    github: null,
    location: 'Kampala, Uganda',
    experience: '20+ years',
    specialties: ['Communication', 'Ethical Leadership', 'Media Training', 'Academic Excellence']
  },
  {
    id: 102,
    name: 'Ernest Safari',
    credentials: 'PhD',
    role: 'Trainer | Tourism, Hospitality & SME Growth',
    bio: 'Ernest Safari is a seasoned trainer, researcher and coach guiding institutional growth through strategic and ethical leadership. With a doctorate in Tourism and Hospitality Management and extensive curriculum development experience for RTB and GIZ.',
    portfolio: [
      { title: 'Curriculum Development', description: 'RTB and GIZ curriculum contributions for tourism and vocational training.' },
      { title: 'Tourism Practice', description: 'Workshops on itinerary design, promotion and logistics.' },
    ],
    honors: [
      'PhD in Tourism and Hospitality Management; extensive curriculum design for vocational institutes.',
      'Led national vocational training projects with RTB and GIZ partners.',
      'Published practitioner guides on itinerary design and tourism promotion.',
    ],
    imageSrc: '/team/ernest-safari.jpg',
    linkedin: '#',
    twitter: null,
    github: null,
    location: 'Kigali, Rwanda',
    experience: '12+ years',
    specialties: ['Tourism Development', 'Hospitality', 'SME Growth', 'Vocational Training']
  },
  {
    id: 103,
    name: 'Joyce Kirabo',
    honorific: 'Dr.',
    credentials: 'PhD',
    role: 'Trainer | Leadership, Counselling & Soft Skills',
    bio: 'Joyce Kirabo leads Goodlife with strategic leadership and international training excellence. Holder of a PhD in Business Administration and masters in Counselling Psychology and Project Management.',
    portfolio: [
      { title: 'Therapeutic Counselling', description: 'International counselling practice and coaching.' },
      { title: 'Leadership Programmes', description: 'Design and facilitation of leadership and soft skills curricula.' },
    ],
    honors: [
      'PhD in Business Administration; masters in Counselling Psychology and Project Management.',
      'Led international counselling and leadership trainings with measurable outcomes.',
      'Published practitioner resources on counselling-informed leadership programs.',
    ],
    imageSrc: '/team/kirabo-joyce.jpg',
    linkedin: '#',
    twitter: null,
    github: null,
    location: 'Kampala, Uganda',
    experience: '15+ years',
    specialties: ['Leadership', 'Counselling', 'Soft Skills', 'Project Management']
  },
  {
    id: 104,
    name: 'Junior Mugisha',
    role: 'Trainer | IT Manager, Systems & Infrastructure',
    bio: 'Junior Mugisha manages IT systems and infrastructure, specialising in network management, systems administration, and practical lab environments for hybrid trainings. He supports trainers with hands-on technical setups and operational reliability.',
    portfolio: [
      { title: 'Infrastructure Management', description: 'Maintained training infrastructure and lab environments.' },
      { title: 'Technical Support', description: 'Provided on-ground technical support for hybrid trainings.' },
    ],
    honors: [
      'Managed training lab infrastructure and hybrid training setups.',
      'Provided technical support for cross-border training implementations.',
    ],
    imageSrc: '/team/mugisha-junior.jpg',
    linkedin: '#',
    twitter: null,
    github: null,
    location: 'Kigali, Rwanda',
    experience: '8+ years',
    specialties: ['IT Infrastructure', 'Network Management', 'Technical Support', 'Hybrid Training']
  },
  {
    id: 10,
    name: 'Umuhoza Lionel',
    role: 'Trainer | IT, Cloud Architecture & Developer Experience',
    bio: 'Lionel brings hands-on expertise in AWS architecture, full-stack development, and UI/UX engineering. He leads practical labs on cloud fundamentals, deployment practices, and developer workflows.',
    portfolio: [
      { title: 'Cloud Labs', description: 'Hands-on AWS and cloud pattern workshops with real-world exercises.' },
      { title: 'Developer Experience', description: 'Built developer tooling and CI/CD flows that reduced onboarding time.' },
    ],
    honors: ['AWS cloud labs lead; built reproducible developer workflows and training labs.'],
    imageSrc: '/team/umuhake-lionel.jpg',
    linkedin: '#',
    twitter: null,
    github: null,
    location: 'Kigali, Rwanda',
    experience: '6+ years',
    specialties: ['Cloud Architecture', 'Full-Stack Development', 'UI/UX', 'DevOps']
  }
]

/* ---------- Animation Variants ---------- */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

const modalVariants: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.8,
    y: 20
  },
  visible: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: -20,
    transition: {
      duration: 0.2
    }
  }
}

/* ---------- Profile Card Component ---------- */
const ProfileCard = ({ member, onViewProfile }: { member: TeamMember; onViewProfile: (member: TeamMember) => void }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      variants={cardVariants}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-[#e2e8f0]"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
    >
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8fafc] to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={member.imageSrc}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        
        {/* Experience Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
          <div className="flex items-center gap-1 text-xs font-semibold text-[#383f41]">
            <Calendar className="h-3 w-3" />
            <span>{member.experience}</span>
          </div>
        </div>

        {/* Specialties Tags */}
        <div className="absolute top-4 right-4 flex flex-wrap gap-1 justify-end max-w-[60%]">
          {member.specialties?.slice(0, 2).map((specialty, index) => (
            <span
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-[#383f41] shadow-lg"
            >
              {specialty}
            </span>
          ))}
        </div>

        {/* View Profile Button */}
        <motion.button
          onClick={() => onViewProfile(member)}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm text-[#383f41] px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Profile
        </motion.button>
      </div>

      {/* Content */}
      <div className="relative p-6">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-[#383f41] group-hover:text-[#1b6981] transition-colors duration-300">
            {member.honorific && <span className="text-[#383f41]">{member.honorific} </span>}
            {member.name}
            {member.credentials && <span className="text-[#383f41]">, {member.credentials}</span>}
          </h3>
          <p className="text-[#383f41] text-sm mt-1">{member.role}</p>
        </div>

        <p className="text-[#383f41] text-sm leading-relaxed line-clamp-3">
          {member.bio.split('.').slice(0, 2).join('.')}.
        </p>

        {/* Location */}
        {member.location && (
          <div className="flex items-center gap-2 mt-3 text-[#383f41] text-sm">
            <MapPin className="h-4 w-4" />
            <span>{member.location}</span>
          </div>
        )}

        {/* Social Links */}
        <div className="flex gap-3 mt-4 pt-4 border-t border-[#e2e8f0]">
          {member.linkedin && (
            <motion.a
              href={member.linkedin}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-[#f8fafc] rounded-lg hover:bg-[#1b6981] hover:text-white transition-colors duration-300"
            >
              <Linkedin className="h-4 w-4" />
            </motion.a>
          )}
          {member.twitter && (
            <motion.a
              href={member.twitter}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-[#f8fafc] rounded-lg hover:bg-[#1b6981] hover:text-white transition-colors duration-300"
            >
              <Twitter className="h-4 w-4" />
            </motion.a>
          )}
          {member.github && (
            <motion.a
              href={member.github}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-[#f8fafc] rounded-lg hover:bg-[#383f41] hover:text-white transition-colors duration-300"
            >
              <Github className="h-4 w-4" />
            </motion.a>
          )}
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#1b6981] transition-all duration-500 pointer-events-none" />
    </motion.div>
  )
}

/* ---------- Profile Modal Component ---------- */
const ProfileModal = ({ member, isOpen, onClose }: { member: TeamMember; isOpen: boolean; onClose: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          ref={modalRef}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors duration-300"
          >
            <X className="h-6 w-6 text-[#383f41]" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
            {/* Left Column - Image & Basic Info */}
            <div className="relative lg:col-span-1">
              <div className="relative h-80 lg:h-full">
                <Image
                  src={member.imageSrc}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                
                {/* Basic Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h2 className="text-2xl font-bold mb-2">
                    {member.honorific && <span>{member.honorific} </span>}
                    {member.name}
                    {member.credentials && <span>, {member.credentials}</span>}
                  </h2>
                  <p className="text-[#769f3f] text-lg mb-4">{member.role}</p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    {member.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{member.location}</span>
                      </div>
                    )}
                    {member.experience && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{member.experience}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Detailed Information */}
            <div className="lg:col-span-2 p-8 overflow-y-auto max-h-[80vh] lg:max-h-[90vh]">
              {/* Bio */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#383f41] mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#1b6981]" />
                  Professional Bio
                </h3>
                <p className="text-[#383f41] leading-relaxed">{member.bio}</p>
              </div>

              {/* Specialties */}
              {member.specialties && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-[#383f41] mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5 text-[#1b6981]" />
                    Areas of Expertise
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-[#1b6981] text-white rounded-full text-sm font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Portfolio */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#383f41] mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-[#1b6981]" />
                  Key Achievements
                </h3>
                <div className="grid gap-4">
                  {member.portfolio.map((item, index) => (
                    <div key={index} className="p-4 bg-[#f8fafc] rounded-lg border border-[#e2e8f0]">
                      <h4 className="font-semibold text-[#383f41] mb-2">{item.title}</h4>
                      <p className="text-[#383f41] text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Honors & Awards */}
              {member.honors && member.honors.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-[#383f41] mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-[#1b6981]" />
                    Honors & Recognition
                  </h3>
                  <ul className="space-y-3">
                    {member.honors.map((honor, index) => (
                      <li key={index} className="flex items-start gap-3 text-[#383f41]">
                        <div className="w-2 h-2 bg-[#1b6981] rounded-full mt-2 flex-shrink-0" />
                        <span>{honor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-6 border-t border-[#e2e8f0]">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-[#d25c27] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#bb3b32] transition-colors duration-300"
                >
                  <Mail className="h-4 w-4" />
                  Contact {member.name.split(' ')[0]}
                </motion.a>
                
                <div className="flex gap-3">
                  {member.linkedin && (
                    <motion.a
                      href={member.linkedin}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-[#f8fafc] rounded-lg hover:bg-[#1b6981] hover:text-white transition-colors duration-300"
                    >
                      <Linkedin className="h-5 w-5" />
                    </motion.a>
                  )}
                  {member.twitter && (
                    <motion.a
                      href={member.twitter}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-[#f8fafc] rounded-lg hover:bg-[#1b6981] hover:text-white transition-colors duration-300"
                    >
                      <Twitter className="h-5 w-5" />
                    </motion.a>
                  )}
                  {member.github && (
                    <motion.a
                      href={member.github}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-[#f8fafc] rounded-lg hover:bg-[#383f41] hover:text-white transition-colors duration-300"
                    >
                      <Github className="h-5 w-5" />
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ---------- Main Team Section Component ---------- */
export default function TeamSection(): JSX.Element {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [activeFilter, setActiveFilter] = useState<'all' | 'board' | 'trainers'>('all')

  const boardMembers = useMemo(() => teamMembers.filter((m) => [7, 8, 9].includes(m.id)), [])
  const trainers = useMemo(() => teamMembers.filter((m) => [101, 102, 103, 104, 10].includes(m.id)), [])
  
  const filteredMembers = useMemo(() => {
    switch (activeFilter) {
      case 'board': return boardMembers
      case 'trainers': return trainers
      default: return [...boardMembers, ...trainers]
    }
  }, [activeFilter, boardMembers, trainers])

  const openProfile = (member: TeamMember) => setSelectedMember(member)
  const closeProfile = () => setSelectedMember(null)

  return (
    <section id="team" className="relative py-20 w-full bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 w-full"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#383f41] mb-6">
            Meet Our 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1b6981] to-[#769f3f]"> Team</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#1b6981] to-[#769f3f] rounded-full mx-auto mb-6" />
          <p className="text-xl text-[#383f41] max-w-3xl mx-auto leading-relaxed">
            Discover the passionate experts and industry leaders driving our mission forward. 
            Each team member brings unique expertise and dedication to empower Rwanda's future leaders.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12 w-full"
        >
          {[
            { key: 'all', label: 'All Team Members', count: boardMembers.length + trainers.length },
            { key: 'board', label: 'Board & Leadership', count: boardMembers.length },
            { key: 'trainers', label: 'Expert Trainers', count: trainers.length }
          ].map((filter) => (
            <motion.button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key as any)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                activeFilter === filter.key
                  ? 'bg-[#1b6981] text-white shadow-lg'
                  : 'bg-white text-[#383f41] shadow-md hover:shadow-lg border border-[#e2e8f0]'
              }`}
            >
              <span>{filter.label}</span>
              <span className={`px-2 py-1 rounded-full text-sm ${
                activeFilter === filter.key
                  ? 'bg-white/20 text-white'
                  : 'bg-[#f8fafc] text-[#383f41]'
              }`}>
                {filter.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Team Grid */}
        <motion.div
          key={activeFilter}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
        >
          {filteredMembers.map((member) => (
            <ProfileCard
              key={member.id}
              member={member}
              onViewProfile={openProfile}
            />
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 w-full"
        >
          <div className="bg-gradient-to-br from-[#1b6981] via-[#769f3f] to-[#383f41] rounded-3xl p-12 text-center relative overflow-hidden w-full">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Work With Our Experts?
              </h3>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
                Connect with our team of industry leaders and expert trainers to transform your career or organization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center bg-white text-[#383f41] px-8 py-4 rounded-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 group"
                >
                  Get In Touch
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <motion.a
                  href="/programs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-[#383f41] transition-all duration-300 group"
                >
                  <BookOpen className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Browse Programs
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Profile Modal */}
      <ProfileModal
        member={selectedMember!}
        isOpen={!!selectedMember}
        onClose={closeProfile}
      />
    </section>
  )
}