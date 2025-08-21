import type { Program } from "@/types/program"

/* FIREBASE INTEGRATION POINT */
// Replace these placeholder functions with real Firestore queries

export async function getCurrentPrograms(): Promise<Program[]> {
  // TODO: Replace with real Firestore collection fetch
  // const programsRef = collection(db, 'programs')
  // const snapshot = await getDocs(query(programsRef, where('userId', '==', userId)))

  return [
    {
      id: "1",
      name: "AWS Cloud Computing",
      description: "Master cloud infrastructure and services with hands-on AWS training.",
      progress: 75,
      startDate: "2024-01-15",
      endDate: "2024-04-15",
      status: "active",
    },
    {
      id: "2",
      name: "Data Analytics",
      description: "Learn to analyze and visualize data using modern tools and techniques.",
      progress: 60,
      startDate: "2024-02-01",
      endDate: "2024-05-01",
      status: "active",
    },
    {
      id: "3",
      name: "Digital Marketing",
      description: "Comprehensive digital marketing strategies for modern businesses.",
      progress: 100,
      startDate: "2023-11-01",
      endDate: "2024-01-31",
      status: "completed",
    },
    {
      id: "4",
      name: "Project Management",
      description: "Essential project management skills and methodologies.",
      progress: 45,
      startDate: "2024-03-01",
      endDate: "2024-06-01",
      status: "active",
    },
    {
      id: "5",
      name: "Cybersecurity Basics",
      description: "Fundamental cybersecurity principles and best practices.",
      progress: 30,
      startDate: "2024-03-15",
      endDate: "2024-06-15",
      status: "active",
    },
  ]
}

export async function getRecommendedPrograms(): Promise<Program[]> {
  // TODO: Replace with real Firestore collection fetch for recommended programs
  return [
    {
      id: "6",
      name: "Front-End Web Pro Development",
      description: "Advanced React, TypeScript, and modern web development techniques.",
      status: "upcoming",
    },
    {
      id: "7",
      name: "AI & Machine Learning",
      description: "Introduction to artificial intelligence and machine learning concepts.",
      status: "upcoming",
    },
    {
      id: "8",
      name: "Cybersecurity Fundamentals",
      description: "Comprehensive cybersecurity training for professionals.",
      status: "upcoming",
    },
    {
      id: "9",
      name: "DevOps Engineering",
      description: "Learn DevOps practices, CI/CD, and infrastructure automation.",
      status: "upcoming",
    },
    {
      id: "10",
      name: "UX/UI Design",
      description: "User experience and interface design principles and tools.",
      status: "upcoming",
    },
  ]
}
