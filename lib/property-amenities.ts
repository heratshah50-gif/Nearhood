/**
 * Predefined list of property amenities for vendor selection
 */
export const PROPERTY_AMENITIES = [
  "Swimming Pool",
  "Gym",
  "Parking",
  "Security",
  "Garden",
  "Clubhouse",
  "Rooftop Garden",
  "Kids Play Area",
  "Infinity Pool",
  "Spa",
  "Concierge",
  "Power Backup",
  "Lift",
  "Jogging Track",
  "Indoor Games",
  "Party Hall",
  "Landscaped Gardens",
  "24/7 Water Supply",
  "Fire Safety",
  "Modular Kitchen",
  "Piped Gas",
] as const;

export type PropertyAmenity = (typeof PROPERTY_AMENITIES)[number];
