'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * CustomCrmAnimation — "Rigid rows to bespoke pipeline"
 *
 * Visualizes the custom-CRM pitch: generic spreadsheet-shaped CRMs force
 * your process into their shape. A custom CRM is shaped around how you
 * actually sell.
 *
 *   left   — a vanilla CRM table (header + 5 uniform rows + "stage"
 *            column that reads as a dropdown shoe-horned into the schema)
 *   middle — reshape arrow + "rebuild" badge
 *   right  — a bespoke pipeline with 4 named stages (Prospect, Qualified,
 *            Proposal, Won), deal cards piling into each stage, counts
 *            ticking per stage, deals occasionally flowing stage→stage
 *
 * Every cycle: one deal advances from one stage to the next, the counts
 * update, and the stage receiving the deal briefly glows.
 */

const CYCLE_MS = 2200;
const STAGES = ['Prospect', 'Qualified', 'Proposal', 'Won'] as const;
const INITIAL_COUNTS = [8, 5, 3, 12];

function usePrefersReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduce(m.matches);
    const l = (e: MediaQueryListEvent) => setReduce(e.matches);
    m.addEventListener('change', l);
    return () => m.removeEventListener('change', l);
  }, []);
  return reduce;
}

function useInViewport(ref: React.RefObject<Element | null>, amount = 0.3): boolean {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setInView(e.isIntersecting);
      },
      { threshold: amount },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, amount]);
  return inView;
}

export function CustomCrmAnimation() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInViewport(ref, 0.25);
  const reduce = usePrefersReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = window.setInterval(() => setTick((t) => t + 1), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  // Which deal advances this cycle: from stage N to stage N+1.
  const movingFrom = tick % (STAGES.length - 1);
  const movingTo = movingFrom + 1;
  // Keep the counts semi-stable: the "from" loses one, the "to" gains one,
  // but we also drip 1 new prospect in every 3 cycles.
  const counts = INITIAL_COUNTS.map((n, i) => {
    let v = n;
    if (i === 0 && tick % 3 === 0) v += Math.floor(tick / 3);
    const movedCount = Math.floor((tick + (STAGES.length - 1 - i)) / (STAGES.length - 1));
    if (i === STAGES.length - 1) v += movedCount; // won accumulates
    return v;
  });
  const animate = !reduce && inView;

  return (
    <svg
      ref={ref}
      viewBox="0 0 600 320"
      role="img"
      aria-label="Animated transition from a rigid CRM spreadsheet into a bespoke pipeline with deal cards moving between stages"
      className="h-auto w-full max-w-xl"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="crm-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="hero-breathe text-brand-900 dark:text-accent-400" style={{ transformOrigin: '300px 160px' }}>
        <GenericTable />
        <ReshapeArrow animate={animate} />
        <BespokePipeline counts={counts} activeStage={movingTo} animate={animate} />
        {animate && tick > 0 && (
          <DealFlight key={`df-${tick}`} fromStage={movingFrom} toStage={movingTo} />
        )}
      </g>
    </svg>
  );
}

