"use client";
import { useState } from "react";
import { Search, Plus, Eye, Edit2, Trash2, ToggleLeft, ToggleRight, Star } from "lucide-react";
import { useAdmin, type AdminProduct } from "@/lib/adminStore";
import { Modal, SectionHeader, Field, SaveBtn, ConfirmDialog } from "./shared";
import { COLORS as C } from "@/lib/data";
import { fmt, stockColor } from "@/lib/utils";

const CATEGORIES = [
  {v:"Protección",  l:"Protección"},
  {v:"Diagnóstico", l:"Diagnóstico"},
  {v:"Curación",    l:"Curación"},
  {v:"Inyectables", l:"Inyectables"},
  {v:"Catéteres",   l:"Catéteres"},
  {v:"Equipamiento",l:"Equipamiento"},
];
const ICONS = ["🧤","😷","💉","🩺","📊","🩹","🌡️","🔬","🏥","🥼","💊","🧻","⚕️","🔭","💊","🩻"];

const EMPTY: AdminProduct = {
  id:0, name:"", cat:"Protección", price:0, stock:0, sku:"",
  feat:false, rating:5.0, reviews:0, icon:"⚕️",
  description:"", specs:[],
  active:true, costPrice:0, supplier:"", notes:"", lastUpdated:"",
};

