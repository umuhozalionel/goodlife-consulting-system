"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  onAuthStateChanged,
  type User as FirebaseUser,
  signOut,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
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
  const [loadingProfile, setLoadingProfile] = useState(true);

  // 1) Watch auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // 2) Once we know who the user is, fetch their Firestore doc
  useEffect(() => {
    if (user === undefined) return;
    if (user === null) {
      router.replace("/auth");
      return;
    }

    const fetchProfile = async () => {
      setLoadingProfile(true);
      try {
        const docRef = doc(db, "users", user.uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setProfile(snap.data() as TraineeProfile);
        } else {
          console.warn("No profile found for", user.uid);
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [user, router]);

  // 3) Show loader until everything’s ready
  if (user === undefined || loadingProfile) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-700" />
      </main>
    );
  }

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
            <h2 className="text-xl font-semibold text-emerald-600">
              Your Profile
            </h2>
            <ul className="mt-2 text-gray-700 space-y-1">
              <li>
                <strong>Name:</strong> {profile.fullName}
              </li>
              <li>
                <strong>Email:</strong> {profile.email}
              </li>
              <li>
                <strong>Program:</strong> {profile.program}
              </li>
              <li>
                <strong>Session:</strong> {profile.session}
              </li>
              <li>
                <strong>Country:</strong> {profile.country}
              </li>
              <li>
                <strong>Phone:</strong> {profile.phone}
              </li>
              <li>
                <strong>Gender:</strong> {profile.gender}
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-emerald-600">
              📘 Your Active Courses
            </h2>
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