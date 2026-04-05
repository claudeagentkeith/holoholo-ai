import { NextResponse } from "next/server";
import { sourceRegistry, sourceRegistryStats } from "@/lib/source-registry";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category");
  const recommended = searchParams.get("recommended");
  const fit = searchParams.get("fit");
  const ease = searchParams.get("ease");
  const status = searchParams.get("status");
  const q = searchParams.get("q")?.trim().toLowerCase();

  const rows = sourceRegistry.filter((row) => {
    if (category && row.categoryGroup !== category) return false;
    if (recommended && row.recommendedForV1 !== recommended) return false;
    if (fit && row.frameworkFit !== fit) return false;
    if (ease && row.integrationEase !== ease) return false;
    if (status && row.status !== status) return false;
    if (
      q &&
      ![
        row.itemName,
        row.supplier,
        row.subcategory,
        row.area,
        row.sourceDomain,
        row.surfaceType,
        row.categoryGroup,
        row.notes,
        row.rationale
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    ) {
      return false;
    }
    return true;
  });

  return NextResponse.json({
    stats: sourceRegistryStats,
    count: rows.length,
    filters: {
      category,
      recommended,
      fit,
      ease,
      status,
      q
    },
    rows
  });
}
