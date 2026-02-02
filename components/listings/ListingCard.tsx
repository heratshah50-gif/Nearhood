"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Heart, Share2, Users, Phone, Car, Building2 } from "lucide-react";
import type { UnifiedListing } from "@/lib/listings-unified";

function formatPrice(price: number): string {
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
  return `₹${(price / 1000).toFixed(0)}K`;
}

interface ListingCardProps {
  listing: UnifiedListing;
  onLoginClick: () => void;
  userInfo: any;
}

export default function ListingCard({ listing, onLoginClick, userInfo }: ListingCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleJoinGroup = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!userInfo) {
      onLoginClick();
    } else {
      window.location.href = listing.href;
    }
  };

  const IconPlaceholder = listing.type === "vehicle" ? Car : Building2;

  return (
    <a
      href={userInfo ? listing.href : "#"}
      onClick={(e) => !userInfo && (e.preventDefault(), onLoginClick())}
      className="block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-neutral-100 cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative h-56 w-full bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
        {listing.image ? (
          <Image
            src={listing.image}
            alt={listing.title}
            fill
            className={`w-full h-full ${
              listing.type === "vehicle"
                ? "object-contain object-left p-4"
                : "object-cover"
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <IconPlaceholder className="w-16 h-16 text-primary-500" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {listing.featured && (
          <div className="absolute top-0 left-0 z-10">
            <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg">
              {listing.type === "vehicle" ? "Featured" : "Exclusive Deal"}
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
              isLiked ? "bg-red-500 text-white" : "bg-white/90 text-neutral-600 hover:bg-white"
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

      {/* Content Section - Same format for both */}
      <div className="p-5">
        {/* Title & Location */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-neutral-800 mb-1 line-clamp-1">
            {listing.title}
          </h3>
          <div className="flex items-center gap-1 text-neutral-500 text-sm">
            <MapPin className="w-3.5 h-3.5" />
            <span>
              {listing.location}, {listing.city}
            </span>
          </div>
        </div>

        {/* Specifications */}
        {listing.specs?.length > 0 && (
          <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3 text-xs">
            {listing.specs.map((spec) => (
              <div key={spec.label} className="flex items-center gap-1.5">
                <span className="text-neutral-400 font-medium">{spec.label}:</span>
                <span className="text-neutral-600">{spec.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Group Status Block */}
        <div className="mb-4 p-3 rounded-xl bg-primary-50/50 border border-primary-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-neutral-700">
                <span className="font-bold">{listing.groupSize - listing.spotsLeft}</span>/
                {listing.groupSize} joined
              </span>
            </div>
            <span
              className={`text-xs font-semibold ${
                listing.spotsLeft <= 3 ? "text-red-500" : "text-green-600"
              }`}
            >
              {listing.spotsLeft} spots left
            </span>
          </div>
          <div className="text-xs text-neutral-500">
            Closes on{" "}
            <span className="font-semibold text-neutral-700">{listing.deadline}</span>
          </div>
        </div>

        {/* Pricing Block */}
        <div className="mb-4 p-3 rounded-xl bg-primary-50/50 border border-primary-100">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-neutral-500 mb-0.5">Group Price</p>
              <p className="text-xl font-bold text-neutral-800">
                {formatPrice(listing.groupPrice)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-neutral-400 line-through">
                {formatPrice(listing.marketPrice)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-2 py-1 rounded-md bg-green-100 text-xs font-semibold text-green-600">
              Save {listing.savingsPercent}%
            </span>
            <span className="text-xs text-neutral-500">
              ≈ {formatPrice(listing.marketPrice - listing.groupPrice)} savings
            </span>
          </div>
        </div>

        {/* Shortlisted */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-neutral-400">
            {listing.shortlisted.toLocaleString("en-IN")} users shortlisted
          </span>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleJoinGroup}
          className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all flex items-center justify-center gap-2"
        >
          Join Group
          <Phone className="w-4 h-4" />
        </button>
      </div>
    </a>
  );
}
