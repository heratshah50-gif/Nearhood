"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoginModal from "@/components/auth/LoginModal";
import PropertySearch from "@/components/sections/PropertySearch";
import { AHMEDABAD_LOCATIONS } from "@/lib/ahmedabad-locations";
import { ALL_PROPERTIES, Property, getPropertySlug } from "@/lib/properties-data";
import {
  MapPin,
  Heart,
  Share2,
  Users,
  Phone,
  Map,
  List,
  Filter,
  X,
  Search,
  SlidersHorizontal,
  Mic,
  Bell,
  User,
} from "lucide-react";
import Image from "next/image";

const allProperties: Property[] = ALL_PROPERTIES;

function formatPrice(price: number): string {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  }
  return `₹${(price / 100000).toFixed(0)} L`;
}

function PropertyCard({ property }: { property: Property }) {
  const [isLiked, setIsLiked] = useState(false);
  const slug = getPropertySlug(property.name);

  return (
    <a
      href={`/properties/${slug}`}
      data-property-card="true"
      className="block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-neutral-100 w-full"
    >
      {/* Image Section */}
      <div className="relative h-48 w-full bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
        {property.image ? (
          <Image
            src={property.image}
            alt={property.name}
            fill
            className="object-cover w-full h-full"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/60 backdrop-blur-sm flex items-center justify-center mx-auto mb-2">
                <MapPin className="w-8 h-8 text-primary-500" />
              </div>
              <p className="text-primary-700/60 text-sm font-medium">{property.name}</p>
            </div>
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        {property.featured && (
          <div className="absolute top-0 left-0 z-10">
            <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg">
              Exclusive Deal
            </div>
          </div>
        )}
        
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              isLiked
                ? "bg-red-500 text-white"
                : "bg-white/90 text-neutral-600 hover:bg-white"
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          </button>
          <button className="w-8 h-8 rounded-lg bg-white/90 text-neutral-600 hover:bg-white flex items-center justify-center">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-lg bg-white/90 text-neutral-600 hover:bg-white flex items-center justify-center">
            <MapPin className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-neutral-800 mb-1 line-clamp-1">
              {property.name}
            </h3>
            <div className="flex items-center gap-1 text-neutral-500 text-sm">
              <MapPin className="w-3.5 h-3.5" />
              <span>{property.location}, {property.city}</span>
            </div>
          </div>
          <button className="ml-2 p-2 rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors">
            <Phone className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-neutral-400" />
            <span className="text-neutral-600">Group Size <span className="font-semibold">{property.groupSize}</span> Members</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-neutral-600">Openings <span className={`font-semibold ${property.spotsLeft === 0 ? "text-red-500" : "text-green-600"}`}>{property.spotsLeft}</span> Left</span>
          </div>
          <div className="text-sm text-neutral-600">
            Last day to join <span className="font-semibold text-neutral-800">{property.deadline}</span>
          </div>
        </div>

        <div className="border-t border-neutral-200 pt-3 mb-3">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-sm text-neutral-500">Target Price</span>
            <span className="text-xl font-bold text-neutral-800">{formatPrice(property.groupPrice)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-400 line-through">
              Developer price {formatPrice(property.marketPrice)}
            </span>
          </div>
        </div>

        <button className="w-full py-2.5 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors">
          Join Group
        </button>
      </div>
    </a>
  );
}

// Parse superArea like "1,245 - 2,890 sq.ft." to get min and max in sqft
function parseAreaRange(s: string): { min: number; max: number } {
  const match = s.match(/([\d,]+)\s*-\s*([\d,]+)/) || s.match(/([\d,]+)/);
  if (!match) return { min: 0, max: 999999 };
  const parse = (x: string) => parseInt(x.replace(/,/g, ""), 10) || 0;
  const a = parse(match[1]);
  const b = match[2] ? parse(match[2]) : a;
  return { min: Math.min(a, b), max: Math.max(a, b) };
}

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [possessionStatus, setPossessionStatus] = useState("");
  const [configurationType, setConfigurationType] = useState("");
  const [budget, setBudget] = useState("");
  const [areaSqft, setAreaSqft] = useState("");
  const propertiesGridRef = useRef<HTMLDivElement>(null);

  // Read location from URL on mount
  useEffect(() => {
    const loc = searchParams.get("location");
    if (loc && AHMEDABAD_LOCATIONS.includes(loc as any)) setSelectedLocation(loc);
  }, [searchParams]);

  const handleSearch = (query: string) => setSearchQuery(query);

  const filteredProperties = useMemo(() => {
    return allProperties.filter((prop) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (!prop.name.toLowerCase().includes(q) && !prop.location.toLowerCase().includes(q) && !prop.city.toLowerCase().includes(q))
          return false;
      }
      if (selectedLocation && prop.location !== selectedLocation) return false;
      if (configurationType) {
        const match = prop.bhkOptions.some((b) => b.toLowerCase().includes(configurationType + " bhk"));
        if (!match) return false;
      }
      if (budget) {
        const p = prop.groupPrice;
        if (budget === "under-1" && p >= 1e7) return false;
        if (budget === "1-5" && (p < 1e7 || p > 5e7)) return false;
        if (budget === "5-10" && (p < 5e7 || p > 10e7)) return false;
        if (budget === "above-10" && p <= 10e7) return false;
      }
      if (areaSqft) {
        const { min, max } = parseAreaRange(prop.superArea);
        if (areaSqft === "under-1000" && max >= 1000) return false;
        if (areaSqft === "1000-2000" && (max < 1000 || min > 2000)) return false;
        if (areaSqft === "2000-3000" && (max < 2000 || min > 3000)) return false;
        if (areaSqft === "above-3000" && min < 3000) return false;
      }
      return true;
    });
  }, [searchQuery, selectedLocation, configurationType, budget, areaSqft]);

  // (Footer now sits naturally after content; dynamic top calculation removed)

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onLoginClick={() => setIsLoginModalOpen(true)} 
        hideNavigation={false}
      />

      {/* Property Search Bar - Compact, centered */}
      <div className="bg-neutral-50 pt-12 md:pt-16">
        <PropertySearch variant="compact" />
      </div>

      {/* Properties Grid/Map - Start below search bar */}
      <div className="container-custom pt-6 md:pt-8 pb-6 relative">
          {viewMode === "list" ? (
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              {/* Mobile Filter Toggle Button */}
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
              >
                <Filter className="w-5 h-5" />
                {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
              </button>

              {/* Left Sidebar - Filters */}
              <div className={`w-full lg:w-64 lg:flex-shrink-0 lg:sticky lg:top-20 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
                <div className="bg-white rounded-xl border border-neutral-200 p-4 md:p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-neutral-800" style={{ fontFamily: "var(--font-display)" }}>
                      Filters
                    </h3>
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="lg:hidden p-1 rounded hover:bg-neutral-100"
                    >
                      <X className="w-5 h-5 text-neutral-600" />
                    </button>
                  </div>
                  
                  <div className="space-y-5">
                    {/* Location in Ahmedabad */}
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        Location in Ahmedabad
                      </label>
                      <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">All Locations</option>
                        {AHMEDABAD_LOCATIONS.map((loc) => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                    </div>

                    {/* Possession Status */}
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        Possession Status
                      </label>
                      <select
                        value={possessionStatus}
                        onChange={(e) => setPossessionStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">All</option>
                        <option value="ready">Ready to Move</option>
                        <option value="under-construction">Under Construction</option>
                      </select>
                    </div>

                    {/* Configuration Type */}
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        Configuration Type
                      </label>
                      <select
                        value={configurationType}
                        onChange={(e) => setConfigurationType(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">All</option>
                        <option value="1">1 BHK</option>
                        <option value="2">2 BHK</option>
                        <option value="3">3 BHK</option>
                        <option value="4">4 BHK</option>
                      </select>
                    </div>

                    {/* Budget */}
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        Budget
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">All</option>
                        <option value="under-1">Under ₹1 Cr</option>
                        <option value="1-5">₹1 - 5 Cr</option>
                        <option value="5-10">₹5 - 10 Cr</option>
                        <option value="above-10">Above ₹10 Cr</option>
                      </select>
                    </div>

                    {/* Area Sqft */}
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        Area Sqft
                      </label>
                      <select
                        value={areaSqft}
                        onChange={(e) => setAreaSqft(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">All</option>
                        <option value="under-1000">Under 1000 sq.ft.</option>
                        <option value="1000-2000">1000 - 2000 sq.ft.</option>
                        <option value="2000-3000">2000 - 3000 sq.ft.</option>
                        <option value="above-3000">Above 3000 sq.ft.</option>
                      </select>
                    </div>

                    {/* Clear Filters Button */}
                    <button
                      onClick={() => {
                        setSelectedLocation("");
                        setPossessionStatus("");
                        setConfigurationType("");
                        setBudget("");
                        setAreaSqft("");
                      }}
                      className="w-full py-2.5 px-4 border-2 border-neutral-300 rounded-lg text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              </div>

              {/* Properties Grid */}
              <div className="flex-1 min-w-0 w-full lg:w-auto">
                {/* Results Count Section */}
                <div className="mb-4">
                  <p className="text-sm text-neutral-600 mb-1">Shown results</p>
                  <p className="text-xl md:text-2xl font-bold text-neutral-800">{filteredProperties.length} Properties</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 w-full">
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-6 h-[calc(100vh-300px)]">
              {/* Properties List */}
              <div className="w-1/2 overflow-y-auto space-y-4 pr-4">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
              
              {/* Map */}
              <div className="w-1/2 bg-neutral-200 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14736.6!2d72.5713621!3d23.022505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                />
              </div>
            </div>
          )}
        </div>

      {/* Footer - Dynamically positioned below listings */}
      <div className="w-full mt-8 md:mt-12" style={{ position: 'relative' }}>
        <Footer hideSubscribe={true} />
      </div>

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
    </div>
  );
}