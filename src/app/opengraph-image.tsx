import { ImageResponse } from "next/og";

export const alt = "Hiral International Courier — Ahmedabad to worldwide shipping";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: "72px 80px",
          background:
            "linear-gradient(135deg, #0c1f3f 0%, #1a4fd6 55%, #0ea5e9 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <span
          style={{
            fontSize: 28,
            fontWeight: 600,
            opacity: 0.9,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          New Sahibaug, Ahmedabad
        </span>
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, marginTop: 16 }}>
          Hiral International Courier
        </div>
        <div style={{ fontSize: 36, fontWeight: 500, marginTop: 20, opacity: 0.95 }}>
          Ahmedabad → USA · UK · Canada · Dubai · 200+ countries
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 22,
            opacity: 0.85,
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          Door-to-door air cargo, sea freight & personal parcels — Pardesh Parcel Seva
        </div>
      </div>
    ),
    { ...size },
  );
}