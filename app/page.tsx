"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Properties from "@/components/sections/Properties";
import PopularLocations from "@/components/sections/PopularLocations";
import WhyInvest from "@/components/sections/WhyInvest";
import WhatMakesUnique from "@/components/sections/WhatMakesUnique";
import GetBestDeals from "@/components/sections/GetBestDeals";
import HowItWorks from "@/components/sections/HowItWorks";
import Trust from "@/components/sections/Trust";
import Testimonials from "@/components/sections/Testimonials";
import EMICalculator from "@/components/sections/EMICalculator";
import SignupCTA from "@/components/sections/SignupCTA";
import LoginModal from "@/components/auth/LoginModal";

export default function Home() {
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-neutral-50 overflow-x-hidden">
      <Header onLoginClick={() => setIsLoginModalOpen(true)} />

      {/* Hero Section */}
      <Hero />

      {/* Featured Properties - exclusive by our team */}
      <Properties />

      {/* Most Popular Places */}
      <PopularLocations />

      {/* Why Invest with Nearhood */}
      <WhyInvest />

      {/* What Makes Nearhood Unique */}
      <WhatMakesUnique />

      {/* Get Best Deals + Why Choose Nearhood (combined) */}
      <GetBestDeals />

      {/* How It Works */}
      <HowItWorks />

      {/* Trust & Partners */}
      <Trust />

      {/* Testimonials */}
      <Testimonials />

      {/* EMI Calculator */}
      <EMICalculator />

      {/* Signup / Request Quote + Subscribe CTA */}
      <SignupCTA />

      <Footer hideSubscribe />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={(isAdmin) => {
          if (isAdmin) {
            const vendor = typeof window !== "undefined" && window.sessionStorage.getItem("nearhood_vendor");
            if (vendor) router.push("/vendor");
            else router.push("/admin");
          }
        }}
      />
    </main>
  );
}