function GenericTable() {
  const tableX = 10;
  const tableY = 30;
  const colXs = [20, 56, 100, 158];
  const rowCount = 7;
  return (
    <g opacity="0.65">
      {/* Table label */}
      <text x={tableX + 10} y={tableY - 10} fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.5">
        generic CRM
      </text>
      {/* Table frame */}
      <rect
        x={tableX}
        y={tableY}
        width="200"
        height="250"
        rx="4"
        fill="currentColor"
        fillOpacity="0.03"
        stroke="currentColor"
        strokeOpacity="0.35"
      />
      {/* Header row */}
      <rect x={tableX} y={tableY} width="200" height="22" rx="4" fill="currentColor" fillOpacity="0.08" />
      <text x={colXs[0]} y={tableY + 14} fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.65">#</text>
      <text x={colXs[1]} y={tableY + 14} fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.65">name</text>
      <text x={colXs[2]} y={tableY + 14} fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.65">value</text>
      <text x={colXs[3]} y={tableY + 14} fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.65">stage ▾</text>
      {/* Horizontal rules */}
      {Array.from({ length: rowCount }).map((_, i) => (
        <line
          key={i}
          x1={tableX}
          y1={tableY + 22 + (i + 1) * 32}
          x2={tableX + 200}
          y2={tableY + 22 + (i + 1) * 32}
          stroke="currentColor"
          strokeOpacity="0.12"
        />
      ))}
      {/* Vertical column dividers */}
      {[50, 94, 152].map((x) => (
        <line
          key={x}
          x1={tableX + x}
          y1={tableY + 22}
          x2={tableX + x}
          y2={tableY + 250}
          stroke="currentColor"
          strokeOpacity="0.12"
        />
      ))}
      {/* Dummy rows — bars for name/value, pill-text for stage */}
      {Array.from({ length: rowCount }).map((_, i) => {
        const y = tableY + 22 + i * 32 + 16;
        const stageIdx = (i * 2 + 1) % 4;
        return (
          <g key={i}>
            <text x={colXs[0]} y={y} fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.5">
              {String(i + 1).padStart(2, '0')}
            </text>
            <rect x={colXs[1]} y={y - 5} width={28 + (i * 7) % 12} height="4" rx="2" fill="currentColor" fillOpacity="0.5" />
            <rect x={colXs[1]} y={y + 2} width={18} height="2.5" rx="1.25" fill="currentColor" fillOpacity="0.3" />
            <rect x={colXs[2]} y={y - 5} width="42" height="4" rx="2" fill="currentColor" fillOpacity="0.45" />
            <text x={colXs[3]} y={y} fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.75">
              {STAGES[stageIdx]!.toLowerCase()}
            </text>
          </g>
        );
      })}
      {/* Overlay nudge: a small faded "doesn't fit" badge in the stage column */}
      <g transform={`translate(${tableX + 112}, ${tableY + 24 * 10 + 20})`} opacity="0.7">
        {/* leader line pointing at the stage column header */}
      </g>
    </g>
  );
}

function ReshapeArrow({ animate }: { animate: boolean }) {
  // Center region: a thick chevron pointing right + a "rebuilt" badge that
  // pulses, representing the custom-build transformation.
  return (
    <g transform="translate(220, 160)">
      {/* Arrow shaft */}
      <path
        d="M 0 0 L 60 0 L 60 -14 L 90 10 L 60 34 L 60 20 L 0 20 Z"
        fill="currentColor"
        fillOpacity="0.14"
        stroke="currentColor"
        strokeOpacity="0.5"
      />
      {/* Badge above */}
      <g transform="translate(14, -34)">
        <rect width="68" height="18" rx="9" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeOpacity="0.5" />
        <circle cx="10" cy="9" r="2.4" fill="currentColor" fillOpacity="0.9">
          {animate && (
            <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />
          )}
        </circle>
        <text x="18" y="12" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.95">
          rebuild
        </text>
      </g>
      {/* Caption below */}
      <text x="46" y="56" textAnchor="middle" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.6">
        shaped around your sale
      </text>
    </g>
  );
}

