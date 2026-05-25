"use client";
import { useState } from "react";
import { Star, Plus } from "lucide-react";
import { COLORS as C, type Product } from "@/lib/data";
import { fmt } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onView: (p: Product) => void;
  onAdd:  (p: Product) => void;
}

export function ProductCard({ product, onView, onAdd }: ProductCardProps) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: C.white, borderRadius:16,
        border:`1px solid ${hov ? C.teal : C.border}`,
        boxShadow: hov ? "0 8px 28px rgba(13,153,204,0.18)" : "0 1px 4px rgba(0,0,0,0.05)",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
        transition:"all 0.22s", overflow:"hidden", cursor:"pointer",
      }}
    >
      <div
        onClick={() => onView(product)}
        style={{
          height:110, background:C.bg,
          display:"flex", alignItems:"center", justifyContent:"center", fontSize:58,
        }}
      >
        {product.icon}
      </div>
      <div style={{ padding:"16px 18px 18px" }}>
        <div style={{ fontSize:10, color:C.teal, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.6px", marginBottom:5 }}>
          {product.cat}
        </div>
        <div className="line-clamp-2" style={{ fontSize:14, fontWeight:700, color:C.txt, marginBottom:8, lineHeight:1.35, minHeight:38 }}>
          {product.name}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:14 }}>
          <Star size={12} fill="#F59E0B" color="#F59E0B" />
          <span style={{ fontSize:12, fontWeight:700 }}>{product.rating}</span>
          <span style={{ fontSize:11, color:C.muted }}>· {product.stock} uds</span>
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ fontSize:18, fontWeight:800, color:C.navy }}>{fmt(product.price)}</div>
          <button
            onClick={(e) => { e.stopPropagation(); onAdd(product); }}
            style={{
              background:C.navy, color:"#fff", border:"none", borderRadius:8,
              padding:"7px 13px", fontSize:12, fontWeight:700, cursor:"pointer",
              display:"flex", alignItems:"center", gap:4,
            }}
          >
            <Plus size={13} /> Añadir
          </button>
        </div>
      </div>
    </div>
  );
}
