"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { COLORS as C, PRODUCTS, CATEGORIES, type Product } from "@/lib/data";

interface CatalogPageProps {
  go: (page: string, data?: Product) => void;
  addCart: (p: Product) => void;
}

export function CatalogPage({ go, addCart }: CatalogPageProps) {
  const [search, setSearch] = useState("");
  const [cat, setCat]       = useState("Todas");
  const [sort, setSort]     = useState("name");

  const filtered = PRODUCTS
    .filter(p => (cat === "Todas" || p.cat === cat) && p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sort === "price_asc"  ? a.price - b.price :
      sort === "price_desc" ? b.price - a.price :
      a.name.localeCompare(b.name)
    );

  return (
    <div style={{ padding:"40px 60px", background:C.bg, minHeight:"100vh" }}>
      <div style={{ maxWidth:1080, margin:"0 auto" }}>
        <div style={{ marginBottom:28 }}>
          <h1 style={{ fontSize:34, fontWeight:800, color:C.navy, marginBottom:5 }}>Catálogo de Productos</h1>
          <p style={{ color:C.muted }}>{filtered.length} productos disponibles</p>
        </div>

        {/* SEARCH + SORT */}
        <div style={{ display:"flex", gap:12, marginBottom:22 }}>
          <div style={{
            flex:1, background:C.white, border:`1px solid ${C.border}`, borderRadius:12,
            padding:"12px 16px", display:"flex", alignItems:"center", gap:10,
          }}>
            <Search size={16} color={C.muted} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar productos, SKU, categoría..."
              style={{ border:"none", outline:"none", fontSize:14, flex:1, background:"transparent", color:C.txt }}
            />
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            style={{
              background:C.white, border:`1px solid ${C.border}`, borderRadius:12,
              padding:"12px 16px", fontSize:14, color:C.txt, cursor:"pointer", outline:"none",
            }}
          >
            <option value="name">Ordenar: A-Z</option>
            <option value="price_asc">Precio: Menor a Mayor</option>
            <option value="price_desc">Precio: Mayor a Menor</option>
          </select>
        </div>

        {/* CATEGORY PILLS */}
        <div style={{ display:"flex", gap:10, marginBottom:28, flexWrap:"wrap" }}>
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              style={{
                borderRadius:20, padding:"7px 18px", fontSize:13, fontWeight:600, cursor:"pointer",
                transition:"all 0.15s",
                background: cat === c ? C.navy : C.white,
                color:       cat === c ? "#fff" : C.txt,
                border:      cat === c ? `1px solid ${C.navy}` : `1px solid ${C.border}`,
              }}
            >{c}</button>
          ))}
        </div>

        {/* GRID */}
        {filtered.length > 0 ? (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onView={prod => go("product", prod)} onAdd={addCart} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign:"center", padding:"80px 0" }}>
            <div style={{ fontSize:60, marginBottom:16 }}>🔍</div>
            <h3 style={{ fontSize:20, fontWeight:700, color:C.navy, marginBottom:8 }}>No se encontraron productos</h3>
            <p style={{ color:C.muted }}>Intenta con otros términos de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
}
