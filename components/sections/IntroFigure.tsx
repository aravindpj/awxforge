"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

type IconName =
  | "chat"
  | "cam"
  | "mic"
  | "pkg"
  | "hash"
  | "cal"
  | "pin"
  | "rup"
  | "chk"
  | "ord"
  | "inbox"
  | "filt"
  | "done"
  | "redo";

type Phase = "chaos" | "sort" | "done";

const pieces: {
  text: string;
  slot: number;
  x: number;
  y: number;
  rot: number;
  icon: IconName;
}[] = [
  { text: "brake pads", slot: 0, x: 0.05, y: 0.12, rot: -7, icon: "chat" },
  { text: "40", slot: 1, x: 0.3, y: 0.62, rot: 9, icon: "mic" },
  { text: "Friday", slot: 2, x: 0.08, y: 0.74, rot: -5, icon: "chat" },
  { text: "Kochi shop", slot: 3, x: 0.14, y: 0.34, rot: 6, icon: "mic" },
  { text: "₹18,400", slot: 4, x: 0.2, y: 0.9, rot: -9, icon: "cam" },
  { text: "hi bhai", slot: -1, x: 0.62, y: 0.05, rot: 8, icon: "chat" },
  { text: "ok ok", slot: -1, x: 0.04, y: 0.52, rot: -10, icon: "chat" },
  { text: "pls fast", slot: -1, x: 0.5, y: 0.45, rot: 5, icon: "chat" },
  { text: "??", slot: -1, x: 0.82, y: 0.85, rot: -6, icon: "chat" },
  { text: "thanks", slot: -1, x: 0.58, y: 0.9, rot: 7, icon: "chat" },
  { text: "call me", slot: -1, x: 0.34, y: 0.06, rot: -4, icon: "mic" },
];

const rows: { label: string; icon: IconName; delay: string }[] = [
  { label: "Item", icon: "pkg", delay: "0.3s" },
  { label: "Quantity", icon: "hash", delay: "0.45s" },
  { label: "Due", icon: "cal", delay: "0.6s" },
  { label: "Deliver to", icon: "pin", delay: "0.75s" },
  { label: "Amount", icon: "rup", delay: "0.9s" },
];

const steps: { n: string; label: string; icon: IconName }[] = [
  { n: "1", label: "Messages arrive messy", icon: "inbox" },
  { n: "2", label: "AWXFORGE picks out what matters", icon: "filt" },
  { n: "3", label: "The order is ready", icon: "done" },
];

