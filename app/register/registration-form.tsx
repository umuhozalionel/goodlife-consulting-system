"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  User,
  Mail,
  Phone,
  Globe,
  GraduationCap,
  Calendar,
  MessageSquare,
} from "lucide-react"

import { db } from "@/firebase"
import { collection, addDoc } from "firebase/firestore"

const countries = [
  { code: "RW", name: "Rwanda", placeholder: "+250 7xx xxx xxx" },
  { code: "KE", name: "Kenya", placeholder: "+254 xxx xxx xxx" },
  { code: "UG", name: "Uganda", placeholder: "+256 xxx xxx xxx" },
  { code: "TZ", name: "Tanzania", placeholder: "+255 xxx xxx xxx" },
  { code: "US", name: "United States", placeholder: "+1 (xxx) xxx-xxxx" },
  { code: "UK", name: "United Kingdom", placeholder: "+44 xxxx xxxxxx" },
  { code: "CA", name: "Canada", placeholder: "+1 (xxx) xxx-xxxx" },
  { code: "AU", name: "Australia", placeholder: "+61 xxx xxx xxx" },
]

const trainingPrograms = [
  "Leadership Development",
  "Project Management",
  "Digital Marketing",
  "Financial Management",
  "Human Resources",
  "Strategic Planning",
  "Data Analytics",
  "Customer Service Excellence",
]

export default function Component() {
  const [selectedCountry, setSelectedCountry] = useState("")
  const [phonePlaceholder, setPhonePlaceholder] = useState("Select country first")
  const [selectedProgram, setSelectedProgram] = useState("")

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode)
    const country = countries.find((c) => c.code === countryCode)
    setPhonePlaceholder(country?.placeholder || "Phone number")
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const data = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      nationality: formData.get("nationality"),
      country: selectedCountry,
      program: selectedProgram,
      preferredDate: formData.get("preferredDate"),
      message: formData.get("message"),
      submittedAt: new Date(),
    }

    try {
      await addDoc(collection(db, "registrations"), data)
      alert("✅ Registration submitted successfully!")
    } catch (error) {
      console.error("❌ Submission error:", error)
      alert("There was a problem submitting your registration.")
    }
  }

  return (
    <div className="min-h-screen bg-fixed bg-center bg-cover bg-no-repeat bg-[url('/images/4858838.jpg')]">
      <div className="min-h-screen backdrop-blur-sm flex items-start justify-center py-12 px-6">
        <div className="w-full max-w-2xl">

          <Card className="bg-gradient-to-r from-emerald-50 to-amber-50 border border-emerald-100 shadow-sm mb-12">
            <CardContent className="text-center py-10 px-6">
              <h1 className="text-4xl md:text-6xl font-bold text-emerald-800 mb-4">
                Goodlife Consulting Partners
              </h1>
              <p className="text-xl md:text-2xl text-amber-700 mb-2">
                Professional Training Programs Registration
              </p>
              <p className="text-lg text-emerald-700">
                Invest in your future with our comprehensive training solutions
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-emerald-800 mb-2">
                🎓 Register for Training
              </CardTitle>
              <CardDescription className="text-lg text-amber-700">
                Complete the form below to secure your spot in our professional training programs
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-emerald-800 font-medium flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    required
                    className="rounded-xl border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-emerald-800 font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    className="rounded-xl border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                {/* Country + Nationality */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-emerald-800 font-medium flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Country
                    </Label>
                    <Select onValueChange={handleCountryChange} value={selectedCountry} name="country" required>
                      <SelectTrigger className="rounded-xl border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500">
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nationality" className="text-emerald-800 font-medium flex items-center gap-2">
                      🌍 Nationality
                    </Label>
                    <Input
                      id="nationality"
                      name="nationality"
                      placeholder="Your nationality"
                      required
                      className="rounded-xl border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-emerald-800 font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder={phonePlaceholder}
                    required
                    className="rounded-xl border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                {/* Program */}
                <div className="space-y-2">
                  <Label htmlFor="program" className="text-emerald-800 font-medium flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Selected Training Program
                  </Label>
                  <Select onValueChange={setSelectedProgram} value={selectedProgram} name="program" required>
                    <SelectTrigger className="rounded-xl border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500">
                      <SelectValue placeholder="Choose your training program" />
                    </SelectTrigger>
                    <SelectContent>
                      {trainingPrograms.map((program) => (
                        <SelectItem key={program} value={program.toLowerCase().replace(/\s+/g, "-")}>
                          {program}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Preferred Date */}
                <div className="space-y-2">
                  <Label htmlFor="preferredDate" className="text-emerald-800 font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Preferred Date
                  </Label>
                  <Input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    required
                    className="rounded-xl border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-emerald-800 font-medium flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Any additional notes or questions?"
                    rows={4}
                    className="rounded-xl border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl"
                  >
                    Submit Registration
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}