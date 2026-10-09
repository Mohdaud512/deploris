'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * DesktopSupportAnimation — "Queue → L1/L2/L3 → resolved + on-site"
 *
 * Left:   incoming ticket queue with P1/P2/P3 priority badges
 * Middle: three horizontal lanes (L1, L2, L3). Each ticket passes through
 *         one lane based on priority; a tier label glows briefly as it
 *         passes.
 * Right:  resolved stack, with an SLA badge on each (ok / breach)
 * Top-right: an on-site dispatch van icon that occasionally travels
 *            across for a dispatch event.
 */

const CYCLE_MS = 1500;
const DISPATCH_INTERVAL = 5;
const QUEUE_SIZE = 5;

type Priority = 'P1' | 'P2' | 'P3';
type Ticket = { id: string; priority: Priority; minutes: number; title: string };

const TICKETS: Ticket[] = [
  { id: '#8114', priority: 'P1', minutes: 2,  title: 'laptop boot loop' },
  { id: '#8115', priority: 'P3', minutes: 48, title: 'teams audio drop' },
  { id: '#8116', priority: 'P2', minutes: 14, title: 'VPN cert expired' },
  { id: '#8117', priority: 'P1', minutes: 1,  title: 'ransom alert eng-07' },
  { id: '#8118', priority: 'P3', minutes: 90, title: 'printer offline' },
  { id: '#8119', priority: 'P2', minutes: 22, title: 'OneDrive sync hung' },
  { id: '#8120', priority: 'P3', minutes: 55, title: 'display scaling' },
  { id: '#8121', priority: 'P1', minutes: 3,  title: 'MFA locked' },
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

const PRIORITY_COLOR: Record<Priority, string> = {
  P1: '#ef4444',
  P2: '#f59e0b',
  P3: '#22c55e',
};

// Pick which lane handles a ticket: P1 → L3 (senior), P2 → L2, P3 → L1
const PRIORITY_LANE: Record<Priority, number> = { P1: 2, P2: 1, P3: 0 };

export function DesktopSupportAnimation() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInViewport(ref, 0.25);
  const reduce = usePrefersReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = window.setInterval(() => setTick((t) => t + 1), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  const activeTicket = TICKETS[tick % TICKETS.length]!;
  const lane = PRIORITY_LANE[activeTicket.priority];
  const dispatchTick = tick % DISPATCH_INTERVAL === 2;
  const animate = !reduce && inView;

  // Rolling queue + resolved. Queue shows upcoming tickets; resolved shows
  // what's been processed.
  const queueView = Array.from({ length: QUEUE_SIZE }).map((_, i) => TICKETS[(tick + i) % TICKETS.length]!);
  const resolvedView = Array.from({ length: 4 }).map((_, i) => {
    const t = tick - 1 - i;
    if (t < 0) return null;
    return TICKETS[t % TICKETS.length]!;
  });

  return (
    <svg
      ref={ref}
      viewBox="0 0 600 320"
      role="img"
      aria-label="Animated desktop support flow: incoming ticket queue routes by priority through L1/L2/L3 lanes to a resolved stack, with occasional on-site dispatch"
      className="h-auto w-full max-w-xl"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="ds-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="hero-breathe text-brand-900 dark:text-accent-400" style={{ transformOrigin: '300px 160px' }}>
        <QueuePanel tickets={queueView} />
        <LanesPanel activeLane={lane} activeTicket={activeTicket} animate={animate} tick={tick} />
        <ResolvedPanel tickets={resolvedView} />
        {animate && tick > 0 && (
          <FlyingTicket key={`fly-${tick}`} ticket={activeTicket} lane={lane} />
        )}
        {animate && dispatchTick && <DispatchVan key={`van-${tick}`} />}
      </g>
    </svg>
  );
}

function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <g>
      <rect width="20" height="12" rx="3" fill={PRIORITY_COLOR[priority]} fillOpacity="0.9" />
      <text x="10" y="9" textAnchor="middle" fontSize="7" fontFamily="ui-monospace, monospace" fill="#ffffff">
        {priority}
      </text>
    </g>
  );
}

