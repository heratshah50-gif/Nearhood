"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Send } from "lucide-react";
import Link from "next/link";

export default function SignupCTA() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail("");
    }, 2500);
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24 bg-gradient-to-r from-primary-600 to-primary-700"
      id="signup-cta"
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto text-center lg:text-left"
        >
          <h2
            className="text-2xl lg:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Join a Group & Save on Bulk Buy Items
          </h2>
          <p className="text-white/90 text-base lg:text-lg mb-8 max-w-3xl">
            We&apos;ll help you find the right bulk buy items and group deal, and keep you updated on new group discounts
            in Ahmedabad.
          </p>

          <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* Request quote CTA */}
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-neutral-50 transition-all shadow-lg"
            >
              Request a quote <ArrowRight className="w-5 h-5" />
            </Link>

            {/* Subscribe inline */}
            <form
              onSubmit={handleSubscribe}
              className="w-full lg:flex-1 max-w-xl"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email to get new group deals"
                    className="w-full h-12 px-5 rounded-xl bg-white/10 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:border-white focus:bg-white/15 transition-all text-sm lg:text-base"
                    required
                  />
                  {isSubscribed && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-green-500/95">
                      <CheckCircle2 className="w-4 h-4 text-white mr-2" />
                      <span className="text-xs font-medium text-white">
                        Subscribed!
                      </span>
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="h-12 px-6 bg-white text-primary-700 font-semibold rounded-xl hover:bg-neutral-50 transition-all flex items-center justify-center gap-2 text-sm lg:text-base shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Subscribe</span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
