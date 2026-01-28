"use client";

import { useState } from "react";
import { Building2, Users, MessageSquare, FileText, TrendingUp, Car, LayoutGrid } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getPropertyImage } from "@/lib/property-images";

// Category Data
const CATEGORY_DATA = {
  all: {
    metrics: [
      { label: "Total Listings", value: "13", icon: LayoutGrid, gradient: "from-primary-500 to-primary-600", text: "text-primary-600" },
      { label: "Active Groups", value: "15", icon: Users, gradient: "from-violet-500 to-violet-600", text: "text-violet-600" },
      { label: "New Inquiries", value: "22", icon: MessageSquare, gradient: "from-emerald-500 to-emerald-600", text: "text-emerald-600" },
      { label: "Pending Offers", value: "5", icon: FileText, gradient: "from-amber-500 to-amber-600", text: "text-amber-600" },
    ],
    chartData: { new: [0, 35, 50, 65], negotiation: [0, 25, 40, 50], closed: [0, 15, 20, 30] },
    growth: "+15%",
  },
  properties: {
    metrics: [
      { label: "Total Properties", value: "8", icon: Building2, gradient: "from-primary-500 to-primary-600", text: "text-primary-600" },
      { label: "Active Groups", value: "10", icon: Users, gradient: "from-violet-500 to-violet-600", text: "text-violet-600" },
      { label: "New Inquiries", value: "15", icon: MessageSquare, gradient: "from-emerald-500 to-emerald-600", text: "text-emerald-600" },
      { label: "Pending Offers", value: "3", icon: FileText, gradient: "from-amber-500 to-amber-600", text: "text-amber-600" },
    ],
    chartData: { new: [0, 30, 45, 55], negotiation: [0, 20, 35, 40], closed: [0, 10, 15, 20] },
    growth: "+12%",
  },
  vehicles: {
    metrics: [
      { label: "Total Vehicles", value: "5", icon: Car, gradient: "from-violet-500 to-violet-600", text: "text-violet-600" },
      { label: "Active Groups", value: "5", icon: Users, gradient: "from-primary-500 to-primary-600", text: "text-primary-600" },
      { label: "New Inquiries", value: "7", icon: MessageSquare, gradient: "from-emerald-500 to-emerald-600", text: "text-emerald-600" },
      { label: "Pending Offers", value: "2", icon: FileText, gradient: "from-amber-500 to-amber-600", text: "text-amber-600" },
    ],
    chartData: { new: [0, 20, 35, 45], negotiation: [0, 15, 25, 35], closed: [0, 5, 10, 15] },
    growth: "+18%",
  },
};

const CHART_LABELS = ["12 Jan", "13 Jan", "14 Jan", "15 Jan"];

// Vehicle Images
const VEHICLE_IMAGES = [
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=200&h=150&fit=crop",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&h=150&fit=crop",
  "https://images.unsplash.com/photo-1542362567-b07e54358753?w=200&h=150&fit=crop",
];

// Inquiries Data by Category
const INQUIRIES_DATA = {
  all: [
    { id: 1, name: "Skyline Heights", type: "Property", location: "Gurgaon", registered: "12 Apr, 2024", status: "Active", image: getPropertyImage(0, "80x60") },
    { id: 2, name: "Honda City 2024", type: "Vehicle", location: "Ahmedabad", registered: "13 Apr, 2024", status: "Active", image: VEHICLE_IMAGES[0] },
    { id: 3, name: "Royal Crysta", type: "Property", location: "Bangalore", registered: "14 Apr, 2024", status: "In Negotiation", image: getPropertyImage(2, "80x60") },
  ],
  properties: [
    { id: 1, name: "Skyline Heights", type: "Property", location: "Gurgaon", registered: "12 Apr, 2024", status: "Active", image: getPropertyImage(0, "80x60") },
    { id: 2, name: "Green Valley Residency", type: "Property", location: "Pune", registered: "13 Apr, 2024", status: "Active", image: getPropertyImage(1, "80x60") },
    { id: 3, name: "Royal Crysta", type: "Property", location: "Bangalore", registered: "14 Apr, 2024", status: "In Negotiation", image: getPropertyImage(2, "80x60") },
  ],
  vehicles: [
    { id: 1, name: "Honda City 2024", type: "Vehicle", location: "Ahmedabad", registered: "12 Apr, 2024", status: "Active", image: VEHICLE_IMAGES[0] },
    { id: 2, name: "Royal Enfield Classic", type: "Vehicle", location: "Mumbai", registered: "13 Apr, 2024", status: "Active", image: VEHICLE_IMAGES[1] },
    { id: 3, name: "Tata Nexon EV", type: "Vehicle", location: "Pune", registered: "14 Apr, 2024", status: "In Negotiation", image: VEHICLE_IMAGES[2] },
  ],
};

