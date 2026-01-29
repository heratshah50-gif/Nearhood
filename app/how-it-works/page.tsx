"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoginModal from "@/components/auth/LoginModal";
import {
  Search,
  UserPlus,
  Handshake,
  PartyPopper,
  ArrowRight,
  CheckCircle2,
  Building2,
  Car,
  MapPin,
  FileCheck,
  BadgePercent,
} from "lucide-react";

const genericSteps = [
  {
    number: "01",
    title: "Browse & Discover",
    description:
      "Explore our curated selection of premium items with active group buying opportunities—properties and vehicles in Ahmedabad.",
    icon: Search,
    color: "from-primary-400 to-primary-500",
    benefits: ["Verified listings", "Transparent pricing", "Quality assured"],
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
      "Our expert team leverages the collective buying power of the group to negotiate the best possible deal with suppliers.",
    icon: Handshake,
    color: "from-primary-500 to-primary-600",
    benefits: ["Bulk discounts", "Extra benefits", "Better payment plans"],
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

const propertySteps = [
  {
    number: "1",
    title: "Shortlist Your Project",
    description:
      "Use search, filters, and virtual visits to shortlist your top property projects. Compare locations, prices, and developer track records.",
    icon: Building2,
    benefits: ["Search & map", "Virtual site visits", "Compare projects"],
  },
  {
    number: "2",
    title: "Express Interest",
    description:
      "Plan a site visit with guidance from our team. Get all the facts and data you need to choose your dream project.",
    icon: MapPin,
    benefits: ["Guided site visits", "Transparent data", "No pressure"],
  },
  {
    number: "3",
    title: "Join a Group",
    description:
      "Join an active buying group for your chosen project. Select from available inventory and reserve your unit.",
    icon: UserPlus,
    benefits: ["Active groups", "Choose your unit", "Secure your spot"],
  },
  {
    number: "4",
    title: "Unlock Discount",
    description:
      "Enjoy exclusive discounts and benefits through collective buying power. Save significantly compared to buying alone.",
    icon: BadgePercent,
    benefits: ["Group discounts", "Extra benefits", "Better payment plans"],
  },
  {
    number: "5",
    title: "Finalize Purchase",
    description:
      "Complete your individual purchase with confidence. We assist with documentation, legal checks, and post-sale support.",
    icon: FileCheck,
    benefits: ["Legal assistance", "RERA compliance", "Post-sale support"],
  },
];

const vehicleSteps = [
  {
    number: "1",
    title: "Browse Vehicles",
    description:
      "Explore cars and bikes with active group buying deals. Filter by brand, fuel type, budget, and compare group prices.",
    icon: Car,
    benefits: ["Cars & bikes", "Group deals", "Transparent pricing"],
  },
  {
    number: "2",
    title: "Join a Group",
    description:
      "Reserve your spot in a vehicle buying group. Pay a small booking amount to secure your place at the group price.",
    icon: UserPlus,
    benefits: ["Secure booking", "Flexible payment", "Instant confirmation"],
  },
  {
    number: "3",
    title: "We Negotiate",
    description:
      "Our team negotiates with dealers using the group's collective buying power to get you the best price and benefits.",
    icon: Handshake,
    benefits: ["Bulk discounts", "Free accessories", "Better warranty"],
  },
  {
    number: "4",
    title: "Save & Drive Away",
    description:
      "Complete your purchase at the negotiated group price. Save up to 20% and enjoy full support until delivery.",
    icon: PartyPopper,
    benefits: ["Up to 20% savings", "Delivery support", "Post-purchase care"],
  },
];

function StepCard({
  step,
  index,
  isLast,
  showConnector = true,
}: {
  step: { number: string; title: string; description: string; icon: React.ComponentType<{ className?: string }>; benefits: string[]; color?: string };
  index: number;
  isLast: boolean;
  showConnector?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const IconComponent = step.icon;
  const color = "color" in step && step.color ? step.color : "from-primary-500 to-primary-600";

  return (
    <div ref={ref} className="relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative z-10 bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl font-bold text-primary-300" style={{ fontFamily: "var(--font-display)" }}>
            {step.number}
          </span>
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
            <IconComponent className="w-7 h-7 text-white" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-neutral-800 mb-2" style={{ fontFamily: "var(--font-display)" }}>
          {step.title}
        </h3>
        <p className="text-neutral-500 text-sm leading-relaxed mb-4">{step.description}</p>
        <ul className="space-y-1.5">
          {step.benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-2 text-sm text-neutral-600">
              <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </motion.div>
      {showConnector && !isLast && (
        <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 -ml-2">
          <div
            className="h-full bg-gradient-to-r from-primary-200 to-primary-100"
            style={{
              backgroundImage: "repeating-linear-gradient(90deg, var(--primary-300) 0, var(--primary-300) 6px, transparent 6px, transparent 14px)",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default function HowItWorksPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "properties" | "vehicles">("overview");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header onLoginClick={() => setIsLoginModalOpen(true)} />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary-50/50 to-white pt-20 md:pt-28 pb-12 md:pb-16">
          <div className="container-custom">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-3">
                How it works
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Your path to smart group buying
              </h1>
              <p className="text-lg text-neutral-600">
                Whether you&apos;re buying a property or a vehicle, our simple process helps you join forces with other buyers, negotiate better deals, and save up to 20%.
              </p>
            </div>
          </div>
        </section>

        {/* Tabs: Overview | Properties | Vehicles */}
        <section className="border-b border-neutral-200 bg-white sticky top-0 z-20">
          <div className="container-custom">
            <div className="flex gap-1">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === "overview"
                    ? "border-primary-600 text-primary-600"
                    : "border-transparent text-neutral-500 hover:text-neutral-700"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("properties")}
                className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === "properties"
                    ? "border-primary-600 text-primary-600"
                    : "border-transparent text-neutral-500 hover:text-neutral-700"
                }`}
              >
                <Building2 className="w-4 h-4" />
                Properties
              </button>
              <button
                onClick={() => setActiveTab("vehicles")}
                className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === "vehicles"
                    ? "border-primary-600 text-primary-600"
                    : "border-transparent text-neutral-500 hover:text-neutral-700"
                }`}
              >
                <Car className="w-4 h-4" />
                Vehicles
              </button>
            </div>
          </div>
        </section>

        {/* Overview - 4 steps */}
        {activeTab === "overview" && (
          <section className="py-12 lg:py-20">
            <div className="container-custom">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-2xl lg:text-3xl font-bold text-neutral-800 mb-3" style={{ fontFamily: "var(--font-display)" }}>
                  Simple 4-step process
                </h2>
                <p className="text-neutral-500">
                  The same smart process for all group buying—properties and vehicles.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                {genericSteps.map((step, index) => (
                  <StepCard
                    key={step.number}
                    step={{ ...step, color: step.color }}
                    index={index}
                    isLast={index === genericSteps.length - 1}
                    showConnector={true}
                  />
                ))}
              </div>
              <div className="text-center mt-14">
                <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-primary-50/50 border border-primary-100">
                  <div className="text-center sm:text-left">
                    <p className="text-neutral-800 font-semibold mb-1">Ready to start saving?</p>
                    <p className="text-neutral-500 text-sm">Join 500+ families who bought smarter</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <Link
                      href="/properties"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
                    >
                      Explore properties
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/vehicles"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-primary-600 text-primary-600 font-semibold rounded-xl hover:bg-primary-50 transition-colors"
                    >
                      Explore vehicles
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* For Properties - 5 steps (TogetherBuying style) */}
        {activeTab === "properties" && (
          <section className="py-12 lg:py-20 bg-neutral-50/50">
            <div className="container-custom">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-2xl lg:text-3xl font-bold text-neutral-800 mb-3" style={{ fontFamily: "var(--font-display)" }}>
                  How it works for properties
                </h2>
                <p className="text-neutral-500">
                  From shortlisting your project to finalizing your purchase—we guide you at every step.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
                {propertySteps.map((step, index) => (
                  <StepCard
                    key={step.number}
                    step={{ ...step, color: "from-primary-500 to-primary-600" }}
                    index={index}
                    isLast={index === propertySteps.length - 1}
                    showConnector={true}
                  />
                ))}
              </div>
              <div className="text-center mt-14">
                <Link
                  href="/properties"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/25"
                >
                  Browse properties
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* For Vehicles - 4 steps */}
        {activeTab === "vehicles" && (
          <section className="py-12 lg:py-20 bg-neutral-50/50">
            <div className="container-custom">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-2xl lg:text-3xl font-bold text-neutral-800 mb-3" style={{ fontFamily: "var(--font-display)" }}>
                  How it works for vehicles
                </h2>
                <p className="text-neutral-500">
                  Get the best deal on cars and bikes by joining a group and buying together.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                {vehicleSteps.map((step, index) => (
                  <StepCard
                    key={step.number}
                    step={{ ...step, color: "from-primary-500 to-primary-600" }}
                    index={index}
                    isLast={index === vehicleSteps.length - 1}
                    showConnector={true}
                  />
                ))}
              </div>
              <div className="text-center mt-14">
                <Link
                  href="/vehicles"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/25"
                >
                  Browse vehicles
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
}
