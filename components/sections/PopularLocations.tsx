"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { AHMEDABAD_LOCATIONS } from "@/lib/ahmedabad-locations";

const locationCounts: Record<string, string> = {
  "SG Highway": "90+", "Bodakdev": "70+", "Satellite": "85+", "Prahlad Nagar": "80+",
  "Thaltej": "75+", "Vastrapur": "65+", "Bopal": "60+", "Gota": "55+", "Science City": "50+",
  "Maninagar": "45+", "Naroda": "40+", "Vejalpur": "45+", "Ambli": "35+", "Memnagar": "40+",
  "Navrangpura": "55+", "Sarkhej": "50+", "Sola": "30+", "Chandkheda": "35+", "Naranpura": "40+",
  "Ranip": "25+", "Nikol": "30+", "Paldi": "35+", "Motera": "25+",
};

const locations = AHMEDABAD_LOCATIONS.slice(0, 12).map((name) => ({
  name,
  count: locationCounts[name] || "20+",
  href: `/properties?location=${encodeURIComponent(name)}`,
}));

export default function PopularLocations() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-neutral-50" id="popular-locations">
      <div className="container-custom">
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
            Most Popular Places
          </h2>
          <p className="text-neutral-500">Find bulk buy items in these Ahmedabad locations with group buying deals</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((loc, index) => (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Link
                href={loc.href}
                className="group flex items-center justify-between p-5 rounded-xl border-2 border-neutral-100 hover:border-primary-200 hover:bg-primary-50/50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800 group-hover:text-primary-700">
                      {loc.name}
                    </h3>
                    <p className="text-sm text-neutral-500">{loc.count} Items</p>
                  </div>
                </div>
                <span className="text-primary-600 font-medium text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Buy with Group <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
