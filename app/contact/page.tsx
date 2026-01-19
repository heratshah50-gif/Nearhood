"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Send, CheckCircle2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoginModal from "@/components/auth/LoginModal";
import { useRouter } from "next/navigation";

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const countryCodes = [
  { code: "+91", country: "India" },
  { code: "+1", country: "United States" },
  { code: "+44", country: "United Kingdom" },
  { code: "+971", country: "UAE" },
  { code: "+61", country: "Australia" },
  { code: "+65", country: "Singapore" },
];

export default function ContactUs() {
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    countryCode: "+91",
    email: "",
    message: "",
    communicationPreference: "phone",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        countryCode: "+91",
        email: "",
        message: "",
        communicationPreference: "phone",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Header onLoginClick={() => setIsLoginModalOpen(true)} />

      <main className="flex-1">
        <div className="container-custom pt-20 md:pt-24 lg:pt-28 pb-16">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 md:mb-16"
          >
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              We&apos;re here for your{" "}
              <span className="text-primary-600">Buying Journey</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
              Discover the easiest ways to get in touch with us and make your buying journey smarter.
            </p>
          </motion.div>

          {/* Connect With Us Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-12"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-neutral-800 mb-6">
              Connect With Us On
            </h2>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border-2 border-neutral-200 hover:border-primary-500 hover:bg-primary-50 flex items-center justify-center transition-all text-neutral-600 hover:text-primary-600 shadow-sm hover:shadow-md"
                  >
                    <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Contact Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-6 md:p-8 lg:p-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
                  Contact Us
                </h2>
                <p className="text-neutral-600">
                  Let&apos;s get your questions answered! Fill out the form, and we&apos;ll reach out within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      First name
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Last name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Phone
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={formData.countryCode}
                      onChange={(e) =>
                        setFormData({ ...formData, countryCode: e.target.value })
                      }
                      className="px-3 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                    >
                      {countryCodes.map((cc) => (
                        <option key={cc.code} value={cc.code}>
                          {cc.code} {cc.country}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="Enter your phone number"
                      className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell us how we can help you..."
                    rows={5}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    required
                  />
                </div>

                {/* Communication Preference */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-3">
                    How do you prefer to communicate with us?
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="communicationPreference"
                        value="phone"
                        checked={formData.communicationPreference === "phone"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            communicationPreference: e.target.value,
                          })
                        }
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-neutral-700">Phone</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="communicationPreference"
                        value="email"
                        checked={formData.communicationPreference === "email"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            communicationPreference: e.target.value,
                          })
                        }
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-neutral-700">Email</span>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  {isSubmitted ? (
                    <div className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg font-semibold">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Details submitted successfully!</span>
                  </div>
                  ) : (
                    <button
                      type="submit"
                      className="w-full px-6 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Send className="w-5 h-5" />
                      <span>Submit Details</span>
                    </button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer hideSubscribe />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={(isAdmin) => {
          if (isAdmin) {
            const vendor =
              typeof window !== "undefined" &&
              window.sessionStorage.getItem("nearhood_vendor");
            if (vendor) router.push("/vendor");
            else router.push("/admin");
          }
        }}
      />
    </div>
  );
}
