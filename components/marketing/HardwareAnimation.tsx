'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * HardwareAnimation — "Network pulse"
 *
 * Visualizes the hardware/infrastructure service line as a live network
 * topology: a central hub with 8 heterogeneous endpoints (laptop, phone,
 * server rack, access point, printer, display, tablet, iMac). A health-
 * check sweep radiates from the hub every CYCLE_MS, lighting each endpoint
 * in turn as it "pings back". Every FAULT_INTERVAL ticks one endpoint
 * flashes amber (fault) — a dedicated repair pulse races to it, and the
 * endpoint returns to green with a satisfying ring expansion.
 *
 * This matches what managed infrastructure actually sells: continuous
 * observation + quick remediation. Not a loading spinner.
 *
 * Pure SVG + SMIL + CSS keyframes. One React setState per cycle. No FM.
 * Pauses offscreen; respects prefers-reduced-motion.
 */

const CYCLE_MS = 1600;
const PULSE_DURATION = 1.2;
const FAULT_INTERVAL = 6; // every N ticks, something breaks

// 8 endpoints arranged in an ellipse around the central hub at (300, 150).
// `kind` picks which glyph to render (hub-adjacent variety reads as a
// mixed office + edge environment, not a single-vendor rack).
type EndpointKind = 'laptop' | 'phone' | 'server' | 'ap' | 'printer' | 'display' | 'tablet' | 'imac';
type Endpoint = { x: number; y: number; kind: EndpointKind };

const ENDPOINTS: Endpoint[] = [
  { x: 110, y: 70,  kind: 'server' },
  { x: 300, y: 40,  kind: 'ap' },
  { x: 490, y: 70,  kind: 'imac' },
  { x: 540, y: 150, kind: 'display' },
  { x: 490, y: 230, kind: 'printer' },
  { x: 300, y: 260, kind: 'laptop' },
  { x: 110, y: 230, kind: 'tablet' },
  { x: 60,  y: 150, kind: 'phone' },
];

const HUB = { x: 300, y: 150 };

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

export function HardwareAnimation() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInViewport(ref, 0.25);
  const reduce = usePrefersReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = window.setInterval(() => setTick((t) => t + 1), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  const activeEndpoint = tick % ENDPOINTS.length;
  // Fault event: once per FAULT_INTERVAL cycle a specific endpoint is
  // marked faulty. The hub then dispatches a repair pulse to it.
  const faultCycle = Math.floor(tick / FAULT_INTERVAL);
  const faultEndpoint = tick % FAULT_INTERVAL === 2
    ? (faultCycle * 3 + 1) % ENDPOINTS.length
    : -1;
  const uptimeDays = 24 + tick;
  const animate = !reduce && inView;

  return (
    <svg
      ref={ref}
      viewBox="0 0 600 300"
      role="img"
      aria-label="Animated network topology showing a central hub pinging eight endpoint devices with periodic fault and repair"
      className="h-auto w-full max-w-xl"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="hw-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="hw-glow-strong" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="hw-hub-grad" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className="hero-breathe text-brand-900 dark:text-accent-400" style={{ transformOrigin: '300px 150px' }}>
        {/* Soft radial glow behind the hub so the whole topology reads as
            emanating from one central point. */}
        <circle cx={HUB.x} cy={HUB.y} r="130" fill="url(#hw-hub-grad)" />

        {/* Connecting lines, drawn before everything else so pods sit on top. */}
        <Links activeIndex={activeEndpoint} faultIndex={faultEndpoint} animate={animate} />

        {/* Health-check sweep ring (always present, pulsing out from hub). */}
        {animate && <HealthSweep key={`sweep-${tick}`} />}

        {/* Each endpoint device. */}
        {ENDPOINTS.map((e, i) => (
          <Endpoint
            key={i}
            endpoint={e}
            isActive={i === activeEndpoint}
            isFault={i === faultEndpoint}
            tick={tick}
            animate={animate}
          />
        ))}

        {/* Central hub (drawn last so it sits above the lines). */}
        <Hub uptimeDays={uptimeDays} animate={animate} />

        {/* One ping packet per cycle: travels from hub to active endpoint. */}
        {animate && tick > 0 && (
          <Packet
            key={`p-${tick}`}
            from={HUB}
            to={ENDPOINTS[activeEndpoint]!}
            color="currentColor"
          />
        )}

        {/* Repair pulse when a fault happens — distinct amber color + ring. */}
        {animate && faultEndpoint >= 0 && (
          <>
            <Packet
              key={`r-${tick}`}
              from={HUB}
              to={ENDPOINTS[faultEndpoint]!}
              color="#f59e0b"
              radius={4}
            />
            <RepairRing
              key={`ring-${tick}`}
              x={ENDPOINTS[faultEndpoint]!.x}
              y={ENDPOINTS[faultEndpoint]!.y}
            />
          </>
        )}
      </g>
    </svg>
  );
}

