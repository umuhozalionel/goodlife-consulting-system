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

  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [phonePlaceholder, setPhonePlaceholder] = useState('Select country first');
  const [phone, setPhone] = useState('');
  const [program, setProgram] = useState('');
  const [session, setSession] = useState('');
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
      router.push('/dashboard');
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
      router.push('/dashboard');
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
          <p className="text-sm">Invest in your future with our expert-led comprehensive training solutions.</p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="relative w-full md:w-1/2 bg-white flex items-center justify-center p-8">
        {/* Back Home button */}
        <Button asChild variant="ghost" className="absolute top-4 left-4">
          <Link href="/">
            <span className="flex items-center space-x-1 text-charcoal hover:text-gray-700">
              <ArrowLeft className="h-4 w-4" />
              <span>Back Home</span>
            </span>
          </Link>
        </Button>

        <div className="w-full max-w-lg space-y-10">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">🎓 Sign up for Training</CardTitle>
              <CardDescription className="text-gray-600">
                Complete the form to create your account.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={onSubmit} className="space-y-8">
                {/* Full name & gender */}
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
                    <Select value={gender} onValueChange={setGender}>
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

                {/* Country & phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select
                      value={selectedCountry}
                      onValueChange={onCountryChange}
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

                {/* Program & session */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="program">Training Program</Label>
                    <Select value={program} onValueChange={setProgram}>
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
                    <Select value={session} onValueChange={setSession}>
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

                {/* Email & password */}
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

                {/* Primary action (charcoal, no light-green) */}
                <Button
                  type="submit"
                  className="w-full flex items-center justify-center bg-charcoal hover:bg-gray-800 text-white"
                  disabled={loading}
                >
                  {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
                  Create Account
                </Button>

                {/* OR divider */}
                <div className="flex items-center justify-center space-x-4">
                  <span className="block h-px w-16 bg-gray-200" />
                  <span className="text-gray-400 text-sm">OR</span>
                  <span className="block h-px w-16 bg-gray-200" />
                </div>

                {/* Social sign-in */}
                <Button
                  variant="outline"
                  onClick={onGoogle}
                  className="w-full flex items-center justify-center space-x-2 text-charcoal"
                  disabled={loading}
                >
                  <FaGoogle />
                  <span>Continue with Google</span>
                </Button>
                <Button
                  variant="outline"
                  disabled
                  className="w-full flex items-center justify-center space-x-2 text-charcoal"
                >
                  <FaApple />
                  <span>Continue with Apple</span>
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}