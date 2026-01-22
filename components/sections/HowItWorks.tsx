"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  Search,
  UserPlus,
  Handshake,
  PartyPopper,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Browse & Discover",
    description:
      "Explore our curated selection of premium properties with active group buying opportunities in Ahmedabad.",
    icon: Search,
    color: "from-primary-400 to-primary-500",
    benefits: ["Verified listings", "Transparent pricing", "RERA registered"],
  },
  {
    number: "02",
    title: "Join a Group",
    description:
      "Reserve your spot in a buying group with like-minded buyers. Pay a nominal booking amount to secure your place.",
    icon: UserPlus,
    color: "from-primary-500 to-primary-600",
    benefits: ["Flexible payments", "Secure booking", "Instant confirmation"],
  },
  {
    number: "03",
    title: "We Negotiate",
    description:
      "Our expert team leverages the collective buying power of the group to negotiate the best possible deal with developers.",
    icon: Handshake,
    color: "from-primary-500 to-primary-600",
    benefits: ["Bulk discounts", "Extra amenities", "Better payment plans"],
  },
  {
    number: "04",
    title: "Save Big",
    description:
      "Complete your purchase at the negotiated group price and save up to 20% compared to individual buying.",
    icon: PartyPopper,
    color: "from-primary-400 to-primary-500",
    benefits: ["Up to 20% savings", "Legal assistance", "Post-sale support"],
  },
];

function StepCard({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const IconComponent = step.icon;

  return (
    <div ref={ref} className="relative">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        className="relative z-10"
      >
        {/* Step Number Badge */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className="text-5xl lg:text-6xl font-bold text-primary-100"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {step.number}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-primary-200 to-transparent" />
        </div>

        {/* Icon */}
        <div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-5 shadow-lg shadow-primary-500/20`}
        >
          <IconComponent className="w-8 h-8 text-white" />
        </div>

        {/* Content */}
        <h3
          className="text-xl lg:text-2xl font-bold text-neutral-800 mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {step.title}
        </h3>
        <p className="text-neutral-500 leading-relaxed mb-4">{step.description}</p>

        {/* Benefits */}
        <ul className="space-y-2">
          {step.benefits.map((benefit) => (
            <li
              key={benefit}
              className="flex items-center gap-2 text-sm text-neutral-600"
            >
              <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Connector Line - Desktop */}
      {!isLast && (
        <div className="hidden lg:block absolute top-24 left-[calc(100%_-_40px)] w-[calc(100%_-_80px)]">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
            className="h-0.5 bg-gradient-to-r from-primary-300 via-primary-200 to-primary-300 origin-left"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, var(--primary-300) 0, var(--primary-300) 8px, transparent 8px, transparent 16px)",
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.15 + 0.6 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary-400"
          />
        </div>
      )}

      {/* Connector Line - Mobile */}
      {!isLast && (
        <div className="lg:hidden absolute left-8 top-full h-8 w-0.5 bg-gradient-to-b from-primary-300 to-transparent" />
      )}
    </div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24 bg-gradient-to-b from-white via-primary-50/30 to-white overflow-hidden"
      id="how-it-works"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-primary-500" />
            Simple 4-Step Process
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl lg:text-5xl font-bold text-neutral-800 mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Your Path to Smart Property Buying
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-neutral-500"
          >
            Join thousands of buyers who have saved lakhs on their dream home through our 
            simple group buying process
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 mb-16">
          {steps.map((step, index) => (
            <StepCard
              key={step.number}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-white shadow-xl shadow-neutral-200/50 border border-neutral-100">
            <div className="text-center sm:text-left">
              <p className="text-neutral-800 font-semibold mb-1">
                Ready to start saving?
              </p>
              <p className="text-neutral-500 text-sm">
                Join 500+ families who bought smarter
              </p>
            </div>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all whitespace-nowrap"
            >
              Start Your Journey
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-40 w-80 h-80 rounded-full bg-primary-100/50 blur-3xl" />
          <div className="absolute bottom-1/4 -right-40 w-80 h-80 rounded-full bg-primary-100/50 blur-3xl" />
        </div>
      </div>
    </section>
  );
}


