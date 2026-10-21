"use client";

import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Camera,
  ClipboardCheck,
  Database,
  FileText,
  MessageCircle,
  Mic,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { AwxMark } from "@/components/brand/awx-mark";
import { useIntroDone } from "@/components/providers/IntroProvider";
import { usePrefersReducedMotion } from "@/lib/motion";

type IconName = "chat" | "cam" | "mic" | "book" | "order" | "inv" | "truck" | "db";

const rows: {
  input: { title: string; detail: string; icon: IconName };
  output: { title: string; detail: string; icon: IconName };
}[] = [
  {
    input: {
      title: "WhatsApp message",
      detail: "“Need 40 brake pads by Friday”",
      icon: "chat",
    },
    output: {
      title: "Order created",
      detail: "40 brake pads, due Friday",
      icon: "order",
    },
  },
  {
    input: {
      title: "Photo of a paper bill",
      detail: "Handwritten, ₹18,400",
      icon: "cam",
    },
    output: {
      title: "Invoice recorded",
      detail: "Amount and customer filled in",
      icon: "inv",
    },
  },
  {
    input: {
      title: "Voice note",
      detail: "“Send the truck to Kochi”",
      icon: "mic",
    },
    output: {
      title: "Delivery assigned",
      detail: "Driver and route set",
      icon: "truck",
    },
  },
  {
    input: {
      title: "Paper ledger",
      detail: "Page 12, stock counts",
      icon: "book",
    },
    output: {
      title: "Stock updated",
      detail: "Every item counted and saved",
      icon: "db",
    },
  },
];

const legend = [
  {
    n: "1",
    title: "You send it the way you always do",
    body: "No new app. No training. Keep using WhatsApp, photos and voice notes.",
  },
  {
    n: "2",
    title: "AWXFORGE does the typing",
    body: "It reads each message and works out what needs to happen.",
  },
  {
    n: "3",
    title: "The work is already done",
    body: "Orders, invoices, deliveries and stock are updated for you.",
  },
];

function RowIcon({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
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
      {name === "book" ? (
        <>
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </>
      ) : null}
      {name === "order" ? (
        <>
          <rect width="8" height="4" x="8" y="2" rx="1" />
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <path d="m9 14 2 2 4-4" />
        </>
      ) : null}
      {name === "inv" ? (
        <>
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8" />
        </>
      ) : null}
      {name === "truck" ? (
        <>
          <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2M15 18H9" />
          <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
          <circle cx="17" cy="18" r="2" />
          <circle cx="7" cy="18" r="2" />
        </>
      ) : null}
      {name === "db" ? (
        <>
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14a9 3 0 0 0 18 0V5M3 12a9 3 0 0 0 18 0" />
        </>
      ) : null}
    </svg>
  );
}

const lanes: {
  label: string;
  icon: LucideIcon;
  title: string;
  sample: string;
  outputIcon: LucideIcon;
  outputTitle: string;
  outputDetail: string;
}[] = [
  {
    label: "Chat",
    icon: MessageCircle,
    title: "WhatsApp message",
    sample: "“Need 40 brake pads by Friday”",
    outputIcon: ClipboardCheck,
    outputTitle: "Order created",
    outputDetail: "40 brake pads, due Friday",
  },
  {
    label: "Photo",
    icon: Camera,
    title: "Photo of a paper bill",
    sample: "Handwritten, ₹18,400",
    outputIcon: FileText,
    outputTitle: "Invoice recorded",
    outputDetail: "Amount and customer filled in",
  },
  {
    label: "Voice",
    icon: Mic,
    title: "Voice note",
    sample: "“Send the truck to Kochi”",
    outputIcon: Truck,
    outputTitle: "Delivery assigned",
    outputDetail: "Driver and route set",
  },
  {
    label: "Ledger",
    icon: BookOpen,
    title: "Paper ledger",
    sample: "Page 12, stock counts",
    outputIcon: Database,
    outputTitle: "Stock updated",
    outputDetail: "Every item counted and saved",
  },
];

