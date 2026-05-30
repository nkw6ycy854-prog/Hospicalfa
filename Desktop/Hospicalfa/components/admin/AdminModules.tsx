"use client";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Plus, Eye, Edit, Download, FileText,
  Activity, Package, CheckCircle, AlertTriangle,
  DollarSign, TrendingUp, CreditCard, BarChart2,
  Globe, Truck, Bell, Users, Shield, Hash, Layers,
  Search, Phone, Mail, type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { MetricCard } from "@/components/ui/MetricCard";
import {
  COLORS as C, ORDERS, CUSTOMERS, PRODUCTS,
  STOCK_ALERTS, REVENUE,
} from "@/lib/data";
import { fmt, stockColor } from "@/lib/utils";

// ─── SHARED: admin section header ─────────────────────────────────────────────
function SectionHeader({
  title, sub, action,
}: {
  title: string;
  sub?: string;
  action?: React.ReactNode;
}) {
  return (
    <div style={{
      padding: "22px 32px", background: C.white,
      borderBottom: `1px solid ${C.border}`,
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.navy }}>{title}</h1>
        {sub && <p style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>{sub}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

// ─── ORDERS ───────────────────────────────────────────────────────────────────
export function AdminOrders() {
  const stats = [
    { l: "Total",        v: ORDERS.length,                                    c: C.navy  },
    { l: "Entregados",   v: ORDERS.filter(o => o.status === "Entregado").length,   c: C.green },
    { l: "En Tránsito",  v: ORDERS.filter(o => o.status === "En tránsito").length, c: C.teal  },
    { l: "Procesando",   v: ORDERS.filter(o => o.status === "Procesando").length,  c: C.amber },
    { l: "Cancelados",   v: ORDERS.filter(o => o.status === "Cancelado").length,   c: C.red   },
  ];

  return (
    <div>
      <SectionHeader
        title="Gestión de Pedidos"
        sub={`${ORDERS.length} pedidos recientes`}
        action={
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: 10, border: "none", background: C.navy, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            <Plus size={14} /> Nuevo Pedido
          </button>
        }
      />
      <div style={{ padding: "24px 32px" }}>
        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12, marginBottom: 22 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: C.white, borderRadius: 12, padding: "16px 18px", border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.4px", fontWeight: 600 }}>{s.l}</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: s.c }}>{s.v}</div>
            </div>
          ))}
        </div>

        <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
          <table>
            <thead>
              <tr style={{ background: C.bg, borderBottom: `1px solid ${C.border}` }}>
                {["Pedido", "Cliente", "Provincia", "Items", "Fecha", "Total", "Estado", "Acciones"].map(h => (
                  <th key={h} style={{ padding: "11px 18px", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.4px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ORDERS.map((o, i) => (
                <tr
                  key={i}
                  style={{ borderBottom: i < ORDERS.length - 1 ? `1px solid ${C.border}` : "none", cursor: "pointer" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLTableRowElement).style.background = C.bg; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLTableRowElement).style.background = "transparent"; }}
                >
                  <td style={{ padding: "12px 18px", fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: C.teal }}>{o.id}</td>
                  <td style={{ padding: "12px 18px", fontSize: 13, fontWeight: 600, color: C.txt }}>{o.client}</td>
                  <td style={{ padding: "12px 18px", fontSize: 12, color: C.muted }}>{o.prov}</td>
                  <td style={{ padding: "12px 18px", fontSize: 13, fontWeight: 600 }}>{o.items}</td>
                  <td style={{ padding: "12px 18px", fontSize: 12, color: C.muted }}>{o.date}</td>
                  <td style={{ padding: "12px 18px", fontSize: 14, fontWeight: 800, color: C.navy }}>{fmt(o.total)}</td>
                  <td style={{ padding: "12px 18px" }}><Badge status={o.status} /></td>
                  <td style={{ padding: "12px 18px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button style={{ padding: "6px", borderRadius: 6, border: "none", background: C.tealLt, cursor: "pointer", display: "flex" }}><Eye size={13} color={C.tealDk} /></button>
                      <button style={{ padding: "6px", borderRadius: 6, border: "none", background: "#EFF6FF", cursor: "pointer", display: "flex" }}><Edit size={13} color={C.navy} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── INVENTORY ────────────────────────────────────────────────────────────────
export function AdminInventory() {
  return (
    <div>
      <SectionHeader title="Control de Inventario" sub="Monitoreo en tiempo real del stock" />
      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 22 }}>
          {[
            { l: "Total Productos", v: PRODUCTS.length, c: C.navy,  I: <Package size={20} color={C.navy} /> },
            { l: "Stock Crítico",   v: STOCK_ALERTS.filter(a => a.s === "critical").length, c: C.red,   I: <AlertTriangle size={20} color={C.red} /> },
            { l: "Stock Bajo",      v: STOCK_ALERTS.filter(a => a.s === "low").length,      c: C.amber, I: <Activity size={20} color={C.amber} /> },
            { l: "Stock Normal",    v: PRODUCTS.length - STOCK_ALERTS.length,               c: C.green, I: <CheckCircle size={20} color={C.green} /> },
          ].map((s, i) => (
            <div key={i} style={{ background: C.white, borderRadius: 14, padding: "18px 22px", border: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 11, color: C.muted, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.4px", fontWeight: 600 }}>{s.l}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: s.c }}>{s.v}</div>
              </div>
              {s.I}
            </div>
          ))}
        </div>

        <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, padding: "24px", marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: C.navy, marginBottom: 18 }}>Stock por Producto (Top 8)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={PRODUCTS.slice(0, 8).map(p => ({ name: p.icon + " " + p.name.substring(0, 13), stock: p.stock, min: 40 }))}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: C.muted }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: C.muted }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 12 }} />
              <Bar dataKey="stock" radius={[5, 5, 0, 0]} name="Stock actual"
                fill={C.teal}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
          <div style={{ padding: "18px 22px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: C.navy }}>⚠ Productos con Alerta</h3>
            <button style={{ background: C.navy, color: "#fff", border: "none", borderRadius: 9, padding: "8px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              Reponer Todo
            </button>
          </div>
          <table>
            <thead>
              <tr style={{ background: C.bg, borderBottom: `1px solid ${C.border}` }}>
                {["Producto", "Stock Actual", "Stock Mínimo", "Déficit", "Estado", "Acción"].map(h => (
                  <th key={h} style={{ padding: "11px 22px", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.4px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {STOCK_ALERTS.map((a, i) => (
                <tr key={i} style={{ borderBottom: i < STOCK_ALERTS.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <td style={{ padding: "13px 22px", fontSize: 13, fontWeight: 700, color: C.txt }}>{a.prod}</td>
                  <td style={{ padding: "13px 22px" }}>
                    <span style={{ fontSize: 18, fontWeight: 800, color: stockColor(a.stock, a.min) }}>{a.stock}</span>
                    <span style={{ fontSize: 11, color: C.muted }}> uds</span>
                  </td>
                  <td style={{ padding: "13px 22px", fontSize: 13, color: C.muted }}>{a.min} uds</td>
                  <td style={{ padding: "13px 22px", fontSize: 14, fontWeight: 700, color: C.red }}>
                    −{a.min - a.stock}
                  </td>
                  <td style={{ padding: "13px 22px" }}>
                    <span style={{
                      padding: "4px 10px", borderRadius: 12,
                      background: a.s === "critical" ? "#FEE2E2" : "#FEF3C7",
                      color: a.s === "critical" ? C.red : "#92400E",
                      fontSize: 11, fontWeight: 700,
                    }}>
                      {a.s === "critical" ? "🔴 Crítico" : "🟡 Bajo"}
                    </span>
                  </td>
                  <td style={{ padding: "13px 22px" }}>
                    <button style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: C.navy, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                      Reponer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── FINANCE ──────────────────────────────────────────────────────────────────
export function AdminFinance() {
  return (
    <div>
      <SectionHeader
        title="Módulo Financiero"
        sub="Análisis de ingresos y rentabilidad"
        action={
          <div style={{ display: "flex", gap: 10 }}>
            {[{ I: FileText, l: "PDF" }, { I: Download, l: "Excel" }].map(({ I, l }) => (
              <button key={l} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.white, fontSize: 13, fontWeight: 600, cursor: "pointer", color: C.txt, fontFamily: "inherit" }}>
                <I size={14} />{l}
              </button>
            ))}
          </div>
        }
      />
      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 22 }}>
          <MetricCard icon={DollarSign} label="Ingresos Anuales" value="RD$6.46M" change={18.2} color={C.teal} />
          <MetricCard icon={TrendingUp} label="Ganancias Netas"  value="RD$2.03M" change={22.4} color={C.green} />
          <MetricCard icon={CreditCard} label="Ticket Promedio"  value="RD$2,632" change={4.1}  color={C.navy} />
          <MetricCard icon={BarChart2}  label="Margen Utilidad"  value="31.4%"    change={2.8}  color="#7C3AED" />
        </div>

        <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, padding: "24px", marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: C.navy, marginBottom: 18 }}>
            Ingresos y Ganancias Mensuales 2026
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={REVENUE} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
              <XAxis dataKey="m" tick={{ fontSize: 11, fill: C.muted }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: C.muted }} axisLine={false} tickLine={false} />
              <Tooltip
                formatter={(v: number) => [`RD$${v}K`, ""]}
                contentStyle={{ borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 12 }}
              />
              <Bar dataKey="i" fill={C.teal}  radius={[4, 4, 0, 0]} name="Ingresos" />
              <Bar dataKey="g" fill={C.green} radius={[4, 4, 0, 0]} name="Ganancias" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
          <div style={{ padding: "18px 22px", borderBottom: `1px solid ${C.border}` }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: C.navy }}>Desglose Mensual 2026</h3>
          </div>
          <table>
            <thead>
              <tr style={{ background: C.bg, borderBottom: `1px solid ${C.border}` }}>
                {["Mes", "Ingresos", "Ganancias", "Pedidos", "Margen"].map(h => (
                  <th key={h} style={{ padding: "11px 24px", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.4px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {REVENUE.map((r, i) => {
                const margin = (r.g / r.i) * 100;
                return (
                  <tr
                    key={i}
                    style={{ borderBottom: i < REVENUE.length - 1 ? `1px solid ${C.border}` : "none", background: i % 2 === 0 ? C.white : C.bg }}
                  >
                    <td style={{ padding: "12px 24px", fontSize: 13, fontWeight: 700, color: C.txt }}>{r.m} 2026</td>
                    <td style={{ padding: "12px 24px", fontSize: 14, fontWeight: 700, color: C.navy }}>RD${r.i}K</td>
                    <td style={{ padding: "12px 24px", fontSize: 14, fontWeight: 700, color: C.green }}>RD${r.g}K</td>
                    <td style={{ padding: "12px 24px", fontSize: 13, color: C.txt }}>{r.p}</td>
                    <td style={{ padding: "12px 24px" }}>
                      <span style={{
                        fontSize: 13, fontWeight: 700,
                        color: margin > 30 ? C.green : margin > 25 ? C.amber : C.red,
                      }}>
                        {margin.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── CUSTOMERS ────────────────────────────────────────────────────────────────
export function AdminCustomers() {
  return (
    <div>
      <SectionHeader
        title="Gestión de Clientes"
        sub={`${CUSTOMERS.length} clientes registrados`}
        action={
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: 10, border: "none", background: C.navy, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            <Plus size={14} /> Nuevo Cliente
          </button>
        }
      />
      <div style={{ padding: "24px 32px" }}>
        {/* Summary metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 22 }}>
          {[
            { l: "Total Clientes",    v: CUSTOMERS.length,                                       c: C.navy  },
            { l: "Valor Total",       v: `RD$${(CUSTOMERS.reduce((s,c)=>s+c.total,0)/1000).toFixed(0)}K`, c: C.green },
            { l: "Pedidos Totales",   v: CUSTOMERS.reduce((s, c) => s + c.orders, 0),             c: C.teal  },
          ].map((s, i) => (
            <div key={i} style={{ background: C.white, borderRadius: 14, padding: "18px 22px", border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.4px", fontWeight: 600 }}>{s.l}</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: s.c }}>{s.v}</div>
            </div>
          ))}
        </div>

        <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
          <table>
            <thead>
              <tr style={{ background: C.bg, borderBottom: `1px solid ${C.border}` }}>
                {["Cliente", "Contacto", "Teléfono", "Provincia", "Tipo", "Pedidos", "Total", "Desde", "Acciones"].map(h => (
                  <th key={h} style={{ padding: "11px 16px", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.4px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CUSTOMERS.map((c, i) => (
                <tr
                  key={i}
                  style={{ borderBottom: i < CUSTOMERS.length - 1 ? `1px solid ${C.border}` : "none", cursor: "pointer" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLTableRowElement).style.background = C.bg; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLTableRowElement).style.background = "transparent"; }}
                >
                  <td style={{ padding: "13px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 9, background: C.tealLt, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: C.tealDk, flexShrink: 0 }}>
                        {c.n.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: C.txt }}>{c.n}</div>
                        <div style={{ fontSize: 11, color: C.muted }}>{c.e}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "13px 16px", fontSize: 13, color: C.txt }}>{c.c}</td>
                  <td style={{ padding: "13px 16px", fontSize: 12, color: C.muted }}>{c.phone}</td>
                  <td style={{ padding: "13px 16px", fontSize: 12, color: C.muted }}>{c.prov}</td>
                  <td style={{ padding: "13px 16px" }}>
                    <span style={{ background: C.tealLt, color: C.tealDk, padding: "3px 10px", borderRadius: 12, fontSize: 11, fontWeight: 700 }}>{c.t}</span>
                  </td>
                  <td style={{ padding: "13px 16px", fontSize: 14, fontWeight: 700, textAlign: "center" }}>{c.orders}</td>
                  <td style={{ padding: "13px 16px", fontSize: 13, fontWeight: 800, color: C.navy }}>{fmt(c.total)}</td>
                  <td style={{ padding: "13px 16px", fontSize: 12, color: C.muted }}>{c.since}</td>
                  <td style={{ padding: "13px 16px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button style={{ padding: "6px", borderRadius: 6, border: "none", background: C.tealLt, cursor: "pointer", display: "flex" }}><Eye size={13} color={C.tealDk} /></button>
                      <button style={{ padding: "6px", borderRadius: 6, border: "none", background: "#EFF6FF", cursor: "pointer", display: "flex" }}><Edit size={13} color={C.navy} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── SETTINGS ─────────────────────────────────────────────────────────────────
interface SettingItem { I: LucideIcon; t: string; d: string; tag?: string }
const SETTINGS_ITEMS: SettingItem[] = [
  { I: Globe,    t: "Información de la Empresa", d: "Nombre, RNC, dirección, logo y datos de contacto", tag: "General"   },
  { I: CreditCard, t: "Métodos de Pago",         d: "Tarjeta (Cardnet/Azul), transferencia bancaria, efectivo", tag: "Pagos" },
  { I: Truck,    t: "Tarifas de Envío",           d: "Configurar precios por provincia, peso y volumen", tag: "Envíos"    },
  { I: Bell,     t: "Notificaciones",             d: "Email automáticos, SMS y mensajes de WhatsApp",    tag: "Comms"     },
  { I: Users,    t: "Usuarios y Roles",           d: "Gestionar administradores, vendedores y empleados", tag: "Acceso"   },
  { I: Shield,   t: "Seguridad",                  d: "Contraseñas, autenticación 2FA y sesiones activas", tag: "Seguridad" },
  { I: Hash,     t: "SKU y Numeración",           d: "Prefijos, numeración automática y códigos de barras", tag: "Config" },
  { I: Layers,   t: "Categorías",                 d: "Gestionar categorías, subcategorías e íconos",      tag: "Config"   },
];

export function AdminSettings() {
  return (
    <div>
      <SectionHeader title="Configuración del Sistema" sub="Ajustes generales de la plataforma" />
      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16, maxWidth: 860 }}>
          {SETTINGS_ITEMS.map(({ I, t, d, tag }, i) => (
            <div
              key={i}
              style={{
                background: C.white, borderRadius: 14,
                border: `1px solid ${C.border}`,
                padding: "22px", cursor: "pointer",
                transition: "all 0.18s",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = C.teal;
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 6px 20px rgba(13,153,204,0.12)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = C.border;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: C.navyLt, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <I size={18} color={C.navy} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.navy }}>{t}</div>
                </div>
                {tag && (
                  <span style={{ background: C.bg, color: C.muted, padding: "2px 8px", borderRadius: 8, fontSize: 10, fontWeight: 700 }}>
                    {tag}
                  </span>
                )}
              </div>
              <p style={{ fontSize: 13, color: C.muted, marginBottom: 14, lineHeight: 1.6 }}>{d}</p>
              <div style={{ fontSize: 13, color: C.teal, fontWeight: 600 }}>Configurar →</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
