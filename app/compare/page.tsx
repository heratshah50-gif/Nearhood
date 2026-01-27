"use client";

import { useState, useEffect } from "react";
import UserPanel from "@/components/layout/UserPanel";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoginModal from "@/components/auth/LoginModal";
import { GitCompare, X, Building2, Car, MapPin, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface UserInfo {
  phoneNumber: string;
  name: string;
}

export default function ComparePage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [comparedItems, setComparedItems] = useState<any[]>([]);

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

  // Load compared items from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("nearhood_compared_items");
      if (stored) {
        try {
          setComparedItems(JSON.parse(stored));
        } catch (e) {
          setComparedItems([]);
        }
      }
    }
  }, []);

  const handleRemoveItem = (id: string) => {
    const updated = comparedItems.filter((item) => item.id !== id);
    setComparedItems(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("nearhood_compared_items", JSON.stringify(updated));
    }
  };

  if (!userInfo) {
    return (
      <>
        <Header onLoginClick={() => setIsLoginModalOpen(true)} />
        <div className="min-h-screen flex items-center justify-center pt-32 pb-16">
          <div className="text-center">
            <p className="text-lg text-neutral-600 mb-4">
              Please log in to view your comparisons
            </p>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
        <Footer />
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onSuccess={() => {
            setIsLoginModalOpen(false);
            window.location.reload();
          }}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header onLoginClick={() => setIsLoginModalOpen(true)} hideNavigation={true} />
      <div className="pt-24">
        <UserPanel>
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                  Compare Items
                </h1>
                <p className="text-neutral-600">
                  Compare properties and vehicles side by side to make the best decision
                </p>
              </div>
            </div>
          </div>

          {/* Comparison Content */}
          {comparedItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-12 text-center"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-neutral-100 flex items-center justify-center">
                <GitCompare className="w-12 h-12 text-neutral-400" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-3">
                No Items to Compare
              </h2>
              <p className="text-neutral-600 mb-8 max-w-md mx-auto">
                It looks like you haven't added any items to compare yet. Start comparing properties or vehicles to see detailed comparisons.
              </p>
              <div className="flex gap-4 justify-center">
                <a
                  href="/properties"
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center gap-2"
                >
                  <Building2 className="w-5 h-5" />
                  Browse Properties
                </a>
                <a
                  href="/vehicles"
                  className="px-6 py-3 bg-neutral-100 text-neutral-700 rounded-lg font-semibold hover:bg-neutral-200 transition-colors inline-flex items-center gap-2"
                >
                  <Car className="w-5 h-5" />
                  Browse Vehicles
                </a>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
              {/* Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-50 border-b border-neutral-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">
                        Item
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">
                        Location
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-700">
                        Discount
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-neutral-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {comparedItems.map((item, index) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="hover:bg-neutral-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-lg bg-neutral-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                              {item.image ? (
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  width={80}
                                  height={80}
                                  className="w-full h-full object-cover"
                                  unoptimized={item.image.startsWith("http")}
                                />
                              ) : (
                                <Building2 className="w-8 h-8 text-neutral-400" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-neutral-900 mb-1">
                                {item.title}
                              </h3>
                              <p className="text-sm text-neutral-500 line-clamp-2">
                                {item.description || "No description available"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
                            {item.type === "property" ? (
                              <>
                                <Building2 className="w-3 h-3" />
                                Property
                              </>
                            ) : (
                              <>
                                <Car className="w-3 h-3" />
                                Vehicle
                              </>
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-neutral-700">
                            <MapPin className="w-4 h-4 text-neutral-400" />
                            {item.location || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-sm font-semibold text-neutral-900">
                            <span>₹</span>
                            {item.price ? item.price.toLocaleString("en-IN") : "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {item.discount ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700">
                              <TrendingUp className="w-3 h-3" />
                              {item.discount}% OFF
                            </span>
                          ) : (
                            <span className="text-sm text-neutral-400">N/A</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-2 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Remove from comparison"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Comparison Summary */}
              {comparedItems.length > 1 && (
                <div className="border-t border-neutral-200 p-6 bg-neutral-50">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                    Comparison Summary
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-neutral-200">
                      <p className="text-sm text-neutral-500 mb-1">Total Items</p>
                      <p className="text-2xl font-bold text-neutral-900">
                        {comparedItems.length}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-neutral-200">
                      <p className="text-sm text-neutral-500 mb-1">Average Price</p>
                      <p className="text-2xl font-bold text-neutral-900">
                        ₹{Math.round(
                          comparedItems.reduce((sum, item) => sum + (item.price || 0), 0) /
                            comparedItems.length
                        ).toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-neutral-200">
                      <p className="text-sm text-neutral-500 mb-1">Best Discount</p>
                      <p className="text-2xl font-bold text-green-600">
                        {Math.max(
                          ...comparedItems.map((item) => item.discount || 0)
                        )}% OFF
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        </UserPanel>
      </div>
      <Footer />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={() => {
          setIsLoginModalOpen(false);
          window.location.reload();
        }}
      />
    </div>
  );
}
