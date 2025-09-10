// components/training-program.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

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

export default function TrainingProgram() {
  // spotlight only the first 3
  const spotlight = programs.slice(0, 3);
  const imageSrc = "/images/her.jpg";
  const duration = "3 months";

  return (
    <section id="programs" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Training Programs
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-terracotta-500 to-forest-500 mx-auto rounded-full mb-8" />
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions to elevate your skills and unlock your potential.
          </p>
        </div>

        {/* Spotlight cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {spotlight.map((prog, idx) => {
            const slug = prog.category
              .toLowerCase()
              .replace(/&/g, "and")
              .replace(/\s+/g, "-");

            return (
              <Card
                key={idx}
                className="shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader className="p-0">
                  <div className="relative w-full h-40">
                    <Image
                      src={imageSrc}
                      alt={prog.category}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {prog.category}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-2">
                    {prog.description}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 font-medium">
                    Duration: {duration}
                  </p>
                  <div className="flex space-x-3 mt-4">
                    <Link href={prog.link}>
                      <Button variant="outline" className="rounded-full">
                        View Details
                      </Button>
                    </Link>
                    <Link href={`/signup/trainee?program=${slug}`}>
                      <Button className="rounded-full">Enroll Now</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* View More Programs button */}
        <div className="mt-12 text-center">
          <Link href="/programs">
            <Button
              variant="outline"
              className="inline-flex items-center space-x-2 transform transition-transform duration-300 hover:scale-105"
            >
              <span>View More Programs</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}