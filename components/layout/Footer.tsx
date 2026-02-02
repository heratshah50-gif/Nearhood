"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Shield,
  CheckCircle2,
  Send,
} from "lucide-react";
import { useState } from "react";

const footerLinks = {
  categories: [
    { label: "Listings", href: "/listings" },
    { label: "Properties", href: "/listings?category=property" },
    { label: "Vehicles", href: "/listings?category=vehicle" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Careers", href: "#" },
    { label: "Press & Media", href: "#" },
    { label: "Partner With Us", href: "#" },
    { label: "Admin", href: "/admin" },
    { label: "Vendor", href: "/vendor" },
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "FAQs", href: "#" },
    { label: "Contact Us", href: "#contact" },
    { label: "Feedback", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "RERA Compliance", href: "#" },
    { label: "Disclaimer", href: "#" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

interface FooterProps {
  hideSubscribe?: boolean;
}

export default function Footer({ hideSubscribe = false }: FooterProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <footer id="contact" className="mt-20 lg:mt-32 scroll-mt-24">
      {/* Newsletter Section */}
      {!hideSubscribe && (
      <div className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500">
        <div className="container-custom">
          <div className="py-16 md:py-20 lg:py-24">
            <div className="max-w-4xl mx-auto text-center mb-10">
              <h3
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
                style={{ fontFamily: "var(--font-display)", color: "white" }}
              >
                Stay Updated on{" "}
                <span style={{ color: "#fde047" }}>New Group Deals</span>
              </h3>
              <p className="text-white/80 text-base lg:text-lg max-w-2xl mx-auto">
                Get notified about new properties and exclusive group buying opportunities in Ahmedabad.
              </p>
            </div>
            
            <form onSubmit={handleSubscribe} className="max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full h-14 px-6 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all text-base"
                    required
                  />
                  {isSubscribed && (
                    <div className="absolute inset-0 flex items-center justify-center bg-green-500 rounded-xl">
                      <CheckCircle2 className="w-5 h-5 text-white mr-2" />
                      <span className="text-white font-medium">Subscribed!</span>
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="h-14 px-8 bg-white text-primary-700 font-semibold rounded-xl hover:bg-neutral-50 transition-all flex items-center justify-center gap-2 text-base shadow-lg"
                >
                  <Send className="w-5 h-5" />
                  <span>Subscribe</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      )}

      {/* Main Footer Content */}
      <div className="bg-white">
        <div className="container-custom">
          <div className="py-16 md:py-20 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
              {/* Brand Column */}
              <div className="lg:col-span-4 lg:pr-8">
                <Link href="/" className="inline-block mb-6">
                  <Image
                    src="/images/logo.png"
                    alt="Nearhood"
                    width={192}
                    height={54}
                    className="h-24 sm:h-28 md:h-32 w-auto"
                  />
                </Link>
                
                <p className="text-neutral-600 mb-8 text-[15px] leading-relaxed">
                  Ahmedabad&apos;s first group buying platform. Join thousands of smart
                  buyers to unlock exclusive discounts on premium items in Ahmedabad.
                </p>

                {/* Contact Info */}
                <div className="space-y-4 mb-8">
                  <a
                    href="tel:+8799567586"
                    className="flex items-center gap-3 text-neutral-600 hover:text-primary-700 transition-colors text-[15px]"
                  >
                    <Phone className="w-5 h-5 text-primary-600" />
                    <span>+87995 67586</span>
                  </a>
                  <a
                    href="mailto:hello@nearhood.com"
                    className="flex items-center gap-3 text-neutral-600 hover:text-primary-700 transition-colors text-[15px]"
                  >
                    <Mail className="w-5 h-5 text-primary-600" />
                    <span>hello@nearhood.com</span>
                  </a>
                  <div className="flex items-start gap-3 text-neutral-600 text-[15px]">
                    <MapPin className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">
                      Near Satellite Cross Road, Satellite, Ahmedabad, Gujarat 380015
                    </span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-primary-100 hover:text-primary-700 flex items-center justify-center transition-all text-neutral-500"
                      >
                        <IconComponent className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Link Columns */}
              <div className="lg:col-span-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-5 text-sm uppercase tracking-wider">
                      Categories
                    </h4>
                    <ul className="space-y-3">
                      {footerLinks.categories.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="text-neutral-600 hover:text-primary-700 transition-colors text-[15px]"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-5 text-sm uppercase tracking-wider">
                      Company
                    </h4>
                    <ul className="space-y-3">
                      {footerLinks.company.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="text-neutral-600 hover:text-primary-700 transition-colors text-[15px]"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-5 text-sm uppercase tracking-wider">
                      Support
                    </h4>
                    <ul className="space-y-3">
                      {footerLinks.support.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="text-neutral-600 hover:text-primary-700 transition-colors text-[15px]"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-5 text-sm uppercase tracking-wider">
                      Legal
                    </h4>
                    <ul className="space-y-3">
                      {footerLinks.legal.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="text-neutral-600 hover:text-primary-700 transition-colors text-[15px]"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-neutral-50 border-t border-neutral-200">
        <div className="container-custom">
          <div className="py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                <p className="text-neutral-500 text-sm">
                  © {new Date().getFullYear()} Nearhood. All rights reserved.
                </p>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 w-fit">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-green-700 text-sm font-medium">RERA Registered</span>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <Link href="#" className="text-neutral-500 hover:text-primary-700 transition-colors">
                  Privacy
                </Link>
                <Link href="#" className="text-neutral-500 hover:text-primary-700 transition-colors">
                  Terms
                </Link>
                <Link href="#" className="text-neutral-500 hover:text-primary-700 transition-colors">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
