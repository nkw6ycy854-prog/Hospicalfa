"use client";
import { useState, useEffect } from "react";
import { Settings, ShoppingCart, Moon, Sun, Menu, X, Phone, ChevronDown } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { COLORS as C } from "@/lib/data";

const NAV_ITEMS = [
  { id:"home",     label:"Inicio"    },
  { id:"catalog",  label:"Catálogo"  },
  { id:"about",    label:"Nosotros"  },
  { id:"blog",     label:"Blog"      },
  { id:"shipping", label:"Envíos"    },
  { id:"contact",  label:"Contacto"  },
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

export function Navbar({ page, cartCount, dark, onNav, onAdmin, onCartOpen, onDarkToggle }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* TOP BAR */}
      <div style={{
        background: C.navyDk, color: "rgba(255,255,255,0.85)",
        fontSize: 12, fontWeight: 500, padding: "7px 40px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ display: "flex", gap: 24 }}>
          <a href="tel:+18095550001" style={{ color: "inherit", textDecoration:"none", display:"flex", alignItems:"center", gap:5 }}>
            <Phone size={12}/> +1 (809) 555-0001
          </a>
          <a href="mailto:ventas@hospicalfa.do" style={{ color: "rgba(255,255,255,0.7)", textDecoration:"none" }}>
            ventas@hospicalfa.do
          </a>
        </div>
        <div style={{ display: "flex", gap: 20, alignItems:"center" }}>
          <span>🕗 Lun–Vie 8am–6pm · Sáb 8am–2pm</span>
          <span style={{ color: "#38BDF8" }}>🇩🇴 Envíos a las 32 provincias</span>
        </div>
      </div>

      {/* MAIN NAV */}
      <nav
        role="navigation"
        aria-label="Navegación principal"
        style={{
          background: scrolled ? "rgba(255,255,255,0.97)" : C.white,
          borderBottom: `1px solid ${C.border}`,
          padding: "0 40px",
          display: "flex", alignItems: "center",
          height: 64, position: "sticky", top: 0, zIndex: 100,
          boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.10)" : "0 1px 6px rgba(0,0,0,0.05)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "box-shadow 0.3s, background 0.3s",
        }}
      >
        <div
          onClick={() => onNav("home")}
          style={{ marginRight: "auto", cursor: "pointer" }}
          role="link"
          aria-label="Ir a inicio"
        >
          <Logo />
        </div>

        {/* DESKTOP LINKS */}
        <div style={{ display: "flex", gap: 2 }}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => { onNav(item.id); setMobileOpen(false); }}
              aria-current={page === item.id ? "page" : undefined}
              style={{
                background: "transparent", border: "none",
                padding: "10px 14px", fontSize: 14, cursor: "pointer",
                fontFamily: "inherit",
                color: page === item.id ? C.navy : C.muted,
                fontWeight: page === item.id ? 700 : 500,
                borderBottom: page === item.id ? `2.5px solid ${C.navy}` : "2.5px solid transparent",
                transition: "all 0.15s",
              }}
              onMouseEnter={e => { if(page!==item.id)(e.currentTarget as HTMLButtonElement).style.color=C.navy; }}
              onMouseLeave={e => { if(page!==item.id)(e.currentTarget as HTMLButtonElement).style.color=C.muted; }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* RIGHT ACTIONS */}
        <div style={{ display: "flex", gap: 8, marginLeft: 20, alignItems: "center" }}>
          <button
            onClick={onDarkToggle}
            aria-label={dark ? "Modo claro" : "Modo oscuro"}
            title={dark ? "Modo claro" : "Modo oscuro"}
            style={{ width:36, height:36, borderRadius:8, background:C.bg, border:`1px solid ${C.border}`, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}
          >
            {dark ? <Sun size={15} color={C.amber}/> : <Moon size={15} color={C.muted}/>}
          </button>

          <button
            onClick={onAdmin}
            aria-label="Panel administrativo"
            style={{ background:C.bg, border:`1px solid ${C.border}`, color:C.navy, borderRadius:8, padding:"8px 13px", fontSize:12, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:5, fontFamily:"inherit" }}
          >
            <Settings size={13}/> Admin
          </button>

          <button
            onClick={onCartOpen}
            aria-label={`Carrito de compras, ${cartCount} items`}
            style={{ background:C.navy, border:"none", color:"#fff", borderRadius:8, padding:"9px 16px", fontSize:13, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:6, position:"relative", fontFamily:"inherit" }}
          >
            <ShoppingCart size={15}/>
            <span>Carrito</span>
            {cartCount > 0 && (
              <span aria-hidden="true" style={{
                position:"absolute", top:-7, right:-7,
                background:C.teal, color:"#fff", borderRadius:"50%",
                width:19, height:19, display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:10, fontWeight:800,
              }}>
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            style={{ display:"none", width:36, height:36, borderRadius:8, background:C.bg, border:`1px solid ${C.border}`, cursor:"pointer", alignItems:"center", justifyContent:"center" }}
            className="mobile-menu-btn"
          >
            {mobileOpen ? <X size={18}/> : <Menu size={18}/>}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-label="Menú de navegación móvil"
          className="animate-fade-in"
          style={{
            background: C.white, borderBottom: `1px solid ${C.border}`,
            padding: "12px 24px", display: "flex", flexDirection: "column",
            gap: 4, position: "sticky", top: 64, zIndex: 99,
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => { onNav(item.id); setMobileOpen(false); }}
              style={{
                background: page === item.id ? C.navyLt : "transparent",
                border: "none", padding: "12px 14px", borderRadius: 8,
                fontSize: 15, cursor: "pointer",
                color: page === item.id ? C.navy : C.muted,
                fontWeight: page === item.id ? 700 : 500,
                textAlign: "left", fontFamily: "inherit",
              }}
            >
              {item.label}
            </button>
          ))}
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 10, marginTop: 4 }}>
            <a href="tel:+18095550001" style={{
              display:"flex", alignItems:"center", gap:8, color:C.teal,
              fontSize:15, fontWeight:600, textDecoration:"none", padding:"8px 14px",
            }}>
              <Phone size={16}/> +1 (809) 555-0001
            </a>
          </div>
        </div>
      )}
    </>
  );
}
