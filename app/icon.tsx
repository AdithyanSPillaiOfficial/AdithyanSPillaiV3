import { ImageResponse } from "next/og";

// Icon dimensions
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Generate programmatic favicon matching the navbar logo badge
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F1115",
          borderRadius: 4,
          border: "1px solid #333333",
          color: "#FFFFFF",
          fontSize: 14,
          fontWeight: 800,
          fontFamily: "sans-serif",
          letterSpacing: 1.5,
        }}
      >
        AS
      </div>
    ),
    {
      ...size,
    }
  );
}
