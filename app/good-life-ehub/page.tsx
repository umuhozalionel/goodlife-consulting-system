// app/good-life-ehub/page.tsx

import { Sidebar } from "./components/sidebar"
import DashboardContent from "./components/dashboard-content"

// Fetch current user (mocked)
async function getCurrentUser() {
  return {
    displayName: "John Doe",
    email: "john@example.com",
    uid: "user123",
  }
}

// Mock Firestore data fetching
async function getFirestoreData(collectionName: string, docId: string) {
  if (collectionName === "users" && docId === "user123") {
    return {
      displayName: "John Doe",
      progress: 75,
      currentPrograms: ["Mindfulness Mastery", "Fitness Foundation"],
    }
  }

  if (collectionName === "programs") {
    return [
      {
        id: "1",
        name: "Mindfulness Mastery",
        description:
          "Learn to master your mind through daily meditation and mindfulness practices.",
        progress: 65,
      },
      {
        id: "2",
        name: "Fitness Foundation",
        description:
          "Build a strong foundation with essential fitness routines and nutrition guidance.",
        progress: 85,
      },
      {
        id: "3",
        name: "Financial Freedom",
        description:
          "Take control of your finances with proven strategies for saving and investing.",
        progress: 30,
      },
    ]
  }

  return null
}

export default async function Page() {
  // fetch user and data
  const user = await getCurrentUser()
  const userData = await getFirestoreData("users", user.uid)
  const programs = await getFirestoreData("programs", "all")

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <DashboardContent
        user={user}
        userData={userData}
        programs={programs}
      />
    </div>
  )
}