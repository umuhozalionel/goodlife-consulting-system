// components/life-at-goodlife.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type Slide = {
  src: string;
  testimonial: string;
  author: string;
};

type Faq = {
  question: string;
  answer: string;
};

export default function LifeAtGoodlife() {
  const slides: Slide[] = [
    {
      src: "/images/life-20.jpg",
      testimonial:
        "“The Child-Parent Career Goal Clash workshop helped me align my aspirations with my family’s expectations. Now, we’re united in my career journey.”",
      author:
        "— Harriet Nkurunziza, Participant – Child-Parent Career Goal Clash",
    },
    {
      src: "/images/life-23.jpg",
      testimonial:
        "“The Career Guidance session opened my eyes to all my options. The coaches helped me craft a clear path and boosted my confidence every step of the way.”",
      author: "— Alex Mukasa, Participant – Career Guidance",
    },
    {
      src: "/images/life-25.jpg",
      testimonial:
        "“Understanding the gap between my dream career and reality gave me practical steps. I’m now chasing my dream with realistic goals and renewed energy.”",
      author:
        "— Fatima Uwase, Participant – Dream Career vs Reality Career",
    },
  ];

  const faqs: Faq[] = [
    {
      question: "How do I join a Goodlife training program?",
      answer:
        "Click the “Browse our community environment” link below, select a session, and complete the registration form. You’ll receive email confirmation with all the details.",
    },
    {
      question: "Can I attend sessions online and in-person?",
      answer:
        "We offer both live online workshops and in-person trainings at Goodlife Training Center. You can filter by mode when browsing programs.",
    },
    {
      question: "Will I receive a certificate after completion?",
      answer:
        "All trainees who complete our workshops earn a digital certificate, plus ongoing access to community resources and support.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [videoOn, setVideoOn] = useState(false);

  const prev = () =>
    setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));

  const { testimonial, author } = slides[current];

  // dynamic classes for dark/light mode
  const headingClass = videoOn ? "text-white" : "text-gray-900";
  const bodyClass = videoOn ? "text-white" : "text-gray-700";

  return (
    <section
      id="life"
      className="relative py-20 bg-gradient-to-br from-white via-gray-50 to-white transition-colors duration-500"
    >
      {/* video background */}
      {videoOn && (
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/about-hero.jpg"
            className="w-full h-full object-cover"
          >
            <source
              src="/videos/36c6-5860-4eab-9378-01f509998ae2.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      {/* main content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* left: testimonial + FAQ */}
          <div className="space-y-8">
            <div>
              <h3 className={`text-3xl font-bold mb-4 ${headingClass}`}>
                What Our Trainees Say
              </h3>
              <p className={`text-lg leading-relaxed ${bodyClass}`}>
                {testimonial}
              </p>
              <p className={`mt-4 font-medium ${bodyClass}`}>{author}</p>
            </div>

            <div>
              <h4 className={`text-2xl font-semibold mb-4 ${headingClass}`}>
                Got questions? We’ve got answers!
              </h4>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setOpenFaq(openFaq === idx ? null : idx)
                      }
                      className={`
                        w-full flex justify-between items-center px-6 py-4 transition
                        ${videoOn
                          ? "bg-black/30 hover:bg-black/40 text-white"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-900"}
                      `}
                    >
                      <span className="font-medium">{faq.question}</span>
                      {openFaq === idx ? (
                        <ChevronUp className="h-5 w-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-600" />
                      )}
                    </button>
                    {openFaq === idx && (
                      <div
                        className={`px-6 py-4 rounded-b-lg ${
                          videoOn ? "bg-black/20 text-gray-200" : "bg-white text-gray-700"
                        }`}
                      >
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* right: image slider */}
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {slides.map((slide, idx) => (
                  <div
                    key={idx}
                    className="min-w-full h-60 sm:h-80 md:h-96 cursor-pointer"
                    onClick={() => setLightboxSrc(slide.src)}
                  >
                    <Image
                      src={slide.src}
                      alt={`Life at Goodlife ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 p-2 rounded-full shadow hover:bg-opacity-100 transition"
              >
                <ChevronLeft className="h-6 w-6 text-gray-800" />
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 p-2 rounded-full shadow hover:bg-opacity-100 transition"
              >
                <ChevronRight className="h-6 w-6 text-gray-800" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* fixed bottom-right link */}
      <Link
        href="/community"
        className="absolute right-6 bottom-6 text-amber-700 font-medium hover:underline z-10"
      >
        Browse our community environment →
      </Link>

      {/* refined toggle button bottom-left */}
      <button
        onClick={() => setVideoOn((prev) => !prev)}
        className="
          absolute left-6 bottom-6
          backdrop-blur-md bg-[#0a1932]
          px-4 py-2 rounded-lg
          text-lg font-semibold text-white
          drop-shadow-lg transition hover:bg-[#0a1932]/80
          z-10
        "
      >
        Thousand hills wonders
      </button>

      {/* lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            onClick={() => setLightboxSrc(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 transition"
          >
            <X className="h-6 w-6 text-gray-800" />
          </button>
          <div className="max-w-[90vw] max-h-[90vh] p-4">
            <Image
              src={lightboxSrc}
              alt="Zoomed view"
              width={1000}
              height={800}
              className="rounded-lg shadow-2xl object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}