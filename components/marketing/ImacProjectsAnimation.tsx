'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * ImacProjectsAnimation — "Install · Move · Add · Change (+ asset ledger)"
 *
 * Left:  stylized office floor with 6 numbered workstations arranged on a
 *        3x2 grid, each with a desk + monitor + chair glyph. Workstations
 *        light up when they're the subject of this cycle's action.
 * Right: an asset ledger that scrolls new entries up — each ledger row
 *        shows action verb, asset tag, source → destination, and timestamp.
 *
 * Four actions rotate per cycle:
 *   I — Install: an empty desk gains a new monitor/computer
 *   M — Move: equipment slides from one desk to another
 *   A — Add: an existing station gains an accessory (dock / headset)
 *   C — Change: an existing station's hardware gets swapped
 *
 * The current action pill is rendered big at the top so viewers see which
 * verb is happening right now.
 */

const CYCLE_MS = 1800;
const WORKSTATION_COUNT = 6;
const ACTIONS = ['I', 'M', 'A', 'C'] as const;
type Action = (typeof ACTIONS)[number];

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

const WORKSTATION_POSITIONS: { x: number; y: number }[] = [
  { x: 60,  y: 60 },
  { x: 170, y: 60 },
  { x: 280, y: 60 },
  { x: 60,  y: 180 },
  { x: 170, y: 180 },
  { x: 280, y: 180 },
];

const ACTION_META: Record<Action, { label: string; verb: string; color: string }> = {
  I: { label: 'Install', verb: 'install', color: '#22c55e' },
  M: { label: 'Move',    verb: 'move',    color: '#3b82f6' },
  A: { label: 'Add',     verb: 'add',     color: '#8b5cf6' },
  C: { label: 'Change',  verb: 'change',  color: '#f59e0b' },
};

type LedgerEntry = {
  tick: number;
  action: Action;
  asset: string;
  from: string | null;
  to: string;
};

export function ImacProjectsAnimation() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInViewport(ref, 0.25);
  const reduce = usePrefersReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = window.setInterval(() => setTick((t) => t + 1), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  const action = ACTIONS[tick % ACTIONS.length]!;
  // Primary workstation for this cycle's action (always one deterministic
  // station per tick so the "WS-N" numbers line up with what viewers see).
  const primary = (tick * 2 + 1) % WORKSTATION_COUNT;
  const secondary = action === 'M' ? (primary + 3) % WORKSTATION_COUNT : -1;
  const animate = !reduce && inView;

  // Build a rolling ledger of 5 recent entries.
  const ledger: LedgerEntry[] = Array.from({ length: 5 }).map((_, i) => {
    const t = tick - i;
    if (t < 1) return null;
    const a = ACTIONS[t % ACTIONS.length]!;
    const prim = (t * 2 + 1) % WORKSTATION_COUNT;
    const sec = a === 'M' ? (prim + 3) % WORKSTATION_COUNT : -1;
    return {
      tick: t,
      action: a,
      asset: `A-${(2400 + t).toString()}`,
      from: a === 'M' ? `WS-0${prim + 1}` : a === 'I' ? 'stock' : `WS-0${prim + 1}`,
      to: a === 'M' ? `WS-0${sec + 1}` : `WS-0${prim + 1}`,
    };
  }).filter(Boolean) as LedgerEntry[];

  return (
    <svg
      ref={ref}
      viewBox="0 0 600 320"
      role="img"
      aria-label="Animated office floor with six workstations showing install, move, add, and change actions with an asset ledger"
      className="h-auto w-full max-w-xl"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="imac-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="hero-breathe text-brand-900 dark:text-accent-400" style={{ transformOrigin: '300px 160px' }}>
        <ActionBadge action={action} />
        <OfficeFloor primary={primary} secondary={secondary} action={action} animate={animate} tick={tick} />
        <AssetLedger entries={ledger} />
      </g>
    </svg>
  );
}

function ActionBadge({ action }: { action: Action }) {
  const meta = ACTION_META[action];
  return (
    <g transform="translate(20, 20)">
      <rect width="92" height="22" rx="11" fill={meta.color} fillOpacity="0.95" />
      <text x="12" y="15" fontSize="9" fontFamily="ui-monospace, monospace" fill="#ffffff" fontWeight="bold">
        {action}
      </text>
      <text x="26" y="15" fontSize="8" fontFamily="ui-monospace, monospace" fill="#ffffff">
        {meta.label}
      </text>
      {/* Letter breakdown */}
      <g transform="translate(118, 0)">
        {ACTIONS.map((a, i) => {
          const isCurrent = a === action;
          return (
            <g key={a} transform={`translate(${i * 18}, 0)`}>
              <rect width="14" height="22" rx="3" fill={isCurrent ? ACTION_META[a].color : 'currentColor'} fillOpacity={isCurrent ? 0.95 : 0.1} />
              <text x="7" y="15" textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill={isCurrent ? '#ffffff' : 'currentColor'} fillOpacity={isCurrent ? 1 : 0.65} fontWeight={isCurrent ? 'bold' : undefined}>
                {a}
              </text>
            </g>
          );
        })}
      </g>
    </g>
  );
}

