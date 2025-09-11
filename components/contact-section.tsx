// components/contact-section.tsx
"use client";

import { useState, FormEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Loader2 as Spinner,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Building2,
  XCircle,
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
      // simulate network delay
      await new Promise((res) => setTimeout(res, 1500));

      setSuccess(true);
      setFormData({ name: "", email: "", message: "", honeypot: "" });
      setTimeout(() => setSuccess(false), 4000);
    } catch {
      setSubmitError("Unexpected error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-left mb-12 max-w-3xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Get In Touch</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#3B2F2F] to-[#F5EDEA] mb-6" />
          <p className="text-lg text-gray-700">
            Ready to start your professional development journey? Fill out the
            form below and we’ll respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* CONTACT FORM */}
          <Card className="shadow-lg rounded-lg overflow-hidden">
            <CardContent className="p-8">
              {!success ? (
                <form onSubmit={handleSubmit} noValidate>
                  {/* honeypot */}
                  <input
                    type="text"
                    name="website"
                    value={formData.honeypot}
                    onChange={(e) =>
                      setFormData({ ...formData, honeypot: e.target.value })
                    }
                    autoComplete="off"
                    tabIndex={-1}
                    className="hidden"
                  />

                  <fieldset disabled={isLoading}>
                    <div className="space-y-6">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Name<span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          className={`w-full rounded-md border ${
                            errors.name
                              ? "border-rose-500 focus:ring-rose-300"
                              : "border-gray-300 focus:ring-emerald-300"
                          } px-4 py-2 focus:outline-none focus:ring-2`}
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            setErrors({ ...errors, name: undefined });
                          }}
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? "error-name" : undefined}
                          placeholder="Your full name"
                          required
                        />
                        {errors.name && (
                          <p id="error-name" className="text-rose-600 text-sm mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Email<span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          className={`w-full rounded-md border ${
                            errors.email
                              ? "border-rose-500 focus:ring-rose-300"
                              : "border-gray-300 focus:ring-emerald-300"
                          } px-4 py-2 focus:outline-none focus:ring-2`}
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            setErrors({ ...errors, email: undefined });
                          }}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "error-email" : undefined}
                          placeholder="your.email@example.org"
                          required
                        />
                        {errors.email && (
                          <p id="error-email" className="text-rose-600 text-sm mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="contact-message"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Message<span className="text-rose-500">*</span>
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          rows={5}
                          className={`w-full rounded-md border ${
                            errors.message
                              ? "border-rose-500 focus:ring-rose-300"
                              : "border-gray-300 focus:ring-emerald-300"
                          } px-4 py-2 focus:outline-none focus:ring-2`}
                          value={formData.message}
                          onChange={(e) => {
                            setFormData({ ...formData, message: e.target.value });
                            setErrors({ ...errors, message: undefined });
                          }}
                          aria-invalid={!!errors.message}
                          aria-describedby={
                            errors.message ? "error-message" : undefined
                          }
                          placeholder="How can we help you?"
                          required
                        />
                        {errors.message && (
                          <p id="error-message" className="text-rose-600 text-sm mt-1">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      {submitError && (
                        <div className="flex items-center text-rose-600 text-sm">
                          <XCircle className="mr-2" />
                          {submitError}
                        </div>
                      )}

                      {/* Submit Button (Dark Brown Blurry Card) */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="
                          w-full flex items-center justify-center
                          bg-[#0a1932]
                          border border-[#3B2F2F] border-opacity-40
                          hover:bg-opacity-40 disabled:opacity-50
                          text-white rounded-lg py-3 font-semibold
                          transition
                        "
                      >
                        {isLoading ? (
                          <>
                            <svg
                              className="mr-3 h-5 w-5 animate-spin text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                              />
                            </svg>
                            Processing…
                          </>
                        ) : (
                          <span>✉️ Send Message</span>
                        )}
                      </button>
                    </div>
                  </fieldset>
                </form>
              ) : (
                <div aria-live="polite" className="text-center py-12 space-y-4">
                  <CheckCircle className="mx-auto h-12 w-12 text-amber-600" />
                  <h3 className="text-2xl font-semibold text-gray-900">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600">
                    We’ll respond within 24 hours.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* CONTACT INFO & MAP */}
          <div className="space-y-8">
            <Card className="shadow-lg rounded-lg overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">
                  Company Details
                </h3>
                <address className="not-italic text-gray-700 space-y-3">
                  <p className="flex items-start">
                    <MapPin className="mr-2 mt-1 text-amber-600" />
                    PO Box 6061, Kicukiro Kagarama
                    <br />
                    Kigali, Rwanda
                  </p>
                  <p className="flex items-center">
                    <Building2 className="mr-2 text-amber-600" />
                    RDB Reg: 141434783
                  </p>
                  <p className="flex items-center">
                    <Phone className="mr-2 text-amber-600" />
                    <a href="tel:+250790363700" className="hover:underline">
                      +250 790 363 700
                    </a>
                    <span className="text-gray-500 ml-1">(Toll Free 9001)</span>
                  </p>
                  <p className="flex items-center">
                    <Mail className="mr-2 text-amber-600" />
                    <a
                      href="mailto:info@goodlifeconsultingpartners.org"
                      className="hover:underline"
                    >
                      info@goodlifeconsultingpartners.org
                    </a>
                  </p>
                </address>
              </CardContent>
            </Card>

            {/* MAP */}
            <div className="shadow-lg rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d63798.85507293057!2d30.093277011366478!3d-1.9832188536490125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgoodlife%20kicukiro!5e0!3m2!1sen!2srw!4v1751667496294!5m2!1sen!2srw"
                className="w-full h-64 md:h-72"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Goodlife Consulting Partners Location"
              />
            </div>

            {/* WhatsApp Button (Dark Brown Blurry Card) */}
            <button
              onClick={() => window.open("https://wa.me/250790363700", "_blank")}
              className="
                w-full flex items-center justify-center
                bg-[#0a1932]
                border border-[#3B2F2F] border-opacity-40
                hover:bg-opacity-40
                text-white rounded-lg py-4 text-lg font-semibold
                shadow-lg transition
              "
            >
              💬 Chat on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}