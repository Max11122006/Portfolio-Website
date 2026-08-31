"use client";

import { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789—·/ ";

interface SolariFlapProps {
  targetChar: string;
  delay: number;
  color?: "white" | "amber";
}

export default function SolariFlap({ targetChar, delay, color = "white" }: SolariFlapProps) {
  const [currentChar, setCurrentChar] = useState(" ");
  const [flipPhase, setFlipPhase] = useState<"idle" | "top-out" | "bottom-in">("idle");
  const [nextChar, setNextChar] = useState(" ");
  const cyclesLeft = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // The flip board is the largest motion on the page; under reduced motion it
    // never runs and the final character is shown directly (see displayChar).
    if (reduceMotion) return;

    // Declared inside the effect so the recursive call below is a plain hoisted
    // function reference. As a useCallback it referenced its own binding before
    // initialisation, which never picks up a changed targetChar.
    function flipNext() {
      cyclesLeft.current--;
      const next =
        cyclesLeft.current <= 0
          ? targetChar
          : CHARS[Math.floor(Math.random() * CHARS.length)];

      setNextChar(next);
      setFlipPhase("top-out");

      // Top half folds down
      timeoutRef.current = setTimeout(() => {
        setCurrentChar(next);
        setFlipPhase("bottom-in");

        // Bottom half folds in
        timeoutRef.current = setTimeout(() => {
          setFlipPhase("idle");

          if (cyclesLeft.current > 0) {
            const speed = 40 + cyclesLeft.current * 10;
            timeoutRef.current = setTimeout(flipNext, speed);
          }
        }, 120);
      }, 120);
    }

    const totalCycles = 2 + Math.floor(Math.random() * 2);
    cyclesLeft.current = totalCycles;

    timeoutRef.current = setTimeout(flipNext, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [delay, targetChar, reduceMotion]);

  const textColor = color === "amber" ? "#FFBB33" : "#F0F0F0";

  // Derived rather than pushed through state, so no effect has to write it.
  const displayChar = reduceMotion ? targetChar : currentChar;
  const displayPhase = reduceMotion ? "idle" : flipPhase;

  return (
    <div className="solari-flap-module" style={{ perspective: "200px" }}>
      <div className="solari-flap-inner">
        {/* Top half — static */}
        <div className="solari-half solari-top">
          <span style={{ color: textColor }}>{displayChar}</span>
        </div>

        {/* Bottom half — static */}
        <div className="solari-half solari-bottom">
          <span style={{ color: textColor }}>{displayChar}</span>
        </div>

        {/* Animated top flap — folds down */}
        {displayPhase === "top-out" && (
          <div className="solari-half solari-top solari-flap-animate solari-flap-top-out">
            <span style={{ color: textColor }}>{displayChar}</span>
          </div>
        )}

        {/* Animated bottom flap — folds in with next char */}
        {displayPhase === "bottom-in" && (
          <div className="solari-half solari-bottom solari-flap-animate solari-flap-bottom-in">
            <span style={{ color: textColor }}>{nextChar}</span>
          </div>
        )}

        {/* Split line */}
        <div className="solari-split-line" />
      </div>
    </div>
  );
}
