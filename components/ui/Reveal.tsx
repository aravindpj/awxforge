"use client";

import { motion } from "motion/react";
import { useIntroDone } from "@/components/providers/IntroProvider";
import { DURATION, EASE, usePrefersReducedMotion } from "@/lib/motion";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const introDone = useIntroDone();
  const ready = reduced || introDone;

  return (
    <motion.div
      className={`reveal-lock ${className}`}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={ready ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: reduced ? 0 : DURATION, ease: EASE, delay: reduced ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}
