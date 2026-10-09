'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * WifiSurveyAnimation — "Blooming coverage"
 *
 * Visualizes a WiFi survey on a schematic floor plan:
 *   - 5 rooms sketched as rectangles with partial walls
 *   - 3 access points placed at reasonable spots
 *   - each AP emits a radial coverage field (concentric arcs) that pulses
 *   - a measurement blip walks a path through the floor plan, taking
 *     readings — a small signal-strength bar at the top-right shows what
 *     the surveyor just measured
 *   - heatmap-ish dots scattered across the floor plan whose opacity
 *     follows the nearest-AP signal strength
 */

const CYCLE_MS = 2200;

type AP = { x: number; y: number; label: string };
const APS: AP[] = [
  { x: 150, y: 90,  label: 'AP-1' },
  { x: 430, y: 110, label: 'AP-2' },
  { x: 290, y: 220, label: 'AP-3' },
];

// Waypoints the surveyor walks through, in order.
const SURVEY_PATH: { x: number; y: number }[] = [
  { x: 70,  y: 70 },
  { x: 200, y: 70 },
  { x: 340, y: 90 },
  { x: 480, y: 130 },
  { x: 400, y: 220 },
  { x: 230, y: 240 },
  { x: 90,  y: 220 },
  { x: 70,  y: 150 },
];

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

// Signal strength from the nearest AP (approximation; distance in SVG units
// mapped to a 0-5 bar scale).
function signalAt(x: number, y: number): number {
  let best = Infinity;
  for (const ap of APS) {
    const d = Math.hypot(ap.x - x, ap.y - y);
    if (d < best) best = d;
  }
  // 60 ≈ full signal, 220 ≈ zero
  const n = Math.max(0, Math.min(1, 1 - (best - 60) / 160));
  return Math.round(n * 5);
}

export function WifiSurveyAnimation() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInViewport(ref, 0.25);
  const reduce = usePrefersReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = window.setInterval(() => setTick((t) => t + 1), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  const waypoint = SURVEY_PATH[tick % SURVEY_PATH.length]!;
  const strength = signalAt(waypoint.x, waypoint.y);
  const animate = !reduce && inView;

  return (
    <svg
      ref={ref}
      viewBox="0 0 600 320"
      role="img"
      aria-label="Animated WiFi survey: three access points radiate coverage across a floor plan while a surveyor walks a path and takes signal readings"
      className="h-auto w-full max-w-xl"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="wifi-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="wifi-cov-grad" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
          <stop offset="60%" stopColor="currentColor" stopOpacity="0.12" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className="hero-breathe text-brand-900 dark:text-accent-400" style={{ transformOrigin: '300px 160px' }}>
        <FloorPlan />
        <Heatmap />

        {/* Coverage fields for each AP */}
        {APS.map((ap) => (
          <CoverageField key={ap.label} ap={ap} animate={animate} />
        ))}

        {/* AP devices */}
        {APS.map((ap) => (
          <APMarker key={`m-${ap.label}`} ap={ap} animate={animate} />
        ))}

        {/* Surveyor blip walking the path */}
        <Surveyor animate={animate} tick={tick} waypoint={waypoint} />

        {/* Signal reading badge in the top-right corner */}
        <SignalReading strength={strength} waypoint={waypoint} />
      </g>
    </svg>
  );
}

function FloorPlan() {
  return (
    <g stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" fill="none">
      {/* Outer perimeter */}
      <rect x="40" y="40" width="520" height="240" rx="4" strokeOpacity="0.55" />
      {/* Internal walls — not full rectangles, so it reads as a floor plan */}
      <line x1="240" y1="40" x2="240" y2="150" />
      <line x1="240" y1="150" x2="140" y2="150" />
      <line x1="40"  y1="150" x2="100" y2="150" />
      <line x1="360" y1="40" x2="360" y2="180" />
      <line x1="360" y1="180" x2="480" y2="180" />
      <line x1="520" y1="180" x2="560" y2="180" />
      <line x1="200" y1="200" x2="200" y2="280" />
      <line x1="400" y1="200" x2="400" y2="280" />
      {/* Door gaps implied by not drawing short segments on walls (above) */}
      {/* Room labels */}
      <g fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.5" stroke="none">
        <text x="140" y="56">OFFICE A</text>
        <text x="420" y="56">OFFICE B</text>
        <text x="60"  y="166">LOUNGE</text>
        <text x="280" y="166">CORRIDOR</text>
        <text x="420" y="196">SERVER</text>
        <text x="100" y="275">MEETING</text>
        <text x="440" y="275">KITCHEN</text>
      </g>
    </g>
  );
}

function Heatmap() {
  // Scatter small dots across the floor plan, each with opacity proportional
  // to its signal strength to the nearest AP. Fixed deterministic positions
  // so no hydration mismatch.
  const dots: { x: number; y: number }[] = [];
  for (let x = 60; x < 560; x += 24) {
    for (let y = 60; y < 270; y += 24) {
      dots.push({ x, y });
    }
  }
  return (
    <g>
      {dots.map((d, i) => {
        const s = signalAt(d.x, d.y);
        const opacity = (s / 5) * 0.3;
        return (
          <circle key={i} cx={d.x} cy={d.y} r="2" fill="currentColor" fillOpacity={opacity} />
        );
      })}
    </g>
  );
}

