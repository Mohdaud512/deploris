'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * HeroAnimation — "Rack to render"
 *
 * Visualizes the Deploris story in a single looping SVG:
 *   left   — a stylized rack of server units with status LEDs ("hardware")
 *   middle — data packets travelling along bezier paths ("the handoff")
 *   right  — a live dashboard composing itself from the arriving packets
 *            ("software")
 *
 * One packet launches every CYCLE_MS. The source LED on the rack bursts, the
 * packet travels its cable, a ripple fires at the landing point on the
 * dashboard, the request-counter ticks up, and the bar heights shuffle to a
 * new live-looking distribution. The dashboard never looks empty — bars
 * persist and redistribute, matching how a real live dashboard behaves.
 *
 * - Pure inline SVG. Native SMIL (<animate>, <animateMotion>) runs on the
 *   browser compositor; no React re-render per animation frame. The only
 *   React state tick is one setState every CYCLE_MS to swap bar patterns
 *   and tick the request counter.
 * - IntersectionObserver pauses the ticker when offscreen.
 * - prefers-reduced-motion renders the composed end-state only.
 * - Breathing scale on the whole piece is a CSS keyframes rule (see
 *   .hero-breathe in globals.css) so the top-level group is a plain <g>.
 */

const UNIT_COUNT = 8;
const CABLE_COUNT = 4;
const CYCLE_MS = 1500;
const PACKET_DURATION = 1.25;

type Cable = { d: string; endX: number; endY: number };

// Cable paths run from the right edge of the rack (x≈190) into the dashboard
// left edge (x≈410). Each uses a different vertical bend so they fan out and
// feel like physical cabling, not screen-aligned lines.
const CABLES: Cable[] = [
  { d: 'M 190 60  C 260 60,  340 90,  410 95',  endX: 410, endY: 95 },
  { d: 'M 190 115 C 260 115, 340 140, 410 140', endX: 410, endY: 140 },
  { d: 'M 190 170 C 260 170, 340 185, 410 185', endX: 410, endY: 185 },
  { d: 'M 190 225 C 260 225, 340 230, 410 230', endX: 410, endY: 230 },
];

// Four plausible bar-height distributions. Each incoming packet rotates the
// pattern so bar heights shuffle to a new live-looking state instead of
// collapsing to zero.
const BAR_PATTERNS: number[][] = [
  [42, 68, 36, 82, 54],
  [58, 44, 72, 50, 66],
  [36, 78, 56, 44, 70],
  [64, 52, 48, 80, 58],
];

// Rack units that map one-to-one to cables (the "source" of each packet).
const CABLE_SOURCE_UNITS = [1, 3, 4, 6];

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

export function HeroAnimation() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInViewport(ref, 0.3);
  const reduce = usePrefersReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = window.setInterval(() => setTick((t) => t + 1), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  const cableIndex = tick % CABLE_COUNT;
  const activeUnit = CABLE_SOURCE_UNITS[cableIndex]!;
  const barPattern = BAR_PATTERNS[tick % BAR_PATTERNS.length]!;
  const requestCount = 1240 + tick;
  const animate = !reduce && inView;

  return (
    <svg
      ref={ref}
      viewBox="0 0 600 300"
      role="img"
      aria-label="Animated diagram showing data packets flowing from a server rack into a live dashboard"
      className="h-auto w-full max-w-xl"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="hero-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="cable-grad" x1="0" x2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.12" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.42" />
        </linearGradient>
      </defs>

      {/* Breathing wrapper driven by CSS keyframes (see .hero-breathe in
          globals.css). Plain <g>, no React/FM involvement at the top. */}
      <g className="hero-breathe" style={{ transformOrigin: '300px 150px' }}>
        <Rack activeUnit={activeUnit} animate={animate} tick={tick} />
        <Cables activeIndex={cableIndex} animate={animate} />
        <Dashboard
          barPattern={barPattern}
          requestCount={requestCount}
          tick={tick}
          static={reduce}
        />
        {/* Packet + ripple keyed on tick so each cycle mounts fresh SMIL
            elements that fire from zero. */}
        {animate && tick > 0 && (
          <>
            <Packet key={`p${tick}`} path={CABLES[cableIndex]!.d} />
            <ArrivalRipple
              key={`r${tick}`}
              x={CABLES[cableIndex]!.endX}
              y={CABLES[cableIndex]!.endY}
            />
          </>
        )}
      </g>
    </svg>
  );
}

