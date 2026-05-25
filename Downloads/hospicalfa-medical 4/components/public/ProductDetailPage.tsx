"use client";
import { useState } from "react";
import { ChevronRight, Star, CheckCircle, AlertTriangle, ShoppingCart, FileText } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { COLORS as C, PRODUCTS, type Product } from "@/lib/data";
import { fmt } from "@/lib/utils";

interface ProductDetailPageProps {
  product: Product | null;
  go: (page: string, data?: Product) => void;
  addCart: (p: Product, qty?: number) => void;
}

export function ProductDetailPage({ product, go, addCart }: ProductDetailPageProps) {
  const [qty, setQty] = useState(1);
  if (!product) return null;

  const related = PRODUCTS.filter(p => p.cat === product.cat && p.id !== product.id).slice(0,3);

  return (
    <div style={{ padding:"40px 60px", background:C.bg, minHeight:"100vh" }}>
      <div style={{ maxWidth:1080, margin:"0 auto" }}>
        {/* BREADCRUMB */}
        <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:28, fontSize:13, color:C.muted }}>
          <span onClick={() => go("home")}    style={{ cursor:"pointer", color:C.teal, fontWeight:500 }}>Inicio</span>
          <ChevronRight size={14} />
          <span onClick={() => go("catalog")} style={{ cursor:"pointer", color:C.teal, fontWeight:500 }}>Catálogo</span>
          <ChevronRight size={14} />
          <span style={{ color:C.txt }}>{product.name}</span>
        </div>

        <div style={{
          background:C.white, borderRadius:20, border:`1px solid ${C.border}`,
          boxShadow:"0 2px 8px rgba(0,0,0,0.06)", padding:"40px",
          display:"grid", gridTemplateColumns:"1fr 1fr", gap:52, marginBottom:28,
        }}>
          {/* IMAGE */}
          <div style={{
            background:C.bg, borderRadius:16, height:340,
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:110,
          }}>
            {product.icon}
          </div>

          {/* INFO */}
          <div>
            <div style={{ fontSize:12, color:C.teal, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:8 }}>
              {product.cat} · SKU: {product.sku}
            </div>
            <h1 style={{ fontSize:28, fontWeight:800, color:C.navy, marginBottom:14, lineHeight:1.3 }}>
              {product.name}
            </h1>

            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:18 }}>
              <div style={{ display:"flex", gap:2 }}>
                {[1,2,3,4,5].map(j => <Star key={j} size={14} fill="#F59E0B" color="#F59E0B" />)}
              </div>
              <span style={{ fontSize:14, fontWeight:600 }}>{product.rating}/5</span>
              <span style={{ color:C.muted, fontSize:13 }}>· 142 reseñas</span>
            </div>

            <div style={{ fontSize:38, fontWeight:800, color:C.navy, marginBottom:10 }}>
              {fmt(product.price)}
            </div>

            <div style={{
              display:"flex", alignItems:"center", gap:8, marginBottom:24,
              fontSize:14, fontWeight:600,
              color: product.stock > 50 ? C.green : C.amber,
            }}>
              {product.stock > 50
                ? <><CheckCircle size={16} /> En stock · {product.stock} unidades disponibles</>
                : <><AlertTriangle size={16} /> Stock limitado · {product.stock} unidades</>
              }
            </div>

            <p style={{ color:C.muted, fontSize:14, lineHeight:1.75, marginBottom:26 }}>
              {product.description ?? "Producto médico certificado para uso clínico y hospitalario. Fabricado bajo estrictos estándares internacionales de calidad. Ideal para clínicas, hospitales y consultorios médicos en todo el país."}
            </p>

            {/* QTY + ADD */}
            <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:12 }}>
              <div style={{
                display:"flex", alignItems:"center",
                border:`1px solid ${C.border}`, borderRadius:10, overflow:"hidden", flexShrink:0,
              }}>
                <button onClick={() => setQty(Math.max(1,qty-1))} style={{ width:38, height:44, border:"none", background:C.bg, cursor:"pointer", fontSize:18, fontWeight:600 }}>−</button>
                <div style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, fontWeight:700 }}>{qty}</div>
                <button onClick={() => setQty(qty+1)}             style={{ width:38, height:44, border:"none", background:C.bg, cursor:"pointer", fontSize:18, fontWeight:600 }}>+</button>
              </div>
              <button
                onClick={() => addCart(product, qty)}
                style={{
                  flex:1, background:C.navy, color:"#fff", border:"none", borderRadius:10,
                  padding:"12px", fontSize:14, fontWeight:700, cursor:"pointer",
                  display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                }}
              >
                <ShoppingCart size={16} /> Agregar al Carrito
              </button>
            </div>

            <button style={{
              width:"100%", background:C.tealLt, color:C.tealDk, border:"none",
              borderRadius:10, padding:"12px", fontSize:14, fontWeight:700, cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center", gap:8,
            }}>
              <FileText size={16} /> Solicitar Cotización
            </button>
          </div>
        </div>

        {/* RELATED */}
        {related.length > 0 && (
          <>
            <h2 style={{ fontSize:22, fontWeight:800, color:C.navy, marginBottom:20 }}>Productos Relacionados</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
              {related.map(p => <ProductCard key={p.id} product={p} onView={prod => go("product",prod)} onAdd={addCart} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
