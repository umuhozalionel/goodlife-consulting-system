// components/team-section.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Twitter, Github } from "lucide-react";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  bio: string;
  portfolio: { title: string; description: string }[];
  imageSrc: string;
  linkedin: string | null;
  twitter: string | null;
  github: string | null;
};

const teamMembers: TeamMember[] = [
  // Board members (all Doctors)
  {
    id: 1,
    name: "Dr. Alice Uwase",
    role: "Lead Trainer & Medical Advisor",
    bio: "With over 15 years in public health, Alice ensures our curricula meet the highest clinical standards and translates complex research into actionable workshops.",
    portfolio: [
      { title: "Workshop Series", description: "Designed & delivered community health workshops for 500+ professionals." },
      { title: "Published Research", description: "Co-authored a paper on scalable health interventions in rural areas." },
    ],
    imageSrc: "/team/alice-uwase.jpg",
    linkedin: "#",
    twitter: "#",
    github: null,
  },
  {
    id: 2,
    name: "Dr. Jean Nkurunziza",
    role: "Digital Learning Architect",
    bio: "Jean designs our online platforms and e-learning modules, blending pedagogy with cutting-edge technology to maximize learner engagement.",
    portfolio: [
      { title: "E-Module Platform", description: "Built a React-powered LMS used by 2,000+ students monthly." },
      { title: "Gamification Engine", description: "Integrated badges and leaderboards to boost completion rates by 30%." },
    ],
    imageSrc: "/team/jean-nkurunziza.jpg",
    linkedin: "#",
    twitter: "#",
    github: "#",
  },
  {
    id: 3,
    name: "Dr. Linda Kaguda",
    role: "Programme Manager",
    bio: "Linda oversees day-to-day operations, coordinating with partners and managing logistics to make every cohort seamless from start to finish.",
    portfolio: [
      { title: "Annual Summit", description: "Coordinated logistics for a 200-person public health summit in Kigali." },
      { title: "Partnership Network", description: "Onboarded 15+ NGOs and government agencies for joint training programs." },
    ],
    imageSrc: "/team/linda-kaguda.jpg",
    linkedin: "#",
    twitter: null,
    github: null,
  },
  // Lead team (Mr/Ms)
  {
    id: 4,
    name: "Mr. Paul Habimana",
    role: "Data & Impact Analyst",
    bio: "Paul leads our measurement and evaluation efforts—collecting feedback, analyzing outcomes, and reporting impact metrics to stakeholders.",
    portfolio: [
      { title: "Impact Dashboard", description: "Built BI dashboards delivering real-time training metrics to funders." },
    ],
    imageSrc: "/team/paul-habimana.jpg",
    linkedin: "#",
    twitter: null,
    github: "#",
  },
  {
    id: 5,
    name: "Ms. Mary Jane",
    role: "Communications Strategist",
    bio: "Mary crafts our messaging, case studies, and thought-leadership pieces—ensuring our story resonates with both practitioners and funders.",
    portfolio: [
      { title: "Case Study Series", description: "Authored 10+ case studies showcasing program impact across Africa." },
    ],
    imageSrc: "/team/mary-jane.jpg",
    linkedin: "#",
    twitter: "#",
    github: null,
  },
  {
    id: 6,
    name: "Mr. John Doe",
    role: "Tech Lead",
    bio: "John architects our dashboards, portals, and integrations—making sure trainers and participants have a friction-free digital experience.",
    portfolio: [
      { title: "Dashboard Revamp", description: "Led a UI overhaul boosting user satisfaction by 40%." },
    ],
    imageSrc: "/team/john-doe.jpg",
    linkedin: "#",
    twitter: null,
    github: "#",
  },
];

