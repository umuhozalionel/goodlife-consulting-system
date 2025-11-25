// components/hero-section.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Inter, Poppins } from 'next/font/google';
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Award,
  TrendingUp,
  Sparkles,
  Clock,
  BadgeCheck,
} from 'lucide-react';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['600', '700', '800'] });

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className }: HeroSectionProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const reduceMotion = useReducedMotion();

  const testimonials = [
    {
      quote: "The corporate training transformed our team's productivity by 40%",
      author: "Sarah M., HR Director",
      company: "Tech Solutions Ltd"
    },
    {
      quote: "Best investment in my career. The mentorship was invaluable",
      author: "Jean Claude, Marketing Manager",
      company: "BK Group"
    },
    {
      quote: "Professional, practical, and results-driven training programs",
      author: "Grace K., Business Owner",
      company: "Kigali Ventures"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]); 

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
    { icon: Users, value: '500+', label: 'Professionals Trained', color: 'from-blue-500 to-cyan-500' },
    { icon: Award, value: '50+', label: 'Partner Organizations', color: 'from-purple-500 to-pink-500' },
    { icon: TrendingUp, value: '98%', label: 'Success Rate', color: 'from-orange-500 to-red-500' },
  ];

  const benefits = [
    'Expert-led training programs',
    'Industry-recognized certifications',
    'Flexible learning schedules',
    'Career advancement support'
  ];

  return (
    <section
      id="home"
      className={`${inter.className} relative overflow-hidden bg-gradient-to-br from-surface via-primary/5 to-primary/10 w-full ${className}`} 
      aria-label="Hero section"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, x: -30 }}
            animate={reduceMotion ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/10 rounded-full border border-primary/20"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Transform Your Career Today</span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className={`${poppins.className} text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight`}>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-text-primary via-text-primary/90 to-text-primary">
                  Build Skills that
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary">
                  Shape Your Future
                </span>
              </h1>

              <p className="text-lg md:text-xl text-text-muted leading-relaxed max-w-xl">
                Join Rwanda's leading professional development platform. Expert-led training programs designed to accelerate your career growth and organizational success.
              </p>
            </div>

            {/* Benefits List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={reduceMotion ? {} : { opacity: 0, x: -20 }}
                  animate={reduceMotion ? {} : { opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm md:text-base text-text-muted font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.button
                onClick={handleStartJourney}
                whileHover={!reduceMotion && { scale: 1.02, y: -2 }}
                whileTap={!reduceMotion && { scale: 0.98 }}
                className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-primary-dark opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.button>

              <Link href="#membership">
                <motion.button
                  whileHover={!reduceMotion && { scale: 1.02 }}
                  whileTap={!reduceMotion && { scale: 0.98 }}
                  className="w-full sm:w-auto px-8 py-4 bg-surface border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-md"
                >
                  View Membership
                </motion.button>
              </Link>
            </div>

            {/* Membership Pricing Highlight */}
            <motion.div
              initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl"
            >
              <div className="p-2 bg-green-100 rounded-lg">
                <BadgeCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-text-primary mb-1">Limited Time Offer</p>
                <p className="text-sm text-text-muted">
                  <span className="font-bold text-lg text-green-600">30,000 RWF</span> for 3 months membership
                  <span className="block text-xs mt-1">Full access to all programs and resources</span>
                </p>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border-soft">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
                    animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-10 mb-2`}>
                      <Icon className="w-5 h-5 text-text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-text-primary">{stat.value}</div>
                    <div className="text-xs text-text-muted font-medium">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Content - Visual Section */}
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, x: 30 }}
            animate={reduceMotion ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Main Image Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/hero/business-focus.jpg"
                  alt="Professional training session"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Floating Badge */}
                <div className="absolute top-6 right-6 px-4 py-2 bg-surface/95 backdrop-blur-sm rounded-full shadow-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-text-primary">Flexible Schedule</span>
                  </div>
                </div>

                {/* Bottom Testimonial Card */}
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-6 left-6 right-6 p-4 bg-surface/95 backdrop-blur-md rounded-2xl shadow-xl"
                >
                  <p className="text-sm text-text-primary font-medium mb-2 italic">
                    "{testimonials[currentTestimonial].quote}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-text-primary">
                        {testimonials[currentTestimonial].author}
                      </p>
                      <p className="text-xs text-text-muted">
                        {testimonials[currentTestimonial].company}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {testimonials.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${
                            idx === currentTestimonial ? 'bg-primary w-6' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Floating Feature Cards */}
            <motion.div
              initial={reduceMotion ? {} : { opacity: 0, scale: 0.8 }}
              animate={reduceMotion ? {} : { opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-6 -left-6 p-4 bg-surface rounded-2xl shadow-xl border border-border-soft"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-primary/80 to-primary rounded-xl">
                  <Award className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-bold text-text-primary">Certified Programs</p>
                  <p className="text-xs text-text-muted">Industry recognized</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={reduceMotion ? {} : { opacity: 0, scale: 0.8 }}
              animate={reduceMotion ? {} : { opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="absolute -bottom-6 -right-6 p-4 bg-surface rounded-2xl shadow-xl border border-border-soft"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-primary/80 to-primary rounded-xl">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-bold text-text-primary">Expert Mentors</p>
                  <p className="text-xs text-text-muted">Real-world guidance</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-16 fill-surface" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}