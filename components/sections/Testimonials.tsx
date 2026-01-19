"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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

function TestimonialCard({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.95 }}
      transition={{ duration: 0.3 }}
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
    </motion.div>
  );
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

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
            <div className="relative h-[500px]">
              <AnimatePresence mode="popLayout">
                {getVisibleTestimonials().map((testimonial) => (
                  <motion.div
                    key={`${testimonial.id}-${testimonial.position}`}
                    initial={{ 
                      opacity: 0, 
                      x: testimonial.position * 100,
                      scale: 0.8 
                    }}
                    animate={{ 
                      opacity: testimonial.position === 0 ? 1 : 0.5, 
                      x: testimonial.position * 420,
                      scale: testimonial.position === 0 ? 1 : 0.9,
                      zIndex: testimonial.position === 0 ? 10 : 0
                    }}
                    exit={{ 
                      opacity: 0,
                      scale: 0.8 
                    }}
                    transition={{ duration: 0.4 }}
                    className="absolute left-1/2 top-0 w-[400px] -ml-[200px]"
                    style={{
                      filter: testimonial.position !== 0 ? "blur(1px)" : "none",
                    }}
                  >
                    <TestimonialCard
                      testimonial={testimonial}
                      isActive={testimonial.position === 0}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
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
                  isActive={true}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8 lg:mt-0 lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2">
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


