// components/calendar-section.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Monitor, Filter } from "lucide-react";

const upcomingTrainings = [
  { id: 1, title: "Leadership Excellence Workshop", date: "2025-01-15", time: "09:00 - 17:00", location: "Goodlife Training Center", mode: "Physical", category: "Leadership", spots: 12 },
  { id: 2, title: "Digital Marketing Fundamentals", date: "2025-01-20", time: "14:00 - 16:00", location: "Goodlife Training Center", mode: "Physical", category: "Digital", spots: 25 },
  { id: 3, title: "Public Speaking Mastery", date: "2025-01-25", time: "10:00 - 15:00", location: "Goodlife Training Center", mode: "Physical", category: "Communication", spots: 8 },
  { id: 4, title: "Financial Literacy for Professionals", date: "2025-02-01", time: "09:00 - 12:00", location: "Goodlife Training Center", mode: "Physical", category: "Finance", spots: 30 },
  { id: 5, title: "Project Management Certification Prep", date: "2025-02-05", time: "08:00 - 18:00", location: "Goodlife Training Center", mode: "Physical", category: "Leadership", spots: 15 },
  { id: 6, title: "AI Tools for Report Writing", date: "2025-02-10", time: "15:00 - 17:00", location: "Goodlife Training Center", mode: "Physical", category: "Digital", spots: 40 },
];

const categories = ["All", "Leadership", "Digital", "Communication", "Finance"];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function CalendarSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filtered =
    selectedCategory === "All"
      ? upcomingTrainings
      : upcomingTrainings.filter((t) => t.category === selectedCategory);

  const visible = showAll ? filtered : filtered.slice(0, 3);

  return (
    <section
      id="calendar"
      className="py-20 bg-gradient-to-br from-terracotta-50 to-forest-50"
    >
      <div className="container mx-auto px-4">
        {/* Heading & Filter */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Upcoming Training Calendar
          </h2>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <Filter className="h-5 w-5 text-gray-500 mt-1" />
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => {
                  setSelectedCategory(cat);
                  setShowAll(false);
                }}
                className={`rounded-full px-3 ${
                  selectedCategory === cat
                    ? "bg-black text-white"
                    : "border-amber-200 text-black hover:bg-amber-50"
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Training Cards */}
        <div className="space-y-12">
          {visible.map((tr) => (
            <Card
              key={tr.id}
              className="shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Overview */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Badge className="bg-terracotta-100 text-terracotta-800">
                        {tr.mode === "Online" ? (
                          <Monitor className="h-4 w-4 mr-1 inline" />
                        ) : (
                          <MapPin className="h-4 w-4 mr-1 inline" />
                        )}
                        {tr.mode}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {tr.spots} spots left
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {tr.title}
                    </h3>
                    <p className="flex items-center text-gray-600">
                      <Calendar className="h-5 w-5 mr-2 text-terracotta-600" />
                      {formatDate(tr.date)}
                    </p>
                    <p className="flex items-center text-gray-600">
                      <span className="inline-block h-4 w-4 mr-2">
                        <span className="block h-2 w-2 bg-forest-500 rounded-full" />
                      </span>
                      {tr.time}
                    </p>
                    <p className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-2 text-terracotta-600" />
                      {tr.location}
                    </p>
                  </div>

                  {/* Session Details with BG */}
                  <div className="relative rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/images/home-desk-design.jpg')] bg-cover bg-center" />
                    <div className="relative bg-white bg-opacity-90 p-6 space-y-3 h-full">
                      <h4 className="text-lg font-semibold text-gray-800">
                        Session Details
                      </h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>
                          <strong>Category:</strong> {tr.category}
                        </li>
                        <li>
                          <strong>Date &amp; Time:</strong> {formatDate(tr.date)},{" "}
                          {tr.time}
                        </li>
                        <li>
                          <strong>Location:</strong> {tr.location}
                        </li>
                        <li>
                          <strong>Mode:</strong> {tr.mode}
                        </li>
                        <li>
                          <strong>Spots left:</strong> {tr.spots}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Register Now */}
                <div className="mt-6 text-right">
                  <Link href="/signup/trainee">
                    <Button className="bg-black text-white px-4 py-2 text-sm rounded-full hover:bg-amber-800">
                      Register Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More / Show Less */}
        {filtered.length > 3 && (
          <div className="mt-8 text-center">
            <Button
              onClick={() => setShowAll(!showAll)}
              className="bg-black text-white px-6 py-2 rounded-full hover:bg-amber-800 inline-flex items-center gap-2"
            >
              <span className="inline-block h-3 w-3 rounded-full bg-white animate-pulse" />
              {showAll ? "Show Less" : "View More"}
            </Button>
          </div>
        )}

        {/* Learn More Programs */}
        <div className="mt-12 text-center">
          <Link
            href="/programs"
            className="text-black font-medium hover:underline"
          >
            Learn more programs →
          </Link>
        </div>
      </div>
    </section>
  );
}