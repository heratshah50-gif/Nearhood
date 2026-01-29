"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Heart,
  Share2,
  Scale,
  Clock,
  Users,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  Phone,
  Sparkles,
} from "lucide-react";
import { getPropertyImage } from "@/lib/property-images";
import { getPropertySlug } from "@/lib/properties-data";
import { getProductsByCategory, VehicleProduct } from "@/lib/products-data";
import { Car, Bike } from "lucide-react";

interface Property {
  id: number;
  name: string;
  location: string;
  city: string;
  image: string;
  bhkOptions: string[];
  superArea: string;
  groupSize: number;
  spotsLeft: number;
  deadline: string;
  marketPrice: number;
  groupPrice: number;
  savingsPercent: number;
  possession: string;
  isRera: boolean;
  amenities: number;
  shortlisted: number;
  featured: boolean;
}

const properties: Property[] = [
  { id: 1, name: "Adani Shantigram", location: "Bopal", city: "Ahmedabad", image: getPropertyImage(0), bhkOptions: ["2 BHK", "3 BHK", "4 BHK"], superArea: "1,245 - 2,890 sq.ft.", groupSize: 15, spotsLeft: 3, deadline: "Jan 31, 2026", marketPrice: 18500000, groupPrice: 15200000, savingsPercent: 18, possession: "Dec 2027", isRera: true, amenities: 24, shortlisted: 45, featured: true },
  { id: 2, name: "Godrej Garden City", location: "SG Highway", city: "Ahmedabad", image: getPropertyImage(1), bhkOptions: ["3 BHK", "4 BHK"], superArea: "2,100 - 3,450 sq.ft.", groupSize: 20, spotsLeft: 7, deadline: "Feb 15, 2026", marketPrice: 42000000, groupPrice: 35500000, savingsPercent: 15, possession: "Mar 2028", isRera: true, amenities: 32, shortlisted: 78, featured: true },
  { id: 3, name: "Torrent Greens", location: "Bodakdev", city: "Ahmedabad", image: getPropertyImage(2), bhkOptions: ["1 BHK", "2 BHK", "3 BHK"], superArea: "650 - 1,450 sq.ft.", groupSize: 25, spotsLeft: 12, deadline: "Feb 28, 2026", marketPrice: 9500000, groupPrice: 7800000, savingsPercent: 18, possession: "Jun 2027", isRera: true, amenities: 18, shortlisted: 156, featured: false },
  { id: 4, name: "Artha Infra", location: "Satellite", city: "Ahmedabad", image: getPropertyImage(3), bhkOptions: ["3 BHK", "4 BHK"], superArea: "1,890 - 2,650 sq.ft.", groupSize: 12, spotsLeft: 2, deadline: "Jan 25, 2026", marketPrice: 32000000, groupPrice: 26500000, savingsPercent: 17, possession: "Sep 2027", isRera: true, amenities: 28, shortlisted: 89, featured: true },
  { id: 5, name: "Siddhi Vinayak", location: "Prahlad Nagar", city: "Ahmedabad", image: getPropertyImage(4), bhkOptions: ["2 BHK", "3 BHK"], superArea: "1,120 - 1,890 sq.ft.", groupSize: 18, spotsLeft: 5, deadline: "Mar 10, 2026", marketPrice: 14500000, groupPrice: 11900000, savingsPercent: 18, possession: "Dec 2028", isRera: true, amenities: 22, shortlisted: 67, featured: false },
  { id: 6, name: "Shivalik Group", location: "Thaltej", city: "Ahmedabad", image: getPropertyImage(5), bhkOptions: ["2 BHK", "3 BHK", "4 BHK"], superArea: "1,450 - 2,980 sq.ft.", groupSize: 16, spotsLeft: 4, deadline: "Feb 5, 2026", marketPrice: 28000000, groupPrice: 23500000, savingsPercent: 16, possession: "Mar 2027", isRera: true, amenities: 35, shortlisted: 112, featured: true },
];

const tabs = [
  { id: "active", label: "Active Groups" },
  { id: "closing", label: "Closing Soon" },
  { id: "new", label: "New Launches" },
];

const groupTypes = [
  { id: "properties", label: "Properties" },
  { id: "vehicles", label: "Vehicles" },
];

function formatPrice(price: number): string {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  }
  return `₹${(price / 100000).toFixed(0)} L`;
}

