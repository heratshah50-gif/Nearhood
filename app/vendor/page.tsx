"use client";

import { useState, useEffect } from "react";
import { Building2, Users, MessageSquare, TrendingUp, Car, LayoutGrid } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getPropertyImage } from "@/lib/property-images";
import dynamic from "next/dynamic";

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Category Data
const CATEGORY_DATA = {
  all: {
    metrics: [
      { label: "Total Listings", value: "13", icon: LayoutGrid, gradient: "from-primary-500 to-primary-600", text: "text-primary-600" },
      { label: "Active Groups", value: "15", icon: Users, gradient: "from-violet-500 to-violet-600", text: "text-violet-600" },
      { label: "New Inquiries", value: "22", icon: MessageSquare, gradient: "from-emerald-500 to-emerald-600", text: "text-emerald-600" },
    ],
    chartData: { new: [25, 45, 60, 80], negotiation: [15, 35, 50, 65], closed: [10, 25, 35, 50] },
    growth: "+15%",
  },
  properties: {
    metrics: [
      { label: "Total Properties", value: "8", icon: Building2, gradient: "from-primary-500 to-primary-600", text: "text-primary-600" },
      { label: "Active Groups", value: "10", icon: Users, gradient: "from-violet-500 to-violet-600", text: "text-violet-600" },
      { label: "New Inquiries", value: "15", icon: MessageSquare, gradient: "from-emerald-500 to-emerald-600", text: "text-emerald-600" },
    ],
    chartData: { new: [20, 40, 55, 75], negotiation: [12, 30, 45, 55], closed: [8, 20, 30, 40] },
    growth: "+12%",
  },
  vehicles: {
    metrics: [
      { label: "Total Vehicles", value: "5", icon: Car, gradient: "from-violet-500 to-violet-600", text: "text-violet-600" },
      { label: "Active Groups", value: "5", icon: Users, gradient: "from-primary-500 to-primary-600", text: "text-primary-600" },
      { label: "New Inquiries", value: "7", icon: MessageSquare, gradient: "from-emerald-500 to-emerald-600", text: "text-emerald-600" },
    ],
    chartData: { new: [15, 30, 45, 60], negotiation: [10, 25, 35, 50], closed: [5, 15, 25, 35] },
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Chart data in ApexCharts format
  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      fontFamily: "inherit",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: CHART_LABELS,
      labels: {
        style: {
          colors: "#6b7280",
          fontSize: "12px",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#9ca3af",
          fontSize: "12px",
        },
        formatter: (value: number) => {
          if (value >= 1000) return `${value / 1000}k`;
          return value.toString();
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      markers: {
        size: 8,
        shape: "circle",
      },
      itemMargin: {
        horizontal: 12,
      },
    },
    colors: ["#10b981", "#3b82f6", "#6ee7b7"],
    grid: {
      borderColor: "#f3f4f6",
      strokeDashArray: 0,
    },
    tooltip: {
      y: {
        formatter: (value: number) => `${value} items`,
      },
    },
  };

  const chartSeries = [
    {
      name: "New Inquiries",
      data: data.chartData.new.map((v) => v * 80), // Scale to realistic numbers
    },
    {
      name: "In Negotiation",
      data: data.chartData.negotiation.map((v) => v * 75),
    },
    {
      name: "Closed Deals",
      data: data.chartData.closed.map((v) => v * 60),
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-neutral-800 text-lg" style={{ fontFamily: "var(--font-display)" }}>
          Group Activity
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
          <TrendingUp className="w-3.5 h-3.5" />
          {data.growth} this week
          </div>
      </div>

      {/* Chart */}
      <div className="h-72">
        {mounted && (
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height="100%"
          />
        )}
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
