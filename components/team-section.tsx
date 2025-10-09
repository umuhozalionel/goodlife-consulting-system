// File: components/team-section.tsx
'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import { Linkedin, Twitter, Github } from 'lucide-react'

type PortfolioItem = { title: string; description: string }
type TeamMember = {
  id: number
  name: string
  role: string
  bio: string
  portfolio: PortfolioItem[]
  imageSrc: string
  linkedin: string | null
  twitter: string | null
  github: string | null
}

/* ---------- Data (board unchanged; trainers updated) ---------- */
const teamMembers: TeamMember[] = [
  {
    id: 7,
    name: 'Margaret Jjuuko',
    role: 'Board Member | Governance & Strategic Leadership',
    bio:
      'Professor Margaret Jjuuko brings governance, strategic leadership, and organizational development expertise. An academic and media scholar, she has led programs at Makerere University, Rhodes University, and the University of Rwanda, and champions capacity building, gender equity, and international partnerships.',
    portfolio: [
      { title: 'Academic Leadership', description: 'Led journalism and communication programs across multiple universities.' },
      { title: 'Capacity Building', description: 'Developed large-scale training initiatives focused on gender equity and institutional growth.' },
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
    bio:
      'Joy Bateta is a seasoned HR leader with 11+ years in strategic planning, recruitment, and organizational development across government, private sector, and NGOs.',
    portfolio: [
      { title: 'Strategic HR', description: 'Led recruitment and organizational design initiatives across sectors.' },
      { title: 'Culturally Relevant Training', description: 'Localized curricula to improve adoption and impact.' },
    ],
    imageSrc: '/team/joy-bateta.jpg',
    linkedin: '#',
    twitter: null,
    github: null,
  },
  {
    id: 9,
    name: 'Kirabo Joyce',
    role: 'Managing Director | Trainer & Coach',
    bio:
      'Dr. Kirabo Joyce is Managing Director of Goodlife Company Limited, holding a PhD in Business Administration and multiple masters degrees. She shaped Goodlife into a gold standard for contextual, high-impact trainings.',
    portfolio: [
      { title: 'Strategic Leadership', description: 'Directed organizational strategy and training excellence across East Africa.' },
      { title: 'Training Impact', description: 'Designed signature courses that opened new career pathways for participants.' },
    ],
    imageSrc: '/team/kirabo-joyce.jpg',
    linkedin: '#',
    twitter: null,
    github: null,
  },

  { id: 4, name: 'Paul Habimana', role: 'Data & Impact Analyst', bio: 'Paul leads our measurement and evaluation efforts—collecting feedback, analyzing outcomes, and reporting impact metrics to stakeholders.', portfolio: [{ title: 'Impact Dashboard', description: 'Built BI dashboards delivering real-time training metrics to funders.' }], imageSrc: '/team/paul-habimana.jpg', linkedin: '#', twitter: null, github: '#' },
  { id: 5, name: 'Mary Jane', role: 'Communications Strategist', bio: 'Mary crafts our messaging, case studies, and thought-leadership pieces—ensuring our story resonates with both practitioners and funders.', portfolio: [{ title: 'Case Study Series', description: 'Authored 10+ case studies showcasing program impact across Africa.' }], imageSrc: '/team/mary-jane.jpg', linkedin: '#', twitter: '#', github: null },
  { id: 6, name: 'John Doe', role: 'Tech Lead', bio: 'John architects our dashboards, portals, and integrations—making sure trainers and participants have a friction-free digital experience.', portfolio: [{ title: 'Dashboard Revamp', description: 'Led a UI overhaul boosting user satisfaction by 40%.' }], imageSrc: '/team/john-doe.jpg', linkedin: '#', twitter: null, github: '#' },

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
    imageSrc: '/team/umuhake-lionel.jpg',
    linkedin: '#',
    twitter: null,
    github: null,
  },

  {
    id: 101,
    name: 'Margaret Jjuuko',
    role: 'Trainer | Communication, Management & Ethical Leadership',
    bio:
      'Margaret Jjuuko is a distinguished scholar and international trainer in communication, management, ethical standards, and soft skills development. She leads regional and global initiatives to strengthen professional excellence and integrity in media and education, champions capacity building and ethical leadership, and guides institutional growth through strategic and ethical governance.',
    portfolio: [
      { title: 'International Training', description: 'Led regional workshops and ethics-focused training programs.' },
      { title: 'Research Leadership', description: 'Principal Investigator on NORHED II and other capacity-building grants.' },
    ],
    imageSrc: '/team/margaret-jjuuko.jpg',
    linkedin: '#',
    twitter: null,
    github: null,
  },
  {
    id: 102,
    name: 'Ernest Safari',
    role: 'Trainer | Tourism, Hospitality & SME Growth',
    bio:
      'Ernest Safari is a seasoned trainer, researcher and coach guiding institutional growth through strategic and ethical leadership. With a doctorate in Tourism and Hospitality Management and extensive curriculum development experience for RTB and GIZ, he delivers practical solutions in tour planning, promotion, and logistics for vocational and industry training.',
    portfolio: [
      { title: 'Curriculum Development', description: 'RTB and GIZ curriculum contributions for tourism and vocational training.' },
      { title: 'Tourism Practice', description: 'Workshops on itinerary design, promotion and logistics.' },
    ],
    imageSrc: '/team/ernest-safari.jpg',
    linkedin: '#',
    twitter: null,
    github: null,
  },
  {
    id: 103,
    name: 'Joyce Kirabo',
    role: 'Trainer | Leadership, Counselling & Soft Skills',
    bio:
      'Joyce Kirabo leads Goodlife with strategic leadership and international training excellence. Holder of a PhD in Business Administration and masters in Counselling Psychology and Project Management, she designs transformative training that blends international best practices with local insights to open lasting opportunities for participants.',
    portfolio: [
      { title: 'Therapeutic Counselling', description: 'International counselling practice and coaching.' },
      { title: 'Leadership Programmes', description: 'Design and facilitation of leadership and soft skills curricula.' },
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
    imageSrc: '/team/mugisha-junior.jpg',
    linkedin: '#',
    twitter: null,
    github: null,
  },
]

/* ---------- Animation variants ---------- */
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.995 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.36, ease: 'easeOut' } },
}

