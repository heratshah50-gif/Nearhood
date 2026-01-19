"use client";

import { Building2, Users, MessageSquare, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getPropertyImage } from "@/lib/property-images";

const METRICS = [
  { label: "Total Properties", value: "8", icon: Building2, color: "bg-blue-500", bg: "bg-blue-50", text: "text-blue-600" },
  { label: "Active Groups", value: "10", icon: Users, color: "bg-orange-500", bg: "bg-orange-50", text: "text-orange-600" },
  { label: "New Inquiries", value: "15", icon: MessageSquare, color: "bg-green-500", bg: "bg-green-50", text: "text-green-600" },
  { label: "Pending Offers", value: "3", icon: FileText, color: "bg-red-500", bg: "bg-red-50", text: "text-red-600" },
];

const CHART_LABELS = ["12 Jan", "13 Jan", "14 Jan", "15 Jan"];
const LINE_NEW = [0, 30, 45, 55];
const LINE_NEGOTIATION = [0, 20, 35, 40];
const LINE_CLOSED = [0, 10, 15, 20];

function ActivityChart() {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-5">
      <h3 className="font-semibold text-neutral-800 mb-4">Group Activity</h3>
      <div className="h-32 flex items-end gap-2">
        {CHART_LABELS.map((l, i) => (
          <div key={l} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex-1 flex items-end gap-px">
              <div className="flex-1 bg-blue-400 rounded-t" style={{ height: `${LINE_NEW[i]}%` }} />
              <div className="flex-1 bg-orange-400 rounded-t" style={{ height: `${LINE_NEGOTIATION[i]}%` }} />
              <div className="flex-1 bg-green-400 rounded-t" style={{ height: `${LINE_CLOSED[i]}%` }} />
            </div>
            <span className="text-[10px] text-neutral-500">{l}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-3">
        <span className="flex items-center gap-1.5 text-xs"><span className="w-2.5 h-2.5 rounded bg-blue-400" />New Inquiries</span>
        <span className="flex items-center gap-1.5 text-xs"><span className="w-2.5 h-2.5 rounded bg-orange-400" />In Negotiation</span>
        <span className="flex items-center gap-1.5 text-xs"><span className="w-2.5 h-2.5 rounded bg-green-400" />Closed Deals</span>
      </div>
    </div>
  );
}

const LATEST_INQUIRIES = [
  { id: 1, name: "Skyline Heights", location: "Gurgaon", registered: "12 Apr, 2024", status: "Active", image: getPropertyImage(0, "80x60") },
  { id: 2, name: "Green Valley Residency", location: "Pune", registered: "13 Apr, 2024", status: "Active", image: getPropertyImage(1, "80x60") },
  { id: 3, name: "Royal Crysta", location: "Bangalore", registered: "14 Apr, 2024", status: "In Negotiation", image: getPropertyImage(2, "80x60") },
];

const RECENT_OFFERS = [
  { id: 1, name: "Green Valley Residency", location: "Pune", price: "1.65 Lakh", update: "2 hours ago", image: getPropertyImage(1, "80x60") },
  { id: 2, name: "Skyline Heights", location: "Gurgaon", price: "2.10 Lakh", update: "5 hours ago", image: getPropertyImage(0, "80x60") },
  { id: 3, name: "Royal Crysta", location: "Bangalore", price: "1.85 Lakh", update: "1 day ago", image: getPropertyImage(2, "80x60") },
];

export default function VendorDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map(({ label, value, icon: Icon, color, bg, text }) => (
          <div key={label} className={`${bg} rounded-xl border border-neutral-200 p-5 flex items-center gap-4`}>
            <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-white`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-800" style={{ fontFamily: "var(--font-display)" }}>{value}</p>
              <p className={`text-sm font-medium ${text}`}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <ActivityChart />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Group Inquiries */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-neutral-800">Latest Group Inquiries</h3>
            <Link href="/vendor/inquiries" className="text-sm text-[#1e3a5f] hover:underline font-medium">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-2 px-2 text-xs font-semibold text-neutral-700">Property</th>
                  <th className="text-left py-2 px-2 text-xs font-semibold text-neutral-700">Location</th>
                  <th className="text-left py-2 px-2 text-xs font-semibold text-neutral-700">Registered</th>
                  <th className="text-left py-2 px-2 text-xs font-semibold text-neutral-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {LATEST_INQUIRIES.map((item) => (
                  <tr key={item.id} className="border-b border-neutral-100">
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-8 rounded overflow-hidden bg-neutral-100 flex-shrink-0 relative">
                          <Image src={item.image} alt={item.name} fill className="w-full h-full object-cover" sizes="40px" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-neutral-800">{item.name}</p>
                          <p className="text-[10px] text-neutral-500">{item.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-2 text-xs text-neutral-600">{item.location}</td>
                    <td className="py-2 px-2 text-xs text-neutral-600">{item.registered}</td>
                    <td className="py-2 px-2">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        item.status === "Active" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
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
        <div className="bg-white rounded-xl border border-neutral-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-neutral-800">Recent Offers & Deals</h3>
            <Link href="/vendor/offers" className="text-sm text-[#1e3a5f] hover:underline font-medium">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-2 px-2 text-xs font-semibold text-neutral-700">Property</th>
                  <th className="text-left py-2 px-2 text-xs font-semibold text-neutral-700">Offer Price</th>
                  <th className="text-left py-2 px-2 text-xs font-semibold text-neutral-700">Last Update</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_OFFERS.map((item) => (
                  <tr key={item.id} className="border-b border-neutral-100">
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-8 rounded overflow-hidden bg-neutral-100 flex-shrink-0 relative">
                          <Image src={item.image} alt={item.name} fill className="w-full h-full object-cover" sizes="40px" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-neutral-800">{item.name}</p>
                          <p className="text-[10px] text-neutral-500">{item.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-2 text-xs font-medium text-neutral-800">{item.price}</td>
                    <td className="py-2 px-2 text-xs text-neutral-600">{item.update}</td>
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