function QueuePanel({ tickets }: { tickets: Ticket[] }) {
  return (
    <g transform="translate(20, 30)">
      <text x="0" y="-10" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.55">
        incoming queue
      </text>
      <rect x="-4" y="-4" width="150" height={QUEUE_SIZE * 36 + 8} rx="6" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.3" />
      {tickets.map((t, i) => (
        <g key={`${t.id}-${i}`} transform={`translate(0, ${i * 36})`}>
          <rect
            width="142"
            height="30"
            rx="4"
            fill="currentColor"
            fillOpacity={i === 0 ? 0.14 : 0.07 - i * 0.012}
            stroke="currentColor"
            strokeOpacity={i === 0 ? 0.6 : 0.3 - i * 0.05}
          />
          <g transform="translate(6, 4)">
            <PriorityBadge priority={t.priority} />
          </g>
          <text x="32" y="13" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity={i === 0 ? 0.95 : 0.7}>
            {t.id}
          </text>
          <text x="6" y="26" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity={i === 0 ? 0.85 : 0.6}>
            {t.title.slice(0, 24)}
          </text>
          {/* SLA mini-badge */}
          <rect x="110" y="4" width="28" height="10" rx="5" fill="currentColor" fillOpacity="0.1" />
          <text x="124" y="12" textAnchor="middle" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity={i === 0 ? 0.95 : 0.6}>
            {t.minutes}m
          </text>
        </g>
      ))}
    </g>
  );
}

function LanesPanel({
  activeLane,
  activeTicket,
  animate,
  tick,
}: {
  activeLane: number;
  activeTicket: Ticket;
  animate: boolean;
  tick: number;
}) {
  const lanes = ['L1', 'L2', 'L3'];
  const laneH = 50;
  const topY = 40;
  return (
    <g transform="translate(190, 30)">
      <text x="0" y="-10" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.55">
        tier routing · by priority
      </text>
      <rect x="-4" y="-4" width="220" height={lanes.length * laneH + 20} rx="6" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.3" />
      {lanes.map((label, i) => {
        const y = topY + i * laneH;
        const isActive = i === activeLane;
        return (
          <g key={label} transform={`translate(0, ${y})`}>
            {/* Lane body */}
            <rect
              width="212"
              height="40"
              rx="4"
              fill="currentColor"
              fillOpacity={isActive ? 0.14 : 0.05}
              stroke="currentColor"
              strokeOpacity={isActive ? 0.75 : 0.2}
              style={{ transition: 'fill-opacity 0.3s ease-out, stroke-opacity 0.3s ease-out' }}
            />
            {/* Lane label */}
            <text x="10" y="16" fontSize="8" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity={isActive ? 0.95 : 0.75} fontWeight="bold">
              {label}
            </text>
            <text x="10" y="30" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity={isActive ? 0.75 : 0.5}>
              {label === 'L1' ? 'first-touch · scripted' : label === 'L2' ? 'specialist · remote' : 'senior · remote+on-site'}
            </text>
            {/* Mini SLA strip */}
            <g transform="translate(140, 10)">
              <rect width="60" height="20" rx="3" fill="currentColor" fillOpacity="0.05" />
              <text x="30" y="8" textAnchor="middle" fontSize="5" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.55">
                SLA
              </text>
              <text x="30" y="16" textAnchor="middle" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity={isActive ? 0.95 : 0.75}>
                {label === 'L1' ? '4h' : label === 'L2' ? '2h' : '15m'}
              </text>
            </g>
            {/* Activity pulse at the right edge */}
            {isActive && animate && (
              <circle cx="208" cy="20" r="3" fill="currentColor" filter="url(#ds-glow)">
                <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1.3s" fill="freeze" />
              </circle>
            )}
          </g>
        );
      })}
      {/* "Now handling" strip under the lanes */}
      <g transform={`translate(0, ${topY + lanes.length * laneH + 6})`}>
        <text x="0" y="8" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.55">
          now · {activeTicket.id} {activeTicket.title}
        </text>
        <text x="212" y="8" textAnchor="end" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.55">
          elapsed t+{tick.toString().padStart(3, '0')}
        </text>
      </g>
    </g>
  );
}

