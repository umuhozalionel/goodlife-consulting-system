// pages/testimonials.tsx
"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Briefcase,
  Globe,
  Cpu,
  Users,
} from "lucide-react";

// dynamic imports prevent Chart.js from running on the server
const Bar = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Bar),
  { ssr: false }
);
const Pie = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Pie),
  { ssr: false }
);

// register Chart.js modules
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// testimonial entries
const testimonials = [
  {
    id: 1,
    name: "Marie Uwimana",
    role: "Project Manager, Bank of Kigali",
    content:
      "The leadership training program transformed my management approach. I gained practical skills that I immediately applied in my role, resulting in improved team performance and project outcomes.",
    avatarSrc: "/avatars/marie-uwimana.jpg",
  },
  {
    id: 2,
    name: "Jean Baptiste Nzeyimana",
    role: "IT Director, Rwanda Development Board",
    content:
      "Goodlife's digital literacy program was exactly what our team needed. The trainers were knowledgeable and the content was relevant to our daily challenges. Highly recommended!",
    avatarSrc: "/avatars/jean-baptiste.jpg",
  },
  {
    id: 3,
    name: "Grace Mukamana",
    role: "Communications Specialist, UNICEF Rwanda",
    content:
      "The public speaking workshop boosted my confidence tremendously. I now present with clarity and impact. The personalized feedback and practical exercises made all the difference.",
    avatarSrc: "/avatars/grace-mukamana.jpg",
  },
];

// one-year impact summary
const stats = [
  { title: "Trainees trained", value: 800, percent: 100, Icon: Users },
  { title: "Business participants", value: 320, percent: 40, Icon: Briefcase },
  { title: "Tourism participants", value: 160, percent: 20, Icon: Globe },
  { title: "Technology participants", value: 320, percent: 40, Icon: Cpu },
];

// partner staff breakdown
const partnerStats = [
  { label: "Government", value: 300 },
  { label: "NGO", value: 250 },
];

// chart data
const barData = {
  labels: stats.slice(1).map((s) => s.title.replace(" participants", "")),
  datasets: [
    {
      label: "Trainees",
      data: stats.slice(1).map((s) => s.value),
      backgroundColor: ["#f59e0b", "#10b981", "#3b82f6"],
    },
  ],
};
const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: { y: { beginAtZero: true, ticks: { stepSize: 50 } } },
  plugins: { legend: { display: false } },
};

const pieData = {
  labels: partnerStats.map((p) => p.label),
  datasets: [
    {
      data: partnerStats.map((p) => p.value),
      backgroundColor: ["#ef4444", "#3b82f6"],
    },
  ],
};
const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: "bottom" } },
};

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  // auto-cycle testimonials
  useEffect(() => {
    const timer = setInterval(
      () =>
        setCurrentIndex((i) => (i + 1) % testimonials.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  const goPrev = () =>
    setCurrentIndex((i) =>
      i === 0 ? testimonials.length - 1 : i - 1
    );
  const goNext = () =>
    setCurrentIndex((i) => (i + 1) % testimonials.length);

  const { name, role, content, avatarSrc } =
    testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading stuck left */}
        <div className="mb-12 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-left">
            What Our Participants Say
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-terracotta-500 to-forest-500 mb-5" />
          <p className="text-lg text-gray-600 text-left">
            Don't just take our word for it. Here’s what professionals who have
            completed our training programs have to say.
          </p>
        </div>

        {/* Slider */}
        <div className="max-w-4xl mx-auto relative mb-16">
          <Card className="shadow-lg overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                <Image
                  src={avatarSrc}
                  alt={name}
                  width={96}
                  height={96}
                  className="rounded-full ring-4 ring-amber-500 shadow-md"
                />
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center justify-center mb-4 w-10 h-10 bg-gradient-to-br from-terracotta-500 to-forest-500 rounded-full">
                    <Quote className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-xl text-gray-700 italic leading-relaxed mb-4">
                    "{content}"
                  </p>
                  <h4 className="font-bold text-gray-900">{name}</h4>
                  <p className="text-gray-600">{role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <button
            onClick={goPrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5 text-gray-800" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <ChevronRight className="h-5 w-5 text-gray-800" />
          </button>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map(({ title, value, percent, Icon }, idx) => (
            <Card key={idx} className="text-center shadow">
              <CardContent>
                <Icon className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-3xl font-bold">{value}+</p>
                <p className="text-sm text-gray-500 mb-1">{title}</p>
                <p className="text-xs text-gray-400">{percent}% achieved</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More / View Less */}
        <div className="text-center mb-12">
          <button
            onClick={() => setShowDetails((v) => !v)}
            className="px-6 py-3 bg-emerald-600 text-white rounded-md shadow hover:bg-emerald-700 transition"
          >
            {showDetails ? "View Less" : "View More"}
          </button>
        </div>

        {/* Expanded charts */}
        {showDetails && (
          <div className="space-y-12">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-center">
                Trainee Stream Distribution
              </h3>
              <div className="relative h-64">
                <Bar data={barData} options={barOptions} />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-center">
                Partner Staff Training Split
              </h3>
              <div className="relative h-64">
                <Pie data={pieData} options={pieOptions} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}