function Rack({
  activeUnit,
  animate,
  tick,
}: {
  activeUnit: number;
  animate: boolean;
  tick: number;
}) {
  return (
    <g className="text-accent-500 dark:text-accent-400">
      {/* Chassis */}
      <rect
        x="20"
        y="20"
        width="160"
        height="260"
        rx="12"
        fill="rgba(255,255,255,0.03)"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="1"
      />
      {/* Rack rails */}
      <line x1="34" y1="30" x2="34" y2="270" stroke="currentColor" strokeOpacity="0.15" />
      <line x1="166" y1="30" x2="166" y2="270" stroke="currentColor" strokeOpacity="0.15" />

      {/* Header strip */}
      <rect
        x="40"
        y="26"
        width="120"
        height="12"
        rx="3"
        fill="rgba(255,255,255,0.04)"
        stroke="currentColor"
        strokeOpacity="0.15"
      />
      <circle cx="48" cy="32" r="2" fill="currentColor" fillOpacity="0.9" />
      <rect x="56" y="29" width="36" height="2" rx="1" fill="currentColor" fillOpacity="0.5" />
      <rect x="56" y="33" width="24" height="2" rx="1" fill="currentColor" fillOpacity="0.3" />
      <circle cx="152" cy="32" r="1.4" fill="currentColor" fillOpacity="0.4" />
      <circle cx="146" cy="32" r="1.4" fill="currentColor" fillOpacity="0.4" />

      {Array.from({ length: UNIT_COUNT }).map((_, i) => {
        const y = 46 + i * 28;
        const isActive = i === activeUnit;
        const usage = 24 + ((i * 17 + 9) % 42);
        return (
          <g key={i} transform={`translate(0, ${y})`}>
            <rect
              x="40"
              y="0"
              width="120"
              height="20"
              rx="3"
              fill="rgba(255,255,255,0.04)"
              stroke="currentColor"
              strokeOpacity="0.18"
            />
            {/* LED — ambient blink always; the active LED gets a fresh
                burst each tick by keying on `tick`. */}
            {isActive && animate ? (
              <LedBurst key={`led-${tick}`} />
            ) : (
              <LedAmbient idx={i} animate={animate} />
            )}
            {/* Usage bar */}
            <rect x="60" y="7" width="72" height="6" rx="2" fill="rgba(255,255,255,0.08)" />
            <rect
              x="60"
              y="7"
              width={usage}
              height="6"
              rx="2"
              fill="currentColor"
              fillOpacity={isActive ? 0.9 : 0.55}
            />
            {/* Port dots */}
            <circle cx="146" cy="10" r="1.4" fill="currentColor" fillOpacity="0.4" />
            <circle cx="152" cy="10" r="1.4" fill="currentColor" fillOpacity="0.4" />
          </g>
        );
      })}
      {/* Rack base vents */}
      <g transform="translate(40, 262)" opacity="0.35">
        {Array.from({ length: 10 }).map((_, i) => (
          <rect key={i} x={i * 12} y={0} width="8" height="4" rx="1" fill="currentColor" />
        ))}
      </g>
    </g>
  );
}

function LedBurst() {
  // Active LED: scale burst + fade from 1 → 0.95, filtered glow.
  return (
    <circle cx="50" cy="10" r="2.8" fill="currentColor" filter="url(#hero-glow)">
      <animate
        attributeName="opacity"
        values="0.3;1;0.95"
        keyTimes="0;0.4;1"
        dur="0.55s"
        fill="freeze"
      />
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="scale"
        additive="sum"
        values="1;1.9;1"
        keyTimes="0;0.4;1"
        dur="0.55s"
        fill="freeze"
      />
    </circle>
  );
}

function LedAmbient({ idx, animate }: { idx: number; animate: boolean }) {
  const duration = 2 + (idx % 3) * 0.5;
  const begin = idx * 0.25;
  return (
    <circle cx="50" cy="10" r="2.8" fill="currentColor" fillOpacity="0.3">
      {animate && (
        <animate
          attributeName="opacity"
          values="0.22;0.6;0.22"
          dur={`${duration}s`}
          begin={`${begin}s`}
          repeatCount="indefinite"
        />
      )}
    </circle>
  );
}

