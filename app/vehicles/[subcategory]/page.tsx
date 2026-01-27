"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoginModal from "@/components/auth/LoginModal";
import {
  getProductsBySubcategory,
  isVehicleProduct,
  Product,
  VehicleProduct,
} from "@/lib/products-data";
import { getProductSlug } from "@/lib/products-data";
import { Car, Bike, MapPin, Heart, Share2, Users, Phone, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface VehicleListingPageProps {
  params: {
    subcategory: string;
  };
}

function formatPrice(price: number): string {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  }
  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} L`;
  }
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
      // User is logged in, proceed with joining group
      window.location.href = `/vehicles/${vehicle.subcategory}/${slug}`;
    }
  };

  return (
    <Link href={`/vehicles/${vehicle.subcategory}/${slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-neutral-100 cursor-pointer"
      >
        {/* Image Section */}
        <div className="relative h-64 w-full bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
          {vehicle.image ? (
            <Image
              src={vehicle.image}
              alt={vehicle.name}
              fill
              className="object-cover"
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

          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10" onClick={(e) => e.stopPropagation()}>
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
              <span>{vehicle.location}, {vehicle.city}</span>
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
            {vehicle.color && (
              <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-600 text-xs font-medium">
                {vehicle.color}
              </span>
            )}
          </div>

          {/* Group Status */}
          <div className="mb-4 p-3 rounded-xl bg-primary-50/50 border border-primary-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-medium text-neutral-700">
                  <span className="font-bold">{vehicle.groupSize - vehicle.spotsLeft}</span>/{vehicle.groupSize} joined
                </span>
              </div>
              <span className={`text-xs font-semibold ${vehicle.spotsLeft <= 3 ? "text-red-500" : "text-green-600"}`}>
                {vehicle.spotsLeft} spots left
              </span>
            </div>
            <div className="text-xs text-neutral-500">
              Closes on <span className="font-semibold text-neutral-700">{vehicle.deadline}</span>
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
              <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-green-100">
                <span className="text-xs font-semibold text-green-600">
                  Save {vehicle.savingsPercent}%
                </span>
              </div>
              <span className="text-xs text-neutral-500">
                ≈ {formatPrice(vehicle.marketPrice - vehicle.groupPrice)} savings
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-neutral-400">
              {vehicle.shortlisted || 0} users shortlisted
            </span>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleJoinGroup}
            className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all flex items-center justify-center gap-2"
          >
            Join Group
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>
        </div>
      </motion.div>
    </Link>
  );
}

interface UserInfo {
  phoneNumber: string;
  name: string;
}

export default function VehicleListingPage({ params }: VehicleListingPageProps) {
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const checkUserLogin = () => {
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
        }
      }
    };

    checkUserLogin();
    window.addEventListener("userLoggedIn", checkUserLogin);
    return () => window.removeEventListener("userLoggedIn", checkUserLogin);
  }, []);

  const subcategory = params.subcategory === "cars" ? "car" : params.subcategory === "bikes" ? "bike" : null;
  const vehicles = useMemo(() => {
    if (!subcategory) return [];
    const products = getProductsBySubcategory("vehicle", subcategory);
    return products.filter(isVehicleProduct);
  }, [subcategory]);

  const title = subcategory === "car" ? "Cars" : subcategory === "bike" ? "Bikes" : "Vehicles";
  const icon = subcategory === "car" ? Car : Bike;

  if (!subcategory) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col">
        <Header onLoginClick={() => setIsLoginModalOpen(true)} />
        <main className="flex-1 pt-24 pb-16">
          <div className="container-custom text-center">
            <h1 className="text-2xl font-bold text-neutral-900 mb-4">Category not found</h1>
            <Link href="/vehicles" className="text-primary-600 hover:underline">
              Back to Vehicles
            </Link>
          </div>
        </main>
        <Footer hideSubscribe />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Header onLoginClick={() => setIsLoginModalOpen(true)} />

      <main className="flex-1 pt-24 pb-16">
        <div className="container-custom">
          <div className="mb-8">
            <Link
              href="/vehicles"
              className="inline-flex items-center gap-2 text-neutral-600 hover:text-primary-600 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Vehicles</span>
            </Link>
            <h1
              className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {title}
            </h1>
            <p className="text-neutral-600">
              Explore our group buying deals on {title.toLowerCase()}
            </p>
          </div>

          {vehicles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-600">No {title.toLowerCase()} available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} onLoginClick={() => setIsLoginModalOpen(true)} userInfo={userInfo} />
              ))}
            </div>
          )}
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
