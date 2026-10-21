import { ImageResponse } from "next/og";

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
        justifyContent: "space-between",
        background: "#FFFFFF",
        color: "#0A0A0A",
        padding: "72px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 18, height: 18, background: "#FF4F00" }} />
        <div style={{ fontSize: 22, letterSpacing: 4 }}>AWXFORGE</div>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 64,
          lineHeight: 1.05,
          letterSpacing: -2,
          maxWidth: 920,
        }}
      >
        The future of business software shouldn’t mean more complexity.
      </div>
      <div style={{ display: "flex", fontSize: 22, color: "#5C5C5C" }}>
        Forging better ways to work
      </div>
    </div>,
    { ...ogSize },
  );
}
