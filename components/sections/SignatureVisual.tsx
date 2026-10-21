"use client";

import { useEffect, useRef } from "react";
import { easeForge } from "@/lib/motion";

const ink = "#0A0A0A";
const line = "#E8E8E8";
const surface = "#FAFAFA";
const secondary = "#5C5C5C";
const accent = "#FF4F00";

function Placed({
  x,
  y,
  rot,
  dx = 0,
  dy = 0,
  origin,
  children,
}: {
  x: number;
  y: number;
  rot: number;
  dx?: number;
  dy?: number;
  origin: string;
  children: React.ReactNode;
}) {
  return (
    <g
      style={{
        transform: `translate(calc(${x}px + var(--p) * ${dx}px), calc(${y}px + var(--p) * ${dy}px))`,
      }}
    >
      <g
        style={{
          transform: `rotate(calc((1 - var(--p)) * ${rot}deg))`,
          transformOrigin: origin,
        }}
      >
        {children}
      </g>
    </g>
  );
}

function Chat() {
  return (
    <g>
      <path d="M0 0 H148 V52 H36 L18 68 V52 H0 Z" fill={surface} stroke={ink} />
      <text x="12" y="18" fill={secondary} fontSize="11">
        CHAT
      </text>
      <line x1="12" y1="30" x2="92" y2="30" stroke={line} />
      <line x1="12" y1="40" x2="70" y2="40" stroke={line} />
    </g>
  );
}

function Ledger() {
  return (
    <g>
      <rect width="156" height="88" fill={surface} stroke={ink} />
      <path d="M132 0 H156 V24" fill="none" stroke={line} />
      <text x="12" y="18" fill={secondary} fontSize="11">
        LEDGER
      </text>
      <line x1="12" y1="36" x2="118" y2="36" stroke={line} />
      <line x1="12" y1="50" x2="136" y2="50" stroke={line} />
      <line x1="12" y1="64" x2="96" y2="64" stroke={line} />
    </g>
  );
}

function Voice() {
  const heights = [10, 22, 14, 28, 18, 32, 12, 24, 16, 26, 11, 20];
  return (
    <g>
      <rect width="150" height="64" fill={surface} stroke={ink} />
      <text x="12" y="16" fill={secondary} fontSize="11">
        VOICE
      </text>
      {heights.map((height, index) => {
        const bar = Math.min(height, 26);
        return (
          <rect
            key={index}
            x={12 + index * 11}
            y={56 - bar}
            width="4"
            height={bar}
            fill={ink}
          />
        );
      })}
    </g>
  );
}

function Forwarded() {
  return (
    <g>
      <rect width="132" height="56" fill={surface} stroke={ink} />
      <text x="12" y="18" fill={secondary} fontSize="11">
        FWD
      </text>
      <path d="M12 32 H48" stroke={line} />
      <path d="M12 42 H78" stroke={line} />
      <path d="M100 30 L114 36 L100 42" fill="none" stroke={ink} />
    </g>
  );
}

function Flow({ d, delay }: { d: string; delay: number }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={ink}
      strokeWidth="1"
      pathLength={1}
      strokeDasharray={1}
      style={{
        strokeDashoffset: `clamp(0, calc(1 - (var(--p) - ${delay}) * 1.45), 1)`,
        opacity: 0.4,
      }}
    />
  );
}

function Record({ x, y }: { x: number; y: number }) {
  const rows = ["{", '  in: "raw",', '  out: "work",', '  state: "clear"', "}"];
  return (
    <g>
      {rows.map((row, index) => (
        <text
          key={row}
          x={x}
          y={y + index * 20}
          fill={ink}
          fontSize="13"
          style={{ opacity: `clamp(0, calc((var(--p) - ${0.42 + index * 0.06}) * 6), 1)` }}
        >
          {row}
        </text>
      ))}
    </g>
  );
}

