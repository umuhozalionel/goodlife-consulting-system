"use client"

import type React from "react"
import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Send,
  BadgeCheck,
} from "lucide-react"

export default function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsSubmitted(true)

    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-terracotta-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Get In Touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-terracotta-500 to-forest-500 mx-auto rounded-full mb-8" />
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ready to start your professional development journey? Contact us today to learn more about our training programs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-forest-500 to-terracotta-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Name *</Label>
                      <Input
                        id="contact-name"
                        required
                        className="rounded-lg border-gray-300 focus:border-terracotta-500 focus:ring-terracotta-500"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Email *</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        required
                        className="rounded-lg border-gray-300 focus:border-terracotta-500 focus:ring-terracotta-500"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Message *</Label>
                    <Textarea
                      id="contact-message"
                      required
                      rows={5}
                      className="rounded-lg border-gray-300 focus:border-terracotta-500 focus:ring-terracotta-500"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-terracotta-600 to-forest-600 hover:from-terracotta-700 hover:to-forest-700 text-white rounded-full py-3 font-semibold transition-all duration-300"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Info, Map & WhatsApp */}
          <div className="space-y-8">
            {/* Company Details */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Company Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-terracotta-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p className="text-gray-600">
                        PO Box 6061, Kicukiro Kagarama
                        <br />
                        Kigali, Rwanda
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <BadgeCheck className="h-5 w-5 text-forest-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Registration</p>
                      <p className="text-gray-600">RDB Reg: 141434783</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-forest-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600">+250 790 363 700</p>
                      <p className="text-gray-600">Toll Free: 9001</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-terracotta-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">info@goodlifeconsultingpartners.org</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Google Map */}
            <Card className="border-0 shadow-xl overflow-hidden">
              <CardContent className="p-0">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d63798.85507293057!2d30.093277011366478!3d-1.9832188536490125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgoodlife%20kicukiro!5e0!3m2!1sen!2srw!4v1751667496294!5m2!1sen!2srw"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-64 md:h-72"
                />
              </CardContent>
            </Card>

            {/* WhatsApp Contact */}
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.open("https://wa.me/250790363700", "_blank")}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}