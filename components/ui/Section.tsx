import { SectionLabel } from "@/components/ui/SectionLabel";

export function Frame({
  children,
  className = "",
  marks = false,
}: {
  children: React.ReactNode;
  className?: string;
  marks?: boolean;
}) {
  return (
    <div className={`relative mx-auto w-[min(1440px,calc(100%-48px))] ${className}`}>
      <div aria-hidden className="frame-grid pointer-events-none absolute inset-0" />
      {marks ? <Marks /> : null}
      <div className="relative">{children}</div>
    </div>
  );
}

export function Marks() {
  return (
    <>
      <span aria-hidden className="mark -top-3 -left-3">
        +
      </span>
      <span aria-hidden className="mark -top-3 -right-3">
        +
      </span>
      <span aria-hidden className="mark -bottom-3 -left-3">
        +
      </span>
      <span aria-hidden className="mark -right-3 -bottom-3">
        +
      </span>
    </>
  );
}

export function SectionChrome({
  id,
  index,
  label,
  labelAs = "h2",
}: {
  id: string;
  index: string;
  label: string;
  labelAs?: "h2" | "p";
}) {
  return (
    <div className="mb-12 flex items-baseline justify-between gap-4 md:mb-16">
      <SectionLabel id={id} index={index} label={label} as={labelAs} />
      <p aria-hidden className="shrink-0 font-mono text-[11px] tracking-[0.08em] text-secondary">
        SECTION {index} / 07
      </p>
    </div>
  );
}

export function Section({
  id,
  index,
  label,
  labelledBy,
  labelAs = "h2",
  children,
  className = "",
}: {
  id: string;
  index: string;
  label: string;
  labelledBy?: string;
  labelAs?: "h2" | "p";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy ?? `${id}-label`}
      className={`relative border-t border-line py-20 md:py-32 lg:py-40 ${className}`}
    >
      <Frame marks>
        <SectionChrome
          id={`${id}-label`}
          index={index}
          label={label}
          labelAs={labelledBy ? "p" : labelAs}
        />
        {children}
      </Frame>
    </section>
  );
}
