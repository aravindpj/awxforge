export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span aria-hidden className="size-2 bg-accent" />
      <span className="text-[13px] font-medium tracking-[0.16em]">AWXFORGE</span>
    </span>
  );
}