// Offers Data by Category
const OFFERS_DATA = {
  all: [
    { id: 1, name: "Green Valley Residency", type: "Property", location: "Pune", price: "1.65 Lakh", update: "2 hours ago", image: getPropertyImage(1, "80x60") },
    { id: 2, name: "Honda City 2024", type: "Vehicle", location: "Ahmedabad", price: "12.5 Lakh", update: "3 hours ago", image: VEHICLE_IMAGES[0] },
    { id: 3, name: "Royal Crysta", type: "Property", location: "Bangalore", price: "1.85 Lakh", update: "1 day ago", image: getPropertyImage(2, "80x60") },
  ],
  properties: [
    { id: 1, name: "Green Valley Residency", type: "Property", location: "Pune", price: "1.65 Lakh", update: "2 hours ago", image: getPropertyImage(1, "80x60") },
    { id: 2, name: "Skyline Heights", type: "Property", location: "Gurgaon", price: "2.10 Lakh", update: "5 hours ago", image: getPropertyImage(0, "80x60") },
    { id: 3, name: "Royal Crysta", type: "Property", location: "Bangalore", price: "1.85 Lakh", update: "1 day ago", image: getPropertyImage(2, "80x60") },
  ],
  vehicles: [
    { id: 1, name: "Honda City 2024", type: "Vehicle", location: "Ahmedabad", price: "12.5 Lakh", update: "2 hours ago", image: VEHICLE_IMAGES[0] },
    { id: 2, name: "Royal Enfield Classic", type: "Vehicle", location: "Mumbai", price: "1.95 Lakh", update: "4 hours ago", image: VEHICLE_IMAGES[1] },
    { id: 3, name: "Tata Nexon EV", type: "Vehicle", location: "Pune", price: "14.2 Lakh", update: "1 day ago", image: VEHICLE_IMAGES[2] },
  ],
};

type CategoryType = "all" | "properties" | "vehicles";

