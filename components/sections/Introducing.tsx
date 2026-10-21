import { IntroFigure } from "@/components/sections/IntroFigure";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function Introducing() {
  return (
    <Section id="introducing" index="03" label="Introducing">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="text-[clamp(26px,3vw,40px)] leading-[1.2] tracking-[-0.03em]">
              We are building a technology company founded on one fundamental belief: the best
              software doesn’t force businesses to adapt to technology. It adapts to the way
              businesses work.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-8 text-lg leading-relaxed text-secondary">
              Our focus is on understanding the problems that matter most, rethinking conventional
              approaches, and exploring how intelligent software, connected workflows, and practical
              automation can create better ways of working.
            </p>
          </Reveal>
        </div>
        <div className="min-w-0 lg:col-span-7">
          <IntroFigure />
        </div>
      </div>
    </Section>
  );
}
