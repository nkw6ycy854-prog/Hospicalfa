import { type ClassValue, clsx } from "clsx";
import { type CartItem } from "./data";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function fmt(n: number): string {
  return `RD$${n.toLocaleString("es-DO")}`;
}

export function stockColor(stock: number, min = 50): string {
  if (stock < 30)  return "#EF4444";
  if (stock < min) return "#F59E0B";
  return "#27AE60";
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.qty, 0);
}

export function shippingRate(province: string): number {
  const rates: Record<string, number> = {
    "Distrito Nacional": 0, "Santo Domingo": 150, "Santiago": 350,
    "La Vega": 400, "San Cristóbal": 300, "Puerto Plata": 500,
  };
  return rates[province] ?? 450;
}

export function truncate(str: string, n: number): string {
  return str.length > n ? str.slice(0, n) + "…" : str;
}
