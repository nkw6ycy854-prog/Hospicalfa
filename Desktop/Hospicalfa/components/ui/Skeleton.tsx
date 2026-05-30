"use client";
import { COLORS as C } from "@/lib/data";

export function ProductCardSkeleton() {
  return (
    <div style={{
      background: C.white, borderRadius: 16,
      border: `1px solid ${C.border}`, overflow: "hidden",
    }}>
      <div className="skeleton" style={{ height: 110 }} />
      <div style={{ padding: "16px 18px 18px" }}>
        <div className="skeleton" style={{ height: 10, width: "40%", marginBottom: 10 }} />
        <div className="skeleton" style={{ height: 14, width: "85%", marginBottom: 6 }} />
        <div className="skeleton" style={{ height: 14, width: "60%", marginBottom: 14 }} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="skeleton" style={{ height: 22, width: "40%" }} />
          <div className="skeleton" style={{ height: 32, width: "30%", borderRadius: 8 }} />
        </div>
      </div>
    </div>
  );
}

export function TableRowSkeleton({ cols = 6 }: { cols?: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} style={{ padding: "13px 18px" }}>
          <div className="skeleton" style={{ height: 14, width: i === 0 ? "70%" : "50%" }} />
        </td>
      ))}
    </tr>
  );
}

export function MetricCardSkeleton() {
  return (
    <div style={{
      background: C.white, borderRadius: 14, padding: "20px 22px",
      border: `1px solid ${C.border}`,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <div>
          <div className="skeleton" style={{ height: 10, width: 80, marginBottom: 10 }} />
          <div className="skeleton" style={{ height: 28, width: 100 }} />
        </div>
        <div className="skeleton" style={{ width: 44, height: 44, borderRadius: 12 }} />
      </div>
      <div className="skeleton" style={{ height: 10, width: 120 }} />
    </div>
  );
}
