// /data/programs.ts
export interface Module {
  title: string
  lessons: string[]
}

export interface Program {
  slug: string
  category: string
  description: string
  longDescription: string
  image: string
  modules: Module[]
  includes: string[]
}

export const programs: Program[] = [
  {
    slug: "leadership",
    category: "Leadership & Management",
    description: "Master leadership strategies and effective team management.",
    longDescription:
      "Dive deep into leadership theories, practice real-world team scenarios, and come away ready to lead with confidence.",
    image:
      "/images/cheerful-mood-group-people-business-conference-modern-classroom-daytime.jpg",
    modules: [
      {
        title: "Professional Foundations",
        lessons: ["Introduction to Leadership", "Team Dynamics"],
      },
      {
        title: "Advanced Strategies",
        lessons: ["Conflict Resolution", "Strategic Planning"],
      },
    ],
    includes: [
      "Leadership frameworks & best practices",
      "Team-building exercises",
      "Conflict management techniques",
      "Strategic decision-making tools",
    ],
  },
  {
    slug: "corporate",
    category: "Corporate Trainings",
    description: "Tailored corporate skill-building for organizational growth.",
    longDescription:
      "Custom workshops and hands-on sessions designed to elevate your entire team’s performance.",
    image: "/images/entrepreneur-videocall-with-clients.jpg",
    modules: [],
    includes: [],
  },
  {
    slug: "digital",
    category: "Digital & Innovation",
    description: "Harness the latest digital tools and innovation practices.",
    longDescription:
      "Learn to leverage cutting-edge technologies and foster a culture of continuous innovation.",
    image: "/images/team-businessmen-listening-business-lecture-briefing.jpg",
    modules: [],
    includes: [],
  },
  {
    slug: "communication",
    category: "Communication & Personal Growth",
    description: "Enhance communication skills and personal development.",
    longDescription:
      "Master persuasive communication, active listening, and personal growth strategies.",
    image:
      "/images/corporate-business-people-meeting-boardroom-african-manager-brainstorming-with-colleagues-discussing-strategy-sharing-problem-solving-ideas-collaborating-conference-room-company.jpg",
    modules: [],
    includes: [],
  },
  {
    slug: "languages",
    category: "Languages & Social Impact",
    description: "Learn new languages and drive social impact initiatives.",
    longDescription:
      "Immerse yourself in language learning while working on real social impact projects.",
    image: "/images/full-shot-woman-working-out-with-trainer.jpg",
    modules: [],
    includes: [],
  },
  {
    slug: "team-building",
    category: "Team Building",
    description: "Engage in dynamic exercises to strengthen team cohesion.",
    longDescription:
      "Interactive activities designed to foster trust, collaboration, and high-performing teams.",
    image:
      "/images/man-participation-training-after-being-hired-his-new-office-job.jpg",
    modules: [
      {
        title: "Team Building Activities",
        lessons: [
          "Building trust & Psychological Safety",
          "Collaboration & Teamwork",
          "Problem-Solving & Decision Making",
          "Emotional Intelligence & Conflict Resolution",
          "Communication & Active Listening",
          "Goal Setting & Collective Vision",
          "Diversity, Inclusion & Respect",
          "Motivation & Team Spirit",
        ],
      },
    ],
    includes: [],
  },
  {
    slug: "industrial-attachment",
    category: "Industrial Attachment",
    description:
      "Hands-on industry exposure with mentorship & career planning.",
    longDescription:
      "Work alongside industry experts and build a roadmap for your career.",
    image:
      "/images/african-american-businessman-giving-presentation-explaining-new-marketing-plan-meeting.jpg",
    modules: [
      {
        title: "Industrial Attachment Activities",
        lessons: [
          "Soft Skills (Communication Skills, Public Speaking and Presentation)",
          "Career planning and CV writing",
          "Professional etiquette and ethics",
          "Entrepreneurship and innovation",
          "ICT and digital productivity",
          "Internship supervision and mentorship",
        ],
      },
    ],
    includes: [],
  },
  {
    slug: "counselling",
    category: "Counselling",
    description:
      "Professional support for trauma, mental health & GBV recovery.",
    longDescription:
      "Confidential counselling sessions and group workshops for emotional well-being.",
    image: "/images/beginner-average-skilled-expert-productivity.jpg",
    modules: [
      {
        title: "Counselling Topics",
        lessons: [
          "Genocide-related Trauma & PTSD",
          "Depression, Anxiety, Panic",
          "Substance Use Disorders (drug abuse)",
          "Suicidal Behaviour",
          "Youth Peer Pressure",
          "Lack of emotional or social support",
          "Gender-Based Violence (GBV)",
        ],
      },
    ],
    includes: [],
  },
  {
    slug: "career-guidance",
    category: "Career Guidance",
    description:
      "Navigate career paths, employability gaps & work-life balance.",
    longDescription:
      "Personalized coaching to help you define and achieve your career goals.",
    image:
      "/images/male-employee-participating-training-session-his-new-office-job.jpg",
    modules: [
      {
        title: "Career Guidance Topics",
        lessons: [
          "Child-Parent Career Goal clash",
          "Dream career Vs Reality career",
          "Prolonged Unemployment issues",
          "Skills Gap and Future Employability",
          "Peer Pressure & Comparing Career Paths",
          "Work–Life Balance and Career Stress",
          "Entrepreneurship vs. Formal Employment",
          "Teenage Pregnancies and school dropout (lack of interest for school)",
        ],
      },
    ],
    includes: [],
  },
  {
    slug: "field-trips",
    category: "Field Trips & Site Visits",
    description:
      "Explore real-world industries and innovation hubs on site visits.",
    longDescription:
      "Guided tours and hands-on experiences at leading companies and startups.",
    image:
      "/images/confident-african-speaker-business-coach-giving-presentation-team.jpg",
    modules: [],
    includes: [],
  },
]