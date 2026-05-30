"use client";
import { useReducer, useCallback } from "react";
import { type CartItem, type Product } from "./data";

// ─── CART STATE ────────────────────────────────────────────────────────────────
interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD";    product: Product; qty: number }
  | { type: "REMOVE"; productId: number }
  | { type: "UPDATE"; productId: number; qty: number }
  | { type: "CLEAR" }
  | { type: "OPEN" }
  | { type: "CLOSE" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.findIndex(i => i.product.id === action.product.id);
      if (existing >= 0) {
        const items = [...state.items];
        items[existing] = { ...items[existing], qty: items[existing].qty + action.qty };
        return { ...state, items, isOpen: true };
      }
      return { ...state, items: [...state.items, { product: action.product, qty: action.qty }], isOpen: true };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter(i => i.product.id !== action.productId) };
    case "UPDATE": {
      if (action.qty <= 0) return { ...state, items: state.items.filter(i => i.product.id !== action.productId) };
      return { ...state, items: state.items.map(i => i.product.id === action.productId ? { ...i, qty: action.qty } : i) };
    }
    case "CLEAR":  return { ...state, items: [] };
    case "OPEN":   return { ...state, isOpen: true };
    case "CLOSE":  return { ...state, isOpen: false };
    default:       return state;
  }
}

export function useCart() {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  const addItem    = useCallback((product: Product, qty = 1) => dispatch({ type: "ADD", product, qty }), []);
  const removeItem = useCallback((productId: number)         => dispatch({ type: "REMOVE", productId }), []);
  const updateQty  = useCallback((productId: number, qty: number) => dispatch({ type: "UPDATE", productId, qty }), []);
  const clearCart  = useCallback(()                           => dispatch({ type: "CLEAR" }), []);
  const openCart   = useCallback(()                           => dispatch({ type: "OPEN" }), []);
  const closeCart  = useCallback(()                           => dispatch({ type: "CLOSE" }), []);

  return { ...state, addItem, removeItem, updateQty, clearCart, openCart, closeCart };
}

// ─── DARK MODE ────────────────────────────────────────────────────────────────
import { useState, useEffect } from "react";

export function useDarkMode() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("hm-dark") : null;
    if (stored === "true") { setDark(true); document.documentElement.classList.add("dark"); }
  }, []);

  const toggle = useCallback(() => {
    setDark(prev => {
      const next = !prev;
      if (next) { document.documentElement.classList.add("dark"); }
      else      { document.documentElement.classList.remove("dark"); }
      if (typeof window !== "undefined") localStorage.setItem("hm-dark", String(next));
      return next;
    });
  }, []);

  return { dark, toggle };
}

// ─── TOAST ────────────────────────────────────────────────────────────────────
interface ToastItem { id: number; message: string; type: "success" | "error" | "info" }

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((message: string, type: ToastItem["type"] = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3200);
  }, []);

  return { toasts, addToast };
}
