"use client";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { DollarSign, TrendingUp, ShoppingCart, Users, Plus, Download, Package } from "lucide-react";
import { MetricCard } from "@/components/ui/MetricCard";
import { useAdmin } from "@/lib/adminStore";
import { COLORS as C, REVENUE, PIE_DATA, PIE_COLORS } from "@/lib/data";
import { fmt } from "@/lib/utils";

function Badge({ status }: { status: string }) {
  const map: Record<string,{bg:string;c:string}> = {
    "Entregado":   {bg:"#D1FAE5",c:"#065F46"},
    "En tránsito": {bg:"#DBEAFE",c:"#1E3A8A"},
    "Procesando":  {bg:"#FEF3C7",c:"#92400E"},
    "Cancelado":   {bg:"#FEE2E2",c:"#991B1B"},
  };
  const s = map[status] ?? {bg:"#F3F4F6",c:"#374151"};
  return (
    <span style={{
      background:s.bg, color:s.c, padding:"3px 10px",
      borderRadius:20, fontSize:11, fontWeight:700, whiteSpace:"nowrap",
    }}>{status}</span>
  );
}

export function Dashboard() {
  const { state } = useAdmin();

  const monthRevenue    = 748000;
  const monthProfit     = 241000;
  const activeOrders    = state.orders.filter(o=>o.status!=="Cancelado").length;
  const activeCustomers = state.customers.filter(c=>c.status==="active").length;
  const criticalStock   = state.products.filter(p=>p.stock<20).length;
  const totalStockVal   = state.products.reduce((s,p)=>s+p.stock*p.costPrice,0);
  const pendingOrders   = state.orders.filter(o=>o.status==="Procesando").length;
  const monthOrders     = state.orders.length;

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      {/* HEADER */}
      <div style={{
        padding:"22px 32px", background:C.white,
        borderBottom:`1px solid ${C.border}`,
        display:"flex", justifyContent:"space-between", alignItems:"center",
        flexShrink:0,
      }}>
        <div>
          <h1 style={{fontSize:22,fontWeight:800,color:C.navy,marginBottom:3}}>Dashboard Ejecutivo</h1>
          <p style={{fontSize:13,color:C.muted}}>
            {new Date().toLocaleDateString("es-DO",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}
          </p>
        </div>
        <div style={{display:"flex",gap:10}}>
          <button style={{
            display:"flex",alignItems:"center",gap:6,padding:"9px 16px",
            borderRadius:10,border:`1px solid ${C.border}`,background:C.white,
            fontSize:13,fontWeight:600,cursor:"pointer",color:C.txt,fontFamily:"inherit",
          }}>
            <Download size={14}/> Exportar Reporte
          </button>
          <button style={{
            display:"flex",alignItems:"center",gap:6,padding:"9px 18px",
            borderRadius:10,border:"none",background:C.navy,color:"#fff",
            fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit",
          }}>
            <Plus size={14}/> Nuevo Pedido
          </button>
        </div>
      </div>

      <div style={{padding:"24px 32px",overflowY:"auto",flex:1}}>

        {/* KPI PRIMARY */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:20}}>
          <MetricCard icon={DollarSign}   label="Ingresos del Mes"  value={fmt(monthRevenue)}   sub="Mayo 2026"      change={8.4}  color={C.teal}  />
          <MetricCard icon={TrendingUp}   label="Ganancias Netas"   value={fmt(monthProfit)}    sub="32.2% margen"   change={12.1} color={C.green} />
          <MetricCard icon={ShoppingCart} label="Pedidos del Mes"   value={String(monthOrders)} sub={`${pendingOrders} pendientes`} change={5.7} color={C.navy} />
          <MetricCard icon={Users}        label="Clientes Activos"  value={String(activeCustomers)} sub="+3 este mes" change={3.2} color="#7C3AED" />
        </div>

        {/* KPI SECONDARY */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:22}}>
          {[
            {l:"Pedidos Activos",   v:activeOrders,           c:C.teal,  icon:"🛍️"},
            {l:"Stock Crítico",     v:criticalStock,           c:C.red,   icon:"⚠️"},
            {l:"Valor Inventario",  v:fmt(totalStockVal),      c:C.navy,  icon:"📦"},
            {l:"Ticket Promedio",   v:"RD$2,632",              c:C.green, icon:"💳"},
          ].map((s,i)=>(
            <div key={i} style={{
              background:C.white,borderRadius:12,padding:"15px 18px",
              border:`1px solid ${C.border}`,
              display:"flex",alignItems:"center",gap:12,
            }}>
              <div style={{fontSize:26}}>{s.icon}</div>
              <div>
                <div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.4px",marginBottom:3}}>{s.l}</div>
                <div style={{fontSize:typeof s.v==="string"&&s.v.length>8?16:22,fontWeight:800,color:s.c}}>{s.v}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CHARTS */}
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:20,marginBottom:20}}>
          {/* Area chart */}
          <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.border}`,padding:"24px"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:18,alignItems:"flex-start"}}>
              <div>
                <h3 style={{fontSize:16,fontWeight:700,color:C.navy}}>Ingresos vs Ganancias 2026</h3>
                <p style={{fontSize:12,color:C.muted,marginTop:2}}>Últimos 12 meses en miles RD$</p>
              </div>
              <div style={{display:"flex",gap:14,fontSize:12}}>
                {[{c:C.teal,l:"Ingresos"},{c:C.green,l:"Ganancias"}].map(({c,l})=>(
                  <div key={l} style={{display:"flex",alignItems:"center",gap:5}}>
                    <div style={{width:12,height:3,background:c,borderRadius:2}}/>
                    <span style={{color:C.muted}}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={REVENUE} margin={{top:4,right:4,bottom:0,left:0}}>
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
                <XAxis dataKey="m" tick={{fontSize:11,fill:C.muted}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:11,fill:C.muted}} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{borderRadius:10,border:`1px solid ${C.border}`,fontSize:12}} formatter={(v:number)=>[`RD$${v}K`,""]}/>
                <Area type="monotone" dataKey="i" stroke={C.teal}  strokeWidth={2.5} fill="url(#gi)" name="Ingresos"/>
                <Area type="monotone" dataKey="g" stroke={C.green} strokeWidth={2.5} fill="url(#gg)" name="Ganancias"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Pie chart */}
          <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.border}`,padding:"24px"}}>
            <h3 style={{fontSize:16,fontWeight:700,color:C.navy,marginBottom:4}}>Ventas por Categoría</h3>
            <p style={{fontSize:12,color:C.muted,marginBottom:14}}>Distribución este mes</p>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={36} outerRadius={66} dataKey="v" paddingAngle={3}>
                  {PIE_DATA.map((_,i)=><Cell key={i} fill={PIE_COLORS[i]}/>)}
                </Pie>
                <Tooltip contentStyle={{borderRadius:10,fontSize:12}} formatter={(v:number)=>[`${v}%`,""]}/>
              </PieChart>
            </ResponsiveContainer>
            <div style={{marginTop:8}}>
              {PIE_DATA.map((d,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:6}}>
                  <div style={{display:"flex",alignItems:"center",gap:7}}>
                    <div style={{width:8,height:8,borderRadius:2,background:PIE_COLORS[i]}}/>
                    <span style={{color:C.muted}}>{d.name}</span>
                  </div>
                  <span style={{fontWeight:700}}>{d.v}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div style={{display:"grid",gridTemplateColumns:"3fr 2fr",gap:20}}>
          {/* Recent orders from live state */}
          <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.border}`,overflow:"hidden"}}>
            <div style={{padding:"18px 22px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <h3 style={{fontSize:16,fontWeight:700,color:C.navy}}>Pedidos Recientes</h3>
              <span style={{fontSize:11,color:C.muted}}>{state.orders.length} pedidos totales</span>
            </div>
            {state.orders.slice(0,6).map((o,i)=>(
              <div key={i} style={{
                padding:"12px 22px",
                borderBottom:i<5?`1px solid ${C.border}`:"none",
                display:"flex",gap:12,alignItems:"center",
              }}>
                <div style={{
                  width:34,height:34,borderRadius:9,
                  background:C.navyLt,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:12,fontWeight:800,color:C.navy,flexShrink:0,
                }}>{o.client.charAt(0)}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:700,color:C.txt,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{o.client}</div>
                  <div style={{fontSize:11,color:C.muted}}>{o.id} · {o.prov}</div>
                </div>
                <div style={{textAlign:"right",marginRight:10}}>
                  <div style={{fontSize:13,fontWeight:700,color:C.navy}}>{fmt(o.total)}</div>
                  <div style={{fontSize:11,color:C.muted}}>{o.date}</div>
                </div>
                <Badge status={o.status}/>
              </div>
            ))}
          </div>

          {/* Live stock alerts */}
          <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.border}`,overflow:"hidden"}}>
            <div style={{padding:"18px 22px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <h3 style={{fontSize:16,fontWeight:700,color:C.navy}}>⚠ Alertas de Stock</h3>
              <span style={{background:"#FEE2E2",color:C.red,fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:10}}>
                {state.products.filter(p=>p.stock<=40).length}
              </span>
            </div>
            <div style={{padding:14}}>
              {state.products
                .filter(p=>p.stock<=40)
                .sort((a,b)=>a.stock-b.stock)
                .slice(0,5)
                .map((p,i)=>(
                <div key={i} style={{
                  padding:"11px 13px",borderRadius:10,marginBottom:10,
                  background:p.stock<20?"#FEF2F2":"#FFFBEB",
                  border:`1px solid ${p.stock<20?"#FECACA":"#FDE68A"}`,
                }}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:700,color:C.txt,marginBottom:2}}>{p.name}</div>
                      <div style={{fontSize:11,color:C.muted}}>Stock: {p.stock} uds</div>
                      {/* Progress */}
                      <div style={{marginTop:6,height:4,background:"#E2E8F0",borderRadius:2,overflow:"hidden"}}>
                        <div style={{
                          height:"100%",
                          width:`${Math.min(100,p.stock/40*100)}%`,
                          background:p.stock<20?C.red:C.amber,
                          borderRadius:2,transition:"width 0.5s",
                        }}/>
                      </div>
                    </div>
                    <span style={{
                      fontSize:10,fontWeight:700,marginLeft:10,flexShrink:0,
                      color:p.stock<20?C.red:"#92400E",
                    }}>{p.stock<20?"🔴 CRÍTICO":"🟡 BAJO"}</span>
                  </div>
                </div>
              ))}
              {state.products.filter(p=>p.stock<=40).length===0&&(
                <div style={{textAlign:"center",padding:"24px",color:C.green,fontWeight:600,fontSize:14}}>
                  ✅ Todo el inventario en niveles normales
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