function BespokePipeline({
  counts,
  activeStage,
  animate,
}: {
  counts: number[];
  activeStage: number;
  animate: boolean;
}) {
  const baseX = 330;
  const stageW = 60;
  const stageH = 240;
  const gap = 4;
  return (
    <g>
      {/* Pipeline label */}
      <text x={baseX} y="20" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.6">
        your pipeline · 4 stages
      </text>
      {STAGES.map((label, i) => {
        const x = baseX + i * (stageW + gap);
        const isActive = i === activeStage;
        const n = counts[i]!;
        // Deal cards stacked inside each stage. Vary count visually to roughly
        // match the stage count without overflowing.
        const visibleCards = Math.min(n, 6);
        return (
          <g key={label} transform={`translate(${x}, 30)`}>
            {/* Column body */}
            <rect
              x="0"
              y="0"
              width={stageW}
              height={stageH}
              rx="6"
              fill="currentColor"
              fillOpacity={isActive ? 0.14 : 0.06}
              stroke="currentColor"
              strokeOpacity={isActive ? 0.75 : 0.3}
              strokeWidth={isActive ? 1.3 : 1}
              style={{ transition: 'fill-opacity 0.4s ease-out, stroke-opacity 0.4s ease-out' }}
            />
            {/* Stage header */}
            <rect x="0" y="0" width={stageW} height="22" rx="6" fill="currentColor" fillOpacity="0.08" />
            <text x="6" y="10" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.55">
              stage {i + 1}
            </text>
            <text x="6" y="18" fontSize="8" fontFamily="system-ui, sans-serif" fill="currentColor" fillOpacity="0.95">
              {label}
            </text>
            {/* Count badge */}
            <rect x={stageW - 24} y="4" width="20" height="14" rx="7" fill="currentColor" fillOpacity="0.18" />
            <text
              x={stageW - 14}
              y="14"
              textAnchor="middle"
              fontSize="7"
              fontFamily="ui-monospace, monospace"
              fill="currentColor"
              fillOpacity="0.95"
            >
              {n}
            </text>

            {/* Deal cards */}
            {Array.from({ length: visibleCards }).map((_, idx) => {
              const y = 30 + idx * 32;
              return (
                <g key={idx} transform={`translate(6, ${y})`}>
                  <rect
                    width={stageW - 12}
                    height="26"
                    rx="4"
                    fill="currentColor"
                    fillOpacity={0.18 - idx * 0.012}
                    stroke="currentColor"
                    strokeOpacity={0.3 - idx * 0.015}
                  />
                  <rect x="4" y="4" width="30" height="3" rx="1.5" fill="currentColor" fillOpacity="0.75" />
                  <rect x="4" y="10" width="20" height="2" rx="1" fill="currentColor" fillOpacity="0.5" />
                  <rect x="4" y="16" width="38" height="4" rx="2" fill="currentColor" fillOpacity="0.45" />
                </g>
              );
            })}

            {/* Overflow indicator */}
            {n > visibleCards && (
              <text
                x={stageW / 2}
                y={stageH - 8}
                textAnchor="middle"
                fontSize="6"
                fontFamily="ui-monospace, monospace"
                fill="currentColor"
                fillOpacity="0.6"
              >
                +{n - visibleCards} more
              </text>
            )}

            {/* Active-stage glow ring */}
            {isActive && animate && (
              <rect
                x="-2"
                y="-2"
                width={stageW + 4}
                height={stageH + 4}
                rx="8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0"
              >
                <animate
                  attributeName="opacity"
                  values="0;0.9;0"
                  keyTimes="0;0.4;1"
                  dur="1.1s"
                  fill="freeze"
                />
              </rect>
            )}
          </g>
        );
      })}
    </g>
  );
}

function DealFlight({ fromStage, toStage }: { fromStage: number; toStage: number }) {
  const baseX = 330;
  const stageW = 60;
  const gap = 4;
  const fx = baseX + fromStage * (stageW + gap) + stageW - 6;
  const tx = baseX + toStage * (stageW + gap) + 10;
  const y = 150;
  const d = `M ${fx} ${y} C ${fx + 15} ${y - 25}, ${tx - 15} ${y - 25}, ${tx} ${y}`;
  return (
    <g>
      {/* Flying deal card (a tiny version) */}
      <g filter="url(#crm-glow)">
        <rect
          x="-14"
          y="-9"
          width="28"
          height="18"
          rx="4"
          fill="currentColor"
          fillOpacity="0.85"
        >
          <animateMotion
            path={d}
            dur="1.1s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.42 0 0.58 1"
            keyTimes="0;1"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0.9"
            keyTimes="0;0.1;0.9;1"
            dur="1.1s"
            fill="freeze"
          />
        </rect>
      </g>
    </g>
  );
}
