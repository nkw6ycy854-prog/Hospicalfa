"use client";
import { useState } from "react";
import { Search, Plus, Edit2, History, TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { useAdmin, type AdminProduct, type StockMovement } from "@/lib/adminStore";
import { Modal, SectionHeader, Field, SaveBtn, ConfirmDialog } from "./shared";
import { COLORS as C } from "@/lib/data";
import { fmt, stockColor } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function AdminInventory() {
  const { state, dispatch } = useAdmin();
  const [search, setSearch]   = useState("");
  const [tab, setTab]         = useState<"stock"|"movements">("stock");
  const [adjusting, setAdjusting] = useState<AdminProduct|null>(null);
  const [delta, setDelta]     = useState<number>(0);
  const [reason, setReason]   = useState("");
  const [saving, setSaving]   = useState(false);
  const [filterAlert, setFilterAlert] = useState(false);

  const filtered = state.products.filter(p=>
    (!filterAlert || p.stock <= 30) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) ||
     p.sku.toLowerCase().includes(search.toLowerCase()))
  );

  const critical = state.products.filter(p=>p.stock<20).length;
  const low      = state.products.filter(p=>p.stock>=20&&p.stock<=40).length;
  const ok       = state.products.filter(p=>p.stock>40).length;
  const totalVal = state.products.reduce((s,p)=>s+p.stock*p.costPrice,0);

  const doAdjust = async () => {
    if(!adjusting||delta===0||!reason.trim()) return;
    setSaving(true);
    await new Promise(r=>setTimeout(r,500));
    dispatch({ type:"ADJUST_STOCK", productId:adjusting.id, delta, reason, user:"Administrador" });
    setSaving(false);
    setAdjusting(null);
    setDelta(0);
    setReason("");
  };

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <SectionHeader
        title="Control de Inventario"
        sub={`${state.products.length} productos · Valor en stock: ${fmt(totalVal)}`}
        action={
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <button
              onClick={()=>setFilterAlert(f=>!f)}
              style={{display:"flex",alignItems:"center",gap:6,padding:"9px 16px",borderRadius:10,border:`1px solid ${filterAlert?C.red:C.border}`,background:filterAlert?"#FEF2F2":C.white,fontSize:13,fontWeight:600,cursor:"pointer",color:filterAlert?C.red:C.txt,fontFamily:"inherit"}}>
              ⚠ Solo alertas
            </button>
          </div>
        }
      />

      <div style={{padding:"20px 32px",overflowY:"auto",flex:1}}>
        {/* KPI */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:22}}>
          {[
            {l:"Stock Crítico",  v:critical, c:C.red,   icon:"🔴"},
            {l:"Stock Bajo",     v:low,      c:C.amber,  icon:"🟡"},
            {l:"Stock Normal",   v:ok,       c:C.green,  icon:"🟢"},
            {l:"Valor en Stock", v:fmt(totalVal), c:C.navy, icon:"💰"},
          ].map((s,i)=>(
            <div key={i} style={{background:C.white,borderRadius:12,padding:"16px 18px",border:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:14}}>
              <div style={{fontSize:26}}>{s.icon}</div>
              <div>
                <div style={{fontSize:11,color:C.muted,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.4px",fontWeight:600}}>{s.l}</div>
                <div style={{fontSize:typeof s.v==="string"?16:24,fontWeight:800,color:s.c}}>{s.v}</div>
              </div>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div style={{display:"flex",gap:0,marginBottom:18,borderBottom:`1px solid ${C.border}`}}>
          {(["stock","movements"] as const).map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{
              padding:"10px 20px",border:"none",background:"transparent",
              fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",
              color:tab===t?C.navy:C.muted,
              borderBottom:tab===t?`2.5px solid ${C.navy}`:"2.5px solid transparent",
              transition:"all 0.15s",
            }}>
              {t==="stock"?"📦 Stock de Productos":"📋 Historial de Movimientos"}
            </button>
          ))}
        </div>

        {tab==="stock"&&(
          <>
            {/* SEARCH */}
            <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:12,padding:"10px 16px",display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
              <Search size={15} color={C.muted}/>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar producto o SKU..."
                style={{border:"none",outline:"none",fontSize:14,flex:1,background:"transparent",color:C.txt,fontFamily:"inherit"}}/>
            </div>

            {/* CHART */}
            {filtered.length>0&&(
              <div style={{background:C.white,borderRadius:14,border:`1px solid ${C.border}`,padding:"20px",marginBottom:18}}>
                <h3 style={{fontSize:14,fontWeight:700,color:C.navy,marginBottom:14}}>Nivel de Stock — Top 8 productos</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={filtered.slice(0,8).map(p=>({name:p.icon+" "+p.name.slice(0,13),stock:p.stock,min:30}))}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
                    <XAxis dataKey="name" tick={{fontSize:9,fill:C.muted}} axisLine={false} tickLine={false}/>
                    <YAxis tick={{fontSize:11,fill:C.muted}} axisLine={false} tickLine={false}/>
                    <Tooltip contentStyle={{borderRadius:10,border:`1px solid ${C.border}`,fontSize:12}}/>
                    <Bar dataKey="stock" radius={[4,4,0,0]} name="Stock"
                      fill={C.teal}/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* TABLE */}
            <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.border}`,overflow:"hidden"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead>
                  <tr style={{background:C.bg,borderBottom:`1px solid ${C.border}`}}>
                    {["Producto","SKU","Categoría","Stock","Precio Costo","Precio Venta","Margen","Proveedor","Acciones"].map(h=>(
                      <th key={h} style={{padding:"10px 14px",textAlign:"left",fontSize:10,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"0.3px"}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p,i)=>{
                    const margin = Math.round((1-p.costPrice/p.price)*100);
                    const sc = stockColor(p.stock,40);
                    return (
                      <tr key={p.id} style={{borderBottom:i<filtered.length-1?`1px solid ${C.border}`:"none",transition:"background 0.12s"}}
                        onMouseEnter={e=>{(e.currentTarget as HTMLTableRowElement).style.background=C.bg;}}
                        onMouseLeave={e=>{(e.currentTarget as HTMLTableRowElement).style.background="transparent";}}>
                        <td style={{padding:"12px 14px"}}>
                          <div style={{display:"flex",alignItems:"center",gap:8}}>
                            <div style={{fontSize:20,width:34,textAlign:"center"}}>{p.icon}</div>
                            <span style={{fontSize:13,fontWeight:700,color:C.txt}}>{p.name}</span>
                          </div>
                        </td>
                        <td style={{padding:"12px 14px",fontSize:11,fontFamily:"monospace",color:C.muted}}>{p.sku}</td>
                        <td style={{padding:"12px 14px",fontSize:12,color:C.muted}}>{p.cat}</td>
                        <td style={{padding:"12px 14px"}}>
                          <div style={{display:"flex",alignItems:"center",gap:8}}>
                            <div style={{width:6,height:6,borderRadius:"50%",background:sc}}/>
                            <span style={{fontSize:15,fontWeight:800,color:sc}}>{p.stock}</span>
                            {p.stock<30&&<span style={{fontSize:10,background:"#FEF2F2",color:C.red,padding:"2px 6px",borderRadius:8,fontWeight:700}}>
                              {p.stock<20?"CRÍTICO":"BAJO"}
                            </span>}
                          </div>
                        </td>
                        <td style={{padding:"12px 14px",fontSize:13,color:C.muted}}>{fmt(p.costPrice)}</td>
                        <td style={{padding:"12px 14px",fontSize:13,fontWeight:700,color:C.navy}}>{fmt(p.price)}</td>
                        <td style={{padding:"12px 14px"}}>
                          <span style={{fontSize:13,fontWeight:700,color:margin>35?C.green:margin>25?C.amber:C.red}}>{margin}%</span>
                        </td>
                        <td style={{padding:"12px 14px",fontSize:12,color:C.muted}}>{p.supplier}</td>
                        <td style={{padding:"12px 14px"}}>
                          <button onClick={()=>{setAdjusting(p);setDelta(0);setReason("");}} style={{
                            display:"flex",alignItems:"center",gap:5,padding:"6px 12px",borderRadius:8,
                            border:"none",background:C.navyLt,color:C.navy,fontSize:12,fontWeight:700,
                            cursor:"pointer",fontFamily:"inherit",
                          }}>
                            <RefreshCw size={12}/> Ajustar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab==="movements"&&(
          <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.border}`,overflow:"hidden"}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead>
                <tr style={{background:C.bg,borderBottom:`1px solid ${C.border}`}}>
                  {["#","Producto","Tipo","Cantidad","Antes","Después","Razón","Usuario","Fecha"].map(h=>(
                    <th key={h} style={{padding:"10px 14px",textAlign:"left",fontSize:10,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"0.3px"}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {state.movements.map((m,i)=>{
                  const typeConfig:{[k:string]:{bg:string;c:string;I:React.ElementType}} = {
                    entrada:   {bg:"#D1FAE5",c:"#065F46",  I:TrendingUp},
                    salida:    {bg:"#FEE2E2",c:"#991B1B",  I:TrendingDown},
                    ajuste:    {bg:"#FEF3C7",c:"#92400E",  I:RefreshCw},
                    devolucion:{bg:"#EDE9FE",c:"#5B21B6",  I:History},
                  };
                  const tc = typeConfig[m.type]??{bg:C.bg,c:C.muted,I:RefreshCw};
                  return (
                    <tr key={m.id} style={{borderBottom:i<state.movements.length-1?`1px solid ${C.border}`:"none"}}>
                      <td style={{padding:"11px 14px",fontSize:12,color:C.muted,fontFamily:"monospace"}}>#{m.id}</td>
                      <td style={{padding:"11px 14px",fontSize:13,fontWeight:600,color:C.txt}}>{m.productName}</td>
                      <td style={{padding:"11px 14px"}}>
                        <span style={{background:tc.bg,color:tc.c,padding:"3px 9px",borderRadius:10,fontSize:11,fontWeight:700,textTransform:"capitalize"}}>
                          {m.type}
                        </span>
                      </td>
                      <td style={{padding:"11px 14px",fontSize:14,fontWeight:800,color:m.type==="salida"?C.red:C.green}}>
                        {m.type==="salida"?"-":"+"}
                        {Math.abs(m.qty)}
                      </td>
                      <td style={{padding:"11px 14px",fontSize:13,color:C.muted}}>{m.before}</td>
                      <td style={{padding:"11px 14px",fontSize:13,fontWeight:700,color:C.navy}}>{m.after}</td>
                      <td style={{padding:"11px 14px",fontSize:12,color:C.muted}}>{m.reason}</td>
                      <td style={{padding:"11px 14px",fontSize:12,color:C.muted}}>{m.user}</td>
                      <td style={{padding:"11px 14px",fontSize:12,color:C.muted}}>{m.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADJUST MODAL */}
      {adjusting&&(
        <Modal title="Ajustar Stock" subtitle={`${adjusting.name} · Stock actual: ${adjusting.stock} uds`} onClose={()=>setAdjusting(null)} width={480}>
          <div style={{background:C.navyLt,borderRadius:10,padding:"14px 16px",marginBottom:20,display:"flex",justifyContent:"space-between"}}>
            <div><div style={{fontSize:11,color:C.muted,marginBottom:3}}>Stock actual</div><div style={{fontSize:22,fontWeight:800,color:C.navy}}>{adjusting.stock} uds</div></div>
            <div><div style={{fontSize:11,color:C.muted,marginBottom:3}}>Precio costo</div><div style={{fontSize:16,fontWeight:700,color:C.muted}}>{fmt(adjusting.costPrice)}</div></div>
            <div><div style={{fontSize:11,color:C.muted,marginBottom:3}}>Precio venta</div><div style={{fontSize:16,fontWeight:700,color:C.navy}}>{fmt(adjusting.price)}</div></div>
          </div>

          <div style={{marginBottom:16}}>
            <label style={{fontSize:12,fontWeight:600,color:C.txt,display:"block",marginBottom:8}}>Tipo de ajuste</label>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
              {[
                {label:"+ Entrada",  val:Math.abs(delta)||10,  bg:"#D1FAE5",c:C.green},
                {label:"- Salida",   val:-(Math.abs(delta)||10),bg:"#FEE2E2",c:C.red},
                {label:"= Ajuste",   val:0,                    bg:"#FEF3C7",c:C.amber},
              ].map((opt,i)=>(
                <button key={i} onClick={()=>setDelta(opt.val)} style={{
                  padding:"10px",borderRadius:9,border:`2px solid ${
                    (i===0&&delta>0)||(i===1&&delta<0)||(i===2&&delta===0)?
                    [C.green,C.red,C.amber][i]:C.border
                  }`,
                  background:opt.bg,cursor:"pointer",fontSize:12,fontWeight:700,
                  color:opt.c,fontFamily:"inherit",
                }}>{opt.label}</button>
              ))}
            </div>
          </div>

          <div style={{marginBottom:16}}>
            <label style={{fontSize:12,fontWeight:600,color:C.txt,display:"block",marginBottom:6}}>
              Cantidad {delta<0?"a restar":"a agregar"} (unidades)
            </label>
            <div style={{display:"flex",alignItems:"center",border:`1.5px solid ${C.border}`,borderRadius:10,overflow:"hidden"}}>
              <button onClick={()=>setDelta(d=>d===0?-1:d-1)} style={{width:44,height:44,border:"none",background:C.bg,cursor:"pointer",fontSize:20,color:C.muted,fontFamily:"inherit"}}>−</button>
              <input type="number" value={delta} onChange={e=>setDelta(Number(e.target.value))}
                style={{flex:1,textAlign:"center",border:"none",outline:"none",fontSize:18,fontWeight:800,color:delta>0?C.green:delta<0?C.red:C.txt,fontFamily:"inherit",background:"transparent"}}/>
              <button onClick={()=>setDelta(d=>d===0?1:d+1)} style={{width:44,height:44,border:"none",background:C.bg,cursor:"pointer",fontSize:20,color:C.muted,fontFamily:"inherit"}}>+</button>
            </div>
            <div style={{marginTop:8,fontSize:13,color:C.muted,textAlign:"center"}}>
              Nuevo stock: <strong style={{color:C.navy,fontSize:15}}>{Math.max(0,adjusting.stock+delta)} uds</strong>
            </div>
          </div>

          <div style={{marginBottom:8}}>
            <label style={{fontSize:12,fontWeight:600,color:C.txt,display:"block",marginBottom:6}}>Razón del ajuste *</label>
            <input value={reason} onChange={e=>setReason(e.target.value)} placeholder="Ej: Compra proveedor, ajuste conteo físico, daños..."
              style={{width:"100%",padding:"10px 13px",borderRadius:9,border:`1.5px solid ${C.border}`,fontSize:13,color:C.txt,background:C.bg,outline:"none",fontFamily:"inherit"}}
              onFocus={e=>{(e.target as HTMLInputElement).style.borderColor=C.teal;}}
              onBlur={e=>{(e.target as HTMLInputElement).style.borderColor=C.border;}}
            />
          </div>

          <div style={{display:"flex",gap:10,marginTop:20}}>
            <button onClick={()=>setAdjusting(null)} style={{flex:1,padding:"12px",background:C.white,border:`1px solid ${C.border}`,borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer",color:C.txt,fontFamily:"inherit"}}>Cancelar</button>
            <button onClick={doAdjust} disabled={saving||delta===0||!reason.trim()} style={{flex:2,padding:"12px",background:saving||delta===0||!reason.trim()?C.muted:C.navy,color:"#fff",border:"none",borderRadius:10,fontSize:13,fontWeight:700,cursor:saving?"wait":"pointer",fontFamily:"inherit"}}>
              {saving?"Guardando...":"✓ Aplicar Ajuste"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
