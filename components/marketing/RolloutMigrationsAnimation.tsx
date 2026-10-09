'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * RolloutMigrationsAnimation — "Legacy → cutover → v2 (reversible)"
 *
 * Left:   stack of 8 "legacy v1" boxes (gradually fading as they migrate)
 * Middle: a big cutover controller with a toggle, a progress bar, and a
 *         "rollback ready" readout counting down the window
 * Right:  stack of 8 "v2" boxes that fill up as items migrate in
 *
 * Each cycle one item migrates: it fades out of the legacy stack, flies
 * through the controller, and fades into the v2 stack. The progress bar
 * advances. On the final migration the controller flips to "DONE" and
 * the rollback window begins ticking down.
 */

const CYCLE_MS = 1700;
const ITEM_COUNT = 8;

const ITEM_LABELS = [
  'web-01', 'web-02', 'api-gw', 'db-primary', 'db-replica', 'cache-01', 'queue-01', 'worker-01',
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

export function RolloutMigrationsAnimation() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInViewport(ref, 0.25);
  const reduce = usePrefersReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = window.setInterval(() => setTick((t) => t + 1), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  const migratedCount = (tick % (ITEM_COUNT + 1)); // 0..ITEM_COUNT, resets to 0 after full
  const inFlight = migratedCount > 0 && migratedCount <= ITEM_COUNT;
  const movingItem = inFlight ? ITEM_LABELS[(migratedCount - 1) % ITEM_LABELS.length]! : null;
  const progressPct = Math.min(100, (migratedCount / ITEM_COUNT) * 100);
  const isCutoverDone = migratedCount === ITEM_COUNT;
  const animate = !reduce && inView;

  return (
    <svg
      ref={ref}
      viewBox="0 0 600 320"
      role="img"
      aria-label="Animated migration: legacy stack on the left, cutover controller in the middle, v2 stack on the right. One workload migrates per cycle."
      className="h-auto w-full max-w-xl"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="rm-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="hero-breathe text-brand-900 dark:text-accent-400" style={{ transformOrigin: '300px 160px' }}>
        <LegacyStack migratedCount={migratedCount} />
        <Controller
          progressPct={progressPct}
          isCutoverDone={isCutoverDone}
          tick={tick}
          animate={animate}
        />
        <V2Stack migratedCount={migratedCount} />
        {animate && movingItem && (
          <FlyingItem key={`fly-${tick}`} label={movingItem} />
        )}
      </g>
    </svg>
  );
}

function LegacyStack({ migratedCount }: { migratedCount: number }) {
  return (
    <g transform="translate(20, 30)">
      <text x="0" y="-10" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.6">
        legacy · v1
      </text>
      <rect x="-4" y="-4" width="150" height={ITEM_COUNT * 28 + 8} rx="6" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.25" strokeDasharray="3 4" />
      {ITEM_LABELS.map((label, i) => {
        const migrated = i < migratedCount;
        return (
          <g key={label} transform={`translate(0, ${i * 28})`}>
            <rect
              width="142"
              height="22"
              rx="3"
              fill="currentColor"
              fillOpacity={migrated ? 0.03 : 0.1}
              stroke="currentColor"
              strokeOpacity={migrated ? 0.15 : 0.5}
              strokeDasharray={migrated ? '2 3' : undefined}
              style={{ transition: 'fill-opacity 0.4s ease-out, stroke-opacity 0.4s ease-out' }}
            />
            <circle cx="12" cy="11" r="2.4" fill="currentColor" fillOpacity={migrated ? 0.15 : 0.65} />
            <text
              x="22"
              y="15"
              fontSize="8"
              fontFamily="ui-monospace, monospace"
              fill="currentColor"
              fillOpacity={migrated ? 0.3 : 0.9}
              textDecoration={migrated ? 'line-through' : undefined}
            >
              {label}
            </text>
            <rect
              x="100"
              y="7"
              width="30"
              height="10"
              rx="5"
              fill="currentColor"
              fillOpacity={migrated ? 0.05 : 0.12}
              stroke="currentColor"
              strokeOpacity={migrated ? 0.15 : 0.3}
            />
            <text
              x="115"
              y="15"
              textAnchor="middle"
              fontSize="6"
              fontFamily="ui-monospace, monospace"
              fill="currentColor"
              fillOpacity={migrated ? 0.3 : 0.8}
            >
              {migrated ? 'moved' : 'v1'}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function V2Stack({ migratedCount }: { migratedCount: number }) {
  return (
    <g transform="translate(438, 30)">
      <text x="0" y="-10" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.75">
        v2 · production
      </text>
      <rect x="-4" y="-4" width="150" height={ITEM_COUNT * 28 + 8} rx="6" fill="currentColor" fillOpacity="0.07" stroke="currentColor" strokeOpacity="0.4" />
      {ITEM_LABELS.map((label, i) => {
        const migrated = i < migratedCount;
        return (
          <g key={label} transform={`translate(0, ${i * 28})`}>
            <rect
              width="142"
              height="22"
              rx="3"
              fill="currentColor"
              fillOpacity={migrated ? 0.14 : 0.03}
              stroke="currentColor"
              strokeOpacity={migrated ? 0.85 : 0.15}
              style={{ transition: 'fill-opacity 0.4s ease-out, stroke-opacity 0.4s ease-out' }}
            />
            {migrated && (
              <>
                <circle cx="12" cy="11" r="4" fill="#22c55e" fillOpacity="0.9" />
                <path d="M 10 11 L 12 13 L 15 9" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </>
            )}
            {!migrated && (
              <circle cx="12" cy="11" r="3" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeDasharray="1 1" />
            )}
            <text
              x="22"
              y="15"
              fontSize="8"
              fontFamily="ui-monospace, monospace"
              fill="currentColor"
              fillOpacity={migrated ? 0.95 : 0.4}
            >
              {label}
            </text>
            <rect
              x="100"
              y="7"
              width="30"
              height="10"
              rx="5"
              fill={migrated ? '#22c55e' : 'currentColor'}
              fillOpacity={migrated ? 0.9 : 0.07}
            />
            <text
              x="115"
              y="15"
              textAnchor="middle"
              fontSize="6"
              fontFamily="ui-monospace, monospace"
              fill={migrated ? '#ffffff' : 'currentColor'}
              fillOpacity={migrated ? 1 : 0.4}
            >
              {migrated ? 'LIVE' : 'wait'}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function Controller({
  progressPct,
  isCutoverDone,
  tick,
  animate,
}: {
  progressPct: number;
  isCutoverDone: boolean;
  tick: number;
  animate: boolean;
}) {
  const togglePos = Math.min(1, progressPct / 100);
  const toggleX = 20 + togglePos * 46; // moves from left to right in a 68-wide track
  const rollbackSecs = isCutoverDone ? Math.max(0, 180 - ((tick % 5) * 15)) : 180;

  return (
    <g transform="translate(188, 70)">
      {/* Panel */}
      <rect width="224" height="180" rx="10" fill="currentColor" fillOpacity="0.07" stroke="currentColor" strokeOpacity="0.4" />
      <text x="12" y="16" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.65">
        cutover controller
      </text>
      <circle cx="208" cy="14" r="2" fill="currentColor" fillOpacity="0.8">
        {animate && (
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
        )}
      </circle>

      {/* Big toggle */}
      <g transform="translate(66, 30)">
        <rect x="0" y="0" width="92" height="30" rx="15" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.3" />
        {/* Legacy / v2 labels inside the track */}
        <text x="18" y="19" textAnchor="middle" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity={togglePos < 0.5 ? 0.95 : 0.35}>
          v1
        </text>
        <text x="74" y="19" textAnchor="middle" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity={togglePos >= 0.5 ? 0.95 : 0.35}>
          v2
        </text>
        {/* Knob */}
        <circle
          cx={toggleX}
          cy="15"
          r="12"
          fill="currentColor"
          fillOpacity="0.9"
          style={{ transition: 'cx 0.5s cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
      </g>

      {/* Progress bar */}
      <g transform="translate(12, 82)">
        <text x="0" y="0" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.6">
          cutover progress
        </text>
        <rect x="0" y="6" width="200" height="8" rx="4" fill="currentColor" fillOpacity="0.08" />
        <rect
          x="0"
          y="6"
          width={200 * (progressPct / 100)}
          height="8"
          rx="4"
          fill="currentColor"
          fillOpacity="0.9"
          style={{ transition: 'width 0.5s cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
        <text x="200" y="26" textAnchor="end" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.85">
          {`${progressPct.toFixed(0)}% · ${Math.floor(progressPct / 100 * ITEM_COUNT)}/${ITEM_COUNT} items`}
        </text>
      </g>

      {/* Rollback readout */}
      <g transform="translate(12, 128)">
        <rect x="0" y="0" width="200" height="40" rx="6" fill="currentColor" fillOpacity={isCutoverDone ? 0.14 : 0.05} stroke="currentColor" strokeOpacity={isCutoverDone ? 0.75 : 0.25} />
        {/* Rollback icon (curved arrow) */}
        <g transform="translate(14, 20)">
          <path d="M 0 0 Q -5 -7 2 -7" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M 0 -8 L 2 -7 L 1 -4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <text x="30" y="14" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.65">
          rollback window
        </text>
        <text x="30" y="28" fontSize="11" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.95">
          {`${Math.floor(rollbackSecs / 60)}:${(rollbackSecs % 60).toString().padStart(2, '0')} ready`}
        </text>
        {isCutoverDone && (
          <g transform="translate(154, 10)">
            <rect width="40" height="20" rx="10" fill="#22c55e" fillOpacity="0.9" />
            <text x="20" y="14" textAnchor="middle" fontSize="7" fontFamily="ui-monospace, monospace" fill="#ffffff">
              DONE
            </text>
          </g>
        )}
      </g>
    </g>
  );
}

function FlyingItem({ label }: { label: string }) {
  // Legacy stack right edge → controller center → v2 stack left edge.
  const d = 'M 166 150 Q 300 100 300 160 Q 300 220 438 150';
  return (
    <g filter="url(#rm-glow)">
      <g>
        <rect x="-24" y="-10" width="48" height="20" rx="4" fill="currentColor" fillOpacity="0.95">
          <animateMotion
            path={d}
            dur="1.3s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.42 0 0.58 1"
            keyTimes="0;1"
          />
          <animate attributeName="opacity" values="0;1;1;0.9" keyTimes="0;0.1;0.9;1" dur="1.3s" fill="freeze" />
        </rect>
        <text y="4" textAnchor="middle" fontSize="7" fontFamily="ui-monospace, monospace" fill="#ffffff">
          <animateMotion
            path={d}
            dur="1.3s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.42 0 0.58 1"
            keyTimes="0;1"
          />
          <animate attributeName="opacity" values="0;1;1;0.9" keyTimes="0;0.1;0.9;1" dur="1.3s" fill="freeze" />
          {label}
        </text>
      </g>
    </g>
  );
}
