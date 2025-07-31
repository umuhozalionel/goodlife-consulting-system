"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, type User as FirebaseUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TraineeProfile {
  fullName: string;
  email: string;
  program: string;
  session: string;
  country: string;
  phone: string;
  gender: string;
  createdAt: { seconds: number; nanoseconds: number };
}

export default function TraineeDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<FirebaseUser | null | undefined>(undefined);
  const [profile, setProfile] = useState<TraineeProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Watch Firebase auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  // 2. Fetch profile when user is known
  useEffect(() => {
    if (user === undefined) return;
    if (user === null) {
      router.replace("/auth");
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProfile(snap.data() as TraineeProfile);
        } else {
          console.warn("No profile found for UID:", user.uid);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, router]);

  // 3. Show loading state
  if (user === undefined || loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-700" />
      </main>
    );
  }

  // 4. Render dashboard
  return (
    <main className="min-h-screen p-8 bg-emerald-50">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-emerald-700">🧑‍🎓 Dashboard</h1>
        <Button
          variant="destructive"
          onClick={async () => {
            await signOut(auth);
            router.replace("/auth");
          }}
        >
          Sign Out
        </Button>
      </header>

      {profile ? (
        <section className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-emerald-600">Your Profile</h2>
            <ul className="mt-2 text-gray-700 space-y-1">
              <li><strong>Name:</strong> {profile.fullName}</li>
              <li><strong>Email:</strong> {profile.email}</li>
              <li><strong>Program:</strong> {profile.program}</li>
              <li><strong>Session:</strong> {profile.session}</li>
              <li><strong>Country:</strong> {profile.country}</li>
              <li><strong>Phone:</strong> {profile.phone}</li>
              <li><strong>Gender:</strong> {profile.gender}</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-emerald-600">📘 Your Active Courses</h2>
            <ul className="mt-2 list-disc list-inside text-gray-700">
              <li>Goal Setting Fundamentals</li>
              <li>Mindset & Productivity Boost</li>
            </ul>
          </div>
        </section>
      ) : (
        <p className="text-red-600">Unable to load your profile.</p>
      )}
    </main>
  );
}