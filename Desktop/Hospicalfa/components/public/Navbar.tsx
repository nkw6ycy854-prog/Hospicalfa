"use client";
import { useState } from "react";
import { Settings, ShoppingCart, Moon, Sun, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { COLORS as C } from "@/lib/data";

const NAV_ITEMS = [
  { id: "home",     label: "Inicio"   },
  { id: "catalog",  label: "Catálogo" },
  { id: "shipping", label: "Envíos"   },
  { id: "about",    label: "Nosotros" },
  { id: "contact",  label: "Contacto" },
] as const;

interface NavbarProps {
  page: string;
  cartCount: number;
  dark: boolean;
  onNav: (page: string) => void;
  onAdmin: () => void;
  onCartOpen: () => void;
  onDarkToggle: () => void;
}

export function Navbar({
  page, cartCount, dark, onNav, onAdmin, onCartOpen, onDarkToggle,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav style={{
        background: C.white,
        borderBottom: `1px solid ${C.border}`,
        padding: "0 40px",
        display: "flex", alignItems: "center",
        height: 64, position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 1px 10px rgba(0,0,0,0.06)",
      }}>
        {/* Logo */}
        <div onClick={() => onNav("home")} style={{ marginRight: "auto" }}>
          <Logo />
        </div>

        {/* Desktop nav links */}
        <div style={{ display: "flex", gap: 2 }}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              style={{
                background: "transparent", border: "none",
                padding: "10px 16px", fontSize: 14, cursor: "pointer",
                color: page === item.id ? C.navy : C.muted,
                fontWeight: page === item.id ? 700 : 500,
                borderBottom: page === item.id
                  ? `2px solid ${C.navy}`
                  : "2px solid transparent",
                transition: "all 0.15s",
                fontFamily: "inherit",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: "flex", gap: 8, marginLeft: 20, alignItems: "center" }}>
          {/* Dark mode toggle */}
          <button
            onClick={onDarkToggle}
            title={dark ? "Modo claro" : "Modo oscuro"}
            style={{
              width: 36, height: 36, borderRadius: 8,
              background: C.bg, border: `1px solid ${C.border}`,
              cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center",
            }}
          >
            {dark ? <Sun size={16} color={C.amber} /> : <Moon size={16} color={C.muted} />}
          </button>

          {/* Admin button */}
          <button
            onClick={onAdmin}
            style={{
              background: C.bg, border: `1px solid ${C.border}`,
              color: C.navy, borderRadius: 8,
              padding: "8px 14px", fontSize: 13, fontWeight: 700,
              cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
              fontFamily: "inherit",
            }}
          >
            <Settings size={14} /> Admin
          </button>

          {/* Cart button */}
          <button
            onClick={onCartOpen}
            style={{
              background: C.navy, border: "none", color: "#fff",
              borderRadius: 8, padding: "9px 18px",
              fontSize: 13, fontWeight: 700, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6,
              position: "relative", fontFamily: "inherit",
            }}
          >
            <ShoppingCart size={15} /> Carrito
            {cartCount > 0 && (
              <span style={{
                position: "absolute", top: -7, right: -7,
                background: C.teal, color: "#fff", borderRadius: "50%",
                width: 20, height: 20,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700,
              }}>
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            style={{
              display: "none", width: 36, height: 36, borderRadius: 8,
              background: C.bg, border: `1px solid ${C.border}`,
              cursor: "pointer", alignItems: "center", justifyContent: "center",
            }}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="animate-fade-in" style={{
          background: C.white, borderBottom: `1px solid ${C.border}`,
          padding: "12px 24px", display: "flex", flexDirection: "column",
          gap: 4, position: "sticky", top: 64, zIndex: 99,
        }}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => { onNav(item.id); setMobileOpen(false); }}
              style={{
                background: page === item.id ? C.navyLt : "transparent",
                border: "none", padding: "11px 14px",
                borderRadius: 8, fontSize: 14, cursor: "pointer",
                color: page === item.id ? C.navy : C.muted,
                fontWeight: page === item.id ? 700 : 500,
                textAlign: "left", fontFamily: "inherit",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