function Checks({ x, y }: { x: number; y: number }) {
  const items = ["chat → note", "ledger → record", "voice → task"];
  return (
    <g>
      {items.map((label, index) => {
        const at = 0.72 + index * 0.08;
        const top = y + index * 28;
        return (
          <g key={label} style={{ opacity: `clamp(0, calc((var(--p) - ${at}) * 7), 1)` }}>
            <rect x={x} y={top} width="12" height="12" fill="none" stroke={ink} />
            <path
              d={`M${x + 2} ${top + 6} L${x + 5} ${top + 10} L${x + 10} ${top + 3}`}
              fill="none"
              stroke={accent}
              strokeWidth="1.5"
              pathLength={1}
              strokeDasharray={1}
              style={{
                strokeDashoffset: `clamp(0, calc((${at + 0.05} - var(--p)) * 12), 1)`,
              }}
            />
            <text x={x + 22} y={top + 11} fill={ink} fontSize="12">
              {label}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function Wide() {
  return (
    <svg viewBox="0 0 1040 500" className="h-auto w-full" role="presentation">
      <rect
        x="16"
        y="16"
        width="1008"
        height="468"
        fill="none"
        stroke={line}
        className="stroke-draw"
        pathLength={1}
      />
      <line
        x1="400"
        y1="48"
        x2="400"
        y2="460"
        stroke={line}
        className="stroke-draw"
        pathLength={1}
      />
      <line
        x1="670"
        y1="48"
        x2="670"
        y2="460"
        stroke={line}
        className="stroke-draw"
        pathLength={1}
      />
      <text x="32" y="40" fill={secondary} fontSize="11">
        INPUT
      </text>
      <text x="416" y="40" fill={secondary} fontSize="11">
        FORGE
      </text>
      <text x="686" y="40" fill={secondary} fontSize="11">
        OUTPUT
      </text>

      <Placed x={36} y={72} rot={-7} dx={10} dy={6} origin="74px 34px">
        <Chat />
      </Placed>
      <Placed x={214} y={96} rot={6} dx={-8} dy={8} origin="66px 28px">
        <Forwarded />
      </Placed>
      <Placed x={32} y={210} rot={4} dx={12} dy={-4} origin="78px 44px">
        <Ledger />
      </Placed>
      <Placed x={206} y={340} rot={-5} dx={8} dy={-8} origin="75px 32px">
        <Voice />
      </Placed>

      <Flow d="M184 106 C 300 110, 420 200, 520 210" delay={0.05} />
      <Flow d="M346 124 C 410 120, 460 170, 520 188" delay={0.12} />
      <Flow d="M188 254 C 300 260, 420 270, 520 268" delay={0.18} />
      <Flow d="M356 372 C 420 360, 470 320, 520 300" delay={0.24} />

      <line x1="520" y1="64" x2="520" y2="448" stroke={line} />
      {Array.from({ length: 8 }, (_, index) => (
        <line
          key={index}
          x1="512"
          y1={88 + index * 44}
          x2="528"
          y2={88 + index * 44}
          stroke={line}
        />
      ))}
      <g style={{ transform: "translateY(calc(var(--p) * 320px))" }}>
        <line x1="520" y1="64" x2="520" y2="128" stroke={accent} strokeWidth="1.5" />
      </g>

      <rect x="694" y="72" width="300" height="372" fill="#FFFFFF" stroke={line} />
      <Record x={714} y={108} />
      <Checks x={714} y={250} />
    </svg>
  );
}

function Stack() {
  return (
    <svg viewBox="0 0 360 700" className="h-auto w-full" role="presentation">
      <rect
        x="8"
        y="8"
        width="344"
        height="684"
        fill="none"
        stroke={line}
        className="stroke-draw"
        pathLength={1}
      />
      <text x="20" y="36" fill={secondary} fontSize="11">
        INPUT
      </text>
      <Placed x={16} y={52} rot={-7} dx={4} dy={4} origin="74px 32px">
        <Chat />
      </Placed>
      <Placed x={196} y={48} rot={6} dx={-4} dy={6} origin="66px 28px">
        <Forwarded />
      </Placed>
      <Placed x={16} y={160} rot={4} dx={6} dy={-4} origin="78px 46px">
        <Ledger />
      </Placed>
      <Placed x={190} y={176} rot={-5} dx={-4} dy={-6} origin="75px 29px">
        <Voice />
      </Placed>

      <Flow d="M90 116 C 90 220, 180 280, 180 308" delay={0.06} />
      <Flow d="M260 104 C 260 200, 200 270, 180 308" delay={0.14} />
      <Flow d="M90 250 C 100 280, 150 300, 180 308" delay={0.2} />
      <Flow d="M260 230 C 250 270, 210 300, 180 308" delay={0.26} />

      <text x="20" y="292" fill={secondary} fontSize="11">
        FORGE
      </text>
      <line x1="20" y1="312" x2="340" y2="312" stroke={line} />
      <g style={{ transform: "translateX(calc(var(--p) * 250px))" }}>
        <line x1="20" y1="312" x2="84" y2="312" stroke={accent} strokeWidth="1.5" />
      </g>

      <text x="20" y="348" fill={secondary} fontSize="11">
        OUTPUT
      </text>
      <rect x="16" y="364" width="328" height="308" fill="#FFFFFF" stroke={line} />
      <Record x={32} y={400} />
      <Checks x={32} y={540} />
    </svg>
  );
}

export function SignatureVisual({
  mode,
  className = "",
  caption,
}: {
  mode: "loop" | "scrub";
  className?: string;
  caption: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || mode !== "loop") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      node.style.setProperty("--p", "1");
      return;
    }

    let frame = 0;
    let running = false;
    const started = performance.now() + 700;
    const duration = 4600;
    const hold = 900;

    const tick = (now: number) => {
      if (!running) return;
      if (now < started) {
        node.style.setProperty("--p", "0");
      } else {
        const elapsed = (now - started) % (duration + hold);
        const t = Math.min(1, elapsed / duration);
        node.style.setProperty("--p", easeForge(t).toFixed(4));
      }
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      const visible = Boolean(entry?.isIntersecting);
      if (visible && !running) {
        running = true;
        frame = requestAnimationFrame(tick);
      }
      if (!visible && running) {
        running = false;
        cancelAnimationFrame(frame);
      }
    });

    observer.observe(node);

    const onHide = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frame);
      } else if (node.getBoundingClientRect().bottom > 0) {
        running = true;
        frame = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onHide);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [mode]);

  return (
    <figure>
      <div
        ref={ref}
        data-forge=""
        className={`forge-visual ${className}`}
        style={mode === "loop" ? ({ ["--p"]: 0 } as React.CSSProperties) : undefined}
      >
        <div className="hidden lg:block">
          <Wide />
        </div>
        <div className="lg:hidden">
          <Stack />
        </div>
      </div>
      <figcaption className="mt-4 font-mono text-[11px] tracking-[0.08em] text-secondary uppercase">
        {caption}
        <span className="sr-only">
          . Scattered inputs pass through a scanning line and resolve into a structured record.
        </span>
      </figcaption>
    </figure>
  );
}
