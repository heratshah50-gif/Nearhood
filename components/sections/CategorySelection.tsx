"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Building2, Car, ArrowRight, MoreHorizontal } from "lucide-react";

export default function CategorySelection() {
  return (
    <section id="categories" className="py-6 md:py-8 bg-neutral-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl md:rounded-3xl shadow-md border border-neutral-200 px-3 md:px-6 py-3 md:py-4 flex flex-wrap items-center gap-2 md:gap-4"
        >
          {/* Left label */}
          <span className="text-xs md:text-sm font-semibold text-neutral-500 uppercase tracking-wide mr-2">
            Categories
          </span>

          {/* Primary category tabs */}
          <div className="flex items-center gap-2 md:gap-3 flex-wrap">
            <Link
              href="/listings?category=property"
              className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-primary-600 text-white text-xs md:text-sm font-semibold shadow-sm"
            >
              <Building2 className="w-4 h-4" />
              <span>Property</span>
            </Link>

            <Link
              href="/listings?category=vehicle"
              className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-neutral-100 text-neutral-800 hover:bg-primary-50 hover:text-primary-700 text-xs md:text-sm font-medium border border-neutral-200 hover:border-primary-200 transition-colors"
            >
              <Car className="w-4 h-4" />
              <span>Vehicles</span>
            </Link>

            <button
              type="button"
              className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-neutral-100 text-neutral-800 hover:bg-primary-50 hover:text-primary-700 text-xs md:text-sm font-medium border border-neutral-200 hover:border-primary-200 transition-colors"
            >
              <span>Electronics</span>
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-neutral-100 text-neutral-800 hover:bg-primary-50 hover:text-primary-700 text-xs md:text-sm font-medium border border-neutral-200 hover:border-primary-200 transition-colors"
            >
              <MoreHorizontal className="w-4 h-4" />
              <span>More</span>
            </button>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* More categories pill */}
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white text-primary-600 hover:bg-primary-50 text-xs md:text-sm font-semibold border border-primary-200 hover:border-primary-300 transition-colors ml-auto"
          >
            <span>More Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
