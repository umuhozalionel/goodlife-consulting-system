// app/signup/trainee/dashboard/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signOut, User } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function TraineeDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Subscribe to auth state on the client
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  // Redirect back to sign-in if not signed in
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/signup/trainee');
    }
  }, [loading, user, router]);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/signup/trainee');
  };

  // Loading spinner while we check auth
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
      </main>
    );
  }

  // If user is null, we’re redirecting—don’t render anything
  if (!user) {
    return null;
  }

  // Main dashboard UI
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center space-y-4">
        <h1 className="text-2xl font-semibold">Welcome, {user.email}</h1>
        <p className="text-gray-600">You are signed in as a trainee.</p>
        <Button variant="outline" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    </main>
  );
}