function PropertyCard({ property, index }: { property: Property; index: number }) {
  const [isLiked, setIsLiked] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  const progressPercent = ((property.groupSize - property.spotsLeft) / property.groupSize) * 100;
  const propertySlug = getPropertySlug(property.name);

  return (
    <Link href={`/properties/${propertySlug}`} className="flex w-full h-full">
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group card-zoom-hover relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-100 w-full h-full flex flex-col cursor-pointer"
      >
      {/* Image Section */}
      <div className="relative h-52 w-full bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
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
                <Sparkles className="w-8 h-8 text-primary-500" />
              </div>
              <p className="text-primary-700/60 text-sm font-medium">{property.name}</p>
            </div>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Possession Badge */}
        <div className="absolute top-4 left-4">
          <div className="px-3 py-1.5 rounded-lg bg-primary-500 text-white text-xs font-semibold">
            {property.possession}
          </div>
        </div>

        {/* RERA Badge */}
        {property.isRera && (
          <div className="absolute top-4 right-14">
            <div className="px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-sm flex items-center gap-1.5">
              <BadgeCheck className="w-4 h-4 text-green-500" />
              <span className="text-xs font-semibold text-green-600">RERA</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              isLiked
                ? "bg-red-500 text-white"
                : "bg-white/95 backdrop-blur-sm text-neutral-600 hover:bg-white"
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Floating Action Buttons - Appear on Hover */}
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="w-9 h-9 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center text-neutral-600 hover:bg-white transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="w-9 h-9 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center text-neutral-600 hover:bg-white transition-colors"
          >
            <Scale className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Property Name & Location */}
        <div className="mb-3">
          <h3
            className="text-lg font-bold text-neutral-800 mb-1 line-clamp-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {property.name}
          </h3>
          <div className="flex items-center gap-1 text-neutral-500 text-sm">
            <MapPin className="w-3.5 h-3.5" />
            <span>{property.location}, {property.city}</span>
          </div>
        </div>

        {/* BHK Options */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {property.bhkOptions.map((bhk) => (
            <span
              key={bhk}
              className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-600 text-xs font-medium"
            >
              {bhk}
            </span>
          ))}
          <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-600 text-xs font-medium">
            {property.superArea}
          </span>
        </div>

        {/* Group Status */}
        <div className="mb-4 p-3 rounded-xl bg-primary-50/50 border border-primary-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <Users className="w-4 h-4 text-primary-600 flex-shrink-0" />
              <span className="text-sm font-medium text-neutral-700 truncate">
                <span className="font-bold">{property.groupSize - property.spotsLeft}</span>/{property.groupSize} joined
              </span>
            </div>
            <span className={`text-xs font-semibold ${property.spotsLeft <= 3 ? "text-red-500" : "text-green-600"}`}>
              {property.spotsLeft} spots left
            </span>
          </div>
          {/* Progress Bar */}
          <div className="h-2 bg-primary-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-primary-400 to-primary-500 rounded-full"
            />
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-neutral-500">
            <Clock className="w-3.5 h-3.5" />
            <span>Closes on <span className="font-semibold text-neutral-700">{property.deadline}</span></span>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-3 p-3 rounded-xl bg-neutral-50 border border-neutral-100">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-neutral-500 mb-0.5">Group Price</p>
              <p className="text-xl font-bold text-neutral-800" style={{ fontFamily: "var(--font-display)" }}>
                {formatPrice(property.groupPrice)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-neutral-400 line-through">
                {formatPrice(property.marketPrice)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-green-100">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
              <span className="text-xs font-semibold text-green-600">
                Save {property.savingsPercent}%
              </span>
            </div>
            <span className="text-xs text-neutral-500">
              ≈ {formatPrice(property.marketPrice - property.groupPrice)} savings
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mb-5 mt-2">
          <span className="text-xs text-neutral-400">
            {property.shortlisted} users shortlisted
          </span>
          <span className="text-xs text-neutral-500">
            +{property.amenities} amenities
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-2 mt-auto" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="flex-1 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all flex items-center justify-center gap-2"
          >
            Join Group
            <ArrowRight className="w-4 h-4" />
          </button>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="w-12 h-12 rounded-xl border-2 border-primary-200 text-primary-600 hover:bg-primary-50 transition-colors flex items-center justify-center"
          >
            <Phone className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Featured Badge */}
      {property.featured && (
        <div className="absolute top-0 left-0">
          <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg shadow-lg">
            Featured
          </div>
        </div>
      )}
    </motion.div>
    </Link>
  );
}

function VehicleCard({ vehicle, index }: { vehicle: VehicleProduct; index: number }) {
  const [isLiked, setIsLiked] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  const progressPercent = ((vehicle.groupSize - vehicle.spotsLeft) / vehicle.groupSize) * 100;
  const slug = vehicle.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link href={`/vehicles/${vehicle.subcategory}/${slug}`} className="flex w-full h-full">
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group card-zoom-hover relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-100 w-full h-full flex flex-col cursor-pointer"
      >
        {/* Image Section */}
        <div className="relative h-52 w-full bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
          {vehicle.image ? (
            <Image
              src={vehicle.image}
              alt={vehicle.name}
              fill
              className="object-cover w-full h-full"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized={vehicle.image.startsWith("http")}
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

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Year Badge */}
          <div className="absolute top-4 left-4">
            <div className="px-3 py-1.5 rounded-lg bg-primary-500 text-white text-xs font-semibold">
              {vehicle.year}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                isLiked
                  ? "bg-red-500 text-white"
                  : "bg-white/95 backdrop-blur-sm text-neutral-600 hover:bg-white"
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Vehicle Name & Location */}
          <div className="mb-3">
            <h3
              className="text-lg font-bold text-neutral-800 mb-1 line-clamp-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {vehicle.brand} {vehicle.model} {vehicle.year}
            </h3>
            <div className="flex items-center gap-1 text-neutral-500 text-sm">
              <MapPin className="w-3.5 h-3.5" />
              <span>{vehicle.location}, {vehicle.city}</span>
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="flex flex-wrap gap-1.5 mb-4">
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
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <Users className="w-4 h-4 text-primary-600 flex-shrink-0" />
                <span className="text-sm font-medium text-neutral-700 truncate">
                  <span className="font-bold">{vehicle.groupSize - vehicle.spotsLeft}</span>/{vehicle.groupSize} joined
                </span>
              </div>
              <span className={`text-xs font-semibold ${vehicle.spotsLeft <= 3 ? "text-red-500" : "text-green-600"}`}>
                {vehicle.spotsLeft} spots left
              </span>
            </div>
            {/* Progress Bar */}
            <div className="h-2 bg-primary-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-primary-400 to-primary-500 rounded-full"
              />
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-neutral-500">
              <Clock className="w-3.5 h-3.5" />
              <span>Closes on <span className="font-semibold text-neutral-700">{vehicle.deadline}</span></span>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-3 p-3 rounded-xl bg-neutral-50 border border-neutral-100">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-neutral-500 mb-0.5">Group Price</p>
                <p className="text-xl font-bold text-neutral-800" style={{ fontFamily: "var(--font-display)" }}>
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
              <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-green-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                <span className="text-xs font-semibold text-green-600">
                  Save {vehicle.savingsPercent}%
                </span>
              </div>
              <span className="text-xs text-neutral-500">
                ≈ {formatPrice(vehicle.marketPrice - vehicle.groupPrice)} savings
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-2 mt-auto" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="flex-1 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all flex items-center justify-center gap-2"
            >
              Join Group
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="w-12 h-12 rounded-xl border-2 border-primary-200 text-primary-600 hover:bg-primary-50 transition-colors flex items-center justify-center"
            >
              <Phone className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Badge */}
        {vehicle.featured && (
          <div className="absolute top-0 left-0">
            <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg shadow-lg">
              Featured
            </div>
          </div>
        )}
      </motion.div>
    </Link>
  );
}

