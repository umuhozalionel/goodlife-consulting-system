// components/TrainingPrograms.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const programs = [
  { category: "Leadership & Management", link: "/training/leadership" },
  { category: "Corporate Trainings",       link: "/training/corporate" },
  { category: "Digital & Innovation",      link: "/training/digital" },
  { category: "Communication & Personal Growth", link: "/training/communication" },
  { category: "Languages & Social Impact", link: "/training/languages" },
  { category: "Team Building",             link: "/training/team-building" },
  { category: "Industrial Attachment",     link: "/training/industrial-attachment" },
  { category: "Counselling",               link: "/training/counselling" },
  { category: "Career Guidance",           link: "/training/career-guidance" },
  { category: "Field Trips & Site Visits", link: "/training/field-trips" },
];

export default function TrainingPrograms() {
  const imageSrc = "/images/her.jpg";
  const defaultDesc = "A concise overview of this program’s key objectives.";
  const duration   = "3 months";

  return (
    <section id="programs" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Training Programs
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-terracotta-500 to-forest-500 mx-auto rounded-full mb-8" />
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions to elevate your skills and unlock your potential.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((prog, idx) => {
            // slug for enroll link
            const slug = prog.category
              .toLowerCase()
              .replace(/&/g, "and")
              .replace(/\s+/g, "-");
            return (
              <Card
                key={idx}
                className="shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image */}
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

                {/* Content */}
                <CardContent>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {prog.category}
                  </CardTitle>

                  <p className="text-sm text-gray-600 mt-2">{defaultDesc}</p>
                  <p className="text-sm text-gray-600 mt-1 font-medium">
                    Duration: {duration}
                  </p>

                  {/* Actions */}
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
      </div>
    </section>
  );
}