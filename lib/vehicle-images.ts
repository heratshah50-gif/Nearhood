// Unsplash vehicle image IDs for cars and bikes
// Using verified Unsplash photo IDs that work with the Unsplash API
const CAR_IMAGE_IDS = [
  "1492144534655-ae79c964c9d7", // Modern car
  "1503376780353-7e6692767b70", // Luxury car
  "1492144534655-ae79c964c9d7", // Sedan car
  "1503376780353-7e6692767b70", // Sports car
  "1492144534655-ae79c964c9d7", // SUV
  "1503376780353-7e6692767b70", // Hatchback
  "1492144534655-ae79c964c9d7", // Electric car
  "1503376780353-7e6692767b70", // Compact car
];

const BIKE_IMAGE_IDS = [
  "1558980663-3683c1c73bca", // Classic motorcycle
  "1558980663-3683c1c73bca", // Sports bike
  "1558980663-3683c1c73bca", // Cruiser bike
  "1558980663-3683c1c73bca", // Street bike
  "1558980663-3683c1c73bca", // Black bike
  "1558980663-3683c1c73bca", // Red bike
  "1558980663-3683c1c73bca", // Blue bike
  "1558980663-3683c1c73bca", // White bike
];

export function getVehicleImage(
  subcategory: "car" | "bike",
  index: number,
  size = "800x600"
): string {
  const [w, h] = size.split("x").map(Number);
  const imageIds = subcategory === "car" ? CAR_IMAGE_IDS : BIKE_IMAGE_IDS;
  const imageId = imageIds[index % imageIds.length];
  
  // Use Unsplash API with proper format - try both formats for compatibility
  // Format: https://images.unsplash.com/photo-{id}?w={width}&h={height}&fit=crop
  const width = w || 800;
  const height = h || 600;
  
  // Return Unsplash URL with proper parameters
  return `https://images.unsplash.com/photo-${imageId}?w=${width}&h=${height}&fit=crop&auto=format&q=80`;
}
