// components/AboutSection.tsx
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, FileText, Phone, Mail } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: intro + media */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                About Goodlife Consulting Partners
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed max-w-prose">
                Welcome to Goodlife Consulting Partners. At Goodlife Consulting
                Partners, we are dedicated to fostering professional growth and
                development through our comprehensive training programs. Our mission
                is to equip individuals and organizations with the skills and
                knowledge necessary to thrive in today’s competitive landscape.
              </p>
            </div>
            <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/life-7.jpg"
                alt="Goodlife consulting team"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: merged card with updated company details */}
          <Card className="shadow-lg">
            <CardContent className="space-y-10 p-6">
              {/* Our Vision */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Our Vision
                </h3>
                <p className="text-gray-700">
                  To be Rwanda’s leading catalyst for professional development,
                  creating a generation of confident, skilled leaders who drive
                  positive change.
                </p>
              </div>

              {/* Our Approach */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Our Approach
                </h3>
                <p className="text-gray-700">
                  We combine international best practices with local insights,
                  delivering practical, culturally relevant training that creates
                  lasting impact.
                </p>
              </div>

              {/* Company Details */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  Company Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-terracotta-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">📍 Address</p>
                      <p className="text-gray-600">
                        PO Box 6061, Kicukiro Kagarama<br />
                        Kigali, Rwanda
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FileText className="h-5 w-5 text-forest-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">🔖 Registration</p>
                      <p className="text-gray-600">RDB Reg: 141434783</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-terracotta-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">📞 Phone</p>
                      <p className="text-gray-600">
                        +250 790 363 700<br />
                        Toll Free: 9001
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-forest-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">📧 Email</p>
                      <p className="text-gray-600">
                        info@goodlifeconsultingpartners.org
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}