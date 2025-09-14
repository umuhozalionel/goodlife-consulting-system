// app/signup/trainee/page.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { Loader2, ArrowLeft } from 'lucide-react';
import { FaGoogle, FaApple } from 'react-icons/fa';

import { auth, db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const countries = [
  { code: 'RW', name: 'Rwanda', placeholder: '+250 7xx xxx xxx' },
  { code: 'KE', name: 'Kenya', placeholder: '+254 xxx xxx xxx' },
  { code: 'UG', name: 'Uganda', placeholder: '+256 xxx xxx xxx' },
  { code: 'TZ', name: 'Tanzania', placeholder: '+255 xxx xxx xxx' },
  { code: 'US', name: 'United States', placeholder: '+1 (xxx) xxx-xxxx' },
  { code: 'UK', name: 'United Kingdom', placeholder: '+44 xxxx xxxxxx' },
  { code: 'CA', name: 'Canada', placeholder: '+1 (xxx) xxx-xxxx' },
  { code: 'AU', name: 'Australia', placeholder: '+61 xxx xxx xxx' },
];

const programs = [
  'Leadership Development',
  'Project Management',
  'Digital Marketing',
  'Financial Management',
  'Human Resources',
  'Strategic Planning',
  'Data Analytics',
  'Customer Service Excellence',
];

const genders = ['Male', 'Female', 'Other'];

const sessions = [
  'Summer 2025',
  'Fall 2025',
  'Winter 2025',
  'Spring 2026',
  'Summer 2026',
];

export default function TraineeAuthPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [mode, setMode] = useState<'signup' | 'signin'>('signup');

  // Sign-up fields
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [phonePlaceholder, setPhonePlaceholder] = useState('Select country first');
  const [phone, setPhone] = useState('');
  const [program, setProgram] = useState('');
  const [session, setSession] = useState('');

  // Shared fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCountryChange = (code: string) => {
    setSelectedCountry(code);
    const country = countries.find((c) => c.code === code);
    setPhonePlaceholder(country?.placeholder ?? '');
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Password strength & match (only for sign-up)
    const pwd = password.trim();
    const requiresUpperAndDigit = /(?=.*[A-Z])(?=.*\d)/;
    if (mode === 'signup' && (pwd.length < 8 || !requiresUpperAndDigit.test(pwd))) {
      toast({
        title: 'Weak Password',
        description: 'Use at least 8 characters, include an uppercase letter and a number.',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }
    if (mode === 'signup' && pwd !== confirmPassword) {
      toast({
        title: 'Passwords Do Not Match',
        description: 'Please ensure both passwords are identical.',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    try {
      if (mode === 'signup') {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        const data = {
          fullName,
          gender,
          email,
          phone,
          country: selectedCountry,
          program,
          session,
          role: 'trainee',
          createdAt: new Date(),
        };
        await setDoc(doc(db, 'users', user.uid), data);
        await addDoc(collection(db, 'registrations'), data);
        toast({ title: 'Welcome!', description: `Hi ${fullName}` });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast({ title: 'Welcome back!', description: email });
      }
      setTimeout(() => router.push('/dashboard'), 800);
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const onGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      toast({ title: 'Google Sign In', description: 'Success' });
      setTimeout(() => router.push('/dashboard'), 800);
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main role="main" className="flex min-h-screen flex-col md:flex-row">
      {/* Left Illustration */}
      <aside className="relative hidden w-full md:flex md:w-1/2 wave-mask md:border-r md:border-gray-200">
        <Image
          src="/community/community-10.jpg"
          alt="Team collaborating on training"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-orange-600/70" />
        <div className="relative z-10 flex flex-col justify-center p-16 text-white">
          <h1 className="mb-4 text-3xl font-bold">Goodlife Consulting</h1>
          <p className="mb-2 text-lg">Professional Training Registration</p>
          <p className="text-sm">
            Invest in your future with our expert-led programs.
          </p>
        </div>
      </aside>

      {/* Right form panel */}
      <section className="relative flex w-full flex-col bg-white p-8 md:w-1/2">
        {/* Back Home button at top-left */}
        <Button
          asChild
          variant="ghost"
          className="absolute top-4 left-4 z-20"
        >
          <Link
            href="/"
            className="flex items-center space-x-1 text-charcoal hover:text-gray-700"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back Home</span>
          </Link>
        </Button>

        <div className="mx-auto mt-16 flex w-full max-w-lg flex-col space-y-10">
          {/* Toggle */}
          <div className="flex justify-center space-x-6">
            <Button
              size="sm"
              variant={mode === 'signup' ? 'default' : 'ghost'}
              onClick={() => setMode('signup')}
            >
              Sign Up
            </Button>
            <Button
              size="sm"
              variant={mode === 'signin' ? 'default' : 'ghost'}
              onClick={() => setMode('signin')}
            >
              Sign In
            </Button>
          </div>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {mode === 'signup' ? 'Join Goodlife' : 'Welcome Back'}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {mode === 'signup'
                  ? 'Complete the form to create your account.'
                  : 'Log in with your credentials.'}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={onSubmit} className="space-y-8">
                {mode === 'signup' && (
                  <>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          aria-required="true"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="gender">Gender</Label>
                        <Select
                          id="gender"
                          value={gender}
                          onValueChange={setGender}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            {genders.map((g) => (
                              <SelectItem key={g} value={g}>
                                {g}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Select
                          id="country"
                          value={selectedCountry}
                          onValueChange={onCountryChange}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((c) => (
                              <SelectItem key={c.code} value={c.code}>
                                {c.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          aria-required="true"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          placeholder={phonePlaceholder}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <Label htmlFor="program">Training Program</Label>
                        <Select
                          id="program"
                          value={program}
                          onValueChange={setProgram}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select program" />
                          </SelectTrigger>
                          <SelectContent>
                            {programs.map((p) => (
                              <SelectItem key={p} value={p}>
                                {p}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="session">Session</Label>
                        <Select
                          id="session"
                          value={session}
                          onValueChange={setSession}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select session" />
                          </SelectTrigger>
                          <SelectContent>
                            {sessions.map((s) => (
                              <SelectItem key={s} value={s}>
                                {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </>
                )}

                {/* Shared fields */}
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      aria-required="true"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type={showPasswords ? 'text' : 'password'}
                      aria-required="true"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                    />
                  </div>
                  {mode === 'signup' && (
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type={showPasswords ? 'text' : 'password'}
                        aria-required="true"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                      />
                    </div>
                  )}
                </div>

                {/* Show passwords toggle */}
                <div className="flex items-center space-x-2 mb-4">
                  <label
                    htmlFor="showPasswords"
                    className="inline-flex items-center cursor-pointer"
                  >
                    <input
                      id="showPasswords"
                      type="checkbox"
                      className="sr-only peer"
                      checked={showPasswords}
                      onChange={(e) => setShowPasswords(e.target.checked)}
                      aria-label="Show passwords"
                    />
                    <div className="w-10 h-6 bg-gray-200 rounded-full transition-all peer-checked:bg-indigo-600 relative">
                      <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-full" />
                    </div>
                    <span className="ml-2 text-sm text-gray-700">Show passwords</span>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full flex items-center justify-center bg-charcoal text-white hover:bg-black focus:ring-2 focus:ring-indigo-500"
                  disabled={loading}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {mode === 'signup' ? 'Create Account' : 'Sign In'}
                </Button>

                <div className="relative flex items-center">
                  <hr className="w-full border-gray-200" aria-hidden="true" />
                  <span className="absolute inset-x-1/2 bg-white px-2 text-sm text-gray-400">
                    OR
                  </span>
                </div>

                <div className="space-y-4">
                  <Button
                    variant="outline"
                    onClick={onGoogle}
                    className="w-full flex items-center justify-center space-x-2"
                    disabled={loading}
                  >
                    <FaGoogle aria-hidden="true" />
                    <span>Continue with Google</span>
                  </Button>
                  <Button
                    variant="outline"
                    disabled
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    <FaApple aria-hidden="true" />
                    <span>Continue with Apple</span>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <footer className="mt-auto text-center text-xs text-gray-500">
            <p>© 2025 Goodlife Consulting Partners. All rights reserved.</p>
            <p>Powered by Bravonet Technologies Ltd</p>
          </footer>
        </div>
      </section>
    </main>
  );
}