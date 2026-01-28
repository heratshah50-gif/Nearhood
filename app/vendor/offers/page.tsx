"use client";

import Image from "next/image";
import { getPropertyImage } from "@/lib/property-images";
import { Sparkles, Eye, Send } from "lucide-react";

const ONGOING_OFFER = {
  name: "Green Valley Residency",
  location: "Pune",
  image: getPropertyImage(1, "120x80"),
};

const RECENT_DEALS = [
  { id: 1, name: "Skyline Heights", location: "Gurgaon", price: "356 Lakh per unit", features: "Registered Pipelines", status: "Closed Deal", image: getPropertyImage(0, "80x60") },
  { id: 2, name: "Zenith Towers", location: "Bangalore", price: "526 Lakh per unit", features: "Deal negotiated 15 Lakh", status: "Finalized", image: getPropertyImage(4, "80x60") },
  { id: 3, name: "Urban Greens", location: "Noida", price: "285 Lakh per unit", features: "Payment completed", status: "Closed Deal", image: getPropertyImage(3, "80x60") },
  { id: 4, name: "Royal Crysta", location: "Mumbai", price: "412 Lakh per unit", features: "Documentation pending", status: "Finalized", image: getPropertyImage(2, "80x60") },
];

export default function OffersDealsPage() {
  return (
    <div className="space-y-6">
      {/* Ongoing Offers Section */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 shadow-xl shadow-primary-500/20">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-white" />
          <h3 className="font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>Ongoing Offers</h3>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="w-24 h-16 rounded-xl overflow-hidden bg-white/20 flex-shrink-0">
              <Image src={ONGOING_OFFER.image} alt={ONGOING_OFFER.name} width={96} height={64} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-[200px]">
              <p className="font-semibold text-white text-lg">{ONGOING_OFFER.name}</p>
              <p className="text-sm text-white/80">{ONGOING_OFFER.location}</p>
            </div>
            <div className="flex gap-3">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl text-sm font-medium text-white transition-all">
                <Eye className="w-4 h-4" />
                View Negotiations
              </button>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-primary-600 font-semibold rounded-xl hover:shadow-lg transition-all">
                <Send className="w-4 h-4" />
                Submit Counter Offers
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Deals */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-neutral-200 bg-neutral-50/60">
          <h3 className="font-semibold text-neutral-800" style={{ fontFamily: "var(--font-display)" }}>Recent Deals</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/50">
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Property</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Location</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Offer Price</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Key Features</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_DEALS.map((d) => (
                <tr key={d.id} className="border-b border-neutral-100 hover:bg-primary-50/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-10 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0 relative">
                        <Image src={d.image} alt={d.name} fill className="w-full h-full object-cover" sizes="56px" />
                      </div>
                      <div>
                        <p className="font-medium text-neutral-800">{d.name}</p>
                        <p className="text-xs text-neutral-500">{d.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-sm text-neutral-600">{d.location}</td>
                  <td className="py-3.5 px-4 text-sm font-semibold text-primary-600">{d.price}</td>
                  <td className="py-3.5 px-4 text-sm text-neutral-600">{d.features}</td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                      d.status === "Closed Deal" ? "bg-emerald-100 text-emerald-700" : "bg-primary-100 text-primary-700"
                    }`}>
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-neutral-200 flex items-center justify-between text-sm text-neutral-600 bg-neutral-50/60">
          <span>Showing 4 of 8</span>
          <button className="px-4 py-1.5 rounded-lg border border-neutral-300 hover:bg-white hover:border-primary-300 transition-colors">Next →</button>
        </div>
      </div>
    </div>
  );
}
