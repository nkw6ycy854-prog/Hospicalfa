import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function fmt(n: number, currency = true): string {
  const formatted = n.toLocaleString("es-DO");
  return currency ? `RD$${formatted}` : formatted;
}

export function formatPercent(val: number, total: number): string {
  return ((val / total) * 100).toFixed(1) + "%";
}

export function stockColor(stock: number, min = 50): string {
  if (stock < 30)  return "#EF4444";
  if (stock < min) return "#F59E0B";
  return "#27AE60";
}
