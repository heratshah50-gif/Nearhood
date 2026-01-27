"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Car,
  Bike,
  MapPin,
  Heart,
  Share2,
  ArrowLeft,
  Users,
  Phone,
  CheckCircle2,
  Clock,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoginModal from "@/components/auth/LoginModal";
import {
  ALL_PRODUCTS,
  isVehicleProduct,
  VehicleProduct,
  getProductSlug,
} from "@/lib/products-data";

interface VehicleDetailPageProps {
  params: {
    subcategory: string;
    slug: string;
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

function findVehicleBySlug(
  subcategory: string,
  slug: string
): VehicleProduct | undefined {
  const actualSubcategory = subcategory === "cars" ? "car" : subcategory === "bikes" ? "bike" : subcategory;
  const vehicle = ALL_PRODUCTS.find(
    (p) =>
      isVehicleProduct(p) &&
      p.subcategory === actualSubcategory &&
      getProductSlug(p.name) === slug
  );
  return vehicle && isVehicleProduct(vehicle) ? vehicle : undefined;
}

export default function VehicleDetailPage({ params }: VehicleDetailPageProps) {
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

  const vehicle = findVehicleBySlug(params.subcategory, params.slug);

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col">
        <Header onLoginClick={() => setIsLoginModalOpen(true)} />
        <main className="flex-1 pt-24 pb-16">
          <div className="container-custom text-center">
            <h1 className="text-2xl font-bold text-neutral-900 mb-4">Vehicle not found</h1>
            <Link href="/vehicles" className="text-primary-600 hover:underline">
              Back to Vehicles
            </Link>
          </div>
        </main>
        <Footer hideSubscribe />
      </div>
    );
  }

  const progressPercent = ((vehicle.groupSize - vehicle.spotsLeft) / vehicle.groupSize) * 100;
  const IconComponent = vehicle.subcategory === "car" ? Car : Bike;

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Header onLoginClick={() => setIsLoginModalOpen(true)} />

      <main className="flex-1 pt-24 pb-16">
        <div className="container-custom">
          {/* Back Button */}
          <Link
            href={`/vehicles/${params.subcategory}`}
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-primary-600 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {vehicle.subcategory === "car" ? "Cars" : "Bikes"}</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200">
              {vehicle.image ? (
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <IconComponent className="w-32 h-32 text-primary-500" />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {vehicle.featured && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-lg">
                    Featured
                  </div>
                </div>
              )}

              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    isLiked
                      ? "bg-red-500 text-white"
                      : "bg-white/90 text-neutral-600 hover:bg-white"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                </button>
                <button className="w-10 h-10 rounded-lg bg-white/90 text-neutral-600 hover:bg-white flex items-center justify-center">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Details Section */}
            <div>
              <h1
                className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {vehicle.brand} {vehicle.model} {vehicle.year}
              </h1>
              <div className="flex items-center gap-2 text-neutral-500 mb-6">
                <MapPin className="w-4 h-4" />
                <span>{vehicle.location}, {vehicle.city}</span>
              </div>

              {/* Vehicle Specifications */}
              <div className="bg-white rounded-xl p-6 mb-6 border border-neutral-200">
                <h2 className="text-xl font-bold text-neutral-900 mb-4">Specifications</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">Brand</p>
                    <p className="font-semibold text-neutral-900">{vehicle.brand}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">Model</p>
                    <p className="font-semibold text-neutral-900">{vehicle.model}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">Year</p>
                    <p className="font-semibold text-neutral-900">{vehicle.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">Fuel Type</p>
                    <p className="font-semibold text-neutral-900 capitalize">{vehicle.fuelType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">Transmission</p>
                    <p className="font-semibold text-neutral-900 capitalize">{vehicle.transmission}</p>
                  </div>
                  {vehicle.mileage && (
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">Mileage</p>
                      <p className="font-semibold text-neutral-900">{vehicle.mileage}</p>
                    </div>
                  )}
                  {vehicle.color && (
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">Color</p>
                      <p className="font-semibold text-neutral-900">{vehicle.color}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Group Status */}
              <div className="bg-primary-50 rounded-xl p-6 mb-6 border border-primary-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary-600" />
                    <span className="text-lg font-semibold text-neutral-900">
                      {vehicle.groupSize - vehicle.spotsLeft}/{vehicle.groupSize} joined
                    </span>
                  </div>
                  <span className={`text-sm font-semibold ${vehicle.spotsLeft <= 3 ? "text-red-500" : "text-green-600"}`}>
                    {vehicle.spotsLeft} spots left
                  </span>
                </div>
                <div className="h-3 bg-primary-100 rounded-full overflow-hidden mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-gradient-to-r from-primary-400 to-primary-500 rounded-full"
                  />
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Clock className="w-4 h-4" />
                  <span>Closes on <span className="font-semibold text-neutral-900">{vehicle.deadline}</span></span>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-white rounded-xl p-6 mb-6 border border-neutral-200">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">Group Price</p>
                    <p className="text-3xl font-bold text-neutral-900">
                      {formatPrice(vehicle.groupPrice)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg text-neutral-400 line-through">
                      {formatPrice(vehicle.marketPrice)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-green-100">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-600">
                      Save {vehicle.savingsPercent}%
                    </span>
                  </div>
                  <span className="text-sm text-neutral-500">
                    ≈ {formatPrice(vehicle.marketPrice - vehicle.groupPrice)} savings
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3">
                <button 
                  onClick={handleJoinGroup}
                  className="flex-1 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all flex items-center justify-center gap-2"
                >
                  Join Group
                </button>
                <button className="w-14 h-14 rounded-xl border-2 border-primary-200 text-primary-600 hover:bg-primary-50 transition-colors flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
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
