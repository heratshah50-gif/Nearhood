"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";

const points = [
  "We have a deep passion and commitment that reflect trust and transparency in every group deal.",
  "We offer reliable transactions with complete transparency for complete customer satisfaction.",
  "We focus on constantly identifying new projects and builders for sustainable savings.",
  "We maintain the highest level of professionalism, followed by dedicated customer support.",
  "Our group buying model helps generations of families save on their dream homes.",
];

export default function WhatMakesUnique() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-neutral-50" id="what-makes-unique">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2
            className="text-2xl lg:text-3xl font-bold text-neutral-800 mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What Makes the Nearhood Platform Unique?
          </h2>
          <p className="text-neutral-500">
            One platform that leads to trusted group buying and real savings on property
          </p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto space-y-4"
        >
          {points.map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-primary-500 flex-shrink-0 mt-0.5" />
              <span className="text-neutral-600">{point}</span>
            </li>
          ))}
        </motion.ul>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10 text-neutral-600 max-w-2xl mx-auto"
        >
          Nearhood has helped thousands of clients find the ideal home with group discounts. 
          Whether you&apos;re looking for an affordable flat or a luxury apartment, we have options that suit your needs.
        </motion.p>
      </div>
    </section>
  );
}
