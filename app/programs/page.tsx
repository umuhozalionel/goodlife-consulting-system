// app/programs/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Bell,
  MoreHorizontal,
  GraduationCap,
  Users,
  Trophy,
  QrCode,
  HelpCircle,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const programs = [
  {
    category: "Leadership & Management",
    link: "/training/leadership",
    description: "Master leadership strategies and effective team management.",
  },
  {
    category: "Corporate Trainings",
    link: "/training/corporate",
    description: "Tailored corporate skill-building for organizational growth.",
  },
  {
    category: "Digital & Innovation",
    link: "/training/digital",
    description: "Harness the latest digital tools and innovation practices.",
  },
  {
    category: "Communication & Personal Growth",
    link: "/training/communication",
    description: "Enhance communication skills and personal development.",
  },
  {
    category: "Languages & Social Impact",
    link: "/training/languages",
    description: "Learn new languages and drive social impact initiatives.",
  },
  {
    category: "Team Building",
    link: "/training/team-building",
    description: "Engage in dynamic exercises to strengthen team cohesion.",
  },
  {
    category: "Industrial Attachment",
    link: "/training/industrial-attachment",
    description: "Hands-on industry exposure with mentorship & career planning.",
  },
  {
    category: "Counselling",
    link: "/training/counselling",
    description: "Professional support for trauma, mental health & GBV recovery.",
  },
  {
    category: "Career Guidance",
    link: "/training/career-guidance",
    description: "Navigate career paths, employability gaps & work-life balance.",
  },
  {
    category: "Field Trips & Site Visits",
    link: "/training/field-trips",
    description: "Explore real-world industries and innovation hubs on site visits.",
  },
];

export default function ProgramsPage() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <h1 className="sr-only">Current Programs</h1>

      {/* HEADER */}
      <header className="w-full bg-white flex items-center justify-between px-6 py-3 shadow">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Goodlife Consulting Partners logo"
            width={140}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen(o => !o)}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <Bell className="w-6 h-6 text-gray-900" />
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-md backdrop-blur-md bg-gray-800/60 text-white shadow-lg z-20">
                <ul className="py-2 space-y-1">
                  <li className="px-4 py-2 text-sm">
                    This Wednesday our trip to Musanze is scheduled on Saturday.
                  </li>
                  <li className="px-4 py-2 text-sm">
                    Remember to fill your institution’s logbook at every visit.
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* More menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <MoreHorizontal className="w-6 h-6 text-gray-900" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-md backdrop-blur-md bg-white/70 text-gray-900 shadow-lg z-20 p-3">
                <ul className="space-y-3">
                  <li>
                    <Link href="#" className="flex items-center space-x-3">
                      <GraduationCap className="w-6 h-6 text-terracotta-500" />
                      <span className="font-medium">Learning</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="flex items-center space-x-3">
                      <Users className="w-6 h-6 text-forest-500" />
                      <span className="font-medium">Community</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="flex items-center space-x-3">
                      <Trophy className="w-6 h-6 text-amber-500" />
                      <span className="font-medium">Rewards</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="flex items-center space-x-3">
                      <QrCode className="w-6 h-6 text-indigo-500" />
                      <span className="font-medium">Check In</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="flex items-center space-x-3">
                      <HelpCircle className="w-6 h-6 text-pink-500" />
                      <span className="font-medium">Support</span>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative bg-[url('/images/life-11.jpg')] bg-cover bg-center py-16">
        <div className="absolute inset-0 bg-[#0a1932]/70" />
        <div className="relative flex items-center container mx-auto px-6 max-w-6xl">
          <div className="w-full md:w-1/2 text-left text-white">
            <h2
              className="text-4xl font-bold text-terracotta-500 inline-block
                         border-b-2 border-terracotta-500 pb-2"
            >
              Current Programs
            </h2>
            <p className="mt-4 text-3xl font-semibold">Unlock Unlimited Learning</p>
            <p className="mt-2 text-lg">
              Find detailed information about your enrolled program here.
            </p>
          </div>
        </div>
      </section>

      {/* PROGRAM CARDS */}
      <main className="flex-1 container mx-auto px-6 py-12">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((prog, idx) => {
            const slug = prog.category
              .toLowerCase()
              .replace(/&/g, "and")
              .replace(/\s+/g, "-");

            return (
              <div
                key={idx}
                role="link"
                tabIndex={0}
                onClick={() => router.push(prog.link)}
                onKeyDown={(e) => e.key === "Enter" && router.push(prog.link)}
                className="group cursor-pointer transform transition hover:scale-105 hover:shadow-xl"
              >
                <Card className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="relative w-full h-48">
                    <Image
                      src="/images/her.jpg"
                      alt={`Photo for ${prog.category}`}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="p-5">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {prog.category}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-gray-600">
                      {prog.description}
                    </p>
                    <div className="mt-4 flex space-x-3">
                      <Link href={prog.link}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                      <Link href={`/signup/trainee?program=${slug}`}>
                        <Button size="sm">Enroll Now</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* SUGGESTION SLIDER */}
        <div className="bg-[#0a1932] p-8 rounded-lg shadow-lg mt-12">
          <h3 className="text-2xl font-bold text-white text-center mb-4">
            Send Us Your Suggestions
          </h3>
          <form className="flex flex-col sm:flex-row items-center sm:space-x-4">
            <input
              type="email"
              placeholder="Your email"
              className="w-full sm:flex-1 p-3 rounded-md border border-gray-300 focus:outline-none"
            />
            <button
              type="submit"
              className="mt-4 sm:mt-0 bg-forest-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-forest-600 transition"
            >
              Send
            </button>
          </form>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0a1932] text-white py-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          <div className="space-y-2 text-center md:text-left">
            <nav className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
              {[
                "Home",
                "Learning",
                "Community",
                "Rewards",
                "Support",
                "Privacy Policy",
                "Terms & Conditions",
              ].map((link) => (

                <Link
                  key={link}
                  href={`/${link.replace(/ /g, "-").toLowerCase()}`}
                  className="hover:underline"
                >
                  {link}
                </Link>
              ))}
            </nav>
            <p className="text-sm">
              © 2025 Goodlife Consultants. All rights reserved. Powered by Bravonet
              Technologies.
            </p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#">
              <Twitter className="w-5 h-5 text-white hover:text-amber-300" />
            </Link>
            <Link href="#">
              <Facebook className="w-5 h-5 text-white hover:text-amber-300" />
            </Link>
            <Link href="#">
              <Instagram className="w-5 h-5 text-white hover:text-amber-300" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}