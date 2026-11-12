import type { CSSProperties } from "react";

interface SolariFlapProps {
  char: string;
  delay: number;
  color: "white" | "amber";
}

export default function SolariFlap({ char, delay, color }: SolariFlapProps) {
  return (
    <div
      className="solari-flap-module"
      style={{ "--flip-delay": `${delay}ms`, color: color === "amber" ? "#FFBB33" : "#F0F0F0" } as CSSProperties}
    >
      <div className="solari-flap-inner">
        <div className="solari-half solari-top"><span>{char}</span></div>
        <div className="solari-half solari-bottom"><span>{char}</span></div>
        <div className="solari-half solari-top solari-flap-animate solari-flap-top-out" />
        <div className="solari-half solari-bottom solari-flap-animate solari-flap-bottom-in">
          <span>{char}</span>
        </div>
        <div className="solari-split-line" />
      </div>
    </div>
  );
}
