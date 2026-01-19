"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Lightbulb,
  Home,
  MessageCircle,
  IndianRupee,
  Clock,
  Shield,
  Award,
  Layout,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

const deals = [
  {
    icon: Lightbulb,
    title: "Best Suggestions for Property",
    desc: "If you want to buy or invest in real estate, we guarantee the best group deals according to your requirements and budget.",
  },
  {
    icon: Home,
    title: "Help in Selling Real Estate",
    desc: "We help you sell commercial and residential real estate and secure the best price for your property.",
  },
  {
    icon: MessageCircle,
    title: "Expert Advice",
    desc: "Expert advice on group buying, RERA compliance, and negotiation. We help you choose the right property with confidence.",
  },
];

const benefits = [
  { icon: IndianRupee, title: "Price performance ratio", desc: "Group buying delivers the best value—save up to 20% on property prices." },
  { icon: Clock, title: "Timely possession", desc: "Strong delivery track record. We help you get your dream home on time and hassle-free." },
  { icon: Shield, title: "Transparent", desc: "Charges are clear with no hidden payments. Full transparency in every deal." },
  { icon: Award, title: "Commitment to quality", desc: "We focus on RERA-verified projects and trusted builders for every listing." },
  { icon: Layout, title: "Functional design", desc: "Properties with smart layouts and modern architecture for a better lifestyle." },
  { icon: BarChart3, title: "High utilization", desc: "Efficient processes and support so you can focus on your new home." },
];

export default function GetBestDeals() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-neutral-50" id="get-best-deals">
      <div className="container-custom">
        {/* Top: Get Best Deals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2
            className="text-2xl lg:text-3xl font-bold text-neutral-800 mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Get Best Deals with Nearhood
          </h2>
          <p className="text-neutral-500">
            We suggest the best property and provide professional support for every group-buying journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {deals.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-neutral-100 p-8 shadow-sm hover:shadow-lg hover:border-primary-100 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3
                  className="text-lg font-bold text-neutral-800 mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.title}
                </h3>
                <p className="text-neutral-500 mb-6">{item.desc}</p>
                <Link
                  href="/properties"
                  className="text-primary-600 font-semibold hover:text-primary-700 transition-colors inline-flex items-center gap-1"
                >
                  Learn more <span>→</span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom: Why Choose Nearhood */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-10"
        >
          <h3
            className="text-2xl lg:text-3xl font-bold text-neutral-800 mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Why Choose Nearhood
          </h3>
          <p className="text-neutral-500">
            Nearhood connects you directly with verified properties, trusted developers and curated group deals.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                className="p-6 rounded-xl border border-neutral-100 hover:border-primary-100 hover:bg-primary-50/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <h4 className="font-bold text-neutral-800 mb-2 capitalize">{item.title}</h4>
                <p className="text-sm text-neutral-500">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
