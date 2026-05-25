"use client";
import { COLORS as C } from "@/lib/data";

export function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      className="animate-slide-in"
      style={{
        position:"fixed", bottom:24, right:24,
        background:C.navy, color:"#fff", borderRadius:12,
        padding:"14px 22px", fontSize:14, fontWeight:600,
        zIndex:9999, boxShadow:"0 8px 28px rgba(0,0,0,0.22)",
        maxWidth:320,
      }}
    >
      {message}
    </div>
  );
}
