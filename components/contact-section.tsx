"use client"

import { useState } from "react"

export default function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsSubmitted(true)
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
          <div className="border-0 shadow-xl rounded-xl bg-white p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-br from-forest-500 to-terracotta-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-white font-bold text-xl">✓</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="contact-name">Name *</label>
                    <input
                      id="contact-name"
                      required
                      className="rounded-lg border border-gray-300 px-4 py-2 w-full focus:outline-none focus:ring focus:border-terracotta-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email">Email *</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      className="rounded-lg border border-gray-300 px-4 py-2 w-full focus:outline-none focus:ring focus:border-terracotta-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-message">Message *</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    className="rounded-lg border border-gray-300 px-4 py-2 w-full focus:outline-none focus:ring focus:border-terracotta-500"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-terracotta-600 to-forest-600 hover:from-terracotta-700 hover:to-forest-700 text-white rounded-full py-3 font-semibold transition-all duration-300"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      ✉️ Send Message
                    </div>
                  )}
                </button>

                {/* Advertisement Placeholder */}
                <div className="text-center pt-6">
                  <div className="inline-block px-4 py-2 bg-forest-50 text-forest-700 border border-forest-200 rounded-full text-sm shadow-sm">
                    Place for Advertisement or Partner Branding
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div className="border-0 shadow-xl rounded-xl bg-white p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Company Details</h3>
              <div className="space-y-4 text-gray-700 text-sm">
                <p><strong>📍 Address:</strong><br />PO Box 6061, Kicukiro Kagarama<br />Kigali, Rwanda</p>
                <p><strong>🔖 Registration:</strong><br />RDB Reg: 141434783</p>
                <p><strong>📞 Phone:</strong><br />+250 790 363 700<br />Toll Free: 9001</p>
                <p><strong>📧 Email:</strong><br />info@goodlifeconsultingpartners.org</p>
              </div>
            </div>

            <div className="overflow-hidden border-0 shadow-xl rounded-xl">
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
            </div>

            <button
              onClick={() => window.open("https://wa.me/250790363700", "_blank")}
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              💬 Chat on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}