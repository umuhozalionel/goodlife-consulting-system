// pages/testimonials.tsx
"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Briefcase,
  Globe,
  Cpu,
  Users,
  Star,
  Award,
  Target,
  TrendingUp,
  MapPin,
  Calendar,
  Play,
  Pause,
  CheckCircle,
  Clock,
  BarChart3,
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
    rating: 5,
    program: "Leadership Excellence",
    location: "Kigali, Rwanda",
    date: "2024",
    achievement: "Promoted to Senior Manager"
  },
  {
    id: 2,
    name: "Jean Baptiste Nzeyimana",
    role: "IT Director, Rwanda Development Board",
    content:
      "Goodlife's digital literacy program was exactly what our team needed. The trainers were knowledgeable and the content was relevant to our daily challenges. Highly recommended!",
    avatarSrc: "/avatars/jean-baptiste.jpg",
    rating: 5,
    program: "Digital Transformation",
    location: "Kigali, Rwanda",
    date: "2024",
    achievement: "Team productivity increased by 40%"
  },
  {
    id: 3,
    name: "Grace Mukamana",
    role: "Communications Specialist, UNICEF Rwanda",
    content:
      "The public speaking workshop boosted my confidence tremendously. I now present with clarity and impact. The personalized feedback and practical exercises made all the difference.",
    avatarSrc: "/avatars/grace-mukamana.jpg",
    rating: 5,
    program: "Executive Communication",
    location: "Kigali, Rwanda",
    date: "2024",
    achievement: "Lead international conference presentations"
  },
];

// one-year impact summary
const stats = [
  { title: "Trainees Trained", value: 800, percent: 100, Icon: Users, change: "+28%" },
  { title: "Business Participants", value: 320, percent: 40, Icon: Briefcase, change: "+15%" },
  { title: "Tourism Participants", value: 160, percent: 20, Icon: Globe, change: "+42%" },
  { title: "Technology Participants", value: 320, percent: 40, Icon: Cpu, change: "+35%" },
];

// partner staff breakdown
const partnerStats = [
  { label: "Government", value: 300 },
  { label: "NGO", value: 250 },
  { label: "Private Sector", value: 250 },
];

// success metrics
const successMetrics = [
  { metric: "Career Advancement Rate", value: "98%", description: "Participants reporting promotion or new responsibilities" },
  { metric: "Skill Application", value: "94%", description: "Immediate application of learned skills in workplace" },
  { metric: "Program Satisfaction", value: "96%", description: "Overall satisfaction with training quality and impact" },
  { metric: "Recommendation Rate", value: "97%", description: "Would recommend to colleagues and peers" },
];

// program outcomes
const programOutcomes = [
  "Average 42% increase in team productivity",
  "78% of participants achieve certification",
  "63% report salary increase within 6 months",
  "89% improve leadership confidence scores"
];

// chart data with brand colors
const barData = {
  labels: stats.slice(1).map((s) => s.title.replace(" participants", "")),
  datasets: [
    {
      label: "Trainees",
      data: stats.slice(1).map((s) => s.value),
      backgroundColor: ["#1b6981", "#769f3f", "#d25c27", "#dd8426"],
      borderRadius: 8,
    },
  ],
};
const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: { 
    y: { 
      beginAtZero: true, 
      ticks: { stepSize: 50 },
      grid: { color: 'rgba(0,0,0,0.1)' }
    },
    x: {
      grid: { display: false }
    }
  },
  plugins: { 
    legend: { display: false },
    tooltip: { backgroundColor: '#383f41' }
  },
};

