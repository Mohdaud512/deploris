'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * DataCenterAnimation — "Rolling health sweep"
 *
 * Visualizes continuous data-center hygiene:
 *   - 5 racks side-by-side, each with 7 units stacked and status LEDs
 *   - a vertical "scan bar" rolls across them left→right, lighting each
 *     rack's LEDs green as the scan hits it
 *   - a telemetry footer with 4 live metrics (temp, RH, PDU, airflow)
 *     that nudge their values each cycle
 *   - a scrolling event log below with real-sounding ops lines
 *     (firmware checks, fan speed changes, restore verifications)
 *   - every FAULT_INTERVAL cycles one rack flashes amber for a tick,
 *     and the corresponding log line is colored amber
 */

const CYCLE_MS = 1500;
const RACK_COUNT = 5;
const UNITS_PER_RACK = 7;
const FAULT_INTERVAL = 7;

const LOG_LINES = [
  'rack-01 patched kernel 6.11.4 · reboot deferred',
  'rack-02 fan speed +12% · temp +0.8°C',
  'rack-03 backup verified → lab restore ok',
  'rack-04 PDU-B at 61% sustained',
  'rack-05 CVE-2026-1172 patched · firmware n-1',
  'rack-01 airflow balanced · blanks installed',
  'rack-02 drive s/n P54D rebuild complete',
  'rack-03 cage access · ticket #4421 closed',
  'rack-04 config backup → lab · ok',
  'rack-05 switch firmware n-1 → n · rolling',
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

export function DataCenterAnimation() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInViewport(ref, 0.25);
  const reduce = usePrefersReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = window.setInterval(() => setTick((t) => t + 1), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  const activeRack = tick % RACK_COUNT;
  const faultRack = tick % FAULT_INTERVAL === 3 ? (Math.floor(tick / FAULT_INTERVAL) * 2 + 1) % RACK_COUNT : -1;
  const animate = !reduce && inView;

  // Rolling log: show the last 4 entries, newest at top.
  const logEntries = Array.from({ length: 4 }).map((_, i) => {
    const t = tick - i;
    if (t < 1) return null;
    const line = LOG_LINES[(t - 1) % LOG_LINES.length]!;
    const isFaultLine = (t - 1) % FAULT_INTERVAL === 3;
    return { tick: t, line, isFault: isFaultLine };
  });

  return (
    <svg
      ref={ref}
      viewBox="0 0 600 320"
      role="img"
      aria-label="Animated data center: five racks of equipment, a vertical scan bar rolling across them performing health checks, and a telemetry footer plus event log"
      className="h-auto w-full max-w-xl"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="dc-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="hero-breathe text-brand-900 dark:text-accent-400" style={{ transformOrigin: '300px 160px' }}>
        <Floor />
        <RackRow activeRack={activeRack} faultRack={faultRack} animate={animate} tick={tick} />
        {animate && <ScanBar key={`scan-${tick}`} />}
        <Telemetry tick={tick} animate={animate} />
        <EventLog entries={logEntries} />
      </g>
    </svg>
  );
}

function Floor() {
  // Light grid behind racks suggesting a raised-floor room.
  return (
    <g stroke="currentColor" strokeOpacity="0.1" strokeWidth="1">
      {Array.from({ length: 11 }).map((_, i) => (
        <line key={`v-${i}`} x1={20 + i * 56} y1={30} x2={20 + i * 56} y2={210} />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <line key={`h-${i}`} x1={20} y1={30 + i * 45} x2={580} y2={30 + i * 45} />
      ))}
    </g>
  );
}

function RackRow({
  activeRack,
  faultRack,
  animate,
  tick,
}: {
  activeRack: number;
  faultRack: number;
  animate: boolean;
  tick: number;
}) {
  const rackW = 100;
  const rackH = 180;
  const gap = 14;
  const baseX = 30;
  const baseY = 30;

  return (
    <g>
      {Array.from({ length: RACK_COUNT }).map((_, i) => {
        const x = baseX + i * (rackW + gap);
        const isActive = i === activeRack;
        const isFault = i === faultRack;
        return (
          <g key={i} transform={`translate(${x}, ${baseY})`}>
            {/* Chassis */}
            <rect
              x="0"
              y="0"
              width={rackW}
              height={rackH}
              rx="6"
              fill="currentColor"
              fillOpacity={isActive ? 0.1 : 0.04}
              stroke={isFault ? '#f59e0b' : 'currentColor'}
              strokeOpacity={isFault ? 0.95 : isActive ? 0.7 : 0.35}
              strokeWidth={isFault || isActive ? 1.4 : 1}
              style={{ transition: 'fill-opacity 0.3s ease-out, stroke-opacity 0.3s ease-out' }}
            />
            {/* Header label */}
            <rect x="4" y="4" width={rackW - 8} height="12" rx="3" fill="currentColor" fillOpacity="0.08" />
            <text
              x="8"
              y="13"
              fontSize="6"
              fontFamily="ui-monospace, monospace"
              fill="currentColor"
              fillOpacity="0.75"
            >
              {`RACK-0${i + 1}`}
            </text>
            <circle cx={rackW - 10} cy="10" r="2" fill={isFault ? '#f59e0b' : 'currentColor'} fillOpacity="0.9">
              {animate && !isFault && (
                <animate attributeName="opacity" values="0.4;1;0.4" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
              )}
              {animate && isFault && (
                <animate attributeName="opacity" values="0.4;1;0.4" dur="0.5s" repeatCount="indefinite" />
              )}
            </circle>

            {/* Units */}
            {Array.from({ length: UNITS_PER_RACK }).map((_, u) => {
              const uy = 22 + u * 22;
              const usage = 20 + ((u * 13 + i * 7 + tick) % 60);
              const litByScan = isActive && animate;
              return (
                <g key={u} transform={`translate(6, ${uy})`}>
                  <rect
                    width={rackW - 12}
                    height="18"
                    rx="2"
                    fill="currentColor"
                    fillOpacity={litByScan ? 0.14 : 0.07}
                    stroke="currentColor"
                    strokeOpacity={litByScan ? 0.5 : 0.2}
                    style={{ transition: 'fill-opacity 0.3s ease-out, stroke-opacity 0.3s ease-out' }}
                  />
                  {/* Unit LED */}
                  <circle
                    cx="7"
                    cy="9"
                    r="1.8"
                    fill={isFault ? '#f59e0b' : 'currentColor'}
                    fillOpacity={litByScan ? 1 : 0.5}
                    style={{ transition: 'fill-opacity 0.3s ease-out' }}
                  />
                  {/* Usage bar */}
                  <rect x="14" y="6" width={rackW - 32} height="6" rx="2" fill="currentColor" fillOpacity="0.08" />
                  <rect
                    x="14"
                    y="6"
                    width={(rackW - 32) * (usage / 100)}
                    height="6"
                    rx="2"
                    fill="currentColor"
                    fillOpacity={litByScan ? 0.85 : 0.55}
                    style={{ transition: 'width 0.5s cubic-bezier(0.22, 1, 0.36, 1), fill-opacity 0.3s ease-out' }}
                  />
                </g>
              );
            })}
            {/* Vents at the base */}
            <g transform={`translate(10, ${rackH - 10})`} opacity="0.4">
              {Array.from({ length: 6 }).map((_, v) => (
                <rect key={v} x={v * 12} y={0} width="8" height="4" rx="1" fill="currentColor" />
              ))}
            </g>
          </g>
        );
      })}
    </g>
  );
}

function ScanBar() {
  // Vertical bar sweeping from x=20 → x=580 over the full cycle.
  return (
    <rect x="20" y="30" width="20" height="180" fill="currentColor" fillOpacity="0.15">
      <animate attributeName="x" values="10;560" dur="1.1s" fill="freeze" />
      <animate attributeName="opacity" values="0;0.25;0" keyTimes="0;0.5;1" dur="1.1s" fill="freeze" />
    </rect>
  );
}

function Telemetry({ tick, animate }: { tick: number; animate: boolean }) {
  // Four KPIs with values that nudge each cycle. Deterministic from tick.
  const metrics = [
    { label: 'temp', value: `${(21.4 + Math.sin(tick * 0.4) * 0.3).toFixed(1)}°C` },
    { label: 'RH', value: `${(42 + Math.sin(tick * 0.3) * 2).toFixed(0)}%` },
    { label: 'PDU', value: `${(58 + Math.sin(tick * 0.5) * 4).toFixed(0)}%` },
    { label: 'airflow', value: 'balanced' },
  ];
  return (
    <g transform="translate(20, 220)">
      {metrics.map((m, i) => (
        <g key={m.label} transform={`translate(${i * 140}, 0)`}>
          <rect x="0" y="0" width="130" height="28" rx="6" fill="currentColor" fillOpacity="0.07" stroke="currentColor" strokeOpacity="0.25" />
          <text x="8" y="11" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.55">
            {m.label}
          </text>
          <text x="8" y="22" fontSize="10" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.95">
            {m.value}
          </text>
          <circle cx="120" cy="14" r="2" fill="#22c55e" fillOpacity="0.9">
            {animate && (
              <animate attributeName="opacity" values="0.4;1;0.4" dur={`${1.5 + i * 0.4}s`} repeatCount="indefinite" />
            )}
          </circle>
        </g>
      ))}
    </g>
  );
}

function EventLog({ entries }: { entries: ({ tick: number; line: string; isFault: boolean } | null)[] }) {
  const baseY = 262;
  const rowHeight = 14;
  return (
    <g>
      <rect
        x="20"
        y={baseY - 10}
        width="560"
        height={rowHeight * entries.length + 18}
        rx="6"
        fill="currentColor"
        fillOpacity="0.05"
        stroke="currentColor"
        strokeOpacity="0.25"
      />
      <text x="30" y={baseY + 2} fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.55">
        event log · live
      </text>
      <circle cx="562" cy={baseY - 1} r="2" fill="currentColor" fillOpacity="0.75">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
      </circle>
      {entries.map((e, i) => {
        if (!e) return null;
        const y = baseY + 14 + i * rowHeight;
        const color = e.isFault ? '#f59e0b' : 'currentColor';
        return (
          <g key={e.tick} opacity={1 - i * 0.22}>
            <text
              x="30"
              y={y}
              fontSize="6.5"
              fontFamily="ui-monospace, monospace"
              fill="currentColor"
              fillOpacity={i === 0 ? 0.55 : 0.4}
            >
              {`t+${e.tick.toString().padStart(3, '0')}`}
            </text>
            <text
              x="70"
              y={y}
              fontSize="7"
              fontFamily="ui-monospace, monospace"
              fill={color}
              fillOpacity={i === 0 ? 0.95 : 0.7}
            >
              {e.line}
            </text>
          </g>
        );
      })}
    </g>
  );
}
