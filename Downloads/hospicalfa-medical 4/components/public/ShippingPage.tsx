"use client";
import { MapPin } from "lucide-react";
import { COLORS as C, PROVINCES } from "@/lib/data";
import { fmt } from "@/lib/utils";

export function ShippingPage() {
  return (
    <div style={{ padding:"40px 60px", background:C.bg, minHeight:"100vh" }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <h1 style={{ fontSize:34, fontWeight:800, color:C.navy, marginBottom:6 }}>Sistema de Envíos</h1>
        <p style={{ color:C.muted, marginBottom:8 }}>Tarifas y tiempos de entrega por provincia</p>
        <div style={{
          background:C.tealLt, border:`1px solid ${C.teal}30`, borderRadius:12,
          padding:"14px 20px", marginBottom:28, fontSize:14, color:C.tealDk, fontWeight:500,
          display:"flex", alignItems:"center", gap:10,
        }}>
          🚚 Envíos procesados de lunes a sábado · Pedidos antes de 2PM salen el mismo día
        </div>

        <div style={{ background:C.white, borderRadius:18, border:`1px solid ${C.border}`, overflow:"hidden" }}>
          <div style={{
            background:`linear-gradient(135deg,${C.navy},${C.tealDk})`,
            padding:"18px 28px", color:"#fff",
            display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:16,
            fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.4px",
          }}>
            <span>Provincia</span>
            <span>Tarifa de Envío</span>
            <span>Tiempo de Entrega</span>
            <span>Disponibilidad</span>
          </div>

          {PROVINCES.map((p, i) => (
            <div key={i} style={{
              display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:16,
              padding:"14px 28px", alignItems:"center",
              borderBottom: i < PROVINCES.length-1 ? `1px solid ${C.border}` : "none",
              background: i % 2 === 0 ? C.white : C.bg,
            }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:14, fontWeight:500, color:C.txt }}>
                <MapPin size={14} color={C.teal} /> {p.name}
              </div>
              <div style={{ fontWeight:700, color: p.rate === 0 ? C.green : C.navy, fontSize:14 }}>
                {p.rate === 0 ? "🎉 GRATIS" : fmt(p.rate)}
              </div>
              <div style={{ color:C.muted, fontSize:13 }}>
                {p.delivery}-{p.delivery+1} días hábiles
              </div>
              <span style={{
                background:C.greenLt, color:C.green,
                padding:"3px 10px", borderRadius:12, fontSize:11, fontWeight:700, display:"inline-block",
              }}>
                ✓ Disponible
              </span>
            </div>
          ))}
        </div>

        <div style={{
          marginTop:28, background:C.navyLt, border:`1px solid ${C.navyLt}`,
          borderRadius:12, padding:"20px 24px",
        }}>
          <h3 style={{ fontSize:15, fontWeight:700, color:C.navy, marginBottom:10 }}>📋 Información Adicional</h3>
          <ul style={{ color:C.muted, fontSize:14, lineHeight:1.9, paddingLeft:18 }}>
            <li>Los precios de envío aplican por pedido, sin importar el número de productos.</li>
            <li>Pedidos superiores a RD$10,000 tienen envío gratis a todo el país.</li>
            <li>El seguimiento se envía por WhatsApp o email al confirmar el pedido.</li>
            <li>Para pedidos urgentes o voluminosos, contacte directamente a ventas.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
