"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoginModal from "@/components/auth/LoginModal";
import { AHMEDABAD_LOCATIONS } from "@/lib/ahmedabad-locations";
import {
  getProductsByCategory,
  isVehicleProduct,
  VehicleProduct,
  getProductSlug,
} from "@/lib/products-data";
import { Car, Bike, MapPin, Heart, Share2, Users, Phone, Filter, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type VehicleTab = "all" | "car" | "bike";

function formatPrice(price: number): string {
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
  return `₹${(price / 1000).toFixed(0)}K`;
}

function VehicleCard({ vehicle, onLoginClick, userInfo }: { vehicle: VehicleProduct; onLoginClick: () => void; userInfo: any }) {
  const [isLiked, setIsLiked] = useState(false);
  const slug = getProductSlug(vehicle.name);

  const handleJoinGroup = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!userInfo) {
      onLoginClick();
    } else {
      window.location.href = `/vehicles/${vehicle.subcategory}/${slug}`;
    }
  };

  return (
    <Link href={`/vehicles/${vehicle.subcategory}/${slug}`}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-neutral-100 cursor-pointer">
        {/* Image Section */}
        <div className="relative h-56 w-full bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
          {vehicle.image ? (
            <Image
              src={vehicle.image}
              alt={vehicle.name}
              fill
              className={`object-contain object-left p-4 ${
                vehicle.brand === "MG" && vehicle.model === "Hector"
                  ? "-scale-x-100"
                  : ""
              }`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              {vehicle.subcategory === "car" ? (
                <Car className="w-16 h-16 text-primary-500" />
              ) : (
                <Bike className="w-16 h-16 text-primary-500" />
              )}
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {vehicle.featured && (
            <div className="absolute top-0 left-0 z-10">
              <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg">
                Featured
              </div>
            </div>
          )}

          <div
            className="absolute top-3 right-3 flex flex-col gap-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                isLiked
                  ? "bg-red-500 text-white"
                  : "bg-white/90 text-neutral-600 hover:bg-white"
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="w-8 h-8 rounded-lg bg-white/90 text-neutral-600 hover:bg-white flex items-center justify-center"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          <div className="mb-3">
            <h3 className="text-lg font-bold text-neutral-800 mb-1 line-clamp-1">
              {vehicle.brand} {vehicle.model} {vehicle.year}
            </h3>
            <div className="flex items-center gap-1 text-neutral-500 text-sm">
              <MapPin className="w-3.5 h-3.5" />
              <span>
                {vehicle.location}, {vehicle.city}
              </span>
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-600 text-xs font-medium">
              {vehicle.fuelType}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-600 text-xs font-medium">
              {vehicle.transmission}
            </span>
            {vehicle.mileage && (
              <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-600 text-xs font-medium">
                {vehicle.mileage}
              </span>
            )}
          </div>

          {/* Group Status */}
          <div className="mb-4 p-3 rounded-xl bg-primary-50/50 border border-primary-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-medium text-neutral-700">
                  <span className="font-bold">
                    {vehicle.groupSize - vehicle.spotsLeft}
                  </span>
                  /{vehicle.groupSize} joined
                </span>
              </div>
              <span
                className={`text-xs font-semibold ${
                  vehicle.spotsLeft <= 3 ? "text-red-500" : "text-green-600"
                }`}
              >
                {vehicle.spotsLeft} spots left
              </span>
            </div>
            <div className="text-xs text-neutral-500">
              Closes on{" "}
              <span className="font-semibold text-neutral-700">
                {vehicle.deadline}
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-4 p-3 rounded-xl bg-neutral-50 border border-neutral-100">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-neutral-500 mb-0.5">Group Price</p>
                <p className="text-xl font-bold text-neutral-800">
                  {formatPrice(vehicle.groupPrice)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-neutral-400 line-through">
                  {formatPrice(vehicle.marketPrice)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-1 rounded-md bg-green-100 text-xs font-semibold text-green-600">
                Save {vehicle.savingsPercent}%
              </span>
              <span className="text-xs text-neutral-500">
                ≈ {formatPrice(vehicle.marketPrice - vehicle.groupPrice)}{" "}
                savings
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-neutral-400">
              {(vehicle.shortlisted ?? 0).toLocaleString("en-IN")} users
              shortlisted
            </span>
          </div>

          {/* CTA Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all flex items-center justify-center gap-2"
          >
            Join Group
            <Phone className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}

export default function VehiclesPage() {
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<VehicleTab>("all");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [budget, setBudget] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("vehicle");
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [budgetVehicle, setBudgetVehicle] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (value === "property") {
      router.push("/properties");
      return;
    }
    setFuelType("");
    setTransmission("");
    setBudgetVehicle("");
    setYearFilter("");
  };

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

  const handleSearch = (query: string) => setSearchQuery(query);

  const vehicles = useMemo(() => {
    let allVehicles = getProductsByCategory("vehicle").filter(isVehicleProduct);
    
    // Filter by subcategory tab (Type)
    if (activeTab !== "all") {
      allVehicles = allVehicles.filter((v) => v.subcategory === activeTab);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      allVehicles = allVehicles.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.brand.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q) ||
          v.location.toLowerCase().includes(q) ||
          v.city.toLowerCase().includes(q)
      );
    }
    
    // Filter by location
    if (selectedLocation) {
      allVehicles = allVehicles.filter((v) => v.location === selectedLocation);
    }

    // Sidebar filters
    if (fuelType) {
      allVehicles = allVehicles.filter((v) => v.fuelType === fuelType);
    }
    if (transmission) {
      allVehicles = allVehicles.filter((v) => v.transmission === transmission);
    }
    if (budgetVehicle) {
      const p = (v: VehicleProduct) => v.groupPrice;
      if (budgetVehicle === "under-5") allVehicles = allVehicles.filter((v) => p(v) < 500000);
      if (budgetVehicle === "5-10") allVehicles = allVehicles.filter((v) => p(v) >= 500000 && p(v) <= 1000000);
      if (budgetVehicle === "10-25") allVehicles = allVehicles.filter((v) => p(v) > 1000000 && p(v) <= 2500000);
      if (budgetVehicle === "above-25") allVehicles = allVehicles.filter((v) => p(v) > 2500000);
    }
    if (yearFilter) {
      const y = parseInt(yearFilter, 10);
      if (!isNaN(y)) allVehicles = allVehicles.filter((v) => v.year === y);
    }
    
    return allVehicles;
  }, [activeTab, searchQuery, selectedLocation, fuelType, transmission, budgetVehicle, yearFilter]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header 
        onLoginClick={() => setIsLoginModalOpen(true)} 
        hideNavigation={true}
        searchProps={{
          selectedCity: selectedLocation || "",
          onCityChange: setSelectedLocation,
          searchQuery,
          onSearchChange: handleSearch,
          locationOptions: [...AHMEDABAD_LOCATIONS],
          budget,
          onBudgetChange: setBudget,
        }}
      />

      {/* Vehicles Grid/List - Start below header with integrated search */}
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

          {/* Left Sidebar - Filters */}
          <div className={`w-full lg:w-64 lg:flex-shrink-0 lg:sticky lg:top-32 mt-8 lg:mt-12 lg:ml-4 ${showMobileFilters ? "block" : "hidden lg:block"}`}>
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
                {/* Categories - Properties or Vehicle */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Categories
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="property">Properties</option>
                    <option value="vehicle">Vehicle</option>
                  </select>
                </div>

                {/* Type - Cars / Bikes */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Type
                  </label>
                  <select
                    value={activeTab}
                    onChange={(e) => setActiveTab(e.target.value as VehicleTab)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All</option>
                    <option value="car">Cars</option>
                    <option value="bike">Bikes</option>
                  </select>
                </div>

                {/* Fuel Type */}
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

                {/* Transmission */}
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

                {/* Budget (Vehicle price in L) */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Budget
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

                {/* Year */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Year
                  </label>
                  <select
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">All</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                  </select>
                </div>

                {/* Clear All Filters */}
                <button
                  onClick={() => {
                    setSelectedCategory("vehicle");
                    setActiveTab("all");
                    setFuelType("");
                    setTransmission("");
                    setBudgetVehicle("");
                    setYearFilter("");
                  }}
                  className="w-full py-2.5 px-4 border-2 border-neutral-300 rounded-lg text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          {/* Right: Category tabs + Vehicles grid */}
          <div className="flex-1 min-w-0 w-full lg:w-auto">
            {/* Category tabs at top */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <p className="text-xs uppercase tracking-wide text-neutral-500 font-semibold">
                    Category
                  </p>
                  {selectedLocation && (
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-primary-50 border border-primary-200 rounded-full">
                      <MapPin className="w-3.5 h-3.5 text-primary-600" />
                      <span className="text-xs font-semibold text-primary-700">
                        {selectedLocation}
                      </span>
                    </div>
                  )}
                </div>
                <div className="inline-flex items-center gap-2 bg-white rounded-full p-1 shadow-sm border border-neutral-200">
                  <button
                    type="button"
                    onClick={() => setActiveTab("all")}
                    className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold ${
                      activeTab === "all"
                        ? "bg-primary-600 text-white"
                        : "text-neutral-600 hover:bg-neutral-100"
                    }`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("car")}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold ${
                      activeTab === "car"
                        ? "bg-primary-600 text-white"
                        : "text-neutral-600 hover:bg-neutral-100"
                    }`}
                  >
                    <Car className="w-4 h-4" />
                    <span>Cars</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("bike")}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold ${
                      activeTab === "bike"
                        ? "bg-primary-600 text-white"
                        : "text-neutral-600 hover:bg-neutral-100"
                    }`}
                  >
                    <Bike className="w-4 h-4" />
                    <span>Bikes</span>
                  </button>
                </div>
              </div>

              <div className="text-right mt-4 md:mt-6">
                <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">
                  Showing
                </p>
                <p className="text-lg font-semibold text-neutral-900">
                  {vehicles.length} Vehicle Groups
                </p>
              </div>
            </div>

            {/* Vehicles grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {vehicles.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-neutral-600">No vehicles found matching your criteria.</p>
                </div>
              ) : (
                vehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} onLoginClick={() => setIsLoginModalOpen(true)} userInfo={userInfo} />
                ))
              )}
            </div>
          </div>
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
    </div>
  );
}
