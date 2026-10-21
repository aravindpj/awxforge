import { AwxMark } from "@/components/brand/awx-mark";

export function AwxLockup({
  animate = "none",
  speed = 1,
  tone = "light",
  onComplete,
  className,
}: {
  animate?: "once" | "loop" | "none";
  speed?: number;
  tone?: "light" | "ink" | "orange";
  onComplete?: () => void;
  className?: string;
}) {
  return (
    <span className={`awx-lockup${className ? ` ${className}` : ""}`}>
      <span data-awx-target className="inline-flex">
        <AwxMark
          variant="full"
          tone={tone}
          animate={animate}
          speed={speed}
          tight
          onComplete={onComplete}
        />
      </span>
      <span className="awx-forge">FORGE</span>
    </span>
  );
}
