import { ImageResponse } from "next/og";
import { SITE_URL } from "@/lib/constants";

export const alt = "Mai Tri Thanh — Fullstack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "#0b0b0d",
        color: "#f5f3ee",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 590,
          height: 590,
          right: -110,
          top: -130,
          borderRadius: 999,
          background: "radial-gradient(circle, #273329 0%, #111713 55%, #0b0b0d 75%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 430,
          height: 430,
          right: 35,
          top: 94,
          border: "1px solid #384339",
          borderRadius: 999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 310,
            height: 310,
            border: "1px solid #5a6c56",
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 122,
            fontWeight: 700,
            letterSpacing: -15,
            color: "#c9f27b",
            paddingRight: 15,
          }}
        >
          MT
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 64,
          top: 54,
          right: 64,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 19,
          fontWeight: 600,
          letterSpacing: 2,
        }}
      >
        <span>MAI TRI THANH</span>
        <span style={{ color: "#c9f27b" }}>PORTFOLIO / 2026</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 64,
          top: 165,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "10px 18px",
            border: "1px solid #566b49",
            borderRadius: 999,
            color: "#c9f27b",
            fontSize: 18,
            letterSpacing: 1,
          }}
        >
          AVAILABLE FOR WHAT'S NEXT
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 30, fontSize: 86, fontWeight: 700, letterSpacing: -5, lineHeight: 1.02 }}>
          <span>Building</span>
          <span style={{ color: "#c9f27b" }}>better web.</span>
        </div>
        <span style={{ marginTop: 24, color: "#b5b6af", fontSize: 25 }}>
          Fullstack Developer · Next.js / React / Laravel
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 48,
          left: 64,
          right: 64,
          borderTop: "1px solid #343538",
          paddingTop: 22,
          display: "flex",
          justifyContent: "space-between",
          color: "#a4a69f",
          fontSize: 18,
        }}
      >
        <span>Thoughtful interfaces. Solid engineering.</span>
        <span>{new URL(SITE_URL).host} ↗</span>
      </div>
    </div>,
    size,
  );
}
