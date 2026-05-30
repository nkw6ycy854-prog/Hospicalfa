"use client";
import { useState } from "react";
import { Star, Plus, Eye } from "lucide-react";
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
      role="article"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: C.white, borderRadius: 16,
        border: `1px solid ${hov ? C.teal : C.border}`,
        boxShadow: hov
          ? "0 10px 32px rgba(13,153,204,0.2)"
          : "0 1px 4px rgba(0,0,0,0.05)",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.22s cubic-bezier(.22,.68,0,1.2)",
        overflow: "hidden", cursor: "pointer",
        position: "relative",
      }}
    >
      {/* Badge featured */}
      {product.feat && (
        <div style={{
          position: "absolute", top: 10, right: 10,
          background: C.amber, color: "#fff",
          fontSize: 10, fontWeight: 800, padding: "3px 8px",
          borderRadius: 10, letterSpacing: "0.3px",
        }}>
          ★ DESTACADO
        </div>
      )}

      {/* Low stock badge */}
      {product.stock < 30 && (
        <div style={{
          position: "absolute", top: 10, left: 10,
          background: "#FEE2E2", color: "#991B1B",
          fontSize: 10, fontWeight: 700, padding: "3px 8px",
          borderRadius: 10,
        }}>
          Pocas unidades
        </div>
      )}

      {/* Image / Icon */}
      <div
        onClick={() => onView(product)}
        style={{
          height: 120, background: C.bg,
          display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 64,
          transition: "transform 0.2s",
          transform: hov ? "scale(1.08)" : "scale(1)",
        }}
      >
        {product.icon}
      </div>

      <div style={{ padding: "16px 18px 18px" }}>
        <div style={{
          fontSize: 10, color: C.teal, fontWeight: 700,
          textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 5,
        }}>
          {product.cat}
        </div>

        <div
          className="line-clamp-2"
          style={{
            fontSize: 14, fontWeight: 700, color: C.txt,
            marginBottom: 8, lineHeight: 1.35, minHeight: 38,
          }}
        >
          {product.name}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 14 }}>
          <Star size={12} fill="#F59E0B" color="#F59E0B" />
          <span style={{ fontSize: 12, fontWeight: 700 }}>{product.rating}</span>
          <span style={{ fontSize: 11, color: C.muted }}>
            ({product.reviews}) · {product.stock} uds
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: C.navy }}>
            {fmt(product.price)}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={() => onView(product)}
              title="Ver detalles"
              style={{
                background: C.tealLt, color: C.tealDk,
                border: "none", borderRadius: 8,
                padding: "7px 10px", fontSize: 12, fontWeight: 700,
                cursor: "pointer", display: "flex", alignItems: "center",
              }}
            >
              <Eye size={13} />
            </button>
            <button
              onClick={() => onAdd(product)}
              title="Añadir al carrito"
              style={{
                background: C.navy, color: "#fff",
                border: "none", borderRadius: 8,
                padding: "7px 13px", fontSize: 12, fontWeight: 700,
                cursor: "pointer", display: "flex", alignItems: "center", gap: 4,
              }}
            >
              <Plus size={13} /> Añadir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