/* ---------- UI constants ---------- */
const MAIN = '#0f766e' // teal-700
const ACCENT = '#ff6b6b' // coral
const LATTE = '#FFF3ED'

/* ---------- InlineDetail component (right panel) ---------- */
function InlineDetail({
  trainer,
  onOpenModal,
}: {
  trainer: TeamMember
  onOpenModal: () => void
}): JSX.Element {
  return (
    <aside aria-live="polite" className="w-full lg:w-[420px]">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative w-full h-72">
          <Image src={trainer.imageSrc} alt={trainer.name} fill style={{ objectFit: 'cover', objectPosition: 'center' }} sizes="(max-width: 1024px) 100vw, 420px" priority={false} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.02))' }} />
        </div>

        <div className="p-5">
          <h4 className="text-xl font-semibold" style={{ color: MAIN }}>
            {trainer.name}
          </h4>
          <p className="text-sm text-gray-600 mb-3">{trainer.role}</p>

          <div className="text-gray-700 mb-4">
            <p>{trainer.bio}</p>
          </div>

          <div className="mb-4">
            <h5 className="font-semibold mb-2">Honors and Accolades</h5>
            <ul className="list-disc list-inside space-y-1 text-gray-800">
              {trainer.portfolio.map((p, i) => (
                <li key={i}><strong>{p.title}:</strong> {p.description}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2">
            {trainer.linkedin && <a href={trainer.linkedin} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md" style={{ background: MAIN, color: '#fff' }} aria-label="LinkedIn"><Linkedin className="h-5 w-5" /><span className="text-sm">LinkedIn</span></a>}
            {trainer.twitter && <a href={trainer.twitter} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border" style={{ borderColor: MAIN }} aria-label="Twitter"><Twitter className="h-5 w-5" /><span className="text-sm">Twitter</span></a>}
            {trainer.github && <a href={trainer.github} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border" style={{ borderColor: MAIN }} aria-label="GitHub"><Github className="h-5 w-5" /><span className="text-sm">GitHub</span></a>}

            <div className="ml-auto">
              <button onClick={onOpenModal} className="inline-block px-4 py-2 rounded-md text-white" style={{ background: ACCENT }}>
                View profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

/* ---------- Main component (merged trainer list into single styled card) ---------- */
export default function TeamSection(): JSX.Element {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [showLeadTeam, setShowLeadTeam] = useState(true)
  const [selectedTrainerId, setSelectedTrainerId] = useState<number | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const thumbnailRefs = useRef<Record<number, HTMLButtonElement | null>>({})

  const boardMembers = useMemo(() => teamMembers.filter((m) => [7, 8, 9].includes(m.id)), [])
  const leadTeam = useMemo(() => [101, 102, 103, 104, 10].map((id) => teamMembers.find((m) => m.id === id)!).filter(Boolean), [])

  useEffect(() => { if (selectedTrainerId === null && leadTeam.length > 0) setSelectedTrainerId(leadTeam[0].id) }, [leadTeam, selectedTrainerId])

  useEffect(() => {
    if (!selectedMember) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedMember(null) }
    document.addEventListener('keydown', onKey)
    const prevActive = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      // restore focus to thumbnail if possible
      if (selectedMember) {
        const opener = thumbnailRefs.current[selectedMember.id]
        opener?.focus()
      } else {
        prevActive?.focus()
      }
    }
  }, [selectedMember])

  const openModalFor = (m: TeamMember) => setSelectedMember(m)
  const currentTrainer = useMemo(() => leadTeam.find((t) => t.id === selectedTrainerId) ?? leadTeam[0], [leadTeam, selectedTrainerId])

  return (
    <section id="team" className="py-20" style={{ background: 'linear-gradient(180deg,#f6fffb,#ffffff)' }}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold" style={{ color: MAIN }}>Our Team</h2>
          <div className="w-24 h-1 mx-auto mb-5 rounded" style={{ background: `linear-gradient(90deg, ${MAIN}, ${ACCENT})` }} />
          <p className="text-lg text-gray-700">Meet the passionate experts driving our mission. Select a trainer to read more.</p>
        </div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={containerVariants}>
          {boardMembers.map((m) => (
            <motion.article key={m.id} variants={cardVariants} className="relative rounded-xl overflow-hidden shadow-lg">
              <div className="relative min-h-[260px] rounded-xl overflow-hidden group">
                <Image src={m.imageSrc} alt={m.name} fill style={{ objectFit: 'cover', transform: 'scale(1.03)' }} sizes="(max-width: 1024px) 50vw, 33vw" priority={false} className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 transition-bg duration-500" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.54))' }} />

                <div className="absolute left-0 right-0 bottom-0 z-10 p-5">
                  <div className="flex items-start md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white drop-shadow-sm">{m.name}</h3>
                      <p className="text-sm text-white/95 drop-shadow-sm">{m.role}</p>
                    </div>

                    <motion.button whileHover={{ scale: 1.03, translateY: -2 }} whileTap={{ scale: 0.98 }} onClick={() => openModalFor(m)} className="inline-flex items-center gap-3 px-4 py-2 rounded-full font-medium shadow-lg focus:outline-none focus:ring-4" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))', color: '#fff', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.18)', boxShadow: '0 8px 24px rgba(15,118,110,0.14)' }} aria-label={`View profile for ${m.name}`}>
                      <span className="inline-flex items-center justify-center w-3 h-3 rounded-full" style={{ background: 'linear-gradient(90deg, rgba(255,107,107,1), rgba(15,118,110,1))', boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }} aria-hidden="true" />
                      <span className="text-sm">View profile</span>
                    </motion.button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {m.portfolio.map((p, i) => (
                      <span key={i} className="px-3 py-1 rounded-full text-sm font-medium" style={{ background: '#fff', color: '#111827', boxShadow: '0 6px 18px rgba(15,118,110,0.06)' }} title={p.description}>
                        {p.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-3xl font-bold text-center mb-6" style={{ color: MAIN }}>Trainer Team</h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="col-span-2">
              <div className="rounded-xl shadow-lg overflow-hidden" style={{ background: 'linear-gradient(180deg,#e9f9f5,#f5fffb)', border: `1px solid rgba(15,118,110,0.06)` }}>
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-3" style={{ color: MAIN }}>Our Lead Trainers</h4>
                  <p className="text-gray-700 mb-6">A compact list of lead trainers. Click Read more to load the trainer details on the right panel.</p>

                  <div className="grid grid-cols-1 gap-4">
                    {leadTeam.map((m) => {
                      const isSelected = selectedTrainerId === m.id
                      const preview = m.bio.split('.').slice(0, 2).join('.').trim() + '.'
                      return (
                        <div key={m.id} className={`relative flex flex-col gap-3 p-4 rounded-lg ${isSelected ? 'shadow-md' : ''}`} style={{ background: isSelected ? 'linear-gradient(90deg,#ecfff7,#f0fffb)' : 'transparent' }}>
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center overflow-hidden" style={{ boxShadow: '0 6px 18px rgba(15,118,110,0.06)' }}>
                              <Image src={m.imageSrc} alt={m.name} width={48} height={48} style={{ objectFit: 'cover' }} />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold" style={{ color: MAIN }}>{m.name}</div>
                              <div className="text-xs text-gray-600">{m.role}</div>
                              <p className="text-sm text-gray-700 mt-2 truncate">{preview}</p>

                              <div className="flex flex-wrap gap-2 mt-3">
                                {m.portfolio.map((p, i) => (
                                  <span key={i} className="px-2 py-0.5 rounded-full text-xs" style={{ background: LATTE, color: '#2b2b2b' }}>{p.title}</span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end">
                            <button
                              onClick={() => setSelectedTrainerId(m.id)}
                              ref={(el) => (thumbnailRefs.current[m.id] = el)}
                              className="inline-flex items-center px-4 py-2 rounded-md border"
                              style={{ background: isSelected ? MAIN : '#fff', color: isSelected ? '#fff' : MAIN, borderColor: 'rgba(15,118,110,0.12)' }}
                              aria-label={`Read more for ${m.name}`}
                            >
                              <span className="text-sm">Read more</span>
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1">
              {currentTrainer && <InlineDetail trainer={currentTrainer} onOpenModal={() => openModalFor(currentTrainer)} />}
            </div>
          </div>
        </div>
      </div>

      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="team-modal-title" ref={modalRef} onClick={(e) => { if (e.target === modalRef.current) setSelectedMember(null) }}>
          <motion.div initial={{ opacity: 0, y: 12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.26, ease: 'easeOut' }} className="relative w-full max-w-4xl rounded-lg overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative min-h-[360px]">
                <Image src={selectedMember.imageSrc} alt={selectedMember.name} fill style={{ objectFit: 'cover' }} sizes="50vw" priority />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.42), rgba(0,0,0,0.02))' }} />
              </div>

              <div className="p-6 bg-white">
                <button ref={closeButtonRef} onClick={() => setSelectedMember(null)} className="absolute top-4 right-4 text-2xl text-gray-700" aria-label="Close profile">&times;</button>

                <h3 id="team-modal-title" className="text-2xl font-bold mb-1" style={{ color: MAIN }}>{selectedMember.name}</h3>
                <p className="text-sm mb-4" style={{ color: ACCENT }}>{selectedMember.role}</p>

                <div className="text-gray-800 mb-4"><p>{selectedMember.bio}</p></div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Portfolio</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-800">
                    {selectedMember.portfolio.map((p, i) => (<li key={i}><strong>{p.title}:</strong> {p.description}</li>))}
                  </ul>
                </div>

                <div className="flex items-center gap-3">
                  {selectedMember.linkedin && <a href={selectedMember.linkedin} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md" style={{ background: MAIN, color: '#fff' }} aria-label="LinkedIn"><Linkedin className="h-5 w-5" /><span className="text-sm">LinkedIn</span></a>}
                  {selectedMember.twitter && <a href={selectedMember.twitter} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border" style={{ borderColor: MAIN }} aria-label="Twitter"><Twitter className="h-5 w-5" /><span className="text-sm">Twitter</span></a>}
                  {selectedMember.github && <a href={selectedMember.github} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border" style={{ borderColor: MAIN }} aria-label="GitHub"><Github className="h-5 w-5" /><span className="text-sm">GitHub</span></a>}

                  <div className="ml-auto"><Link href="/contact" className="inline-block px-4 py-2 rounded-md" style={{ background: ACCENT, color: '#fff' }}>Contact</Link></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  )
}