function Hub({ uptimeDays, animate }: { uptimeDays: number; animate: boolean }) {
  return (
    <g>
      {/* Hub chassis */}
      <rect
        x={HUB.x - 42}
        y={HUB.y - 20}
        width="84"
        height="40"
        rx="8"
        fill="currentColor"
        fillOpacity="0.08"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="1.2"
      />
      {/* LED strip across the top */}
      {Array.from({ length: 8 }).map((_, i) => (
        <circle
          key={i}
          cx={HUB.x - 32 + i * 9}
          cy={HUB.y - 11}
          r="1.6"
          fill="currentColor"
          fillOpacity="0.85"
        >
          {animate && (
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur={`${1 + (i % 3) * 0.4}s`}
              begin={`${i * 0.08}s`}
              repeatCount="indefinite"
            />
          )}
        </circle>
      ))}
      {/* Hub label — small KPI */}
      <text
        x={HUB.x}
        y={HUB.y + 6}
        fontSize="8"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fill="currentColor"
        fillOpacity="0.95"
      >
        HUB · 99.9%
      </text>
      <text
        x={HUB.x}
        y={HUB.y + 15}
        fontSize="6"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fill="currentColor"
        fillOpacity="0.6"
      >
        up {uptimeDays}d
      </text>
    </g>
  );
}

function Links({
  activeIndex,
  faultIndex,
  animate,
}: {
  activeIndex: number;
  faultIndex: number;
  animate: boolean;
}) {
  return (
    <g>
      {ENDPOINTS.map((e, i) => {
        const isActive = i === activeIndex;
        const isFault = i === faultIndex;
        // Slight bezier curve for each link so the diagram doesn't look
        // like a geometric star.
        const mx = (HUB.x + e.x) / 2;
        const my = (HUB.y + e.y) / 2 - 10;
        const d = `M ${HUB.x} ${HUB.y} Q ${mx} ${my} ${e.x} ${e.y}`;
        const strokeOpacity = isFault ? 0.9 : isActive ? 0.7 : 0.22;
        const stroke = isFault ? '#f59e0b' : 'currentColor';
        return (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={stroke}
            strokeWidth={isFault || isActive ? 1.4 : 1}
            strokeOpacity={strokeOpacity}
            strokeDasharray={isFault ? undefined : '3 4'}
            strokeLinecap="round"
          >
            {animate && !isActive && !isFault && (
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-14"
                dur={`${3 + (i % 3) * 0.5}s`}
                repeatCount="indefinite"
              />
            )}
          </path>
        );
      })}
    </g>
  );
}

function Endpoint({
  endpoint,
  isActive,
  isFault,
  tick,
  animate,
}: {
  endpoint: Endpoint;
  isActive: boolean;
  isFault: boolean;
  tick: number;
  animate: boolean;
}) {
  const { x, y, kind } = endpoint;
  const stroke = isFault ? '#f59e0b' : 'currentColor';
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Pod background */}
      <circle
        r="22"
        fill="currentColor"
        fillOpacity={isFault ? 0.18 : isActive ? 0.14 : 0.06}
        stroke={stroke}
        strokeOpacity={isFault ? 0.95 : isActive ? 0.65 : 0.35}
        strokeWidth={isFault || isActive ? 1.4 : 1}
      />
      {/* Device glyph */}
      <g className={isFault ? 'text-amber-500' : undefined} transform="translate(0, -3)">
        <DeviceGlyph kind={kind} />
      </g>
      {/* Status LED under the glyph */}
      {isFault && animate ? (
        <circle cx="0" cy="12" r="2.6" fill="#f59e0b" filter="url(#hw-glow)">
          <animate
            attributeName="opacity"
            values="0.4;1;0.4"
            dur="0.55s"
            repeatCount="indefinite"
          />
        </circle>
      ) : isActive && animate ? (
        <PingLed key={`led-${tick}`} />
      ) : (
        <circle cx="0" cy="12" r="2" fill="currentColor" fillOpacity="0.55" />
      )}
    </g>
  );
}

