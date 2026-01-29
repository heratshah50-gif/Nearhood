"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  wrap,
} from "framer-motion";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  MapPin,
  IndianRupee,
} from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  location: string;
  property: string;
  savings: string;
  rating: number;
  quote: string;
  date: string;
}

const testimonials: Testimonial[] = [
  { id: 1, name: "Rajesh Kumar", avatar: "RK", location: "Bodakdev, Ahmedabad", property: "Torrent Greens, Bodakdev", savings: "₹32 Lakhs", rating: 5, quote: "The group buying concept at Nearhood saved us a fortune! We were skeptical at first, but the transparent process and professional team made everything smooth. Highly recommend for anyone looking to buy property in Ahmedabad.", date: "December 2025" },
  { id: 2, name: "Priya Sharma", avatar: "PS", location: "Satellite, Ahmedabad", property: "Artha Infra, Satellite", savings: "₹28 Lakhs", rating: 5, quote: "As a first-time home buyer, I was nervous about the process. Nearhood's team guided us through every step. The savings were substantial, and we got additional amenities that weren't even advertised!", date: "November 2025" },
  { id: 3, name: "Amit Patel", avatar: "AP", location: "SG Highway, Ahmedabad", property: "Godrej Garden City, SG Highway", savings: "₹18 Lakhs", rating: 5, quote: "I've bought two properties through Nearhood now. The group negotiation power is real - developers give genuine discounts because they're closing multiple deals at once. It's a win-win for everyone.", date: "October 2025" },
  { id: 4, name: "Sneha Reddy", avatar: "SR", location: "Prahlad Nagar, Ahmedabad", property: "Siddhi Vinayak, Prahlad Nagar", savings: "₹45 Lakhs", rating: 5, quote: "What impressed me most was the transparency. We could see exactly how many people were in our group, the negotiation progress, and the final pricing breakdown. No hidden charges, no surprises.", date: "September 2025" },
  { id: 5, name: "Vikram Singh", avatar: "VS", location: "Thaltej, Ahmedabad", property: "Shivalik Group, Thaltej", savings: "₹38 Lakhs", rating: 5, quote: "The legal documentation support was exceptional. Their team ensured all RERA compliance was met and the paperwork was flawless. Peace of mind is priceless when making such a big investment.", date: "August 2025" },
];

function TestimonialCard({
  testimonial,
  isActive,
}: {
  testimonial: Testimonial;
  isActive?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-2xl p-6 lg:p-8 shadow-lg border transition-all duration-300 ${
        isActive ? "border-primary-200 shadow-xl" : "border-neutral-100"
      }`}
    >
      {/* Quote Icon */}
      <div className="mb-4">
        <Quote className="w-10 h-10 text-primary-200" />
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < testimonial.rating
                ? "text-amber-400 fill-amber-400"
                : "text-neutral-200"
            }`}
          />
        ))}
      </div>

      {/* Quote Text */}
      <p className="text-neutral-600 leading-relaxed mb-6 text-base lg:text-lg">
        &quot;{testimonial.quote}&quot;
      </p>

      {/* Property & Savings */}
      <div className="p-4 rounded-xl bg-primary-50 border border-primary-100 mb-6">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-neutral-700 mb-1">
              {testimonial.property}
            </p>
            <div className="flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-green-600" />
              <span className="text-green-600 font-semibold">
                {testimonial.savings} saved
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center text-white font-bold text-lg">
          {testimonial.avatar}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-neutral-800">{testimonial.name}</h4>
            <BadgeCheck className="w-4 h-4 text-primary-500" />
          </div>
          <p className="text-sm text-neutral-500">
            {testimonial.location} • {testimonial.date}
          </p>
        </div>
      </div>
    </div>
  );
}

