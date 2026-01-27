"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  Award,
  Users,
  Building2,
  TrendingUp,
  BadgeCheck,
  Play,
  CheckCircle2,
  MapPin,
  Star,
} from "lucide-react";

const trustPoints = [
  {
    icon: Shield,
    title: "100% Secure Transactions",
    description: "All payments are processed through secure banking channels with escrow protection.",
  },
  {
    icon: BadgeCheck,
    title: "Quality Verified Items",
    description: "Every listed bulk buy item is verified and quality-checked for your assurance.",
  },
  {
    icon: Award,
    title: "Expert Negotiation Team",
    description: "Our experienced team has closed 200+ deals with average savings of 15%.",
  },
  {
    icon: Users,
    title: "Community of 500+ Buyers",
    description: "Join a trusted community of smart home buyers in Ahmedabad.",
  },
];

const stats = [
  { value: "200+", label: "Groups Completed", icon: Users },
  { value: "15%", label: "Average Savings", icon: TrendingUp },
  { value: "20+", label: "Locations in Ahmedabad", icon: MapPin },
  { value: "4.8", label: "Customer Rating", icon: Star },
];

const partners = [
  { name: "HDFC Bank", logo: "HDFC" },
  { name: "ICICI Bank", logo: "ICICI" },
  { name: "SBI", logo: "SBI" },
  { name: "Axis Bank", logo: "AXIS" },
  { name: "Economic Times", logo: "ET" },
  { name: "Mint", logo: "MINT" },
];

export default function Trust() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-neutral-50" id="about">
      <div className="container-custom">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 lg:mb-24">
          {/* Left Column - Trust Points */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4"
            >
              <Shield className="w-4 h-4" />
              Why Trust Nearhood
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl lg:text-4xl font-bold text-neutral-800 mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Your Trusted Partner in Group Home Buying
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-neutral-500 mb-8"
            >
              We&apos;ve helped 500+ families save over ₹45 Crores on their dream homes through 
              our transparent and secure group buying platform.
            </motion.p>

            {/* Trust Points List */}
            <div className="space-y-5">
              {trustPoints.map((point, index) => {
                const IconComponent = point.icon;
                return (
                  <motion.div
                    key={point.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 mb-1">
                        {point.title}
                      </h4>
                      <p className="text-sm text-neutral-500">{point.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Video & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Video Placeholder */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary-500 to-primary-600 aspect-video shadow-2xl shadow-primary-500/30">
              {/* Video Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group hover:scale-110 transition-transform">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xl">
                    <Play className="w-7 h-7 text-primary-600 ml-1" />
                  </div>
                </button>
              </div>
              
              {/* Video Info */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Watch Our Story</p>
                    <p className="text-white/70 text-xs">See how group buying works</p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                  2:30
                </span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="p-5 rounded-xl bg-neutral-50 border border-neutral-100"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                        <IconComponent className="w-4 h-4 text-primary-600" />
                      </div>
                    </div>
                    <p
                      className="text-2xl font-bold text-neutral-800 mb-0.5"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-sm text-neutral-500">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="pt-12 border-t border-neutral-100"
        >
          <div className="text-center mb-8">
            <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-2">
              Trusted By & Featured In
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                className="flex items-center justify-center px-6 py-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors"
              >
                <span className="text-xl font-bold text-neutral-400 hover:text-neutral-600 transition-colors">
                  {partner.logo}
                </span>
              </motion.div>
            ))}
          </div>

          {/* RERA Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-12 p-4 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="text-sm text-green-700">
              <span className="font-semibold">Quality Assured Platform</span> - All bulk buy items 
              listed are verified and quality-checked for your peace of mind
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


