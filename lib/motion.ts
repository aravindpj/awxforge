"use client";

import { useSyncExternalStore } from "react";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const DURATION = 0.8;
export const STAGGER = 0.06;

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
} as const;

function sampleBezier(t: number, c1: number, c2: number) {
  const u = 1 - t;
  return 3 * u * u * t * c1 + 3 * u * t * t * c2 + t * t * t;
}

/** cubic-bezier(0.22, 1, 0.36, 1) */
export function easeForge(amount: number) {
  const t = Math.min(1, Math.max(0, amount));
  let start = 0;
  let end = 1;
  for (let i = 0; i < 10; i += 1) {
    const mid = (start + end) / 2;
    if (sampleBezier(mid, 0.22, 0.36) < t) start = mid;
    else end = mid;
  }
  return sampleBezier((start + end) / 2, 1, 1);
}

function subscribe(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function snapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, snapshot, () => false);
}
