import { ArrowUpRight } from "lucide-react";
import { Wordmark } from "@/components/ui/Wordmark";

const socials = [
  { href: "https://www.linkedin.com", label: "LinkedIn" },
  { href: "https://www.instagram.com", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-[min(1440px,calc(100%-48px))] flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <Wordmark />
          <p className="mt-4 font-mono text-[11px] tracking-[0.08em] text-secondary uppercase">
            Built with precision.
          </p>
        </div>
        <ul className="flex gap-6">
          {socials.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-draw inline-flex items-center gap-2 text-sm text-ink"
              >
                {item.label}
                <ArrowUpRight aria-hidden size={14} strokeWidth={1.5} />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-6 font-mono text-[11px] tracking-[0.08em] text-secondary">
          <p>© 2026</p>
          <p aria-hidden>v0.1</p>
        </div>
      </div>
    </footer>
  );
}
