import { redirect } from "next/navigation"

// TODO: Fetch current user from Firebase Auth
async function getCurrentUser() {
  // This would be replaced with Firebase Auth getCurrentUser() or similar
  return {
    displayName: "John Doe",
    email: "john@example.com",
    uid: "user123",
  }
}

// Mock function to simulate Firestore data fetching
async function getFirestoreData(collectionName: string, docId: string) {
  // This would be replaced with Firebase Admin SDK or client getDoc() call
  // Example: const doc = await getDoc(doc(db, collectionName, docId))

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
        description: "Learn to master your mind through daily meditation and mindfulness practices.",
        progress: 65,
      },
      {
        id: "2",
        name: "Fitness Foundation",
        description: "Build a strong foundation with essential fitness routines and nutrition guidance.",
        progress: 85,
      },
      {
        id: "3",
        name: "Financial Freedom",
        description: "Take control of your finances with proven strategies for saving and investing.",
        progress: 30,
      },
    ]
  }

  return null
}

export default function HomePage() {
  redirect("/dashboard")
}

// export default async function Dashboard() {
//   // TODO: Replace with real Firebase Auth user fetching
//   const user = await getCurrentUser()

//   // TODO: Replace with real Firestore data fetching
//   const userData = await getFirestoreData("users", user.uid)
//   const programs = await getFirestoreData("programs", "all")

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar />
//       <DashboardContent user={user} userData={userData} programs={programs} />
//     </div>
//   )
// }
