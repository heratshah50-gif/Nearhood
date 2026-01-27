"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  ChevronDown,
} from "lucide-react";

const CITIES = ["Ahmedabad", "Mumbai", "Bengaluru", "Delhi NCR", "Pune"];

export default function LandingHero() {
  const [city, setCity] = useState("Ahmedabad");
  const [cityOpen, setCityOpen] = useState(false);

  const propertiesHref =
    "/properties" + (city ? `?city=${encodeURIComponent(city)}` : "");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-primary-50/70 to-neutral-50 pt-32 md:pt-40 pb-16 md:pb-20">
      {/* Soft background image / gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/images/hero-building.png')] bg-cover bg-center opacity-30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/60 via-primary-50/40 to-neutral-50" />
      </div>

      <div className="relative z-10 container-custom flex flex-col items-center text-center gap-6 md:gap-8">
        {/* Main headline */}
        <div className="max-w-3xl">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-3 md:mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Buy Together. <span className="text-primary-700">Save Together.</span>
          </h1>
          <p className="text-base md:text-lg text-neutral-700">
            Join bulk-buy groups in your neighborhood, get exclusive deals, and
            save big on properties and more categories.
          </p>
        </div>

        {/* Centered city selector card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl bg-white rounded-2xl shadow-2xl shadow-primary-500/15 border border-neutral-100 px-4 py-4 md:px-8 md:py-6"
        >
          <div className="text-left mb-3 md:mb-4">
            <label className="block text-xs md:text-sm font-semibold text-neutral-600 mb-1">
              Select Your City
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setCityOpen((open) => !open)}
                className="w-full flex items-center justify-between gap-2 rounded-xl border-2 border-primary-300 bg-white px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-neutral-900 shadow-[0_0_0_1px_rgba(255,255,255,0.6)]"
              >
                <span className="flex items-center gap-2 min-w-0">
                  <MapPin className="w-4 h-4 text-primary-600 flex-shrink-0" />
                  <span className="truncate">{city}</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-primary-500 transition-transform flex-shrink-0 ${
                    cityOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {cityOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    aria-hidden
                    onClick={() => setCityOpen(false)}
                  />
                  <div className="absolute top-full left-0 right-0 mt-1 rounded-xl bg-white shadow-xl border border-primary-100 z-50 overflow-hidden">
                    {CITIES.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => {
                          setCity(c);
                          setCityOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm md:text-base transition-colors ${
                          c === city
                            ? "bg-primary-50 text-primary-700 font-medium"
                            : "text-neutral-800 hover:bg-primary-50/70"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <Link
            href={propertiesHref}
            className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-2.5 md:py-3 text-sm md:text-base font-semibold text-white shadow-md hover:shadow-lg hover:from-primary-600 hover:to-primary-700 transition-all"
          >
            Confirm Location
          </Link>
        </motion.div>

        {/* Secondary headline under card */}
        <div className="max-w-3xl mt-4 md:mt-6">
          <h2
            className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Buy Together. Save Together.
          </h2>
          <p className="text-sm md:text-base text-neutral-700">
            Join bulk-buy groups in your neighborhood to get exclusive bulk
            deals on properties, vehicles, electronics, and more.
          </p>
        </div>
      </div>
    </section>
  );
}

