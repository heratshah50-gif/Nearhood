"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ImageIcon, Star, LayoutGrid, Sparkles, MapPin, Factory, Ruler, Plus, FileText } from "lucide-react";
import { getPropertyImage } from "@/lib/property-images";
import { PROPERTY_AMENITIES } from "@/lib/property-amenities";
import { ACCOMMODATION_TYPES } from "@/lib/property-accommodation-types";
import { saveNewProperty } from "@/lib/vendor-properties-store";

export default function AddPropertyPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    location: "",
    address: "",
    locationDetails: "",
    type: "Apartments",
    units: "0",
    groupSize: "",
    targetPrice: "",
    developerPrice: "",
    deadline: "",
    highlights: "",
    layoutPlan: "",
    selectedAmenities: [] as string[],
    aboutDeveloper: "",
    specifications: "",
    imageUploaded: false,
  });

  const toggleAmenity = (amenity: string) => {
    setForm((f) => ({
      ...f,
      selectedAmenities: f.selectedAmenities.includes(amenity)
        ? f.selectedAmenities.filter((a) => a !== amenity)
        : [...f.selectedAmenities, amenity],
    }));
  };

  const toggleAccommodation = (acc: string) => {
    setForm((f) => ({
      ...f,
      selectedAccommodation: f.selectedAccommodation.includes(acc)
        ? f.selectedAccommodation.filter((a) => a !== acc)
        : [...f.selectedAccommodation, acc],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    if (form.selectedAmenities.length === 0) return;
    if (form.selectedAccommodation.length === 0) return;

    const nextId = Date.now();
    const newProperty = {
      id: nextId,
      name: form.name.trim(),
      sub: form.type,
      location: form.location || "Ahmedabad",
      type: form.type,
      units: form.units || "0",
      groups: "0",
      status: "Upcoming",
      image: getPropertyImage(nextId % 5, "80x60"),
      address: form.address || undefined,
      price: form.targetPrice || undefined,
      groupSize: form.groupSize || undefined,
      targetPrice: form.targetPrice || undefined,
      developerPrice: form.developerPrice || undefined,
      deadline: form.deadline || undefined,
      highlights: form.highlights || undefined,
      layoutPlan: form.layoutPlan || undefined,
      superArea: form.superArea || undefined,
      accommodationTypes: form.selectedAccommodation.length > 0 ? form.selectedAccommodation : undefined,
      locationDetails: form.locationDetails || undefined,
      amenities: form.selectedAmenities,
      aboutDeveloper: form.aboutDeveloper || undefined,
      specifications: form.specifications || undefined,
      createdAt: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
    };

    saveNewProperty(newProperty);
    router.push("/vendor/listings/properties");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/vendor/listings/properties"
          className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600 hover:bg-primary-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-neutral-800" style={{ fontFamily: "var(--font-display)" }}>
            Add New Property
          </h1>
          <p className="text-sm text-neutral-500">Fill in the details to list your property</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Property Images */}
        <section className="bg-white rounded-2xl border border-neutral-200 p-6">
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            Property images <span className="text-red-500">*</span>
          </label>
          <label className="block border-2 border-dashed border-neutral-300 rounded-xl p-6 flex flex-col items-center justify-center gap-2 bg-neutral-50 hover:bg-neutral-100 cursor-pointer transition-colors">
            <ImageIcon className="w-8 h-8 text-primary-500" />
            <p className="text-sm font-medium text-neutral-700">Upload property images</p>
            <p className="text-xs text-neutral-500">Click to select • Min 1 image required</p>
            <input
              type="file"
              accept="image/*"
              multiple
              required
              className="hidden"
              onChange={() => setForm((f) => ({ ...f, imageUploaded: true }))}
            />
          </label>
        </section>

        {/* Basic Info */}
        <section className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-primary-600">Basic Info</h2>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Property name <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Godrej Garden City"
              className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Location / Address <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
              placeholder="e.g. SG Highway, Ahmedabad"
              className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">City <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                placeholder="e.g. Ahmedabad"
                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Property type</label>
              <select
                value={form.type}
                onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                className="w-full px-4 py-3 pr-10 rounded-xl border-2 border-neutral-200 text-sm bg-white cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-500"
              >
                <option value="Apartments">Apartments</option>
                <option value="Villas">Villas</option>
                <option value="Plots">Plots</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Units available</label>
              <input
                type="number"
                min={0}
                value={form.units}
                onChange={(e) => setForm((f) => ({ ...f, units: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Super area (sq.ft) <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.superArea}
                onChange={(e) => setForm((f) => ({ ...f, superArea: e.target.value }))}
                placeholder="e.g. 1,245 - 2,890 or 1500"
                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Type of accommodation <span className="text-red-500">*</span></label>
            <p className="text-xs text-neutral-500 mb-3">Select all that apply (2 BHK, 3 BHK, etc.)</p>
            <div className="flex flex-wrap gap-2">
              {ACCOMMODATION_TYPES.map((acc) => (
                <button
                  key={acc}
                  type="button"
                  onClick={() => toggleAccommodation(acc)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border-2 ${
                    form.selectedAccommodation.includes(acc)
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-neutral-200 bg-white text-neutral-600 hover:border-primary-300 hover:bg-primary-50/50"
                  }`}
                >
                  {acc}
                </button>
              ))}
            </div>
            {form.selectedAccommodation.length > 0 && (
              <p className="mt-2 text-xs text-primary-600">{form.selectedAccommodation.length} selected</p>
            )}
          </div>
        </section>

        {/* Group Deal */}
        <section className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-primary-600">Group Deal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Group size (members) <span className="text-red-500">*</span></label>
              <input
                type="number"
                min={1}
                value={form.groupSize}
                onChange={(e) => setForm((f) => ({ ...f, groupSize: e.target.value }))}
                placeholder="e.g. 4"
                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Last day to join <span className="text-red-500">*</span></label>
              <input
                type="date"
                value={form.deadline}
                onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Target price (₹) <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.targetPrice}
                onChange={(e) => setForm((f) => ({ ...f, targetPrice: e.target.value }))}
                placeholder="e.g. 5.50 Cr"
                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Developer price (₹) <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.developerPrice}
                onChange={(e) => setForm((f) => ({ ...f, developerPrice: e.target.value }))}
                placeholder="e.g. 5.98 Cr"
                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400"
                required
              />
            </div>
          </div>
        </section>

        {/* Property Details */}
        <section className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-primary-600">Property Details</h2>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-1.5"><Star className="w-4 h-4" /> Highlights <span className="text-red-500">*</span></label>
            <textarea
              value={form.highlights}
              onChange={(e) => setForm((f) => ({ ...f, highlights: e.target.value }))}
              placeholder="Key USPs: clubhouse, green space, security, community features..."
              rows={2}
              className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400 resize-none"
              required
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-1.5"><LayoutGrid className="w-4 h-4" /> Layout plan image <span className="text-red-500">*</span></label>
            <p className="text-xs text-neutral-500 mb-2">Upload floor plan or layout diagram</p>
            <label className="block border-2 border-dashed border-neutral-300 rounded-xl p-6 flex flex-col items-center justify-center gap-2 bg-neutral-50 hover:bg-neutral-100 cursor-pointer transition-colors">
              <LayoutGrid className="w-8 h-8 text-primary-500" />
              <p className="text-sm font-medium text-neutral-700">Upload layout plan image</p>
              <p className="text-xs text-neutral-500">PNG, JPG, WebP • Max 5MB</p>
              <input
                type="file"
                accept="image/*"
                required
                className="hidden"
                onChange={() => setForm((f) => ({ ...f, layoutPlanImageUploaded: true }))}
              />
            </label>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-1.5"><FileText className="w-4 h-4" /> Brochure / Document <span className="text-red-500">*</span></label>
            <p className="text-xs text-neutral-500 mb-2">Upload PDF or document (brochure, brochure PDF, etc.)</p>
            <label className="block border-2 border-dashed border-neutral-300 rounded-xl p-6 flex flex-col items-center justify-center gap-2 bg-neutral-50 hover:bg-neutral-100 cursor-pointer transition-colors">
              <FileText className="w-8 h-8 text-primary-500" />
              <p className="text-sm font-medium text-neutral-700">Upload brochure</p>
              <p className="text-xs text-neutral-500">PDF, DOC, DOCX • Max 10MB</p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={() => setForm((f) => ({ ...f, brochureUploaded: true }))}
              />
            </label>
          </div>

          {/* Amenities - Multi-select from list */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
              <Sparkles className="w-4 h-4" /> Amenities <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-neutral-500 mb-3">Select from the list below (at least one required)</p>
            <div className="flex flex-wrap gap-2">
              {PROPERTY_AMENITIES.map((amenity) => (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border-2 ${
                    form.selectedAmenities.includes(amenity)
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-neutral-200 bg-white text-neutral-600 hover:border-primary-300 hover:bg-primary-50/50"
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
            {form.selectedAmenities.length > 0 && (
              <p className="mt-2 text-xs text-primary-600">{form.selectedAmenities.length} selected</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-1.5"><MapPin className="w-4 h-4" /> Location details <span className="text-red-500">*</span></label>
            <textarea
              value={form.locationDetails}
              onChange={(e) => setForm((f) => ({ ...f, locationDetails: e.target.value }))}
              placeholder="Full address, nearby landmarks, connectivity..."
              rows={2}
              className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400 resize-none"
              required
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-1.5"><Factory className="w-4 h-4" /> About developer <span className="text-red-500">*</span></label>
            <textarea
              value={form.aboutDeveloper}
              onChange={(e) => setForm((f) => ({ ...f, aboutDeveloper: e.target.value }))}
              placeholder="Builder background, past projects, reputation..."
              rows={2}
              className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400 resize-none"
              required
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-1.5"><Ruler className="w-4 h-4" /> Specifications <span className="text-red-500">*</span></label>
            <textarea
              value={form.specifications}
              onChange={(e) => setForm((f) => ({ ...f, specifications: e.target.value }))}
              placeholder="Construction materials, dimensions, technical details..."
              rows={2}
              className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400 resize-none"
              required
            />
          </div>
        </section>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link
            href="/vendor/listings/properties"
            className="px-5 py-2.5 rounded-xl border border-neutral-300 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={form.selectedAmenities.length === 0 || form.selectedAccommodation.length === 0}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold shadow-lg shadow-primary-500/25 hover:from-primary-600 hover:to-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            <span>Add Property</span>
          </button>
        </div>
      </form>
    </div>
  );
}
