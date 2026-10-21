"use client";

import { useEffect, useRef } from "react";

export function SectionLabel({
  id,
  index,
  label,
  as: Tag = "h2",
}: {
  id?: string;
  index: string;
  label: string;
  as?: "h2" | "p";
}) {
  const count = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = count.current;
    if (!node) return;

    const target = Number(index);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || Number.isNaN(target)) {
      node.textContent = index;
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 700);
          const eased = 1 - (1 - t) ** 3;
          node.textContent = String(Math.round(eased * target)).padStart(2, "0");
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.8 },
    );

    observer.observe(node);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [index]);

  return (
    <Tag
      id={id}
      className="font-mono text-[11px] font-normal tracking-[0.08em] text-secondary uppercase"
    >
      <span aria-hidden>[</span>
      <span ref={count} aria-hidden>
        {index}
      </span>
      <span aria-hidden>] — </span>
      <span className="sr-only">Section {index}. </span>
      {label}
    </Tag>
  );
}
