"use client";

import Image from "next/image";
import { getPropertyImage } from "@/lib/property-images";

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
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <h3 className="font-semibold text-neutral-800 mb-4">Ongoing Offers</h3>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-24 h-16 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
            <Image src={ONGOING_OFFER.image} alt={ONGOING_OFFER.name} width={96} height={64} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <p className="font-medium text-neutral-800">{ONGOING_OFFER.name}</p>
            <p className="text-sm text-neutral-500">{ONGOING_OFFER.location}</p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
              View Negotiations
            </button>
            <button className="px-5 py-2.5 bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white font-semibold rounded-lg transition-colors">
              Submit Counter Offers
            </button>
          </div>
        </div>
      </div>

      {/* Recent Deals */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="p-5 border-b border-neutral-200">
          <h3 className="font-semibold text-neutral-800">Recent Deals</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Property</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Location</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Offer Price</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Key Features</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_DEALS.map((d) => (
                <tr key={d.id} className="border-b border-neutral-100 hover:bg-neutral-50/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-10 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0 relative">
                        <Image src={d.image} alt={d.name} fill className="w-full h-full object-cover" sizes="56px" />
                      </div>
                      <div>
                        <p className="font-medium text-neutral-800">{d.name}</p>
                        <p className="text-xs text-neutral-500">{d.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-neutral-600">{d.location}</td>
                  <td className="py-3 px-4 text-sm font-medium text-neutral-800">{d.price}</td>
                  <td className="py-3 px-4 text-sm text-neutral-600">{d.features}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                      d.status === "Closed Deal" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    }`}>
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-neutral-200 flex items-center justify-between text-sm text-neutral-600">
          <span>Showing 4 of 8</span>
          <button className="px-4 py-1.5 border border-neutral-300 rounded-lg hover:bg-neutral-50">Next &gt;</button>
        </div>
      </div>
    </div>
  );
}
