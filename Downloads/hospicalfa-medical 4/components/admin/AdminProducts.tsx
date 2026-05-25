"use client";
import { useState } from "react";
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { COLORS as C, PRODUCTS } from "@/lib/data";
import { fmt, stockColor } from "@/lib/utils";

export function AdminProducts() {
  const [search, setSearch] = useState("");
  const filtered = PRODUCTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div style={{
        padding:"24px 32px", background:C.white, borderBottom:`1px solid ${C.border}`,
        display:"flex", justifyContent:"space-between", alignItems:"center",
      }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:800, color:C.navy }}>Gestión de Productos</h1>
          <p style={{ fontSize:13, color:C.muted }}>{PRODUCTS.length} productos en el catálogo</p>
        </div>
        <button style={{
          display:"flex", alignItems:"center", gap:6, padding:"9px 18px",
          borderRadius:10, border:"none", background:C.navy, color:"#fff",
          fontSize:13, fontWeight:700, cursor:"pointer",
        }}>
          <Plus size={14} /> Nuevo Producto
        </button>
      </div>

      <div style={{ padding:"24px 32px" }}>
        <div style={{
          background:C.white, border:`1px solid ${C.border}`, borderRadius:12,
          padding:"12px 18px", marginBottom:18, display:"flex", gap:10, alignItems:"center",
        }}>
          <Search size={15} color={C.muted}/>
          <input
            value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="Buscar productos, SKU..."
            style={{ border:"none", outline:"none", fontSize:14, flex:1, background:"transparent", color:C.txt }}
          />
        </div>

        <div style={{ background:C.white, borderRadius:16, border:`1px solid ${C.border}`, overflow:"hidden" }}>
          <table>
            <thead>
              <tr style={{ background:C.bg, borderBottom:`1px solid ${C.border}` }}>
                {["Producto","Categoría","SKU","Precio","Stock","Estado","Acciones"].map(h => (
                  <th key={h} style={{ padding:"11px 18px", fontSize:11, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:"0.4px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p.id} style={{ borderBottom:i<filtered.length-1?`1px solid ${C.border}`:"none" }}>
                  <td style={{ padding:"13px 18px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:38, height:38, borderRadius:8, background:C.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{p.icon}</div>
                      <div style={{ fontSize:13, fontWeight:700, color:C.txt }}>{p.name}</div>
                    </div>
                  </td>
                  <td style={{ padding:"13px 18px", fontSize:12, color:C.muted }}>{p.cat}</td>
                  <td style={{ padding:"13px 18px", fontSize:12, fontFamily:"monospace", color:C.muted }}>{p.sku}</td>
                  <td style={{ padding:"13px 18px", fontSize:14, fontWeight:700, color:C.navy }}>{fmt(p.price)}</td>
                  <td style={{ padding:"13px 18px", fontSize:14, fontWeight:700, color:stockColor(p.stock) }}>{p.stock} uds</td>
                  <td style={{ padding:"13px 18px" }}>
                    <span style={{
                      background:p.feat?"#D1FAE5":"#F3F4F6",
                      color:p.feat?C.green:C.muted,
                      padding:"3px 10px", borderRadius:12, fontSize:11, fontWeight:700,
                    }}>
                      {p.feat ? "★ Destacado" : "Regular"}
                    </span>
                  </td>
                  <td style={{ padding:"13px 18px" }}>
                    <div style={{ display:"flex", gap:6 }}>
                      {[
                        { I:Eye,    bg:C.tealLt,   c:C.tealDk },
                        { I:Edit,   bg:"#EFF6FF",  c:C.navy   },
                        { I:Trash2, bg:"#FEF2F2",  c:C.red    },
                      ].map(({ I, bg, c }, j) => (
                        <button key={j} style={{ padding:"6px", borderRadius:6, border:"none", background:bg, cursor:"pointer", display:"flex" }}>
                          <I size={13} color={c}/>
                        </button>
                      ))}
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
