"use client";

import { useEffect, useState } from "react";
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
  const [userInfo, setUserInfo] = useState<any>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Gate homepage sections behind login
  useEffect(() => {
    const checkUserLogin = () => {
      if (typeof window === "undefined") return;
      const userStr = window.sessionStorage.getItem("nearhood_user");
      if (userStr) {
        try {
          setUserInfo(JSON.parse(userStr));
          setIsLoginModalOpen(false);
        } catch {
          setUserInfo(null);
          setIsLoginModalOpen(true);
        }
      } else {
        setUserInfo(null);
        setIsLoginModalOpen(true);
      }
      setAuthChecked(true);
    };

    checkUserLogin();
    window.addEventListener("userLoggedIn", checkUserLogin);
    return () => window.removeEventListener("userLoggedIn", checkUserLogin);
  }, []);

  // Avoid rendering while we haven't checked session yet
  if (!authChecked) return null;

  // If not logged in: open login first and don't render homepage sections
  if (!userInfo) {
    return (
      <main className="min-h-screen bg-neutral-50 overflow-x-hidden">
        <Header onLoginClick={() => setIsLoginModalOpen(true)} hideNavigation={true} />

        <div className="min-h-[70vh] flex items-center justify-center pt-28 pb-16">
          <div className="text-center max-w-md px-6">
            <h1 className="text-2xl font-bold text-neutral-900 mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Please log in to continue
            </h1>
            <p className="text-neutral-600 mb-6">
              Log in to browse categories and view property & vehicle group deals.
            </p>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Login
            </button>
          </div>
        </div>

        <Footer hideSubscribe />

        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onSuccess={(isAdmin) => {
            if (isAdmin) {
              const vendor =
                typeof window !== "undefined" &&
                window.sessionStorage.getItem("nearhood_vendor");
              if (vendor) router.push("/vendor");
              else router.push("/admin");
            }
          }}
        />
      </main>
    );
  }

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
