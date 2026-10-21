"use client";

import { useRef } from "react";

export function MagneticButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  function onMove(event: React.MouseEvent<HTMLSpanElement>) {
    const node = ref.current;
    if (!node) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const rect = node.getBoundingClientRect();
    const x = Math.max(-6, Math.min(6, (event.clientX - (rect.left + rect.width / 2)) * 0.22));
    const y = Math.max(-6, Math.min(6, (event.clientY - (rect.top + rect.height / 2)) * 0.22));
    node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  function onLeave() {
    if (ref.current) ref.current.style.transform = "translate3d(0, 0, 0)";
  }

  return (
    <span
      ref={ref}
      className={`magnetic inline-flex ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </span>
  );
}
