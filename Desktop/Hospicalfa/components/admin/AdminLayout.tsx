"use client";
import {
  Bell, Home, LayoutDashboard, Package, ShoppingCart,
  Layers, Users, DollarSign, Settings, type LucideIcon,
  ChevronDown,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { COLORS as C } from "@/lib/data";
import { ORDERS } from "@/lib/data";

export type AdminSection =
  | "dashboard" | "products" | "orders"
  | "inventory" | "customers" | "finance" | "settings";

interface NavItem { id: AdminSection; I: LucideIcon; label: string; badge?: number }

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard",  I: LayoutDashboard, label: "Dashboard"     },
  { id: "products",   I: Package,         label: "Productos"     },
  { id: "orders",     I: ShoppingCart,    label: "Pedidos",      badge: ORDERS.filter(o => o.status === "Procesando").length },
  { id: "inventory",  I: Layers,          label: "Inventario"    },
  { id: "customers",  I: Users,           label: "Clientes"      },
  { id: "finance",    I: DollarSign,      label: "Finanzas"      },
  { id: "settings",   I: Settings,        label: "Configuración" },
];

interface AdminLayoutProps {
  section: AdminSection;
  setSection: (s: AdminSection) => void;
  onHome: () => void;
  children: React.ReactNode;
}

export function AdminLayout({ section, setSection, onHome, children }: AdminLayoutProps) {
  const pendingAlerts = 4; // stock alerts count

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>

      {/* ── TOP BAR ──────────────────────────────────────── */}
      <header style={{
        height: 64, background: C.white,
        borderBottom: `1px solid ${C.border}`,
        display: "flex", alignItems: "center",
        padding: "0 24px", gap: 16,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        flexShrink: 0, zIndex: 100,
      }}>
        <Logo />

        <div style={{
          flex: 1, display: "flex", justifyContent: "center",
        }}>
          <div style={{
            background: C.bg, border: `1px solid ${C.border}`,
            borderRadius: 8, padding: "7px 18px",
            fontSize: 12, color: C.muted, fontWeight: 500,
          }}>
            Panel Administrativo — Hospicalfa Medical 2026
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {/* Notifications */}
          <button style={{
            width: 38, height: 38, borderRadius: 9,
            background: C.bg, border: `1px solid ${C.border}`,
            cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center",
            position: "relative",
          }}>
            <Bell size={16} color={C.muted} />
            {pendingAlerts > 0 && (
              <span style={{
                position: "absolute", top: -4, right: -4,
                background: C.red, color: "#fff", borderRadius: "50%",
                width: 16, height: 16, fontSize: 9, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>{pendingAlerts}</span>
            )}
          </button>

          {/* User pill */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            background: C.bg, border: `1px solid ${C.border}`,
            borderRadius: 10, padding: "7px 14px", cursor: "pointer",
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: 7,
              background: `linear-gradient(135deg,${C.navy},${C.teal})`,
              display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 13,
              fontWeight: 800, color: "#fff",
            }}>A</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.txt, lineHeight: 1.1 }}>
                Administrador
              </div>
              <div style={{ fontSize: 10, color: C.muted }}>admin@hospicalfa.do</div>
            </div>
            <ChevronDown size={14} color={C.muted} />
          </div>
        </div>
      </header>

      {/* ── BODY ROW ─────────────────────────────────────── */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* SIDEBAR */}
        <aside style={{
          width: 234, background: C.navyDk,
          display: "flex", flexDirection: "column",
          flexShrink: 0, overflowY: "auto",
        }}>
          <div style={{
            padding: "14px 12px 6px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}>
            <div style={{
              fontSize: 10, fontWeight: 700,
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "1.2px", textTransform: "uppercase",
              padding: "0 4px",
            }}>
              Menú Principal
            </div>
          </div>

          <nav style={{ padding: "10px 10px", flex: 1 }}>
            {NAV_ITEMS.map(({ id, I, label, badge }) => (
              <button
                key={id}
                onClick={() => setSection(id)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 12,
                  padding: "11px 14px", borderRadius: 10, border: "none",
                  background: section === id
                    ? "rgba(13,153,204,0.2)"
                    : "transparent",
                  color: section === id ? "#38BDF8" : "rgba(255,255,255,0.6)",
                  fontSize: 14, fontWeight: section === id ? 700 : 500,
                  cursor: "pointer", marginBottom: 2, fontFamily: "inherit",
                  borderLeft: section === id
                    ? `3px solid ${C.teal}`
                    : "3px solid transparent",
                  transition: "all 0.15s", textAlign: "left",
                }}
                onMouseEnter={e => {
                  if (section !== id) {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                  }
                }}
                onMouseLeave={e => {
                  if (section !== id) {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)";
                  }
                }}
              >
                <I size={17} style={{ flexShrink: 0 }} />
                <span style={{ flex: 1 }}>{label}</span>
                {badge != null && badge > 0 && (
                  <span style={{
                    background: C.amber, color: "#fff",
                    borderRadius: 10, padding: "1px 7px",
                    fontSize: 10, fontWeight: 800,
                  }}>{badge}</span>
                )}
              </button>
            ))}
          </nav>

          <div style={{
            padding: "14px 10px",
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}>
            <button
              onClick={onHome}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 12,
                padding: "10px 14px", borderRadius: 10, border: "none",
                background: "transparent", color: "rgba(255,255,255,0.35)",
                fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
                transition: "color 0.15s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.35)"; }}
            >
              <Home size={15} /> Ver Sitio Web
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main style={{ flex: 1, overflowY: "auto", background: C.bg }}>
          {children}
        </main>
      </div>
    </div>
  );
}
