"use client";

import { useRef, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { colors } from "@/lib/tokens";
import { subscribeTheme, themePairSnapshot } from "@/lib/theme";
import { Frame } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";

const text =
  "We believe technology should do more than digitise existing processes. It should challenge unnecessary complexity. Simplify the way work gets done. Transform what’s possible.";

const words = text.split(" ");
const lightPair = { theme: "light", dim: colors.dim, ink: colors.ink };

function Word({
  progress,
  index,
  from,
  to,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  from: string;
  to: string;
  children: string;
}) {
  const start = index / words.length;
  const end = Math.min(1, start + 1.15 / words.length);
  const color = useTransform(progress, [start, end], [from, to]);

  return (
    <motion.span suppressHydrationWarning style={{ color }} className="belief-word">
      {children}{" "}
    </motion.span>
  );
}

export function Belief() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const pair = useSyncExternalStore(subscribeTheme, themePairSnapshot, () => lightPair);

  return (
    <section
      ref={ref}
      id="belief"
      aria-labelledby="belief-label"
      className="belief relative border-t border-line"
    >
      <div className="belief-pin">
        <Frame marks className="py-20 md:py-0">
          <div className="mb-12 flex items-baseline justify-between gap-4 md:mb-16">
            <SectionLabel id="belief-label" index="02" label="Belief" />
            <p
              aria-hidden
              className="shrink-0 font-mono text-[11px] tracking-[0.08em] text-secondary"
            >
              SECTION 02 / 07
            </p>
          </div>
          <p className="sr-only">{text}</p>
          <p
            aria-hidden
            className="max-w-[14em] text-[clamp(32px,4.8vw,72px)] leading-[1.12] tracking-[-0.035em]"
          >
            {words.map((word, index) => (
              <Word
                key={`${pair.ink}-${word}-${index}`}
                progress={scrollYProgress}
                index={index}
                from={pair.dim}
                to={pair.ink}
              >
                {word}
              </Word>
            ))}
          </p>
        </Frame>
      </div>
    </section>
  );
}