function CoverageField({ ap, animate }: { ap: AP; animate: boolean }) {
  // A soft radial fill + a sequence of expanding arcs for the pulse.
  return (
    <g transform={`translate(${ap.x}, ${ap.y})`}>
      {/* Base coverage radial */}
      <circle r="110" fill="url(#wifi-cov-grad)" />
      {/* Pulsing arc that expands outward on a loop */}
      {animate && (
        <circle r="20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0">
          <animate attributeName="r" values="20;110" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.1;0" keyTimes="0;0.6;1" dur="2.6s" repeatCount="indefinite" />
        </circle>
      )}
    </g>
  );
}

function APMarker({ ap, animate }: { ap: AP; animate: boolean }) {
  return (
    <g transform={`translate(${ap.x}, ${ap.y})`}>
      {/* AP body */}
      <circle r="10" fill="currentColor" fillOpacity="0.95" filter="url(#wifi-glow)" />
      <circle r="10" fill="none" stroke="#ffffff" strokeOpacity="0.3" />
      {/* Antenna cone glyph */}
      <path d="M -4 1 Q 0 -4 4 1" fill="none" stroke="#ffffff" strokeWidth="1" />
      <path d="M -2 2 Q 0 -1 2 2" fill="none" stroke="#ffffff" strokeWidth="1" />
      <circle cx="0" cy="3" r="1" fill="#ffffff" />
      {/* Label */}
      <rect x="12" y="-6" width="28" height="12" rx="3" fill="currentColor" fillOpacity="0.75" />
      <text x="16" y="2.5" fontSize="7" fontFamily="ui-monospace, monospace" fill="#ffffff">
        {ap.label}
      </text>
      {/* Pulsing LED */}
      <circle cx="-6" cy="-6" r="1.6" fill="#22c55e">
        {animate && (
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
        )}
      </circle>
    </g>
  );
}

function Surveyor({ animate, tick, waypoint }: { animate: boolean; tick: number; waypoint: { x: number; y: number } }) {
  // Interpolate from the previous waypoint to the current one every cycle.
  const prev = SURVEY_PATH[(tick - 1 + SURVEY_PATH.length) % SURVEY_PATH.length]!;
  const d = `M ${prev.x} ${prev.y} L ${waypoint.x} ${waypoint.y}`;
  if (!animate) {
    // Static: show the surveyor at the current waypoint.
    return (
      <g transform={`translate(${waypoint.x}, ${waypoint.y})`}>
        <circle r="8" fill="currentColor" fillOpacity="0.95" />
        <circle r="12" fill="none" stroke="currentColor" strokeOpacity="0.4" />
      </g>
    );
  }
  return (
    <g>
      {/* Trailing path (short-lived) */}
      <path d={d} fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="3 3" />
      {/* Blip */}
      <g filter="url(#wifi-glow)">
        <circle r="7" fill="currentColor" fillOpacity="0.95">
          <animateMotion
            key={`sv-${tick}`}
            path={d}
            dur={`${CYCLE_MS / 1000 - 0.4}s`}
            fill="freeze"
            calcMode="spline"
            keySplines="0.33 1 0.68 1"
            keyTimes="0;1"
          />
        </circle>
      </g>
      {/* Pulse ring at destination when walker arrives */}
      <circle cx={waypoint.x} cy={waypoint.y} r="7" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0">
        <animate
          key={`arr-${tick}`}
          attributeName="opacity"
          values="0;0.8;0"
          keyTimes="0;0.4;1"
          dur="0.9s"
          begin={`${CYCLE_MS / 1000 - 0.5}s`}
          fill="freeze"
        />
        <animate
          key={`arr-r-${tick}`}
          attributeName="r"
          values="7;22"
          dur="0.9s"
          begin={`${CYCLE_MS / 1000 - 0.5}s`}
          fill="freeze"
        />
      </circle>
    </g>
  );
}

function SignalReading({ strength, waypoint }: { strength: number; waypoint: { x: number; y: number } }) {
  // Small reading badge in the top-right that updates per cycle.
  return (
    <g transform="translate(420, 20)">
      <rect x="0" y="0" width="160" height="34" rx="6" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.35" />
      <text x="10" y="12" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.55">
        last reading
      </text>
      <text x="10" y="26" fontSize="8" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.95">
        {`(${waypoint.x},${waypoint.y}) · ${strengthToDbm(strength)} dBm`}
      </text>
      {/* 5-bar signal icon */}
      <g transform="translate(118, 20)">
        {Array.from({ length: 5 }).map((_, i) => (
          <rect
            key={i}
            x={i * 6}
            y={-i * 2 - 2}
            width="4"
            height={i * 2 + 4}
            rx="1"
            fill="currentColor"
            fillOpacity={i < strength ? 0.95 : 0.25}
            style={{ transition: 'fill-opacity 0.4s ease-out' }}
          />
        ))}
      </g>
    </g>
  );
}

function strengthToDbm(strength: number): number {
  // 5 bars → -42 dBm, 0 bars → -92 dBm (realistic phone WiFi ranges).
  return -42 - (5 - strength) * 10;
}
