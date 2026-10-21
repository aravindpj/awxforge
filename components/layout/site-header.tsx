"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AwxLockup } from "@/components/brand/awx-lockup";
import { Button } from "@/components/ui/Button";
import { resolveHeaderAnimate } from "@/lib/intro-state";

function subscribeToIntro(onChange: () => void) {
  window.addEventListener("awx:intro-complete", onChange);
  return () => window.removeEventListener("awx:intro-complete", onChange);
}

function headerMarkSnapshot() {
  if (document.documentElement.dataset.intro !== "done") return "pending" as const;
  return resolveHeaderAnimate();
}

const links = [
  { href: "#philosophy", label: "Philosophy" },
  { href: "#method", label: "Method" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const header = useRef<HTMLElement>(null);
  const readout = useRef<HTMLSpanElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const markChoice = useSyncExternalStore(
    subscribeToIntro,
    headerMarkSnapshot,
    () => "pending" as const,
  );
  const mark = markChoice === "once" ? "once" : "none";

  useEffect(() => {
    const node = header.current;
    if (!node) return;

    const onScroll = () => {
      node.classList.toggle("is-scrolled", window.scrollY > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      if (readout.current) {
        readout.current.textContent = String(Math.round(progress * 100)).padStart(3, "0");
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header ref={header} className="nav fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex h-16 w-[min(1440px,calc(100%-48px))] items-center justify-between gap-4">
        <a
          href="#main"
          className="inline-flex min-h-11 items-center text-ink"
          aria-label="AWXFORGE"
          data-awx-lockup
        >
          <AwxLockup animate={mark} speed={1.8} />
        </a>

        <nav aria-label="Primary" className="flex items-center gap-8">
          <ul className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="link-draw text-sm text-ink">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <span
            ref={readout}
            aria-hidden
            className="hidden font-mono text-[11px] tracking-[0.08em] text-secondary md:inline"
          >
            000
          </span>

          <div className="hidden md:block">
            <Button href="#contact" size="sm">
              Join the journey
            </Button>
          </div>

          <button
            ref={menuButton}
            type="button"
            className="font-mono text-[11px] tracking-[0.08em] text-ink uppercase md:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </nav>
      </div>

      {open ? (
        <div id="site-menu" className="border-b border-line bg-bg md:hidden">
          <ul className="mx-auto w-[min(1440px,calc(100%-48px))] py-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="flex min-h-12 items-center text-lg text-ink"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="py-3">
              <Button href="#contact" onClick={() => setOpen(false)}>
                Join the journey
              </Button>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