function OfficeFloor({
  primary,
  secondary,
  action,
  animate,
  tick,
}: {
  primary: number;
  secondary: number;
  action: Action;
  animate: boolean;
  tick: number;
}) {
  return (
    <g>
      {/* Floor backdrop */}
      <rect x="20" y="46" width="340" height="200" rx="8" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeOpacity="0.25" strokeDasharray="3 4" />
      {/* Grid lines (floor tiles) */}
      <g stroke="currentColor" strokeOpacity="0.08">
        {Array.from({ length: 4 }).map((_, i) => (
          <line key={`v-${i}`} x1={20 + i * 86} y1={46} x2={20 + i * 86} y2={246} />
        ))}
        {Array.from({ length: 3 }).map((_, i) => (
          <line key={`h-${i}`} x1={20} y1={46 + i * 67} x2={360} y2={46 + i * 67} />
        ))}
      </g>
      {/* "FLOOR 3" label */}
      <text x="26" y="60" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.5">
        FLOOR 3 · 6 workstations · {WORKSTATION_COUNT - primary > 0 ? WORKSTATION_COUNT : 0}
      </text>

      {/* Workstations */}
      {WORKSTATION_POSITIONS.map((pos, i) => {
        const isPrimary = i === primary;
        const isSecondary = i === secondary;
        return (
          <Workstation
            key={i}
            idx={i}
            x={pos.x}
            y={pos.y}
            isPrimary={isPrimary}
            isSecondary={isSecondary}
            action={action}
            animate={animate}
            tick={tick}
          />
        );
      })}

      {/* Move arrow when this cycle's action is M */}
      {action === 'M' && secondary >= 0 && animate && (
        <MoveArrow from={WORKSTATION_POSITIONS[primary]!} to={WORKSTATION_POSITIONS[secondary]!} />
      )}
    </g>
  );
}

function Workstation({
  idx,
  x,
  y,
  isPrimary,
  isSecondary,
  action,
  animate,
  tick,
}: {
  idx: number;
  x: number;
  y: number;
  isPrimary: boolean;
  isSecondary: boolean;
  action: Action;
  animate: boolean;
  tick: number;
}) {
  const isActive = isPrimary || isSecondary;
  const color = isActive ? ACTION_META[action].color : undefined;
  // What's "on" the desk depends on action + which role (primary/secondary)
  // this workstation plays this cycle. We keep the base always-rendered so
  // the floor plan reads as populated, and overlay add/change markers on top.
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Floor pod outline (just a subtle rounded rect behind) */}
      <rect
        x="-26"
        y="-8"
        width="80"
        height="68"
        rx="6"
        fill={isActive ? color : 'currentColor'}
        fillOpacity={isActive ? 0.1 : 0.04}
        stroke={isActive ? color : 'currentColor'}
        strokeOpacity={isActive ? 0.75 : 0.2}
        strokeWidth={isActive ? 1.3 : 1}
        style={{ transition: 'fill-opacity 0.3s ease-out, stroke-opacity 0.3s ease-out' }}
      />

      {/* Desk (trapezoid) */}
      <path d="M -22 32 L 50 32 L 44 44 L -16 44 Z" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeOpacity="0.5" />
      {/* Chair */}
      <rect x="8" y="48" width="14" height="10" rx="2" fill="currentColor" fillOpacity="0.45" stroke="currentColor" strokeOpacity="0.5" />

      {/* Monitor — hidden if INSTALL action primary (will appear) */}
      {!(action === 'I' && isPrimary) && (
        <g>
          <rect x="4" y="4" width="22" height="16" rx="1.5" fill="currentColor" fillOpacity="0.75" />
          <rect x="12" y="20" width="6" height="4" fill="currentColor" fillOpacity="0.75" />
          <rect x="8" y="24" width="14" height="2" fill="currentColor" fillOpacity="0.5" />
        </g>
      )}

      {/* Install animation: monitor fades in on primary when action = I */}
      {action === 'I' && isPrimary && animate && (
        <g opacity="0">
          <animate attributeName="opacity" values="0;1" keyTimes="0;0.9" dur={`${CYCLE_MS / 1000 * 0.9}s`} fill="freeze" />
          <rect x="4" y="4" width="22" height="16" rx="1.5" fill={ACTION_META.I.color} fillOpacity="0.9" />
          <rect x="12" y="20" width="6" height="4" fill={ACTION_META.I.color} fillOpacity="0.9" />
          <rect x="8" y="24" width="14" height="2" fill={ACTION_META.I.color} fillOpacity="0.7" />
        </g>
      )}

      {/* Add animation: dock + headset appear next to monitor when A on primary */}
      {action === 'A' && isPrimary && animate && (
        <g opacity="0">
          <animate attributeName="opacity" values="0;1" keyTimes="0;0.9" dur={`${CYCLE_MS / 1000 * 0.9}s`} fill="freeze" />
          {/* Dock */}
          <rect x="30" y="12" width="8" height="8" rx="1" fill={ACTION_META.A.color} fillOpacity="0.95" />
          {/* Headset arc */}
          <path d="M 40 16 Q 46 10 46 18" fill="none" stroke={ACTION_META.A.color} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="46" cy="18" r="1.6" fill={ACTION_META.A.color} />
        </g>
      )}

      {/* Change animation: monitor pulses amber */}
      {action === 'C' && isPrimary && animate && (
        <rect x="4" y="4" width="22" height="16" rx="1.5" fill={ACTION_META.C.color} fillOpacity="0" stroke={ACTION_META.C.color} strokeOpacity="0">
          <animate attributeName="fill-opacity" values="0;0.5;0" keyTimes="0;0.5;1" dur="1.1s" fill="freeze" />
          <animate attributeName="stroke-opacity" values="0;0.9;0" keyTimes="0;0.5;1" dur="1.1s" fill="freeze" />
        </rect>
      )}

      {/* Workstation label */}
      <text y="-10" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity={isActive ? 0.9 : 0.5}>
        WS-0{idx + 1}
      </text>

      {/* Active ring */}
      {isActive && animate && (
        <rect x="-28" y="-10" width="84" height="72" rx="8" fill="none" stroke={color} strokeWidth="1.4" opacity="0">
          <animate attributeName="opacity" values="0;0.85;0" keyTimes="0;0.4;1" dur="1.1s" fill="freeze" />
        </rect>
      )}
      {/* Hidden tick consumer to keep subtree animation element re-keyed */}
      <text x="0" y="0" fontSize="0" opacity="0">
        {tick}
      </text>
    </g>
  );
}

