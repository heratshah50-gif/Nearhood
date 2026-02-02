/**
 * Predefined accommodation types for property listings
 */
export const ACCOMMODATION_TYPES = [
  "1 BHK",
  "2 BHK",
  "2 BHK + CSP",
  "3 BHK",
  "3 BHK + CSP",
  "4 BHK",
  "4 BHK + CSP",
  "5 BHK",
  "5+ BHK",
  "Studio",
  "Penthouse",
  "Duplex",
  "Villa",
  "Plot",
  "Independent House",
] as const;

export type AccommodationType = (typeof ACCOMMODATION_TYPES)[number];
