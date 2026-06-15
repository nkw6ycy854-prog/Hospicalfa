"use client";
import { useState } from "react";
import { Clock, User, ArrowRight, Calendar, Search } from "lucide-react";
import { COLORS as C } from "@/lib/data";
import { BLOG_CATEGORIES, BLOG_POSTS } from "@/lib/config";

export function BlogPage() {
  const [activeCat, setActiveCat] = useState("todos");
  const [search, setSearch]       = useState("");

  const filtered = BLOG_POSTS.filter(p =>
    (activeCat === "todos" || p.category === activeCat) &&
    (p.title.toLowerCase().includes(search.toLowerCase()) ||
     p.excerpt.toLowerCase().includes(search.toLowerCase()))
  );

  const catName = (id: string) => BLOG_CATEGORIES.find(c => c.id === id)?.name ?? id;
  const catColor = (id: string) => BLOG_CATEGORIES.find(c => c.id === id)?.color ?? C.teal;
  const fmtDate = (d: string) => new Date(d).toLocaleDateString("es-DO", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      {/* HERO */}
      <section style={{
        background: `linear-gradient(135deg, ${C.navyDk} 0%, ${C.navy} 100%)`,
        color: "#fff", padding: "60px 60px 52px", textAlign: "center",
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <span style={{
            display: "inline-block", background: "rgba(13,153,204,0.2)",
            border: "1px solid rgba(13,153,204,0.4)", borderRadius: 20,
            padding: "5px 16px", fontSize: 13, color: "#7DD3FA", fontWeight: 600, marginBottom: 20,
          }}>
            📚 Centro de Conocimiento
          </span>
          <h1 style={{ fontSize: 42, fontWeight: 800, marginBottom: 16, lineHeight: 1.15 }}>
            Blog de Hospicalfa Medical
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.72)", lineHeight: 1.7 }}>
            Guías, consejos y novedades del sector médico para clínicas, hospitales y farmacias.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "44px 60px" }}>
        {/* SEARCH + CATEGORIES */}
        <div style={{ marginBottom: 36 }}>
          <div style={{
            background: C.white, border: `1px solid ${C.border}`, borderRadius: 12,
            padding: "11px 18px", display: "flex", alignItems: "center", gap: 10,
            maxWidth: 480, margin: "0 auto 24px",
          }}>
            <Search size={16} color={C.muted}/>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar artículos..."
              style={{ border: "none", outline: "none", fontSize: 14, flex: 1, background: "transparent", color: C.txt, fontFamily: "inherit" }}
            />
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            <button
              onClick={() => setActiveCat("todos")}
              style={{
                padding: "8px 18px", borderRadius: 20, fontSize: 13, fontWeight: 600,
                cursor: "pointer", fontFamily: "inherit",
                background: activeCat === "todos" ? C.navy : C.white,
                color: activeCat === "todos" ? "#fff" : C.txt,
                border: `1px solid ${activeCat === "todos" ? C.navy : C.border}`,
              }}
            >
              Todos
            </button>
            {BLOG_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                style={{
                  padding: "8px 18px", borderRadius: 20, fontSize: 13, fontWeight: 600,
                  cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6,
                  background: activeCat === cat.id ? cat.color : C.white,
                  color: activeCat === cat.id ? "#fff" : C.txt,
                  border: `1px solid ${activeCat === cat.id ? cat.color : C.border}`,
                }}
              >
                <span>{cat.icon}</span> {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* POSTS GRID */}
        {filtered.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {filtered.map(post => (
              <article key={post.id} style={{
                background: C.white, borderRadius: 18, border: `1px solid ${C.border}`,
                overflow: "hidden", cursor: "pointer", transition: "all 0.2s",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform="translateY(-4px)"; el.style.boxShadow="0 12px 32px rgba(0,0,0,0.1)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform="translateY(0)"; el.style.boxShadow="0 1px 4px rgba(0,0,0,0.04)"; }}
              >
                {/* Cover */}
                <div style={{
                  height: 150,
                  background: `linear-gradient(135deg, ${catColor(post.category)}22, ${catColor(post.category)}08)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 56, position: "relative",
                }}>
                  {post.icon}
                  <span style={{
                    position: "absolute", top: 14, left: 14,
                    background: catColor(post.category), color: "#fff",
                    padding: "3px 11px", borderRadius: 12, fontSize: 11, fontWeight: 700,
                  }}>
                    {catName(post.category)}
                  </span>
                </div>
                {/* Content */}
                <div style={{ padding: "20px 22px 22px" }}>
                  <div style={{ display: "flex", gap: 14, marginBottom: 12, fontSize: 11.5, color: C.muted }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Calendar size={12}/> {fmtDate(post.date)}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={12}/> {post.readTime}</span>
                  </div>
                  <h2 style={{ fontSize: 17, fontWeight: 700, color: C.navy, marginBottom: 10, lineHeight: 1.35 }}>
                    {post.title}
                  </h2>
                  <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.6, marginBottom: 16 }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: `1px solid ${C.border}` }}>
                    <span style={{ fontSize: 11.5, color: C.muted, display: "flex", alignItems: "center", gap: 5 }}>
                      <User size={12}/> {post.author}
                    </span>
                    <span style={{ fontSize: 13, color: C.teal, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                      Leer <ArrowRight size={13}/>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>📭</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: C.navy, marginBottom: 8 }}>No se encontraron artículos</h3>
            <p style={{ color: C.muted }}>Pruebe con otra categoría o término de búsqueda.</p>
          </div>
        )}

        {/* Newsletter CTA */}
        <div style={{
          marginTop: 52, background: `linear-gradient(135deg, ${C.navy}, ${C.tealDk})`,
          borderRadius: 20, padding: "40px 48px", textAlign: "center", color: "#fff",
        }}>
          <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 10 }}>
            ¿Necesita asesoría profesional?
          </h3>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.72)", marginBottom: 24, maxWidth: 480, margin: "0 auto 24px" }}>
            Nuestro equipo de especialistas está listo para ayudarle a elegir los mejores productos para su institución.
          </p>
          <a href={`https://wa.me/${"18095550001"}`} target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#25D366", color: "#fff", textDecoration: "none",
            padding: "13px 28px", borderRadius: 12, fontSize: 15, fontWeight: 700,
          }}>
            💬 Hablar con un Asesor
          </a>
        </div>
      </div>
    </div>
  );
}
