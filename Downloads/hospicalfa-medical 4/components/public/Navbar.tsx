"use client";
import { Settings, ShoppingCart } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { COLORS as C } from "@/lib/data";

const NAV_ITEMS = [
  { id:"home",     label:"Inicio"   },
  { id:"catalog",  label:"Catálogo" },
  { id:"shipping", label:"Envíos"   },
  { id:"about",    label:"Nosotros" },
  { id:"contact",  label:"Contacto" },
] as const;

interface NavbarProps {
  page: string;
  cart: number;
  onNav: (page: string) => void;
  onAdmin: () => void;
}

export function Navbar({ page, cart, onNav, onAdmin }: NavbarProps) {
  return (
    <nav style={{
      background:C.white, borderBottom:`1px solid ${C.border}`,
      padding:"0 40px", display:"flex", alignItems:"center",
      height:64, position:"sticky", top:0, zIndex:100,
      boxShadow:"0 1px 10px rgba(0,0,0,0.06)",
    }}>
      <div onClick={() => onNav("home")} style={{ marginRight:"auto" }}>
        <Logo />
      </div>

      <div style={{ display:"flex", gap:2 }}>
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => onNav(item.id)}
            style={{
              background:"transparent", border:"none",
              padding:"10px 16px", fontSize:14, cursor:"pointer",
              color: page === item.id ? C.navy : C.muted,
              fontWeight: page === item.id ? 700 : 500,
              borderBottom: page === item.id ? `2px solid ${C.navy}` : "2px solid transparent",
              transition:"all 0.15s",
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div style={{ display:"flex", gap:10, marginLeft:20, alignItems:"center" }}>
        <button
          onClick={onAdmin}
          style={{
            background:C.bg, border:`1px solid ${C.border}`, color:C.navy,
            borderRadius:8, padding:"8px 16px", fontSize:13, fontWeight:700, cursor:"pointer",
            display:"flex", alignItems:"center", gap:6,
          }}
        >
          <Settings size={14} /> Admin
        </button>
        <button style={{
          background:C.navy, border:"none", color:"#fff",
          borderRadius:8, padding:"9px 18px", fontSize:13, fontWeight:700, cursor:"pointer",
          display:"flex", alignItems:"center", gap:6, position:"relative",
        }}>
          <ShoppingCart size={15} /> Carrito
          {cart > 0 && (
            <span style={{
              position:"absolute", top:-7, right:-7,
              background:C.teal, color:"#fff", borderRadius:"50%",
              width:18, height:18, display:"flex", alignItems:"center",
              justifyContent:"center", fontSize:10, fontWeight:700,
            }}>
              {cart}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
