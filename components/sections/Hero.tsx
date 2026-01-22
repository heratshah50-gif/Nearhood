"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, Play, Users, IndianRupee, Building2, CheckCircle, TrendingUp, MapPin, Clock, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

function AnimatedCounter({ end, suffix = "", prefix = "", duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return (
    <span ref={ref} className="counter-number">
      {prefix}{count.toLocaleString("en-IN")}{suffix}
    </span>
  );
}

const stats = [
  {
    icon: Users,
    value: 500,
    suffix: "+",
    label: "Happy Families",
  },
  {
    icon: IndianRupee,
    value: 45,
    suffix: " Cr+",
    prefix: "₹",
    label: "Total Savings",
  },
  {
    icon: Building2,
    value: 50,
    suffix: "+",
    label: "Premium Projects",
  },
];

const benefits = [
  "Save up to 20% on property prices",
  "Verified RERA compliant projects",
  "Expert negotiation support",
];

// Floating cards data
const floatingCards = [
  {
    id: 1,
    type: "members",
    icon: Users,
    iconBg: "bg-primary-100",
    iconColor: "text-primary-600",
    avatars: true,
    title: "12 Members",
    subtitle: "Joined this group",
  },
  {
    id: 2,
    type: "savings",
    icon: IndianRupee,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    title: "₹18.5 Lakhs",
    subtitle: "Average Savings",
    highlight: true,
  },
  {
    id: 3,
    type: "trending",
    icon: TrendingUp,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    title: "15% Off",
    subtitle: "Current Discount",
  },
  {
    id: 4,
    type: "location",
    icon: MapPin,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "SG Highway",
    subtitle: "Prime Location, Ahmedabad",
  },
  {
    id: 5,
    type: "closing",
    icon: Clock,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    title: "3 Days Left",
    subtitle: "Group Closing Soon",
  },
  {
    id: 6,
    type: "rating",
    icon: Star,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    title: "4.9 Rating",
    subtitle: "Builder Score",
  },
];

// Card positions around the image (alternating left and right)
const cardPositions = [
  { top: "10%", left: "0%", right: "auto" },      // top-left
  { top: "15%", right: "0%", left: "auto" },       // top-right  
  { top: "55%", left: "0%", right: "auto" },      // bottom-left
];

export default function Hero() {
  const [visibleCards, setVisibleCards] = useState<number[]>([0, 1, 2]);
  const [heroCity] = useState("Ahmedabad");
  const [heroProperty, setHeroProperty] = useState("");
  const [propertyOpen, setPropertyOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCards((prev) => {
        const nextIndex = (prev[2] + 1) % floatingCards.length;
        return [prev[1], prev[2], nextIndex];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);


  return (
    <section className="relative min-h-screen bg-white overflow-x-hidden pt-16 md:pt-20">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-primary-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-primary-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
      </div>

      <div className="container-custom relative z-10 pt-6 pb-4 md:pt-8 md:pb-6 lg:pt-12 lg:pb-8 overflow-x-hidden">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 shadow-lg shadow-orange-500/25 mb-6">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-white text-sm font-bold tracking-wide">
                Ahmedabad&apos;s #1 Group Buying Platform
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-neutral-900 mb-4 md:mb-6 leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Buy Together.{" "}
              <span className="relative">
                <span className="text-primary-700">Save Together.</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute bottom-2 left-0 right-0 h-3 bg-primary-200/50 rounded-full origin-left -z-10"
                />
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl text-neutral-600 mb-6 md:mb-8 max-w-lg leading-relaxed">
              Join thousands of smart buyers unlocking{" "}
              <span className="text-neutral-900 font-semibold">group discounts</span> on 
              premium properties in Ahmedabad.
            </p>

            {/* Benefits List */}
            <div className="space-y-3 mb-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center">
                    <CheckCircle className="w-3.5 h-3.5 text-primary-600" />
                  </div>
                  <span className="text-neutral-700">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/properties">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all text-lg cursor-pointer"
                >
                  Explore Properties
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>
              <motion.a
                href="#how-it-works"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-neutral-700 font-semibold rounded-xl border-2 border-neutral-200 hover:border-primary-300 hover:text-primary-700 transition-all text-lg"
              >
                <Play className="w-5 h-5" />
                How It Works
              </motion.a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 border-2 border-white flex items-center justify-center text-primary-700 text-sm font-medium shadow-sm"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-neutral-600 text-sm">
                <span className="text-neutral-900 font-semibold">4.8/5</span> rating from{" "}
                <span className="text-neutral-900 font-semibold">500+</span> buyers
              </div>
            </div>
          </div>

          {/* Right Content - Property Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative hidden lg:block overflow-visible"
          >
            {/* Main Image Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] w-full max-w-full">
              <Image
                src="/images/hero-building.png"
                alt="Premium residential property"
                fill
                className="object-cover w-full h-full"
                priority
                sizes="(max-width: 1024px) 0vw, 50vw"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Floating Cards - Rotating */}
            <div className="absolute inset-0 pointer-events-none">
              <AnimatePresence mode="popLayout">
                {visibleCards.map((cardIndex, positionIndex) => {
                  const card = floatingCards[cardIndex];
                  const position = cardPositions[positionIndex];
                  const IconComponent = card.icon;
                  
                  return (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -20 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      style={{
                        position: "absolute",
                        top: position.top,
                        left: position.left,
                        right: position.right,
                      }}
                      className="bg-white rounded-2xl p-3 md:p-4 shadow-xl border border-neutral-100 backdrop-blur-sm max-w-[180px] md:max-w-[200px] min-w-0 z-10 pointer-events-auto"
                    >
                    <div className="flex items-center gap-2 md:gap-3 min-w-0">
                      {card.avatars ? (
                        <div className="flex -space-x-2 flex-shrink-0">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 border-2 border-white"
                            />
                          ))}
                        </div>
                      ) : (
                        <div className={`w-9 h-9 md:w-11 md:h-11 rounded-xl ${card.iconBg} flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className={`w-4 h-4 md:w-5 md:h-5 ${card.iconColor}`} />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className={`font-semibold text-xs md:text-sm truncate ${card.highlight ? "text-green-600" : "text-neutral-800"}`}>
                          {card.title}
                        </p>
                        <p className="text-neutral-500 text-[10px] md:text-xs truncate">{card.subtitle}</p>
                      </div>
                    </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 lg:mt-12"
        >
          <div className="bg-neutral-50 rounded-2xl lg:rounded-3xl border border-neutral-100 p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className={`flex items-center gap-4 ${
                      index < stats.length - 1 ? "md:border-r md:border-neutral-200 md:pr-8" : ""
                    }`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-7 h-7 text-primary-700" />
                    </div>
                    <div>
                      <div className="text-3xl lg:text-4xl font-bold text-neutral-900" style={{ fontFamily: "var(--font-display)" }}>
                        <AnimatedCounter 
                          end={stat.value} 
                          suffix={stat.suffix} 
                          prefix={stat.prefix}
                        />
                      </div>
                      <p className="text-neutral-500 text-sm font-medium">{stat.label}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
