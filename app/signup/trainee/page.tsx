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
  'Spring 2025',
  'Summer 2025',
  'Fall 2025',
  'Winter 2025',
  'Spring 2026',
];

export default function TraineeAuthPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [mode, setMode] = useState<'signup' | 'signin'>('signup');

  // Sign-Up fields
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
  const [loading, setLoading] = useState(false);

  const onCountryChange = (code: string) => {
    setSelectedCountry(code);
    const country = countries.find((c) => c.code === code);
    setPhonePlaceholder(country?.placeholder ?? '');
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signup') {
        // Sign Up path
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
        // Sign In path
        await signInWithEmailAndPassword(auth, email, password);
        toast({ title: 'Welcome back!', description: email });
      }

      setTimeout(() => router.push('/dashboard'), 800);
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
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
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen md:flex">
      {/* Left illustration panel */}
      <div className="hidden md:relative md:flex md:w-1/2 wave-mask">
        <Image
          src="/images/life-10.jpg"
          alt="Team working"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-purple-600/80" />
        <div className="relative z-10 flex flex-col justify-center h-full p-16 text-white">
          <h1 className="mb-4 font-bold text-3xl">Goodlife Consulting</h1>
          <p className="text-lg mb-2">Professional Training Registration</p>
          <p className="text-sm">
            Invest in your future with our expert-led programs.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="relative w-full md:w-1/2 bg-white flex items-center justify-center p-8">
        {/* Back Home button with arrow */}
        <Button asChild variant="ghost" className="absolute top-4 left-4">
          <Link href="/">
            <span className="flex items-center space-x-1 text-charcoal hover:text-gray-700">
              <ArrowLeft className="h-4 w-4" />
              <span>Back Home</span>
            </span>
          </Link>
        </Button>

        <div className="w-full max-w-lg space-y-10">
          {/* Toggle Sign Up / Sign In */}
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
                    {/* Full Name & Gender */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="gender">Gender</Label>
                        <Select value={gender} onValueChange={setGender} required>
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

                    {/* Country & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Select
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
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          placeholder={phonePlaceholder}
                        />
                      </div>
                    </div>

                    {/* Program & Session */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="program">Training Program</Label>
                        <Select value={program} onValueChange={setProgram} required>
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
                        <Select value={session} onValueChange={setSession} required>
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

                {/* Email & Password */}
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
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
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {/* Primary Action */}
                <Button
                  type="submit"
                  className="w-full flex items-center justify-center bg-charcoal text-white"
                  disabled={loading}
                >
                  {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
                  {mode === 'signup' ? 'Create Account' : 'Sign In'}
                </Button>

                {/* OR Divider */}
                <div className="flex items-center justify-center space-x-4">
                  <span className="block h-px w-16 bg-gray-200" />
                  <span className="text-gray-400 text-sm">OR</span>
                  <span className="block h-px w-16 bg-gray-200" />
                </div>

                {/* Social Sign-In */}
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    onClick={onGoogle}
                    className="w-full flex items-center justify-center space-x-2"
                    disabled={loading}
                  >
                    <FaGoogle />
                    <span>Continue with Google</span>
                  </Button>
                  <Button
                    variant="outline"
                    disabled
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    <FaApple />
                    <span>Continue with Apple</span>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}