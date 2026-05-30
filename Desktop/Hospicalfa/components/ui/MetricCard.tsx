"use client";
import { type LucideIcon } from "lucide-react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { COLORS as C } from "@/lib/data";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  sub?: string;
  change?: number;
  color: string;
}

export function MetricCard({
  icon: Icon, label, value, sub, change, color,
}: MetricCardProps) {
  const up = (change ?? 0) >= 0;
  return (
    <div style={{
      background: C.white, borderRadius: 14, padding: "20px 22px",
      border: `1px solid ${C.border}`,
      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      transition: "box-shadow 0.2s",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-start", marginBottom: 12,
      }}>
        <div>
          <div style={{
            fontSize: 11, color: C.muted, fontWeight: 600,
            marginBottom: 6, letterSpacing: "0.5px", textTransform: "uppercase",
          }}>
            {label}
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: C.txt, lineHeight: 1 }}>
            {value}
          </div>
          {sub && (
            <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{sub}</div>
          )}
        </div>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: color + "18",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Icon size={20} color={color} />
        </div>
      </div>
      {change !== undefined && (
        <div style={{
          display: "flex", alignItems: "center", gap: 4,
          fontSize: 12, fontWeight: 700,
          color: up ? "#27AE60" : "#EF4444",
        }}>
          {up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {Math.abs(change)}% vs mes anterior
        </div>
      )}
    </div>
  );
}
