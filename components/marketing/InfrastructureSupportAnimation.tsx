'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * InfrastructureSupportAnimation — "NOC: monitor + patch + respond"
 *
 * Three stacked panels:
 *   top    — 6 monitored services (web, db, queue, cache, auth, worker)
 *            each with a mini uptime bar and a status LED
 *   middle — a 24-point rolling capacity sparkline for CPU/RAM
 *   bottom — a patch pipeline: queued → testing → deploying → verified
 *
 * Each cycle: one service receives a patch badge, bars tick, the pipeline
 * advances one slot, and a ticket is "auto-acknowledged" by the on-call.
 */

const CYCLE_MS = 1600;

const SERVICES = [
  { id: 'web', label: 'web' },
  { id: 'db', label: 'db' },
  { id: 'queue', label: 'queue' },
  { id: 'cache', label: 'cache' },
  { id: 'auth', label: 'auth' },
  { id: 'worker', label: 'worker' },
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

export function InfrastructureSupportAnimation() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInViewport(ref, 0.25);
  const reduce = usePrefersReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = window.setInterval(() => setTick((t) => t + 1), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  const patchedIndex = tick % SERVICES.length;
  const pipelinePos = tick % 4;
  const animate = !reduce && inView;

  return (
    <svg
      ref={ref}
      viewBox="0 0 600 320"
      role="img"
      aria-label="Animated NOC view: monitored services with patch pipeline and capacity sparkline"
      className="h-auto w-full max-w-xl"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="is-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="hero-breathe text-brand-900 dark:text-accent-400" style={{ transformOrigin: '300px 160px' }}>
        <ServiceGrid patchedIndex={patchedIndex} animate={animate} />
        <CapacityPanel tick={tick} animate={animate} />
        <PatchPipeline pos={pipelinePos} animate={animate} tick={tick} />
        <OnCallBadge animate={animate} />
      </g>
    </svg>
  );
}

function ServiceGrid({ patchedIndex, animate }: { patchedIndex: number; animate: boolean }) {
  return (
    <g transform="translate(20, 20)">
      <text x="0" y="-4" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.55">
        services · 6 monitored
      </text>
      {SERVICES.map((s, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = col * 120;
        const y = row * 46;
        const isPatched = i === patchedIndex;
        return (
          <g key={s.id} transform={`translate(${x}, ${y})`}>
            <rect
              width="110"
              height="38"
              rx="6"
              fill="currentColor"
              fillOpacity={isPatched ? 0.14 : 0.05}
              stroke="currentColor"
              strokeOpacity={isPatched ? 0.7 : 0.3}
              style={{ transition: 'fill-opacity 0.3s ease-out, stroke-opacity 0.3s ease-out' }}
            />
            {/* Status LED */}
            <circle cx="12" cy="12" r="2.4" fill="currentColor" fillOpacity="0.95">
              {animate && (
                <animate
                  attributeName="opacity"
                  values="0.5;1;0.5"
                  dur={`${1.5 + (i % 3) * 0.4}s`}
                  begin={`${i * 0.2}s`}
                  repeatCount="indefinite"
                />
              )}
            </circle>
            {/* Service label */}
            <text x="22" y="15" fontSize="8" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.95">
              {s.label}
            </text>
            {/* Mini uptime bars (7 days) */}
            <g transform="translate(22, 20)">
              {Array.from({ length: 7 }).map((_, d) => (
                <rect
                  key={d}
                  x={d * 10}
                  y="0"
                  width="7"
                  height="10"
                  rx="1.5"
                  fill="currentColor"
                  fillOpacity={0.3 + ((d + i) % 3) * 0.2}
                />
              ))}
            </g>
            {/* Patch badge when active */}
            {isPatched && (
              <g>
                <rect x="76" y="4" width="30" height="12" rx="6" fill="#22c55e" fillOpacity="0.9">
                  {animate && (
                    <animate attributeName="opacity" values="0;1;1;0.9" keyTimes="0;0.2;0.9;1" dur="1.4s" fill="freeze" />
                  )}
                </rect>
                <text x="91" y="12.5" textAnchor="middle" fontSize="6" fontFamily="ui-monospace, monospace" fill="#ffffff">
                  patched
                </text>
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
}

function CapacityPanel({ tick, animate }: { tick: number; animate: boolean }) {
  // 24-point sparkline for CPU + RAM, shifting left each tick (append newest)
  const points = Array.from({ length: 24 }).map((_, i) => {
    const base = 44 + Math.sin((i + tick) * 0.5) * 10 + Math.cos((i + tick) * 0.3) * 6;
    return Math.round(base * 10) / 10;
  });
  const ramPoints = Array.from({ length: 24 }).map((_, i) => {
    const base = 62 + Math.sin((i + tick) * 0.4 + 1) * 6 + Math.cos((i + tick) * 0.6) * 4;
    return Math.round(base * 10) / 10;
  });
  const toPath = (vals: number[], baseY: number): string => {
    return vals
      .map((v, i) => {
        const x = 20 + i * 11;
        const y = baseY - v * 0.5;
        return `${i === 0 ? 'M' : 'L'} ${x} ${Math.round(y * 10) / 10}`;
      })
      .join(' ');
  };

  return (
    <g transform="translate(0, 130)">
      <text x="20" y="10" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.55">
        capacity · 24h
      </text>
      <rect x="18" y="16" width="268" height="60" rx="6" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.25" />
      {/* Baseline */}
      <line x1="20" y1="70" x2="285" y2="70" stroke="currentColor" strokeOpacity="0.15" />
      {/* CPU */}
      <path d={toPath(points, 70)} fill="none" stroke="currentColor" strokeOpacity="0.95" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      {/* RAM dashed */}
      <path d={toPath(ramPoints, 72)} fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.2" strokeDasharray="3 3" strokeLinecap="round" strokeLinejoin="round" />
      {/* Legend */}
      <g transform="translate(220, 24)" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.65">
        <rect x="0" y="-5" width="8" height="2" fill="currentColor" fillOpacity="0.95" />
        <text x="12" y="0">CPU</text>
        <rect x="30" y="-5" width="8" height="2" fill="currentColor" fillOpacity="0.55" />
        <text x="42" y="0">RAM</text>
      </g>
      {/* Pulse dot at the end to indicate live */}
      {animate && (
        <circle cx="285" cy={Math.round((70 - points[points.length - 1]! * 0.5) * 10) / 10} r="2.5" fill="currentColor" filter="url(#is-glow)">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.4s" repeatCount="indefinite" />
        </circle>
      )}
    </g>
  );
}

function PatchPipeline({ pos, animate, tick }: { pos: number; animate: boolean; tick: number }) {
  const stages = ['queued', 'testing', 'deploying', 'verified'];
  return (
    <g transform="translate(310, 130)">
      <text x="0" y="10" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.55">
        patch pipeline
      </text>
      <rect x="-2" y="16" width="274" height="60" rx="6" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.25" />
      {stages.map((label, i) => {
        const x = 10 + i * 66;
        const isActive = i === pos;
        return (
          <g key={label} transform={`translate(${x}, 30)`}>
            {/* Stage pill */}
            <rect
              width="54"
              height="36"
              rx="6"
              fill="currentColor"
              fillOpacity={isActive ? 0.18 : 0.07}
              stroke="currentColor"
              strokeOpacity={isActive ? 0.85 : 0.3}
              style={{ transition: 'fill-opacity 0.3s ease-out, stroke-opacity 0.3s ease-out' }}
            />
            <text x="27" y="15" textAnchor="middle" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity={isActive ? 0.95 : 0.65}>
              {label}
            </text>
            <text x="27" y="26" textAnchor="middle" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity={isActive ? 0.95 : 0.5}>
              {(tick + i) % 20 < 10 ? `#${(tick + i) % 20 + 10}` : `#${(tick + i) % 20}`}
            </text>
            {/* Connector arrow */}
            {i < stages.length - 1 && (
              <path d="M 54 18 L 62 18" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
            )}
          </g>
        );
      })}
      {/* Flying token from the active stage to the next */}
      {animate && pos < stages.length - 1 && (
        <circle r="3" fill="currentColor" filter="url(#is-glow)">
          <animateMotion
            key={`flow-${tick}`}
            path={`M ${64 + pos * 66} 48 L ${72 + pos * 66} 48`}
            dur="0.5s"
            begin="0.5s"
            fill="freeze"
          />
          <animate
            attributeName="opacity"
            values="0;1;0"
            keyTimes="0;0.5;1"
            dur="0.5s"
            begin="0.5s"
            fill="freeze"
          />
        </circle>
      )}
    </g>
  );
}

function OnCallBadge({ animate }: { animate: boolean }) {
  return (
    <g transform="translate(20, 232)">
      <rect width="560" height="68" rx="8" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.25" />
      {/* 24/7 clock */}
      <g transform="translate(32, 34)">
        <circle r="20" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.4" />
        <text y="-6" textAnchor="middle" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.55">
          24/7
        </text>
        {/* Hour hand */}
        <line x1="0" y1="0" x2="0" y2="-10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          {animate && (
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0"
              to="360"
              dur="20s"
              repeatCount="indefinite"
            />
          )}
        </line>
        {/* Minute hand */}
        <line x1="0" y1="0" x2="0" y2="-14" stroke="currentColor" strokeWidth="1" strokeOpacity="0.65" strokeLinecap="round">
          {animate && (
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0"
              to="360"
              dur="5s"
              repeatCount="indefinite"
            />
          )}
        </line>
        <circle r="1.5" fill="currentColor" />
      </g>
      {/* Right side: on-call info */}
      <g transform="translate(80, 20)">
        <text x="0" y="0" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.55">
          on-call rotation
        </text>
        <text x="0" y="14" fontSize="10" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.95">
          ops-3 · P1 ack 2m
        </text>
        <text x="0" y="30" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.65">
          avg response 12 min · SLA 15 min
        </text>
      </g>
      {/* Mini alert strip right */}
      <g transform="translate(320, 20)">
        <rect width="220" height="30" rx="4" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.2" />
        <circle cx="12" cy="15" r="2.5" fill="#22c55e">
          {animate && (
            <animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite" />
          )}
        </circle>
        <text x="22" y="12" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.55">
          last ack
        </text>
        <text x="22" y="22" fontSize="8" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.95">
          disk-full web-02 · auto-remediated
        </text>
      </g>
    </g>
  );
}