const pieData = {
  labels: partnerStats.map((p) => p.label),
  datasets: [
    {
      data: partnerStats.map((p) => p.value),
      backgroundColor: ["#1b6981", "#769f3f", "#d25c27"],
      borderWidth: 0,
    },
  ],
};
const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { 
    legend: { 
      position: "bottom",
      labels: { usePointStyle: true, padding: 20 }
    } 
  },
};

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout>();

  // auto-cycle testimonials
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(
        () => setCurrentIndex((i) => (i + 1) % testimonials.length),
        5000
      );
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  const goPrev = () => {
    setCurrentIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
    setIsPlaying(false);
  };

  const goNext = () => {
    setCurrentIndex((i) => (i + 1) % testimonials.length);
    setIsPlaying(false);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  const { name, role, content, avatarSrc, rating, program, location, date, achievement } = testimonials[currentIndex];

  return (
    <section id="testimonials" className="relative py-20 bg-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.02)_25%,rgba(0,0,0,0.02)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.02)_75%)] bg-[length:20px_20px] opacity-10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-16 max-w-4xl"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#383f41] mb-6">
            Proven 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1b6981] to-[#383f41]"> Results</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#1b6981] to-[#383f41] rounded-full mb-6" />
          <p className="text-xl text-[#383f41] leading-relaxed">
            Don't just take our word for it. Hear from professionals who have transformed their careers 
            and organizations through our industry-leading training programs.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Testimonial Slider - 2/3 width */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="shadow-lg rounded-xl overflow-hidden border border-[#e2e8f0] bg-white">
                <CardContent className="p-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5 }}
                      className="p-8 md:p-12"
                    >
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        {/* Avatar & Rating */}
                        <div className="flex-shrink-0 text-center">
                          <div className="relative">
                            <Image
                              src={avatarSrc}
                              alt={name}
                              width={120}
                              height={120}
                              className="rounded-xl shadow-lg ring-4 ring-white border border-[#e2e8f0]"
                            />
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#1b6981] text-white px-3 py-1 rounded-lg text-sm font-semibold shadow-lg">
                              {program}
                            </div>
                          </div>
                          {/* Rating */}
                          <div className="flex justify-center gap-1 mt-4">
                            {[...Array(rating)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 fill-[#dd8426] text-[#dd8426]" />
                            ))}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 text-center md:text-left">
                          <Quote className="h-8 w-8 text-[#1b6981] mb-4 mx-auto md:mx-0" />
                          <p className="text-xl text-[#383f41] leading-relaxed mb-6 italic">
                            "{content}"
                          </p>
                          
                          {/* Achievement Badge */}
                          {achievement && (
                            <div className="flex items-center gap-2 mb-4 p-3 bg-[#f0f9f0] rounded-lg border border-[#769f3f]">
                              <CheckCircle className="h-5 w-5 text-[#769f3f]" />
                              <span className="text-sm font-semibold text-[#769f3f]">{achievement}</span>
                            </div>
                          )}
                          
                          <div className="space-y-2">
                            <h4 className="font-bold text-[#383f41] text-lg">{name}</h4>
                            <p className="text-[#383f41]">{role}</p>
                            <div className="flex items-center gap-4 text-sm text-[#383f41]">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4 text-[#1b6981]" />
                                <span>{location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4 text-[#1b6981]" />
                                <span>{date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </CardContent>
              </Card>

              {/* Navigation Controls */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <motion.button
                  onClick={goPrev}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white shadow-md rounded-lg hover:bg-[#f8fafc] transition-colors duration-300 border border-[#e2e8f0]"
                >
                  <ChevronLeft className="h-5 w-5 text-[#383f41]" />
                </motion.button>

                <motion.button
                  onClick={togglePlay}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-[#1b6981] text-white shadow-md rounded-lg hover:bg-[#155870] transition-colors duration-300"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </motion.button>

                <motion.button
                  onClick={goNext}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white shadow-md rounded-lg hover:bg-[#f8fafc] transition-colors duration-300 border border-[#e2e8f0]"
                >
                  <ChevronRight className="h-5 w-5 text-[#383f41]" />
                </motion.button>
              </div>
            </motion.div>

            {/* Success Metrics - Added below testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {successMetrics.map((item, index) => (
                <div key={index} className="bg-[#f8fafc] rounded-xl p-4 text-center border border-[#e2e8f0]">
                  <div className="text-2xl font-bold text-[#383f41] mb-1">{item.value}</div>
                  <div className="text-xs font-semibold text-[#383f41] mb-1">{item.metric}</div>
                  <div className="text-xs text-[#383f41]">{item.description}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Impact Stats - 1/3 width */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {stats.map(({ title, value, percent, Icon, change }, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white rounded-xl shadow-md p-6 border border-[#e2e8f0] hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-[#1b6981]/10 rounded-lg">
                    <Icon className="h-6 w-6 text-[#1b6981]" />
                  </div>
                  <span className="text-sm font-semibold text-[#769f3f] bg-[#769f3f]/10 px-2 py-1 rounded-lg">
                    {change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#383f41] mb-1">{value}+</h3>
                <p className="text-[#383f41] text-sm font-medium">{title}</p>
                <div className="w-full bg-[#e2e8f0] rounded-full h-2 mt-3">
                  <div 
                    className="bg-gradient-to-r from-[#1b6981] to-[#383f41] h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </motion.div>
            ))}

            {/* Program Outcomes - Added to fill space */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#383f41] rounded-xl p-6 text-white"
            >
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="h-5 w-5 text-[#769f3f]" />
                <h3 className="font-bold text-lg">Program Outcomes</h3>
              </div>
              <div className="space-y-3">
                {programOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-[#769f3f] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-white/90">{outcome}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.button
            onClick={() => setShowDetails((v) => !v)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#1b6981] to-[#383f41] text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Target className="h-5 w-5 group-hover:scale-110 transition-transform" />
            {showDetails ? "View Less Insights" : "View Detailed Insights"}
            <TrendingUp className="h-5 w-5 group-hover:scale-110 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Expanded Analytics */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-12 overflow-hidden"
            >
              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Bar Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-lg p-8 border border-[#e2e8f0]"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Award className="h-6 w-6 text-[#1b6981]" />
                    <h3 className="text-2xl font-bold text-[#383f41]">Trainee Stream Distribution</h3>
                  </div>
                  <div className="relative h-80">
                    <Bar data={barData} options={barOptions} />
                  </div>
                </motion.div>

                {/* Pie Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-8 border border-[#e2e8f0]"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Users className="h-6 w-6 text-[#1b6981]" />
                    <h3 className="text-2xl font-bold text-[#383f41]">Partner Staff Training Split</h3>
                  </div>
                  <div className="relative h-80">
                    <Pie data={pieData} options={pieOptions} />
                  </div>
                </motion.div>
              </div>

              {/* Additional Impact Metrics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-[#383f41] rounded-xl p-12 text-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%)] bg-[length:20px_20px]" />
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Join Our Success Story
                  </h3>
                  <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
                    Be part of the 98% of participants who report significant career advancement 
                    and organizational impact within 6 months of completing our programs.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.a
                      href="/programs"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center bg-white text-[#383f41] px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      Explore All Programs
                      <TrendingUp className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                    <motion.a
                      href="/contact"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-[#383f41] transition-all duration-300 group"
                    >
                      <Clock className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                      Schedule Consultation
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}