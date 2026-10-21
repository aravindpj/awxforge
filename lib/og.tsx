import { ImageResponse } from "next/og";
import { fullMark } from "@/lib/brand/mark-paths.generated";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";
export const ogAlt = "AWXFORGE — Forging better ways to work";

export function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        backgroundImage:
          "linear-gradient(#E8E8E8 1px, transparent 1px), linear-gradient(90deg, #E8E8E8 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        color: "#0A0A0A",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        <svg width="300" height="122" viewBox="0 0 250 102">
          <path d={fullMark.orange} fill="#FF4F00" />
          <path
            d={fullMark.ink}
            fill="#0A0A0A"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinejoin="round"
          />
        </svg>
        <div style={{ fontSize: 78, fontWeight: 600, letterSpacing: 1, lineHeight: 1 }}>FORGE</div>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 28,
          fontSize: 18,
          letterSpacing: 4,
          color: "#9A9A9A",
        }}
      >
        FORGING BETTER WAYS TO WORK
      </div>
    </div>,
    { ...ogSize },
  );
}
