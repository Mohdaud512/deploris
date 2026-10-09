'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * DevelopmentAnimation — "Spec to ship"
 *
 * Visualizes the development service line as a continuous build pipeline:
 *   left   — a spec column of requirement items streaming in
 *   middle — a "forge" where specs transform into code lines
 *   right  — a shipped app window with feature flags lighting up and a
 *            version tag that ticks every full build cycle
 *
 * Each cycle takes one spec, routes it through the forge (code-line
 * cascade), and lights up a feature in the shipped card. Every CYCLE
 * ticks a full "release" fires: card flashes, version increments, a
 * subtle "shipped" indicator pulses in the corner.
 *
 * Pure SVG + SMIL + CSS keyframes. One React setState per cycle.
 */

const CYCLE_MS = 1400;
const PACKET_DURATION = 1.0;
const FEATURES = 5;
const SPEC_ITEMS = 6;

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

// Spec item y-positions in the left column. The "active" spec is the one
// being consumed this cycle; it gets a glow and travels along a path into
// the forge.
const SPEC_YS = [48, 78, 108, 138, 168, 198];

// Feature labels in the shipped card. Deterministic set so the piece
// reads as a real app with real surface area.
const FEATURE_LABELS = ['auth', 'webhook', 'cache', 'audit', 'export'];

export function DevelopmentAnimation() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInViewport(ref, 0.25);
  const reduce = usePrefersReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = window.setInterval(() => setTick((t) => t + 1), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  const specIndex = tick % SPEC_ITEMS;
  const featureIndex = tick % FEATURES;
  const buildNumber = 142 + tick;
  const releaseFlash = tick > 0 && featureIndex === FEATURES - 1;
  const animate = !reduce && inView;

  return (
    <svg
      ref={ref}
      viewBox="0 0 600 300"
      role="img"
      aria-label="Animated build pipeline: specifications stream in, transform into code in a forge, and land as live features in a shipped app"
      className="h-auto w-full max-w-xl"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="dev-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="dev-forge-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.18" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      <g className="hero-breathe text-brand-900 dark:text-accent-400" style={{ transformOrigin: '300px 150px' }}>
        <SpecColumn activeIndex={specIndex} animate={animate} />
        <Forge animate={animate} tick={tick} />
        <ShippedCard
          featureIndex={featureIndex}
          buildNumber={buildNumber}
          releaseFlash={releaseFlash}
          animate={animate}
          static={reduce}
        />

        {/* Spec packet: travels from active spec row into the forge. */}
        {animate && tick > 0 && (
          <SpecPacket key={`sp-${tick}`} fromY={SPEC_YS[specIndex]!} />
        )}

        {/* Code packet: emerges from the forge and lands on the active
            feature row in the shipped card. */}
        {animate && tick > 0 && (
          <CodePacket key={`cp-${tick}`} toIndex={featureIndex} />
        )}

        {/* Release flash — commit sha badge pulses when a full feature
            cycle completes. */}
        {animate && releaseFlash && <ReleaseFlash key={`rf-${tick}`} />}
      </g>
    </svg>
  );
}

