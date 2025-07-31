// app/signup/trainee/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import { FaGoogle, FaApple } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const countries = [
  { code: "RW", name: "Rwanda", placeholder: "+250 7xx xxx xxx" },
  { code: "KE", name: "Kenya", placeholder: "+254 xxx xxx xxx" },
  { code: "UG", name: "Uganda", placeholder: "+256 xxx xxx xxx" },
  { code: "TZ", name: "Tanzania", placeholder: "+255 xxx xxx xxx" },
  { code: "US", name: "United States", placeholder: "+1 (xxx) xxx-xxxx" },
  { code: "UK", name: "United Kingdom", placeholder: "+44 xxxx xxxxxx" },
  { code: "CA", name: "Canada", placeholder: "+1 (xxx) xxx-xxxx" },
  { code: "AU", name: "Australia", placeholder: "+61 xxx xxx xxx" },
];

const trainingPrograms = [
  "Leadership Development",
  "Project Management",
  "Digital Marketing",
  "Financial Management",
  "Human Resources",
  "Strategic Planning",
  "Data Analytics",
  "Customer Service Excellence",
];

const genders = ["Male", "Female", "Other"];
const sessions = [
  "Spring 2025",
  "Summer 2025",
  "Fall 2025",
  "Winter 2025",
  "Spring 2026",
];

export default function TraineeAuthPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [phonePlaceholder, setPhonePlaceholder] = useState("Select country first");
  const [phone, setPhone] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [preferredSession, setPreferredSession] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCountryChange = (code: string) => {
    setSelectedCountry(code);
    const country = countries.find((c) => c.code === code);
    setPhonePlaceholder(country?.placeholder || "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (mode === "signup") {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const uid = result.user.uid;
        const userData = {
          fullName,
          gender,
          email,
          phone,
          country: selectedCountry,
          program: selectedProgram,
          session: preferredSession,
          role: "trainee",
          createdAt: new Date(),
        };
        await setDoc(doc(db, "users", uid), userData);
        await addDoc(collection(db, "registrations"), userData);
        toast({ title: "Sign Up Complete", description: `Welcome, ${fullName}!` });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast({ title: "Sign In Successful", description: `Welcome back, ${email}!` });
      }
      setTimeout(() => router.push("/dashboard"), 1200);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({ title: "Google Sign In Successful", description: "Redirecting…" });
      setTimeout(() => router.push("/dashboard"), 800);
    } catch (err: any) {
      toast({ title: "Google Error", description: err.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen md:flex">
      {/* Left panel: background image + purple overlay */}
      <div className="hidden md:relative md:flex md:w-1/2">
        <Image
          src="/images/life-10.jpg"
          alt="Team working"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-purple-600/80" />
        <div className="relative z-10 flex flex-col justify-center h-full p-12 text-white">
          <h1 className="text-4xl font-bold mb-4">Goodlife Consulting Partners</h1>
          <p className="mb-2 text-lg">Professional Training Programs Registration</p>
          <p className="text-sm">Invest in your future with our comprehensive training solutions</p>
        </div>
      </div>

      {/* Right panel: form */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-lg space-y-8">
          {/* Mode toggle */}
          <div className="flex justify-center space-x-4">
            <Button
              variant={mode === "signup" ? "default" : "ghost"}
              size="sm"
              className="bg-black text-white hover:bg-gray-800"
              onClick={() => setMode("signup")}
            >
              Sign Up
            </Button>
            <Button
              variant={mode === "signin" ? "default" : "ghost"}
              size="sm"
              className="bg-black text-white hover:bg-gray-800"
              onClick={() => setMode("signin")}
            >
              Sign In
            </Button>
          </div>

          {/* Form Card */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-black">
                {mode === "signup" ? "Create Your Account" : "Sign In to Continue"}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {mode === "signup"
                  ? "Fill out the fields below to join our training."
                  : "Enter your credentials to access your dashboard."}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mode === "signup" && (
                  <>
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
                      <Select onValueChange={setGender} value={gender}>
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
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Select onValueChange={handleCountryChange} value={selectedCountry}>
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
                        placeholder={phonePlaceholder}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="program">Program</Label>
                      <Select onValueChange={setSelectedProgram} value={selectedProgram}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a program" />
                        </SelectTrigger>
                        <SelectContent>
                          {trainingPrograms.map((p) => (
                            <SelectItem key={p} value={p}>
                              {p}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="session">Session</Label>
                      <Select onValueChange={setPreferredSession} value={preferredSession}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose session" />
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
                  </>
                )}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <Button
                    type="submit"
                    className="w-full bg-black text-white hover:bg-gray-800"
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {mode === "signup" ? "Sign Up" : "Sign In"}
                  </Button>
                </div>

                <div className="md:col-span-2 flex items-center space-x-4">
                  <span className="flex-grow h-px bg-gray-200" />
                  <span className="text-sm text-gray-500">Or continue with</span>
                  <span className="flex-grow h-px bg-gray-200" />
                </div>

                <div className="md:col-span-2 grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    className="bg-black text-white hover:bg-gray-800"
                  >
                    <FaGoogle className="mr-2 h-4 w-4" /> Google
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      toast({
                        title: "Not implemented",
                        description: "Apple Sign In not available yet.",
                        variant: "destructive",
                      })
                    }
                    disabled={isLoading}
                    className="bg-black text-white hover:bg-gray-800"
                  >
                    <FaApple className="mr-2 h-4 w-4" /> Apple
                  </Button>
                </div>

                <div className="md:col-span-2 text-center pt-4">
                  <Link href="/" className="text-sm text-gray-600 hover:text-gray-800">
                    Back to Home
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}