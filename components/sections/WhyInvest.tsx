"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Building2, Shield, TrendingUp, Leaf } from "lucide-react";

export default function WhyInvest() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [expanded, setExpanded] = useState(false);

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-neutral-50" id="why-invest">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-2xl lg:text-3xl font-bold text-neutral-800 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Why Invest in Bulk Buy Items with Nearhood
            </h2>
            <p className="text-neutral-600 mb-4 leading-relaxed">
              Investing in bulk buy items with <strong>group buying</strong> provides an excellent return on investment. 
              Buying through Nearhood today can bring you great benefits—save up to 20% and get your items sooner.
            </p>
            <p className="text-neutral-600 mb-4 leading-relaxed">
              Nearhood is built on integrity in bulk buying, offering premium items in Ahmedabad. 
              Our platform is designed to redefine how you buy—transparent, secure, and focused on your savings.
            </p>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-4"
              >
                <p className="text-neutral-600 leading-relaxed">
                  <strong>Quality and value—</strong> Our bulk buy items blend thoughtful selection with quality at 
                  affordable group prices. Choose from different categories to match your needs.
                </p>
                <p className="text-neutral-600 leading-relaxed">
                  <strong>Trust and quality—</strong> We focus on verified items with quality assurance, 
                  strong supplier relationships, and trusted vendors. Our platform connects you with reliable suppliers.
                </p>
                <p className="text-neutral-600 leading-relaxed">
                  <strong>Quality assurance—</strong> Bulk buy items on Nearhood offer quality checks, verified suppliers, 
                  and reliable delivery. Every listing is verified for your peace of mind.
                </p>
              </motion.div>
            )}
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-4 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              {expanded ? "Read less" : "Read more"}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: Building2, title: "Premium Items", desc: "Handpicked verified bulk buy items" },
              { icon: Shield, title: "Secure & Transparent", desc: "Escrow and clear documentation" },
              { icon: TrendingUp, title: "Save Up to 20%", desc: "Group discounts on every deal" },
              { icon: Leaf, title: "Quality Assured", desc: "Verified suppliers and quality checks" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-xl bg-white border border-neutral-100"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <h4 className="font-semibold text-neutral-800 mb-1">{item.title}</h4>
                  <p className="text-sm text-neutral-500">{item.desc}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
