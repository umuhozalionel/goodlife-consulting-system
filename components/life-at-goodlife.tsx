// components/life-at-goodlife.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X, ChevronDown, ChevronUp, Play, Pause } from "lucide-react";

type Slide = {
  src: string;
  testimonial: string;
  author: string;
  role: string;
};

type Faq = {
  question: string;
  answer: string;
};

export default function LifeAtGoodlife() {
  const slides: Slide[] = [
    {
      src: "/images/life-1.jpg",
      testimonial: "The Child-Parent Career Goal Clash workshop helped me align my aspirations with my family's expectations.",
      author: "Harriet Nkurunziza",
      role: "Career Guidance Participant"
    },
    {
      src: "/images/life-2.jpg", 
      testimonial: "The Career Guidance session opened my eyes to all my options and boosted my confidence every step of the way.",
      author: "Alex Mukasa",
      role: "Career Development"
    },
    {
      src: "/images/life-3.jpg",
      testimonial: "Understanding the gap between my dream career and reality gave me practical steps with renewed energy.",
      author: "Fatima Uwase",
      role: "Professional Development"
    }
  ];

  const faqs: Faq[] = [
    {
      question: "How do I join a Goodlife training program?",
      answer: "Click the 'Browse our community environment' link below, select a session, and complete the registration form."
    },
    {
      question: "Can I attend sessions online and in-person?",
      answer: "We offer both live online workshops and in-person trainings at Goodlife Training Center."
    },
    {
      question: "Will I receive a certificate after completion?",
      answer: "All trainees who complete our workshops earn a digital certificate and ongoing community access."
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [videoOn, setVideoOn] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const nextSlide = () => setCurrentSlide((c) => (c === slides.length - 1 ? 0 : c + 1));
  const prevSlide = () => setCurrentSlide((c) => (c === 0 ? slides.length - 1 : c - 1));

  const toggleVideo = () => {
    const newState = !videoOn;
    setVideoOn(newState);
    setIsPlaying(newState);
  };

  return (
    <section id="life" className="relative py-20 bg-white overflow-hidden">
      {/* Video Background */}
      {videoOn && (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted={false}
            loop
            playsInline
            className="w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src="/videos/36c6-5860-4eab-9378-01f509998ae2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 max-w-full mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column - Testimonials & FAQ */}
          <div className="space-y-8">
            {/* Testimonial Section */}
            <div className={`${videoOn ? 'bg-white/95 backdrop-blur-sm' : 'bg-white'} rounded-2xl p-8 shadow-lg border border-gray-100`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#0c4a6e] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">"</span>
                </div>
                <h3 className={`text-3xl font-bold ${videoOn ? 'text-white' : 'text-[#0f172a]'}`}>What Our Trainees Say</h3>
              </div>
              
              <blockquote className={`text-lg leading-relaxed mb-6 ${videoOn ? 'text-white' : 'text-[#0f172a]'}`}>
                {slides[currentSlide].testimonial}
              </blockquote>
              
              <div className="border-t border-gray-200 pt-6">
                <p className={`font-semibold ${videoOn ? 'text-white' : 'text-[#0f172a]'}`}>{slides[currentSlide].author}</p>
                <p className="text-[#0c4a6e] text-sm">{slides[currentSlide].role}</p>
              </div>
            </div>

            {/* FAQ Section */}
            <div className={`${videoOn ? 'bg-white/95 backdrop-blur-sm' : 'bg-white'} rounded-2xl p-8 shadow-lg border border-gray-100`}>
              <h4 className={`text-2xl font-bold mb-6 ${videoOn ? 'text-white' : 'text-[#0f172a]'}`}>Got questions? We've got answers!</h4>
              
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className={`border rounded-xl overflow-hidden transition-all hover:border-[#0c4a6e] ${videoOn ? 'border-gray-300' : 'border-gray-200'}`}>
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className={`w-full flex justify-between items-center p-6 transition-colors ${videoOn ? 'bg-black/30 hover:bg-black/40 text-white' : 'bg-gray-50 hover:bg-gray-100 text-[#0f172a]'}`}
                    >
                      <span className="font-semibold text-left">{faq.question}</span>
                      <ChevronDown className={`h-5 w-5 text-[#0c4a6e] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {openFaq === idx && (
                      <div className={`p-6 border-t ${videoOn ? 'bg-black/20 text-gray-200 border-gray-300' : 'bg-white text-[#0f172a] border-gray-200'}`}>
                        <p className="leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Image Slider */}
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
              <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slides.map((slide, idx) => (
                  <div key={idx} className="min-w-full aspect-[4/3] relative cursor-pointer" onClick={() => setLightboxSrc(slide.src)}>
                    <Image 
                      src={slide.src} 
                      alt={slide.author} 
                      fill 
                      className="object-cover" 
                      sizes="(max-width: 768px) 100vw, 50vw" 
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100">
                <ChevronLeft className="h-6 w-6 text-[#0f172a]" />
              </button>
              <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100">
                <ChevronRight className="h-6 w-6 text-[#0f172a]" />
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {slides.map((_, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setCurrentSlide(idx)} 
                    className={`w-3 h-3 rounded-full transition-all ${idx === currentSlide ? 'bg-[#0c4a6e] w-8' : 'bg-white/80'}`} 
                  />
                ))}
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-[#0f172a] text-white p-4 rounded-xl">
                <div className="text-2xl font-bold">300+</div>
                <div className="text-sm opacity-90">Trainees</div>
              </div>
              <div className="bg-[#0c4a6e] text-white p-4 rounded-xl">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm opacity-90">Success Rate</div>
              </div>
              <div className="bg-[#0f172a] text-white p-4 rounded-xl">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm opacity-90">Partners</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 max-w-full mx-auto px-6 md:px-8 lg:px-12 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link 
          href="/community" 
          className="inline-flex items-center gap-2 bg-[#0c4a6e] text-white px-6 py-3 rounded-lg hover:bg-[#0a3d5c] transition-colors font-semibold w-full sm:w-auto justify-center"
        >
          Browse Community Environment
          <ChevronRight className="h-4 w-4" />
        </Link>

        <button 
          onClick={toggleVideo}
          className="inline-flex items-center gap-2 bg-[#0f172a] text-white px-6 py-3 rounded-lg hover:bg-[#1a2438] transition-colors font-semibold w-full sm:w-auto justify-center"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          Thousand Hills Wonders
        </button>
      </div>

      {/* Lightbox Modal */}
      {lightboxSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setLightboxSrc(null)}>
          <button 
            onClick={() => setLightboxSrc(null)} 
            className="absolute top-6 right-6 p-3 rounded-full bg-white/90 hover:bg-white transition z-50"
          >
            <X className="h-6 w-6 text-[#0f172a]" />
          </button>
          <div className="max-w-[90vw] max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}>
            <Image 
              src={lightboxSrc} 
              alt="Zoomed view" 
              width={1200} 
              height={800} 
              className="rounded-2xl shadow-2xl object-contain" 
            />
          </div>
        </div>
      )}
    </section>
  );
}