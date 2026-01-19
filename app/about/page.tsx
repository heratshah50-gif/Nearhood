"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Home,
  Handshake,
  Sparkles,
  Target,
  ShieldCheck,
  ArrowRight,
  Star,
} from "lucide-react";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoginModal from "@/components/auth/LoginModal";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Header onLoginClick={() => setIsLoginModalOpen(true)} />

      <main className="flex-1">
        <div className="container-custom pt-20 md:pt-24 lg:pt-28 pb-16 space-y-16 md:space-y-20">
          {/* Hero Section */}
          <section className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            <div>
              <p className="text-sm font-semibold tracking-wide text-primary-600 uppercase mb-3">
                About Nearhood
              </p>
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Save more on your{" "}
                <span className="text-primary-600">dream home</span>, together.
              </h1>
              <p className="text-neutral-600 text-base md:text-lg mb-6 md:mb-8 max-w-xl">
                Nearhood is your home buying partner. We bring homebuyers
                together into powerful groups, negotiate directly with
                developers, and unlock prices that individual buyers can&apos;t
                get alone.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="rounded-2xl bg-white shadow-sm border border-primary-100/70 p-4">
                  <p className="text-xs font-semibold text-primary-600 uppercase mb-1">
                    Savings Unlocked
                  </p>
                  <p className="text-2xl font-bold text-neutral-900">₹25 Cr+</p>
                  <p className="text-xs text-neutral-500 mt-1">
                    Total value unlocked for Nearhood buyers across projects.
                  </p>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-primary-600 via-red-500 to-rose-500 text-white p-4 shadow-md">
                  <p className="text-xs font-semibold uppercase mb-1">
                    Buyers Empowered
                  </p>
                  <p className="text-2xl font-bold">150+ buyers</p>
                  <p className="text-xs text-white/80 mt-1">
                    Individuals who joined groups and negotiated as one voice.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => router.push("/properties")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  Explore group deals
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => router.push("/contact")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-300 bg-white text-sm font-semibold text-neutral-800 hover:border-primary-500 hover:text-primary-700 hover:bg-primary-50 transition-all"
                >
                  Talk to our team
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-10 -right-6 w-32 h-32 bg-primary-200 rounded-full blur-3xl opacity-60" />
              <div className="absolute -bottom-10 -left-4 w-40 h-40 bg-rose-200 rounded-full blur-3xl opacity-70" />

              <div className="relative rounded-3xl bg-gradient-to-br from-primary-50 via-amber-50 to-rose-50 border border-primary-100 shadow-lg p-5 md:p-6 lg:p-7">
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-primary-600 text-white shadow-md">
                    <Users className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-primary-700 uppercase tracking-wide">
                      Group Buying Community
                    </p>
                    <p className="text-sm text-neutral-600">
                      Join verified buyers, not random leads.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary-600">
                      <Home className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">
                        New launches & premium inventory
                      </p>
                      <p className="text-xs text-neutral-600">
                        Access curated under-construction and ready projects
                        across top micro-markets.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary-600">
                      <Handshake className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">
                        Negotiated as one, priced as a group
                      </p>
                      <p className="text-xs text-neutral-600">
                        Your Relationship Manager and Nearhood&apos;s team
                        negotiate on behalf of the entire buyer group.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary-600">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">
                        Transparent, regret-free pricing
                      </p>
                      <p className="text-xs text-neutral-600">
                        Everyone in the group gets the same final price—no
                        hidden surprises later.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/70 backdrop-blur border border-primary-100 px-4 py-3">
                  <div>
                    <p className="text-xs font-semibold text-primary-700 uppercase tracking-wide">
                      Trusted by modern homebuyers
                    </p>
                    <p className="text-xs text-neutral-600">
                      From first-time buyers to upgraders and NRIs.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Story & Mission */}
          <section className="grid lg:grid-cols-[1.1fr,0.9fr] gap-10 md:gap-14 items-start">
            <div>
              <p className="text-sm font-semibold tracking-wide text-primary-600 uppercase mb-2">
                Our Story
              </p>
              <h2
                className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4 md:mb-5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Built to solve the &quot;Why did they get it cheaper?&quot;
                problem.
              </h2>
              <div className="space-y-4 text-sm md:text-base text-neutral-700 leading-relaxed">
                <p>
                  In every project, there&apos;s always a buyer who discovers
                  later that a neighbour, colleague or friend paid less for the
                  same home. Nearhood was created to end that regret.
                </p>
                <p>
                  Instead of negotiating alone, our buyers join curated groups
                  for the same project or micro-market. That collective demand
                  gives them the leverage usually reserved for institutional
                  investors—without losing the personal, hand-held experience.
                </p>
                <p>
                  From the first project shortlist to final booking, our team,
                  data, and relationships with developers work together to help
                  you buy smarter, safer and at better prices.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-white shadow-sm border border-neutral-200 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-primary-100 flex items-center justify-center text-primary-700">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-primary-700 uppercase tracking-wide">
                      Our Mission
                    </p>
                    <p className="text-sm font-semibold text-neutral-900">
                      Make better homes more financially accessible
                    </p>
                  </div>
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  We want every serious homebuyer to feel confident that they
                  bought at a fair, transparent, and competitive price—backed by
                  the power of a group.
                </p>
              </div>

              <div className="rounded-2xl bg-gradient-to-r from-primary-600 via-rose-500 to-amber-400 text-white p-5 shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide">
                      What makes us different
                    </p>
                    <p className="text-sm font-semibold">
                      Community-first, not broker-first
                    </p>
                  </div>
                </div>
                <p className="text-sm text-white/90 leading-relaxed mb-3">
                  Nearhood is built around homebuyer communities, not just
                  listings. We care about who you buy with as much as what you
                  buy.
                </p>
                <p className="text-xs text-white/80">
                  No noisy portals. No random calls. Just curated projects,
                  verified buyers, and one simple goal—help you save more on a
                  better home.
                </p>
              </div>
            </div>
          </section>

          {/* Why Choose Nearhood */}
          <section>
            <div className="max-w-3xl mb-8 md:mb-10">
              <p className="text-sm font-semibold tracking-wide text-primary-600 uppercase mb-2">
                Why Choose Nearhood
              </p>
              <h2
                className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Group buying power, wrapped in a personal home buying journey.
              </h2>
              <p className="text-sm md:text-base text-neutral-600">
                We combine the power of collective negotiation with the comfort
                of a guided, one-on-one experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {[
                {
                  title: "Real group savings",
                  desc: "Leverage the strength of organised buyer groups to unlock pre-launch and volume-based pricing.",
                  icon: Users,
                },
                {
                  title: "Data-backed decisions",
                  desc: "We track pricing, inventory and offers across projects so you never negotiate in the dark.",
                  icon: Target,
                },
                {
                  title: "Developer partnerships",
                  desc: "Work only with trusted developers who are comfortable offering group benefits transparently.",
                  icon: Handshake,
                },
                {
                  title: "End-to-end support",
                  desc: "From shortlist to site visit and booking, your Relationship Manager walks every step with you.",
                  icon: ShieldCheck,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl bg-white border border-neutral-200 hover:border-primary-200 hover:shadow-md transition-all p-5 flex flex-col h-full"
                  >
                    <div className="w-9 h-9 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-semibold text-neutral-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-neutral-600 leading-relaxed flex-1">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* How Group Buying Works */}
          <section>
            <div className="max-w-3xl mb-8 md:mb-10">
              <p className="text-sm font-semibold tracking-wide text-primary-600 uppercase mb-2">
                How Nearhood Works
              </p>
              <h2
                className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Simple, stress-free steps to your group-powered home purchase.
              </h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 md:gap-7 items-start">
              <div className="space-y-4">
                {[
                  {
                    step: "01",
                    title: "Shortlist projects with us",
                    desc: "Tell us your budget, micro-location and preferences. We map them to high-potential projects.",
                  },
                  {
                    step: "02",
                    title: "Join or start a buyer group",
                    desc: "Get matched with buyers looking at similar configurations in the same project or area.",
                  },
                  {
                    step: "03",
                    title: "Visit, evaluate, and decide",
                    desc: "Plan site visits and virtual tours with our team so you can compare options confidently.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="rounded-2xl bg-white border border-neutral-200 p-4"
                  >
                    <p className="text-xs font-semibold text-primary-600 mb-1">
                      Step {item.step}
                    </p>
                    <p className="text-sm font-semibold text-neutral-900 mb-1.5">
                      {item.title}
                    </p>
                    <p className="text-xs text-neutral-600">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {[
                  {
                    step: "04",
                    title: "We negotiate as a group",
                    desc: "Using the group’s combined demand, we negotiate directly with developers for better slabs, views and payment plans.",
                  },
                  {
                    step: "05",
                    title: "Lock in your preferred unit",
                    desc: "Once the group offer is finalised, you confirm your specific unit with full pricing transparency.",
                  },
                  {
                    step: "06",
                    title: "Move in, without regret",
                    desc: "You buy with the comfort that others in the project purchased at the same negotiated band.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="rounded-2xl bg-white border border-neutral-200 p-4"
                  >
                    <p className="text-xs font-semibold text-primary-600 mb-1">
                      Step {item.step}
                    </p>
                    <p className="text-sm font-semibold text-neutral-900 mb-1.5">
                      {item.title}
                    </p>
                    <p className="text-xs text-neutral-600">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-primary-600 via-red-500 to-rose-500 text-white p-6 shadow-lg flex flex-col justify-between h-full">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-2">
                    Together, we save more
                  </p>
                  <h3 className="text-xl font-bold mb-3">
                    Your decision, powered by a community.
                  </h3>
                  <p className="text-sm text-white/90 mb-4">
                    You stay in control of what you buy. We just make sure you
                    never walk into a negotiation alone.
                  </p>
                  <ul className="space-y-2 text-xs text-white/90">
                    <li>• No brokerage charged to buyers</li>
                    <li>• Transparent offers shared with the full group</li>
                    <li>• Dedicated support throughout your journey</li>
                  </ul>
                </div>

                <button
                  onClick={() => router.push("/properties")}
                  className="mt-5 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white text-primary-700 text-sm font-semibold hover:bg-neutral-50 transition-colors"
                >
                  See active group deals
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>

          {/* Social proof / logos (visual, image-based section) */}
          <section>
            <div className="rounded-3xl bg-white border border-neutral-200 shadow-sm px-5 py-6 md:px-8 md:py-7 lg:px-10 lg:py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-md">
                <p className="text-xs font-semibold text-primary-600 uppercase tracking-wide mb-2">
                  Developers & communities
                </p>
                <p
                  className="text-lg md:text-xl font-bold text-neutral-900 mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Trusted by leading developers and modern homebuyers.
                </p>
                <p className="text-xs md:text-sm text-neutral-600">
                  We continuously expand our relationships with reputed
                  developers so your group can access better inventory, payment
                  plans and launch windows.
                </p>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4 flex-1">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="aspect-[3/1] rounded-xl bg-gradient-to-r from-neutral-100 to-neutral-200 flex items-center justify-center overflow-hidden"
                  >
                    <Image
                      src="/globe.svg"
                      alt="Developer logo placeholder"
                      width={80}
                      height={28}
                      className="w-14 h-auto opacity-80"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonial + CTA */}
          <section className="grid lg:grid-cols-[1.1fr,0.9fr] gap-8 md:gap-10 items-stretch">
            <div className="rounded-3xl bg-white border border-neutral-200 shadow-sm p-6 md:p-7 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-primary-600 uppercase tracking-wide mb-2">
                  Buyer Story
                </p>
                <p className="text-sm md:text-base text-neutral-700 mb-4 leading-relaxed">
                  &quot;Nearhood helped us compare multiple projects in our
                  preferred neighbourhood and then plugged us into a group that
                  was already in advanced discussions with the developer. We got
                  better views, a more relaxed payment plan, and the comfort
                  that others in our tower had secured a similar deal.&quot;
                </p>
              </div>
              <div className="flex items-center justify-between gap-3 pt-2">
                <div>
                  <p className="text-sm font-semibold text-neutral-900">
                    A modern homebuyer
                  </p>
                  <p className="text-xs text-neutral-500">
                    Ahmedabad • Upgrading from 2 BHK to 3 BHK
                  </p>
                </div>
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-primary-600 via-red-500 to-rose-500 p-6 md:p-7 text-white flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide mb-2">
                  Ready to explore?
                </p>
                <h3
                  className="text-xl md:text-2xl font-bold mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Join a Nearhood buyer group for your next home.
                </h3>
                <p className="text-sm text-white/90 mb-4">
                  Tell us what you&apos;re looking for and we&apos;ll show you
                  live group opportunities in your preferred locations.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-2">
                <button
                  onClick={() => router.push("/properties")}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white text-primary-700 text-sm font-semibold hover:bg-neutral-50 transition-colors"
                >
                  View active properties
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => router.push("/contact")}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-white/40 text-sm font-semibold text-white/90 hover:bg-white/10 transition-colors"
                >
                  Speak to our team
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

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
    </div>
  );
}

