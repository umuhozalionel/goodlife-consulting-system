// components/hero-section.tsx
'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { Inter, Lora } from 'next/font/google';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight as NextIcon,
  Hand,
  ArrowUpRight,
  Twitter,
  Linkedin,
  Facebook,
} from 'lucide-react';

const inter = Inter({ subsets: ['latin'], weight: ['400','700'] });
const lora = Lora({ subsets: ['latin'], weight: ['400','700'] });
const blurDataURL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==';

const SliderContent = ({ slide, images, setSlide }) => {
  const prev = () => setSlide((s) => (s === 0 ? images.length - 1 : s - 1));
  const next = () => setSlide((s) => (s === images.length - 1 ? 0 : s + 1));

  return (
    <div className="relative mb-6">
      <div className="relative pt-8">
        <div
          className="relative w-full pb-[56.25%] overflow-hidden rounded-xl"
          style={{ boxShadow: '0 0 12px rgba(0,0,0,0.2)' }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <Image
                src={images[slide].src}
                alt={images[slide].alt}
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL={blurDataURL}
                priority={slide === 0}
              />
              <figcaption className="absolute right-4 bottom-4 bg-[#0c4a6e] text-white px-3 py-1 rounded text-sm">
                {images[slide].caption}
              </figcaption>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition"
        >
          <ChevronLeft className="w-6 h-6 text-[#0f172a]" />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition"
        >
          <NextIcon className="w-6 h-6 text-[#0f172a]" />
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setSlide(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`w-3 h-3 rounded-full ${
              idx === slide ? 'bg-[#0c4a6e]' : 'bg-gray-300'
            } transition`}
          />
        ))}
      </div>
    </div>
  );
};

const Slider = dynamic(() => Promise.resolve({ default: SliderContent }), {
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center">Loading…</div>,
});