export function AdminProducts() {
  const { state, dispatch } = useAdmin();
  const [search, setSearch]   = useState("");
  const [catF, setCatF]       = useState("Todas");
  const [editing, setEditing] = useState<AdminProduct|null>(null);
  const [viewing, setViewing] = useState<AdminProduct|null>(null);
  const [deleting,setDeleting]= useState<AdminProduct|null>(null);
  const [isNew, setIsNew]     = useState(false);
  const [saving, setSaving]   = useState(false);

  const allCats = ["Todas", ...Array.from(new Set(state.products.map(p=>p.cat)))];
  const filtered = state.products.filter(p=>
    (catF==="Todas"||p.cat===catF) &&
    (p.name.toLowerCase().includes(search.toLowerCase())||
     p.sku.toLowerCase().includes(search.toLowerCase()))
  );

  const upd = (field: keyof AdminProduct, val: string|number|boolean) =>
    setEditing(e => e ? { ...e, [field]: val } as AdminProduct : null);

  const openNew = () => {
    const newId = Math.max(0,...state.products.map(p=>p.id))+1;
    setEditing({ ...EMPTY, id:newId, lastUpdated:new Date().toISOString().split("T")[0] });
    setIsNew(true);
  };

  const save = async () => {
    if(!editing||!editing.name.trim()||!editing.sku.trim()) return;
    setSaving(true);
    await new Promise(r=>setTimeout(r,600));
    if(isNew) dispatch({ type:"ADD_PRODUCT", product:editing });
    else       dispatch({ type:"UPD_PRODUCT", product:{...editing,lastUpdated:new Date().toISOString().split("T")[0]} });
    setSaving(false);
    setEditing(null);
    setIsNew(false);
  };

  const toggleActive = (p: AdminProduct) =>
    dispatch({ type:"UPD_PRODUCT", product:{...p,active:!p.active} });

  const toggleFeat = (p: AdminProduct) =>
    dispatch({ type:"UPD_PRODUCT", product:{...p,feat:!p.feat} });

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      <SectionHeader
        title="Gestión de Productos"
        sub={`${state.products.length} productos · ${state.products.filter(p=>p.active).length} activos`}
        action={
          <button onClick={openNew} style={{
            display:"flex",alignItems:"center",gap:6,padding:"9px 18px",
            borderRadius:10,border:"none",background:C.navy,color:"#fff",
            fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit",
          }}>
            <Plus size={14}/> Nuevo Producto
          </button>
        }
      />

      <div style={{ padding:"20px 32px", overflowY:"auto", flex:1 }}>
        {/* Filters */}
        <div style={{ display:"flex", gap:12, marginBottom:18 }}>
          <div style={{ flex:1,background:C.white,border:`1px solid ${C.border}`,borderRadius:12,padding:"10px 16px",display:"flex",alignItems:"center",gap:10 }}>
            <Search size={15} color={C.muted}/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar por nombre o SKU..."
              style={{ border:"none",outline:"none",fontSize:14,flex:1,background:"transparent",color:C.txt,fontFamily:"inherit" }}/>
            {search&&<button onClick={()=>setSearch("")} style={{ background:"none",border:"none",cursor:"pointer",color:C.muted,fontSize:18 }}>×</button>}
          </div>
          <select value={catF} onChange={e=>setCatF(e.target.value)} style={{ background:C.white,border:`1px solid ${C.border}`,borderRadius:12,padding:"10px 16px",fontSize:14,color:C.txt,cursor:"pointer",outline:"none",fontFamily:"inherit" }}>
            {allCats.map(c=><option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Table */}
        <div style={{ background:C.white,borderRadius:16,border:`1px solid ${C.border}`,overflow:"hidden" }}>
          <table style={{ width:"100%",borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ background:C.bg,borderBottom:`1px solid ${C.border}` }}>
                {["Producto","SKU","Categoría","P. Costo","P. Venta","Margen","Stock","Destacado","Estado","Acciones"].map(h=>(
                  <th key={h} style={{ padding:"10px 14px",textAlign:"left",fontSize:10,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"0.3px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length===0?(
                <tr><td colSpan={10} style={{ padding:"48px",textAlign:"center",color:C.muted }}>No se encontraron productos</td></tr>
              ):filtered.map((p,i)=>{
                const margin = p.costPrice>0?Math.round((1-p.costPrice/p.price)*100):0;
                const sc = stockColor(p.stock,40);
                return (
                  <tr key={p.id} style={{ borderBottom:i<filtered.length-1?`1px solid ${C.border}`:"none",transition:"background 0.12s",opacity:p.active?1:0.55 }}
                    onMouseEnter={e=>{(e.currentTarget as HTMLTableRowElement).style.background=C.bg;}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLTableRowElement).style.background="transparent";}}>
                    <td style={{ padding:"11px 14px" }}>
                      <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                        <div style={{ fontSize:22,width:34,textAlign:"center",flexShrink:0 }}>{p.icon}</div>
                        <div>
                          <div style={{ fontSize:13,fontWeight:700,color:C.txt }}>{p.name}</div>
                          <div style={{ fontSize:10,color:C.muted }}>{p.supplier}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding:"11px 14px",fontSize:11,fontFamily:"monospace",color:C.muted }}>{p.sku}</td>
                    <td style={{ padding:"11px 14px" }}>
                      <span style={{ background:C.tealLt,color:C.tealDk,padding:"2px 8px",borderRadius:8,fontSize:11,fontWeight:700 }}>{p.cat}</span>
                    </td>
                    <td style={{ padding:"11px 14px",fontSize:12,color:C.muted }}>{fmt(p.costPrice)}</td>
                    <td style={{ padding:"11px 14px",fontSize:13,fontWeight:700,color:C.navy }}>{fmt(p.price)}</td>
                    <td style={{ padding:"11px 14px" }}>
                      <span style={{ fontSize:12,fontWeight:700,color:margin>35?C.green:margin>25?C.amber:C.red }}>{margin}%</span>
                    </td>
                    <td style={{ padding:"11px 14px" }}>
                      <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                        <div style={{ width:6,height:6,borderRadius:"50%",background:sc }}/>
                        <span style={{ fontSize:13,fontWeight:800,color:sc }}>{p.stock}</span>
                      </div>
                    </td>
                    <td style={{ padding:"11px 14px" }}>
                      <button onClick={()=>toggleFeat(p)} style={{
                        background:p.feat?"#FEF3C7":"#F3F4F6",
                        border:"none",borderRadius:8,padding:"4px 8px",
                        cursor:"pointer",fontSize:11,fontWeight:700,
                        color:p.feat?C.amber:C.muted,display:"flex",alignItems:"center",gap:3,
                      }}>
                        <Star size={11} fill={p.feat?C.amber:"none"} color={p.feat?C.amber:C.muted}/>
                        {p.feat?"Destacado":"Normal"}
                      </button>
                    </td>
                    <td style={{ padding:"11px 14px" }}>
                      <button onClick={()=>toggleActive(p)} style={{
                        background:p.active?"#D1FAE5":"#F3F4F6",
                        border:"none",borderRadius:8,padding:"4px 10px",
                        cursor:"pointer",fontSize:11,fontWeight:700,
                        color:p.active?C.green:C.muted,display:"flex",alignItems:"center",gap:5,
                      }}>
                        {p.active?<ToggleRight size={13}/>:<ToggleLeft size={13}/>}
                        {p.active?"Activo":"Inactivo"}
                      </button>
                    </td>
                    <td style={{ padding:"11px 14px" }}>
                      <div style={{ display:"flex",gap:5 }}>
                        <button onClick={()=>setViewing(p)} style={{ padding:"6px",borderRadius:6,border:"none",background:C.tealLt,cursor:"pointer",display:"flex" }}><Eye size={12} color={C.tealDk}/></button>
                        <button onClick={()=>{setEditing({...p});setIsNew(false);}} style={{ padding:"6px",borderRadius:6,border:"none",background:"#EFF6FF",cursor:"pointer",display:"flex" }}><Edit2 size={12} color={C.navy}/></button>
                        <button onClick={()=>setDeleting(p)} style={{ padding:"6px",borderRadius:6,border:"none",background:"#FEF2F2",cursor:"pointer",display:"flex" }}><Trash2 size={12} color={C.red}/></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop:10,fontSize:12,color:C.muted,textAlign:"right" }}>
          {filtered.length} de {state.products.length} productos
        </div>
      </div>

      {/* VIEW */}
      {viewing&&(
        <Modal title={viewing.name} subtitle={`${viewing.cat} · SKU: ${viewing.sku}`} onClose={()=>setViewing(null)} width={560}>
          <div style={{ display:"flex",gap:16,marginBottom:20,alignItems:"flex-start" }}>
            <div style={{ width:80,height:80,background:C.bg,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:44,flexShrink:0 }}>{viewing.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex",gap:10,marginBottom:10,flexWrap:"wrap" }}>
                <span style={{ background:C.tealLt,color:C.tealDk,padding:"3px 10px",borderRadius:10,fontSize:11,fontWeight:700 }}>{viewing.cat}</span>
                {viewing.feat&&<span style={{ background:"#FEF3C7",color:C.amber,padding:"3px 10px",borderRadius:10,fontSize:11,fontWeight:700 }}>★ Destacado</span>}
                <span style={{ background:viewing.active?"#D1FAE5":"#F3F4F6",color:viewing.active?C.green:C.muted,padding:"3px 10px",borderRadius:10,fontSize:11,fontWeight:700 }}>{viewing.active?"Activo":"Inactivo"}</span>
              </div>
              <p style={{ fontSize:13,color:C.muted,lineHeight:1.6 }}>{viewing.description}</p>
            </div>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:18 }}>
            {[{l:"Precio Venta",v:fmt(viewing.price)},{l:"Precio Costo",v:fmt(viewing.costPrice)},{l:"Margen",v:viewing.costPrice>0?`${Math.round((1-viewing.costPrice/viewing.price)*100)}%`:"—"},{l:"Stock",v:`${viewing.stock} uds`},{l:"Proveedor",v:viewing.supplier||"—"},{l:"Actualizado",v:viewing.lastUpdated||"—"}].map((f,i)=>(
              <div key={i} style={{ background:C.bg,borderRadius:9,padding:"12px 13px" }}>
                <div style={{ fontSize:10,color:C.muted,marginBottom:3,fontWeight:600 }}>{f.l}</div>
                <div style={{ fontSize:14,fontWeight:700,color:C.navy }}>{f.v}</div>
              </div>
            ))}
          </div>
          {viewing.specs.length>0&&(
            <>
              <h4 style={{ fontSize:13,fontWeight:700,color:C.navy,marginBottom:10 }}>Especificaciones</h4>
              {viewing.specs.map((s,i)=>(
                <div key={i} style={{ display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:i<viewing.specs.length-1?`1px solid ${C.border}`:"none",fontSize:12 }}>
                  <span style={{ color:C.muted }}>{s.label}</span>
                  <span style={{ fontWeight:600 }}>{s.value}</span>
                </div>
              ))}
            </>
          )}
          {viewing.notes&&<div style={{ background:"#FFFBEB",borderRadius:10,padding:"12px",marginTop:14,fontSize:13,color:"#92400E" }}><strong>Notas:</strong> {viewing.notes}</div>}
          <div style={{ display:"flex",gap:10,marginTop:18 }}>
            <button onClick={()=>{setViewing(null);setEditing({...viewing});setIsNew(false);}} style={{ flex:1,padding:"11px",background:C.navy,color:"#fff",border:"none",borderRadius:10,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit" }}>Editar</button>
            <button onClick={()=>setViewing(null)} style={{ flex:1,padding:"11px",background:C.white,border:`1px solid ${C.border}`,borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit",color:C.txt }}>Cerrar</button>
          </div>
        </Modal>
      )}

      {/* EDIT / NEW */}
      {editing&&(
        <Modal title={isNew?"Nuevo Producto":`Editar: ${editing.name}`} subtitle={isNew?"Complete los datos del producto":"Modifique los campos necesarios"} onClose={()=>{setEditing(null);setIsNew(false);}} width={680}>
          {/* Icon selector */}
          <div style={{ marginBottom:18 }}>
            <label style={{ fontSize:12,fontWeight:600,color:C.txt,display:"block",marginBottom:8 }}>Ícono del producto</label>
            <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
              {ICONS.map(ic=>(
                <button key={ic} onClick={()=>upd("icon",ic)} style={{
                  width:42,height:42,borderRadius:9,border:`2px solid ${editing.icon===ic?C.teal:C.border}`,
                  background:editing.icon===ic?C.tealLt:"transparent",cursor:"pointer",fontSize:22,
                }}>{ic}</button>
              ))}
            </div>
          </div>

          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
            <Field label="Nombre del producto *" value={editing.name}       onChange={v=>upd("name",v)}       span={2}/>
            <Field label="SKU *"                 value={editing.sku}        onChange={v=>upd("sku",v)}        placeholder="CAT-001"/>
            <Field label="Categoría"             value={editing.cat}        onChange={v=>upd("cat",v)}        as="select" options={CATEGORIES}/>
            <Field label="Precio de Venta (RD$)" value={editing.price}      onChange={v=>upd("price",Number(v))} type="number"/>
            <Field label="Precio de Costo (RD$)" value={editing.costPrice}  onChange={v=>upd("costPrice",Number(v))} type="number"/>
            <Field label="Stock inicial"         value={editing.stock}      onChange={v=>upd("stock",Number(v))} type="number"/>
            <Field label="Proveedor"             value={editing.supplier}   onChange={v=>upd("supplier",v)}   placeholder="Nombre del proveedor"/>
            <Field label="Descripción"           value={editing.description}onChange={v=>upd("description",v)}as="textarea" rows={3} span={2}/>
            <Field label="Notas internas"        value={editing.notes}      onChange={v=>upd("notes",v)}      as="textarea" rows={2} span={2} placeholder="Notas solo para el equipo..."/>
          </div>

          <div style={{ display:"flex",gap:12,marginTop:16 }}>
            {[
              {l:"Producto activo (visible en web)",  field:"active" as const,  val:editing.active},
              {l:"Producto destacado (portada)",       field:"feat"   as const,  val:editing.feat},
            ].map(opt=>(
              <div key={opt.field} onClick={()=>upd(opt.field,!opt.val)} style={{
                flex:1,padding:"12px 16px",borderRadius:10,cursor:"pointer",
                border:`1.5px solid ${opt.val?C.teal:C.border}`,
                background:opt.val?C.tealLt:C.bg,
                display:"flex",alignItems:"center",gap:10,
              }}>
                <div style={{
                  width:20,height:20,borderRadius:5,border:`2px solid ${opt.val?C.teal:C.border}`,
                  background:opt.val?C.teal:"transparent",
                  display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,
                }}>
                  {opt.val&&<span style={{ color:"#fff",fontSize:11,fontWeight:800 }}>✓</span>}
                </div>
                <span style={{ fontSize:12,fontWeight:600,color:opt.val?C.tealDk:C.muted }}>{opt.l}</span>
              </div>
            ))}
          </div>

          <SaveBtn onClick={save} loading={saving} label={isNew?"Crear Producto":"Guardar Cambios"}/>
        </Modal>
      )}

      <ConfirmDialog
        isOpen={!!deleting}
        title="¿Eliminar producto?"
        message={`¿Seguro que desea eliminar "${deleting?.name}"? Esta acción no se puede deshacer.`}
        onConfirm={()=>{if(deleting){dispatch({type:"DEL_PRODUCT",id:deleting.id});setDeleting(null);}}}
        onCancel={()=>setDeleting(null)}
        danger
      />
    </div>
  );
}
