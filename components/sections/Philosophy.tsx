"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/ui/Section";

const rows = [
  {
    letter: "A",
    text: "Ambition to challenge the ordinary and pursue what could be better.",
  },
  {
    letter: "W",
    text: "Wisdom to understand the problem before attempting to solve it.",
  },
  {
    letter: "X",
    text: "Exploration to question assumptions, experiment boldly, and discover what is possible.",
  },
  {
    letter: "FORGE",
    text: "The discipline to turn possibilities into reality through engineering, precision, iteration, and relentless refinement.",
  },
];

export function Philosophy() {
  const list = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const shown = hovered ?? active;

  useEffect(() => {
    const root = list.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-row]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = items.indexOf(visible.target as HTMLElement);
        if (index >= 0) setActive(index);
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: [0.25, 0.5, 0.75] },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <Section id="philosophy" index="04" label="Philosophy" labelledBy="philosophy-title">
      <h2
        id="philosophy-title"
        className="max-w-[16em] text-[clamp(32px,4.4vw,64px)] leading-[1.05] tracking-[-0.04em]"
      >
        AWXFORGE isn’t just a name. It’s a philosophy.
      </h2>

      <ul ref={list} className="mt-12 border-b border-line md:mt-20">
        {rows.map((row, index) => {
          const on = shown === index;
          return (
            <li
              key={row.letter}
              data-row=""
              tabIndex={0}
              className="grid gap-4 border-t border-line py-8 outline-none md:grid-cols-12 md:items-baseline md:gap-8 md:py-10"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(index)}
              onBlur={() => setHovered(null)}
            >
              <h3
                className={`text-[clamp(48px,7vw,96px)] leading-none tracking-[-0.045em] transition-colors duration-700 ease-forge md:col-span-4 ${on ? "text-accent" : "text-secondary"}`}
              >
                {row.letter}
              </h3>
              <p
                className={`max-w-[28em] text-[clamp(18px,2vw,24px)] leading-snug transition-colors duration-700 ease-forge md:col-span-8 ${on ? "text-ink" : "text-secondary"}`}
              >
                {row.text}
              </p>
            </li>
          );
        })}
      </ul>

      <p className="mt-12 max-w-[36rem] text-lg leading-relaxed md:mt-16">
        This philosophy shapes the problems we choose to explore, the solutions we aspire to create,
        and the future we want to help shape.
      </p>
    </Section>
  );
}