function SpecColumn({ activeIndex, animate }: { activeIndex: number; animate: boolean }) {
  return (
    <g>
      {/* Column backdrop */}
      <rect
        x="20"
        y="30"
        width="140"
        height="240"
        rx="10"
        fill="currentColor"
        fillOpacity="0.04"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="1"
      />
      {/* Column header */}
      <text
        x="30"
        y="22"
        fontSize="8"
        fontFamily="ui-monospace, monospace"
        fill="currentColor"
        fillOpacity="0.6"
      >
        SPEC
      </text>
      <circle cx="152" cy="19" r="2" fill="currentColor" fillOpacity="0.7">
        {animate && (
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
        )}
      </circle>

      {/* Six spec rows. The active row brightens and gets a leading dot. */}
      {SPEC_YS.map((y, i) => {
        const isActive = i === activeIndex;
        // Deterministic varied widths read as real requirements, not
        // mock-up placeholders.
        const w = 76 + ((i * 13 + 5) % 28);
        return (
          <g key={i} transform={`translate(32, ${y})`}>
            {/* Checkbox-ish dot */}
            <circle
              cx="4"
              cy="0"
              r="2.4"
              fill={isActive ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="1"
              fillOpacity={isActive ? 1 : 0}
              strokeOpacity={isActive ? 0.9 : 0.5}
              filter={isActive && animate ? 'url(#dev-glow)' : undefined}
            />
            {/* Spec text row */}
            <rect
              x="12"
              y="-3"
              width={w}
              height="3"
              rx="1.5"
              fill="currentColor"
              fillOpacity={isActive ? 0.8 : 0.35}
            />
            <rect
              x="12"
              y="3"
              width={w * 0.55}
              height="2"
              rx="1"
              fill="currentColor"
              fillOpacity={isActive ? 0.5 : 0.22}
            />
          </g>
        );
      })}

      {/* Footer: "6 items" counter */}
      <text
        x="30"
        y="258"
        fontSize="6"
        fontFamily="ui-monospace, monospace"
        fill="currentColor"
        fillOpacity="0.5"
      >
        {SPEC_ITEMS} items · open
      </text>
    </g>
  );
}

function Forge({ animate, tick }: { animate: boolean; tick: number }) {
  // The middle "forge" — a vertical stack of code lines that cascade
  // downward. We render a fixed set of lines whose horizontal lengths
  // are determined by (tick + i) so the shape shifts each cycle, which
  // reads as "compiling fresh output".
  const lines = Array.from({ length: 11 }).map((_, i) => {
    const indentSteps = (tick + i * 3) % 4; // 0..3 indent levels
    const indent = indentSteps * 6;
    const width = 50 + ((i * 7 + tick * 3) % 55);
    return { indent, width, y: 58 + i * 16 };
  });

  return (
    <g transform="translate(200, 0)">
      {/* Forge enclosure */}
      <rect
        x="0"
        y="30"
        width="200"
        height="240"
        rx="12"
        fill="url(#dev-forge-grad)"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="1"
      />
      {/* Header strip with a status LED */}
      <rect x="10" y="40" width="180" height="18" rx="4" fill="currentColor" fillOpacity="0.06" />
      <circle cx="22" cy="49" r="2.4" fill="currentColor" fillOpacity="0.9">
        {animate && (
          <animate attributeName="opacity" values="0.45;1;0.45" dur="1.2s" repeatCount="indefinite" />
        )}
      </circle>
      <text
        x="32"
        y="52"
        fontSize="7"
        fontFamily="ui-monospace, monospace"
        fill="currentColor"
        fillOpacity="0.85"
      >
        build
      </text>
      <text
        x="60"
        y="52"
        fontSize="7"
        fontFamily="ui-monospace, monospace"
        fill="currentColor"
        fillOpacity="0.55"
      >
        {`#${(142 + tick).toString().padStart(3, '0')}`}
      </text>
      <text
        x="100"
        y="52"
        fontSize="7"
        fontFamily="ui-monospace, monospace"
        fill="currentColor"
        fillOpacity="0.55"
      >
        · passing
      </text>
      <circle cx="178" cy="49" r="2" fill="currentColor" fillOpacity="0.6" />

      {/* Code lines. Each is a horizontal rect with varied width and
          indent so the composition reads as syntactically plausible
          code. Lines re-render each tick for a subtle "scrolling" feel. */}
      <g key={`code-${tick}`}>
        {lines.map((l, i) => (
          <g key={i}>
            {/* line number tick */}
            <text
              x="14"
              y={l.y + 3}
              fontSize="5"
              fontFamily="ui-monospace, monospace"
              fill="currentColor"
              fillOpacity="0.35"
            >
              {String(i + 1).padStart(2, '0')}
            </text>
            {/* indentation guide */}
            {l.indent > 0 && (
              <line
                x1={28}
                y1={l.y - 3}
                x2={28}
                y2={l.y + 3}
                stroke="currentColor"
                strokeOpacity="0.15"
              />
            )}
            {/* the "code" bar */}
            <rect
              x={30 + l.indent}
              y={l.y - 2}
              width={l.width}
              height="3"
              rx="1.5"
              fill="currentColor"
              fillOpacity={i === lines.length - 1 ? 0.9 : 0.55}
              style={{
                transition: 'width 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            />
            {/* occasional secondary token */}
            {i % 2 === 1 && (
              <rect
                x={30 + l.indent + l.width + 5}
                y={l.y - 2}
                width="18"
                height="3"
                rx="1.5"
                fill="currentColor"
                fillOpacity="0.3"
              />
            )}
          </g>
        ))}
      </g>

      {/* Footer: micro test-status strip */}
      <rect x="10" y="246" width="180" height="16" rx="3" fill="currentColor" fillOpacity="0.05" />
      <circle cx="22" cy="254" r="2" fill="#22c55e" fillOpacity="0.9" />
      <text
        x="32"
        y="257"
        fontSize="6"
        fontFamily="ui-monospace, monospace"
        fill="currentColor"
        fillOpacity="0.65"
      >
        tests 48/48
      </text>
      <text
        x="92"
        y="257"
        fontSize="6"
        fontFamily="ui-monospace, monospace"
        fill="currentColor"
        fillOpacity="0.5"
      >
        · lint ok · typecheck ok
      </text>
    </g>
  );
}

function ShippedCard({
  featureIndex,
  buildNumber,
  releaseFlash,
  animate,
  static: isStatic,
}: {
  featureIndex: number;
  buildNumber: number;
  releaseFlash: boolean;
  animate: boolean;
  static: boolean;
}) {
  const featureBaseY = 92;
  const rowHeight = 26;

  return (
    <g transform="translate(430, 0)">
      {/* Card */}
      <rect
        x="0"
        y="30"
        width="150"
        height="240"
        rx="12"
        fill="currentColor"
        fillOpacity="0.07"
        stroke="currentColor"
        strokeOpacity={releaseFlash ? 0.85 : 0.3}
        strokeWidth="1"
        style={{ transition: 'stroke-opacity 0.5s ease-out' }}
      />
      {/* Title bar */}
      <rect x="12" y="44" width="60" height="5" rx="2.5" fill="currentColor" fillOpacity="0.75" />
      <rect x="12" y="54" width="40" height="3" rx="1.5" fill="currentColor" fillOpacity="0.4" />
      {/* Version pill */}
      <rect
        x="90"
        y="42"
        width="48"
        height="14"
        rx="7"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeOpacity="0.3"
      />
      <text
        x="97"
        y="52"
        fontSize="7"
        fontFamily="ui-monospace, monospace"
        fill="currentColor"
        fillOpacity="0.95"
      >
        {`v1.${buildNumber}`}
      </text>

      {/* Divider */}
      <line x1="12" y1="68" x2="138" y2="68" stroke="currentColor" strokeOpacity="0.2" />

      {/* Feature rows — one row per feature, each lights up when the
          build cycle reaches it. All rows persist (never collapse to
          empty) so the card always reads as a shipped app. */}
      {FEATURE_LABELS.map((label, i) => {
        const lit = i <= featureIndex;
        const y = featureBaseY + i * rowHeight;
        return (
          <g key={label} transform={`translate(12, ${y})`}>
            <rect
              x="0"
              y="0"
              width="126"
              height="20"
              rx="4"
              fill="currentColor"
              fillOpacity={lit ? 0.08 : 0.03}
              style={{ transition: 'fill-opacity 0.4s ease-out' }}
            />
            {/* Checkmark icon (filled when lit) */}
            <circle
              cx="10"
              cy="10"
              r="4"
              fill={lit ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeOpacity={lit ? 0.95 : 0.4}
              fillOpacity={lit ? 0.85 : 0}
              style={{ transition: 'fill-opacity 0.4s ease-out' }}
            />
            {lit && (
              <path
                d="M 8 10 L 10 12 L 13 8.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0"
              >
                <animate
                  attributeName="opacity"
                  values="0;1"
                  dur="0.35s"
                  fill="freeze"
                />
              </path>
            )}
            {/* Feature label */}
            <text
              x="20"
              y="13"
              fontSize="7"
              fontFamily="ui-monospace, monospace"
              fill="currentColor"
              fillOpacity={lit ? 0.95 : 0.5}
              style={{ transition: 'fill-opacity 0.4s ease-out' }}
            >
              {label}
            </text>
            {/* Status pill */}
            <rect
              x="92"
              y="5"
              width="28"
              height="10"
              rx="5"
              fill="currentColor"
              fillOpacity={lit ? 0.15 : 0.06}
              style={{ transition: 'fill-opacity 0.4s ease-out' }}
            />
            <text
              x="97"
              y="12.5"
              fontSize="5"
              fontFamily="ui-monospace, monospace"
              fill="currentColor"
              fillOpacity={lit ? 0.95 : 0.4}
              style={{ transition: 'fill-opacity 0.4s ease-out' }}
            >
              {lit ? 'LIVE' : 'queued'}
            </text>
          </g>
        );
      })}

      {/* Footer: deploy badge */}
      <rect x="12" y="244" width="126" height="14" rx="7" fill="currentColor" fillOpacity="0.07" />
      <circle cx="22" cy="251" r="2.4" fill="#22c55e" fillOpacity="0.9">
        {animate && !isStatic && (
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite" />
        )}
      </circle>
      <text
        x="32"
        y="254"
        fontSize="6"
        fontFamily="ui-monospace, monospace"
        fill="currentColor"
        fillOpacity="0.85"
      >
        deployed · fra1
      </text>
    </g>
  );
}

function SpecPacket({ fromY }: { fromY: number }) {
  // Travels from the active spec row (left column, x≈118) into the forge
  // header (x≈210, y≈49). Short, snappy arc.
  const from = { x: 118, y: fromY };
  const to = { x: 210, y: 49 };
  const mx = (from.x + to.x) / 2 + 10;
  const my = Math.min(from.y, to.y) - 20;
  const d = `M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`;
  return (
    <circle r="3" fill="currentColor" filter="url(#dev-glow)">
      <animateMotion
        path={d}
        dur={`${PACKET_DURATION * 0.6}s`}
        begin="0s"
        fill="freeze"
        calcMode="spline"
        keySplines="0.42 0 0.58 1"
        keyTimes="0;1"
      />
      <animate
        attributeName="opacity"
        values="0;1;1;0"
        keyTimes="0;0.1;0.9;1"
        dur={`${PACKET_DURATION * 0.6}s`}
        fill="freeze"
      />
    </circle>
  );
}

function CodePacket({ toIndex }: { toIndex: number }) {
  // Emerges from the forge footer (x≈400, y≈254) and lands on the active
  // feature row of the shipped card. Delayed slightly so it reads as
  // "forge finished → ship" causality.
  const from = { x: 400, y: 254 };
  const to = { x: 442, y: 102 + toIndex * 26 };
  const mx = (from.x + to.x) / 2 + 10;
  const my = Math.min(from.y, to.y) + 20;
  const d = `M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`;
  return (
    <circle r="3.4" fill="currentColor" filter="url(#dev-glow)">
      <animateMotion
        path={d}
        dur={`${PACKET_DURATION * 0.7}s`}
        begin={`${PACKET_DURATION * 0.5}s`}
        fill="freeze"
        calcMode="spline"
        keySplines="0.42 0 0.58 1"
        keyTimes="0;1"
      />
      <animate
        attributeName="opacity"
        values="0;0;1;1;0"
        keyTimes="0;0.5;0.6;0.9;1"
        dur={`${PACKET_DURATION * 1.2}s`}
        fill="freeze"
      />
    </circle>
  );
}

function ReleaseFlash() {
  // Short "SHIPPED" moment at the top-right corner of the shipped card.
  // Only fires on the final feature of each build cycle.
  return (
    <g transform="translate(530, 20)" opacity="0">
      <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.3;1" dur="1.2s" fill="freeze" />
      <rect x="0" y="0" width="48" height="12" rx="6" fill="#22c55e" fillOpacity="0.85" />
      <text
        x="24"
        y="8.5"
        fontSize="6"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fill="#ffffff"
      >
        SHIPPED
      </text>
    </g>
  );
}
