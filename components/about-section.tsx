import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, FileText } from "lucide-react"

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-forest-50 to-terracotta-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About Goodlife Consulting Partners</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-terracotta-500 to-forest-500 mx-auto rounded-full mb-8" />
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              At Goodlife Consulting Partners, we foster growth and resilience through expert-led programs. Our mission
              is to equip individuals and teams with real-world skills to thrive in today's landscape.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <Card className="border-l-4 border-l-terracotta-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Vision</h3>
                  <p className="text-gray-700">
                    To be Rwanda's leading catalyst for professional development, creating a generation of confident,
                    skilled leaders who drive positive change.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-forest-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Approach</h3>
                  <p className="text-gray-700">
                    We combine international best practices with local insights, delivering practical, culturally
                    relevant training that creates lasting impact.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Company Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-terracotta-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p className="text-gray-600">PO Box 6061, Kicukiro Kagarama</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <FileText className="h-5 w-5 text-forest-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Registration</p>
                      <p className="text-gray-600">RDB Reg: 141434783</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-terracotta-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600">+250 790 363 700</p>
                      <p className="text-gray-600">Toll free: 9001</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-forest-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">gcp@goodlifeconsultingpartners.org</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
