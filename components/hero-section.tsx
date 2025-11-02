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
  ArrowUpRight,
  Twitter,
  Linkedin,
  Facebook,
  Users,
  Building,
  Target,
} from 'lucide-react';

const inter = Inter({ subsets: ['latin'], weight: ['400','700'] });
const lora = Lora({ subsets: ['latin'], weight: ['400','700'] });
const blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==';

const SliderContent = ({ slide, images, setSlide }) => {
  const prev = () => setSlide((s) => (s === 0 ? images.length - 1 : s - 1));
  const next = () => setSlide((s) => (s === images.length - 1 ? 0 : s + 1));

  return (
    <div className="relative mb-6">
      <div className="relative">
        <div className="relative w-full aspect-[4/3] md:aspect-video overflow-hidden">
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
              <figcaption className="absolute right-4 bottom-4 bg-[#1b6981] text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg">
                {images[slide].caption}
              </figcaption>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 p-3 rounded-full hover:bg-white transition border border-[#e2e8f0] shadow-lg hover:shadow-xl"
        >
          <ChevronLeft className="w-5 h-5 text-[#383f41]" />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 p-3 rounded-full hover:bg-white transition border border-[#e2e8f0] shadow-lg hover:shadow-xl"
        >
          <NextIcon className="w-5 h-5 text-[#383f41]" />
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setSlide(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === slide ? 'bg-[#1b6981] scale-110' : 'bg-[#e2e8f0] hover:bg-[#cbd5e1]'
            }`}
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
    const primaryLink = 'https://goodlifeconsulting.pro/auth';
    const fallbackLink = 'https://goodlife-e-portal.vercel.app/auth';
    
    const newWindow = window.open(primaryLink, '_blank');
    
    setTimeout(() => {
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        window.open(fallbackLink, '_blank');
      }
    }, 1000);
  };

  const stats = [
    { icon: Building, number: '50+', label: 'Organizations' },
    { icon: Users, number: '100+', label: 'Trainees' },
    { icon: Target, number: '98%', label: 'Success Rate' }
  ];

  return (
    <section
      id="home"
      className={`${inter.className} relative overflow-hidden bg-white w-full`}
      aria-label="Hero section"
    >
      {/* Progress Indicator */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 origin-left bg-[#1b6981] z-50"
        style={{ scaleX }}
      />

      {/* Full width container */}
      <div className="w-full">
        <motion.div
          className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20"
          initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 items-start">
            {/* Left Content - Full width on mobile, 50% on desktop */}
            <div className="flex-1 w-full lg:max-w-[50%]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-8 bg-[#d25c27] rounded-full"></div>
                <span className="text-[#769f3f] font-semibold text-sm uppercase tracking-wide">Professional Development</span>
              </div>

              <h1
                className={`${lora.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#383f41] mb-4 sm:mb-6 leading-tight`}
              >
                Transform Your{' '}
                <span className="text-[#1b6981]">Career</span>{' '}
                with Expert-Led Training
              </h1>

              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <p className="text-base sm:text-lg text-[#383f41] leading-relaxed">
                  At Goodlife Consulting Partners, we bridge academic excellence with real-world application. 
                  Our comprehensive training programs are designed by industry experts to equip professionals 
                  with cutting-edge skills for today's competitive landscape.
                </p>
                <p className="text-base sm:text-lg text-[#383f41] leading-relaxed">
                  Through corporate training and professional internships, we empower individuals and 
                  organizations to achieve measurable growth and sustainable success.
                </p>
              </div>

              {/* Action Buttons - Stack on mobile, row on desktop */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <motion.button
                  onClick={handleStartJourney}
                  whileHover={!reduceMotion && { scale: 1.02, y: -2 }}
                  whileTap={!reduceMotion && { scale: 0.98 }}
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-[#d25c27] text-white font-semibold rounded-lg sm:rounded-xl hover:bg-[#bb3b32] transition-all duration-300 shadow-lg hover:shadow-xl group text-base sm:text-lg"
                >
                  Start Your Journey
                  <ArrowUpRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </motion.button>

                <Link href="#programs" className="w-full sm:w-auto">
                  <motion.button
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#1b6981] text-[#1b6981] font-semibold rounded-lg sm:rounded-xl hover:bg-[#1b6981] hover:text-white transition-all duration-300 text-base sm:text-lg"
                    whileHover={!reduceMotion && { scale: 1.02 }}
                    whileTap={!reduceMotion && { scale: 0.98 }}
                  >
                    Explore Programs
                    <ChevronDown className="ml-2 w-4 h-4" />
                  </motion.button>
                </Link>
              </div>

              {/* Stats - 3 columns on mobile and desktop */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
                    animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    className="text-center"
                  >
                    <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#769f3f] mx-auto mb-1 sm:mb-2" />
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#383f41]">{stat.number}</div>
                    <div className="text-xs sm:text-sm text-[#383f41] font-medium leading-tight">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 pt-4 border-t border-[#e2e8f0]">
                <span className="text-sm text-[#383f41] font-medium whitespace-nowrap">Follow us:</span>
                <div className="flex items-center gap-4">
                  <Link href="#" aria-label="Follow on LinkedIn">
                    <Linkedin className="w-5 h-5 text-[#383f41] hover:text-[#1b6981] transition-colors duration-300" />
                  </Link>
                  <Link href="#" aria-label="Follow on Twitter">
                    <Twitter className="w-5 h-5 text-[#383f41] hover:text-[#1b6981] transition-colors duration-300" />
                  </Link>
                  <Link href="#" aria-label="Follow on Facebook">
                    <Facebook className="w-5 h-5 text-[#383f41] hover:text-[#1b6981] transition-colors duration-300" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Content - Slider - Full width on mobile, 50% on desktop */}
            <div className="flex-1 w-full lg:max-w-[50%] mt-8 lg:mt-0">
              <div className="relative">
                <Slider slide={slide} images={images} setSlide={setSlide} />
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-4 sm:mt-6 p-4 sm:p-6 bg-[#f8fafc] rounded-xl sm:rounded-2xl border border-[#e2e8f0]"
                >
                  <p className="text-base sm:text-lg text-[#383f41] leading-relaxed font-medium">
                    {images[slide].description}
                  </p>
                </motion.div>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6">
                  <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#769f3f] text-white text-xs sm:text-sm font-medium rounded-full">
                    Industry Experts
                  </span>
                  <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#1b6981] text-white text-xs sm:text-sm font-medium rounded-full">
                    Practical Skills
                  </span>
                  <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#dd8426] text-white text-xs sm:text-sm font-medium rounded-full">
                    Career Growth
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}