// Category system configuration
// This can be extended by admin/vendor in the future

export type CategoryType = "property" | "vehicle";
export type VehicleSubcategory = "car" | "bike";
export type PropertySubcategory = "apartment" | "villa" | "plot" | "commercial";

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string; // Icon name for lucide-react
  subcategories?: Subcategory[];
  description?: string;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

// Main Categories
export const CATEGORIES: Category[] = [
  {
    id: "property",
    name: "Property",
    slug: "property",
    icon: "Building2",
    description: "Residential and commercial properties",
    subcategories: [
      { id: "apartment", name: "Apartment", slug: "apartment" },
      { id: "villa", name: "Villa", slug: "villa" },
      { id: "plot", name: "Plot", slug: "plot" },
      { id: "commercial", name: "Commercial", slug: "commercial" },
    ],
  },
  {
    id: "vehicle",
    name: "Vehicle",
    slug: "vehicle",
    icon: "Car",
    description: "Cars, bikes and other vehicles",
    subcategories: [
      { id: "car", name: "Car", slug: "car", icon: "Car" },
      { id: "bike", name: "Bike", slug: "bike", icon: "Bike" },
    ],
  },
];

// Helper functions
export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((cat) => cat.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((cat) => cat.id === id);
}

export function getSubcategoryBySlug(
  categorySlug: string,
  subcategorySlug: string
): Subcategory | undefined {
  const category = getCategoryBySlug(categorySlug);
  return category?.subcategories?.find((sub) => sub.slug === subcategorySlug);
}

export function getAllSubcategories(categorySlug: string): Subcategory[] {
  const category = getCategoryBySlug(categorySlug);
  return category?.subcategories || [];
}
