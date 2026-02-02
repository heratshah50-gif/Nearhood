/**
 * Unified listing type for properties and vehicles - same fields, same format
 */
import { Property } from "@/lib/properties-data";
import { VehicleProduct, getProductSlug } from "@/lib/products-data";
import { getPropertySlug } from "@/lib/properties-data";

export type ListingType = "property" | "vehicle";

export interface ListingSpec {
  label: string;
  value: string;
}

export interface UnifiedListing {
  id: number;
  type: ListingType;
  title: string;
  location: string;
  city: string;
  image: string;
  tags: string[];
  specs: ListingSpec[];
  groupSize: number;
  spotsLeft: number;
  deadline: string;
  marketPrice: number;
  groupPrice: number;
  savingsPercent: number;
  shortlisted: number;
  featured: boolean;
  href: string;
}

export function propertyToUnified(p: Property): UnifiedListing {
  const tags = [...p.bhkOptions, p.superArea].filter(Boolean);
  const specs: ListingSpec[] = [
    { label: "Configuration", value: p.bhkOptions.join(", ") || "—" },
    { label: "Super Area", value: p.superArea || "—" },
    { label: "Possession", value: p.possession || "—" },
    ...(p.isRera ? [{ label: "RERA", value: "Approved" }] : []),
  ];
  return {
    id: p.id,
    type: "property",
    title: p.name,
    location: p.location,
    city: p.city,
    image: p.image,
    tags,
    specs,
    groupSize: p.groupSize,
    spotsLeft: p.spotsLeft,
    deadline: p.deadline,
    marketPrice: p.marketPrice,
    groupPrice: p.groupPrice,
    savingsPercent: p.savingsPercent,
    shortlisted: 0,
    featured: p.featured,
    href: `/properties/${getPropertySlug(p.name)}`,
  };
}

export function vehicleToUnified(v: VehicleProduct): UnifiedListing {
  const tags = [
    v.fuelType,
    v.transmission,
    ...(v.mileage ? [v.mileage] : []),
  ];
  const specs: ListingSpec[] = [
    { label: "Fuel", value: v.fuelType.charAt(0).toUpperCase() + v.fuelType.slice(1) },
    { label: "Transmission", value: v.transmission.charAt(0).toUpperCase() + v.transmission.slice(1) },
    ...(v.mileage ? [{ label: "Mileage", value: v.mileage }] : []),
    { label: "Year", value: String(v.year) },
  ];
  return {
    id: v.id,
    type: "vehicle",
    title: v.name,
    location: v.location,
    city: v.city,
    image: v.image,
    tags,
    specs,
    groupSize: v.groupSize,
    spotsLeft: v.spotsLeft,
    deadline: v.deadline,
    marketPrice: v.marketPrice,
    groupPrice: v.groupPrice,
    savingsPercent: v.savingsPercent,
    shortlisted: v.shortlisted ?? 0,
    featured: v.featured,
    href: `/vehicles/${v.subcategory}/${getProductSlug(v.name)}`,
  };
}
