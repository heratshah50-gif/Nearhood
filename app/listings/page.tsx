"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoginModal from "@/components/auth/LoginModal";
import ListingCard from "@/components/listings/ListingCard";
import { AHMEDABAD_LOCATIONS } from "@/lib/ahmedabad-locations";
import { ALL_PROPERTIES } from "@/lib/properties-data";
import { getProductsByCategory, isVehicleProduct } from "@/lib/products-data";
import {
  propertyToUnified,
  vehicleToUnified,
  type UnifiedListing,
} from "@/lib/listings-unified";
import { Filter, X } from "lucide-react";

// Parse superArea like "1,245 - 2,890 sq.ft." for property filters
function parseAreaRange(s: string): { min: number; max: number } {
  const match = s.match(/([\d,]+)\s*-\s*([\d,]+)/) || s.match(/([\d,]+)/);
  if (!match) return { min: 0, max: 999999 };
  const parse = (x: string) => parseInt(x.replace(/,/g, ""), 10) || 0;
  const a = parse(match[1]);
  const b = match[2] ? parse(match[2]) : a;
  return { min: Math.min(a, b), max: Math.max(a, b) };
}

export default function ListingsPage() {
  const searchParams = useSearchParams();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "property" | "vehicle">("all");
  const [vehicleType, setVehicleType] = useState<"all" | "car" | "bike">("all");
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [budgetVehicle, setBudgetVehicle] = useState("");
  const [configurationType, setConfigurationType] = useState("");
  const [budget, setBudget] = useState("");
  const [areaSqft, setAreaSqft] = useState("");

  // Read category and location from URL on mount
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat === "property" || cat === "vehicle") setSelectedCategory(cat);
    const loc = searchParams.get("location");
    if (loc && AHMEDABAD_LOCATIONS.includes(loc as any)) setSelectedLocation(loc);
  }, [searchParams]);

  // Build unified list: properties + vehicles
  const allListings = useMemo(() => {
    const props = ALL_PROPERTIES.map(propertyToUnified);
    const vehicles = getProductsByCategory("vehicle")
      .filter(isVehicleProduct)
      .map(vehicleToUnified);
    return [...props, ...vehicles];
  }, []);

  const filteredListings = useMemo(() => {
    return allListings.filter((listing) => {
      // Category filter
      if (selectedCategory === "property" && listing.type !== "property") return false;
      if (selectedCategory === "vehicle" && listing.type !== "vehicle") return false;

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (
          !listing.title.toLowerCase().includes(q) &&
          !listing.location.toLowerCase().includes(q) &&
          !listing.city.toLowerCase().includes(q)
        )
          return false;
      }

      // Location
      if (selectedLocation && listing.location !== selectedLocation) return false;

      // Property-specific filters
      if (listing.type === "property") {
        const prop = ALL_PROPERTIES.find((p) => p.id === listing.id);
        if (!prop) return false;
        if (configurationType) {
          const match = prop.bhkOptions.some((b) =>
            b.toLowerCase().includes(configurationType + " bhk")
          );
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
      }

      // Vehicle-specific filters
      if (listing.type === "vehicle") {
        const vehicles = getProductsByCategory("vehicle").filter(isVehicleProduct);
        const v = vehicles.find((ve) => ve.id === listing.id);
        if (!v) return false;
        if (vehicleType !== "all" && v.subcategory !== vehicleType) return false;
        if (fuelType && v.fuelType !== fuelType) return false;
        if (transmission && v.transmission !== transmission) return false;
        if (budgetVehicle) {
          const p = v.groupPrice;
          if (budgetVehicle === "under-5" && p >= 500000) return false;
          if (budgetVehicle === "5-10" && (p < 500000 || p > 1000000)) return false;
          if (budgetVehicle === "10-25" && (p <= 1000000 || p > 2500000)) return false;
          if (budgetVehicle === "above-25" && p <= 2500000) return false;
        }
      }

      return true;
    });
  }, [
    allListings,
    selectedCategory,
    searchQuery,
    selectedLocation,
    vehicleType,
    fuelType,
    transmission,
    budgetVehicle,
    configurationType,
    budget,
    areaSqft,
  ]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = window.sessionStorage.getItem("nearhood_user");
      if (userStr) {
        try {
          setUserInfo(JSON.parse(userStr));
        } catch {
          setUserInfo(null);
        }
      } else {
        setUserInfo(null);
        setIsLoginModalOpen(true);
      }
    }
  }, []);

  useEffect(() => {
    const checkUserLogin = () => {
      if (typeof window !== "undefined") {
        const userStr = window.sessionStorage.getItem("nearhood_user");
        if (userStr) {
          try {
            setUserInfo(JSON.parse(userStr));
            setIsLoginModalOpen(false);
          } catch {
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

  const handleSearch = (query: string) => setSearchQuery(query);

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedLocation("");
    setVehicleType("all");
    setFuelType("");
    setTransmission("");
    setBudgetVehicle("");
    setConfigurationType("");
    setBudget("");
    setAreaSqft("");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        onLoginClick={() => setIsLoginModalOpen(true)}
        hideNavigation={true}
        searchProps={{
          selectedCity: selectedLocation,
          onCityChange: setSelectedLocation,
          searchQuery,
          onSearchChange: handleSearch,
          locationOptions: [...AHMEDABAD_LOCATIONS],
          budget,
          onBudgetChange: setBudget,
        }}
      />

      <div className="container-custom pt-20 md:pt-24 lg:pt-28 pb-6 relative">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
          >
            <Filter className="w-5 h-5" />
            {showMobileFilters ? "Hide Filters" : "Show Filters"}
          </button>

          {/* Sidebar - Filters */}
          <div
            className={`w-full lg:w-64 lg:flex-shrink-0 lg:sticky lg:top-32 mt-8 lg:mt-12 lg:ml-4 ${
              showMobileFilters ? "block" : "hidden lg:block"
            }`}
          >
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
                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as "all" | "property" | "vehicle")}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All Listings</option>
                    <option value="property">Properties</option>
                    <option value="vehicle">Vehicles</option>
                  </select>
                </div>

                {/* Vehicle Type - only when vehicle selected */}
                {(selectedCategory === "vehicle" || selectedCategory === "all") && (
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Type
                    </label>
                    <select
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value as "all" | "car" | "bike")}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="all">All</option>
                      <option value="car">Cars</option>
                      <option value="bike">Bikes</option>
                    </select>
                  </div>
                )}

                {/* Property filters */}
                {(selectedCategory === "property" || selectedCategory === "all") && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        Configuration
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
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        Budget (Property)
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
                  </>
                )}

                {/* Vehicle filters */}
                {(selectedCategory === "vehicle" || selectedCategory === "all") && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        Fuel Type
                      </label>
                      <select
                        value={fuelType}
                        onChange={(e) => setFuelType(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">All</option>
                        <option value="petrol">Petrol</option>
                        <option value="diesel">Diesel</option>
                        <option value="electric">Electric</option>
                        <option value="hybrid">Hybrid</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        Transmission
                      </label>
                      <select
                        value={transmission}
                        onChange={(e) => setTransmission(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">All</option>
                        <option value="manual">Manual</option>
                        <option value="automatic">Automatic</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        Budget (Vehicle)
                      </label>
                      <select
                        value={budgetVehicle}
                        onChange={(e) => setBudgetVehicle(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">All</option>
                        <option value="under-5">Under ₹5 L</option>
                        <option value="5-10">₹5 - 10 L</option>
                        <option value="10-25">₹10 - 25 L</option>
                        <option value="above-25">Above ₹25 L</option>
                      </select>
                    </div>
                  </>
                )}

                <button
                  onClick={clearFilters}
                  className="w-full py-2.5 px-4 border-2 border-neutral-300 rounded-lg text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="flex-1 min-w-0 w-full lg:w-auto">
            <div className="mb-4">
              <p className="text-sm text-neutral-600 mb-1">Shown results</p>
              <p className="text-xl md:text-2xl font-bold text-neutral-800">
                {filteredListings.length} Listings
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 w-full">
              {filteredListings.map((listing) => (
                <ListingCard
                  key={`${listing.type}-${listing.id}`}
                  listing={listing}
                  onLoginClick={() => setIsLoginModalOpen(true)}
                  userInfo={userInfo}
                />
              ))}
            </div>

            {filteredListings.length === 0 && (
              <div className="text-center py-12">
                <p className="text-neutral-600">No listings found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full mt-8 md:mt-12" style={{ position: "relative" }}>
        <Footer hideSubscribe={true} />
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={() => {}}
      />
    </div>
  );
}