function PingLed() {
  return (
    <circle cx="0" cy="12" r="2" fill="currentColor" filter="url(#hw-glow)">
      <animate attributeName="opacity" values="0.4;1;0.9" keyTimes="0;0.4;1" dur="0.5s" fill="freeze" />
      <animate attributeName="r" values="2;3.2;2.4" keyTimes="0;0.4;1" dur="0.5s" fill="freeze" />
    </circle>
  );
}

function DeviceGlyph({ kind }: { kind: EndpointKind }) {
  // 20x16-ish glyphs, centered. Pure stroked SVG so they inherit color.
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (kind) {
    case 'laptop':
      return (
        <g>
          <rect x="-9" y="-8" width="18" height="12" rx="1.5" {...common} />
          <path d="M -11 5 L 11 5" {...common} />
        </g>
      );
    case 'phone':
      return (
        <g>
          <rect x="-5" y="-9" width="10" height="15" rx="2" {...common} />
          <circle cx="0" cy="3" r="1" fill="currentColor" />
        </g>
      );
    case 'server':
      return (
        <g>
          <rect x="-9" y="-9" width="18" height="16" rx="1" {...common} />
          <line x1="-6" y1="-5" x2="6" y2="-5" {...common} />
          <line x1="-6" y1="-1" x2="6" y2="-1" {...common} />
          <line x1="-6" y1="3" x2="6" y2="3" {...common} />
        </g>
      );
    case 'ap':
      return (
        <g>
          <path d="M -8 3 Q 0 -8 8 3" {...common} />
          <path d="M -5 4 Q 0 -3 5 4" {...common} />
          <circle cx="0" cy="5" r="1.4" fill="currentColor" />
        </g>
      );
    case 'printer':
      return (
        <g>
          <rect x="-8" y="-4" width="16" height="8" rx="1" {...common} />
          <rect x="-6" y="-8" width="12" height="4" {...common} />
          <rect x="-6" y="3" width="12" height="5" {...common} />
        </g>
      );
    case 'display':
      return (
        <g>
          <rect x="-10" y="-8" width="20" height="12" rx="1.5" {...common} />
          <line x1="-4" y1="7" x2="4" y2="7" {...common} />
          <line x1="0" y1="4" x2="0" y2="7" {...common} />
        </g>
      );
    case 'tablet':
      return (
        <g>
          <rect x="-7" y="-9" width="14" height="16" rx="2" {...common} />
          <line x1="-2" y1="4" x2="2" y2="4" {...common} />
        </g>
      );
    case 'imac':
      return (
        <g>
          <rect x="-10" y="-9" width="20" height="13" rx="1.5" {...common} />
          <rect x="-3" y="4" width="6" height="2" {...common} />
          <line x1="-5" y1="6" x2="5" y2="6" {...common} />
        </g>
      );
  }
}

function HealthSweep() {
  // Expanding ring from the hub — the periodic health check.
  return (
    <circle cx={HUB.x} cy={HUB.y} r="25" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0">
      <animate attributeName="r" values="25;160" dur="1.4s" fill="freeze" />
      <animate attributeName="opacity" values="0;0.35;0" keyTimes="0;0.2;1" dur="1.4s" fill="freeze" />
    </circle>
  );
}

function Packet({
  from,
  to,
  color,
  radius = 3,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  color: string;
  radius?: number;
}) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2 - 10;
  const d = `M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`;
  return (
    <circle r={radius} fill={color} filter="url(#hw-glow)">
      <animateMotion
        path={d}
        dur={`${PULSE_DURATION}s`}
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
        dur={`${PULSE_DURATION}s`}
        fill="freeze"
      />
    </circle>
  );
}

function RepairRing({ x, y }: { x: number; y: number }) {
  // Satisfying ring expansion when the repair lands — this is the "fixed"
  // moment, timed to the packet's arrival.
  return (
    <circle cx={x} cy={y} r="22" fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity="0">
      <animate
        attributeName="opacity"
        values="0;0.9;0"
        keyTimes="0;0.3;1"
        dur="0.9s"
        begin={`${PULSE_DURATION * 0.9}s`}
        fill="freeze"
      />
      <animate
        attributeName="r"
        values="22;36;44"
        keyTimes="0;0.4;1"
        dur="0.9s"
        begin={`${PULSE_DURATION * 0.9}s`}
        fill="freeze"
      />
    </circle>
  );
}