function ResolvedPanel({ tickets }: { tickets: (Ticket | null)[] }) {
  return (
    <g transform="translate(438, 30)">
      <text x="0" y="-10" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.55">
        resolved
      </text>
      <rect x="-4" y="-4" width="150" height={tickets.length * 36 + 8} rx="6" fill="currentColor" fillOpacity="0.07" stroke="currentColor" strokeOpacity="0.35" />
      {tickets.map((t, i) => {
        if (!t) return null;
        const slaOk = t.minutes <= (t.priority === 'P1' ? 15 : t.priority === 'P2' ? 120 : 240);
        return (
          <g key={`${t.id}-r-${i}`} transform={`translate(0, ${i * 36})`} opacity={1 - i * 0.15}>
            <rect
              width="142"
              height="30"
              rx="4"
              fill="currentColor"
              fillOpacity="0.08"
              stroke="currentColor"
              strokeOpacity="0.3"
            />
            {/* Checkmark circle */}
            <circle cx="12" cy="15" r="5" fill="#22c55e" fillOpacity="0.9" />
            <path d="M 10 15 L 12 17 L 16 13" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <text x="22" y="13" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.9">
              {t.id}
            </text>
            <text x="22" y="24" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.65">
              {t.title.slice(0, 20)}
            </text>
            {/* SLA badge */}
            <rect x="104" y="8" width="32" height="14" rx="7" fill={slaOk ? '#22c55e' : '#ef4444'} fillOpacity="0.85" />
            <text x="120" y="18" textAnchor="middle" fontSize="6" fontFamily="ui-monospace, monospace" fill="#ffffff">
              {slaOk ? 'in SLA' : 'breach'}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function FlyingTicket({ ticket, lane }: { ticket: Ticket; lane: number }) {
  // Queue right edge → the active lane's center → resolved left edge
  const laneY = 30 + 40 + lane * 50 + 20;
  const d = `M 164 48 Q 240 ${laneY} 300 ${laneY} Q 360 ${laneY} 434 48`;
  return (
    <g filter="url(#ds-glow)">
      <g>
        <rect x="-30" y="-10" width="60" height="20" rx="4" fill={PRIORITY_COLOR[ticket.priority]} fillOpacity="0.95">
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
          {ticket.id}
        </text>
      </g>
    </g>
  );
}

function DispatchVan() {
  // Small van icon travels along the top from right to left (as if en route
  // to the on-site). Fades out.
  const d = 'M 580 18 L 420 18';
  return (
    <g filter="url(#ds-glow)">
      {/* Van group */}
      <g>
        <rect x="-18" y="-8" width="34" height="12" rx="2" fill="currentColor" fillOpacity="0.9" />
        {/* Cab window */}
        <rect x="-16" y="-6" width="8" height="6" rx="1" fill="#ffffff" fillOpacity="0.4" />
        {/* Wheels */}
        <circle cx="-10" cy="6" r="2.5" fill="currentColor" fillOpacity="0.95" />
        <circle cx="10" cy="6" r="2.5" fill="currentColor" fillOpacity="0.95" />
        <animateMotion path={d} dur="1.5s" fill="freeze" calcMode="spline" keySplines="0.42 0 0.58 1" keyTimes="0;1" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.8;1" dur="1.5s" fill="freeze" />
      </g>
      {/* "on-site: office B" label trailing above */}
      <g transform="translate(500, 2)" opacity="0">
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.3;0.9;1" dur="1.5s" fill="freeze" />
        <rect x="-50" y="-10" width="100" height="14" rx="3" fill="currentColor" fillOpacity="0.85" />
        <text x="0" y="0" textAnchor="middle" fontSize="7" fontFamily="ui-monospace, monospace" fill="#ffffff">
          on-site · office B
        </text>
      </g>
    </g>
  );
}
