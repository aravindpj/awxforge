"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { AwxMark } from "@/components/brand/awx-mark";
import { EASE, usePrefersReducedMotion } from "@/lib/motion";

type Phase = "play" | "flip" | "exit" | "gone";

function shell() {
  return document.getElementById("site-shell");
}

export function Preloader() {
  const reduced = usePrefersReducedMotion();
  const reducedRef = useRef(reduced);
  const leaving = useRef(false);
  const armed = useRef(false);
  const markRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("play");
  const [flip, setFlip] = useState<{ x: number; y: number; scale: number } | null>(null);

  useEffect(() => {
    reducedRef.current = reduced;
  }, [reduced]);

  const finish = useCallback(() => {
    const root = document.documentElement;
    root.dataset.intro = "done";
    document.getElementById("awx-intro-boot")?.remove();
    shell()?.removeAttribute("inert");
    setPhase("gone");
    window.dispatchEvent(new Event("awx:intro-complete"));
    const previous = document.body.getAttribute("tabindex");
    document.body.tabIndex = -1;
    document.body.focus({ preventScroll: true });
    if (previous === null) document.body.removeAttribute("tabindex");
    else document.body.setAttribute("tabindex", previous);
  }, []);

  const exit = useCallback(() => {
    if (leaving.current) return;
    leaving.current = true;
    document.documentElement.dataset.intro = "exiting";
    setPhase("exit");
  }, []);

  const handoff = useCallback(() => {
    if (leaving.current || phase === "flip" || phase === "exit") return;
    if (reducedRef.current) {
      exit();
      return;
    }
    const from = markRef.current?.getBoundingClientRect();
    const to = document.querySelector("[data-awx-target]")?.getBoundingClientRect();
    if (!from || !to || from.width < 2 || to.width < 2) {
      exit();
      return;
    }
    document.documentElement.dataset.awxHandoff = "1";
    setFlip({
      x: to.left + to.width / 2 - (from.left + from.width / 2),
      y: to.top + to.height / 2 - (from.top + from.height / 2),
      scale: to.width / from.width,
    });
    setPhase("flip");
  }, [exit, phase]);

  useLayoutEffect(() => {
    if (document.documentElement.dataset.intro !== "play") {
      window.dispatchEvent(new Event("awx:intro-complete"));
      return;
    }
    armed.current = true;
    shell()?.setAttribute("inert", "");
  }, []);

  useEffect(() => {
    if (phase === "gone") return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape" && event.key !== "Enter") return;
      event.preventDefault();
      exit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [exit, phase]);

  useEffect(() => {
    if (!reduced) return;
    const id = window.setTimeout(() => {
      if (!armed.current) return;
      exit();
    }, 600);
    return () => window.clearTimeout(id);
  }, [exit, reduced]);

  if (phase === "gone") return null;

  return (
    <motion.div
      id="preloader"
      role="status"
      aria-label="Loading AWXFORGE"
      className={phase === "flip" ? "is-flip" : undefined}
      initial={false}
      animate={
        phase === "exit"
          ? reduced
            ? { opacity: 0, clipPath: "inset(0 0 0% 0)" }
            : { opacity: 1, clipPath: "inset(0 0 100% 0)" }
          : { opacity: 1, clipPath: "inset(0 0 0% 0)" }
      }
      transition={{ duration: phase === "exit" ? 0.8 : 0, ease: EASE }}
      onAnimationComplete={() => {
        if (phase === "exit") finish();
      }}
      onClick={() => exit()}
    >
      <motion.div
        ref={markRef}
        className="awx-preloader-mark"
        initial={false}
        animate={flip ? { x: flip.x, y: flip.y, scale: flip.scale } : { x: 0, y: 0, scale: 1 }}
        transition={{ duration: flip ? 0.8 : 0, ease: EASE }}
        onAnimationComplete={() => {
          if (phase === "flip") exit();
        }}
      >
        <AwxMark
          className="awx-hero"
          variant="full"
          animate={reduced ? "none" : "once"}
          onComplete={() => {
            if (!armed.current || reducedRef.current || leaving.current) return;
            window.setTimeout(handoff, 300);
          }}
        />
      </motion.div>
      <p className="awx-preloader-label">Forging better ways to work</p>
      <button
        type="button"
        className="awx-skip"
        onClick={(event) => {
          event.stopPropagation();
          exit();
        }}
      >
        Skip
      </button>
      <div className="awx-progress" aria-hidden="true">
        <span />
      </div>
    </motion.div>
  );
}
