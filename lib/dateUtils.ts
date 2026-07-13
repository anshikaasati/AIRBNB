/**
 * Date calculation and formatting utility helpers.
 */

/**
 * Formats a Date object as MM/DD/YYYY
 */
export function formatDateMMDDYYYY(date: Date | null, placeholder: string = "Add date"): string {
  if (!date) return placeholder;
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const y = date.getFullYear();
  return `${m}/${d}/${y}`;
}

/**
 * Formats a Date object as "D MMM YYYY", e.g. "18 Oct 2026"
 */
export function formatDateLabel(date: Date | null, placeholder: string = ""): string {
  if (!date) return placeholder;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Calculates the number of nights between two Dates
 */
export function calculateNights(startDate: Date | null, endDate: Date | null): number {
  if (!startDate || !endDate) return 0;
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Computes the free cancellation date (1 day before start date)
 * Returns formatted string, e.g. "17 October"
 */
export function getCancellationDateString(startDate: Date | null): string {
  if (!startDate) return "17 October";
  const cancelDate = new Date(startDate);
  cancelDate.setDate(startDate.getDate() - 1);
  const day = cancelDate.getDate();
  const month = cancelDate.toLocaleString("en-US", { month: "long" });
  return `${day} ${month}`;
}