export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showLeadTeam, setShowLeadTeam] = useState(false);
  const [selectedLeadIndex, setSelectedLeadIndex] = useState(0);

  const MAIN = "#40a193";
  const LATTE = "#F5EDEA";

  const boardMembers = teamMembers.slice(0, 3);
  const leadTeam = teamMembers.slice(3);

  return (
    <section id="team" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Our Team</h2>
          <div
            className="w-20 h-1 mx-auto mb-6"
            style={{ background: `linear-gradient(to right, ${MAIN}, ${LATTE})` }}
          />
          <p className="text-lg text-gray-700">
            Meet the passionate experts driving our mission. We combine healthcare, technology, and educational insight to deliver world-class training.
          </p>
        </div>

        {/* Board Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {boardMembers.map((m) => (
            <Card
              key={m.id}
              onClick={() => setSelectedMember(m)}
              className="cursor-pointer bg-white/60 backdrop-blur-md rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105"
            >
              <CardContent className="flex flex-col items-center text-center p-6">
                <Image
                  src={m.imageSrc}
                  alt={m.name}
                  width={96}
                  height={96}
                  className="rounded-full object-cover mb-4 ring-2"
                  style={{ ringColor: MAIN }}
                />
                <h3 className="text-xl font-semibold text-gray-900">{m.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{m.role}</p>
                <p className="text-gray-700 text-sm line-clamp-3">{m.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal for Board Member Details */}
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
              <Image
                src={selectedMember.imageSrc}
                alt={selectedMember.name}
                width={120}
                height={120}
                className="rounded-full mx-auto mb-4 ring-2"
                style={{ ringColor: MAIN }}
              />
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-1">
                {selectedMember.name}
              </h3>
              <p className="text-center text-sm text-gray-600 mb-4">{selectedMember.role}</p>
              <p className="text-gray-700 mb-4">{selectedMember.bio}</p>
              <h4 className="font-semibold text-gray-900 mb-2">Portfolio</h4>
              <ul className="list-disc list-inside space-y-2 mb-4">
                {selectedMember.portfolio.map((item, i) => (
                  <li key={i}>
                    <strong>{item.title}:</strong> {item.description}
                  </li>
                ))}
              </ul>
              <div className="flex justify-center space-x-4">
                {selectedMember.linkedin && (
                  <a href={selectedMember.linkedin} className="text-gray-500 hover:text-[#40a193]">
                    <Linkedin className="h-6 w-6" />
                  </a>
                )}
                {selectedMember.twitter && (
                  <a href={selectedMember.twitter} className="text-gray-500 hover:text-[#40a193]">
                    <Twitter className="h-6 w-6" />
                  </a>
                )}
                {selectedMember.github && (
                  <a href={selectedMember.github} className="text-gray-500 hover:text-[#40a193]">
                    <Github className="h-6 w-6" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Toggle Lead Team Section */}
        <div className="text-center mb-12">
          <button
            onClick={() => {
              setShowLeadTeam(!showLeadTeam);
              setSelectedLeadIndex(0);
            }}
            className="inline-block px-6 py-3 bg-[#40a193] hover:bg-[#368579] text-white font-semibold rounded-lg shadow-md transition"
          >
            {showLeadTeam ? "View Less" : "View Lead Team"}
          </button>
        </div>

        {/* Lead Team Preview */}
        {showLeadTeam && (
          <div className="max-w-3xl mx-auto mb-16">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Our Lead Team
            </h3>

            {/* Single member preview */}
            {leadTeam[selectedLeadIndex] && (
              <Card className="bg-white/60 backdrop-blur-md rounded-lg shadow-lg overflow-hidden">
                <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                  {/* Left: Photo */}
                  <div className="flex items-center justify-center">
                    <Image
                      src={leadTeam[selectedLeadIndex].imageSrc}
                      alt={leadTeam[selectedLeadIndex].name}
                      width={200}
                      height={200}
                      className="rounded-full object-cover ring-2"
                      style={{ ringColor: MAIN }}
                    />
                  </div>

                  {/* Right: Details */}
                  <div>
                    <h4 className="text-2xl font-semibold text-gray-900 mb-2">
                      {leadTeam[selectedLeadIndex].name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      {leadTeam[selectedLeadIndex].role}
                    </p>
                    <p className="text-gray-700 mb-4">
                      {leadTeam[selectedLeadIndex].bio}
                    </p>

                    <h5 className="font-semibold text-gray-900 mb-2">Portfolio</h5>
                    <ul className="list-disc list-inside mb-4 space-y-2">
                      {leadTeam[selectedLeadIndex].portfolio.map((item, i) => (
                        <li key={i}>
                          <strong>{item.title}:</strong> {item.description}
                        </li>
                      ))}
                    </ul>

                    <div className="flex space-x-4">
                      {leadTeam[selectedLeadIndex].linkedin && (
                        <a href={leadTeam[selectedLeadIndex].linkedin} className="text-gray-500 hover:text-[#40a193]">
                          <Linkedin className="h-6 w-6" />
                        </a>
                      )}
                      {leadTeam[selectedLeadIndex].twitter && (
                        <a href={leadTeam[selectedLeadIndex].twitter} className="text-gray-500 hover:text-[#40a193]">
                          <Twitter className="h-6 w-6" />
                        </a>
                      )}
                      {leadTeam[selectedLeadIndex].github && (
                        <a href={leadTeam[selectedLeadIndex].github} className="text-gray-500 hover:text-[#40a193]">
                          <Github className="h-6 w-6" />
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Thumbnails to switch preview */}
            <div className="flex justify-center space-x-4 mt-6">
              {leadTeam.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedLeadIndex(idx)}
                  className={`rounded-full ring-2 overflow-hidden transition ${
                    idx === selectedLeadIndex ? "ring-[#40a193]" : "ring-gray-300 hover:ring-[#40a193]"
                  }`}
                >
                  <Image src={m.imageSrc} alt={m.name} width={64} height={64} className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}