import SolariFlap from "./SolariFlap";

interface SolariBoardProps {
  rows: { text: string; color: "white" | "amber" }[];
}

export default function SolariBoard({ rows }: SolariBoardProps) {
  return (
    <div className="solari-board" aria-hidden="true">
      {rows.map((row, rowIndex) => (
        <div key={row.text} className="solari-row">
          {row.text.split(" ").map((word, wordIndex) => (
            <div key={word} className="solari-word">
              {word.split("").map((char, charIndex) => (
                <SolariFlap
                  key={charIndex}
                  char={char}
                  delay={rowIndex * 80 + wordIndex * 90 + charIndex * 16}
                  color={row.color}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
