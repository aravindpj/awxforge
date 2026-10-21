"use client";

import { useEffect, useRef, useState } from "react";
import { useIntroDone } from "@/components/providers/IntroProvider";
import { usePrefersReducedMotion } from "@/lib/motion";

type IconName = "cart" | "ship" | "ruler" | "plus" | "chk" | "flag" | "arr";
type StepState = "idle" | "run" | "done" | "flag";

type Step = {
  code: string;
  text: string;
  flag?: boolean;
};

type Agent = {
  ref: string;
  name: string;
  subtitle: string;
  icon: IconName;
  title: string;
  problem: string;
  steps: Step[];
  results?: readonly [string, string];
  cta?: boolean;
};

const agents: Agent[] = [
  {
    ref: "U1",
    name: "FMCG",
    subtitle: "Consumer goods",
    icon: "cart",
    title: "Distribution agent",
    problem:
      "Retailer orders arrive by phone, WhatsApp and sheets, and stock is always a step behind.",
    steps: [
      { code: "READ", text: "Reads every retailer order, whatever format it arrives in" },
      { code: "MATCH", text: "Matches items to the right SKU and pack size" },
      { code: "CHECK", text: "Checks stock, batches and expiry dates" },
      { code: "DRAFT", text: "Drafts the dispatch plan by route" },
      {
        code: "FLAG",
        text: "Flags an item that will run short before the next delivery",
        flag: true,
      },
    ],
    results: ["Dispatch plan ready", "1 shortage flagged"],
  },
  {
    ref: "U2",
    name: "Auto parts",
    subtitle: "Export and import",
    icon: "ship",
    title: "Trade desk agent",
    problem:
      "Thousands of part numbers, supplier quotes and shipping papers, all in different formats.",
    steps: [
      { code: "READ", text: "Reads supplier quotes, part lists and packing notes" },
      { code: "MATCH", text: "Matches part numbers across brands and cross-references" },
      { code: "CHECK", text: "Checks tariff codes and the papers each country needs" },
      { code: "DRAFT", text: "Drafts the invoice and packing list" },
      { code: "FLAG", text: "Flags a missing document before the shipment leaves", flag: true },
    ],
    results: ["Shipment pack ready", "1 document flagged"],
  },
  {
    ref: "U3",
    name: "Interiors",
    subtitle: "Construction interiors",
    icon: "ruler",
    title: "Site agent",
    problem:
      "Site changes, material orders and client approvals are scattered across chats and photos.",
    steps: [
      { code: "READ", text: "Reads site photos, measurements and chat updates" },
      { code: "MATCH", text: "Updates the quantities list to match what changed" },
      { code: "CHECK", text: "Checks material orders against the work schedule" },
      { code: "DRAFT", text: "Drafts the change request for client approval" },
      { code: "FLAG", text: "Flags a delivery that will hold up the next trade", flag: true },
    ],
    results: ["Change request drafted", "1 delay flagged"],
  },
  {
    ref: "U4",
    name: "Your industry",
    subtitle: "Coming next",
    icon: "plus",
    title: "The next agent",
    problem:
      "Every business has a workflow that fights back. We add new industries by building each agent alongside the people who run it.",
    steps: [
      { code: "LISTEN", text: "Sit with your team and watch the real workflow" },
      { code: "MAP", text: "Find the step that costs the most time" },
      { code: "TEACH", text: "Give the agent your industry’s own rules" },
      { code: "REFINE", text: "Improve it with your feedback, week by week" },
    ],
    cta: true,
  },
];

function Icon({ name, className = "agents-icon" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {name === "cart" ? (
        <>
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </>
      ) : null}
      {name === "ship" ? (
        <>
          <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
          <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76" />
          <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6M12 10v4M12 2v3" />
        </>
      ) : null}
      {name === "ruler" ? (
        <>
          <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" />
          <path d="m14.5 12.5 2-2M11.5 9.5l2-2M8.5 6.5l2-2M17.5 15.5l2-2" />
        </>
      ) : null}
      {name === "plus" ? <path d="M5 12h14M12 5v14" /> : null}
      {name === "chk" ? <path d="m5 12 5 5L20 7" /> : null}
      {name === "flag" ? (
        <>
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <path d="M4 22v-7" />
        </>
      ) : null}
      {name === "arr" ? <path d="M5 12h14M13 6l6 6-6 6" /> : null}
    </svg>
  );
}

