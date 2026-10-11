'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * HardwareBreakFixAnimation, "Break → SLA countdown → van arrives → fixed"
 *
 * Four phases cycle:
 *   0, healthy: equipment running, LEDs green, SLA timer dormant
 *   1, fault:   LEDs flash red/amber, SLA timer starts counting down
 *   2, en-route: a repair van drives in from the right, timer continues
 *   3, fixed:   wrench overlay briefly, LEDs return green, "fixed in NN min"
 *
 * Side panel: a service history list showing the last 4 fixes with their
 * resolution times, and an SLA strip (same-day: ✓ / NBD: ✓) at the top.
 */

const CYCLE_MS = 1500;
const PHASES = 4; // one phase per cycle

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

const DEVICE_LABELS = ['switch-01', 'srv-14', 'ups-02', 'raid-07', 'pdu-04'];

const HISTORY_PRESETS = [
  { device: 'switch-04', minutes: 42 },
  { device: 'srv-11',    minutes: 118 },
  { device: 'ups-03',    minutes: 26 },
  { device: 'raid-02',   minutes: 85 },
  { device: 'pdu-01',    minutes: 34 },
  { device: 'srv-14',    minutes: 71 },
];

export function HardwareBreakFixAnimation() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInViewport(ref, 0.25);
  const reduce = usePrefersReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = window.setInterval(() => setTick((t) => t + 1), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  // Phase advances every tick; full cycle every 4 ticks.
  const phase = tick % PHASES;
  const device = DEVICE_LABELS[Math.floor(tick / PHASES) % DEVICE_LABELS.length]!;
  // Fake SLA countdown: starts at 4:00 at fault, decreases by phase.
  const slaMinutesLeft = 240 - (phase * 55); // 240 → 185 → 130 → 75
  const animate = !reduce && inView;

  const history = Array.from({ length: 4 }).map((_, i) => {
    const idx = (Math.floor(tick / PHASES) + i) % HISTORY_PRESETS.length;
    return HISTORY_PRESETS[idx]!;
  });

  return (
    <svg
      ref={ref}
      viewBox="0 0 600 320"
      role="img"
      aria-label="Animated hardware break-fix: a device faults, an SLA timer starts, a repair van arrives, and the device returns to healthy"
      className="h-auto w-full max-w-xl"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="bf-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="hero-breathe text-brand-900 dark:text-accent-400" style={{ transformOrigin: '300px 160px' }}>
        <SlaStrip />
        <DeviceStage phase={phase} device={device} animate={animate} tick={tick} />
        <SlaTimer slaMinutesLeft={slaMinutesLeft} phase={phase} />
        <HistoryPanel entries={history} />
        {/* Van only appears during phase 2 (en-route) */}
        {animate && phase === 2 && <RepairVan key={`van-${tick}`} />}
        {/* Repair ring + wrench on phase 3 */}
        {animate && phase === 3 && <RepairFx key={`fx-${tick}`} />}
      </g>
    </svg>
  );
}

function SlaStrip() {
  return (
    <g transform="translate(20, 20)">
      <rect width="560" height="22" rx="11" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.3" />
      {/* SLA guarantees */}
      <g transform="translate(14, 15)" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.8">
        <text x="0" y="0">time-bound break-fix</text>
      </g>
      <g transform="translate(260, 11)">
        <circle r="3" cx="0" cy="0" fill="#22c55e" fillOpacity="0.9" />
        <text x="8" y="3" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.85">
          same-day · 4h window
        </text>
      </g>
      <g transform="translate(420, 11)">
        <circle r="3" cx="0" cy="0" fill="#22c55e" fillOpacity="0.9" />
        <text x="8" y="3" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.85">
          next-business-day · 24h
        </text>
      </g>
    </g>
  );
}

