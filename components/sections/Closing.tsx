import { Frame } from "@/components/ui/Section";

export function Closing() {
  return (
    <section
      className="relative flex min-h-svh items-end border-t border-line"
      aria-labelledby="closing-title"
    >
      <Frame marks className="pb-16 md:pb-24">
        <h2 id="closing-title" className="display">
          <span className="block">This is the beginning.</span>
          <span className="mt-[0.06em] flex items-center gap-[0.16em]">
            <span aria-hidden className="inline-block size-[0.18em] bg-accent" />
            This is AWXFORGE.
          </span>
        </h2>
      </Frame>
    </section>
  );
}
