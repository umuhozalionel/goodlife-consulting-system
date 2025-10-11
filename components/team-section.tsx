// File: components/team-section.tsx
'use client'

import React, { useEffect, useRef, useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import { Linkedin, Twitter, Github } from 'lucide-react'

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
}

/* ---------- Data: board + trainers with honors and credentials ---------- */
const teamMembers: TeamMember[] = [
  /* board + staff + trainers as provided earlier (kept identical) */
  {
    id: 7,
    name: 'Margaret Jjuuko',
    honorific: 'Professor',
    credentials: 'PhD',
    role: 'Board Member | Governance & Strategic Leadership',
    bio:
      'Professor Margaret Jjuuko combines governance and academic leadership with decades of work in media studies and institutional capacity building. She has led departments and multi-country projects, advises regional media initiatives, and champions gender-equitable training and policy.',
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
  },
  {
    id: 9,
    name: 'Kirabo Joyce',
    honorific: 'Dr.',
    credentials: 'PhD',
    role: 'Managing Director | Trainer & Coach',
    bio:
      'Dr. Kirabo Joyce is Managing Director of Goodlife Company Limited. She combines academic rigour with practical program design to deliver high-impact, contextual training that opens career pathways for participants.',
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
  },
  {
    id: 4,
    name: 'Paul Habimana',
    role: 'Data & Impact Analyst',
    bio: 'Paul leads measurement and evaluation—collecting feedback, analyzing outcomes, and reporting impact metrics to stakeholders.',
    portfolio: [{ title: 'Impact Dashboard', description: 'Built BI dashboards delivering real-time training metrics to funders.' }],
    honors: ['Built donor-ready dashboards and automated reporting pipelines.'],
    imageSrc: '/team/paul-habimana.jpg',
    linkedin: '#',
    twitter: null,
    github: '#',
  },
  {
    id: 5,
    name: 'Mary Jane',
    role: 'Communications Strategist',
    bio: 'Mary crafts messaging, case studies, and thought leadership content ensuring programs resonate with practitioners and funders.',
    portfolio: [{ title: 'Case Study Series', description: 'Authored 10+ case studies showcasing program impact across Africa.' }],
    honors: ['Lead author on program impact case studies and communications strategies.'],
    imageSrc: '/team/mary-jane.jpg',
    linkedin: '#',
    twitter: '#',
    github: null,
  },
  {
    id: 6,
    name: 'John Doe',
    role: 'Tech Lead',
    bio: 'John architects dashboards, portals, and integrations—ensuring a friction-free digital experience for trainers and participants.',
    portfolio: [{ title: 'Dashboard Revamp', description: 'Led a UI overhaul boosting user satisfaction by 40%.' }],
    honors: ['Led platform migrations and developer experience improvements.'],
    imageSrc: '/team/john-doe.jpg',
    linkedin: '#',
    twitter: null,
    github: '#',
  },
  {
    id: 10,
    name: 'Umuhoza Lionel',
    role: 'Trainer | IT, Cloud Architecture & Developer Experience',
    bio:
      'Lionel brings hands-on expertise in AWS architecture, full-stack development, and UI/UX engineering. He leads practical labs on cloud fundamentals, deployment practices, and developer workflows.',
    portfolio: [
      { title: 'Cloud Labs', description: 'Hands-on AWS and cloud pattern workshops with real-world exercises.' },
      { title: 'Developer Experience', description: 'Built developer tooling and CI/CD flows that reduced onboarding time.' },
    ],
    honors: ['AWS cloud labs lead; built reproducible developer workflows and training labs.'],
    imageSrc: '/team/umuhake-lionel.jpg',
    linkedin: '#',
    twitter: null,
    github: null,
  },
  // Lead trainers
  {
    id: 101,
    name: 'Margaret Jjuuko',
    honorific: 'Professor',
    credentials: 'PhD',
    role: 'Trainer | Communication, Management & Ethical Leadership',
    bio:
      'Margaret Jjuuko is a distinguished scholar and international trainer in communication, management, ethical standards, and soft skills development. She leads regional and global initiatives to strengthen professional excellence and integrity in media and education, champions capacity building and ethical leadership, and guides institutional growth through strategic and ethical governance.',
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
  },
  {
    id: 102,
    name: 'Ernest Safari',
    credentials: 'PhD',
    role: 'Trainer | Tourism, Hospitality & SME Growth',
    bio:
      'Ernest Safari is a seasoned trainer, researcher and coach guiding institutional growth through strategic and ethical leadership. With a doctorate in Tourism and Hospitality Management and extensive curriculum development experience for RTB and GIZ, he delivers practical solutions in tour planning, promotion, and logistics for vocational and industry training.',
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
  },
  {
    id: 103,
    name: 'Joyce Kirabo',
    honorific: 'Dr.',
    credentials: 'PhD',
    role: 'Trainer | Leadership, Counselling & Soft Skills',
    bio:
      'Joyce Kirabo leads Goodlife with strategic leadership and international training excellence. Holder of a PhD in Business Administration and masters in Counselling Psychology and Project Management, she designs transformative training that blends international best practices with local insights to open lasting opportunities for participants.',
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
  },
  {
    id: 104,
    name: 'Junior Mugisha',
    role: 'Trainer | IT Manager, Systems & Infrastructure',
    bio:
      'Junior Mugisha manages IT systems and infrastructure, specialising in network management, systems administration, and practical lab environments for hybrid trainings. He supports trainers with hands-on technical setups and operational reliability.',
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
  },
]