function DeviceStage({
  phase,
  device,
  animate,
  tick,
}: {
  phase: number;
  device: string;
  animate: boolean;
  tick: number;
}) {
  // Big centered rack-mount device. Phase 0 = healthy green. Phase 1/2 = red
  // flashing. Phase 3 = green again (after fix).
  const isFaulted = phase === 1 || phase === 2;
  return (
    <g transform="translate(140, 70)">
      {/* Device chassis */}
      <rect
        width="220"
        height="120"
        rx="8"
        fill="currentColor"
        fillOpacity="0.1"
        stroke={isFaulted ? '#ef4444' : '#22c55e'}
        strokeOpacity={isFaulted ? 0.9 : 0.7}
        strokeWidth="1.5"
      />
      {/* Front faceplate strip */}
      <rect x="8" y="8" width="204" height="22" rx="3" fill="currentColor" fillOpacity="0.08" />
      <text x="18" y="22" fontSize="8" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.95">
        {device}
      </text>
      {/* Phase label */}
      <g transform="translate(130, 14)">
        <rect width="76" height="12" rx="6" fill={isFaulted ? '#ef4444' : '#22c55e'} fillOpacity="0.9" />
        <text x="38" y="9" textAnchor="middle" fontSize="6.5" fontFamily="ui-monospace, monospace" fill="#ffffff">
          {phase === 0 ? 'HEALTHY' : phase === 1 ? 'FAULT · OPEN' : phase === 2 ? 'EN-ROUTE' : 'RESOLVED'}
        </text>
      </g>
      {/* Rack units (4 rows) */}
      {Array.from({ length: 4 }).map((_, i) => {
        const y = 38 + i * 18;
        return (
          <g key={i} transform={`translate(10, ${y})`}>
            <rect width="200" height="14" rx="2" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.15" />
            {/* Unit status LED */}
            <circle cx="10" cy="7" r="2.4" fill={isFaulted ? '#ef4444' : '#22c55e'} fillOpacity="0.9">
              {animate && isFaulted && (
                <animate attributeName="opacity" values="0.3;1;0.3" dur="0.5s" repeatCount="indefinite" />
              )}
              {animate && !isFaulted && (
                <animate attributeName="opacity" values="0.5;1;0.5" dur={`${1.6 + i * 0.3}s`} repeatCount="indefinite" />
              )}
            </circle>
            {/* Usage bar */}
            <rect x="22" y="5" width="140" height="4" rx="2" fill="currentColor" fillOpacity="0.1" />
            <rect
              x="22"
              y="5"
              width={isFaulted ? (i === 1 ? 0 : 100) : 60 + (i * 11 + tick) % 60}
              height="4"
              rx="2"
              fill={isFaulted ? (i === 1 ? '#ef4444' : 'currentColor') : 'currentColor'}
              fillOpacity={isFaulted ? 0.6 : 0.85}
              style={{ transition: 'width 0.5s cubic-bezier(0.22, 1, 0.36, 1), fill-opacity 0.3s ease-out' }}
            />
            {/* Port dots */}
            <circle cx="178" cy="7" r="1.4" fill="currentColor" fillOpacity="0.5" />
            <circle cx="186" cy="7" r="1.4" fill="currentColor" fillOpacity="0.5" />
            <circle cx="194" cy="7" r="1.4" fill="currentColor" fillOpacity="0.5" />
          </g>
        );
      })}
      {/* Rear vents */}
      <g transform="translate(10, 112)" opacity="0.4">
        {Array.from({ length: 14 }).map((_, i) => (
          <rect key={i} x={i * 14} y={0} width="10" height="4" rx="1" fill="currentColor" />
        ))}
      </g>
    </g>
  );
}

function SlaTimer({ slaMinutesLeft, phase }: { slaMinutesLeft: number; phase: number }) {
  const h = Math.floor(slaMinutesLeft / 60);
  const m = slaMinutesLeft % 60;
  const timeStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  // Fill ratio from 100% at phase 1 down to 31% at phase 3.
  const pct = Math.max(0, (slaMinutesLeft / 240) * 100);
  const danger = pct < 50;
  return (
    <g transform="translate(140, 200)">
      <rect width="220" height="38" rx="6" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.3" />
      <text x="12" y="14" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.55">
        {phase === 0 ? 'SLA, standing by' : phase === 3 ? 'SLA, met · case closed' : 'SLA, time to resolve'}
      </text>
      {/* Timer */}
      <text x="12" y="30" fontSize="14" fontFamily="ui-monospace, monospace" fill={danger ? '#ef4444' : 'currentColor'} fillOpacity="0.95" fontWeight="bold">
        {phase === 0 ? '04:00' : phase === 3 ? '01:15' : timeStr}
      </text>
      {/* Right side progress ring */}
      <g transform="translate(190, 19)">
        <circle r="14" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2.5" />
        <circle
          r="14"
          fill="none"
          stroke={danger ? '#ef4444' : phase === 3 ? '#22c55e' : 'currentColor'}
          strokeOpacity="0.95"
          strokeWidth="2.5"
          strokeDasharray={`${(pct / 100) * 2 * Math.PI * 14} 999`}
          transform="rotate(-90)"
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.5s cubic-bezier(0.22, 1, 0.36, 1), stroke 0.3s ease-out' }}
        />
        <text y="4" textAnchor="middle" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.85">
          {phase === 3 ? '✓' : `${pct.toFixed(0)}%`}
        </text>
      </g>
    </g>
  );
}

