"use client";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { DollarSign, TrendingUp, ShoppingCart, Users, Plus, Download, ArrowUpRight } from "lucide-react";
import { MetricCard } from "@/components/ui/MetricCard";
import { Badge } from "@/components/ui/Badge";
import { COLORS as C, ORDERS, PIE_DATA, PIE_COLORS, REVENUE, STOCK_ALERTS } from "@/lib/data";
import { fmt } from "@/lib/utils";

export function Dashboard() {
  return (
    <div>
      {/* HEADER */}
      <div style={{
        padding:"24px 32px", background:C.white, borderBottom:`1px solid ${C.border}`,
        display:"flex", justifyContent:"space-between", alignItems:"center",
      }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:800, color:C.navy, marginBottom:3 }}>Dashboard Principal</h1>
          <p style={{ fontSize:13, color:C.muted }}>Resumen ejecutivo · 21 de mayo de 2026</p>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button style={{
            display:"flex", alignItems:"center", gap:6, padding:"9px 16px",
            borderRadius:10, border:`1px solid ${C.border}`, background:C.white,
            fontSize:13, fontWeight:600, cursor:"pointer", color:C.txt,
          }}>
            <Download size={14} /> Exportar
          </button>
          <button style={{
            display:"flex", alignItems:"center", gap:6, padding:"9px 18px",
            borderRadius:10, border:"none", background:C.navy, color:"#fff",
            fontSize:13, fontWeight:700, cursor:"pointer",
          }}>
            <Plus size={14} /> Nuevo Pedido
          </button>
        </div>
      </div>

      <div style={{ padding:"24px 32px" }}>
        {/* KPI METRICS */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
          <MetricCard icon={DollarSign}   label="Ingresos del Mes"  value="RD$748K"  sub="Mayo 2026"     change={8.4}  color={C.teal}   />
          <MetricCard icon={TrendingUp}   label="Ganancias Netas"   value="RD$241K"  sub="32.2% margen"  change={12.1} color={C.green}  />
          <MetricCard icon={ShoppingCart} label="Pedidos Totales"   value="284"      sub="Este mes"       change={5.7}  color={C.navy}   />
          <MetricCard icon={Users}        label="Clientes Activos"  value="512"      sub="+18 este mes"   change={3.2}  color="#7C3AED"  />
        </div>

        {/* CHARTS ROW 1 */}
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:20, marginBottom:20 }}>
          {/* AREA CHART */}
          <div style={{
            background:C.white, borderRadius:16, border:`1px solid ${C.border}`,
            padding:"24px", boxShadow:"0 1px 4px rgba(0,0,0,0.04)",
          }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:18 }}>
              <div>
                <h3 style={{ fontSize:16, fontWeight:700, color:C.navy }}>Ingresos vs Ganancias 2026</h3>
                <p style={{ fontSize:12, color:C.muted }}>Últimos 12 meses en miles RD$</p>
              </div>
              <div style={{ display:"flex", gap:16, fontSize:12, alignItems:"center" }}>
                <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                  <div style={{ width:12, height:3, background:C.teal,  borderRadius:2 }}/>Ingresos
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                  <div style={{ width:12, height:3, background:C.green, borderRadius:2 }}/>Ganancias
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={210}>
              <AreaChart data={REVENUE}>
                <defs>
                  <linearGradient id="gi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={C.teal}  stopOpacity={0.14}/>
                    <stop offset="95%" stopColor={C.teal}  stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={C.green} stopOpacity={0.14}/>
                    <stop offset="95%" stopColor={C.green} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
                <XAxis dataKey="m" tick={{ fontSize:11, fill:C.muted }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fontSize:11, fill:C.muted }} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{ borderRadius:10, border:`1px solid ${C.border}`, fontSize:12 }}/>
                <Area type="monotone" dataKey="i" stroke={C.teal}  strokeWidth={2.5} fill="url(#gi)" name="Ingresos (K)"/>
                <Area type="monotone" dataKey="g" stroke={C.green} strokeWidth={2.5} fill="url(#gg)" name="Ganancias (K)"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* PIE CHART */}
          <div style={{
            background:C.white, borderRadius:16, border:`1px solid ${C.border}`,
            padding:"24px", boxShadow:"0 1px 4px rgba(0,0,0,0.04)",
          }}>
            <h3 style={{ fontSize:16, fontWeight:700, color:C.navy, marginBottom:4 }}>Ventas por Categoría</h3>
            <p style={{ fontSize:12, color:C.muted, marginBottom:14 }}>Distribución este mes</p>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="v" paddingAngle={3}>
                  {PIE_DATA.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]}/>)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius:10, fontSize:12 }}/>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ marginTop:8 }}>
              {PIE_DATA.map((d, i) => (
                <div key={i} style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:5 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ width:8, height:8, borderRadius:2, background:PIE_COLORS[i] }}/>
                    <span style={{ color:C.muted }}>{d.name}</span>
                  </div>
                  <span style={{ fontWeight:700 }}>{d.v}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ORDERS + ALERTS */}
        <div style={{ display:"grid", gridTemplateColumns:"3fr 2fr", gap:20 }}>
          {/* RECENT ORDERS */}
          <div style={{
            background:C.white, borderRadius:16, border:`1px solid ${C.border}`,
            overflow:"hidden", boxShadow:"0 1px 4px rgba(0,0,0,0.04)",
          }}>
            <div style={{
              padding:"18px 22px", borderBottom:`1px solid ${C.border}`,
              display:"flex", justifyContent:"space-between", alignItems:"center",
            }}>
              <h3 style={{ fontSize:16, fontWeight:700, color:C.navy }}>Pedidos Recientes</h3>
              <span style={{ fontSize:13, color:C.teal, fontWeight:600, cursor:"pointer" }}>Ver todos →</span>
            </div>
            {ORDERS.slice(0,5).map((o, i) => (
              <div key={i} style={{
                padding:"13px 22px",
                borderBottom: i < 4 ? `1px solid ${C.border}` : "none",
                display:"flex", gap:14, alignItems:"center",
              }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:C.txt }}>{o.client}</div>
                  <div style={{ fontSize:11, color:C.muted }}>{o.id} · {o.prov}</div>
                </div>
                <div style={{ textAlign:"right", marginRight:12 }}>
                  <div style={{ fontSize:14, fontWeight:700, color:C.navy }}>{fmt(o.total)}</div>
                  <div style={{ fontSize:11, color:C.muted }}>{o.date}</div>
                </div>
                <Badge status={o.status}/>
              </div>
            ))}
          </div>

          {/* STOCK ALERTS */}
          <div style={{
            background:C.white, borderRadius:16, border:`1px solid ${C.border}`,
            overflow:"hidden", boxShadow:"0 1px 4px rgba(0,0,0,0.04)",
          }}>
            <div style={{ padding:"18px 22px", borderBottom:`1px solid ${C.border}` }}>
              <h3 style={{ fontSize:16, fontWeight:700, color:C.navy }}>⚠ Alertas de Inventario</h3>
            </div>
            <div style={{ padding:14 }}>
              {STOCK_ALERTS.map((a, i) => (
                <div key={i} style={{
                  padding:"12px 14px", borderRadius:10, marginBottom:10,
                  background: a.s === "critical" ? "#FEF2F2" : "#FFFBEB",
                  border:`1px solid ${a.s==="critical" ? "#FECACA" : "#FDE68A"}`,
                }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div>
                      <div style={{ fontSize:13, fontWeight:700, color:C.txt }}>{a.prod}</div>
                      <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>
                        Stock: {a.stock} · Mín: {a.min}
                      </div>
                    </div>
                    <span style={{ fontSize:11, fontWeight:700, color:a.s==="critical"?C.red:"#92400E" }}>
                      {a.s==="critical" ? "🔴 Crítico" : "🟡 Bajo"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
