import { addDays, isBefore, startOfDay } from "date-fns";

export function enumerateTripDates(arrivalDate: Date, departureDate: Date) {
  const dates: Date[] = [];
  let cursor = startOfDay(arrivalDate);
  const end = startOfDay(departureDate);

  while (isBefore(cursor, end)) {
    dates.push(cursor);
    cursor = addDays(cursor, 1);
  }

  return dates;
}

export function formatCurrency(amount?: number | null) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(amount ?? 0);
}
