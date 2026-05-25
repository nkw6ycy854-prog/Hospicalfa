"use client";
import { Bell, Home, LayoutDashboard, Package, ShoppingCart, Layers, Users, DollarSign, Settings, type LucideIcon } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { COLORS as C } from "@/lib/data";

type AdminSection = "dashboard"|"products"|"orders"|"inventory"|"customers"|"finance"|"settings";

interface NavItem { id: AdminSection; I: LucideIcon; label: string; }
const NAV_ITEMS: NavItem[] = [
  { id:"dashboard",  I:LayoutDashboard, label:"Dashboard"      },
  { id:"products",   I:Package,         label:"Productos"      },
  { id:"orders",     I:ShoppingCart,    label:"Pedidos"        },
  { id:"inventory",  I:Layers,          label:"Inventario"     },
  { id:"customers",  I:Users,           label:"Clientes"       },
  { id:"finance",    I:DollarSign,      label:"Finanzas"       },
  { id:"settings",   I:Settings,        label:"Configuración"  },
];

interface AdminLayoutProps {
  section: AdminSection;
  setSection: (s: AdminSection) => void;
  onHome: () => void;
  children: React.ReactNode;
}

export function AdminLayout({ section, setSection, onHome, children }: AdminLayoutProps) {
  return (
    <>
      {/* ADMIN TOPBAR */}
      <div style={{
        height:64, background:C.white, borderBottom:`1px solid ${C.border}`,
        display:"flex", alignItems:"center", padding:"0 24px", gap:16,
        boxShadow:"0 1px 4px rgba(0,0,0,0.06)", position:"sticky", top:0, zIndex:100,
      }}>
        <Logo />
        <div style={{ marginLeft:"auto", display:"flex", gap:10, alignItems:"center" }}>
          <div style={{
            width:36, height:36, borderRadius:8, background:C.bg,
            border:`1px solid ${C.border}`, display:"flex",
            alignItems:"center", justifyContent:"center", cursor:"pointer",
          }}>
            <Bell size={16} color={C.muted} />
          </div>
          <div style={{
            display:"flex", alignItems:"center", gap:10,
            background:C.bg, border:`1px solid ${C.border}`,
            borderRadius:8, padding:"6px 14px", cursor:"pointer",
          }}>
            <div style={{
              width:28, height:28, borderRadius:6, background:C.navy,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:12, fontWeight:800, color:"#fff",
            }}>A</div>
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:C.txt }}>Administrador</div>
              <div style={{ fontSize:11, color:C.muted }}>admin@hospicalfa.do</div>
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div style={{ display:"flex", height:"calc(100vh - 64px)" }}>
        {/* SIDEBAR */}
        <div style={{
          width:232, background:C.navyDk, display:"flex",
          flexDirection:"column", flexShrink:0, overflowY:"auto",
        }}>
          <div style={{ padding:"14px 10px 6px", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
            <div style={{
              fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.35)",
              letterSpacing:"1.2px", textTransform:"uppercase", padding:"0 6px",
            }}>
              Panel Administrativo
            </div>
          </div>

          <nav style={{ padding:"10px 10px", flex:1 }}>
            {NAV_ITEMS.map(({ id, I, label }) => (
              <button
                key={id}
                onClick={() => setSection(id)}
                style={{
                  width:"100%", display:"flex", alignItems:"center", gap:12,
                  padding:"11px 14px", borderRadius:10, border:"none",
                  background: section===id ? "rgba(13,153,204,0.2)" : "transparent",
                  color: section===id ? "#38BDF8" : "rgba(255,255,255,0.6)",
                  fontSize:14, fontWeight: section===id ? 700 : 500, cursor:"pointer",
                  marginBottom:2, fontFamily:"inherit",
                  borderLeft: section===id ? `3px solid ${C.teal}` : "3px solid transparent",
                  transition:"all 0.15s", textAlign:"left",
                }}
              >
                <I size={17} />
                {label}
              </button>
            ))}
          </nav>

          <div style={{ padding:"14px 10px", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
            <button
              onClick={onHome}
              style={{
                width:"100%", display:"flex", alignItems:"center", gap:12,
                padding:"10px 14px", borderRadius:10, border:"none",
                background:"transparent", color:"rgba(255,255,255,0.4)",
                fontSize:13, fontWeight:500, cursor:"pointer", fontFamily:"inherit",
              }}
            >
              <Home size={15} /> Ver Sitio Web
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, overflowY:"auto", background:C.bg }}>
          {children}
        </div>
      </div>
    </>
  );
}
