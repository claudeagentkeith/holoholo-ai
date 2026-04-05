export type LaunchBookingPayload = {
  bookingId: string;
  title: string;
  bookingUrl: string;
};

export interface BookingAdapter {
  kind: "DEEP_LINK" | "AUTOMATED_BROWSER_FLOW" | "SUPPLIER_HANDOFF";
  createLaunchPayload(input: {
    bookingId: string;
    title: string;
    bookingUrl: string;
  }): LaunchBookingPayload;
}
