"use client";

import { Button } from "@/components/ui/Button";
import { Frame } from "@/components/ui/Section";
import { SignatureVisual } from "@/components/sections/SignatureVisual";

const lines = ["The future of", "business software", "shouldn’t mean", "more complexity."];

export function Hero() {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24" aria-labelledby="hero-title">
      <Frame marks>
        <p className="font-mono text-[11px] tracking-[0.08em] text-secondary uppercase">
          AWXFORGE — Forging better ways to work
        </p>
        <h1 id="hero-title" className="display mt-6 text-ink">
          {lines.map((line) => (
            <span key={line} className="mask-line">
              <span>{line}</span>
            </span>
          ))}
        </h1>
        <p className="mt-8 max-w-[28rem] text-2xl leading-snug font-medium tracking-[-0.03em] text-secondary">
          It should mean <em className="text-accent italic">a better way forward.</em>
        </p>
        <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <Button href="#contact">Join the journey</Button>
          <Button href="#philosophy" variant="secondary">
            Read our philosophy
          </Button>
        </div>
        <div className="mt-16 md:mt-24">
          <SignatureVisual caption="Fig. 01" />
        </div>
      </Frame>
    </section>
  );
}
