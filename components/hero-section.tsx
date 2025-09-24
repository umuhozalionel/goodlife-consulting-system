// components/hero-section.tsx
'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion';
import { Inter, Lora } from 'next/font/google';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight as NextIcon,
  Hand,
  ArrowUpRight,
} from 'lucide-react';

const inter = Inter({ subsets: ['latin'], weight: ['400','700'] });
const lora = Lora({ subsets: ['latin'], weight: ['400','700'] });

export default function HeroSection() {
  const [slide, setSlide] = useState(0);
  const images = [
    {
      src: '/trainee-overview.jpg',
      alt: 'Business Focus',
      caption:
        'Set your skills on a new level with business industry experts',
    },
    {
      src: '/tourism-overview.jpg',
      alt: 'Tourism Focus',
      caption:
        'Discover Rwanda’s hidden treasures with expert guidance',
    },
    {
      src: '/tech-overview.jpg',
      alt: 'Technology Focus',
      caption:
        'Innovate the future with cutting-edge tech skills',
    },
  ];

  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const sliderRef = useRef(null);
  useInView(sliderRef, { once: true });

  const prevSlide = () =>
    setSlide((s) => (s === 0 ? images.length - 1 : s - 1));
  const nextSlide = () =>
    setSlide((s) => (s === images.length - 1 ? 0 : s + 1));

  return (
    <section
      id="home"
      className={`${inter.className} relative overflow-hidden pt-20 pb-8`}
      aria-label="Hero section"
    >
      <motion.div
        className="absolute top-0 left-0 w-full h-1 origin-left bg-gradient-to-r from-[#1E3A8A] to-[#F97316]"
        style={{ scaleX }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <Image
              src="/images/hero-bg/yakin-17.jpg"
              alt="Hero background"
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                transform: 'scale(1.1)',
                transformOrigin: 'center',
              }}
              quality={100}
              priority
            />
            {/* Reduced overlay opacity */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-transparent to-orange-500/5 backdrop-blur-sm pointer-events-none" />
          </div>

          {/* Content */}
          <motion.div
            className="relative z-10 p-8 bg-transparent"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col md:flex-row gap-12">
              {/* Left card */}
              <div className="flex-1 bg-[#FFFBEB]/70 backdrop-blur-md p-6 rounded-xl">
                <h1
                  className={`flex items-center ${lora.className} text-3xl font-semibold text-[#1E3A8A]`}
                >
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <Hand className="w-8 h-8 text-[#1E3A8A]" />
                  </motion.span>
                  <span className="ml-2">
                    Welcome to Goodlife Consulting Partners
                  </span>
                </h1>

                <p className="mt-4 text-lg text-[#1E3A8A]">
                  We’re a professional internship partner that bridges
                  theory and practice.
                </p>
                <p className="mt-2 leading-relaxed text-[#1E3A8A]">
                  Empowering Rwanda’s future leaders through world-class
                  internships and hands-on mentorship.
                </p>
                <p className="mt-2 leading-relaxed text-[#1E3A8A]">
                  Our corporate training programs equip teams with the skills
                  they need to excel in today’s market.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Link href="/blog/practical-projects">
                    <button className="px-4 py-2 bg-white text-[#1E3A8A] rounded-md hover:bg-gray-100 transition">
                      Practical Projects
                    </button>
                  </Link>
                  <Link href="/blog/expert-mentors">
                    <button className="px-4 py-2 bg-white text-[#1E3A8A] rounded-md hover:bg-gray-100 transition">
                      Expert Mentors
                    </button>
                  </Link>
                </div>

                <div className="mt-8 inline-flex items-center bg-white/20 px-4 py-1 rounded-full">
                  <div className="-space-x-2 flex">
                    <Image
                      src="/avatars/user1.jpg"
                      width={32}
                      height={32}
                      className="rounded-full border-2 border-white"
                      alt="avatar 1"
                    />
                    <Image
                      src="/avatars/user2.jpg"
                      width={32}
                      height={32}
                      className="rounded-full border-2 border-white"
                      alt="avatar 2"
                    />
                    <Image
                      src="/avatars/user3.jpg"
                      width={32}
                      height={32}
                      className="rounded-full border-2 border-white"
                      alt="avatar 3"
                    />
                  </div>
                  <span className="ml-3 text-sm text-[#1E3A8A] font-medium">
                    We’re trusted by thousands
                  </span>
                </div>

                <div className="mt-6">
                  <Link href="#programs">
                    <button className="inline-flex items-center px-6 py-3 bg-gradient-to-l from-[#F97316] to-[#1E3A8A] text-white font-medium rounded-full shadow-lg ring-1 ring-white hover:from-[#1E3A8A] hover:to-[#F97316] transition">
                      Explore Programs
                      <ChevronDown className="ml-2 w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>

              {/* Slider */}
              <motion.section
                ref={sliderRef}
                className="flex-1 relative mb-6 md:mb-0"
                role="region"
                aria-label="Slider"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative pt-8">
                  <div
                    className="relative w-full pb-[56.25%] overflow-hidden"
                    style={{ boxShadow: '0 0 8px rgba(249,115,22,0.5)' }}
                  >
                    <AnimatePresence initial={false} mode="wait">
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
                          className="object-cover filter brightness-90"
                          priority
                        />
                        <figcaption className="absolute right-4 bottom-4 bg-[#1E3A8A]/90 text-white px-3 py-1 rounded text-sm">
                          {images[slide].caption}
                        </figcaption>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <button
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/60 p-2 rounded-full hover:bg-white transition"
                  >
                    <ChevronLeft className="w-6 h-6 text-[#1E3A8A]" />
                  </button>
                  <button
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/60 p-2 rounded-full hover:bg-white transition"
                  >
                    <NextIcon className="w-6 h-6 text-[#1E3A8A]" />
                  </button>
                </div>
                <div className="mt-4 flex justify-center gap-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSlide(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className={`w-3 h-3 rounded-full ${
                        idx === slide ? 'bg-[#1E3A8A]' : 'bg-gray-300'
                      } transition`}
                    />
                  ))}
                </div>
              </motion.section>
            </div>
          </motion.div>

          {/* CTA + mobile scroll */}
          <div className="md:absolute md:bottom-5 md:right-8 z-30 mt-6 md:mt-0 w-full md:w-auto flex flex-col items-center md:items-end">
            <Link
              href="/signup/trainee"
              className="flex items-center px-8 py-4 bg-[#F97316] text-white font-semibold shadow-lg transition-all hover:scale-105 clip-path-parallelogram"
            >
              <span className="inline-block">Start Your Journey</span>
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Link>
            <motion.div
              className="mt-4 md:hidden"
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              aria-label="Scroll down"
            >
              <ChevronDown className="w-6 h-6 text-[#1E3A8A]" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Desktop scroll indicator */}
      <motion.div
        className="hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6 text-[#1E3A8A]" />
      </motion.div>
    </section>
  );
}