import rawRows from "@/data/oahu_prd4_inventory_registry.json";

export type IntegrationEase = "Very High" | "High" | "Medium" | "Low" | "Not viable";
export type FrameworkFit = "Yes" | "Mostly" | "No";
export type SourceStatus = "Active" | "Inactive";

export type RawSourceRegistryRow = {
  ID: string;
  "Category Group": string;
  Subcategory: string;
  "Bookable Item / Source": string;
  "Supplier / Venue": string;
  Area: string;
  "Source Class": string;
  "Source Domain": string;
  "Surface Type": string;
  "Booking Surface": string;
  "Source URL": string;
  "Booking Requirement": string;
  "Integration Ease": IntegrationEase | string;
  "Framework Fit (No Supplier Work)": FrameworkFit | string;
  "Supplier-side Customization Needed": string;
  "Integration Pattern": string;
  "Recommended for V1": "Yes" | "No";
  "Launch Priority": number;
  Status: SourceStatus | string;
  Rationale: string;
  Notes: string;
};

export type SourceRegistryRow = {
  id: string;
  categoryGroup: string;
  subcategory: string;
  itemName: string;
  supplier: string;
  area: string;
  sourceClass: string;
  sourceDomain: string;
  surfaceType: string;
  bookingSurface: string;
  sourceUrl: string;
  bookingRequirement: string;
  integrationEase: IntegrationEase | string;
  frameworkFit: FrameworkFit | string;
  supplierCustomizationNeeded: string;
  integrationPattern: string;
  recommendedForV1: "Yes" | "No";
  launchPriority: number;
  status: SourceStatus | string;
  rationale: string;
  notes: string;
};

const rows = rawRows as RawSourceRegistryRow[];

export const sourceRegistry: SourceRegistryRow[] = rows.map((row) => ({
  id: row.ID,
  categoryGroup: row["Category Group"],
  subcategory: row.Subcategory,
  itemName: row["Bookable Item / Source"],
  supplier: row["Supplier / Venue"],
  area: row.Area,
  sourceClass: row["Source Class"],
  sourceDomain: row["Source Domain"],
  surfaceType: row["Surface Type"],
  bookingSurface: row["Booking Surface"],
  sourceUrl: row["Source URL"],
  bookingRequirement: row["Booking Requirement"],
  integrationEase: row["Integration Ease"],
  frameworkFit: row["Framework Fit (No Supplier Work)"],
  supplierCustomizationNeeded: row["Supplier-side Customization Needed"],
  integrationPattern: row["Integration Pattern"],
  recommendedForV1: row["Recommended for V1"],
  launchPriority: row["Launch Priority"],
  status: row.Status,
  rationale: row.Rationale,
  notes: row.Notes
}));

export const categoryOrder = [
  "Timed Entry & Attractions",
  "Luaus & Cultural Shows",
  "Adventure, Ranch & Guided Land Tours",
  "Ocean Activities",
  "Dining & Meal Reservations",
  "Marketplace & Pass Fallbacks"
] as const;

export const easeOrder = ["Very High", "High", "Medium", "Low", "Not viable"] as const;

export function countBy<T extends string>(
  items: SourceRegistryRow[],
  selector: (item: SourceRegistryRow) => T
): Array<{ label: T; count: number }> {
  const map = new Map<T, number>();
  items.forEach((item) => {
    const key = selector(item);
    map.set(key, (map.get(key) ?? 0) + 1);
  });
  return Array.from(map.entries()).map(([label, count]) => ({ label, count }));
}

export const launchWhitelist = [...sourceRegistry]
  .filter((row) => row.recommendedForV1 === "Yes")
  .sort((a, b) => {
    if (a.launchPriority !== b.launchPriority) return a.launchPriority - b.launchPriority;
    if (a.categoryGroup !== b.categoryGroup) return a.categoryGroup.localeCompare(b.categoryGroup);
    if (a.supplier !== b.supplier) return a.supplier.localeCompare(b.supplier);
    return a.itemName.localeCompare(b.itemName);
  });

const activeRows = sourceRegistry.filter((row) => row.status === "Active");
const coverableRows = activeRows.filter((row) => row.frameworkFit === "Yes" || row.frameworkFit === "Mostly");
const highConfidenceRows = activeRows.filter((row) => row.frameworkFit === "Yes");

export const sourceRegistryStats = {
  total: sourceRegistry.length,
  active: activeRows.length,
  recommended: launchWhitelist.length,
  coverable: coverableRows.length,
  highConfidence: highConfidenceRows.length,
  lowFit: activeRows.filter((row) => row.frameworkFit === "No").length,
  inactive: sourceRegistry.filter((row) => row.status === "Inactive").length
};
