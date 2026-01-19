// Unsplash property/building image IDs for use across homepage and properties page
const IMAGE_IDS = [
  "1524759661624-282fc1e34ac7",
  "1560448204-e02f11c3d0e2",
  "1568605114967-8130f3a36994",
  "1570129477492-45c003edd2be",
  "1572116469696-31de0f17cc34",
  "1580587771525-78b9dba3b914",
  "1600566753190-17f0baa2a6c3",
  "1600585154340-be6161a56a0c",
  "1600607687939-ce8a6c25118c",
  "1600607687969-cf710a6b5c1c",
  "1600596542815-ffad4c1539a9",
  "1600607687644-c7171b42498b",
  "1600607688924-fc6c39c2a7e5",
  "1600566753190-17f0baa2a6c3",
  "1600607687644-c7171b42498b",
];

export function getPropertyImage(index: number, size = "800x600"): string {
  const [w, h] = size.split("x").map(Number);
  return `https://images.unsplash.com/photo-${IMAGE_IDS[index % IMAGE_IDS.length]}?w=${w || 800}&h=${h || 600}&fit=crop`;
}
