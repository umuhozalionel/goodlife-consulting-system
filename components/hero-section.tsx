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
const blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==';

const SliderContent = ({ slide, images, setSlide }) => {
  const prev = () => setSlide((s) => (s === 0 ? images.length - 1 : s - 1));
  const next = () => setSlide((s) => (s === images.length - 1 ? 0 : s + 1));

  return (
    <div className="relative mb-6">
      <div className="relative pt-8">
        <div className="relative w-full pb-[56.25%] overflow-hidden">
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
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full hover:bg-white transition border border-gray-200"
        >
          <ChevronLeft className="w-6 h-6 text-[#0f172a]" />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full hover:bg-white transition border border-gray-200"
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
      src: '/images/hero/business-focus.jpg',
      alt: 'Business Focus',
      caption: 'Set your skills on a new level with business industry experts',
      description: 'We bridge theory and practice in business by empowering Rwanda\'s future leaders with world-class internships guided by industry experts.',
    },
    {
      src: '/images/hero/tourism-focus.jpg',
      alt: 'Tourism Focus', 
      caption: 'Discover Rwanda\'s hidden treasures with expert guidance',
      description: 'We bridge theory and practice in tourism by empowering Rwanda\'s future leaders through immersive internships discovering hidden treasures.',
    },
    {
      src: '/images/hero/tech-focus.jpg',
      alt: 'ICT Focus',
      caption: 'Innovate the future with cutting-edge tech skills',
      description: 'We bridge theory and practice in ICT by equipping Rwanda\'s future leaders with cutting-edge internships and hands-on mentorship to drive digital innovation.',
    },
  ];

  const handleStartJourney = () => {
    // Try first link, if it fails try second link
    const primaryLink = 'https://goodlifeconsulting.pro/auth';
    const fallbackLink = 'https://goodlife-e-portal.vercel.app/auth';
    
    // Open primary link in new tab
    const newWindow = window.open(primaryLink, '_blank');
    
    // If primary fails to open, try fallback after a short delay
    setTimeout(() => {
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        window.open(fallbackLink, '_blank');
      }
    }, 1000);
  };

  return (
    <section
      id="home"
      className={`${inter.className} relative overflow-hidden bg-white`}
      aria-label="Hero section"
    >
      <motion.div
        className="absolute top-0 left-0 w-full h-1 origin-left bg-[#0c4a6e]"
        style={{ scaleX }}
      />

      <div className="max-w-full mx-auto">
        <motion.div
          className="relative z-10 p-6 md:p-8 lg:p-12"
          initial={reduceMotion ? {} : { opacity: 0, scale: 1.05 }}
          animate={reduceMotion ? {} : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="flex-1">
              <h1
                className={`flex items-center ${lora.className} text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f172a] mb-6`}
              >
                {!reduceMotion && (
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <Hand className="w-8 h-8 text-[#0f172a]" />
                  </motion.span>
                )}
                <span className="ml-3">Welcome to Goodlife Consulting Partners.</span>
              </h1>

              <div className="space-y-4 mb-8">
                <p className="text-lg text-[#0f172a] leading-relaxed">
                  At Goodlife Consulting Partners, we are dedicated to fostering
                  professional growth and development through our comprehensive
                  training programs.
                </p>
                <p className="text-lg text-[#0f172a] leading-relaxed">
                  Our mission is to equip individuals and organizations with the
                  skills and knowledge necessary to thrive in today's competitive
                  landscape.
                </p>
                <p className="text-lg text-[#0f172a] leading-relaxed">
                  Our corporate training programs and industry professional
                  internships equip teams with the skills they need to excel in
                  today's market.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                <Link href="/blog/practical-projects">
                  <button className="px-5 py-3 bg-[#0f172a] text-white font-semibold hover:bg-[#0c4a6e] transition">
                    Practical Projects
                  </button>
                </Link>
                <Link href="/blog/expert-mentors">
                  <button className="px-5 py-3 bg-[#0f172a] text-white font-semibold hover:bg-[#0c4a6e] transition">
                    Expert Mentors
                  </button>
                </Link>
              </div>

              <div className="mb-8">
                <Link href="#programs">
                  <motion.button
                    className="inline-flex items-center px-8 py-4 bg-[#0f172a] text-white font-semibold hover:bg-[#0c4a6e] transition"
                    whileHover={!reduceMotion && { scale: 1.05 }}
                    whileTap={!reduceMotion && { scale: 0.95 }}
                  >
                    Explore Programs
                    <ChevronDown className="ml-2 w-4 h-4" />
                  </motion.button>
                </Link>
              </div>

              <div className="flex items-center space-x-5">
                <Link href="#" aria-label="Follow on Twitter">
                  <Twitter className="w-6 h-6 text-[#0f172a] hover:text-[#0c4a6e] transition" />
                </Link>
                <Link href="#" aria-label="Follow on LinkedIn">
                  <Linkedin className="w-6 h-6 text-[#0f172a] hover:text-[#0c4a6e] transition" />
                </Link>
                <Link href="#" aria-label="Follow on Facebook">
                  <Facebook className="w-6 h-6 text-[#0f172a] hover:text-[#0c4a6e] transition" />
                </Link>
              </div>
            </div>

            <div className="flex-1 flex flex-col relative">
              <motion.button
                onClick={handleStartJourney}
                className="absolute top-0 right-0 z-20 inline-flex items-center px-5 py-3 bg-[#0f172a] text-white font-semibold hover:bg-[#0c4a6e] transition"
                whileHover={!reduceMotion && { scale: 1.05 }}
                whileTap={!reduceMotion && { scale: 0.95 }}
              >
                Start Your Journey
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </motion.button>

              <Slider slide={slide} images={images} setSlide={setSlide} />

              <p className="text-lg text-[#0f172a] leading-relaxed mb-8">
                {images[slide].description}
              </p>

              <div className="inline-flex items-center bg-gray-100 px-4 py-2 rounded-lg text-[#0f172a] font-medium">
                <div className="flex -space-x-2 mr-3">
                  <div className="w-8 h-8 bg-[#0c4a6e] rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-[#0f172a] rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-[#0c4a6e] rounded-full border-2 border-white"></div>
                </div>
                <span>50+ Organizations Partnered</span>
                <span className="mx-3">•</span>
                <span>100+ Recent Trainees</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}