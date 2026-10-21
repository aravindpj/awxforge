import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function Mission() {
  return (
    <Section id="mission" index="06" label="Mission">
      <Reveal>
        <p className="max-w-[20em] text-[clamp(28px,3.6vw,52px)] leading-[1.12] tracking-[-0.035em]">
          Our mission is to simplify and automate the way businesses work, empowering people to
          spend less time navigating complexity and more time creating value.
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-secondary md:mt-10">
          We aren’t here to build technology for technology’s sake. We’re here to forge better ways
          to work.
        </p>
      </Reveal>
    </Section>
  );
}
