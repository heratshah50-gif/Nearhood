"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Plus, X, ArrowLeft, Building2, MapPin, Home, Users, IndianRupee, Calendar, FileText, Edit3, Save, Trash2, Star, LayoutGrid, Factory, Ruler } from "lucide-react";
import ThemedSelect from "@/components/vendor/ThemedSelect";
import { getPropertyImage } from "@/lib/property-images";
import { getAndClearNewProperty } from "@/lib/vendor-properties-store";
import { PROPERTY_AMENITIES } from "@/lib/property-amenities";
import { ACCOMMODATION_TYPES } from "@/lib/property-accommodation-types";

type PropertyRow = {
  id: number;
  name: string;
  sub: string;
  location: string;
  type: string;
  units: string;
  groups: string;
  status: string;
  image: string;
  // Extended details
  address?: string;
  price?: string;
  area?: string;
  superArea?: string;
  accommodationTypes?: string[];
  bedrooms?: string;
  bathrooms?: string;
  amenities?: string[];
  description?: string;
  createdAt?: string;
  // Required fields from property card & Property Details
  images?: string[];
  groupSize?: string;
  targetPrice?: string;
  developerPrice?: string;
  deadline?: string;
  highlights?: string;
  layoutPlan?: string;
  layoutPlanImage?: string;
  brochure?: string;
  locationDetails?: string;
  aboutDeveloper?: string;
  specifications?: string;
};

const INITIAL_ROWS: PropertyRow[] = [
  { 
    id: 1, name: "Skyline Heights", sub: "Apartments", location: "Gurgaon", type: "Apartments", 
    units: "25", groups: "3", status: "Active", image: getPropertyImage(0, "80x60"),
    address: "Sector 45, Gurgaon, Haryana", price: "85,00,000", area: "1250", superArea: "1,245 - 2,890", bedrooms: "3", bathrooms: "2",
    accommodationTypes: ["2 BHK", "3 BHK", "4 BHK"], amenities: ["Swimming Pool", "Gym", "Parking", "Security"], description: "Premium apartments with modern amenities",
    createdAt: "Jan 15, 2024"
  },
  { 
    id: 2, name: "Green Valley Residency", sub: "Luxury Apartments", location: "Pune", type: "Apartments", 
    units: "20", groups: "2", status: "Active", image: getPropertyImage(1, "80x60"),
    address: "Baner Road, Pune, Maharashtra", price: "72,00,000", area: "1100", superArea: "1,100 - 1,800", bedrooms: "2", bathrooms: "2",
    accommodationTypes: ["2 BHK", "3 BHK"], amenities: ["Garden", "Clubhouse", "Parking"], description: "Luxury living in the heart of Pune",
    createdAt: "Feb 10, 2024"
  },
  { 
    id: 3, name: "Royal Crysta", sub: "Premium Flats", location: "Noida", type: "Apartments", 
    units: "18", groups: "4", status: "Active", image: getPropertyImage(2, "80x60"),
    address: "Sector 150, Noida, UP", price: "95,00,000", area: "1500", superArea: "1,500 - 2,200", bedrooms: "3", bathrooms: "3",
    accommodationTypes: ["3 BHK", "4 BHK"], amenities: ["Rooftop Garden", "Gym", "Kids Play Area", "Security"], description: "Premium flats with world-class amenities",
    createdAt: "Mar 5, 2024"
  },
  { 
    id: 4, name: "Urban Greens", sub: "Apartments", location: "Bangalore", type: "Apartments", 
    units: "0", groups: "0", status: "Sold Out", image: getPropertyImage(3, "80x60"),
    address: "Whitefield, Bangalore, Karnataka", price: "68,00,000", area: "980", superArea: "650 - 1,450", bedrooms: "2", bathrooms: "2",
    accommodationTypes: ["1 BHK", "2 BHK", "3 BHK"], amenities: ["Parking", "Security"], description: "Affordable apartments in IT hub",
    createdAt: "Dec 20, 2023"
  },
  { 
    id: 5, name: "Zenith Towers", sub: "Luxury Flats", location: "Mumbai", type: "Apartments", 
    units: "30", groups: "5", status: "Active", image: getPropertyImage(4, "80x60"),
    address: "Powai, Mumbai, Maharashtra", price: "1,50,00,000", area: "1800", superArea: "1,800 - 3,200", bedrooms: "4", bathrooms: "3",
    accommodationTypes: ["4 BHK", "5 BHK", "Penthouse"], amenities: ["Infinity Pool", "Gym", "Spa", "Concierge", "Parking"], description: "Ultra-luxury living in Mumbai",
    createdAt: "Apr 1, 2024"
  },
];

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  "Sold Out": "bg-red-100 text-red-700",
  Upcoming: "bg-amber-100 text-amber-700",
};

