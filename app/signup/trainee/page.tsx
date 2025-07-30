// app/trainee-auth/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "@/lib/firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import { FaGoogle, FaApple } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const countries = [
  { code: "RW", name: "Rwanda", placeholder: "+250 7xx xxx xxx" },
  /* …other countries… */
];
const programs = [/* …your programs… */];
const sessions = [/* …your sessions… */];
const genders = ["Male", "Female", "Other"];

export default function TraineeAuthPage() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = getAuth();

  const [mode, setMode] = useState<"signup"|"signin">("signup");
  const [isLoading, setIsLoading] = useState(false);

  // Common fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Signup-only fields
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [phonePlaceholder, setPhonePlaceholder] = useState("Select country first");
  const [program, setProgram] = useState("");
  const [session, setSession] = useState("");

  const handleCountryChange = (code: string) => {
    setCountry(code);
    const c = countries.find((c) => c.code === code);
    setPhonePlaceholder(c?.placeholder ?? "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "signup") {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        const profile = { fullName, gender, email, country, phone, program, session, role: "trainee", createdAt: new Date() };

        await setDoc(doc(db, "users", user.uid), profile);
        await addDoc(collection(db, "registrations"), profile);

        toast({ title: "Sign Up Complete", description: `Welcome aboard, ${fullName}!` });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast({ title: "Sign In Successful", description: `Welcome back!` });
      }

      setTimeout(() => router.push("/dashboard"), 1200);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex">
      {/* Left: form */}
      <div className="w-full md:w-1/2 px-6 py-12 flex items-center">
        <div className="w-full max-w-md mx-auto space-y-8">
          {/* Hero header */}
          <Card className="bg-gradient-to-r from-emerald-50 to-amber-50 border-emerald-100 shadow-sm">
            <CardContent className="text-center py-8">
              <h1 className="text-3xl font-bold text-emerald-800">Goodlife Consulting</h1>
              <p className="text-lg text-amber-700">Professional Training Registration</p>
              <p className="text-sm text-emerald-700">Invest in your future</p>
            </CardContent>
          </Card>

          {/* Mode toggle */}
          <div className="flex justify-center space-x-4">
            <Button size="sm" variant={mode==="signup"?"default":"ghost"} onClick={() => setMode("signup")}>Sign Up</Button>
            <Button size="sm" variant={mode==="signin"?"default":"ghost"} onClick={() => setMode("signin")}>Sign In</Button>
          </div>

          {/* Form card */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-emerald-800 font-bold">
                {mode === "signup" ? "Trainee Sign Up" : "Trainee Sign In"}
              </CardTitle>
              <CardDescription className="text-amber-700">
                {mode === "signup" ? "Fill out to join our training." : "Sign in to continue."}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {mode === "signup" && (
                  <>
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} required placeholder="John Doe" />
                    </div>

                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Select onValueChange={setGender} value={gender}>
                        <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                        <SelectContent>{genders.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Select onValueChange={handleCountryChange} value={country}>
                        <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
                        <SelectContent>{countries.map(c => <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} required placeholder={phonePlaceholder} />
                    </div>

                    <div>
                      <Label htmlFor="program">Training Program</Label>
                      <Select onValueChange={setProgram} value={program}>
                        <SelectTrigger><SelectValue placeholder="Choose a program" /></SelectTrigger>
                        <SelectContent>{programs.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="session">Preferred Session</Label>
                      <Select onValueChange={setSession} value={session}>
                        <SelectTrigger><SelectValue placeholder="Choose session" /></SelectTrigger>
                        <SelectContent>{sessions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {/* Email & Password (common) */}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
                </div>

                {/* Submit */}
                <Button type="submit" className="w-full justify-center" disabled={isLoading}>
                  {isLoading
                    ? <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    : mode === "signup" ? "Sign Up" : "Sign In"}
                </Button>

                {/* Social (signin only) */}
                {mode === "signin" && (
                  <div className="flex justify-center space-x-4 pt-4">
                    <Button size="icon" variant="outline" onClick={() => toast({ title: "Google Auth TBD" })}><FaGoogle /></Button>
                    <Button size="icon" variant="outline" onClick={() => toast({ title: "Apple Auth TBD" })}><FaApple /></Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right: full-height image */}
      <div className="hidden md:block md:w-1/2 relative">
        <Image
          src="/images/photorealistic-portrait-african-woman.jpg"
          alt="Training background"
          fill
          className="object-cover"
        />
      </div>
    </main>
  );
}