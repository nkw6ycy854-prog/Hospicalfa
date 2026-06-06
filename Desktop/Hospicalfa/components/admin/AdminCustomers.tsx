"use client";
import { useState } from "react";
import { Plus, Search, Eye, Edit2, Trash2, UserCheck, UserX } from "lucide-react";
import { useAdmin, type AdminCustomer } from "@/lib/adminStore";
import { Modal, SectionHeader, Field, SaveBtn, StatusBadge, ConfirmDialog } from "./shared";
import { COLORS as C } from "@/lib/data";
import { fmt } from "@/lib/utils";

const CUSTOMER_TYPES = [
  {v:"Hospital",    l:"Hospital"},
  {v:"Clínica",     l:"Clínica"},
  {v:"Centro Médico",l:"Centro Médico"},
  {v:"Farmacia",    l:"Farmacia"},
  {v:"Consultorio", l:"Consultorio"},
  {v:"Otro",        l:"Otro"},
];
const STATUSES = [
  {v:"active",  l:"Activo"},
  {v:"inactive",l:"Inactivo"},
  {v:"blocked", l:"Bloqueado"},
];

const EMPTY_CUSTOMER: AdminCustomer = {
  n:"",c:"",e:"",phone:"",t:"Clínica",orders:0,total:0,
  prov:"",since:new Date().toISOString().split("T")[0],
  status:"active",rnc:"",address:"",notes:"",
  creditLimit:50000,joinedAt:"",lastOrder:"",discount:0,
};

