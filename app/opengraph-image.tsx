import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mai Tri Thanh - Fullstack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#09090b",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 24,
            padding: "48px 64px",
            background: "rgba(255,255,255,0.04)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 16,
              padding: "8px 20px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.08)",
              fontSize: 20,
              color: "#a1a1aa",
            }}
          >
            Building clean web experiences
          </div>

          <h1
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#ffffff",
              margin: 0,
              lineHeight: 1.1,
              textAlign: "center",
            }}
          >
            Mai Tri Thanh
          </h1>

          <p
            style={{
              fontSize: 28,
              color: "#a1a1aa",
              marginTop: 12,
              marginBottom: 0,
              textAlign: "center",
            }}
          >
            Fullstack Developer
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              marginTop: 32,
              fontSize: 18,
              color: "#71717a",
            }}
          >
            <span>Next.js</span>
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: 2,
                background: "#52525b",
              }}
            />
            <span>React</span>
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: 2,
                background: "#52525b",
              }}
            />
            <span>TypeScript</span>
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: 2,
                background: "#52525b",
              }}
            />
            <span>Laravel</span>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 32,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 16,
            color: "#52525b",
          }}
        >
          maitrithanh.dev
        </div>
      </div>
    ),
    { ...size },
  );
}
