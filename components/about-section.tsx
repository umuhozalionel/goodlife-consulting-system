// components/AboutSection.tsx
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, FileText, Phone, Mail } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden py-20 bg-gray-50 bg-white">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro text */}
        <div className="max-w-3xl mx-auto text-center mb-16 text-gray-900">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About Goodlife Consulting Partners
          </h2>
          <p className="text-lg leading-relaxed">
            Welcome to Goodlife Consulting Partners. At Goodlife Consulting
            Partners, we are dedicated to fostering professional growth and
            development through our comprehensive training programs. Our mission
            is to equip individuals and organizations with the skills and
            knowledge necessary to thrive in today’s competitive landscape.
          </p>
        </div>

        {/* Vision, Approach & Company Details */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Our Vision & Approach */}
          <div className="space-y-6">
            <Card className="border-l-4 border-l-terracotta-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="bg-white bg-opacity-90 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Our Vision
                </h3>
                <p className="text-gray-700">
                  To be Rwanda’s leading catalyst for professional development,
                  creating a generation of confident, skilled leaders who drive
                  positive change.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-forest-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="bg-white bg-opacity-90 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Our Approach
                </h3>
                <p className="text-gray-700">
                  We combine international best practices with local insights,
                  delivering practical, culturally relevant training that creates
                  lasting impact.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Company Details */}
          <Card className="bg-white bg-opacity-90 shadow-xl rounded-lg overflow-hidden">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                Company Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-terracotta-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-600">PO Box 8061, Kigali-Kacyiru</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <FileText className="h-5 w-5 text-forest-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">REG Registration</p>
                    <p className="text-gray-600">148285</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-terracotta-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600">+250 788 427 202</p>
                    <p className="text-gray-600">+250 788 427 203</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-forest-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">
                      info@goodlifeconsulting.rw
                    </p>
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