export default function HeroSection() {
  const [slide, setSlide] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const images = [
    {
      src: '/trainee-overview.jpg',
      alt: 'Business Focus',
      caption: 'Set your skills on a new level with business industry experts',
      description:
        'We bridge theory and practice in business by empowering Rwanda’s future leaders with world-class internships guided by industry experts.',
    },
    {
      src: '/tourism-overview.jpg',
      alt: 'Tourism Focus',
      caption: 'Discover Rwanda’s hidden treasures with expert guidance',
      description:
        'We bridge theory and practice in tourism by empowering Rwanda’s future leaders through immersive internships discovering hidden treasures.',
    },
    {
      src: '/tech-overview.jpg',
      alt: 'ICT Focus',
      caption: 'Innovate the future with cutting-edge tech skills',
      description:
        'We bridge theory and practice in ICT by equipping Rwanda’s future leaders with cutting-edge internships and hands-on mentorship to drive digital innovation.',
    },
  ];

  return (
    <section
      id="home"
      className={`${inter.className} relative overflow-hidden pt-20 pb-8`}
      aria-label="Hero section"
    >
      <motion.div
        className="absolute top-0 left-0 w-full h-1 origin-left bg-gradient-to-r from-teal-500 to-sky-500"
        style={{ scaleX }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <Image
              src="/images/hero-bg/yakin-17.jpg"
              alt="Hero background"
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL={blurDataURL}
              priority
            />
            <div className="absolute inset-0 bg-[#f0fdfa]/50 backdrop-blur-sm pointer-events-none" />
          </div>

          <motion.div
            className="relative z-10 p-8"
            initial={reduceMotion ? {} : { opacity: 0, scale: 1.05 }}
            animate={reduceMotion ? {} : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col md:flex-row gap-12">
              <div className="flex-1 bg-white p-6 rounded-xl">
                <h1
                  className={`flex items-center ${lora.className} text-3xl md:text-4xl font-bold text-[#0f172a]`}
                >
                  {!reduceMotion && (
                    <motion.span
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      <Hand className="w-8 h-8 text-[#0f172a]" />
                    </motion.span>
                  )}
                  <span className="ml-2">Welcome to Goodlife Consulting Partners.</span>
                </h1>

                <p className="mt-4 text-lg text-[#0f172a]">
                  At Goodlife Consulting Partners, we are dedicated to fostering
                  professional growth and development through our comprehensive
                  training programs.
                </p>
                <p className="mt-2 text-lg text-[#0f172a]">
                  Our mission is to equip individuals and organizations with the
                  skills and knowledge necessary to thrive in today’s competitive
                  landscape.
                </p>
                <p className="mt-6 text-lg text-[#0f172a]">
                  Our corporate training programs and industry professional
                  internships equip teams with the skills they need to excel in
                  today’s market.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Link href="/blog/practical-projects">
                    <button className="px-4 py-2 bg-[#0f172a] text-white font-semibold">
                      Practical Projects
                    </button>
                  </Link>
                  <Link href="/blog/expert-mentors">
                    <button className="px-4 py-2 bg-[#0f172a] text-white font-semibold">
                      Expert Mentors
                    </button>
                  </Link>
                </div>

                <div className="mt-6">
                  <Link href="#programs">
                    <motion.button
                      className="inline-flex items-center px-6 py-3 bg-[#0f172a] text-white font-semibold"
                      whileHover={!reduceMotion && { scale: 1.05 }}
                      whileTap={!reduceMotion && { scale: 0.95 }}
                    >
                      Explore Programs
                      <ChevronDown className="ml-2 w-4 h-4" />
                    </motion.button>
                  </Link>
                </div>

                <div className="mt-6 flex items-center space-x-4">
                  <Link href="#" aria-label="Follow on Twitter">
                    <Twitter className="w-6 h-6 text-[#0f172a] hover:text-[#0f172a]/70 transition" />
                  </Link>
                  <Link href="#" aria-label="Follow on LinkedIn">
                    <Linkedin className="w-6 h-6 text-[#0f172a] hover:text-[#0f172a]/70 transition" />
                  </Link>
                  <Link href="#" aria-label="Follow on Facebook">
                    <Facebook className="w-6 h-6 text-[#0f172a] hover:text-[#0f172a]/70 transition" />
                  </Link>
                </div>
              </div>

              <div className="flex-1 flex flex-col relative">
                <Link href="/signup/trainee">
                  <motion.button
                    className="absolute top-4 right-4 z-20 inline-flex items-center px-4 py-2 bg-[#0f172a] text-white font-semibold"
                    whileHover={!reduceMotion && { scale: 1.05 }}
                    whileTap={!reduceMotion && { scale: 0.95 }}
                  >
                    Start Your Journey
                    <ArrowUpRight className="ml-2 w-4 h-4" />
                  </motion.button>
                </Link>

                <Slider slide={slide} images={images} setSlide={setSlide} />

                <p className="mt-6 text-lg text-[#0f172a] leading-relaxed">
                  {images[slide].description}
                </p>

                <div className="mt-6 inline-flex items-center bg-white/20 px-4 py-1 rounded-full text-[#0f172a] font-medium">
                  <Image
                    src="/avatars/user1.jpg"
                    width={32}
                    height={32}
                    className="rounded-full"
                    alt="avatar 1"
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                  />
                  <Image
                    src="/avatars/user2.jpg"
                    width={32}
                    height={32}
                    className="rounded-full"
                    alt="avatar 2"
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                  />
                  <Image
                    src="/avatars/user3.jpg"
                    width={32}
                    height={32}
                    className="rounded-full"
                    alt="avatar 3"
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                  />
                  <span className="ml-3">50+ Organizations Partnered</span>
                  <span className="mx-2">|</span>
                  <span>100+ Recent Trainees</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2"
        animate={!reduceMotion && { y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6 text-[#0f172a]" />
      </motion.div>
    </section>
  );
}