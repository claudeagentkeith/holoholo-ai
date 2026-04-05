import type { BookingAdapter } from "@/lib/booking/types";

const deepLinkAdapter: BookingAdapter = {
  kind: "DEEP_LINK",
  createLaunchPayload(input) {
    return input;
  }
};

const browserFlowAdapter: BookingAdapter = {
  kind: "AUTOMATED_BROWSER_FLOW",
  createLaunchPayload(input) {
    return input;
  }
};

const supplierHandoffAdapter: BookingAdapter = {
  kind: "SUPPLIER_HANDOFF",
  createLaunchPayload(input) {
    return input;
  }
};

export function getBookingAdapter(kind: "DEEP_LINK" | "AUTOMATED_BROWSER_FLOW" | "SUPPLIER_HANDOFF"): BookingAdapter {
  if (kind === "AUTOMATED_BROWSER_FLOW") return browserFlowAdapter;
  if (kind === "SUPPLIER_HANDOFF") return supplierHandoffAdapter;
  return deepLinkAdapter;
}