export default function Properties() {
  const [activeTab, setActiveTab] = useState("active");
  const [activeGroupType, setActiveGroupType] = useState("properties");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Get vehicles data
  const vehicles = getProductsByCategory("vehicle") as VehicleProduct[];
  
  // Filter displayed items based on group type
  const displayedItems = activeGroupType === "properties" ? properties : vehicles;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-neutral-50" id="properties">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-bold text-neutral-800 mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Featured Groups
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-neutral-500 text-lg max-w-xl"
            >
              Exclusive bulk buy items in Ahmedabad by our team with active group buying deals
            </motion.p>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            {/* Group Type Filters */}
            <div className="flex bg-white rounded-xl p-1 shadow-sm border border-neutral-100">
              {groupTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setActiveGroupType(type.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeGroupType === type.id
                      ? "bg-primary-500 text-white shadow-md"
                      : "text-neutral-600 hover:text-primary-600"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex bg-white rounded-xl p-1 shadow-sm border border-neutral-100">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-primary-500 text-white shadow-md"
                      : "text-neutral-600 hover:text-primary-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* View All Link */}
            <Link
              href="/properties"
              className="hidden lg:flex items-center gap-1 text-primary-600 font-medium hover:text-primary-700 transition-colors"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Property Cards */}
        <div className="relative">
          {/* Navigation Buttons - Desktop */}
          <button
            onClick={() => scroll("left")}
            className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-neutral-100 items-center justify-center text-neutral-600 hover:text-primary-600 hover:border-primary-200 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-neutral-100 items-center justify-center text-neutral-600 hover:text-primary-600 hover:border-primary-200 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide lg:custom-scrollbar snap-x snap-mandatory items-stretch"
          >
            {displayedItems.map((item, index) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-[340px] snap-start min-w-[340px] flex"
              >
                {activeGroupType === "properties" ? (
                  <PropertyCard property={item as Property} index={index} />
                ) : (
                  <VehicleCard vehicle={item as VehicleProduct} index={index} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View All */}
        <div className="lg:hidden mt-8 text-center">
          <Link
            href={activeGroupType === "properties" ? "/properties" : "/vehicles"}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-sm border border-neutral-200 text-primary-600 font-medium hover:bg-primary-50 transition-colors"
          >
            View All {activeGroupType === "properties" ? "Properties" : "Vehicles"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}


