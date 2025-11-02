// app/programs/[slug]/page.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
import { Button } from "@/components/ui/button";
import { programs } from "@/data/programs";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProgramDetail({ params }: PageProps) {
  const { slug } = React.use(params);
  const program = programs.find((p) => p.slug === slug);
  if (!program) return notFound();

  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    window.addEventListener("click", handleOutside);
    return () => window.removeEventListener("click", handleOutside);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
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
              onClick={() => setNotifOpen((o) => !o)}
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
              onClick={() => setMenuOpen((o) => !o)}
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
              className="text-4xl font-bold text-terracotta-500 inline-block border-b-2 border-terracotta-500 pb-2"
            >
              Current Programs
            </h2>
            <p className="mt-4 text-3xl font-semibold">
              Unlock Unlimited Learning
            </p>
            <p className="mt-2 text-lg">
              Find detailed information about your enrolled program here.
            </p>
          </div>
        </div>
      </section>

      {/* BACK LINK */}
      <div className="container mx-auto px-6 mt-6">
        <Link
          href="/programs"
          className="text-sm text-forest-500 hover:underline"
        >
          ← Back to Programs
        </Link>
      </div>

      {/* TWO-COLUMN DETAIL */}
      <main className="flex-1 container mx-auto px-6 py-12 space-y-12">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">
              {program.category}
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              {program.longDescription}
            </p>
          </div>
          <div className="relative w-full h-64 lg:h-80 rounded-lg overflow-hidden">
            <Image
              src={program.image}
              alt={program.category}
              fill
              className="object-cover"
            />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Program structure</h2>
          <div className="space-y-4">
            {program.modules.map((mod) => (
              <div key={mod.title}>
                <h3 className="text-xl font-medium">{mod.title}</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {mod.lessons.map((lesson) => (
                    <li key={lesson}>{lesson}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {program.includes.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">
              This program includes:
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {program.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="text-center">
          <Link href={`https://goodlifeconsulting.pro/auth?program=${slug}`}>
            <Button size="lg">Enroll Now</Button>
          </Link>
        </section>
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
          </div>
        </div>
      </footer>
    </div>
  );
}