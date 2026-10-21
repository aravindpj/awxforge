"use client";

import { useInViewClass } from "@/lib/in-view";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

const pains = ["Disconnected", "Repetitive", "Fragmented", "Effort"];

export function Problem() {
  const ref = useInViewClass<HTMLDivElement>();

  return (
    <Section id="problem" index="01" label="Problem">
      <Reveal>
        <p className="max-w-[22em] text-[clamp(26px,3.2vw,44px)] leading-[1.15] tracking-[-0.03em]">
          Every business aspires to grow. Yet behind that ambition lie countless everyday
          challenges: disconnected systems, repetitive tasks, fragmented information, and workflows
          that demand more effort than they should.
        </p>
      </Reveal>

      <div ref={ref} className="relative mt-16 md:mt-24">
        <svg
          aria-hidden
          viewBox="0 0 100 8"
          preserveAspectRatio="none"
          className="absolute top-[3px] left-0 hidden h-2 w-full md:block"
        >
          <path
            className="line-tangle"
            d="M0 4 C 8 0, 14 8, 24 4 S 38 0, 48 5 S 62 8, 74 3 S 88 1, 100 4"
            fill="none"
            stroke="#0A0A0A"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            className="line-straight"
            d="M0 4 H100"
            fill="none"
            stroke="#0A0A0A"
            strokeWidth="1"
            pathLength={1}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <svg
          aria-hidden
          viewBox="0 0 8 100"
          preserveAspectRatio="none"
          className="absolute top-0 bottom-0 left-[3px] w-2 md:hidden"
        >
          <path
            className="line-tangle"
            d="M4 0 C 0 12, 8 20, 4 32 S 0 48, 5 60 S 8 78, 3 88 S 1 96, 4 100"
            fill="none"
            stroke="#0A0A0A"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            className="line-straight"
            d="M4 0 V100"
            fill="none"
            stroke="#0A0A0A"
            strokeWidth="1"
            pathLength={1}
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <ul className="relative grid grid-cols-1 gap-8 md:grid-cols-4">
          {pains.map((pain, index) => (
            <li key={pain} className="pl-8 md:pl-0">
              <span aria-hidden className="mb-4 block size-1.5 bg-ink md:mt-0" />
              <p className="font-mono text-[12px] tracking-[0.12em] text-ink uppercase">
                <span className="text-secondary">{String(index + 1).padStart(2, "0")} </span>
                {pain}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
