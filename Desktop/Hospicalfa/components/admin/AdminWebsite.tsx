"use client";
import { useState } from "react";
import { Save, Globe, Eye, Layout, Search, Bell, Settings2, Package } from "lucide-react";
import { useAdmin } from "@/lib/adminStore";
import { SectionHeader, Field, SaveBtn } from "./shared";
import { COLORS as C } from "@/lib/data";

export function AdminWebsite() {
  const { state, dispatch } = useAdmin();
  const [tab, setTab]       = useState<"hero"|"about"|"seo"|"featured"|"general">("hero");
  const [content, setContent] = useState(state.content);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);

  const upd = (section: keyof typeof content, field: string, val: string | boolean | number) =>
    setContent(c => ({
      ...c,
      [section]: typeof c[section] === "object" && !Array.isArray(c[section])
        ? { ...(c[section] as object), [field]: val }
        : val,
    }));

  const updTop = (field: string, val: boolean | number | number[]) =>
    setContent(c => ({ ...c, [field]: val }));

  const save = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 700));
    dispatch({ type:"UPD_CONTENT", content });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const TABS = [
    { id:"hero",     label:"Hero / Portada",  I:Layout  },
    { id:"about",    label:"Info Empresa",     I:Globe   },
    { id:"seo",      label:"SEO",             I:Search  },
    { id:"featured", label:"Productos Dest.", I:Package },
    { id:"general",  label:"General",         I:Settings2},
  ] as const;

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      <SectionHeader
        title="Contenido del Sitio Web"
        sub="Edite el contenido público de la página sin necesidad de código"
        action={
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            {saved && (
              <span style={{
                background:C.greenLt, color:C.green,
                padding:"7px 14px", borderRadius:8, fontSize:12, fontWeight:700,
              }}>
                Guardado
              </span>
            )}
            <button onClick={save} disabled={saving} style={{
              display:"flex", alignItems:"center", gap:6, padding:"9px 18px",
              borderRadius:10, border:"none",
              background:saving ? C.muted : C.navy,
              color:"#fff", fontSize:13, fontWeight:700,
              cursor:saving ? "wait" : "pointer", fontFamily:"inherit",
            }}>
              <Save size={14}/>{saving ? "Guardando..." : "Publicar Cambios"}
            </button>
          </div>
        }
      />

      <div style={{ display:"flex", flex:1, overflow:"hidden" }}>
        {/* Side tabs */}
        <div style={{
          width:200, background:C.white, borderRight:`1px solid ${C.border}`,
          padding:"16px 10px", flexShrink:0,
        }}>
          {TABS.map(({ id, label, I }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{
                width:"100%", display:"flex", alignItems:"center", gap:10,
                padding:"11px 13px", borderRadius:10, border:"none",
                background:tab===id ? C.navyLt : "transparent",
                color:tab===id ? C.navy : C.muted,
                fontSize:13, fontWeight:tab===id ? 700 : 500,
                cursor:"pointer", marginBottom:3, fontFamily:"inherit",
                textAlign:"left",
                borderLeft:tab===id ? `3px solid ${C.navy}` : "3px solid transparent",
              }}
            >
              <I size={15}/>{label}
            </button>
          ))}
        </div>

        {/* Content area */}
        <div style={{ flex:1, overflowY:"auto", padding:"28px 32px" }}>

          {/* ── HERO ─────────────────────────────────────── */}
          {tab === "hero" && (
            <div>
              <h2 style={{ fontSize:17, fontWeight:700, color:C.navy, marginBottom:4 }}>Sección Hero / Portada</h2>
              <p style={{ fontSize:13, color:C.muted, marginBottom:22 }}>
                Esta es la primera sección que ven los visitantes al entrar al sitio.
              </p>

              {/* Live preview */}
              <div style={{
                background:`linear-gradient(135deg,${C.navyDk},${C.navy})`,
                borderRadius:14, padding:"28px 32px", marginBottom:24, color:"#fff",
              }}>
                <div style={{
                  display:"inline-flex", alignItems:"center", gap:6,
                  background:"rgba(13,153,204,0.2)", border:"1px solid rgba(13,153,204,0.4)",
                  borderRadius:20, padding:"5px 14px", marginBottom:14,
                  fontSize:12, color:"#7DD3FA", fontWeight:500,
                }}>
                  {content.hero.badge || "Badge del hero"}
                </div>
                <div style={{ fontSize:22, fontWeight:800, marginBottom:8, lineHeight:1.25 }}>
                  {content.hero.headline || "Título principal"}
                </div>
                <div style={{ fontSize:13, color:"rgba(255,255,255,0.7)", marginBottom:14 }}>
                  {content.hero.subheadline || "Subtítulo del hero"}
                </div>
                <div style={{
                  display:"inline-flex", alignItems:"center", gap:6,
                  background:C.teal, borderRadius:8, padding:"8px 16px",
                  fontSize:12, fontWeight:700,
                }}>
                  {content.hero.ctaText}
                </div>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:14 }}>
                <Field label="Badge / Anuncio (barra superior)"
                  value={content.hero.badge}
                  onChange={v => upd("hero","badge",v)}
                  placeholder="🇩🇴 República Dominicana · Distribución Nacional"/>
                <Field label="Título principal *"
                  value={content.hero.headline}
                  onChange={v => upd("hero","headline",v)}
                  as="textarea" rows={2}/>
                <Field label="Subtítulo / Descripción *"
                  value={content.hero.subheadline}
                  onChange={v => upd("hero","subheadline",v)}
                  as="textarea" rows={3}/>
                <Field label="Texto del botón principal"
                  value={content.hero.ctaText}
                  onChange={v => upd("hero","ctaText",v)}
                  placeholder="Ver Catálogo Completo"/>
              </div>
            </div>
          )}

          {/* ── ABOUT ────────────────────────────────────── */}
          {tab === "about" && (
            <div>
              <h2 style={{ fontSize:17, fontWeight:700, color:C.navy, marginBottom:4 }}>Información de la Empresa</h2>
              <p style={{ fontSize:13, color:C.muted, marginBottom:22 }}>
                Esta información aparece en la sección Sobre Nosotros, el footer y el formulario de contacto.
              </p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                <Field label="Nombre de la empresa" value={content.about.title}       onChange={v=>upd("about","title",v)} span={2}/>
                <Field label="Descripción breve"     value={content.about.description} onChange={v=>upd("about","description",v)} as="textarea" rows={3} span={2}/>
                <Field label="Teléfono principal"    value={content.about.phone}       onChange={v=>upd("about","phone",v)} type="tel"/>
                <Field label="Email de ventas"       value={content.about.email}       onChange={v=>upd("about","email",v)} type="email"/>
                <Field label="Dirección física"      value={content.about.address}     onChange={v=>upd("about","address",v)} span={2}/>
                <Field label="Horario de atención"   value={content.about.schedule}    onChange={v=>upd("about","schedule",v)} span={2} placeholder="Lun–Vie: 8:00 AM – 6:00 PM · Sáb: 8:00 AM – 2:00 PM"/>
              </div>
            </div>
          )}

          {/* ── SEO ──────────────────────────────────────── */}
          {tab === "seo" && (
            <div>
              <h2 style={{ fontSize:17, fontWeight:700, color:C.navy, marginBottom:4 }}>SEO & Metadatos</h2>
              <p style={{ fontSize:13, color:C.muted, marginBottom:22 }}>
                Configure cómo aparece el sitio en Google y otras redes sociales.
              </p>

              {/* SEO Preview */}
              <div style={{
                background:C.bg, borderRadius:12, padding:"18px 20px",
                marginBottom:24, border:`1px solid ${C.border}`,
              }}>
                <div style={{ fontSize:11, color:C.muted, marginBottom:10, fontWeight:700 }}>
                  VISTA PREVIA EN GOOGLE
                </div>
                <div style={{ fontSize:18, color:"#1a0dab", fontWeight:500, marginBottom:3 }}>
                  {content.seo.title || "Título de la página"}
                </div>
                <div style={{ fontSize:13, color:"#006621", marginBottom:4 }}>
                  https://hospicalfamedical.com
                </div>
                <div style={{ fontSize:13, color:"#545454", lineHeight:1.5 }}>
                  {content.seo.description || "Descripción de la página..."}
                </div>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:14 }}>
                <Field label="Título SEO (max. 60 caracteres)"
                  value={content.seo.title}
                  onChange={v=>upd("seo","title",v)}/>
                <div>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                    <label style={{ fontSize:12, fontWeight:600, color:C.txt }}>
                      Meta Descripción (max. 160 caracteres)
                    </label>
                    <span style={{ fontSize:11, color:content.seo.description.length>160?C.red:C.muted }}>
                      {content.seo.description.length}/160
                    </span>
                  </div>
                  <textarea
                    value={content.seo.description}
                    onChange={e=>upd("seo","description",e.target.value)}
                    rows={3}
                    style={{
                      width:"100%", padding:"10px 13px", borderRadius:9,
                      border:`1.5px solid ${content.seo.description.length>160?C.red:C.border}`,
                      fontSize:13, color:C.txt, background:C.bg,
                      outline:"none", fontFamily:"inherit", resize:"vertical",
                    }}
                    onFocus={e=>{(e.target as HTMLTextAreaElement).style.borderColor=C.teal;}}
                    onBlur={e=>{(e.target as HTMLTextAreaElement).style.borderColor=content.seo.description.length>160?C.red:C.border;}}
                  />
                </div>
                <Field label="Palabras clave (separadas por comas)"
                  value={content.seo.keywords}
                  onChange={v=>upd("seo","keywords",v)}
                  as="textarea" rows={2}
                  placeholder="insumos médicos, equipamiento médico, República Dominicana"/>
              </div>
            </div>
          )}

          {/* ── FEATURED ─────────────────────────────────── */}
          {tab === "featured" && (
            <div>
              <h2 style={{ fontSize:17, fontWeight:700, color:C.navy, marginBottom:4 }}>Productos Destacados</h2>
              <p style={{ fontSize:13, color:C.muted, marginBottom:22 }}>
                Seleccione qué productos aparecen en la sección destacada de la página de inicio.
              </p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:10 }}>
                {state.products.map(p => {
                  const feat = content.featuredProductIds.includes(p.id);
                  return (
                    <div key={p.id} onClick={() => {
                      updTop("featuredProductIds",
                        feat
                          ? content.featuredProductIds.filter(id=>id!==p.id)
                          : [...content.featuredProductIds, p.id]
                      );
                    }} style={{
                      display:"flex", alignItems:"center", gap:14,
                      padding:"13px 16px", borderRadius:12,
                      border:`2px solid ${feat ? C.teal : C.border}`,
                      background:feat ? C.tealLt : C.white,
                      cursor:"pointer", transition:"all 0.15s",
                    }}>
                      <div style={{ fontSize:28 }}>{p.icon}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13, fontWeight:700, color:C.txt }}>{p.name}</div>
                        <div style={{ fontSize:11, color:C.muted }}>{p.cat} · SKU: {p.sku} · Stock: {p.stock}</div>
                      </div>
                      <div style={{ fontSize:14, fontWeight:800, color:C.navy, marginRight:12 }}>
                        RD${p.price.toLocaleString()}
                      </div>
                      <div style={{
                        width:22, height:22, borderRadius:6,
                        border:`2px solid ${feat ? C.teal : C.border}`,
                        background:feat ? C.teal : "transparent",
                        display:"flex", alignItems:"center", justifyContent:"center",
                        flexShrink:0,
                      }}>
                        {feat && <span style={{ color:"#fff", fontSize:12, fontWeight:800 }}>✓</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop:16, fontSize:13, color:C.muted, textAlign:"right" }}>
                {content.featuredProductIds.length} productos destacados seleccionados
              </div>
            </div>
          )}

          {/* ── GENERAL ──────────────────────────────────── */}
          {tab === "general" && (
            <div>
              <h2 style={{ fontSize:17, fontWeight:700, color:C.navy, marginBottom:4 }}>Configuración General</h2>
              <p style={{ fontSize:13, color:C.muted, marginBottom:22 }}>
                Controles generales del comportamiento del sitio.
              </p>

              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {/* Toggle options */}
                {[
                  {
                    label:"Mostrar Banner de Envíos",
                    desc:"Muestra la barra de información de envíos en la página de inicio",
                    field:"showShippingBanner",
                    val:content.showShippingBanner,
                  },
                  {
                    label:"Modo Mantenimiento",
                    desc:"Los visitantes verán un mensaje de mantenimiento. Solo admins pueden entrar.",
                    field:"maintenanceMode",
                    val:content.maintenanceMode,
                  },
                ].map(opt => (
                  <div key={opt.field} style={{
                    background:C.white, borderRadius:12, padding:"18px 20px",
                    border:`1px solid ${opt.val && opt.field==="maintenanceMode" ? C.red : C.border}`,
                    display:"flex", justifyContent:"space-between", alignItems:"center",
                  }}>
                    <div>
                      <div style={{ fontSize:14, fontWeight:700, color:opt.val&&opt.field==="maintenanceMode"?C.red:C.txt }}>
                        {opt.label}
                      </div>
                      <div style={{ fontSize:12, color:C.muted, marginTop:3 }}>{opt.desc}</div>
                    </div>
                    <button
                      onClick={() => updTop(opt.field, !opt.val)}
                      style={{
                        width:52, height:28, borderRadius:14,
                        border:"none", cursor:"pointer",
                        background:opt.val ? (opt.field==="maintenanceMode"?C.red:C.teal) : C.border,
                        position:"relative", transition:"background 0.2s",
                        flexShrink:0,
                      }}
                    >
                      <div style={{
                        width:20, height:20, borderRadius:"50%", background:"#fff",
                        position:"absolute", top:4,
                        left:opt.val ? 28 : 4,
                        transition:"left 0.2s",
                        boxShadow:"0 1px 4px rgba(0,0,0,0.2)",
                      }}/>
                    </button>
                  </div>
                ))}

                {/* Free shipping threshold */}
                <div style={{
                  background:C.white, borderRadius:12, padding:"18px 20px",
                  border:`1px solid ${C.border}`,
                }}>
                  <div style={{ fontSize:14, fontWeight:700, color:C.txt, marginBottom:3 }}>
                    Umbral para Envío Gratis (RD$)
                  </div>
                  <div style={{ fontSize:12, color:C.muted, marginBottom:14 }}>
                    Pedidos iguales o superiores a este monto tienen envío gratuito
                  </div>
                  <div style={{ display:"flex", gap:14, alignItems:"center" }}>
                    <input
                      type="number"
                      value={content.freeShippingThreshold}
                      onChange={e => updTop("freeShippingThreshold", Number(e.target.value))}
                      style={{
                        width:180, padding:"10px 13px", borderRadius:9,
                        border:`1.5px solid ${C.border}`, fontSize:15, fontWeight:700,
                        color:C.navy, background:C.bg, outline:"none", fontFamily:"inherit",
                      }}
                      onFocus={e=>{(e.target as HTMLInputElement).style.borderColor=C.teal;}}
                      onBlur={e=>{(e.target as HTMLInputElement).style.borderColor=C.border;}}
                    />
                    <div style={{
                      background:C.tealLt, borderRadius:9, padding:"10px 16px",
                      fontSize:13, color:C.tealDk, fontWeight:600,
                    }}>
                      Envío gratis en pedidos ≥ RD${content.freeShippingThreshold.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Global save button */}
          <div style={{ marginTop:28, display:"flex", justifyContent:"flex-end", gap:10 }}>
            {saved && (
              <span style={{
                background:C.greenLt, color:C.green, padding:"12px 18px",
                borderRadius:10, fontSize:13, fontWeight:700,
                display:"flex", alignItems:"center", gap:6,
              }}>
                Cambios publicados
              </span>
            )}
            <button onClick={save} disabled={saving} style={{
              display:"flex", alignItems:"center", gap:8, padding:"12px 24px",
              borderRadius:10, border:"none",
              background:saving ? C.muted : C.navy, color:"#fff",
              fontSize:14, fontWeight:700,
              cursor:saving ? "wait" : "pointer", fontFamily:"inherit",
            }}>
              <Save size={15}/>{saving ? "Guardando..." : "Publicar Cambios"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
