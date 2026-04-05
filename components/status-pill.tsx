const palette: Record<string, string> = {
  REQUESTED: "border-slate-300 bg-slate-50 text-slate-700",
  GENERATING: "border-ocean-200 bg-ocean-50 text-ocean-700",
  READY: "border-leaf/20 bg-leaf/10 text-leaf",
  CONVERTED: "border-slate-300 bg-slate-50 text-slate-700",
  VERIFYING: "border-ocean-200 bg-ocean-50 text-ocean-700",
  DRAFT_READY: "border-leaf/20 bg-leaf/10 text-leaf",
  PRELIMINARY_SET: "border-ocean-200 bg-ocean-50 text-ocean-700",
  FINAL_CONFIRM_PENDING: "border-leaf/20 bg-leaf/10 text-leaf",
  READY_TO_CONFIRM: "border-leaf/20 bg-leaf/10 text-leaf",
  BOOKING: "border-coral/20 bg-coral/10 text-coral",
  BOOKED: "border-ocean-200 bg-ocean-50 text-ocean-700",
  MONITORING: "border-ocean-200 bg-ocean-50 text-ocean-700",
  COMPLETED: "border-slate-300 bg-slate-50 text-slate-700",
  PENDING: "border-amber-200 bg-amber-50 text-amber-700",
  IN_PROGRESS: "border-ocean-200 bg-ocean-50 text-ocean-700",
  VERIFIED: "border-leaf/20 bg-leaf/10 text-leaf",
  PROPOSED: "border-slate-300 bg-slate-50 text-slate-700",
  BOOKING_REQUIRED: "border-coral/20 bg-coral/10 text-coral",
  OPEN: "border-coral/20 bg-coral/10 text-coral",
  RESOLVED: "border-leaf/20 bg-leaf/10 text-leaf",
  NET_POSITIVE: "border-leaf/20 bg-leaf/10 text-leaf",
  BALANCED: "border-slate-300 bg-slate-50 text-slate-700",
  NET_NEGATIVE: "border-amber-200 bg-amber-50 text-amber-700",
  EXPIRED: "border-slate-300 bg-slate-50 text-slate-700"
};

export function StatusPill({ value }: { value: string }) {
  return (
    <span className={`badge ${palette[value] ?? "border-slate-300 bg-slate-50 text-slate-700"}`}>
      {value.replaceAll("_", " ")}
    </span>
  );
}
