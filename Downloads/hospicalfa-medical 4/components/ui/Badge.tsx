"use client";

type OrderStatus = "Entregado" | "En tránsito" | "Procesando" | "Cancelado";

const STATUS_MAP: Record<OrderStatus, { bg: string; color: string }> = {
  "Entregado":   { bg:"#D1FAE5", color:"#065F46" },
  "En tránsito": { bg:"#DBEAFE", color:"#1E3A8A" },
  "Procesando":  { bg:"#FEF3C7", color:"#92400E" },
  "Cancelado":   { bg:"#FEE2E2", color:"#991B1B" },
};

export function Badge({ status }: { status: string }) {
  const s = STATUS_MAP[status as OrderStatus] ?? { bg:"#F3F4F6", color:"#374151" };
  return (
    <span style={{
      background: s.bg, color: s.color,
      padding:"3px 10px", borderRadius:20,
      fontSize:11, fontWeight:700, whiteSpace:"nowrap",
    }}>
      {status}
    </span>
  );
}
