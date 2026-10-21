"use client";

import { useInViewClass } from "@/lib/in-view";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

const steps = ["Listen", "Question", "Learn", "Build"];

export function Method() {
  const ref = useInViewClass<HTMLDivElement>();

  return (
    <Section id="method" index="05" label="Method">
      <Reveal>
        <p className="max-w-[22em] text-[clamp(26px,3.2vw,44px)] leading-[1.15] tracking-[-0.03em]">
          We are at the beginning of this journey. We are listening, questioning assumptions,
          learning from real businesses, and turning those insights into ideas worth building.
          Because meaningful innovation doesn’t begin with code. It begins with understanding.
        </p>
      </Reveal>

      <div ref={ref} className="relative mt-16 md:mt-24">
        <svg
          aria-hidden
          viewBox="0 0 100 2"
          preserveAspectRatio="none"
          className="absolute top-[5px] left-0 hidden h-px w-full md:block"
        >
          <path
            className="line-straight"
            d="M0 1 H100"
            fill="none"
            stroke="#0A0A0A"
            strokeWidth="1"
            pathLength={1}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <svg
          aria-hidden
          viewBox="0 0 2 100"
          preserveAspectRatio="none"
          className="absolute top-2 bottom-2 left-[5px] w-px md:hidden"
        >
          <path
            className="line-straight"
            d="M1 0 V100"
            fill="none"
            stroke="#0A0A0A"
            strokeWidth="1"
            pathLength={1}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <ol className="relative grid gap-10 md:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step} className="pl-8 md:pl-0">
              <span aria-hidden className="mb-5 block size-2.5 border border-ink bg-bg" />
              <p className="font-mono text-[11px] tracking-[0.08em] text-secondary">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 text-[clamp(28px,3vw,40px)] tracking-[-0.03em]">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
