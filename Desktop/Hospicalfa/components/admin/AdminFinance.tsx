"use client";
import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Download, FileText, TrendingUp, DollarSign, ShoppingCart, CreditCard } from "lucide-react";
import { useAdmin } from "@/lib/adminStore";
import { MetricCard } from "@/components/ui/MetricCard";
import { SectionHeader } from "./shared";
import { COLORS as C, REVENUE } from "@/lib/data";
import { fmt } from "@/lib/utils";

export function AdminFinance() {
  const { state } = useAdmin();
  const [period, setPeriod] = useState<"month"|"quarter"|"year">("year");

  const revenue    = REVENUE.reduce((s,r)=>s+r.i*1000,0);
  const profit     = REVENUE.reduce((s,r)=>s+r.g*1000,0);
  const orders     = REVENUE.reduce((s,r)=>s+r.p,0);
  const margin     = ((profit/revenue)*100).toFixed(1);
  const avgTicket  = Math.round(revenue/orders);

  const periodData = period==="month"
    ? REVENUE.slice(-1)
    : period==="quarter"
    ? REVENUE.slice(-3)
    : REVENUE;

  const topCustomers = [...state.customers]
    .sort((a,b)=>b.total-a.total)
    .slice(0,5);

  const expensesData = [
    {cat:"Compras a proveedores", v:Math.round(revenue*0.42)},
    {cat:"Logística y envíos",    v:Math.round(revenue*0.06)},
    {cat:"Operaciones / Admin",   v:Math.round(revenue*0.04)},
    {cat:"Marketing",             v:Math.round(revenue*0.02)},
    {cat:"Otros",                 v:Math.round(revenue*0.01)},
  ];
  const totalExpenses = expensesData.reduce((s,e)=>s+e.v,0);

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <SectionHeader
        title="Módulo Financiero"
        sub="Ingresos, ganancias y análisis de rentabilidad"
        action={
          <div style={{display:"flex",gap:10}}>
            {[{I:FileText,l:"PDF"},{I:Download,l:"Excel"}].map(({I,l})=>(
              <button key={l} style={{
                display:"flex",alignItems:"center",gap:6,padding:"9px 15px",
                borderRadius:10,border:`1px solid ${C.border}`,background:C.white,
                fontSize:13,fontWeight:600,cursor:"pointer",color:C.txt,fontFamily:"inherit",
              }}>
                <I size={13}/>{l}
              </button>
            ))}
          </div>
        }
      />

      <div style={{padding:"24px 32px",overflowY:"auto",flex:1}}>
        {/* KPIs */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:22}}>
          <MetricCard icon={DollarSign} label="Ingresos Anuales"  value={`RD$${(revenue/1000000).toFixed(2)}M`} change={18.2} color={C.teal}/>
          <MetricCard icon={TrendingUp} label="Ganancias Netas"   value={`RD$${(profit/1000000).toFixed(2)}M`}  change={22.4} color={C.green}/>
          <MetricCard icon={CreditCard} label="Ticket Promedio"   value={fmt(avgTicket)}                         change={4.1}  color={C.navy}/>
          <MetricCard icon={ShoppingCart}label="Margen Utilidad"  value={`${margin}%`}                           change={2.8}  color="#7C3AED"/>
        </div>

        {/* Period toggle */}
        <div style={{display:"flex",gap:8,marginBottom:20}}>
          {([["month","Este Mes"],["quarter","Último Trimestre"],["year","Año Completo"]] as const).map(([v,l])=>(
            <button key={v} onClick={()=>setPeriod(v)} style={{
              padding:"8px 18px",borderRadius:20,border:"none",
              background:period===v?C.navy:C.white,
              color:period===v?"#fff":C.muted,
              fontSize:13,fontWeight:period===v?700:500,
              cursor:"pointer",fontFamily:"inherit",
              boxShadow:period===v?"none":`0 0 0 1px ${C.border}`,
            }}>{l}</button>
          ))}
        </div>

        {/* Charts row */}
        <div style={{display:"grid",gridTemplateColumns:"3fr 2fr",gap:20,marginBottom:20}}>
          {/* Bar chart */}
          <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.border}`,padding:"24px"}}>
            <h3 style={{fontSize:16,fontWeight:700,color:C.navy,marginBottom:18}}>
              Ingresos y Ganancias — {period==="month"?"Mayo 2026":period==="quarter"?"Q4 2026":"Año 2026"}
            </h3>
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={periodData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
                <XAxis dataKey="m" tick={{fontSize:11,fill:C.muted}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:11,fill:C.muted}} axisLine={false} tickLine={false}/>
                <Tooltip formatter={(v:number)=>[`RD$${v}K`,""]} contentStyle={{borderRadius:10,border:`1px solid ${C.border}`,fontSize:12}}/>
                <Legend wrapperStyle={{fontSize:12,color:C.muted}}/>
                <Bar dataKey="i" fill={C.teal}  radius={[4,4,0,0]} name="Ingresos (K)"/>
                <Bar dataKey="g" fill={C.green} radius={[4,4,0,0]} name="Ganancias (K)"/>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Expenses breakdown */}
          <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.border}`,padding:"24px"}}>
            <h3 style={{fontSize:16,fontWeight:700,color:C.navy,marginBottom:4}}>Distribución de Gastos</h3>
            <p style={{fontSize:12,color:C.muted,marginBottom:18}}>Año 2026 · Total: {fmt(totalExpenses)}</p>
            {expensesData.map((e,i)=>{
              const pct = Math.round((e.v/totalExpenses)*100);
              const colors = [C.red,C.amber,C.teal,C.navy,"#7C3AED"];
              return (
                <div key={i} style={{marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,fontSize:12}}>
                    <span style={{color:C.txt,fontWeight:500}}>{e.cat}</span>
                    <div style={{display:"flex",gap:8}}>
                      <span style={{color:C.muted}}>{pct}%</span>
                      <span style={{fontWeight:700,color:C.navy}}>{fmt(e.v)}</span>
                    </div>
                  </div>
                  <div style={{height:6,background:"#F1F5F9",borderRadius:3,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${pct}%`,background:colors[i],borderRadius:3,transition:"width 0.5s"}}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Line chart - orders trend */}
        <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.border}`,padding:"24px",marginBottom:20}}>
          <h3 style={{fontSize:16,fontWeight:700,color:C.navy,marginBottom:18}}>Tendencia de Pedidos 2026</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={REVENUE}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
              <XAxis dataKey="m" tick={{fontSize:11,fill:C.muted}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:C.muted}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{borderRadius:10,border:`1px solid ${C.border}`,fontSize:12}}/>
              <Line type="monotone" dataKey="p" stroke={C.navy} strokeWidth={2.5} dot={{r:4,fill:C.navy}} name="Pedidos"/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top clients + monthly table side by side */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:20}}>
          {/* Top customers */}
          <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.border}`,overflow:"hidden"}}>
            <div style={{padding:"18px 20px",borderBottom:`1px solid ${C.border}`}}>
              <h3 style={{fontSize:15,fontWeight:700,color:C.navy}}>🏆 Top Clientes</h3>
            </div>
            {topCustomers.map((c,i)=>(
              <div key={i} style={{
                padding:"13px 20px",
                borderBottom:i<topCustomers.length-1?`1px solid ${C.border}`:"none",
                display:"flex",alignItems:"center",gap:12,
              }}>
                <div style={{
                  width:28,height:28,borderRadius:7,
                  background:[C.amber,"#C0C0C0","#CD7F32",C.tealLt,C.bg][i],
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:12,fontWeight:800,color:i<3?"#fff":C.navy,flexShrink:0,
                }}>{i+1}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:12,fontWeight:700,color:C.txt,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.n}</div>
                  <div style={{fontSize:10,color:C.muted}}>{c.orders} pedidos</div>
                </div>
                <div style={{fontSize:13,fontWeight:800,color:C.navy}}>{fmt(c.total)}</div>
              </div>
            ))}
          </div>

          {/* Monthly table */}
          <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.border}`,overflow:"hidden"}}>
            <div style={{padding:"18px 20px",borderBottom:`1px solid ${C.border}`}}>
              <h3 style={{fontSize:15,fontWeight:700,color:C.navy}}>Desglose Mensual 2026</h3>
            </div>
            <div style={{maxHeight:280,overflowY:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead style={{position:"sticky",top:0}}>
                  <tr style={{background:C.bg,borderBottom:`1px solid ${C.border}`}}>
                    {["Mes","Ingresos","Ganancias","Pedidos","Margen"].map(h=>(
                      <th key={h} style={{padding:"10px 16px",textAlign:"left",fontSize:10,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"0.3px"}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {REVENUE.map((r,i)=>{
                    const mg = (r.g/r.i*100);
                    return (
                      <tr key={i} style={{borderBottom:i<REVENUE.length-1?`1px solid ${C.border}`:"none",background:i%2===0?C.white:C.bg}}>
                        <td style={{padding:"11px 16px",fontSize:13,fontWeight:700,color:C.txt}}>{r.m} 2026</td>
                        <td style={{padding:"11px 16px",fontSize:13,fontWeight:700,color:C.navy}}>RD${r.i}K</td>
                        <td style={{padding:"11px 16px",fontSize:13,fontWeight:700,color:C.green}}>RD${r.g}K</td>
                        <td style={{padding:"11px 16px",fontSize:13,color:C.txt}}>{r.p}</td>
                        <td style={{padding:"11px 16px"}}>
                          <span style={{fontSize:13,fontWeight:700,color:mg>30?C.green:mg>25?C.amber:C.red}}>
                            {mg.toFixed(1)}%
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
      </div>
    </div>
  );
}
