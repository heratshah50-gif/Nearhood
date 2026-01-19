// Ahmedabad areas used for filters, dropdowns, and links across the site
export const AHMEDABAD_LOCATIONS = [
  "Bopal",
  "SG Highway",
  "Bodakdev",
  "Satellite",
  "Prahlad Nagar",
  "Thaltej",
  "Maninagar",
  "Gota",
  "Vastrapur",
  "Naroda",
  "Science City",
  "Vejalpur",
  "Ambli",
  "Memnagar",
  "Navrangpura",
  "Sarkhej",
  "Sola",
  "Chandkheda",
  "Naranpura",
  "Ranip",
  "Nikol",
  "Paldi",
  "Motera",
] as const;

export type AhmedabadLocation = (typeof AHMEDABAD_LOCATIONS)[number];
