import { ImageResponse } from "next/og";

// Next wires this into og:image and twitter:image automatically.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Maksymilian Dubowski — BEng Aerospace Engineering, Edinburgh";

// Mirrors the hero: light graph-paper ground, dark split-flap board, name in
// white over the discipline in amber. Satori supports flexbox only — no grid.
export default function OpenGraphImage() {
  const tile = (char: string, i: number, color: string) => (
    <div
      key={i}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 44,
        height: 62,
        margin: "0 2px",
        borderRadius: 4,
        background: char === " " ? "transparent" : "#242424",
        color,
        fontSize: 34,
        fontWeight: 700,
      }}
    >
      {char === " " ? "" : char}
    </div>
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f5f0",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            padding: "38px 34px",
            borderRadius: 14,
            background: "#141414",
            boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            {"MAKSYMILIAN DUBOWSKI".split("").map((c, i) => tile(c, i, "#F0F0F0"))}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {"BENG AEROSPACE ENG".split("").map((c, i) => tile(c, i, "#FFBB33"))}
          </div>
        </div>

        <div
          style={{
            marginTop: 34,
            color: "#8C7D6A",
            fontSize: 24,
            letterSpacing: 6,
          }}
        >
          {"// EDINBURGH, SCOTLAND"}
        </div>
      </div>
    ),
    size
  );
}
