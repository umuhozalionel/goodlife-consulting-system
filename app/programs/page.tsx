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
import { programs } from "@/data/programs";

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
          {programs.map((prog) => (
            <div
              key={prog.slug}
              role="link"
              tabIndex={0}
              onClick={() => router.push(`/programs/${prog.slug}`)}
              onKeyDown={(e) =>
                e.key === "Enter" && router.push(`/programs/${prog.slug}`)
              }
              className="group cursor-pointer transform transition hover:scale-105 hover:shadow-xl"
            >
              <Card className="overflow-hidden rounded-lg bg-white shadow">
                <div className="relative w-full h-48">
                  <Image
                    src={prog.image}
                    alt={prog.category}
                    fill
                    className="object-cover"
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
                    <Link href={`/programs/${prog.slug}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                    <Link href={`/signup/trainee?program=${prog.slug}`}>
                      <Button size="sm">Enroll Now</Button>
                    </Link>
                  </div>
                  <p className="mt-2 text-xs text-gray-400">Open to Enroll</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0a1932] text-white py-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-start px-6">
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
              © 2025 Goodlife Consultants. All rights reserved. Powered by  
              Bravonet Technologies.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end space-y-6 mt-6 md:mt-0">
            <div className="flex space-x-4">
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

            <div className="w-full max-w-sm bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Send Us Your Suggestions
              </h3>
              <form className="flex flex-col sm:flex-row items-center sm:space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full sm:flex-1 p-2 rounded-md border border-gray-300 focus:outline-none"
                />
                <button
                  type="submit"
                  className="mt-3 sm:mt-0 bg-forest-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-forest-600 transition"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}