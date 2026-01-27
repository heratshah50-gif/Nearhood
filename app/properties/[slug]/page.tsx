"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  MapPin,
  Heart,
  Share2,
  ArrowLeft,
  Users,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoginModal from "@/components/auth/LoginModal";
import { ALL_PROPERTIES, getPropertySlug, Property } from "@/lib/properties-data";

interface PropertyDetailPageProps {
  params: {
    slug: string;
  };
}

function formatPrice(price: number): string {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  }
  return `₹${(price / 100000).toFixed(0)} L`;
}

function findPropertyBySlug(slug: string): Property | undefined {
  return ALL_PROPERTIES.find(
    (property) => getPropertySlug(property.name) === slug
  );
}

export default function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  // Check if user is logged in
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = window.sessionStorage.getItem("nearhood_user");
      if (userStr) {
        try {
          setUserInfo(JSON.parse(userStr));
        } catch (e) {
          setUserInfo(null);
        }
      } else {
        setUserInfo(null);
        // Show login modal if not logged in
        setIsLoginModalOpen(true);
      }
    }
  }, []);

  // Listen for login events
  useEffect(() => {
    const checkUserLogin = () => {
      if (typeof window !== "undefined") {
        const userStr = window.sessionStorage.getItem("nearhood_user");
        if (userStr) {
          try {
            setUserInfo(JSON.parse(userStr));
            setIsLoginModalOpen(false);
          } catch (e) {
            setUserInfo(null);
          }
        } else {
          setUserInfo(null);
        }
      }
    };
    window.addEventListener("userLoggedIn", checkUserLogin);
    return () => window.removeEventListener("userLoggedIn", checkUserLogin);
  }, []);

  const handleJoinGroup = () => {
    if (!userInfo) {
      setIsLoginModalOpen(true);
    } else {
      // User is logged in, proceed with joining group
      // Add your join group logic here
    }
  };

  const property = findPropertyBySlug(params.slug);

  if (!property) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col">
        <Header onLoginClick={() => setIsLoginModalOpen(true)} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-neutral-500 mb-2">Property not found</p>
            <button
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500 text-white text-sm font-medium hover:bg-primary-600"
              onClick={() => router.push("/properties")}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to properties
            </button>
          </div>
        </main>
        <Footer hideSubscribe />
      </div>
    );
  }

  const slugCity = property.city || "Ahmedabad";
  const galleryImages = [property.image, property.image, property.image];
  const joinedMembers = Math.max(property.groupSize - property.spotsLeft, 0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("property-details");

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Header onLoginClick={() => setIsLoginModalOpen(true)} />

      {/* Show login modal if not logged in, hide content */}
      {!userInfo && (
        <main className="flex-1 flex items-center justify-center pt-24">
          <div className="text-center">
            <p className="text-lg text-neutral-700 mb-4">Please log in to view property details</p>
          </div>
        </main>
      )}

      {/* Show property content only if logged in */}
      {userInfo && (
      <main className="flex-1">
        <div className="container-custom pt-24 md:pt-28 lg:pt-32 pb-4 md:pb-6">
          {/* Return to listings button below header */}
          <div className="mb-3 md:mb-4">
            <button
              onClick={() => router.push("/properties")}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 bg-white text-xs md:text-sm text-neutral-700 hover:bg-neutral-50"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to listings
            </button>
          </div>

          {/* Breadcrumb path under header, just above property card */}
          <div className="mb-3 md:mb-4 flex items-center justify-between gap-4">
            <nav className="text-xs md:text-sm text-neutral-500">
              <button
                onClick={() => router.push("/")}
                className="hover:text-primary-600 transition-colors"
              >
                Home
              </button>
              <span className="mx-1">›</span>
              <button
                onClick={() => router.push("/properties")}
                className="hover:text-primary-600 transition-colors"
              >
                Properties
              </button>
              <span className="mx-1">›</span>
              <button
                onClick={() => router.push(`/properties?city=${encodeURIComponent(slugCity)}`)}
                className="hover:text-primary-600 transition-colors"
              >
                {slugCity}
              </button>
              <span className="mx-1">›</span>
              <span className="text-neutral-900 font-semibold">
                {property.name}
              </span>
            </nav>
          </div>

          {/* Hero card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-4 md:mt-6 bg-gradient-to-r from-primary-50 to-amber-50 rounded-2xl md:rounded-3xl shadow-lg border border-primary-100 overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left content */}
              <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-neutral-500 mb-2">
                    Premium group-buy deal
                  </p>
                  <h1
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {property.name}
                  </h1>
                  <p className="text-sm md:text-base text-neutral-700 mb-4 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-primary-600" />
                    <span>
                      {property.location}, {slugCity}
                    </span>
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {property.bhkOptions.length > 0 && (
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-red-500 text-white text-xs font-semibold shadow-sm">
                        {property.bhkOptions[0]}
                      </span>
                    )}
                    <span className="text-sm text-neutral-700">
                      Super area:{" "}
                      <span className="font-semibold">{property.superArea}</span>
                    </span>
                    {property.isRera && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        RERA Approved
                      </span>
                    )}
                  </div>

                  <div className="border-t border-neutral-200/70 pt-4 mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-neutral-500 mb-1">
                        Target Price (group discount)
                      </p>
                      <p className="text-2xl md:text-3xl font-bold text-neutral-900">
                        {formatPrice(property.groupPrice)}
                      </p>
                      <p className="text-xs text-neutral-500">
                        Developer price{" "}
                        <span className="line-through">
                          {formatPrice(property.marketPrice)}
                        </span>
                        {property.savingsPercent > 0 && (
                          <>
                            {" "}
                            ·{" "}
                            <span className="font-semibold text-emerald-600">
                              Save {property.savingsPercent}%
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                    <div className="flex flex-col justify-between gap-2">
                      <div className="space-y-1 text-xs text-neutral-700">
                        <p className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-neutral-500" />
                          <span>
                            Group size:{" "}
                            <span className="font-semibold">
                              {property.groupSize} buyers
                            </span>
                          </span>
                        </p>
                        <p>
                          Openings:{" "}
                          <span
                            className={`font-semibold ${
                              property.spotsLeft === 0
                                ? "text-red-600"
                                : "text-emerald-600"
                            }`}
                          >
                            {property.spotsLeft} left
                          </span>
                        </p>
                        <p>
                          Possession:{" "}
                          <span className="font-semibold">
                            {property.possession}
                          </span>
                        </p>
                        <p>
                          Last date to join:{" "}
                          <span className="font-semibold">
                            {property.deadline}
                          </span>
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 mt-3">
                        <button 
                          onClick={handleJoinGroup}
                          className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-red-500 text-white text-sm font-semibold shadow hover:bg-red-600 transition-colors"
                        >
                          Join this group deal
                        </button>
                        <button className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-neutral-300 bg-white text-sm font-medium text-neutral-800 hover:bg-neutral-50">
                          Talk to Nearhood expert
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right image + actions */}
              <div className="relative min-h-[220px] md:min-h-[260px] lg:min-h-[320px] bg-neutral-900 overflow-hidden rounded-none md:rounded-l-none">
                {galleryImages[currentImageIndex] && (
                  <Image
                    src={galleryImages[currentImageIndex]}
                    alt={property.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-l from-black/25 via-transparent to-transparent" />

                {galleryImages.length > 1 && (
                  <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 md:px-3">
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 text-neutral-700 hover:bg-white shadow-md"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextImage}
                      className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 text-neutral-700 hover:bg-white shadow-md"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div className="absolute top-4 right-4 flex flex-col gap-3">
                  <button
                    onClick={() => setIsLiked((prev) => !prev)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                      isLiked
                        ? "bg-red-500 text-white"
                        : "bg-white text-red-500 hover:bg-neutral-50"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isLiked ? "fill-current" : "fill-transparent"
                      }`}
                    />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white text-neutral-700 hover:bg-neutral-50 flex items-center justify-center shadow-md">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Group details + CTA */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.2fr,1.8fr] gap-4 lg:gap-6 items-stretch" id="group-details">
            {/* Left: group numbers and join button */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-4 md:p-6 flex flex-col md:flex-row items-stretch md:items-center gap-4">
              <div className="flex-1 flex flex-col items-center justify-center text-center md:items-start md:text-left">
                <p className="text-3xl md:text-4xl font-bold text-neutral-900" style={{ fontFamily: "var(--font-display)" }}>
                  {joinedMembers}/{property.groupSize}
                </p>
                <p className="mt-1 text-sm text-neutral-500">Joined the Group</p>
                <button 
                  onClick={handleJoinGroup}
                  className="mt-4 inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-primary-500 text-white text-sm md:text-base font-semibold shadow hover:bg-primary-600 transition-colors"
                >
                  Join Group
                </button>
              </div>

              <div className="w-px bg-neutral-200 hidden md:block" />

              {/* Simple joined members list placeholder */}
              <div className="flex-[1.4] w-full">
                <h3 className="text-sm font-semibold text-neutral-800 mb-3">
                  Joined Members
                </h3>
                <div className="max-h-40 overflow-y-auto pr-1 space-y-2">
                  {[1, 2, 3, 4].map((idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-xl border border-primary-100 bg-primary-50/60 px-3 py-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-neutral-200" />
                        <div>
                          <p className="text-xs font-semibold text-neutral-800">
                            User {idx}
                          </p>
                          <p className="text-[11px] text-primary-600 font-medium">
                            3 BHK
                          </p>
                        </div>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center text-white text-[10px]">
                        ✓
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: emotional banner */}
            <div className="rounded-2xl bg-gradient-to-r from-primary-500 to-rose-500 text-white px-6 py-6 md:px-10 md:py-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-lg md:text-xl font-semibold leading-snug">
                  One step closer to your
                </p>
                <p className="text-lg md:text-2xl font-bold leading-snug">
                  dream home
                </p>
                <p className="mt-3 text-xs md:text-sm text-white/90 max-w-xs">
                  Lock your spot in this Nearhood group-buy and get exclusive negotiated pricing.
                </p>
              </div>
              <div className="hidden md:block">
                <div className="w-32 h-24 rounded-2xl bg-white/10 border border-white/30" />
              </div>
            </div>
          </div>

          {/* Vertical tabs for property sections */}
          <div className="mt-12 md:mt-14 grid grid-cols-1 md:grid-cols-[260px,1fr] gap-6 items-start">
            <div className="bg-white rounded-2xl border border-neutral-200 pt-5 pb-4 px-4 space-y-3 md:sticky md:top-28 self-start">
              {["Property Details","Highlights","Layout Plan","Amenities","Location","About Developer","Specifications"].map((label) => {
                const id = label.toLowerCase().replace(/\s+/g, "-");
                return (
                  <button
                    key={id}
                    onClick={() => {
                      setActiveSection(id);
                      const el = document.getElementById(id);
                      if (el) {
                        const rect = el.getBoundingClientRect();
                        const offset = 120; // move content a bit below top
                        const targetY = rect.top + window.scrollY - offset;
                        window.scrollTo({ top: targetY, behavior: "smooth" });
                      }
                    }}
                    className={`w-full text-left px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeSection === id
                        ? "border border-purple-400 text-neutral-900 bg-white shadow-sm"
                        : "text-neutral-700 hover:bg-neutral-100"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Additional details – shown inside the Property Details tab */}
            <div className="space-y-6">
              <section
                id="property-details"
                className="bg-white rounded-xl border border-neutral-200 p-4 md:p-5"
              >
                <h2 className="text-base md:text-lg font-semibold text-neutral-900 mb-4">
                  Property Details
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* About this project */}
                  <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl border border-neutral-200 p-4 md:p-5">
                      <h3 className="text-sm md:text-base font-semibold text-neutral-900 mb-2">
                        About this project
                      </h3>
                      <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                        This is a sample description area where you can add more
                        information about the project, its location advantages,
                        amenities, and builder background. We have kept the layout
                        simple and clean so it blends with the existing Nearhood
                        theme. You can later replace this text with real project
                        details from your CMS or backend.
                      </p>
                    </div>
                  </div>

                  {/* Quick facts */}
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl border border-neutral-200 p-4 md:p-5">
                      <h3 className="text-sm font-semibold text-neutral-900 mb-3">
                        Quick facts
                      </h3>
                      <dl className="space-y-2 text-sm text-neutral-700">
                        <div className="flex justify-between gap-4">
                          <dt className="text-neutral-500">City</dt>
                          <dd className="font-medium">{slugCity}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt className="text-neutral-500">Location</dt>
                          <dd className="font-medium">{property.location}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt className="text-neutral-500">Configuration</dt>
                          <dd className="font-medium">
                            {property.bhkOptions.join(", ")}
                          </dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt className="text-neutral-500">Super area</dt>
                          <dd className="font-medium">{property.superArea}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </section>

              <section id="highlights" className="bg-white rounded-xl border border-neutral-200 p-4 md:p-5">
                <h2 className="text-base md:text-lg font-semibold text-neutral-900 mb-2">
                  Highlights
                </h2>
                <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                  Key USPs of the project such as clubhouse, green space, security and community features can be summarised here.
                </p>
              </section>

              <section id="layout-plan" className="bg-white rounded-xl border border-neutral-200 p-4 md:p-5">
                <h2 className="text-base md:text-lg font-semibold text-neutral-900 mb-2">
                  Layout Plan
                </h2>
                <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                  You can embed layout images, master plans or floor plans in this section.
                </p>
              </section>

              <section id="amenities" className="bg-white rounded-xl border border-neutral-200 p-4 md:p-5">
                <h2 className="text-base md:text-lg font-semibold text-neutral-900 mb-2">
                  Amenities
                </h2>
                <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                  List of amenities like swimming pool, gym, garden, children&apos;s play area, etc.
                </p>
              </section>

              <section id="location" className="bg-white rounded-xl border border-neutral-200 p-4 md:p-5">
                <h2 className="text-base md:text-lg font-semibold text-neutral-900 mb-2">
                  Location
                </h2>
                <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                  Connectivity, nearby landmarks and infrastructure details can be added here.
                </p>
              </section>

              <section id="about-developer" className="bg-white rounded-xl border border-neutral-200 p-4 md:p-5">
                <h2 className="text-base md:text-lg font-semibold text-neutral-900 mb-2">
                  About Developer
                </h2>
                <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                  Short profile of the developer, past projects and credibility notes.
                </p>
              </section>

              <section
                id="specifications"
                className="bg-white rounded-xl border border-neutral-200 p-4 md:p-5"
              >
                <h2 className="text-base md:text-lg font-semibold text-neutral-900 mb-2">
                  Specifications
                </h2>
                <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                  Technical specifications like flooring, fittings, structure and electrical details can be listed here.
                </p>
              </section>
            </div>
          </div>

        </div>
      </main>
      )}

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

