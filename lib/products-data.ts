// Unified product data structure for all categories
import { getPropertyImage } from "@/lib/property-images";
import { getVehicleImage } from "@/lib/vehicle-images";
import { CategoryType, VehicleSubcategory, PropertySubcategory } from "./categories";

// Base product interface
export interface BaseProduct {
  id: number;
  name: string;
  category: CategoryType;
  subcategory: string;
  image: string;
  location: string;
  city: string;
  marketPrice: number;
  groupPrice: number;
  savingsPercent: number;
  groupSize: number;
  spotsLeft: number;
  deadline: string;
  featured: boolean;
  shortlisted?: number;
}

// Property-specific fields
export interface PropertyProduct extends BaseProduct {
  category: "property";
  subcategory: PropertySubcategory;
  bhkOptions: string[];
  superArea: string;
  possession: string;
  isRera: boolean;
  amenities?: number;
}

// Vehicle-specific fields
export interface VehicleProduct extends BaseProduct {
  category: "vehicle";
  subcategory: VehicleSubcategory;
  brand: string;
  model: string;
  year: number;
  fuelType: "petrol" | "diesel" | "electric" | "hybrid";
  transmission: "manual" | "automatic";
  mileage?: string;
  color?: string;
  registrationYear?: number;
}

export type Product = PropertyProduct | VehicleProduct;

// Sample vehicle data
const sampleVehicles: VehicleProduct[] = [
  {
    id: 1001,
    name: "Honda City 2024",
    category: "vehicle",
    subcategory: "car",
    brand: "Honda",
    model: "City",
    year: 2024,
    fuelType: "petrol",
    transmission: "automatic",
    mileage: "17.8 kmpl",
    color: "White",
    registrationYear: 2024,
    image: getVehicleImage("car", 0),
    location: "Ahmedabad",
    city: "Ahmedabad",
    marketPrice: 1500000,
    groupPrice: 1350000,
    savingsPercent: 10,
    groupSize: 10,
    spotsLeft: 3,
    deadline: "Feb 15, 2026",
    featured: true,
    shortlisted: 25,
  },
  {
    id: 1002,
    name: "Maruti Swift 2023",
    category: "vehicle",
    subcategory: "car",
    brand: "Maruti",
    model: "Swift",
    year: 2023,
    fuelType: "petrol",
    transmission: "manual",
    mileage: "23.2 kmpl",
    color: "Red",
    registrationYear: 2023,
    image: getVehicleImage("car", 1),
    location: "Ahmedabad",
    city: "Ahmedabad",
    marketPrice: 650000,
    groupPrice: 585000,
    savingsPercent: 10,
    groupSize: 15,
    spotsLeft: 5,
    deadline: "Feb 20, 2026",
    featured: false,
    shortlisted: 18,
  },
  {
    id: 2001,
    name: "Royal Enfield Classic 350",
    category: "vehicle",
    subcategory: "bike",
    brand: "Royal Enfield",
    model: "Classic 350",
    year: 2024,
    fuelType: "petrol",
    transmission: "manual",
    mileage: "35 kmpl",
    color: "Black",
    registrationYear: 2024,
    image: getVehicleImage("bike", 0),
    location: "Ahmedabad",
    city: "Ahmedabad",
    marketPrice: 250000,
    groupPrice: 225000,
    savingsPercent: 10,
    groupSize: 20,
    spotsLeft: 8,
    deadline: "Feb 25, 2026",
    featured: true,
    shortlisted: 42,
  },
  {
    id: 2002,
    name: "Yamaha MT-15",
    category: "vehicle",
    subcategory: "bike",
    brand: "Yamaha",
    model: "MT-15",
    year: 2024,
    fuelType: "petrol",
    transmission: "manual",
    mileage: "56.8 kmpl",
    color: "Blue",
    registrationYear: 2024,
    image: getVehicleImage("bike", 1),
    location: "Ahmedabad",
    city: "Ahmedabad",
    marketPrice: 180000,
    groupPrice: 162000,
    savingsPercent: 10,
    groupSize: 25,
    spotsLeft: 12,
    deadline: "Mar 1, 2026",
    featured: false,
    shortlisted: 35,
  },
];

// Import existing properties and convert to new structure
import { ALL_PROPERTIES as OLD_PROPERTIES, Property as OldProperty } from "./properties-data";

function convertPropertyToProduct(oldProp: OldProperty): PropertyProduct {
  return {
    id: oldProp.id,
    name: oldProp.name,
    category: "property",
    subcategory: "apartment", // Default, can be enhanced
    image: oldProp.image,
    location: oldProp.location,
    city: oldProp.city,
    bhkOptions: oldProp.bhkOptions,
    superArea: oldProp.superArea,
    groupSize: oldProp.groupSize,
    spotsLeft: oldProp.spotsLeft,
    deadline: oldProp.deadline,
    marketPrice: oldProp.marketPrice,
    groupPrice: oldProp.groupPrice,
    savingsPercent: oldProp.savingsPercent,
    possession: oldProp.possession,
    isRera: oldProp.isRera,
    featured: oldProp.featured,
    amenities: 20, // Default
    shortlisted: 0,
  };
}

// All products (properties + vehicles)
export const ALL_PRODUCTS: Product[] = [
  ...OLD_PROPERTIES.map(convertPropertyToProduct),
  ...sampleVehicles,
];

// Helper functions
export function getProductsByCategory(category: CategoryType): Product[] {
  return ALL_PRODUCTS.filter((p) => p.category === category);
}

export function getProductsBySubcategory(
  category: CategoryType,
  subcategory: string
): Product[] {
  return ALL_PRODUCTS.filter(
    (p) => p.category === category && p.subcategory === subcategory
  );
}

export function getProductById(id: number): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.id === id);
}

export function getProductSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Type guards
export function isPropertyProduct(product: Product): product is PropertyProduct {
  return product.category === "property";
}

export function isVehicleProduct(product: Product): product is VehicleProduct {
  return product.category === "vehicle";
}