function HistoryPanel({ entries }: { entries: typeof HISTORY_PRESETS }) {
  return (
    <g transform="translate(378, 70)">
      <text x="0" y="-8" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.55">
        recent fixes
      </text>
      <rect x="-4" y="-4" width="208" height={entries.length * 42 + 8} rx="6" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.3" />
      {entries.map((e, i) => {
        const inSla = e.minutes <= 240;
        return (
          <g key={`${e.device}-${i}`} transform={`translate(0, ${i * 42})`} opacity={1 - i * 0.14}>
            <rect
              width="200"
              height="36"
              rx="4"
              fill="currentColor"
              fillOpacity={i === 0 ? 0.08 : 0.05}
              stroke="currentColor"
              strokeOpacity="0.2"
            />
            {/* Status dot */}
            <circle cx="14" cy="18" r="4" fill={inSla ? '#22c55e' : '#ef4444'} fillOpacity="0.9" />
            <path d="M 12 18 L 14 20 L 17 16" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            {/* Device + time */}
            <text x="26" y="14" fontSize="8" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.95">
              {e.device}
            </text>
            <text x="26" y="26" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.65">
              {`resolved in ${Math.floor(e.minutes / 60)}h ${e.minutes % 60}m`}
            </text>
            {/* Pill */}
            <rect x="154" y="12" width="40" height="14" rx="7" fill={inSla ? '#22c55e' : '#ef4444'} fillOpacity="0.85" />
            <text x="174" y="22" textAnchor="middle" fontSize="6" fontFamily="ui-monospace, monospace" fill="#ffffff">
              {inSla ? 'in SLA' : 'breach'}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function RepairVan() {
  // Enters from the right (x=580) and parks beside the device (x=380).
  const d = 'M 580 260 L 380 260';
  return (
    <g filter="url(#bf-glow)">
      <g>
        {/* Van body */}
        <rect x="-22" y="-10" width="42" height="14" rx="2" fill="#f59e0b" fillOpacity="0.95" />
        {/* Cab */}
        <path d="M 20 4 L 32 4 L 32 -2 L 24 -2 L 20 -8 Z" fill="#f59e0b" fillOpacity="0.95" />
        {/* Window */}
        <rect x="22" y="-5" width="8" height="5" rx="1" fill="#ffffff" fillOpacity="0.5" />
        {/* Wheels */}
        <circle cx="-12" cy="6" r="3" fill="currentColor" fillOpacity="0.9" />
        <circle cx="14" cy="6" r="3" fill="currentColor" fillOpacity="0.9" />
        {/* Wrench logo on side */}
        <text x="0" y="0" textAnchor="middle" fontSize="7" fontFamily="ui-monospace, monospace" fill="#ffffff" fontWeight="bold">
          FIX
        </text>
        <animateMotion
          path={d}
          dur="1.1s"
          fill="freeze"
          calcMode="spline"
          keySplines="0.33 1 0.68 1"
          keyTimes="0;1"
        />
        <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.1;1" dur="1.1s" fill="freeze" />
      </g>
    </g>
  );
}

function RepairFx() {
  // On the fix phase: a ring expands around the device and a check overlays.
  return (
    <g transform="translate(250, 130)">
      {/* Expanding ring */}
      <circle r="30" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0">
        <animate attributeName="r" values="30;80" dur="1s" fill="freeze" />
        <animate attributeName="opacity" values="0;0.9;0" keyTimes="0;0.3;1" dur="1s" fill="freeze" />
      </circle>
      {/* Big check that pops in */}
      <g opacity="0" transform="scale(0.6)">
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.3s" fill="freeze" />
        <animateTransform
          attributeName="transform"
          type="scale"
          values="0.6;1.2;1;1"
          keyTimes="0;0.3;0.5;1"
          dur="1.3s"
          fill="freeze"
        />
        <circle r="18" fill="#22c55e" fillOpacity="0.9" />
        <path d="M -8 0 L -2 8 L 10 -8" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  );
}
