"use client";
import { useState } from "react";
import { Plus, Search, Eye, Edit2, Trash2, Truck, CheckCircle, X, Download, Filter } from "lucide-react";
import { useAdmin, type AdminOrder } from "@/lib/adminStore";
import { Modal, SectionHeader, Field, SaveBtn, StatusBadge, ConfirmDialog } from "./shared";
import { COLORS as C } from "@/lib/data";
import { fmt } from "@/lib/utils";

const ORDER_STATUSES = [
  {v:"Procesando",  l:"Procesando"},
  {v:"En tránsito", l:"En tránsito"},
  {v:"Entregado",   l:"Entregado"},
  {v:"Cancelado",   l:"Cancelado"},
];
const PAY_METHODS = [
  {v:"transferencia",l:"Transferencia"},
  {v:"tarjeta",      l:"Tarjeta"},
  {v:"efectivo",     l:"Efectivo"},
  {v:"cheque",       l:"Cheque"},
];

export function AdminOrders() {
  const { state, dispatch } = useAdmin();
  const [search, setSearch]   = useState("");
  const [statusF, setStatusF] = useState("Todos");
  const [editing, setEditing] = useState<AdminOrder|null>(null);
  const [viewing, setViewing] = useState<AdminOrder|null>(null);
  const [deleting, setDeleting] = useState<AdminOrder|null>(null);
  const [saving, setSaving]   = useState(false);

  const statuses = ["Todos","Procesando","En tránsito","Entregado","Cancelado"];

  const filtered = state.orders.filter(o =>
    (statusF==="Todos"||o.status===statusF) &&
    (o.id.toLowerCase().includes(search.toLowerCase()) ||
     o.client.toLowerCase().includes(search.toLowerCase()) ||
     o.prov.toLowerCase().includes(search.toLowerCase()))
  );

  const totals = {
    all:       state.orders.length,
    procesando:state.orders.filter(o=>o.status==="Procesando").length,
    transito:  state.orders.filter(o=>o.status==="En tránsito").length,
    entregado: state.orders.filter(o=>o.status==="Entregado").length,
    cancelado: state.orders.filter(o=>o.status==="Cancelado").length,
    revenue:   state.orders.filter(o=>o.status!=="Cancelado").reduce((s,o)=>s+o.total,0),
  };

  const save = async () => {
    if(!editing) return;
    setSaving(true);
    await new Promise(r=>setTimeout(r,600));
    dispatch({ type:"UPD_ORDER", order:{...editing,updatedAt:new Date().toISOString().split("T")[0]} });
    setSaving(false);
    setEditing(null);
  };

  const confirmDelete = () => {
    if(!deleting) return;
    dispatch({ type:"DEL_ORDER", id:deleting.id });
    setDeleting(null);
  };

  const upd = (field: keyof AdminOrder, val: string|number) =>
    setEditing(e => e ? {...e,[field]:val} as AdminOrder : null);

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <SectionHeader
        title="Gestión de Pedidos"
        sub={`${state.orders.length} pedidos · Ingresos: ${fmt(totals.revenue)}`}
        action={
          <div style={{display:"flex",gap:10}}>
            <button style={{display:"flex",alignItems:"center",gap:6,padding:"9px 16px",borderRadius:10,border:`1px solid ${C.border}`,background:C.white,fontSize:13,fontWeight:600,cursor:"pointer",color:C.txt,fontFamily:"inherit"}}>
              <Download size={14}/> Exportar
            </button>
          </div>
        }
      />

      <div style={{padding:"20px 32px",overflowY:"auto",flex:1}}>
        {/* KPI CARDS */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12,marginBottom:22}}>
          {[
            {l:"Total",       v:totals.all,        c:C.navy, fn:()=>setStatusF("Todos")},
            {l:"Procesando",  v:totals.procesando,  c:C.amber,fn:()=>setStatusF("Procesando")},
            {l:"En Tránsito", v:totals.transito,    c:C.teal, fn:()=>setStatusF("En tránsito")},
            {l:"Entregados",  v:totals.entregado,   c:C.green,fn:()=>setStatusF("Entregado")},
            {l:"Cancelados",  v:totals.cancelado,   c:C.red,  fn:()=>setStatusF("Cancelado")},
          ].map((s,i)=>(
            <div key={i} onClick={s.fn} style={{
              background:C.white,borderRadius:12,padding:"16px 18px",
              border:`2px solid ${statusF===s.l||statusF===["Todos","Procesando","En tránsito","Entregado","Cancelado"][i]?s.c:C.border}`,
              cursor:"pointer",transition:"all 0.15s",
            }}>
              <div style={{fontSize:11,color:C.muted,marginBottom:5,textTransform:"uppercase",letterSpacing:"0.4px",fontWeight:600}}>{s.l}</div>
              <div style={{fontSize:26,fontWeight:800,color:s.c}}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* SEARCH + FILTER */}
        <div style={{display:"flex",gap:12,marginBottom:18}}>
          <div style={{flex:1,background:C.white,border:`1px solid ${C.border}`,borderRadius:12,padding:"10px 16px",display:"flex",alignItems:"center",gap:10}}>
            <Search size={15} color={C.muted}/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar por número, cliente o provincia..."
              style={{border:"none",outline:"none",fontSize:14,flex:1,background:"transparent",color:C.txt,fontFamily:"inherit"}}/>
            {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",cursor:"pointer",color:C.muted,fontSize:18,lineHeight:1}}>×</button>}
          </div>
          <select value={statusF} onChange={e=>setStatusF(e.target.value)} style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:12,padding:"10px 16px",fontSize:14,color:C.txt,cursor:"pointer",outline:"none",fontFamily:"inherit"}}>
            {statuses.map(s=><option key={s}>{s}</option>)}
          </select>
        </div>

        {/* TABLE */}
        <div style={{background:C.white,borderRadius:16,border:`1px solid ${C.border}`,overflow:"hidden"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr style={{background:C.bg,borderBottom:`1px solid ${C.border}`}}>
                {["Pedido","Cliente","Provincia","Items","Pago","Total","Estado","Acciones"].map(h=>(
                  <th key={h} style={{padding:"11px 16px",textAlign:"left",fontSize:11,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"0.4px"}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length===0?(
                <tr><td colSpan={8} style={{padding:"48px",textAlign:"center",color:C.muted}}>
                  No se encontraron pedidos
                </td></tr>
              ):filtered.map((o,i)=>(
                <tr key={o.id} style={{borderBottom:i<filtered.length-1?`1px solid ${C.border}`:"none",transition:"background 0.12s",cursor:"pointer"}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLTableRowElement).style.background=C.bg;}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLTableRowElement).style.background="transparent";}}>
                  <td style={{padding:"12px 16px",fontFamily:"monospace",fontSize:12,fontWeight:700,color:C.teal}}>{o.id}</td>
                  <td style={{padding:"12px 16px"}}>
                    <div style={{fontSize:13,fontWeight:700,color:C.txt}}>{o.client}</div>
                    <div style={{fontSize:11,color:C.muted}}>{o.email}</div>
                  </td>
                  <td style={{padding:"12px 16px",fontSize:12,color:C.muted}}>{o.prov}</td>
                  <td style={{padding:"12px 16px",fontSize:13,fontWeight:600,textAlign:"center"}}>{o.items}</td>
                  <td style={{padding:"12px 16px",fontSize:12,color:C.muted,textTransform:"capitalize"}}>{o.payMethod}</td>
                  <td style={{padding:"12px 16px",fontSize:14,fontWeight:800,color:C.navy}}>{fmt(o.total)}</td>
                  <td style={{padding:"12px 16px"}}><StatusBadge status={o.status}/></td>
                  <td style={{padding:"12px 16px"}}>
                    <div style={{display:"flex",gap:6}}>
                      <button onClick={()=>setViewing(o)} title="Ver detalle" style={{padding:"6px",borderRadius:6,border:"none",background:C.tealLt,cursor:"pointer",display:"flex"}}>
                        <Eye size={13} color={C.tealDk}/>
                      </button>
                      <button onClick={()=>setEditing({...o})} title="Editar" style={{padding:"6px",borderRadius:6,border:"none",background:"#EFF6FF",cursor:"pointer",display:"flex"}}>
                        <Edit2 size={13} color={C.navy}/>
                      </button>
                      <button onClick={()=>setDeleting(o)} title="Eliminar" style={{padding:"6px",borderRadius:6,border:"none",background:"#FEF2F2",cursor:"pointer",display:"flex"}}>
                        <Trash2 size={13} color={C.red}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{marginTop:10,fontSize:12,color:C.muted,textAlign:"right"}}>
          Mostrando {filtered.length} de {state.orders.length} pedidos
        </div>
      </div>

      {/* VIEW MODAL */}
      {viewing&&(
        <Modal title={`Detalle: ${viewing.id}`} subtitle={`${viewing.client} · ${viewing.date}`} onClose={()=>setViewing(null)} width={560}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
            {[
              {l:"Cliente",   v:viewing.client},
              {l:"Email",     v:viewing.email},
              {l:"Teléfono",  v:viewing.phone},
              {l:"Provincia", v:viewing.prov},
              {l:"Dirección", v:viewing.address},
              {l:"Pago",      v:viewing.payMethod},
              {l:"Tracking",  v:viewing.trackingNum||"—"},
              {l:"Creado",    v:viewing.createdAt},
              {l:"Actualizado",v:viewing.updatedAt},
            ].map((f,i)=>(
              <div key={i} style={{gridColumn:f.l==="Dirección"?"span 2":"span 1"}}>
                <div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:3}}>{f.l}</div>
                <div style={{fontSize:13,fontWeight:600,color:C.txt}}>{f.v}</div>
              </div>
            ))}
          </div>
          <div style={{background:C.bg,borderRadius:10,padding:"14px 16px",marginBottom:16,border:`1px solid ${C.border}`}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:10,fontSize:12,color:C.muted,fontWeight:700}}>
              <span>ESTADO DEL PEDIDO</span>
              <StatusBadge status={viewing.status}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:14,fontWeight:800,color:C.navy}}>
              <span>Total del Pedido</span>
              <span>{fmt(viewing.total)}</span>
            </div>
          </div>
          {viewing.notes&&(
            <div style={{background:"#FEF3C7",borderRadius:10,padding:"12px 14px",fontSize:13,color:"#92400E"}}>
              <strong>Notas:</strong> {viewing.notes}
            </div>
          )}
          <div style={{display:"flex",gap:10,marginTop:20}}>
            <button onClick={()=>{setViewing(null);setEditing({...viewing});}} style={{flex:1,padding:"11px",background:C.navy,color:"#fff",border:"none",borderRadius:10,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
              Editar Pedido
            </button>
            <button onClick={()=>setViewing(null)} style={{flex:1,padding:"11px",background:C.white,border:`1px solid ${C.border}`,borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit",color:C.txt}}>
              Cerrar
            </button>
          </div>
        </Modal>
      )}

      {/* EDIT MODAL */}
      {editing&&(
        <Modal title={`Editar: ${editing.id}`} subtitle="Modifique los datos del pedido" onClose={()=>setEditing(null)} width={620}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            <Field label="Cliente" value={editing.client} onChange={v=>upd("client",v)} span={2}/>
            <Field label="Email"   value={editing.email}  onChange={v=>upd("email",v)}/>
            <Field label="Teléfono" value={editing.phone} onChange={v=>upd("phone",v)} type="tel"/>
            <Field label="Dirección" value={editing.address} onChange={v=>upd("address",v)} span={2}/>
            <Field label="Estado" value={editing.status} onChange={v=>upd("status",v)}
              as="select" options={ORDER_STATUSES}/>
            <Field label="Método de Pago" value={editing.payMethod} onChange={v=>upd("payMethod",v)}
              as="select" options={PAY_METHODS}/>
            <Field label="Total (RD$)" value={editing.total} onChange={v=>upd("total",Number(v))} type="number"/>
            <Field label="Número de Tracking" value={editing.trackingNum} onChange={v=>upd("trackingNum",v)} placeholder="TRK-XXXXXXXX"/>
            <Field label="Notas internas" value={editing.notes} onChange={v=>upd("notes",v)} as="textarea" rows={2} span={2} placeholder="Notas visibles solo para el equipo..."/>
          </div>
          <SaveBtn onClick={save} loading={saving}/>
        </Modal>
      )}

      {/* DELETE CONFIRM */}
      <ConfirmDialog
        isOpen={!!deleting}
        title="¿Eliminar pedido?"
        message={`¿Seguro que desea eliminar el pedido ${deleting?.id} de ${deleting?.client}? Esta acción no se puede deshacer.`}
        onConfirm={confirmDelete}
        onCancel={()=>setDeleting(null)}
        danger
      />
    </div>
  );
}