function ActivityChart({ category }: { category: CategoryType }) {
  const data = CATEGORY_DATA[category];
  
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-neutral-800" style={{ fontFamily: "var(--font-display)" }}>Group Activity</h3>
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
          <TrendingUp className="w-3.5 h-3.5" />
          {data.growth} this week
        </div>
      </div>
      <div className="h-36 flex items-end gap-3">
        {CHART_LABELS.map((l, i) => (
          <div key={l} className="flex-1 flex flex-col items-center gap-1.5">
            <div className="w-full flex-1 flex items-end gap-1">
              <div className="flex-1 bg-gradient-to-t from-primary-500 to-primary-400 rounded-t-md" style={{ height: `${data.chartData.new[i]}%` }} />
              <div className="flex-1 bg-gradient-to-t from-violet-500 to-violet-400 rounded-t-md" style={{ height: `${data.chartData.negotiation[i]}%` }} />
              <div className="flex-1 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-md" style={{ height: `${data.chartData.closed[i]}%` }} />
            </div>
            <span className="text-[11px] text-neutral-500 font-medium">{l}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-5 mt-4 pt-4 border-t border-neutral-100">
        <span className="flex items-center gap-2 text-xs font-medium text-neutral-600"><span className="w-3 h-3 rounded-sm bg-gradient-to-r from-primary-500 to-primary-400" />New Inquiries</span>
        <span className="flex items-center gap-2 text-xs font-medium text-neutral-600"><span className="w-3 h-3 rounded-sm bg-gradient-to-r from-violet-500 to-violet-400" />In Negotiation</span>
        <span className="flex items-center gap-2 text-xs font-medium text-neutral-600"><span className="w-3 h-3 rounded-sm bg-gradient-to-r from-emerald-500 to-emerald-400" />Closed Deals</span>
      </div>
    </div>
  );
}

export default function VendorDashboardPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("all");

  const currentMetrics = CATEGORY_DATA[activeCategory].metrics;
  const currentInquiries = INQUIRIES_DATA[activeCategory];
  const currentOffers = OFFERS_DATA[activeCategory];

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 bg-white rounded-xl border border-neutral-200 p-1.5 w-fit shadow-sm">
        <button
          onClick={() => setActiveCategory("all")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeCategory === "all"
              ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md"
              : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          All Categories
        </button>
        <button
          onClick={() => setActiveCategory("properties")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeCategory === "properties"
              ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md"
              : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          <Building2 className="w-4 h-4" />
          Properties
        </button>
        <button
          onClick={() => setActiveCategory("vehicles")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeCategory === "vehicles"
              ? "bg-gradient-to-r from-violet-500 to-violet-600 text-white shadow-md"
              : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          <Car className="w-4 h-4" />
          Vehicles
        </button>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentMetrics.map(({ label, value, icon: Icon, gradient, text }) => (
          <div key={label} className="bg-white rounded-2xl border border-neutral-200 p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-3xl font-bold text-neutral-800" style={{ fontFamily: "var(--font-display)" }}>{value}</p>
              <p className={`text-sm font-medium ${text}`}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <ActivityChart category={activeCategory} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Group Inquiries */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-neutral-800" style={{ fontFamily: "var(--font-display)" }}>
              Latest Group Inquiries
              {activeCategory !== "all" && (
                <span className="ml-2 text-xs font-normal text-neutral-500">
                  ({activeCategory === "properties" ? "Properties" : "Vehicles"})
                </span>
              )}
            </h3>
            <Link href="/vendor/inquiries" className="text-sm text-primary-600 hover:text-primary-700 font-semibold">View All →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-2.5 px-2 text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                    {activeCategory === "all" ? "Listing" : activeCategory === "properties" ? "Property" : "Vehicle"}
                  </th>
                  <th className="text-left py-2.5 px-2 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Location</th>
                  <th className="text-left py-2.5 px-2 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Registered</th>
                  <th className="text-left py-2.5 px-2 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentInquiries.map((item) => (
                  <tr key={item.id} className="border-b border-neutral-100 hover:bg-primary-50/30 transition-colors">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-11 h-9 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0 relative">
                          <Image src={item.image} alt={item.name} fill className="w-full h-full object-cover" sizes="44px" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-neutral-800">{item.name}</p>
                          <p className="text-[11px] text-neutral-500">
                            {activeCategory === "all" && (
                              <span className={`inline-flex items-center gap-1 ${item.type === "Property" ? "text-primary-600" : "text-violet-600"}`}>
                                {item.type === "Property" ? <Building2 className="w-3 h-3" /> : <Car className="w-3 h-3" />}
                                {item.type}
                              </span>
                            )}
                            {activeCategory !== "all" && item.location}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-sm text-neutral-600">{item.location}</td>
                    <td className="py-3 px-2 text-sm text-neutral-600">{item.registered}</td>
                    <td className="py-3 px-2">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        item.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-violet-100 text-violet-700"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Offers & Deals */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-neutral-800" style={{ fontFamily: "var(--font-display)" }}>
              Recent Offers & Deals
              {activeCategory !== "all" && (
                <span className="ml-2 text-xs font-normal text-neutral-500">
                  ({activeCategory === "properties" ? "Properties" : "Vehicles"})
                </span>
              )}
            </h3>
            <Link href="/vendor/offers" className="text-sm text-primary-600 hover:text-primary-700 font-semibold">View All →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-2.5 px-2 text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                    {activeCategory === "all" ? "Listing" : activeCategory === "properties" ? "Property" : "Vehicle"}
                  </th>
                  <th className="text-left py-2.5 px-2 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Offer Price</th>
                  <th className="text-left py-2.5 px-2 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Last Update</th>
                </tr>
              </thead>
              <tbody>
                {currentOffers.map((item) => (
                  <tr key={item.id} className="border-b border-neutral-100 hover:bg-primary-50/30 transition-colors">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-11 h-9 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0 relative">
                          <Image src={item.image} alt={item.name} fill className="w-full h-full object-cover" sizes="44px" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-neutral-800">{item.name}</p>
                          <p className="text-[11px] text-neutral-500">
                            {activeCategory === "all" && (
                              <span className={`inline-flex items-center gap-1 ${item.type === "Property" ? "text-primary-600" : "text-violet-600"}`}>
                                {item.type === "Property" ? <Building2 className="w-3 h-3" /> : <Car className="w-3 h-3" />}
                                {item.type}
                              </span>
                            )}
                            {activeCategory !== "all" && item.location}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-sm font-semibold text-primary-600">{item.price}</td>
                    <td className="py-3 px-2 text-sm text-neutral-600">{item.update}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