/* ---------- Animation variants ---------- */
const containerVariants: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }
const cardVariants: Variants = { hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0, transition: { duration: 0.28 } } }

/* ---------- Visual constants ---------- */
const MAIN = '#0f766e'
const ACCENT = '#ff6b6b'
const LATTE = '#FFF3ED'

/* ---------- Modal focus-trap helper ---------- */
function useModalFocusTrap(active: boolean, containerRef: React.RefObject<HTMLElement>, onClose: () => void) {
  useEffect(() => {
    if (!active || !containerRef.current) return
    const el = containerRef.current
    const focusable = el.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])')
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    first?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'Tab') {
        if (!first || !last) return
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [active, containerRef, onClose])
}

/* ---------- Expanded detail (full bio + honors, no name repeat) ---------- */
function ExpandedDetail({ trainer }: { trainer: TeamMember }): JSX.Element {
  return (
    <div>
      <p className="text-gray-800 mb-4 leading-7">{trainer.bio}</p>

      <h4 className="font-semibold mb-2">Honors and Accolades</h4>
      <ul className="list-disc list-inside space-y-2 text-gray-800 mb-4">
        {trainer.honors?.map((h, i) => (<li key={i}>{h}</li>))}
      </ul>
    </div>
  )
}

/* ---------- Modal detail (canonical full profile) ---------- */
function ModalDetail({ trainer }: { trainer: TeamMember }): JSX.Element {
  return (
    <div>
      <h2 id="profile-title" className="text-2xl font-bold mb-2" style={{ color: MAIN }}>
        {trainer.honorific ? `${trainer.honorific} ${trainer.name}` : trainer.name}
        {trainer.credentials ? `, ${trainer.credentials}` : ''}
      </h2>
      <p className="text-sm mb-4" style={{ color: ACCENT }}>{trainer.role}</p>
      <div className="text-gray-800 mb-4"><p>{trainer.bio}</p></div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Portfolio</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-800">
          {trainer.portfolio.map((p, i) => (<li key={i}><strong>{p.title}:</strong> {p.description}</li>))}
        </ul>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Honors and Accolades</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-800">
          {trainer.honors?.map((h, i) => (<li key={i}>{h}</li>))}
        </ul>
      </div>

      <div className="flex gap-3 items-center mt-3">
        {trainer.linkedin && <a href={trainer.linkedin} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md" style={{ background: MAIN, color: '#fff' }} aria-label="LinkedIn"><Linkedin className="h-5 w-5" /><span className="text-sm">LinkedIn</span></a>}
        {trainer.twitter && <a href={trainer.twitter} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border" style={{ borderColor: MAIN }} aria-label="Twitter"><Twitter className="h-5 w-5" /><span className="text-sm">Twitter</span></a>}
        {trainer.github && <a href={trainer.github} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border" style={{ borderColor: MAIN }} aria-label="GitHub"><Github className="h-5 w-5" /><span className="text-sm">GitHub</span></a>}
      </div>
    </div>
  )
}

/* ---------- Main component ---------- */
export default function TeamSection(): JSX.Element {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [modalTrainer, setModalTrainer] = useState<TeamMember | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)
  const openerRefs = useRef<Record<number, HTMLElement | null>>({})
  const prefersReducedMotionRef = useRef<boolean>(false)

  const boardMembers = useMemo(() => teamMembers.filter((m) => [7, 8, 9].includes(m.id)), [])
  const leadTeam = useMemo(() => [101, 102, 103, 104, 10].map((id) => teamMembers.find((m) => m.id === id)!).filter(Boolean), [])

  useEffect(() => {
    prefersReducedMotionRef.current = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useModalFocusTrap(Boolean(modalTrainer), modalRef, () => setModalTrainer(null))

  const toggleExpand = (id: number) => setExpandedId((s) => (s === id ? null : id))
  const openModal = (t: TeamMember) => setModalTrainer(t)

  return (
    <section id="team" className="py-20" style={{ background: 'linear-gradient(180deg,#f6fffb,#ffffff)' }}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold" style={{ color: MAIN }}>Our Team</h2>
          <div className="w-24 h-1 mx-auto mb-5 rounded" style={{ background: `linear-gradient(90deg, ${MAIN}, ${ACCENT})` }} />
          <p className="text-lg text-gray-700">Meet the passionate experts driving our mission. Click Read more to reveal trainer details below each card.</p>
        </div>

        {/* Board members */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10" initial={false} variants={containerVariants}>
          {boardMembers.map((m) => (
            <motion.article key={m.id} variants={cardVariants} initial={false} className="relative rounded-xl overflow-hidden shadow-lg">
              <div className="relative min-h-[260px] rounded-xl overflow-hidden group">
                <Image src={m.imageSrc} alt={m.name} fill style={{ objectFit: 'cover' }} sizes="(max-width: 1024px) 50vw, 33vw" priority />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.54))' }} />
                <div className="absolute left-0 right-0 bottom-0 z-10 p-5">
                  <div className="flex items-start md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white drop-shadow-sm">{m.name}</h3>
                      <p className="text-sm text-white/95 drop-shadow-sm">{m.role}</p>
                    </div>

                    <motion.button whileHover={!prefersReducedMotionRef.current ? { scale: 1.03, translateY: -2 } : {}} whileTap={{ scale: 0.98 }} onClick={() => setModalTrainer(m)} className="inline-flex items-center gap-3 px-4 py-2 rounded-full font-medium shadow-lg focus:outline-none focus:ring-4" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))', color: '#fff', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.18)' }} aria-label={`View profile for ${m.name}`}>
                      <span className="inline-flex items-center justify-center w-3 h-3 rounded-full" style={{ background: 'linear-gradient(90deg, rgba(255,107,107,1), rgba(15,118,110,1))' }} aria-hidden="true" />
                      <span className="text-sm">View profile</span>
                    </motion.button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {m.portfolio.map((p, i) => (
                      <span key={i} className="px-3 py-1 rounded-full text-sm font-medium" style={{ background: '#fff', color: '#111827' }}>{p.title}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Trainer Team list */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-3xl font-bold text-center mb-6" style={{ color: MAIN }}>Trainer Team</h3>

          <div className="rounded-xl shadow-lg overflow-hidden" style={{ background: 'linear-gradient(180deg,#e9f9f5,#f5fffb)', border: `1px solid rgba(15,118,110,0.06)` }}>
            <div className="p-6">
              <h4 className="text-xl font-semibold mb-3" style={{ color: MAIN }}>Our Lead Trainers</h4>
              <p className="text-gray-700 mb-6">A compact list of lead trainers. Click Read more to load details below each card.</p>

              <div className="space-y-6">
                {leadTeam.map((t) => {
                  // stable preview: first sentence only
                  const preview = t.bio.split('.').slice(0, 1).join('.').trim() + '.'
                  const isExpanded = expandedId === t.id
                  return (
                    <motion.div key={t.id} variants={cardVariants} initial={false} className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <div className="flex flex-col lg:flex-row">
                        {/* Left: title (preserve honorific/credentials), role, preview */}
                        <div className="lg:w-2/3 p-5">
                          <div id={`trainer-card-title-${t.id}`} className="text-lg font-semibold" style={{ color: MAIN }}>
                            {t.honorific ? `${t.honorific} ${t.name}` : t.name}
                            {t.credentials ? `, ${t.credentials}` : ''}
                          </div>
                          <div className="text-sm text-gray-600 mb-3">{t.role}</div>
                          <p className="text-gray-700 leading-6">{preview}</p>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {t.portfolio.map((p, i) => (
                              <span key={i} className="px-3 py-1 rounded-full text-xs" style={{ background: LATTE, color: '#2b2b2b' }}>{p.title}</span>
                            ))}
                          </div>
                        </div>

                        {/* Right: picture with Read more overlay */}
                        <div className="lg:w-1/3 relative min-h-[200px]">
                          <Image src={t.imageSrc} alt={`${t.honorific ? `${t.honorific} ${t.name}` : t.name}${t.credentials ? `, ${t.credentials}` : ''}`} fill style={{ objectFit: 'cover' }} sizes="(max-width: 1024px) 100vw, 33vw" priority={false} />
                          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.0), rgba(0,0,0,0.12))' }} />

                          <div className="absolute bottom-3 right-3">
                            <button
                              ref={(el) => (openerRefs.current[t.id] = el)}
                              onClick={() => toggleExpand(t.id)}
                              className="backdrop-blur-sm bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-md border border-white/20 focus:outline-none focus:ring-2"
                              style={{ minHeight: 40 }}
                              aria-expanded={isExpanded}
                              aria-controls={`trainer-expanded-${t.id}`}
                              aria-label={`Read more for ${t.name}`}
                            >
                              Read more
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Expanded area: text-only, full bio + honors, action buttons */}
                      {isExpanded && (
                        <div id={`trainer-expanded-${t.id}`} role="region" aria-labelledby={`trainer-card-title-${t.id}`} className="p-5 border-t bg-gray-50">
                          <ExpandedDetail trainer={t} />

                          <div className="mt-6 flex items-center justify-between">
                            <div>
                              {t.linkedin && (
                                <a href={t.linkedin} className="inline-flex items-center gap-2 px-3 py-2 rounded-md" style={{ background: MAIN, color: '#fff' }}>
                                  <Linkedin className="h-5 w-5" />
                                  <span className="text-sm">LinkedIn</span>
                                </a>
                              )}
                            </div>

                            <div>
                              <button onClick={() => openModal(t)} className="inline-block px-4 py-2 rounded-md text-white" style={{ background: ACCENT }}>
                                View profile
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: full profile (focus-trap active via hook) */}
      {modalTrainer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="profile-title" ref={modalRef} onClick={(e) => { if (e.target === modalRef.current) setModalTrainer(null) }}>
          <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }} className="relative w-full max-w-4xl rounded-lg overflow-hidden shadow-2xl bg-white" role="document">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative min-h-[320px]">
                <Image src={modalTrainer.imageSrc} alt={modalTrainer.name} fill style={{ objectFit: 'cover' }} sizes="(max-width: 1024px) 100vw, 50vw" priority />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.42), rgba(0,0,0,0.02))' }} />
              </div>

              <div className="p-6 bg-white relative">
                <button onClick={() => setModalTrainer(null)} className="absolute top-4 right-4 text-2xl text-gray-700" aria-label="Close profile">&times;</button>

                <ModalDetail trainer={modalTrainer} />

                <div className="mt-6 flex items-center gap-3">
                  <div className="ml-auto">
                    <Link href="/contact" className="inline-block px-4 py-2 rounded-md text-white" style={{ background: ACCENT }}>
                      Contact
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  )
}