export function IntroFigure() {
  const reduced = usePrefersReducedMotion();
  const introDone = useIntroDone();
  const [index, setIndex] = useState(0);
  const [run, setRun] = useState(0);
  const [stepStates, setStepStates] = useState<StepState[]>(() =>
    agents[0].steps.map(() => "idle"),
  );
  const [showResult, setShowResult] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(!reduced);

  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const playRef = useRef<(next: number) => void>(() => {});
  const autoRef = useRef(!reduced);
  const holdRef = useRef(false);
  const indexRef = useRef(0);
  const onScreenRef = useRef(false);

  const agent = agents[index];
  const industry = agent.name === "Your industry" ? "Your industry (next)" : agent.name;

  useEffect(() => {
    if (!introDone) return;
    const root = rootRef.current;
    if (!root) return;

    let alive = true;
    let generation = 0;
    let running = false;
    let settled = false;
    const timers: number[] = [];

    const clear = () => {
      while (timers.length) window.clearTimeout(timers.pop());
    };

    const later = (fn: () => void, ms: number, gen: number) => {
      const id = window.setTimeout(() => {
        if (!alive || gen !== generation) return;
        fn();
      }, ms);
      timers.push(id);
    };

    const play = (next: number) => {
      const gen = ++generation;
      running = true;
      settled = false;
      clear();
      indexRef.current = next;
      setIndex(next);
      setRun((value) => value + 1);

      const current = agents[next];
      const count = current.steps.length;

      if (reduced) {
        setStepStates(current.steps.map((step) => (step.flag ? "flag" : "done")));
        setShowResult(true);
        setProgress(100);
        settled = true;
        return;
      }

      setStepStates(current.steps.map(() => "idle"));
      setShowResult(false);
      setProgress(0);

      current.steps.forEach((step, stepIndex) => {
        later(
          () => {
            setStepStates((prev) => {
              if (prev.length !== count) return prev;
              const copy = [...prev];
              copy[stepIndex] = "run";
              return copy;
            });
          },
          520 + stepIndex * 1100,
          gen,
        );
        later(
          () => {
            setStepStates((prev) => {
              if (prev.length !== count) return prev;
              const copy = [...prev];
              copy[stepIndex] = step.flag ? "flag" : "done";
              return copy;
            });
            setProgress(((stepIndex + 1) / count) * 100);
          },
          520 + stepIndex * 1100 + 780,
          gen,
        );
      });

      const end = 520 + count * 1100 + 280;
      later(
        () => {
          setShowResult(true);
          settled = true;
        },
        end,
        gen,
      );

      const queue = (delay: number) => {
        const id = window.setTimeout(() => {
          if (!alive || gen !== generation || !autoRef.current) return;
          if (document.hidden || !onScreenRef.current || holdRef.current) {
            queue(480);
            return;
          }
          play((next + 1) % agents.length);
        }, delay);
        timers.push(id);
      };

      queue(end + 4200);
    };

    playRef.current = play;

    if (reduced) {
      play(indexRef.current);
      return () => {
        alive = false;
        clear();
      };
    }

    const sync = () => {
      if (!alive) return;
      const visible = onScreenRef.current && !document.hidden;
      if (visible) {
        if (!running && !settled) play(indexRef.current);
        return;
      }
      if (settled) return;
      running = false;
      generation += 1;
      clear();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreenRef.current = Boolean(entry?.isIntersecting);
        sync();
      },
      { threshold: 0.32 },
    );

    observer.observe(root);
    document.addEventListener("visibilitychange", sync);

    return () => {
      alive = false;
      generation += 1;
      clear();
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [introDone, reduced]);

  const choose = (next: number) => {
    autoRef.current = false;
    setPlaying(false);
    playRef.current(next);
  };

  const toggleTour = () => {
    if (autoRef.current) {
      autoRef.current = false;
      setPlaying(false);
      return;
    }
    autoRef.current = true;
    setPlaying(true);
    playRef.current(indexRef.current);
  };

  const onRailKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      event.key !== "ArrowDown" &&
      event.key !== "ArrowUp" &&
      event.key !== "ArrowRight" &&
      event.key !== "ArrowLeft"
    ) {
      return;
    }
    event.preventDefault();
    const direction = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
    const next = (indexRef.current + direction + agents.length) % agents.length;
    choose(next);
    buttonRefs.current[next]?.focus();
  };

  return (
    <figure
      ref={rootRef}
      className="agents"
      onPointerEnter={() => {
        holdRef.current = true;
      }}
      onPointerLeave={() => {
        holdRef.current = false;
      }}
      onFocus={() => {
        holdRef.current = true;
      }}
      onBlur={(event) => {
        const next = event.relatedTarget;
        if (next instanceof Node && event.currentTarget.contains(next)) return;
        holdRef.current = false;
      }}
    >
      <div className="agents-sheet">
        <div className="agents-rail">
          <p className="agents-kicker">Specialist agents</p>
          <div
            className="agents-list"
            role="group"
            aria-label="Specialist agents"
            onKeyDown={onRailKeyDown}
          >
            {agents.map((item, itemIndex) => (
              <button
                key={item.ref}
                ref={(node) => {
                  buttonRefs.current[itemIndex] = node;
                }}
                type="button"
                className={`agents-mod${item.cta ? " is-next" : ""}`}
                aria-pressed={itemIndex === index}
                aria-controls="agent-console"
                onClick={() => choose(itemIndex)}
              >
                <span className="agents-ic">
                  <Icon name={item.icon} />
                </span>
                <span>
                  <b>{item.name}</b>
                  <small>{item.subtitle}</small>
                </span>
                <span className="agents-ref">{item.ref}</span>
              </button>
            ))}
          </div>
          <div className="agents-stack" aria-hidden="true">
            <div className="agents-slab is-top">
              <span className="agents-kicker">Industry knowledge</span>
              <span key={run} className="agents-slab-name">
                {industry}
              </span>
            </div>
            <div className="agents-conn">
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="agents-slab is-base">
              <span className="agents-kicker">AWXFORGE core</span>
              read · understand · act
            </div>
          </div>
        </div>

        <div className="agents-console" id="agent-console">
          <div key={`bar-${run}`} className="agents-prog" style={{ width: `${progress}%` }} />
          <div className="agents-top">
            <span className={`agents-live${playing ? "" : " is-paused"}`}>
              <i />
              Agent online
            </span>
            <span className="agents-top-side">
              {reduced ? null : (
                <button
                  type="button"
                  className="agents-pause"
                  aria-label={playing ? "Pause the tour" : "Play the tour"}
                  onClick={toggleTour}
                >
                  {playing ? "Pause" : "Play"}
                </button>
              )}
              <span className="agents-kicker">Illustrative workflow</span>
            </span>
          </div>

          <div key={run} className={`agents-panel${run > 0 && !reduced ? " is-enter" : ""}`}>
            <h3>{agent.title}</h3>
            <p className="agents-prob">{agent.problem}</p>
            <ol className="agents-steps">
              {agent.steps.map((step, stepIndex) => {
                const state = stepStates[stepIndex] ?? "idle";
                return (
                  <li key={step.code} data-state={state}>
                    <span className="agents-code">{step.code}</span>
                    <span>{step.text}</span>
                    <span className="agents-st" aria-hidden="true">
                      <i className="agents-sp" />
                      <Icon name="chk" className="agents-mark agents-ck" />
                      <Icon name="flag" className="agents-mark agents-fl" />
                    </span>
                  </li>
                );
              })}
            </ol>
            <div
              className={`agents-res${showResult ? " is-show" : ""}`}
              aria-live={playing ? "off" : "polite"}
            >
              {showResult ? (
                agent.cta ? (
                  <a className="agents-cta" href="#contact">
                    Tell us about your workflow
                    <Icon name="arr" />
                  </a>
                ) : (
                  agent.results?.map((label, resultIndex) => (
                    <span key={label} className={`agents-chip${resultIndex ? " is-flag" : ""}`}>
                      <Icon name={resultIndex ? "flag" : "chk"} />
                      {label}
                    </span>
                  ))
                )
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <figcaption className="agents-foot">
        <span>Fig. 02 — One core, many specialists</span>
        <span>New industries added as we learn them</span>
      </figcaption>
    </figure>
  );
}
