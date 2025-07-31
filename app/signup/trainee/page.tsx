// app/signup/trainee/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
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
  const [phonePlaceholder, setPhonePlaceholder] = useState(
    "Select country first"
  );
  const [phone, setPhone] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [preferredSession, setPreferredSession] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCountryChange = (code: string) => {
    setSelectedCountry(code);
    const countryObj = countries.find((c) => c.code === code);
    setPhonePlaceholder(countryObj?.placeholder || "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "signup") {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
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

        toast({
          title: "Sign Up Complete",
          description: `Welcome, ${fullName}!`,
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast({
          title: "Sign In Successful",
          description: `Welcome back, ${email}!`,
        });
      }

      setTimeout(() => router.push("/dashboard"), 1200);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: "Google Sign In Successful",
        description: "Redirecting to dashboard…",
      });
      setTimeout(() => router.push("/dashboard"), 800);
    } catch (err: any) {
      toast({
        title: "Google Sign In Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex">
      {/* Left side: form */}
      <div className="w-full md:w-1/2 px-6 py-12 flex items-center overflow-y-auto">
        <div className="w-full max-w-md mx-auto space-y-8">
          {/* Hero */}
          <Card className="bg-gradient-to-r from-emerald-50 to-amber-50 border border-emerald-100 shadow-sm mb-8">
            <CardContent className="text-center py-8 px-4">
              <h1 className="text-3xl font-bold text-emerald-800 mb-2">
                Goodlife Consulting Partners
              </h1>
              <p className="text-lg text-amber-700 mb-1">
                Professional Training Programs Registration
              </p>
              <p className="text-sm text-emerald-700">
                Invest in your future with our comprehensive training solutions
              </p>
            </CardContent>
          </Card>

          {/* Toggle */}
          <div className="flex justify-center space-x-4">
            <Button
              variant={mode === "signup" ? "default" : "ghost"}
              size="sm"
              onClick={() => setMode("signup")}
            >
              Sign Up
            </Button>
            <Button
              variant={mode === "signin" ? "default" : "ghost"}
              size="sm"
              onClick={() => setMode("signin")}
            >
              Sign In
            </Button>
          </div>

          {/* Form Card */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-emerald-800 font-bold">
                {mode === "signup" ? "Trainee Sign Up" : "Trainee Sign In"}
              </CardTitle>
              <CardDescription className="text-amber-700">
                {mode === "signup"
                  ? "Fill out the form to join our training."
                  : "Sign in to continue to your dashboard."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {mode === "signup" && (
                  <>
                    <div className="col-span-1">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="col-span-1">
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

                    <div className="col-span-1">
                      <Label htmlFor="country">Country</Label>
                      <Select
                        onValueChange={handleCountryChange}
                        value={selectedCountry}
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

                    <div className="col-span-1">
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

                    <div className="col-span-1">
                      <Label htmlFor="program">Training Program</Label>
                      <Select
                        onValueChange={setSelectedProgram}
                        value={selectedProgram}
                      >
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

                    <div className="col-span-1">
                      <Label htmlFor="session">Preferred Session</Label>
                      <Select
                        onValueChange={setPreferredSession}
                        value={preferredSession}
                      >
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

                <div className="col-span-1">
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

                <div className="col-span-1">
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

                <div className="col-span-1 md:col-span-2">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {mode === "signup" ? "Sign Up" : "Sign In"}
                  </Button>
                </div>

                <div className="col-span-1 md:col-span-2 flex items-center space-x-4">
                  <span className="flex-grow h-px bg-gray-200" />
                  <span className="text-sm text-gray-500">
                    Or continue with
                  </span>
                  <span className="flex-grow h-px bg-gray-200" />
                </div>

                <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                  >
                    <FaGoogle className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      toast({
                        title: "Not implemented",
                        description: "Apple Sign In is not available yet.",
                        variant: "destructive",
                      })
                    }
                    disabled={isLoading}
                  >
                    <FaApple className="mr-2 h-4 w-4" />
                    Apple
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right side: illustration */}
      <div className="hidden md:block md:w-1/2 relative">
        <Image
          src="/images/group-three-female-friends-having-fun-together-outdoors.jpg"
          alt="Signup Illustration"
          fill
          className="object-cover"
        />
      </div>
    </main>
  );
}