export function AdminCustomers() {
  const { state, dispatch } = useAdmin();
  const [search, setSearch]   = useState("");
  const [statusF, setStatusF] = useState("Todos");
  const [editing, setEditing] = useState<AdminCustomer|null>(null);
  const [viewing, setViewing] = useState<AdminCustomer|null>(null);
  const [deleting,setDeleting]= useState<AdminCustomer|null>(null);
  const [isNew, setIsNew]     = useState(false);
  const [saving, setSaving]   = useState(false);

  const filtered = state.customers.filter(c=>
    (statusF==="Todos"||c.status===statusF) &&
    (c.n.toLowerCase().includes(search.toLowerCase()) ||
     c.e.toLowerCase().includes(search.toLowerCase()) ||
     c.prov.toLowerCase().includes(search.toLowerCase()))
  );

  const totalRevenue = state.customers.reduce((s,c)=>s+c.total,0);
  const active = state.customers.filter(c=>c.status==="active").length;

  const upd = (field: keyof AdminCustomer, val: string|number) =>
    setEditing(e=>e?{...e,[field]:val} as AdminCustomer:null);

  const openNew = () => {
    setEditing({...EMPTY_CUSTOMER});
    setIsNew(true);
  };

  const save = async () => {
    if(!editing||!editing.n.trim()||!editing.e.trim()) return;
    setSaving(true);
    await new Promise(r=>setTimeout(r,600));
    if(isNew) {
      dispatch({ type:"ADD_CUSTOMER", customer:{...editing,joinedAt:new Date().toISOString().split("T")[0]} });
    } else {
      dispatch({ type:"UPD_CUSTOMER", customer:editing });
    }
    setSaving(false);
    setEditing(null);
    setIsNew(false);
  };

  const toggleStatus = (c: AdminCustomer, status: AdminCustomer["status"]) => {
    dispatch({ type:"UPD_CUSTOMER", customer:{...c, status} });
  };

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <SectionHeader
        title="Gestión de Clientes"
        sub={`${state.customers.length} clientes · ${active} activos · Revenue: ${fmt(totalRevenue)}`}
        action={
          <button onClick={openNew} style={{display:"flex",alignItems:"center",gap:6,padding:"9px 18px",borderRadius:10,border:"none",background:C.navy,color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
            <Plus size={14}/> Nuevo Cliente
          </button>
        }
      />
      <div style={{padding:"20px 32px",overflowY:"auto",flex:1}}>

        {/* METRICS */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:22}}>
          {[
            {l:"Total Clientes",  v:state.customers.length,    c:C.navy},
            {l:"Activos",         v:active,                    c:C.green},
            {l:"Inactivos",       v:state.customers.filter(c=>c.status==="inactive").length,c:C.muted},
            {l:"Bloqueados",      v:state.customers.filter(c=>c.status==="blocked").length, c:C.red},
          ].map((s,i)=>(
            <div key={i} style={{background:C.white,borderRadius:12,padding:"16px 18px",border:`1px solid ${C.border}`}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:5,textTransform:"uppercase",letterSpacing:"0.4px",fontWeight:600}}>{s.l}</div>
              <div style={{fontSize:26,fontWeight:800,color:s.c}}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* SEARCH + FILTER */}
        <div style={{display:"flex",gap:12,marginBottom:18}}>
          <div style={{flex:1,background:C.white,border:`1px solid ${C.border}`,borderRadius:12,padding:"10px 16px",display:"flex",alignItems:"center",gap:10}}>
            <Search size={15} color={C.muted}/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar por nombre, email o provincia..."
              style={{border:"none",outline:"none",fontSize:14,flex:1,background:"transparent",color:C.txt,fontFamily:"inherit"}}/>
          </div>
          <select value={statusF} onChange={e=>setStatusF(e.target.value)} style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:12,padding:"10px 16px",fontSize:14,color:C.txt,cursor:"pointer",outline:"none",fontFamily:"inherit"}}>
            {["Todos","active","inactive","blocked"].map(s=>(
              <option key={s} value={s}>{s==="Todos"?"Todos los estados":s==="active"?"Activos":s==="inactive"?"Inactivos":"Bloqueados"}</option>
            ))}
          </select>
        </div>

        {/* TABLE */}
        <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.border}`,overflow:"hidden"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr style={{background:C.bg,borderBottom:`1px solid ${C.border}`}}>
                {["Cliente","Contacto","Provincia","Tipo","Descuento","Pedidos","Total","Estado","Acciones"].map(h=>(
                  <th key={h} style={{padding:"11px 14px",textAlign:"left",fontSize:11,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"0.4px"}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length===0?(
                <tr><td colSpan={9} style={{padding:"48px",textAlign:"center",color:C.muted}}>No se encontraron clientes</td></tr>
              ):filtered.map((c,i)=>(
                <tr key={i} style={{borderBottom:i<filtered.length-1?`1px solid ${C.border}`:"none",transition:"background 0.12s",cursor:"pointer"}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLTableRowElement).style.background=C.bg;}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLTableRowElement).style.background="transparent";}}>
                  <td style={{padding:"12px 14px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div style={{width:36,height:36,borderRadius:9,background:c.status==="blocked"?"#FEE2E2":C.tealLt,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,color:c.status==="blocked"?C.red:C.tealDk,flexShrink:0}}>
                        {c.n.charAt(0)}
                      </div>
                      <div>
                        <div style={{fontSize:13,fontWeight:700,color:C.txt}}>{c.n}</div>
                        <div style={{fontSize:11,color:C.muted}}>{c.e}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{padding:"12px 14px"}}>
                    <div style={{fontSize:12,color:C.txt}}>{c.c}</div>
                    <div style={{fontSize:11,color:C.muted}}>{c.phone}</div>
                  </td>
                  <td style={{padding:"12px 14px",fontSize:12,color:C.muted}}>{c.prov}</td>
                  <td style={{padding:"12px 14px"}}>
                    <span style={{background:C.tealLt,color:C.tealDk,padding:"3px 9px",borderRadius:10,fontSize:11,fontWeight:700}}>{c.t}</span>
                  </td>
                  <td style={{padding:"12px 14px",fontSize:13,fontWeight:700,color:c.discount>0?C.green:C.muted}}>
                    {c.discount>0?`${c.discount}%`:"—"}
                  </td>
                  <td style={{padding:"12px 14px",fontSize:14,fontWeight:700,textAlign:"center"}}>{c.orders}</td>
                  <td style={{padding:"12px 14px",fontSize:13,fontWeight:800,color:C.navy}}>{fmt(c.total)}</td>
                  <td style={{padding:"12px 14px"}}><StatusBadge status={c.status}/></td>
                  <td style={{padding:"12px 14px"}}>
                    <div style={{display:"flex",gap:5}}>
                      <button onClick={()=>setViewing(c)} title="Ver" style={{padding:"6px",borderRadius:6,border:"none",background:C.tealLt,cursor:"pointer",display:"flex"}}><Eye size={12} color={C.tealDk}/></button>
                      <button onClick={()=>{setEditing({...c});setIsNew(false);}} title="Editar" style={{padding:"6px",borderRadius:6,border:"none",background:"#EFF6FF",cursor:"pointer",display:"flex"}}><Edit2 size={12} color={C.navy}/></button>
                      {c.status==="active"?(
                        <button onClick={()=>toggleStatus(c,"blocked")} title="Bloquear" style={{padding:"6px",borderRadius:6,border:"none",background:"#FEF2F2",cursor:"pointer",display:"flex"}}><UserX size={12} color={C.red}/></button>
                      ):(
                        <button onClick={()=>toggleStatus(c,"active")} title="Activar" style={{padding:"6px",borderRadius:6,border:"none",background:"#D1FAE5",cursor:"pointer",display:"flex"}}><UserCheck size={12} color={C.green}/></button>
                      )}
                      <button onClick={()=>setDeleting(c)} title="Eliminar" style={{padding:"6px",borderRadius:6,border:"none",background:"#FEF2F2",cursor:"pointer",display:"flex"}}><Trash2 size={12} color={C.red}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW */}
      {viewing&&(
        <Modal title={viewing.n} subtitle={`${viewing.t} · Desde ${viewing.since}`} onClose={()=>setViewing(null)} width={580}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:18}}>
            {[
              {l:"Email",       v:viewing.e},
              {l:"Teléfono",    v:viewing.phone},
              {l:"RNC",         v:viewing.rnc||"No registrado"},
              {l:"Provincia",   v:viewing.prov},
              {l:"Dirección",   v:viewing.address||"—"},
              {l:"Límite Crédito",v:fmt(viewing.creditLimit)},
              {l:"Descuento",   v:viewing.discount>0?`${viewing.discount}%`:"Sin descuento"},
              {l:"Último Pedido",v:viewing.lastOrder||"—"},
            ].map((f,i)=>(
              <div key={i} style={{gridColumn:f.l==="Dirección"?"span 2":"span 1"}}>
                <div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:3}}>{f.l}</div>
                <div style={{fontSize:13,fontWeight:600,color:C.txt}}>{f.v}</div>
              </div>
            ))}
          </div>
          <div style={{background:C.navyLt,borderRadius:10,padding:"14px 16px",marginBottom:16,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
            <div><div style={{fontSize:11,color:C.muted,marginBottom:3}}>Pedidos</div><div style={{fontSize:22,fontWeight:800,color:C.navy}}>{viewing.orders}</div></div>
            <div><div style={{fontSize:11,color:C.muted,marginBottom:3}}>Total Compras</div><div style={{fontSize:18,fontWeight:800,color:C.green}}>{fmt(viewing.total)}</div></div>
            <div><div style={{fontSize:11,color:C.muted,marginBottom:3}}>Estado</div><div style={{marginTop:4}}><StatusBadge status={viewing.status}/></div></div>
          </div>
          {viewing.notes&&<div style={{background:"#FFFBEB",borderRadius:10,padding:"12px 14px",fontSize:13,color:"#92400E",marginBottom:14}}><strong>Notas:</strong> {viewing.notes}</div>}
          <div style={{display:"flex",gap:10,marginTop:4}}>
            <button onClick={()=>{setViewing(null);setEditing({...viewing});setIsNew(false);}} style={{flex:1,padding:"11px",background:C.navy,color:"#fff",border:"none",borderRadius:10,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Editar Cliente</button>
            <button onClick={()=>setViewing(null)} style={{flex:1,padding:"11px",background:C.white,border:`1px solid ${C.border}`,borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit",color:C.txt}}>Cerrar</button>
          </div>
        </Modal>
      )}

      {/* EDIT / NEW */}
      {editing&&(
        <Modal title={isNew?"Nuevo Cliente":`Editar: ${editing.n}`} subtitle={isNew?"Complete los datos del nuevo cliente":"Modifique los datos del cliente"} onClose={()=>{setEditing(null);setIsNew(false);}} width={640}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            <Field label="Nombre de la empresa *"   value={editing.n}    onChange={v=>upd("n",v)}    span={2}/>
            <Field label="Persona de contacto *"    value={editing.c}    onChange={v=>upd("c",v)}/>
            <Field label="Email *"                  value={editing.e}    onChange={v=>upd("e",v)}    type="email"/>
            <Field label="Teléfono *"               value={editing.phone} onChange={v=>upd("phone",v)} type="tel"/>
            <Field label="RNC"                      value={editing.rnc}  onChange={v=>upd("rnc",v)}  placeholder="1-23456789-0"/>
            <Field label="Tipo de Cliente"          value={editing.t}    onChange={v=>upd("t",v)}    as="select" options={CUSTOMER_TYPES}/>
            <Field label="Provincia"                value={editing.prov} onChange={v=>upd("prov",v)} placeholder="Santo Domingo"/>
            <Field label="Dirección"                value={editing.address} onChange={v=>upd("address",v)} span={2} placeholder="Av. Principal #123, Sector Las Mercedes"/>
            <Field label="Estado"                   value={editing.status} onChange={v=>upd("status",v)} as="select" options={STATUSES}/>
            <Field label="Límite de Crédito (RD$)"  value={editing.creditLimit} onChange={v=>upd("creditLimit",Number(v))} type="number"/>
            <Field label="Descuento (%)"             value={editing.discount} onChange={v=>upd("discount",Number(v))} type="number" placeholder="0"/>
            <Field label="Notas internas"            value={editing.notes} onChange={v=>upd("notes",v)} as="textarea" rows={2} span={2} placeholder="Información adicional sobre el cliente..."/>
          </div>
          <SaveBtn onClick={save} loading={saving} label={isNew?"Crear Cliente":"Guardar Cambios"}/>
        </Modal>
      )}

      <ConfirmDialog
        isOpen={!!deleting}
        title="¿Eliminar cliente?"
        message={`¿Seguro que desea eliminar a "${deleting?.n}"? Se perderá todo su historial.`}
        onConfirm={()=>{if(deleting){dispatch({type:"DEL_CUSTOMER",name:deleting.n});setDeleting(null);}}}
        onCancel={()=>setDeleting(null)}
        danger
      />
    </div>
  );
}
