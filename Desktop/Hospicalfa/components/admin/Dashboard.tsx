"use client";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  DollarSign, TrendingUp, ShoppingCart, Users,
  Plus, Download, Package, AlertTriangle,
} from "lucide-react";
import { MetricCard } from "@/components/ui/MetricCard";
import { Badge } from "@/components/ui/Badge";
import { COLORS as C, ORDERS, PIE_DATA, PIE_COLORS, REVENUE, STOCK_ALERTS } from "@/lib/data";
import { fmt } from "@/lib/utils";

export function Dashboard() {
  return (
    <div>
      {/* ── HEADER ─────────────────────────────────────── */}
      <div style={{
        padding: "22px 32px", background: C.white,
        borderBottom: `1px solid ${C.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.navy, marginBottom: 3 }}>
            Dashboard Principal
          </h1>
          <p style={{ fontSize: 13, color: C.muted }}>
            Resumen ejecutivo · Mayo 2026
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{
            display: "flex", alignItems: "center", gap: 6, padding: "9px 16px",
            borderRadius: 10, border: `1px solid ${C.border}`, background: C.white,
            fontSize: 13, fontWeight: 600, cursor: "pointer", color: C.txt, fontFamily: "inherit",
          }}>
            <Download size={14} /> Exportar
          </button>
          <button style={{
            display: "flex", alignItems: "center", gap: 6, padding: "9px 18px",
            borderRadius: 10, border: "none", background: C.navy, color: "#fff",
            fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          }}>
            <Plus size={14} /> Nuevo Pedido
          </button>
        </div>
      </div>

      <div style={{ padding: "24px 32px" }}>

        {/* ── KPI METRICS ─────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
          <MetricCard icon={DollarSign}   label="Ingresos del Mes"  value="RD$748K"  sub="Mayo 2026"      change={8.4}  color={C.teal}  />
          <MetricCard icon={TrendingUp}   label="Ganancias Netas"   value="RD$241K"  sub="32.2% margen"   change={12.1} color={C.green} />
          <MetricCard icon={ShoppingCart} label="Pedidos Totales"   value="284"      sub="Este mes"        change={5.7}  color={C.navy}  />
          <MetricCard icon={Users}        label="Clientes Activos"  value="512"      sub="+18 este mes"    change={3.2}  color="#7C3AED" />
        </div>

        {/* ── SECONDARY METRICS ───────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
          {[
            { label: "Ticket Promedio",    value: "RD$2,632", color: C.teal  },
            { label: "Tasa Conversión",    value: "3.8%",      color: C.green },
            { label: "Pedidos Pendientes", value: "43",        color: C.amber },
            { label: "Productos Agotados", value: "0",         color: C.red   },
          ].map((m, i) => (
            <div key={i} style={{
              background: C.white, borderRadius: 12, padding: "16px 20px",
              border: `1px solid ${C.border}`,
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div>
                <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.4px" }}>{m.label}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: m.color }}>{m.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── CHARTS ROW ──────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 20 }}>

          {/* Area chart */}
          <div style={{
            background: C.white, borderRadius: 16, border: `1px solid ${C.border}`,
            padding: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18, alignItems: "flex-start" }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: C.navy }}>Ingresos vs Ganancias 2026</h3>
                <p style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>Últimos 12 meses en miles RD$</p>
              </div>
              <div style={{ display: "flex", gap: 16, fontSize: 12, alignItems: "center" }}>
                {[{ c: C.teal, l: "Ingresos" }, { c: C.green, l: "Ganancias" }].map(({ c, l }) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 14, height: 3, background: c, borderRadius: 2 }} />
                    <span style={{ color: C.muted }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={210}>
              <AreaChart data={REVENUE} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="gi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={C.teal}  stopOpacity={0.14} />
                    <stop offset="95%" stopColor={C.teal}  stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={C.green} stopOpacity={0.14} />
                    <stop offset="95%" stopColor={C.green} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 11, fill: C.muted }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: C.muted }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 12 }}
                  formatter={(v: number) => [`RD$${v}K`, ""]}
                />
                <Area type="monotone" dataKey="i" stroke={C.teal}  strokeWidth={2.5} fill="url(#gi)" name="Ingresos" />
                <Area type="monotone" dataKey="g" stroke={C.green} strokeWidth={2.5} fill="url(#gg)" name="Ganancias" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Pie chart */}
          <div style={{
            background: C.white, borderRadius: 16, border: `1px solid ${C.border}`,
            padding: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: C.navy, marginBottom: 4 }}>Ventas por Categoría</h3>
            <p style={{ fontSize: 12, color: C.muted, marginBottom: 14 }}>Distribución este mes</p>
            <ResponsiveContainer width="100%" height={148}>
              <PieChart>
                <Pie
                  data={PIE_DATA} cx="50%" cy="50%"
                  innerRadius={38} outerRadius={68}
                  dataKey="v" paddingAngle={3}
                >
                  {PIE_DATA.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: 10, fontSize: 12 }}
                  formatter={(v: number) => [`${v}%`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ marginTop: 8 }}>
              {PIE_DATA.map((d, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: PIE_COLORS[i] }} />
                    <span style={{ color: C.muted }}>{d.name}</span>
                  </div>
                  <span style={{ fontWeight: 700, color: C.txt }}>{d.v}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── ORDERS + ALERTS ─────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 20 }}>

          {/* Recent orders */}
          <div style={{
            background: C.white, borderRadius: 16, border: `1px solid ${C.border}`,
            overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}>
            <div style={{
              padding: "18px 22px", borderBottom: `1px solid ${C.border}`,
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: C.navy }}>Pedidos Recientes</h3>
              <span style={{ fontSize: 13, color: C.teal, fontWeight: 600, cursor: "pointer" }}>Ver todos →</span>
            </div>
            {ORDERS.slice(0, 6).map((o, i) => (
              <div key={i} style={{
                padding: "12px 22px",
                borderBottom: i < 5 ? `1px solid ${C.border}` : "none",
                display: "flex", gap: 12, alignItems: "center",
                transition: "background 0.15s", cursor: "pointer",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = C.bg; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
              >
                <div style={{
                  width: 34, height: 34, borderRadius: 9,
                  background: C.navyLt,
                  display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 11,
                  fontWeight: 800, color: C.navy, flexShrink: 0,
                }}>
                  {o.client.charAt(0)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.txt, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{o.client}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{o.id} · {o.prov} · {o.items} items</div>
                </div>
                <div style={{ textAlign: "right", marginRight: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>{fmt(o.total)}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{o.date}</div>
                </div>
                <Badge status={o.status} />
              </div>
            ))}
          </div>

          {/* Stock alerts */}
          <div style={{
            background: C.white, borderRadius: 16, border: `1px solid ${C.border}`,
            overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}>
            <div style={{
              padding: "18px 22px", borderBottom: `1px solid ${C.border}`,
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: C.navy }}>
                ⚠ Alertas de Inventario
              </h3>
              <span style={{
                background: "#FEE2E2", color: C.red,
                fontSize: 11, fontWeight: 700, padding: "2px 8px",
                borderRadius: 10,
              }}>
                {STOCK_ALERTS.length}
              </span>
            </div>
            <div style={{ padding: 14 }}>
              {STOCK_ALERTS.map((a, i) => (
                <div key={i} style={{
                  padding: "12px 14px", borderRadius: 10, marginBottom: 10,
                  background: a.s === "critical" ? "#FEF2F2" : "#FFFBEB",
                  border: `1px solid ${a.s === "critical" ? "#FECACA" : "#FDE68A"}`,
                  cursor: "pointer",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: C.txt, marginBottom: 3 }}>{a.prod}</div>
                      <div style={{ fontSize: 11, color: C.muted }}>
                        Stock: <strong>{a.stock}</strong> · Mínimo: {a.min}
                      </div>
                      {/* Progress bar */}
                      <div style={{
                        marginTop: 8, height: 4, background: "#E2E8F0",
                        borderRadius: 2, overflow: "hidden",
                      }}>
                        <div style={{
                          height: "100%",
                          width: `${Math.min(100, (a.stock / a.min) * 100)}%`,
                          background: a.s === "critical" ? C.red : C.amber,
                          borderRadius: 2,
                          transition: "width 0.5s",
                        }} />
                      </div>
                    </div>
                    <span style={{
                      fontSize: 10, fontWeight: 700, marginLeft: 10, flexShrink: 0,
                      color: a.s === "critical" ? C.red : "#92400E",
                    }}>
                      {a.s === "critical" ? "🔴 Crítico" : "🟡 Bajo"}
                    </span>
                  </div>
                </div>
              ))}
              <button style={{
                width: "100%", background: C.navyLt, border: "none",
                borderRadius: 10, padding: "10px", fontSize: 13,
                fontWeight: 700, color: C.navy, cursor: "pointer", fontFamily: "inherit",
              }}>
                Ver Inventario Completo →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
