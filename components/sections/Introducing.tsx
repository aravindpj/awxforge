"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Frame } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SignatureVisual } from "@/components/sections/SignatureVisual";

gsap.registerPlugin(ScrollTrigger);

export function Introducing() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const stage = root.current;
    if (!stage) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const allow = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
    const visual = stage.querySelector<HTMLElement>("[data-forge]");
    const pin = stage.querySelector<HTMLElement>(".intro-pin");
    if (!visual || !pin || reduced || !allow) return;

    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: stage,
        start: "top top",
        end: "bottom bottom",
        pin,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          visual.style.setProperty("--p", self.progress.toFixed(4));
        },
      });
    }, stage);

    ScrollTrigger.refresh();

    return () => context.revert();
  }, []);

  return (
    <section
      ref={root}
      id="introducing"
      aria-labelledby="introducing-label"
      className="intro-stage relative border-t border-line"
    >
      <div className="intro-pin">
        <Frame marks className="py-20 md:py-0">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <div className="mb-12 flex items-baseline justify-between gap-4 md:mb-16">
                <SectionLabel id="introducing-label" index="03" label="Introducing" />
                <p
                  aria-hidden
                  className="shrink-0 font-mono text-[11px] tracking-[0.08em] text-secondary"
                >
                  SECTION 03 / 07
                </p>
              </div>
              <p className="text-[clamp(26px,3vw,40px)] leading-[1.2] tracking-[-0.03em]">
                We are building a technology company founded on one fundamental belief: the best
                software doesn’t force businesses to adapt to technology. It adapts to the way
                businesses work.
              </p>
              <p className="mt-8 text-lg leading-relaxed text-secondary">
                Our focus is on understanding the problems that matter most, rethinking conventional
                approaches, and exploring how intelligent software, connected workflows, and
                practical automation can create better ways of working.
              </p>
            </div>
            <div className="lg:col-span-7">
              <SignatureVisual mode="scrub" className="intro-visual" caption="Fig. 02" />
            </div>
          </div>
        </Frame>
      </div>
    </section>
  );
}