function DesktopMarqueeItem({
  testimonial,
  index,
  trackX,
  containerWidth,
  itemSpacing,
  cardWidth,
}: {
  testimonial: Testimonial;
  index: number;
  trackX: ReturnType<typeof useMotionValue<number>>;
  containerWidth: number;
  itemSpacing: number;
  cardWidth: number;
}) {
  const scale = useTransform(trackX, (latest) => {
    const center = containerWidth / 2;
    const itemCenter = index * itemSpacing + latest + cardWidth / 2;
    const dist = Math.abs(itemCenter - center);
    const maxDist = Math.max(1, center);
    const normalized = Math.min(1, dist / maxDist);
    // 1.18 at center, down to 0.90 at edges (very visible)
    return 1.18 - normalized * 0.28;
  });

  const opacity = useTransform(trackX, (latest) => {
    const center = containerWidth / 2;
    const itemCenter = index * itemSpacing + latest + cardWidth / 2;
    const dist = Math.abs(itemCenter - center);
    const maxDist = Math.max(1, center);
    const normalized = Math.min(1, dist / maxDist);
    return 1 - normalized * 0.6;
  });

  const blur = useTransform(trackX, (latest) => {
    const center = containerWidth / 2;
    const itemCenter = index * itemSpacing + latest + cardWidth / 2;
    const dist = Math.abs(itemCenter - center);
    const maxDist = Math.max(1, center);
    const normalized = Math.min(1, dist / maxDist);
    const px = normalized * 3;
    return `blur(${px.toFixed(2)}px)`;
  });

  return (
    <motion.div
      className="w-[400px] flex-shrink-0 origin-center"
      style={{ scale, opacity, filter: blur }}
    >
      <TestimonialCard testimonial={testimonial} />
    </motion.div>
  );
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  // --- Desktop continuous carousel config ---
  const CARD_WIDTH = 400; // px (matches layout)
  const GAP = 32; // px (gap-8)
  const ITEM_SPACING = CARD_WIDTH + GAP; // px
  const BASE_COUNT = testimonials.length;

  const trackItems = useMemo(() => [...testimonials, ...testimonials], []);
  const trackWidth = BASE_COUNT * ITEM_SPACING; // one full cycle width

  const trackX = useMotionValue(0); // negative => moves left (right-to-left)
  const [containerWidth, setContainerWidth] = useState(1200);
  const desktopViewportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = desktopViewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width;
      if (typeof w === "number" && w > 0) setContainerWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Center the first card on initial render (so the zoom is obvious immediately)
  useEffect(() => {
    const centered = wrap(-trackWidth, 0, containerWidth / 2 - CARD_WIDTH / 2);
    trackX.set(centered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerWidth]);

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion) return;
    // Speed in px/sec; tune for desired constant motion
    const speed = 45;
    const next = trackX.get() - (speed * delta) / 1000;
    trackX.set(wrap(-trackWidth, 0, next));
  });

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    const result = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + testimonials.length) % testimonials.length;
      result.push({ ...testimonials[index], position: i });
    }
    return result;
  };

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-neutral-50 overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4"
          >
            <BadgeCheck className="w-4 h-4" />
            Verified Buyers
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl lg:text-4xl font-bold text-neutral-800 mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Stories from Our Community
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-neutral-500"
          >
            Hear from families who saved lakhs on their dream homes through group buying
          </motion.p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Desktop Carousel */}
          <div className="hidden lg:block">
            <div ref={desktopViewportRef} className="relative h-[520px] overflow-hidden">
              {/* soft edge fade */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-neutral-50 to-transparent z-20" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-neutral-50 to-transparent z-20" />

              <motion.div
                className="absolute left-0 top-0 flex items-start gap-8 will-change-transform"
                style={{ x: trackX }}
              >
                {trackItems.map((t, i) => (
                  <DesktopMarqueeItem
                    key={`${t.id}-${i}`}
                    testimonial={t}
                    index={i}
                    trackX={trackX}
                    containerWidth={containerWidth}
                    itemSpacing={ITEM_SPACING}
                    cardWidth={CARD_WIDTH}
                  />
                ))}
              </motion.div>
            </div>
          </div>

          {/* Mobile Carousel */}
          <div className="lg:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <TestimonialCard
                  testimonial={testimonials[currentIndex]}
                  isActive
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8 lg:mt-6">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white shadow-lg border border-neutral-100 flex items-center justify-center text-neutral-600 hover:text-primary-600 hover:border-primary-200 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-primary-500 w-8"
                      : "bg-neutral-300 hover:bg-neutral-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white shadow-lg border border-neutral-100 flex items-center justify-center text-neutral-600 hover:text-primary-600 hover:border-primary-200 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { value: "4.8/5", label: "Average Rating" },
            { value: "500+", label: "Happy Families" },
            { value: "₹45 Cr+", label: "Total Savings" },
            { value: "98%", label: "Would Recommend" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-xl bg-white border border-neutral-100"
            >
              <p
                className="text-2xl lg:text-3xl font-bold text-primary-600 mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {stat.value}
              </p>
              <p className="text-sm text-neutral-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


