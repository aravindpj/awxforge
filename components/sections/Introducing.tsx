import { IntroFigure } from "@/components/sections/IntroFigure";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function Introducing() {
  return (
    <Section id="introducing" index="03" label="Introducing">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
        <Reveal className="lg:col-span-7">
          <p className="text-[clamp(26px,3vw,40px)] leading-[1.2] tracking-[-0.03em]">
            We are building a technology company founded on one fundamental belief: the best
            software doesn’t force businesses to adapt to technology. It adapts to the way
            businesses work.
          </p>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-5">
          <p className="text-lg leading-relaxed text-secondary">
            Our focus is on understanding the problems that matter most, rethinking conventional
            approaches, and exploring how intelligent software, connected workflows, and practical
            automation can create better ways of working.
          </p>
        </Reveal>
      </div>
      <div className="mt-14 md:mt-20">
        <IntroFigure />
      </div>
    </Section>
  );
}