export default function PropertyListingsPage() {
  const [rows, setRows] = useState<PropertyRow[]>(INITIAL_ROWS);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  // View/Edit modal state
  const [selectedProperty, setSelectedProperty] = useState<PropertyRow | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<PropertyRow | null>(null);

  const handleViewProperty = (property: PropertyRow) => {
    setSelectedProperty(property);
    setEditForm({ ...property });
    setIsViewOpen(true);
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    if (!editForm) return;
    setRows(rows.map(r => r.id === editForm.id ? editForm : r));
    setSelectedProperty(editForm);
    setIsEditing(false);
  };

  const handleDeleteProperty = (id: number) => {
    if (confirm("Are you sure you want to delete this property?")) {
      setRows(rows.filter(r => r.id !== id));
      setIsViewOpen(false);
      setSelectedProperty(null);
    }
  };

  // Merge new property from add page (stored in sessionStorage)
  useEffect(() => {
    const newProp = getAndClearNewProperty();
    if (newProp) {
      setRows((prev) => [{ ...newProp } as PropertyRow, ...prev]);
    }
  }, []);

  const filtered = rows.filter((r) => {
    const matchesSearch =
      !search ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.location.toLowerCase().includes(search.toLowerCase());
    const matchesType = !type || r.type === type;
    const matchesStatus = !status || r.status === status;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-5 relative">
      {/* Back Link & Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            href="/vendor/listings" 
            className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600 hover:bg-primary-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-bold text-neutral-800" style={{ fontFamily: "var(--font-display)" }}>
                Property Listings
              </h2>
            </div>
            <p className="text-sm text-neutral-500">Manage your real estate properties</p>
          </div>
        </div>
        <Link
          href="/vendor/listings/properties/add"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold shadow-lg shadow-primary-500/25 hover:shadow-xl hover:from-primary-600 hover:to-primary-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Property</span>
        </Link>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by property or project name"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-neutral-200 bg-white text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400 transition-all"
          />
        </div>
        <ThemedSelect
          value={type}
          onChange={setType}
          placeholder="All Types"
          options={[
            { value: "", label: "All Types" },
            { value: "Apartments", label: "Apartments" },
            { value: "Villas", label: "Villas" },
            { value: "Plots", label: "Plots" },
          ]}
          className="min-w-[130px]"
        />
        <ThemedSelect
          value={status}
          onChange={setStatus}
          placeholder="All Status"
          options={[
            { value: "", label: "All Status" },
            { value: "Active", label: "Active" },
            { value: "Sold Out", label: "Sold Out" },
            { value: "Upcoming", label: "Upcoming" },
          ]}
          className="min-w-[130px]"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/80">
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Property</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Location</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Type</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Units</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Groups</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Status</th>
                <th className="text-right py-3.5 px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-neutral-100 hover:bg-primary-50/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-10 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0 relative">
                        <Image src={r.image} alt={r.name} fill className="w-full h-full object-cover" sizes="56px" />
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900 text-sm" style={{ fontFamily: "var(--font-display)" }}>
                          {r.name}
                        </p>
                        <p className="text-xs text-neutral-500">{r.sub}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-sm text-neutral-600">{r.location}</td>
                  <td className="py-3.5 px-4 text-sm text-neutral-600">{r.type}</td>
                  <td className="py-3.5 px-4 text-sm font-semibold text-primary-600">{r.units}</td>
                  <td className="py-3.5 px-4 text-sm text-neutral-600">{r.groups}</td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${STATUS_STYLES[r.status] || "bg-neutral-100 text-neutral-600"}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button 
                      onClick={() => handleViewProperty(r)}
                      className="text-sm text-primary-600 hover:text-primary-700 font-semibold"
                    >
                      View →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-neutral-200 flex items-center justify-between text-sm text-neutral-600 bg-neutral-50/60">
          <span>
            Showing {filtered.length} of {rows.length} properties
          </span>
          <button className="px-4 py-1.5 rounded-lg border border-neutral-300 hover:bg-white hover:border-primary-300 transition-colors">Next →</button>
        </div>
      </div>

      {/* View/Edit Property Modal */}
      {isViewOpen && selectedProperty && editForm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md overflow-y-auto py-8">
          <div className="w-full max-w-3xl rounded-2xl shadow-2xl relative mx-4 bg-gradient-to-r from-primary-500 to-primary-600">
            {/* Modal Header */}
            <div className="px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-12 rounded-lg overflow-hidden bg-white/20 flex-shrink-0">
                    <Image src={selectedProperty.image} alt={selectedProperty.name} width={64} height={48} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/80 mb-1">Property Details</p>
                    <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                      {selectedProperty.name}
                    </h2>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSaveEdit}
                      className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white hover:bg-emerald-600 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => setIsViewOpen(false)}
                    className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[70vh] overflow-y-auto bg-white">
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-6">
                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${STATUS_STYLES[selectedProperty.status]}`}>
                  {selectedProperty.status}
                </span>
                <span className="text-sm text-neutral-500">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Created: {selectedProperty.createdAt || "N/A"}
                </span>
              </div>

              {/* Basic Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-500 mb-1.5">
                    <Building2 className="w-4 h-4" />
                    Property Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400"
                    />
                  ) : (
                    <p className="text-neutral-800 font-medium">{selectedProperty.name}</p>
                  )}
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-500 mb-1.5">
                    <Home className="w-4 h-4" />
                    Property Type
                  </label>
                  {isEditing ? (
                    <div className="relative">
                      <select
                        value={editForm.type}
                        onChange={(e) => setEditForm({ ...editForm, type: e.target.value, sub: e.target.value })}
                        className="w-full appearance-none px-4 py-2.5 pr-10 rounded-xl border-2 border-neutral-200 text-sm bg-white cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-500 hover:border-primary-300 transition-all"
                      >
                        <option value="Apartments">Apartments</option>
                        <option value="Villas">Villas</option>
                        <option value="Plots">Plots</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <p className="text-neutral-800 font-medium">{selectedProperty.type}</p>
                  )}
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-500 mb-1.5">
                    <MapPin className="w-4 h-4" />
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.location}
                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400"
                    />
                  ) : (
                    <p className="text-neutral-800 font-medium">{selectedProperty.location}</p>
                  )}
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-500 mb-1.5">
                    <MapPin className="w-4 h-4" />
                    Full Address
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.address || ""}
                      onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400"
                    />
                  ) : (
                    <p className="text-neutral-800 font-medium">{selectedProperty.address || "Not specified"}</p>
                  )}
                </div>
              </div>

              {/* Group Deal */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-violet-50 rounded-xl p-4">
                  <label className="flex items-center gap-1 text-xs font-medium text-violet-600 mb-1">
                    <Users className="w-3 h-3" />
                    Group size
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.groupSize || ""}
                      onChange={(e) => setEditForm({ ...editForm, groupSize: e.target.value })}
                      className="w-full px-2 py-1 rounded-lg border border-violet-200 text-sm"
                      placeholder="e.g. 4"
                    />
                  ) : (
                    <p className="text-lg font-bold text-violet-700">{editForm.groupSize || selectedProperty.groupSize || "N/A"}</p>
                  )}
                </div>
                <div className="bg-amber-50 rounded-xl p-4">
                  <label className="text-xs font-medium text-amber-600 mb-1 block">Last day to join</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editForm.deadline || ""}
                      onChange={(e) => setEditForm({ ...editForm, deadline: e.target.value })}
                      className="w-full px-2 py-1 rounded-lg border border-amber-200 text-sm"
                    />
                  ) : (
                    <p className="text-lg font-bold text-amber-700">{editForm.deadline || selectedProperty.deadline || "N/A"}</p>
                  )}
                </div>
                <div className="bg-primary-50 rounded-xl p-4">
                  <label className="flex items-center gap-1 text-xs font-medium text-primary-600 mb-1">
                    <IndianRupee className="w-3 h-3" />
                    Target price
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.targetPrice || editForm.price || ""}
                      onChange={(e) => setEditForm({ ...editForm, targetPrice: e.target.value, price: e.target.value })}
                      className="w-full px-2 py-1 rounded-lg border border-primary-200 text-sm"
                      placeholder="e.g. 5.50 Cr"
                    />
                  ) : (
                    <p className="text-lg font-bold text-primary-700">₹{editForm.targetPrice || selectedProperty.targetPrice || selectedProperty.price || "N/A"}</p>
                  )}
                </div>
                <div className="bg-neutral-100 rounded-xl p-4">
                  <label className="text-xs font-medium text-neutral-600 mb-1 block">Developer price</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.developerPrice || ""}
                      onChange={(e) => setEditForm({ ...editForm, developerPrice: e.target.value })}
                      className="w-full px-2 py-1 rounded-lg border border-neutral-200 text-sm"
                      placeholder="e.g. 5.98 Cr"
                    />
                  ) : (
                    <p className="text-lg font-bold text-neutral-700">₹{editForm.developerPrice || selectedProperty.developerPrice || "N/A"}</p>
                  )}
                </div>
              </div>

              {/* Price & Area */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-primary-50 rounded-xl p-4">
                  <label className="flex items-center gap-1 text-xs font-medium text-primary-600 mb-1">
                    <IndianRupee className="w-3 h-3" />
                    Price
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.price || ""}
                      onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                      className="w-full px-2 py-1 rounded-lg border border-primary-200 text-sm"
                      placeholder="e.g. 85,00,000"
                    />
                  ) : (
                    <p className="text-lg font-bold text-primary-700">₹{selectedProperty.price || "N/A"}</p>
                  )}
                </div>
                <div className="bg-violet-50 rounded-xl p-4">
                  <label className="text-xs font-medium text-violet-600 mb-1 block">Area (sq.ft)</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.area || ""}
                      onChange={(e) => setEditForm({ ...editForm, area: e.target.value })}
                      className="w-full px-2 py-1 rounded-lg border border-violet-200 text-sm"
                    />
                  ) : (
                    <p className="text-lg font-bold text-violet-700">{selectedProperty.area || "N/A"}</p>
                  )}
                </div>
                <div className="bg-emerald-50 rounded-xl p-4">
                  <label className="flex items-center gap-1 text-xs font-medium text-emerald-600 mb-1">
                    <Users className="w-3 h-3" />
                    Units
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editForm.units}
                      onChange={(e) => setEditForm({ ...editForm, units: e.target.value })}
                      className="w-full px-2 py-1 rounded-lg border border-emerald-200 text-sm"
                    />
                  ) : (
                    <p className="text-lg font-bold text-emerald-700">{selectedProperty.units}</p>
                  )}
                </div>
                <div className="bg-amber-50 rounded-xl p-4">
                  <label className="text-xs font-medium text-amber-600 mb-1 block">Active Groups</label>
                  <p className="text-lg font-bold text-amber-700">{selectedProperty.groups}</p>
                </div>
              </div>

              {/* Bedrooms & Bathrooms */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm font-medium text-neutral-500 mb-1.5 block">Bedrooms</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editForm.bedrooms || ""}
                      onChange={(e) => setEditForm({ ...editForm, bedrooms: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400"
                    />
                  ) : (
                    <p className="text-neutral-800 font-medium">{selectedProperty.bedrooms || "N/A"} BHK</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-500 mb-1.5 block">Bathrooms</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editForm.bathrooms || ""}
                      onChange={(e) => setEditForm({ ...editForm, bathrooms: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400"
                    />
                  ) : (
                    <p className="text-neutral-800 font-medium">{selectedProperty.bathrooms || "N/A"}</p>
                  )}
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <label className="text-sm font-medium text-neutral-500 mb-2 block">Amenities</label>
                {isEditing ? (
                  <div className="flex flex-wrap gap-2">
                    {PROPERTY_AMENITIES.map((amenity) => {
                      const currentAmenities = Array.isArray(editForm.amenities) ? editForm.amenities : [];
                      const isSelected = currentAmenities.includes(amenity);
                      return (
                        <button
                          key={amenity}
                          type="button"
                          onClick={() => {
                            const updated = isSelected
                              ? currentAmenities.filter((a) => a !== amenity)
                              : [...currentAmenities, amenity];
                            setEditForm({ ...editForm, amenities: updated });
                          }}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border-2 ${
                            isSelected
                              ? "border-primary-500 bg-primary-50 text-primary-700"
                              : "border-neutral-200 bg-white text-neutral-600 hover:border-primary-300"
                          }`}
                        >
                          {amenity}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {(selectedProperty.amenities || []).map((amenity, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-neutral-100 rounded-full text-sm text-neutral-700">
                        {amenity}
                      </span>
                    ))}
                    {(!selectedProperty.amenities || selectedProperty.amenities.length === 0) && (
                      <span className="text-sm text-neutral-400">No amenities listed</span>
                    )}
                  </div>
                )}
              </div>

              {/* Property Details: Highlights, Layout Plan, Location, About Developer, Specifications */}
              <div className="space-y-4 mb-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">Property Details</p>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-500 mb-1.5"><Star className="w-4 h-4" /> Highlights</label>
                  {isEditing ? (
                    <textarea
                      value={editForm.highlights || ""}
                      onChange={(e) => setEditForm({ ...editForm, highlights: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400 resize-none"
                    />
                  ) : (
                    <p className="text-neutral-700 text-sm">{editForm.highlights || selectedProperty.highlights || "Not specified"}</p>
                  )}
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-500 mb-1.5"><LayoutGrid className="w-4 h-4" /> Layout plan image</label>
                  {isEditing ? (
                    <label className="block border-2 border-dashed border-neutral-300 rounded-xl p-4 flex flex-col items-center justify-center gap-2 bg-neutral-50 hover:bg-neutral-100 cursor-pointer">
                      <LayoutGrid className="w-6 h-6 text-primary-500" />
                      <p className="text-sm font-medium text-neutral-700">Upload layout plan image</p>
                      <input type="file" accept="image/*" className="hidden" onChange={() => setEditForm({ ...editForm, layoutPlanImage: "uploaded" })} />
                    </label>
                  ) : (
                    <p className="text-neutral-700 text-sm">{editForm.layoutPlanImage || selectedProperty.layoutPlanImage || editForm.layoutPlan || selectedProperty.layoutPlan || "Not specified"}</p>
                  )}
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-500 mb-1.5"><FileText className="w-4 h-4" /> Brochure / Document</label>
                  {isEditing ? (
                    <label className="block border-2 border-dashed border-neutral-300 rounded-xl p-4 flex flex-col items-center justify-center gap-2 bg-neutral-50 hover:bg-neutral-100 cursor-pointer">
                      <FileText className="w-6 h-6 text-primary-500" />
                      <p className="text-sm font-medium text-neutral-700">Upload brochure (PDF, DOC)</p>
                      <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={() => setEditForm({ ...editForm, brochure: "uploaded" })} />
                    </label>
                  ) : (
                    <p className="text-neutral-700 text-sm">{editForm.brochure || selectedProperty.brochure || "Not specified"}</p>
                  )}
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-500 mb-1.5">Super area (sq.ft)</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.superArea || ""}
                      onChange={(e) => setEditForm({ ...editForm, superArea: e.target.value })}
                      placeholder="e.g. 1,245 - 2,890"
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400"
                    />
                  ) : (
                    <p className="text-neutral-700 text-sm">{editForm.superArea || selectedProperty.superArea || "Not specified"}</p>
                  )}
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-500 mb-1.5">Type of accommodation</label>
                  {isEditing ? (
                    <div className="flex flex-wrap gap-2">
                      {ACCOMMODATION_TYPES.map((acc) => {
                        const current = Array.isArray(editForm.accommodationTypes) ? editForm.accommodationTypes : [];
                        const isSelected = current.includes(acc);
                        return (
                          <button
                            key={acc}
                            type="button"
                            onClick={() => {
                              const updated = isSelected ? current.filter((a) => a !== acc) : [...current, acc];
                              setEditForm({ ...editForm, accommodationTypes: updated });
                            }}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border-2 ${
                              isSelected ? "border-primary-500 bg-primary-50 text-primary-700" : "border-neutral-200 bg-white text-neutral-600 hover:border-primary-300"
                            }`}
                          >
                            {acc}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {(editForm.accommodationTypes || selectedProperty.accommodationTypes || []).map((acc, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-neutral-100 rounded-full text-sm text-neutral-700">{acc}</span>
                      ))}
                      {(!editForm.accommodationTypes?.length && !selectedProperty.accommodationTypes?.length) && (
                        <span className="text-sm text-neutral-400">Not specified</span>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-500 mb-1.5"><MapPin className="w-4 h-4" /> Location details</label>
                  {isEditing ? (
                    <textarea
                      value={editForm.locationDetails || ""}
                      onChange={(e) => setEditForm({ ...editForm, locationDetails: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400 resize-none"
                    />
                  ) : (
                    <p className="text-neutral-700 text-sm">{editForm.locationDetails || selectedProperty.locationDetails || "Not specified"}</p>
                  )}
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-500 mb-1.5"><Factory className="w-4 h-4" /> About developer</label>
                  {isEditing ? (
                    <textarea
                      value={editForm.aboutDeveloper || ""}
                      onChange={(e) => setEditForm({ ...editForm, aboutDeveloper: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400 resize-none"
                    />
                  ) : (
                    <p className="text-neutral-700 text-sm">{editForm.aboutDeveloper || selectedProperty.aboutDeveloper || "Not specified"}</p>
                  )}
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-500 mb-1.5"><Ruler className="w-4 h-4" /> Specifications</label>
                  {isEditing ? (
                    <textarea
                      value={editForm.specifications || ""}
                      onChange={(e) => setEditForm({ ...editForm, specifications: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400 resize-none"
                    />
                  ) : (
                    <p className="text-neutral-700 text-sm">{editForm.specifications || selectedProperty.specifications || "Not specified"}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-500 mb-1.5">
                  <FileText className="w-4 h-4" />
                  Description
                </label>
                {isEditing ? (
                  <textarea
                    value={editForm.description || ""}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400 resize-none"
                  />
                ) : (
                  <p className="text-neutral-700">{selectedProperty.description || "No description available"}</p>
                )}
              </div>

              {/* Active Groups */}
              <div className="bg-neutral-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-neutral-500">Active Groups</label>
                    <p className="text-2xl font-bold text-neutral-800">{selectedProperty.groups}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary-600" />
                  </div>
                </div>
              </div>

              {/* Status Change (only in edit mode) */}
              {isEditing && (
                <div className="mb-6">
                  <label className="text-sm font-medium text-neutral-500 mb-1.5 block">Status</label>
                  <div className="relative">
                    <select
                      value={editForm.status}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                      className="w-full appearance-none px-4 py-2.5 pr-10 rounded-xl border-2 border-neutral-200 text-sm bg-white cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-500 hover:border-primary-300 transition-all"
                    >
                      <option value="Active">Active</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Sold Out">Sold Out</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
              <button
                onClick={() => handleDeleteProperty(selectedProperty.id)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-red-600 hover:bg-red-50 text-sm font-medium transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete Property
              </button>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setIsViewOpen(false);
                    setIsEditing(false);
                  }}
                  className="px-5 py-2.5 rounded-xl border border-neutral-300 text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
                >
                  Close
                </button>
                {isEditing && (
                  <button
                    onClick={handleSaveEdit}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold shadow-lg shadow-primary-500/25 hover:from-primary-600 hover:to-primary-700 transition-all"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
