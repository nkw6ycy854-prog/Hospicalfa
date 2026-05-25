"use client";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Plus, Eye, Edit, Download, FileText, Activity, Package, CheckCircle, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { MetricCard } from "@/components/ui/MetricCard";
import {
  COLORS as C, ORDERS, CUSTOMERS, PRODUCTS, STOCK_ALERTS, REVENUE,
  type Order,
} from "@/lib/data";
import { fmt, stockColor } from "@/lib/utils";
import {
  DollarSign, TrendingUp, CreditCard, BarChart2,
  Globe, Truck, Bell, Users, Shield, Hash, Layers,
  type LucideIcon,
} from "lucide-react";

// ── ORDERS ────────────────────────────────────────────────────────────────────
export function AdminOrders() {
  const stats = [
    { l:"Total",       v:ORDERS.length,                              c:C.navy  },
    { l:"Entregados",  v:ORDERS.filter(o=>o.status==="Entregado").length,   c:C.green },
    { l:"En Tránsito", v:ORDERS.filter(o=>o.status==="En tránsito").length, c:C.teal  },
    { l:"Cancelados",  v:ORDERS.filter(o=>o.status==="Cancelado").length,   c:C.red   },
  ];
  return (
    <div>
      <div style={{ padding:"24px 32px", background:C.white, borderBottom:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:800, color:C.navy }}>Gestión de Pedidos</h1>
          <p style={{ fontSize:13, color:C.muted }}>{ORDERS.length} pedidos recientes</p>
        </div>
        <button style={{ display:"flex", alignItems:"center", gap:6, padding:"9px 18px", borderRadius:10, border:"none", background:C.navy, color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer" }}>
          <Plus size={14}/> Nuevo Pedido
        </button>
      </div>
      <div style={{ padding:"24px 32px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:22 }}>
          {stats.map((s,i) => (
            <div key={i} style={{ background:C.white, borderRadius:14, padding:"18px 22px", border:`1px solid ${C.border}` }}>
              <div style={{ fontSize:12, color:C.muted, marginBottom:5 }}>{s.l}</div>
              <div style={{ fontSize:28, fontWeight:800, color:s.c }}>{s.v}</div>
            </div>
          ))}
        </div>
        <div style={{ background:C.white, borderRadius:16, border:`1px solid ${C.border}`, overflow:"hidden" }}>
          <table>
            <thead>
              <tr style={{ background:C.bg, borderBottom:`1px solid ${C.border}` }}>
                {["Pedido","Cliente","Provincia","Fecha","Total","Estado","Acción"].map(h=>(
                  <th key={h} style={{ padding:"11px 20px", fontSize:11, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:"0.4px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ORDERS.map((o,i) => (
                <tr key={i} style={{ borderBottom:i<ORDERS.length-1?`1px solid ${C.border}`:"none" }}>
                  <td style={{ padding:"13px 20px", fontFamily:"monospace", fontSize:12, fontWeight:700, color:C.navy }}>{o.id}</td>
                  <td style={{ padding:"13px 20px", fontSize:13, fontWeight:600, color:C.txt }}>{o.client}</td>
                  <td style={{ padding:"13px 20px", fontSize:12, color:C.muted }}>{o.prov}</td>
                  <td style={{ padding:"13px 20px", fontSize:12, color:C.muted }}>{o.date}</td>
                  <td style={{ padding:"13px 20px", fontSize:14, fontWeight:800, color:C.navy }}>{fmt(o.total)}</td>
                  <td style={{ padding:"13px 20px" }}><Badge status={o.status}/></td>
                  <td style={{ padding:"13px 20px" }}>
                    <div style={{ display:"flex", gap:6 }}>
                      <button style={{ padding:"6px", borderRadius:6, border:"none", background:C.tealLt, cursor:"pointer", display:"flex" }}><Eye size={13} color={C.tealDk}/></button>
                      <button style={{ padding:"6px", borderRadius:6, border:"none", background:"#EFF6FF", cursor:"pointer", display:"flex" }}><Edit size={13} color={C.navy}/></button>
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

// ── INVENTORY ─────────────────────────────────────────────────────────────────
export function AdminInventory() {
  return (
    <div>
      <div style={{ padding:"24px 32px", background:C.white, borderBottom:`1px solid ${C.border}` }}>
        <h1 style={{ fontSize:22, fontWeight:800, color:C.navy }}>Control de Inventario</h1>
        <p style={{ fontSize:13, color:C.muted }}>Monitoreo en tiempo real del stock</p>
      </div>
      <div style={{ padding:"24px 32px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:22 }}>
          {[
            { l:"Total Productos", v:PRODUCTS.length, c:C.navy,  I:<Package size={20} color={C.navy}/> },
            { l:"Stock Crítico",   v:STOCK_ALERTS.filter(a=>a.s==="critical").length, c:C.red,   I:<AlertTriangle size={20} color={C.red}/> },
            { l:"Stock Bajo",      v:STOCK_ALERTS.filter(a=>a.s==="low").length,      c:C.amber, I:<Activity size={20} color={C.amber}/> },
            { l:"Stock Normal",    v:PRODUCTS.length-STOCK_ALERTS.length, c:C.green, I:<CheckCircle size={20} color={C.green}/> },
          ].map((s,i) => (
            <div key={i} style={{ background:C.white, borderRadius:14, padding:"18px 22px", border:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <div style={{ fontSize:12, color:C.muted, marginBottom:5 }}>{s.l}</div>
                <div style={{ fontSize:28, fontWeight:800, color:s.c }}>{s.v}</div>
              </div>
              {s.I}
            </div>
          ))}
        </div>

        <div style={{ background:C.white, borderRadius:16, border:`1px solid ${C.border}`, padding:"24px", marginBottom:20 }}>
          <h3 style={{ fontSize:16, fontWeight:700, color:C.navy, marginBottom:18 }}>Stock por Producto (Top 8)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={PRODUCTS.slice(0,8).map(p=>({ name:p.icon+" "+p.name.substring(0,14), stock:p.stock }))}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
              <XAxis dataKey="name" tick={{ fontSize:9, fill:C.muted }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fontSize:11, fill:C.muted }} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{ borderRadius:10, border:`1px solid ${C.border}`, fontSize:12 }}/>
              <Bar dataKey="stock" fill={C.teal} radius={[5,5,0,0]} name="Stock actual"/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background:C.white, borderRadius:16, border:`1px solid ${C.border}`, overflow:"hidden" }}>
          <div style={{ padding:"18px 22px", borderBottom:`1px solid ${C.border}` }}>
            <h3 style={{ fontSize:16, fontWeight:700, color:C.navy }}>⚠ Productos con Alerta</h3>
          </div>
          <table>
            <thead>
              <tr style={{ background:C.bg, borderBottom:`1px solid ${C.border}` }}>
                {["Producto","Stock Actual","Stock Mínimo","Déficit","Estado","Acción"].map(h=>(
                  <th key={h} style={{ padding:"11px 22px", fontSize:11, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:"0.4px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {STOCK_ALERTS.map((a,i) => (
                <tr key={i} style={{ borderBottom:i<STOCK_ALERTS.length-1?`1px solid ${C.border}`:"none" }}>
                  <td style={{ padding:"13px 22px", fontSize:13, fontWeight:700, color:C.txt }}>{a.prod}</td>
                  <td style={{ padding:"13px 22px", fontSize:16, fontWeight:800, color:a.s==="critical"?C.red:C.amber }}>{a.stock}</td>
                  <td style={{ padding:"13px 22px", fontSize:13, color:C.muted }}>{a.min}</td>
                  <td style={{ padding:"13px 22px", fontSize:13, fontWeight:700, color:C.red }}>-{a.min-a.stock}</td>
                  <td style={{ padding:"13px 22px" }}>
                    <span style={{ padding:"4px 10px", borderRadius:12, background:a.s==="critical"?"#FEE2E2":"#FEF3C7", color:a.s==="critical"?C.red:"#92400E", fontSize:11, fontWeight:700 }}>
                      {a.s==="critical"?"🔴 Crítico":"🟡 Bajo"}
                    </span>
                  </td>
                  <td style={{ padding:"13px 22px" }}>
                    <button style={{ padding:"7px 14px", borderRadius:8, border:"none", background:C.navy, color:"#fff", fontSize:12, fontWeight:700, cursor:"pointer" }}>Reponer</button>
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

// ── FINANCE ───────────────────────────────────────────────────────────────────
export function AdminFinance() {
  return (
    <div>
      <div style={{ padding:"24px 32px", background:C.white, borderBottom:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:800, color:C.navy }}>Módulo Financiero</h1>
          <p style={{ fontSize:13, color:C.muted }}>Análisis de ingresos y rentabilidad</p>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          {[{I:FileText,l:"PDF"},{I:Download,l:"Excel"}].map(({I,l}) => (
            <button key={l} style={{ display:"flex", alignItems:"center", gap:6, padding:"9px 16px", borderRadius:10, border:`1px solid ${C.border}`, background:C.white, fontSize:13, fontWeight:600, cursor:"pointer", color:C.txt }}>
              <I size={14}/>{l}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding:"24px 32px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:22 }}>
          <MetricCard icon={DollarSign} label="Ingresos Anuales" value="RD$6.46M" change={18.2} color={C.teal}/>
          <MetricCard icon={TrendingUp} label="Ganancias Netas"  value="RD$2.03M" change={22.4} color={C.green}/>
          <MetricCard icon={CreditCard} label="Ticket Promedio"  value="RD$2,632" change={4.1}  color={C.navy}/>
          <MetricCard icon={BarChart2}  label="Margen Utilidad"  value="31.4%"    change={2.8}  color="#7C3AED"/>
        </div>
        <div style={{ background:C.white, borderRadius:16, border:`1px solid ${C.border}`, padding:"24px", marginBottom:20 }}>
          <h3 style={{ fontSize:16, fontWeight:700, color:C.navy, marginBottom:18 }}>Ingresos y Ganancias Mensuales 2026</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={REVENUE}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
              <XAxis dataKey="m" tick={{ fontSize:11, fill:C.muted }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fontSize:11, fill:C.muted }} axisLine={false} tickLine={false}/>
              <Tooltip formatter={(v)=>[`RD$${v}K`,""]} contentStyle={{ borderRadius:10, border:`1px solid ${C.border}`, fontSize:12 }}/>
              <Bar dataKey="i" fill={C.teal}  radius={[4,4,0,0]} name="Ingresos"/>
              <Bar dataKey="g" fill={C.green} radius={[4,4,0,0]} name="Ganancias"/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background:C.white, borderRadius:16, border:`1px solid ${C.border}`, overflow:"hidden" }}>
          <div style={{ padding:"18px 22px", borderBottom:`1px solid ${C.border}` }}>
            <h3 style={{ fontSize:16, fontWeight:700, color:C.navy }}>Desglose Mensual 2026</h3>
          </div>
          <table>
            <thead>
              <tr style={{ background:C.bg, borderBottom:`1px solid ${C.border}` }}>
                {["Mes","Ingresos","Ganancias","Pedidos","Margen"].map(h=>(
                  <th key={h} style={{ padding:"11px 24px", fontSize:11, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:"0.4px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {REVENUE.map((r,i) => (
                <tr key={i} style={{ borderBottom:i<REVENUE.length-1?`1px solid ${C.border}`:"none", background:i%2===0?C.white:C.bg }}>
                  <td style={{ padding:"12px 24px", fontSize:13, fontWeight:700, color:C.txt }}>{r.m} 2026</td>
                  <td style={{ padding:"12px 24px", fontSize:14, fontWeight:700, color:C.navy }}>RD${r.i}K</td>
                  <td style={{ padding:"12px 24px", fontSize:14, fontWeight:700, color:C.green }}>RD${r.g}K</td>
                  <td style={{ padding:"12px 24px", fontSize:13, color:C.txt }}>{r.p}</td>
                  <td style={{ padding:"12px 24px", fontSize:14, fontWeight:700, color:(r.g/r.i*100)>30?C.green:C.amber }}>{(r.g/r.i*100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── CUSTOMERS ─────────────────────────────────────────────────────────────────
export function AdminCustomers() {
  return (
    <div>
      <div style={{ padding:"24px 32px", background:C.white, borderBottom:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:800, color:C.navy }}>Gestión de Clientes</h1>
          <p style={{ fontSize:13, color:C.muted }}>{CUSTOMERS.length} clientes registrados</p>
        </div>
        <button style={{ display:"flex", alignItems:"center", gap:6, padding:"9px 18px", borderRadius:10, border:"none", background:C.navy, color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer" }}>
          <Plus size={14}/> Nuevo Cliente
        </button>
      </div>
      <div style={{ padding:"24px 32px" }}>
        <div style={{ background:C.white, borderRadius:16, border:`1px solid ${C.border}`, overflow:"hidden" }}>
          <table>
            <thead>
              <tr style={{ background:C.bg, borderBottom:`1px solid ${C.border}` }}>
                {["Cliente","Contacto","Provincia","Tipo","Pedidos","Total Compras","Acciones"].map(h=>(
                  <th key={h} style={{ padding:"11px 20px", fontSize:11, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:"0.4px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CUSTOMERS.map((c,i) => (
                <tr key={i} style={{ borderBottom:i<CUSTOMERS.length-1?`1px solid ${C.border}`:"none" }}>
                  <td style={{ padding:"14px 20px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:36, height:36, borderRadius:8, background:C.tealLt, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800, color:C.tealDk, flexShrink:0 }}>
                        {c.n.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontSize:13, fontWeight:700, color:C.txt }}>{c.n}</div>
                        <div style={{ fontSize:11, color:C.muted }}>{c.e}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding:"14px 20px", fontSize:13, color:C.txt }}>{c.c}</td>
                  <td style={{ padding:"14px 20px", fontSize:12, color:C.muted }}>{c.prov}</td>
                  <td style={{ padding:"14px 20px" }}>
                    <span style={{ background:C.tealLt, color:C.tealDk, padding:"3px 10px", borderRadius:12, fontSize:11, fontWeight:700 }}>{c.t}</span>
                  </td>
                  <td style={{ padding:"14px 20px", fontSize:14, fontWeight:700 }}>{c.orders}</td>
                  <td style={{ padding:"14px 20px", fontSize:14, fontWeight:800, color:C.navy }}>{fmt(c.total)}</td>
                  <td style={{ padding:"14px 20px" }}>
                    <div style={{ display:"flex", gap:6 }}>
                      <button style={{ padding:"6px", borderRadius:6, border:"none", background:C.tealLt, cursor:"pointer", display:"flex" }}><Eye size={13} color={C.tealDk}/></button>
                      <button style={{ padding:"6px", borderRadius:6, border:"none", background:"#EFF6FF", cursor:"pointer", display:"flex" }}><Edit size={13} color={C.navy}/></button>
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

// ── SETTINGS ──────────────────────────────────────────────────────────────────
interface SettingItem { I: LucideIcon; t: string; d: string; }
const SETTINGS: SettingItem[] = [
  { I:Globe,    t:"Información de la Empresa", d:"Nombre, dirección, RNC, contacto y logo" },
  { I:CreditCard, t:"Métodos de Pago",         d:"Tarjeta, transferencia bancaria, efectivo" },
  { I:Truck,    t:"Tarifas de Envío",           d:"Configurar precios por provincia y peso" },
  { I:Bell,     t:"Notificaciones",             d:"Email, SMS y WhatsApp automáticos" },
  { I:Users,    t:"Usuarios y Roles",           d:"Administradores, vendedores, empleados" },
  { I:Shield,   t:"Seguridad",                  d:"Contraseñas, 2FA y gestión de sesiones" },
  { I:Hash,     t:"SKU y Códigos",              d:"Configurar prefijos y numeración" },
  { I:Layers,   t:"Categorías",                 d:"Gestionar categorías y subcategorías" },
];

export function AdminSettings() {
  return (
    <div>
      <div style={{ padding:"24px 32px", background:C.white, borderBottom:`1px solid ${C.border}` }}>
        <h1 style={{ fontSize:22, fontWeight:800, color:C.navy }}>Configuración del Sistema</h1>
        <p style={{ fontSize:13, color:C.muted }}>Ajustes generales de la plataforma</p>
      </div>
      <div style={{ padding:"24px 32px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:18, maxWidth:800 }}>
          {SETTINGS.map(({ I, t, d }, i) => (
            <div
              key={i}
              style={{
                background:C.white, borderRadius:14, border:`1px solid ${C.border}`,
                padding:"22px", cursor:"pointer",
                transition:"all 0.18s", boxShadow:"0 1px 3px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor=C.teal; (e.currentTarget as HTMLDivElement).style.transform="translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor=C.border; (e.currentTarget as HTMLDivElement).style.transform="translateY(0)"; }}
            >
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
                <div style={{ width:38, height:38, borderRadius:10, background:C.navyLt, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <I size={18} color={C.navy}/>
                </div>
                <div style={{ fontSize:15, fontWeight:700, color:C.navy }}>{t}</div>
              </div>
              <p style={{ fontSize:13, color:C.muted, marginBottom:12 }}>{d}</p>
              <div style={{ fontSize:13, color:C.teal, fontWeight:600 }}>Configurar →</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
