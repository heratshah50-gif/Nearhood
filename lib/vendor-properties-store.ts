/**
 * Simple store for vendor property listings - uses sessionStorage for persistence
 * across add page -> list page navigation
 */

const STORAGE_KEY = "nearhood-vendor-new-property";

export type StoredProperty = {
  id: number;
  name: string;
  sub: string;
  location: string;
  type: string;
  units: string;
  groups: string;
  status: string;
  image: string;
  address?: string;
  price?: string;
  groupSize?: string;
  targetPrice?: string;
  developerPrice?: string;
  deadline?: string;
  highlights?: string;
  layoutPlan?: string;
  layoutPlanImage?: string;
  brochure?: string;
  superArea?: string;
  accommodationTypes?: string[];
  locationDetails?: string;
  amenities?: string[];
  aboutDeveloper?: string;
  specifications?: string;
  createdAt?: string;
};

export function saveNewProperty(property: StoredProperty): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(property));
  }
}

export function getAndClearNewProperty(): StoredProperty | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as StoredProperty;
    sessionStorage.removeItem(STORAGE_KEY);
    return parsed;
  } catch {
    return null;
  }
}