function MobileLane() {
  const reduced = usePrefersReducedMotion();
  const introDone = useIntroDone();
  const [index, setIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [ready, setReady] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const playRef = useRef<(next: number) => void>(() => {});
  const autoRef = useRef(!reduced);
  const indexRef = useRef(0);
  const lane = lanes[index];
  const InputIcon = lane.icon;
  const OutputIcon = lane.outputIcon;

  useEffect(() => {
    if (!introDone) return;
    const root = rootRef.current;
    if (!root) return;

    const narrow = window.matchMedia("(max-width: 820px)");
    let alive = true;
    let generation = 0;
    let running = false;
    let onScreen = false;
    const timers: number[] = [];

    const clear = () => {
      while (timers.length) window.clearTimeout(timers.pop());
    };

    const play = (next: number) => {
      const gen = ++generation;
      running = true;
      clear();
      indexRef.current = next;
      setIndex(next);
      setCycle((value) => value + 1);
      if (reduced) {
        setReady(true);
        return;
      }
      setReady(false);
      timers.push(
        window.setTimeout(() => {
          if (!alive || gen !== generation) return;
          setReady(true);
        }, 1500),
      );
      timers.push(
        window.setTimeout(() => {
          if (!alive || gen !== generation || !autoRef.current) return;
          if (!onScreen || document.hidden || !narrow.matches) return;
          play((next + 1) % lanes.length);
        }, 4800),
      );
    };

    playRef.current = play;

    const sync = () => {
      if (!alive) return;
      const visible = narrow.matches && onScreen && !document.hidden;
      if (visible) {
        if (!running) play(indexRef.current);
        return;
      }
      running = false;
      generation += 1;
      clear();
    };

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = Boolean(entry?.isIntersecting);
      sync();
    });
    observer.observe(root);
    narrow.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);

    return () => {
      alive = false;
      generation += 1;
      clear();
      observer.disconnect();
      narrow.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [introDone, reduced]);

  const choose = (next: number) => {
    autoRef.current = false;
    playRef.current(next);
  };

  return (
    <div ref={rootRef} className="diagram-lane">
      <div
        className="lane-tabs"
        role="tablist"
        aria-label="What you send"
        onKeyDown={(event) => {
          if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
          event.preventDefault();
          const direction = event.key === "ArrowRight" ? 1 : -1;
          const next = (index + direction + lanes.length) % lanes.length;
          choose(next);
          document.getElementById(`lane-tab-${next}`)?.focus();
        }}
      >
        {lanes.map((item, itemIndex) => {
          const Icon = item.icon;
          const selected = itemIndex === index;
          return (
            <button
              key={item.label}
              id={`lane-tab-${itemIndex}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="diagram-lane-panel"
              tabIndex={selected ? 0 : -1}
              className="lane-tab"
              onClick={() => choose(itemIndex)}
            >
              <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
              <span>{item.label}</span>
              <span
                key={selected ? cycle : "idle"}
                className={`lane-bar${selected ? (reduced ? " is-done" : cycle > 0 ? " is-run" : "") : ""}`}
              />
            </button>
          );
        })}
      </div>

      <div
        id="diagram-lane-panel"
        role="tabpanel"
        aria-labelledby={`lane-tab-${index}`}
        className="lane-panel"
      >
        <div key={cycle} className="lane-story">
          <article className={reduced ? "lane-card" : "lane-card lane-in"}>
            <span className="lane-tile">
              <InputIcon size={20} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <div className="lane-text">
              <p className="lane-kicker">You send</p>
              <p className="lane-title">{lane.title}</p>
              <p className="lane-sample">{lane.sample}</p>
            </div>
          </article>

          <div className="lane-wire" aria-hidden="true">
            <span className="lane-dot" />
            <div className="lane-chip">
              <div className={reduced ? "lane-chip-face" : "lane-chip-face is-pulse"}>
                <span className="lane-a">A</span>
                <span>
                  <strong>AWXFORGE</strong>
                  <small>Reads, understands, finishes</small>
                </span>
              </div>
            </div>
          </div>

          <article className={`lane-card lane-out${reduced || ready ? " is-ready" : ""}`}>
            <span className="lane-tile">
              <OutputIcon size={20} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <div className="lane-text lane-copy">
              <p className="lane-title">{lane.outputTitle}</p>
              <p className="lane-sample">{lane.outputDetail}</p>
            </div>
            <span className="lane-check">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m5 12 5 5L20 7" />
              </svg>
            </span>
          </article>
        </div>
      </div>
    </div>
  );
}

function Tick() {
  return (
    <div className="diagram-tick">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m5 12 5 5L20 7" />
      </svg>
    </div>
  );
}

export function SignatureVisual({ caption }: { caption: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const introDone = useIntroDone();
  const [active, setActive] = useState(-1);
  const [pulse, setPulse] = useState(false);
  const [done, setDone] = useState<[boolean, boolean, boolean, boolean]>([
    false,
    false,
    false,
    false,
  ]);
  const [travel, setTravel] = useState({ row: -1, right: false, gen: 0 });

  useEffect(() => {
    if (reduced || !introDone) return;
    const node = ref.current;
    if (!node) return;

    let timers: number[] = [];
    let index = 0;
    let running = false;
    let onScreen = false;
    let alive = true;

    const clearTimers = () => {
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

    const step = () => {
      const current = index;
      setActive(current);
      setPulse(false);
      setTravel((prev) => ({ row: current, right: false, gen: prev.gen + 1 }));

      later(() => setPulse(true), 700);
      later(() => {
        setPulse(false);
        setTravel((prev) => ({ ...prev, right: true }));
      }, 1000);
      later(() => {
        setDone((prev) => {
          if (prev[current]) return prev;
          const next = [...prev] as [boolean, boolean, boolean, boolean];
          next[current] = true;
          return next;
        });
      }, 1800);

      if (current >= rows.length - 1) {
        later(() => {
          setDone([false, false, false, false]);
          index = 0;
        }, 3600);
        later(step, 4400);
        return;
      }

      later(() => {
        index = current + 1;
        step();
      }, 2200);
    };

    const start = () => {
      if (running) return;
      running = true;
      step();
    };

    const stop = () => {
      running = false;
      clearTimers();
      setPulse(false);
    };

    const sync = () => {
      if (onScreen && !document.hidden) start();
      else stop();
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
      clearTimers();
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [introDone, reduced]);

  return (
    <figure>
      <div ref={ref} className="diagram">
        <div aria-hidden="true">
          <div className="diagram-heads">
            <span>
              <b>What you already have</b>
            </span>
            <span />
            <span>
              <b>AWXFORGE</b>
            </span>
            <span />
            <span>
              <b>What you get</b>
            </span>
          </div>
          <div className="diagram-grid">
            {rows.map((row, index) => {
              const finished = reduced || done[index];
              const on = !reduced && active === index;
              const left = !reduced && travel.row === index;
              const right = left && travel.right;
              return (
                <div key={row.input.title} className="contents">
                  <div
                    className={`diagram-card diagram-in${on ? " is-on" : ""}`}
                    style={{ gridColumn: 1, gridRow: index + 1 }}
                  >
                    <div className="diagram-ic">
                      <RowIcon name={row.input.icon} />
                    </div>
                    <div>
                      <p className="diagram-title">{row.input.title}</p>
                      <p>{row.input.detail}</p>
                    </div>
                  </div>
                  <div
                    className={`diagram-wire${left ? " is-go" : ""}`}
                    style={{ gridColumn: 2, gridRow: index + 1 }}
                  >
                    <span key={left ? travel.gen : "off"} />
                  </div>
                  <div
                    className={`diagram-wire${right ? " is-go" : ""}`}
                    style={{ gridColumn: 4, gridRow: index + 1 }}
                  >
                    <span key={right ? travel.gen : "off"} />
                  </div>
                  <div
                    className={`diagram-card diagram-out${finished ? " is-done" : ""}`}
                    style={{ gridColumn: 5, gridRow: index + 1 }}
                  >
                    <div className="diagram-ic">
                      <RowIcon name={row.output.icon} />
                    </div>
                    <div>
                      <p className="diagram-title">{row.output.title}</p>
                      <p>{row.output.detail}</p>
                    </div>
                    <Tick />
                  </div>
                </div>
              );
            })}
            <div className={`diagram-forge${pulse ? " is-pulse" : ""}`}>
              <div className="diagram-scan" />
              <div className="diagram-mark">
                <AwxMark variant="full" tight animate="none" />
              </div>
              <strong>AWXFORGE</strong>
              <small>Reads, understands and finishes the task</small>
            </div>
          </div>
        </div>
        <MobileLane />
        <ol className="diagram-legend">
          {legend.map((item) => (
            <li key={item.n}>
              <span>{item.n}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
      <p className="diagram-note">Sample content for illustration only.</p>
      <figcaption className="mt-4 font-mono text-[11px] tracking-[0.08em] text-secondary uppercase">
        {caption}
        <span className="sr-only">
          . A WhatsApp message asking for 40 brake pads by Friday becomes an order. A photo of a
          handwritten bill for ₹18,400 becomes a recorded invoice. A voice note asking to send the
          truck to Kochi becomes an assigned delivery. A paper ledger of stock counts becomes
          updated stock. AWXFORGE reads each one and finishes the task.
        </span>
      </figcaption>
    </figure>
  );
}
