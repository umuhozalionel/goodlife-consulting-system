// components/HeroSection.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar, ImageIcon, Pencil } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
    >
      {/* Background image via next/image */}
      <div className="absolute inset-0">
        <Image
          src="/images/medium-shot-happy-friends-outdoors.jpg"
          alt="Happy friends outdoors during training"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Rwandan-pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(210,105,30,0.1) 10px, rgba(210,105,30,0.1) 20px)",
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 max-w-4xl px-4 mx-auto text-center text-white">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-snug mb-4">
          Empowering Rwanda’s{" "}
          <span className="block text-terracotta-400">Future Leaders</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-200 mb-8">
          Professional growth through purpose-driven training.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="signup/trainee">
            <Button
              size="lg"
              className="bg-green-700 hover:bg-green-800 focus-visible:ring focus-visible:ring-green-500"
            >
              <Pencil className="mr-2 h-5 w-5" />
              Register Now
            </Button>
          </Link>

          <Link href="/calendar">
            <Button
              size="lg"
              className="border border-terracotta-600 text-terracotta-600 hover:bg-terracotta-50 focus-visible:ring focus-visible:ring-terracotta-300"
            >
              <Calendar className="mr-2 h-5 w-5" />
              View Training Calendar
            </Button>
          </Link>

          <Link href="/gallery">
            <Button
              size="lg"
              className="border border-white text-white hover:bg-white/10 focus-visible:ring focus-visible:ring-white"
            >
              <ImageIcon className="mr-2 h-5 w-5" />
              View Gallery
            </Button>
          </Link>

          <Link href="/training">
            <Button
              size="lg"
              className="border border-emerald-300 text-emerald-300 hover:bg-emerald-50 focus-visible:ring focus-visible:ring-emerald-200"
            >
              <Pencil className="mr-2 h-5 w-5" />
              Explore Trainings
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start p-1 animate-bounce">
          <span className="block w-1 h-3 bg-white rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}