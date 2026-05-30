"use client";
import { useReducer, useCallback, useState, useEffect } from "react";
import { type CartItem, type Product } from "./data";

// ─── CART ─────────────────────────────────────────────────────────────────────
interface CartState { items: CartItem[]; isOpen: boolean; }
type CartAction =
  | { type: "ADD";    product: Product; qty: number }
  | { type: "REMOVE"; productId: number }
  | { type: "UPDATE"; productId: number; qty: number }
  | { type: "CLEAR" }
  | { type: "OPEN"  }
  | { type: "CLOSE" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const idx = state.items.findIndex(i => i.product.id === action.product.id);
      if (idx >= 0) {
        const items = [...state.items];
        items[idx] = { ...items[idx], qty: items[idx].qty + action.qty };
        return { ...state, items, isOpen: true };
      }
      return { ...state, items: [...state.items, { product: action.product, qty: action.qty }], isOpen: true };
    }
    case "REMOVE": return { ...state, items: state.items.filter(i => i.product.id !== action.productId) };
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
  const addItem    = useCallback((product: Product, qty = 1) => dispatch({ type: "ADD",    product, qty }), []);
  const removeItem = useCallback((id: number)                => dispatch({ type: "REMOVE", productId: id }), []);
  const updateQty  = useCallback((id: number, qty: number)   => dispatch({ type: "UPDATE", productId: id, qty }), []);
  const clearCart  = useCallback(()                          => dispatch({ type: "CLEAR"  }), []);
  const openCart   = useCallback(()                          => dispatch({ type: "OPEN"   }), []);
  const closeCart  = useCallback(()                          => dispatch({ type: "CLOSE"  }), []);
  return { ...state, addItem, removeItem, updateQty, clearCart, openCart, closeCart };
}

// ─── DARK MODE ────────────────────────────────────────────────────────────────
export function useDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("hm-dark") : null;
    if (stored === "true") { setDark(true); document.documentElement.classList.add("dark"); }
  }, []);
  const toggle = useCallback(() => {
    setDark(prev => {
      const next = !prev;
      if (next) document.documentElement.classList.add("dark");
      else      document.documentElement.classList.remove("dark");
      if (typeof window !== "undefined") localStorage.setItem("hm-dark", String(next));
      return next;
    });
  }, []);
  return { dark, toggle };
}

// ─── ADMIN AUTH ───────────────────────────────────────────────────────────────
const ADMIN_USER = "admin";
const ADMIN_PASS = "hospicalfa2026";
const SESSION_KEY = "hm-admin-session";

export function useAdminAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const session = typeof window !== "undefined" ? sessionStorage.getItem(SESSION_KEY) : null;
    if (session === "true") setAuthenticated(true);
    setChecking(false);
  }, []);

  const login = useCallback((user: string, pass: string): boolean => {
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthenticated(false);
  }, []);

  return { authenticated, checking, login, logout };
}

// ─── TOAST ────────────────────────────────────────────────────────────────────
export interface ToastItem { id: number; message: string; type: "success" | "error" | "info" | "warning" }

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const addToast = useCallback((message: string, type: ToastItem["type"] = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3400);
  }, []);
  const removeToast = useCallback((id: number) => setToasts(prev => prev.filter(t => t.id !== id)), []);
  return { toasts, addToast, removeToast };
}

// ─── QUOTE MODAL ──────────────────────────────────────────────────────────────
export function useQuoteModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [prefillItems, setPrefillItems] = useState<CartItem[]>([]);

  const openQuote = useCallback((items: CartItem[] = []) => {
    setPrefillItems(items);
    setIsOpen(true);
  }, []);
  const closeQuote = useCallback(() => { setIsOpen(false); setPrefillItems([]); }, []);

  return { isOpen, prefillItems, openQuote, closeQuote };
}