function Icon({
  name,
  className = "fig2-icon",
  style,
}: {
  name: IconName;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
      {name === "chat" ? <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /> : null}
      {name === "cam" ? (
        <>
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z" />
          <circle cx="12" cy="13" r="3" />
        </>
      ) : null}
      {name === "mic" ? (
        <>
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3" />
        </>
      ) : null}
      {name === "pkg" ? (
        <>
          <path d="m7.5 4.27 9 5.15" />
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
        </>
      ) : null}
      {name === "hash" ? <path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18" /> : null}
      {name === "cal" ? (
        <>
          <path d="M8 2v4M16 2v4" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M3 10h18" />
        </>
      ) : null}
      {name === "pin" ? (
        <>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </>
      ) : null}
      {name === "rup" ? (
        <>
          <path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3" />
          <path d="M9 13c6.667 0 6.667-10 0-10" />
        </>
      ) : null}
      {name === "chk" ? <path d="m5 12 5 5L20 7" /> : null}
      {name === "ord" ? (
        <>
          <rect width="8" height="4" x="8" y="2" rx="1" />
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <path d="m9 14 2 2 4-4" />
        </>
      ) : null}
      {name === "inbox" ? (
        <>
          <path d="M22 12h-6l-2 3h-4l-2-3H2" />
          <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        </>
      ) : null}
      {name === "filt" ? <path d="M22 3H2l8 9.46V19l4 2v-8.54z" /> : null}
      {name === "done" ? (
        <>
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" />
        </>
      ) : null}
      {name === "redo" ? (
        <>
          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
          <path d="M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16M8 16H3v5" />
        </>
      ) : null}
    </svg>
  );
}

export function IntroFigure() {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>("chaos");
  const [override, setOverride] = useState<Phase | null>(null);
  const shown: Phase = reduced ? (override ?? "done") : phase;
  const stageRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fragRefs = useRef<(HTMLDivElement | null)[]>([]);
  const phaseRef = useRef<Phase>("chaos");
  const runRef = useRef<() => void>(() => {});

  const place = useCallback((next: Phase) => {
    const stage = stageRef.current;
    if (!stage || stage.clientWidth === 0) return;
    const stageRect = stage.getBoundingClientRect();
    const width = stage.clientWidth;
    const height = stage.clientHeight;

    pieces.forEach((piece, index) => {
      const el = fragRefs.current[index];
      if (!el) return;
      const kept = piece.slot >= 0;
      el.style.transitionDelay = next === "sort" && kept ? `${index * 110}ms` : "0ms";
      if (next !== "chaos" && kept) {
        const slot = slotRefs.current[piece.slot];
        if (!slot) return;
        const slotRect = slot.getBoundingClientRect();
        const x = slotRect.left - stageRect.left;
        const y = slotRect.top - stageRect.top + (slotRect.height - el.offsetHeight) / 2;
        el.style.transform = `translate(${x}px, ${y}px) rotate(0deg)`;
        return;
      }
      const x = piece.x * (width - el.offsetWidth);
      const y = piece.y * (height - el.offsetHeight);
      const scale = next !== "chaos" ? " scale(0.7)" : "";
      el.style.transform = `translate(${x}px, ${y}px) rotate(${piece.rot}deg)${scale}`;
    });
    stage.classList.add("is-ready");
  }, []);

  useLayoutEffect(() => {
    phaseRef.current = shown;
    place(shown);
    const scan = scanRef.current;
    if (!scan) return;
    if (shown === "sort" && !reduced) {
      scan.classList.remove("is-run");
      void scan.offsetWidth;
      scan.classList.add("is-run");
    } else {
      scan.classList.remove("is-run");
    }
  }, [shown, place, reduced]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(() => {
      fragRefs.current.forEach((el) => {
        if (el) el.style.transition = "none";
      });
      place(phaseRef.current);
      requestAnimationFrame(() => {
        fragRefs.current.forEach((el) => {
          if (el) el.style.transition = "";
        });
      });
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, [place]);

  useEffect(() => {
    let cancel = false;
    const ready = document.fonts?.ready ?? Promise.resolve();
    ready.then(() => {
      if (!cancel) place(phaseRef.current);
    });
    return () => {
      cancel = true;
    };
  }, [place]);

  useEffect(() => {
    if (reduced) return;
    const node = stageRef.current;
    if (!node) return;

    let timers: number[] = [];
    let running = false;
    let onScreen = false;
    let alive = true;

    const clear = () => {
      for (const id of timers) window.clearTimeout(id);
      timers = [];
    };

    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        if (!alive || !running) return;
        fn();
      }, ms);
      timers.push(id);
    };

    const run = () => {
      clear();
      running = true;
      setPhase("chaos");
      later(() => setPhase("sort"), 2200);
      later(() => setPhase("done"), 4400);
      later(run, 9200);
    };

    runRef.current = () => {
      if (!alive) return;
      run();
    };

    const sync = () => {
      if (onScreen && !document.hidden) {
        if (!running) run();
      } else {
        running = false;
        clear();
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = Boolean(entry?.isIntersecting);
      sync();
    });
    observer.observe(node);
    document.addEventListener("visibilitychange", sync);

    return () => {
      alive = false;
      running = false;
      clear();
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [reduced]);

  const stepIndex = shown === "chaos" ? 0 : shown === "sort" ? 1 : 2;

  return (
    <div>
      <p className="fig2-src">
        Arriving from{" "}
        <span>
          <Icon name="chat" />
          WhatsApp
        </span>
        <span>
          <Icon name="cam" />
          Photos
        </span>
        <span>
          <Icon name="mic" />
          Voice notes
        </span>
      </p>
      <div
        ref={stageRef}
        className="fig2-stage"
        data-p={shown}
        role="img"
        aria-label="Scattered message fragments sort themselves into a tidy order record"
      >
        <div className="fig2-card">
          <div className="fig2-head">
            <span className="fig2-ttl">
              <span className="fig2-mk">
                <Icon name="ord" />
              </span>
              Order <span className="fig2-id">#1042</span>
            </span>
            <span className="fig2-status">
              <span className="fig2-dot" />
              <span className="w">Waiting</span>
              <span className="d">Created</span>
            </span>
          </div>
          <div className="fig2-rows">
            {rows.map((row, index) => (
              <div className="fig2-row" key={row.label}>
                <span className="fig2-lb">
                  <Icon name={row.icon} />
                  {row.label}
                </span>
                <div
                  className="fig2-slot"
                  ref={(el) => {
                    slotRefs.current[index] = el;
                  }}
                />
                <Icon name="chk" className="fig2-icon fig2-chk" style={{ transitionDelay: row.delay }} />
              </div>
            ))}
          </div>
          <div className="fig2-foot">
            <Icon name="done" />
            Filled in automatically. Nothing typed.
          </div>
        </div>
        <div ref={scanRef} className="fig2-scan" />
        {pieces.map((piece, index) => {
          const kept = piece.slot >= 0;
          const placed = kept && shown !== "chaos";
          const gone = !kept && shown !== "chaos";
          return (
            <div
              key={piece.text}
              ref={(el) => {
                fragRefs.current[index] = el;
              }}
              className={`fig2-f${kept ? " is-ok" : " is-noise"}${placed ? " is-placed" : ""}${gone ? " is-gone" : ""}`}
            >
              <Icon name={piece.icon} />
              <span style={{ animationDelay: `${index * -0.37}s` }}>{piece.text}</span>
            </div>
          );
        })}
      </div>
      <ol className="fig2-steps">
        {steps.map((step, index) => (
          <li
            key={step.n}
            className={`${index <= stepIndex ? "is-on" : ""}${index === stepIndex ? " is-cur" : ""}`}
          >
            <Icon name={step.icon} className="fig2-icon fig2-si" />
            <b>{step.n}</b>
            {step.label}
          </li>
        ))}
      </ol>
      <div className="fig2-bar">
        <p className="fig2-caption">FIG. 02 — From noise to record</p>
        <button
          type="button"
          className="fig2-replay"
          onClick={() => {
            if (reduced) {
              setOverride((current) => ((current ?? "done") === "done" ? "chaos" : "done"));
              return;
            }
            runRef.current();
          }}
        >
          <Icon name="redo" />
          Replay
        </button>
      </div>
    </div>
  );
}
