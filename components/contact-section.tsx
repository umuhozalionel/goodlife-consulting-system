// components/contact-section.tsx
"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Loader2 as Spinner,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Building2,
  XCircle,
  MessageCircle,
  Send,
  Star,
  Users,
  Lightbulb,
  Heart,
} from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [activeField, setActiveField] = useState("");

  function validate() {
    const errs: typeof errors = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      errs.email = "Valid email is required";
    if (!formData.message.trim()) errs.message = "Message is required";
    return errs;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError("");
    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      return;
    }
    if (formData.honeypot) return;

    setIsLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1500));
      setSuccess(true);
      setFormData({ name: "", email: "", message: "", honeypot: "" });
      setTimeout(() => setSuccess(false), 5000);
    } catch {
      setSubmitError("Unexpected error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Office",
      content: "PO Box 6061, Kicukiro Kagarama\nKigali, Rwanda",
      subtitle: "Central Location, Easy Access"
    },
    {
      icon: Phone,
      title: "Call Us Directly",
      content: "+250 790 363 700",
      subtitle: "Toll Free: 9001 • Mon-Fri, 8AM-6PM",
      action: "tel:+250790363700"
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "info@goodlifeconsultingpartners.org",
      subtitle: "Response within 2 hours",
      action: "mailto:info@goodlifeconsultingpartners.org"
    },
    {
      icon: Building2,
      title: "Business Details",
      content: "RDB Registration: 141434783",
      subtitle: "Fully Licensed & Accredited"
    }
  ];

  return (
    <section id="contact" className="relative py-20 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-blue-50/30" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            Share Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-slate-800"> Vision</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-slate-800 rounded-full mx-auto mb-6" />
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Your ideas drive our innovation. Share your feedback, suggestions, or just say hello. 
            We're always listening and eager to improve together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
          {/* Contact Info - 2/5 width */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2, scale: 1.02 }}
                className="group"
              >
                <Card className="shadow-lg rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                        <item.icon className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                        {item.action ? (
                          <a 
                            href={item.action}
                            className="text-slate-700 hover:text-blue-600 transition-colors duration-300 block mb-1"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-slate-700 mb-1 whitespace-pre-line">{item.content}</p>
                        )}
                        <p className="text-sm text-slate-500">{item.subtitle}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4 p-6 bg-slate-900 rounded-2xl text-white"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">2h</div>
                <div className="text-sm text-slate-300">Avg. Response</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">98%</div>
                <div className="text-sm text-slate-300">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">24/7</div>
                <div className="text-sm text-slate-300">Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">1k+</div>
                <div className="text-sm text-slate-300">Connections</div>
              </div>
            </motion.div>

            {/* WhatsApp CTA */}
            <motion.button
              onClick={() => window.open("https://wa.me/250790363700", "_blank")}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center justify-center gap-3">
                <MessageCircle className="h-6 w-6" />
                <div className="text-left">
                  <div className="font-semibold">Quick Chat</div>
                  <p className="text-green-100 text-sm">Instant response on WhatsApp</p>
                </div>
              </div>
            </motion.button>
          </motion.div>

          {/* Feedback Form - 3/5 width */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <Card className="shadow-2xl rounded-2xl overflow-hidden border-0 bg-gradient-to-br from-white to-slate-50">
              <CardContent className="p-0">
                {!success ? (
                  <form onSubmit={handleSubmit} noValidate className="p-8">
                    {/* honeypot */}
                    <input
                      type="text"
                      name="website"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                      autoComplete="off"
                      tabIndex={-1}
                      className="hidden"
                    />

                    <fieldset disabled={isLoading}>
                      <div className="grid grid-cols-1 gap-6 mb-6">
                        {/* Name */}
                        <div className="space-y-2">
                          <label htmlFor="contact-name" className="block text-sm font-semibold text-slate-700">
                            Your Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              id="contact-name"
                              name="name"
                              type="text"
                              autoComplete="name"
                              className={`w-full rounded-xl border-2 ${
                                errors.name
                                  ? "border-red-300 focus:border-red-500"
                                  : activeField === 'name' 
                                    ? "border-blue-500"
                                    : "border-slate-200 focus:border-blue-500"
                              } px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white`}
                              value={formData.name}
                              onChange={(e) => {
                                setFormData({ ...formData, name: e.target.value });
                                setErrors({ ...errors, name: undefined });
                              }}
                              onFocus={() => setActiveField('name')}
                              onBlur={() => setActiveField('')}
                              aria-invalid={!!errors.name}
                              placeholder="What should we call you?"
                              required
                            />
                            <Users className={`absolute right-3 top-3 h-5 w-5 transition-colors duration-300 ${
                              activeField === 'name' ? 'text-blue-500' : 'text-slate-400'
                            }`} />
                          </div>
                          {errors.name && (
                            <p className="text-red-600 text-sm flex items-center gap-1">
                              <XCircle className="h-4 w-4" />
                              {errors.name}
                            </p>
                          )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                          <label htmlFor="contact-email" className="block text-sm font-semibold text-slate-700">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              id="contact-email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              className={`w-full rounded-xl border-2 ${
                                errors.email
                                  ? "border-red-300 focus:border-red-500"
                                  : activeField === 'email' 
                                    ? "border-blue-500"
                                    : "border-slate-200 focus:border-blue-500"
                              } px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white`}
                              value={formData.email}
                              onChange={(e) => {
                                setFormData({ ...formData, email: e.target.value });
                                setErrors({ ...errors, email: undefined });
                              }}
                              onFocus={() => setActiveField('email')}
                              onBlur={() => setActiveField('')}
                              aria-invalid={!!errors.email}
                              placeholder="your.email@example.com"
                              required
                            />
                            <Mail className={`absolute right-3 top-3 h-5 w-5 transition-colors duration-300 ${
                              activeField === 'email' ? 'text-blue-500' : 'text-slate-400'
                            }`} />
                          </div>
                          {errors.email && (
                            <p className="text-red-600 text-sm flex items-center gap-1">
                              <XCircle className="h-4 w-4" />
                              {errors.email}
                            </p>
                          )}
                        </div>

                        {/* Message */}
                        <div className="space-y-2">
                          <label htmlFor="contact-message" className="block text-sm font-semibold text-slate-700">
                            Your Thoughts <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <textarea
                              id="contact-message"
                              name="message"
                              rows={6}
                              className={`w-full rounded-xl border-2 ${
                                errors.message
                                  ? "border-red-300 focus:border-red-500"
                                  : activeField === 'message' 
                                    ? "border-blue-500"
                                    : "border-slate-200 focus:border-blue-500"
                              } px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white resize-none`}
                              value={formData.message}
                              onChange={(e) => {
                                setFormData({ ...formData, message: e.target.value });
                                setErrors({ ...errors, message: undefined });
                              }}
                              onFocus={() => setActiveField('message')}
                              onBlur={() => setActiveField('')}
                              aria-invalid={!!errors.message}
                              placeholder="Share your ideas, feedback, suggestions, or anything you'd like us to know..."
                              required
                            />
                            <Lightbulb className={`absolute right-3 top-3 h-5 w-5 transition-colors duration-300 ${
                              activeField === 'message' ? 'text-blue-500' : 'text-slate-400'
                            }`} />
                          </div>
                          {errors.message && (
                            <p className="text-red-600 text-sm flex items-center gap-1">
                              <XCircle className="h-4 w-4" />
                              {errors.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {submitError && (
                        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl mb-6">
                          <XCircle className="h-5 w-5 flex-shrink-0" />
                          <span>{submitError}</span>
                        </div>
                      )}

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: isLoading ? 1 : 1.02 }}
                        whileTap={{ scale: isLoading ? 1 : 0.98 }}
                        className="w-full bg-gradient-to-r from-blue-600 to-slate-800 text-white rounded-xl py-4 font-bold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center gap-3">
                            <Spinner className="h-5 w-5 animate-spin" />
                            <span>Sharing Your Thoughts...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-3">
                            <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            <span>Share Your Feedback</span>
                          </div>
                        )}
                      </motion.button>
                    </fieldset>
                  </form>
                ) : (
                  <div className="text-center p-12 space-y-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto"
                    >
                      <Heart className="h-10 w-10 text-green-600" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">Thank You for Sharing!</h3>
                      <p className="text-slate-600 max-w-md mx-auto">
                        Your feedback means the world to us. We're constantly working to improve, 
                        and your thoughts help us build a better experience for everyone.
                      </p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="pt-4"
                    >
                      <button
                        onClick={() => setSuccess(false)}
                        className="px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-xl hover:border-slate-300 transition-colors duration-300"
                      >
                        Share More Thoughts
                      </button>
                    </motion.div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 shadow-2xl rounded-2xl overflow-hidden border border-slate-200"
            >
              <div className="bg-slate-900 text-white p-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="font-semibold">Find Us in Kigali</span>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d63798.85507293057!2d30.093277011366478!3d-1.9832188536490125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgoodlife%20kicukiro!5e0!3m2!1sen!2srw!4v1751667496294!5m2!1sen!2srw"
                className="w-full h-64"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Goodlife Consulting Partners Location in Kigali"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}