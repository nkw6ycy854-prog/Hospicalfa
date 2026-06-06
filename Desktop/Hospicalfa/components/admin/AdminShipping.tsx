"use client";
import { useState } from "react";
import { Edit2, Save, MapPin, Truck, Zap, ToggleLeft, ToggleRight } from "lucide-react";
import { useAdmin, type AdminProvince } from "@/lib/adminStore";
import { Modal, SectionHeader, Field, SaveBtn } from "./shared";
import { COLORS as C } from "@/lib/data";
import { fmt } from "@/lib/utils";

const CARRIERS = [
  {v:"Caribe Express",  l:"Caribe Express"},
  {v:"DHL RD",          l:"DHL RD"},
  {v:"Urgente RD",      l:"Urgente RD"},
  {v:"MotoMensajero",   l:"MotoMensajero"},
  {v:"Domilión",        l:"Domilión"},
  {v:"FedEx RD",        l:"FedEx RD"},
];

export function AdminShipping() {
  const { state, dispatch } = useAdmin();
  const [editing, setEditing] = useState<AdminProvince|null>(null);
  const [saving, setSaving]   = useState(false);
  const [globalFreeThreshold, setGlobalFree] = useState(state.content.freeShippingThreshold);
  const [savingGlobal, setSavingGlobal]       = useState(false);

  const active   = state.provinces.filter(p=>p.active).length;
  const avgRate  = Math.round(state.provinces.filter(p=>p.rate>0).reduce((s,p)=>s+p.rate,0)/state.provinces.filter(p=>p.rate>0).length);
  const freeCount= state.provinces.filter(p=>p.rate===0).length;

  const upd = (field: keyof AdminProvince, val: string|number|boolean) =>
    setEditing(e=>e?{...e,[field]:val} as AdminProvince:null);

  const save = async () => {
    if(!editing) return;
    setSaving(true);
    await new Promise(r=>setTimeout(r,500));
    dispatch({ type:"UPD_PROVINCE", province:editing });
    setSaving(false);
    setEditing(null);
  };

  const toggleActive = (p: AdminProvince) =>
    dispatch({ type:"UPD_PROVINCE", province:{...p,active:!p.active} });

  const saveGlobal = async () => {
    setSavingGlobal(true);
    await new Promise(r=>setTimeout(r,600));
    dispatch({ type:"UPD_CONTENT", content:{...state.content,freeShippingThreshold:globalFreeThreshold} });
    setSavingGlobal(false);
  };

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <SectionHeader
        title="Tarifas de Envío"
        sub={`${state.provinces.length} provincias · ${active} activas · Tarifa promedio: ${fmt(avgRate)}`}
      />
      <div style={{padding:"20px 32px",overflowY:"auto",flex:1}}>

        {/* KPIs */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:22}}>
          {[
            {l:"Provincias Activas", v:active,          c:C.green},
            {l:"Con Envío Gratis",   v:freeCount,       c:C.teal},
            {l:"Tarifa Promedio",    v:fmt(avgRate),    c:C.navy},
            {l:"Envío Gratis sobre", v:fmt(globalFreeThreshold), c:C.green},
          ].map((s,i)=>(
            <div key={i} style={{background:C.white,borderRadius:12,padding:"16px 18px",border:`1px solid ${C.border}`}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:5,textTransform:"uppercase",letterSpacing:"0.4px",fontWeight:600}}>{s.l}</div>
              <div style={{fontSize:typeof s.v==="number"?26:18,fontWeight:800,color:s.c}}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* GLOBAL SETTINGS */}
        <div style={{background:C.white,borderRadius:14,border:`1px solid ${C.border}`,padding:"22px 24px",marginBottom:20}}>
          <h3 style={{fontSize:16,fontWeight:700,color:C.navy,marginBottom:16}}>⚙ Configuración Global de Envíos</h3>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16,alignItems:"end"}}>
            <div>
              <label style={{fontSize:12,fontWeight:600,color:C.txt,display:"block",marginBottom:6}}>
                Monto para envío gratis (RD$)
              </label>
              <input
                type="number"
                value={globalFreeThreshold}
                onChange={e=>setGlobalFree(Number(e.target.value))}
                style={{width:"100%",padding:"10px 13px",borderRadius:9,border:`1.5px solid ${C.border}`,fontSize:14,color:C.txt,background:C.bg,outline:"none",fontFamily:"inherit"}}
                onFocus={e=>{(e.target as HTMLInputElement).style.borderColor=C.teal;}}
                onBlur={e=>{(e.target as HTMLInputElement).style.borderColor=C.border;}}
              />
            </div>
            <div>
              <div style={{fontSize:12,color:C.muted,marginBottom:6}}>Vista previa</div>
              <div style={{background:C.tealLt,borderRadius:9,padding:"10px 14px",fontSize:13,color:C.tealDk,fontWeight:600}}>
                🎉 Gratis en pedidos ≥ {fmt(globalFreeThreshold)}
              </div>
            </div>
            <button onClick={saveGlobal} disabled={savingGlobal} style={{
              display:"flex",alignItems:"center",justifyContent:"center",gap:8,
              padding:"12px",borderRadius:10,border:"none",
              background:savingGlobal?C.muted:C.navy,color:"#fff",
              fontSize:13,fontWeight:700,cursor:savingGlobal?"wait":"pointer",fontFamily:"inherit",
            }}>
              <Save size={14}/>{savingGlobal?"Guardando...":"Guardar Config"}
            </button>
          </div>
        </div>

        {/* PROVINCE TABLE */}
        <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.border}`,overflow:"hidden"}}>
          <div style={{padding:"16px 20px",borderBottom:`1px solid ${C.border}`,background:C.bg,display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 1fr 1.2fr 80px",gap:12,fontSize:11,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"0.3px"}}>
            <span>Provincia</span>
            <span>Tarifa Std</span>
            <span>Días Std</span>
            <span>Tarifa Express</span>
            <span>Días Express</span>
            <span>Carrier</span>
            <span>Estado</span>
            <span>Editar</span>
          </div>
          {state.provinces.map((p,i)=>(
            <div key={p.name} style={{
              display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 1fr 1.2fr 80px",
              gap:12,padding:"13px 20px",alignItems:"center",
              borderBottom:i<state.provinces.length-1?`1px solid ${C.border}`:"none",
              background:i%2===0?C.white:C.bg,
              opacity:p.active?1:0.55,
            }}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <MapPin size={13} color={p.active?C.teal:C.muted}/>
                <span style={{fontSize:13,fontWeight:600,color:C.txt}}>{p.name}</span>
              </div>
              <div style={{fontSize:14,fontWeight:700,color:p.rate===0?C.green:C.navy}}>
                {p.rate===0?"🎁 Gratis":fmt(p.rate)}
              </div>
              <div style={{fontSize:13,color:C.muted,display:"flex",alignItems:"center",gap:4}}>
                <Truck size={12}/> {p.delivery}–{p.delivery+1}d
              </div>
              <div style={{fontSize:13,fontWeight:700,color:C.amber}}>{fmt(p.expressRate)}</div>
              <div style={{fontSize:13,color:C.muted,display:"flex",alignItems:"center",gap:4}}>
                <Zap size={12}/> {p.expressDays}d
              </div>
              <div style={{fontSize:11,color:C.muted}}>{p.carrier}</div>
              <button onClick={()=>toggleActive(p)} style={{
                display:"flex",alignItems:"center",gap:6,padding:"5px 10px",
                borderRadius:8,border:"none",cursor:"pointer",fontFamily:"inherit",
                background:p.active?"#D1FAE5":"#F3F4F6",
                color:p.active?C.green:C.muted,fontSize:11,fontWeight:700,
              }}>
                {p.active?<ToggleRight size={14}/>:<ToggleLeft size={14}/>}
                {p.active?"Activa":"Inactiva"}
              </button>
              <button onClick={()=>setEditing({...p})} style={{
                padding:"7px",borderRadius:8,border:"none",
                background:"#EFF6FF",cursor:"pointer",display:"flex",
                alignItems:"center",justifyContent:"center",
              }}>
                <Edit2 size={13} color={C.navy}/>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* EDIT MODAL */}
      {editing&&(
        <Modal title={`Editar: ${editing.name}`} subtitle="Configure las tarifas y opciones de entrega" onClose={()=>setEditing(null)} width={560}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            <Field label="Tarifa Estándar (RD$)"     value={editing.rate}       onChange={v=>upd("rate",Number(v))}       type="number" placeholder="0 para gratis"/>
            <Field label="Días de entrega estándar"  value={editing.delivery}   onChange={v=>upd("delivery",Number(v))}   type="number"/>
            <Field label="Tarifa Express (RD$)"      value={editing.expressRate} onChange={v=>upd("expressRate",Number(v))} type="number"/>
            <Field label="Días de entrega express"   value={editing.expressDays} onChange={v=>upd("expressDays",Number(v))} type="number"/>
            <Field label="Empresa de transporte"     value={editing.carrier}    onChange={v=>upd("carrier",v)}            as="select" options={CARRIERS} span={2}/>
            <Field label="Notas sobre esta ruta"     value={editing.notes}      onChange={v=>upd("notes",v)}              as="textarea" rows={2} span={2} placeholder="Restricciones, condiciones especiales..."/>
          </div>

          {/* Preview */}
          <div style={{background:C.navyLt,borderRadius:10,padding:"14px 16px",marginTop:14}}>
            <div style={{fontSize:12,color:C.navy,fontWeight:700,marginBottom:8}}>Vista previa</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <div style={{background:C.white,borderRadius:8,padding:"10px 12px"}}>
                <div style={{fontSize:10,color:C.muted,marginBottom:3}}>ESTÁNDAR</div>
                <div style={{fontSize:16,fontWeight:800,color:editing.rate===0?C.green:C.navy}}>
                  {editing.rate===0?"🎁 GRATIS":fmt(Number(editing.rate))}
                </div>
                <div style={{fontSize:11,color:C.muted}}>{editing.delivery}–{Number(editing.delivery)+1} días hábiles</div>
              </div>
              <div style={{background:C.white,borderRadius:8,padding:"10px 12px"}}>
                <div style={{fontSize:10,color:C.muted,marginBottom:3}}>EXPRESS</div>
                <div style={{fontSize:16,fontWeight:800,color:C.amber}}>{fmt(Number(editing.expressRate))}</div>
                <div style={{fontSize:11,color:C.muted}}>{editing.expressDays} día(s) hábil(es)</div>
              </div>
            </div>
          </div>

          <SaveBtn onClick={save} loading={saving}/>
        </Modal>
      )}
    </div>
  );
}
