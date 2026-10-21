"use client";

import { useEffect, useId, useRef } from "react";
import { compactMark, fullMark } from "@/lib/brand/mark-paths.generated";

const tones = {
  light: { ink: "#0A0A0A", orange: "#FF4F00", bg: "#FFFFFF" },
  ink: { ink: "#F3F4F6", orange: "#FF4F00", bg: "#0A0A0A" },
  orange: { ink: "#FFFFFF", orange: "#0A0A0A", bg: "#FF4F00" },
} as const;

const completed = new Set<string>();
const playTokens = new Map<string, number>();

export function AwxMark({
  variant,
  tone = "light",
  animate = "none",
  speed = 1,
  tight = false,
  onComplete,
  className,
}: {
  variant: "full" | "x";
  tone?: "light" | "ink" | "orange";
  animate?: "once" | "loop" | "none";
  speed?: number;
  tight?: boolean;
  onComplete?: () => void;
  className?: string;
}) {
  const uid = `awx${useId().replace(/:/g, "")}`;
  const svgRef = useRef<SVGSVGElement>(null);
  const onCompleteRef = useRef(onComplete);
  const mark = variant === "full" ? fullMark : compactMark;
  const colors = tones[tone];
  const viewBox = tight && variant === "full" ? fullMark.tightViewBox : mark.viewBox;

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const node = svgRef.current;
    if (!node || animate === "none") return;

    const token = (playTokens.get(uid) ?? 0) + 1;
    playTokens.set(uid, token);
    const frame = window.requestAnimationFrame(() => {
      if (playTokens.get(uid) !== token) return;
      node.classList.add("is-play");
    });

    return () => {
      window.cancelAnimationFrame(frame);
      node.classList.remove("is-play");
    };
  }, [animate, uid]);

  return (
    <svg
      ref={svgRef}
      className={`awx-mark${speed !== 1 ? " is-fast" : ""}${className ? ` ${className}` : ""}`}
      data-animate={animate}
      viewBox={viewBox}
      style={
        {
          "--m": colors.ink,
          "--a": colors.orange,
          "--bg": colors.bg,
          "--awx-speed": speed,
        } as React.CSSProperties
      }
      aria-hidden="true"
      onAnimationEnd={(event) => {
        if (event.animationName !== "awx-ping") return;
        const node = svgRef.current;
        if (animate === "loop" && node) {
          node.classList.remove("is-play");
          void node.getBoundingClientRect();
          node.classList.add("is-play");
        }
        if (completed.has(uid)) return;
        completed.add(uid);
        onCompleteRef.current?.();
      }}
    >
      <defs>
        <mask id={`${uid}-ink`} maskUnits="userSpaceOnUse" x="-30" y="-30" width="320" height="170">
          <path className="awx-mm awx-mm1" pathLength={1} d={mark.inkCenter} />
        </mask>
        <mask
          id={`${uid}-orange`}
          maskUnits="userSpaceOnUse"
          x="-30"
          y="-30"
          width="320"
          height="170"
        >
          <path className="awx-mm awx-mm2" pathLength={1} d={mark.orangeCenter} />
        </mask>
      </defs>
      <path className="awx-orange" d={mark.orange} mask={`url(#${uid}-orange)`} />
      <path className="awx-ink" d={mark.ink} mask={`url(#${uid}-ink)`} />
      {variant === "full" ? <circle className="awx-ping" cx="200" cy="48" r="6" /> : null}
    </svg>
  );
}