function MoveArrow({ from, to }: { from: { x: number; y: number }; to: { x: number; y: number } }) {
  const fx = from.x + 14;
  const fy = from.y + 16;
  const tx = to.x + 14;
  const ty = to.y + 16;
  const mx = (fx + tx) / 2;
  const my = (fy + ty) / 2 - 20;
  const d = `M ${fx} ${fy} Q ${mx} ${my} ${tx} ${ty}`;
  return (
    <g>
      {/* Dashed guide path */}
      <path d={d} fill="none" stroke={ACTION_META.M.color} strokeOpacity="0.5" strokeWidth="1.2" strokeDasharray="3 3" />
      {/* Flying asset box */}
      <g filter="url(#imac-glow)">
        <rect x="-10" y="-6" width="20" height="12" rx="2" fill={ACTION_META.M.color} fillOpacity="0.95">
          <animateMotion
            path={d}
            dur="1.3s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.42 0 0.58 1"
            keyTimes="0;1"
          />
          <animate attributeName="opacity" values="0;1;1;0.95" keyTimes="0;0.1;0.9;1" dur="1.3s" fill="freeze" />
        </rect>
      </g>
    </g>
  );
}

function AssetLedger({ entries }: { entries: LedgerEntry[] }) {
  return (
    <g transform="translate(378, 46)">
      <text x="0" y="-10" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.55">
        asset ledger · tracked
      </text>
      <rect x="-4" y="-4" width="208" height={entries.length * 36 + 12} rx="6" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.3" />
      <circle cx="196" cy="2" r="2" fill="currentColor" fillOpacity="0.8">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
      </circle>
      {entries.map((e, i) => {
        const meta = ACTION_META[e.action];
        return (
          <g key={e.tick} transform={`translate(6, ${8 + i * 36})`} opacity={1 - i * 0.18}>
            {/* Row background */}
            <rect
              width="192"
              height="30"
              rx="4"
              fill="currentColor"
              fillOpacity={i === 0 ? 0.08 : 0.04}
            />
            {/* Letter chip */}
            <rect width="18" height="18" rx="3" x="4" y="6" fill={meta.color} fillOpacity={i === 0 ? 0.95 : 0.65} />
            <text x="13" y="19" textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="#ffffff" fontWeight="bold">
              {e.action}
            </text>
            {/* Asset tag + verb */}
            <text x="28" y="14" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity={i === 0 ? 0.95 : 0.75}>
              {e.asset}
            </text>
            <text x="28" y="24" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity={i === 0 ? 0.75 : 0.55}>
              {e.from ? `${e.from} → ${e.to}` : e.to}
            </text>
            {/* Timestamp */}
            <text x="188" y="20" textAnchor="end" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity={i === 0 ? 0.65 : 0.45}>
              t+{e.tick.toString().padStart(3, '0')}
            </text>
          </g>
        );
      })}
    </g>
  );
}