function Cables({ activeIndex, animate }: { activeIndex: number; animate: boolean }) {
  return (
    <g className="text-accent-400">
      {CABLES.map((c, i) => {
        const isActive = i === activeIndex;
        return (
          <g key={i}>
            <path
              d={c.d}
              fill="none"
              stroke="url(#cable-grad)"
              strokeWidth={isActive ? 1.5 : 1}
              strokeOpacity={isActive ? 0.85 : 0.35}
              strokeLinecap="round"
              strokeDasharray="2 4"
            />
            {animate && !isActive && (
              <AmbientPulse path={c.d} delay={i * 1.1} duration={4.5 + i * 0.3} />
            )}
          </g>
        );
      })}
    </g>
  );
}

function AmbientPulse({ path, delay, duration }: { path: string; delay: number; duration: number }) {
  return (
    <circle r="1.6" fill="currentColor" fillOpacity="0.35">
      <animateMotion
        path={path}
        dur={`${duration}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
        calcMode="linear"
      />
    </circle>
  );
}

function Packet({ path }: { path: string }) {
  return (
    <circle r="5" fill="currentColor" filter="url(#hero-glow)" className="text-accent-500 dark:text-accent-400">
      <animateMotion
        path={path}
        dur={`${PACKET_DURATION}s`}
        begin="0s"
        fill="freeze"
        calcMode="spline"
        keySplines="0.42 0 0.58 1"
        keyTimes="0;1"
      />
      <animate
        attributeName="opacity"
        values="0;1;1;0.9"
        keyTimes="0;0.15;0.85;1"
        dur={`${PACKET_DURATION}s`}
        fill="freeze"
      />
    </circle>
  );
}

function ArrivalRipple({ x, y }: { x: number; y: number }) {
  // Expanding ring that fires right as the packet lands. Pure SMIL — the ring
  // scales from 1→3 while fading, giving the "committed" moment on arrival.
  return (
    <circle
      cx={x}
      cy={y}
      r="4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      opacity="0"
      className="text-accent-500 dark:text-accent-400"
    >
      <animate
        attributeName="opacity"
        values="0;0.9;0"
        keyTimes="0;0.3;1"
        dur="0.9s"
        begin={`${PACKET_DURATION * 0.9}s`}
        fill="freeze"
      />
      <animate
        attributeName="r"
        values="4;14;18"
        keyTimes="0;0.4;1"
        dur="0.9s"
        begin={`${PACKET_DURATION * 0.9}s`}
        fill="freeze"
      />
    </circle>
  );
}

function Dashboard({
  barPattern,
  requestCount,
  tick,
  static: isStatic,
}: {
  barPattern: number[];
  requestCount: number;
  tick: number;
  static: boolean;
}) {
  const barX = [430, 460, 490, 520, 550];
  const chartBaseline = 230;

  return (
    <g className="text-brand-100 dark:text-white">
      {/* Card */}
      <rect
        x="410"
        y="30"
        width="170"
        height="240"
        rx="14"
        fill="rgba(255,255,255,0.06)"
        stroke="currentColor"
        strokeOpacity="0.25"
      />

      {/* Header: title lines */}
      <rect x="422" y="44" width="60" height="5" rx="2.5" fill="currentColor" fillOpacity="0.65" />
      <rect x="422" y="54" width="40" height="3" rx="1.5" fill="currentColor" fillOpacity="0.3" />

      {/* Live pill with pulsing dot and request count */}
      <rect
        x="498"
        y="42"
        width="68"
        height="16"
        rx="8"
        fill="rgba(255,255,255,0.08)"
        stroke="currentColor"
        strokeOpacity="0.2"
      />
      <circle cx="506" cy="50" r="2" fill="currentColor">
        {!isStatic && (
          <animate
            attributeName="opacity"
            values="0.4;1;0.4"
            dur="1.6s"
            repeatCount="indefinite"
          />
        )}
      </circle>
      <text
        x="513"
        y="53"
        fontSize="8"
        fontFamily="ui-monospace, monospace"
        fill="currentColor"
        fillOpacity="0.9"
      >
        {requestCount.toLocaleString()}/s
      </text>

      {/* Divider */}
      <line x1="422" y1="68" x2="568" y2="68" stroke="currentColor" strokeOpacity="0.18" />

      {/* KPI row */}
      <g transform="translate(422, 78)">
        {[
          { label: 'uptime', value: '99.9%' },
          { label: 'p95', value: '184ms' },
          { label: 'nodes', value: '48' },
        ].map((kpi, i) => (
          <g key={kpi.label} transform={`translate(${i * 50}, 0)`}>
            <rect width="46" height="24" rx="4" fill="rgba(255,255,255,0.05)" />
            <text x="6" y="10" fontSize="6" fill="currentColor" fillOpacity="0.55">
              {kpi.label}
            </text>
            <text
              x="6"
              y="20"
              fontSize="8"
              fontFamily="ui-monospace, monospace"
              fill="currentColor"
              fillOpacity="0.95"
            >
              {kpi.value}
            </text>
          </g>
        ))}
      </g>

      {/* Chart baseline */}
      <line
        x1="422"
        y1={chartBaseline}
        x2="568"
        y2={chartBaseline}
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeDasharray="2 3"
      />

      {/* Live bars — CSS transitions on y/height move them smoothly as React
          updates the pattern each tick. */}
      {barX.map((x, i) => {
        const h = barPattern[i] ?? 40;
        return (
          <rect
            key={i}
            x={x}
            width="20"
            rx="3"
            y={chartBaseline - h}
            height={h}
            fill="currentColor"
            fillOpacity="0.85"
            style={
              isStatic
                ? undefined
                : {
                    transition: 'y 0.55s cubic-bezier(0.22, 1, 0.36, 1), height 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
                  }
            }
          />
        );
      })}

      {/* Sparkline — redraws each tick (fresh key = fresh mount). On non-
          reduced-motion we animate the stroke draw via pathLength on
          strokeDasharray trick. */}
      <SparklinePath key={isStatic ? 'static' : `s${tick}`} tick={tick} static={isStatic} />

      {/* Footer status strip */}
      <rect x="422" y="244" width="146" height="12" rx="3" fill="rgba(255,255,255,0.04)" />
      <circle cx="430" cy="250" r="2" fill="currentColor" fillOpacity="0.85" />
      <rect x="438" y="247" width="44" height="2" rx="1" fill="currentColor" fillOpacity="0.4" />
      <rect x="438" y="251" width="28" height="2" rx="1" fill="currentColor" fillOpacity="0.25" />
    </g>
  );
}

function SparklinePath({ tick, static: isStatic }: { tick: number; static: boolean }) {
  const d = buildSparkline(tick);
  // Measure total length client-side so we can animate the dash offset.
  const pathRef = useRef<SVGPathElement>(null);
  const [length, setLength] = useState<number | null>(null);
  useEffect(() => {
    if (pathRef.current) setLength(pathRef.current.getTotalLength());
  }, [d]);

  const dashOffset = isStatic || length === null ? 0 : length;
  const style = isStatic
    ? undefined
    : {
        strokeDasharray: length ?? undefined,
        strokeDashoffset: dashOffset,
        transition: 'stroke-dashoffset 1.1s ease-out',
      };

  // When length becomes known, flip strokeDashoffset to 0 so the stroke draws.
  useEffect(() => {
    if (!pathRef.current || length === null || isStatic) return;
    // Next tick: trigger the transition.
    const el = pathRef.current;
    el.style.strokeDashoffset = String(length);
    // Force reflow then animate to 0.
    void el.getBoundingClientRect();
    el.style.strokeDashoffset = '0';
  }, [length, isStatic]);

  return (
    <path
      ref={pathRef}
      d={d}
      fill="none"
      stroke="currentColor"
      strokeOpacity="0.75"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    />
  );
}

function buildSparkline(tick: number): string {
  const points: [number, number][] = [];
  for (let i = 0; i < 9; i += 1) {
    const x = 422 + i * 18;
    const base = 158;
    const trend = i * -1.8;
    const wobble = Math.sin((i + tick) * 0.9) * 6;
    const y = base + trend + wobble;
    points.push([x, y]);
  }
  return points
    .map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`))
    .join(' ');
}
