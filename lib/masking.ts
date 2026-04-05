export function getBroadAreaLabel(locationName?: string | null) {
  const value = (locationName ?? "").toLowerCase();
  if (!value) return "Oʻahu";
  if (value.includes("waik") || value.includes("ala wai") || value.includes("diamond head")) return "Waikīkī / South Shore";
  if (value.includes("hale") || value.includes("north shore")) return "North Shore";
  if (value.includes("windward") || value.includes("kailua") || value.includes("waimanalo") || value.includes("kaʻaʻawa")) return "Windward Oʻahu";
  if (value.includes("manoa") || value.includes("nu") || value.includes("kaka")) return "Urban Honolulu";
  if (value.includes("central") || value.includes("pearl")) return "Central Oʻahu";
  return "Oʻahu";
}

export function getMaskedTitle(input: {
  productType?: string | null;
  categoryTags?: string[];
}) {
  const tags = (input.categoryTags ?? []).map((tag) => tag.toLowerCase());
  const type = input.productType ?? "ACTIVITY";

  if (type === "REGENERATIVE") return "Regenerative stewardship experience";
  if (type === "LUAU") return "Cultural evening experience";
  if (type === "DINING") return tags.includes("food") ? "Reserved dining experience" : "Bookable meal reservation";
  if (type === "EVENT") return "Ticketed evening event";
  if (type === "CULTURAL") return "Cultural learning experience";
  if (tags.includes("ocean")) return "Ocean activity";
  if (tags.includes("adventure")) return "Adventure activity";
  return "Bookable Oʻahu experience";
}

export function getMaskedLocationHint(locationName?: string | null) {
  return getBroadAreaLabel(locationName);
}
