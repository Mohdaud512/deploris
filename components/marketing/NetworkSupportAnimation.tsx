'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * NetworkSupportAnimation — "Multi-site + firewall + SD-WAN"
 *
 * Left:  Site A — building with a router
 * Right: Site B — building with a router
 * Middle: a WAN cloud with a firewall "scanner" that inspects every packet.
 *         Most pass through (allow); occasionally one is DENIED and bounces
 *         back with a red X. An SD-WAN decision diamond above the firewall
 *         picks between two WAN links (MPLS vs. Internet).
 * Bottom: change-window strip listing scheduled changes rolling through.
 */

const CYCLE_MS = 1300;
const DENY_INTERVAL = 5;

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

const SITE_A = { x: 70, y: 150 };
const SITE_B = { x: 530, y: 150 };
const FIREWALL = { x: 300, y: 150 };

const CHANGES = [
  'approved · route update AS174 → AS3356',
  'approved · firewall rule FW-204 allow 10.9/16',
  'scheduled · SD-WAN failover drill',
  'approved · patch EdgeOS 2.4.1 → 2.4.3',
  'applied  · BGP neighbor reset site-c',
];

export function NetworkSupportAnimation() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInViewport(ref, 0.25);
  const reduce = usePrefersReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = window.setInterval(() => setTick((t) => t + 1), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  const direction = tick % 2 === 0 ? 'ab' : 'ba'; // alternate directions
  const isDeny = tick % DENY_INTERVAL === 4;
  const sdWanPath = tick % 2 === 0 ? 'mpls' : 'internet';
  const animate = !reduce && inView;

  return (
    <svg
      ref={ref}
      viewBox="0 0 600 320"
      role="img"
      aria-label="Animated multi-site network: two sites connected by a WAN link with a firewall inspecting every packet and an SD-WAN selector picking the path"
      className="h-auto w-full max-w-xl"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="ns-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="hero-breathe text-brand-900 dark:text-accent-400" style={{ transformOrigin: '300px 160px' }}>
        {/* WAN cloud backdrop */}
        <WANBackdrop />
        {/* Sites */}
        <Site label="SITE A" ip="10.1.0.0/16" pos={SITE_A} animate={animate} />
        <Site label="SITE B" ip="10.2.0.0/16" pos={SITE_B} animate={animate} />
        {/* SD-WAN selector + two paths */}
        <SdWan path={sdWanPath} />
        {/* Firewall */}
        <Firewall animate={animate} isDeny={isDeny} tick={tick} />
        {/* Packet in flight */}
        {animate && tick > 0 && (
          <TrafficPacket
            key={`pkt-${tick}`}
            direction={direction}
            isDeny={isDeny}
            viaMpls={sdWanPath === 'mpls'}
          />
        )}
        {/* Change window */}
        <ChangeWindow tick={tick} />
      </g>
    </svg>
  );
}

function WANBackdrop() {
  return (
    <g opacity="0.5">
      {/* Loose cloud silhouette behind the firewall */}
      <path
        d="M 180 150 C 180 118, 208 100, 234 108 C 242 86, 274 80, 290 92 C 300 76, 332 76, 346 92 C 374 84, 404 108, 400 134 C 420 148, 420 174, 392 184 C 380 206, 342 212, 322 196 C 304 212, 268 210, 256 192 C 232 206, 198 196, 192 174 C 174 170, 170 158, 180 150 Z"
        fill="currentColor"
        fillOpacity="0.04"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeDasharray="3 4"
      />
      <text x="300" y="118" textAnchor="middle" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.55">
        WAN
      </text>
    </g>
  );
}

function Site({
  label,
  ip,
  pos,
  animate,
}: {
  label: string;
  ip: string;
  pos: { x: number; y: number };
  animate: boolean;
}) {
  return (
    <g transform={`translate(${pos.x}, ${pos.y})`}>
      {/* Building silhouette */}
      <rect x="-32" y="-40" width="64" height="80" rx="4" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.5" />
      {/* Windows */}
      {Array.from({ length: 4 }).map((_, r) => (
        <g key={r}>
          {Array.from({ length: 3 }).map((_, c) => (
            <rect
              key={c}
              x={-24 + c * 16}
              y={-32 + r * 18}
              width="10"
              height="10"
              rx="1"
              fill="currentColor"
              fillOpacity={(r + c) % 2 === 0 ? 0.3 : 0.5}
            />
          ))}
        </g>
      ))}
      {/* Roof-mounted router */}
      <g transform="translate(0, -48)">
        <rect x="-18" y="-6" width="36" height="12" rx="2" fill="currentColor" fillOpacity="0.75" />
        {/* Antennas */}
        <line x1="-10" y1="-6" x2="-10" y2="-14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="0" y1="-6" x2="0" y2="-16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="10" y1="-6" x2="10" y2="-14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        {/* Status LED */}
        <circle cx="0" cy="0" r="1.6" fill="#22c55e">
          {animate && (
            <animate attributeName="opacity" values="0.5;1;0.5" dur="1.6s" repeatCount="indefinite" />
          )}
        </circle>
      </g>
      {/* Label */}
      <text y="56" textAnchor="middle" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.95">
        {label}
      </text>
      <text y="66" textAnchor="middle" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.6">
        {ip}
      </text>
    </g>
  );
}

function SdWan({ path }: { path: 'mpls' | 'internet' }) {
  // A small diamond above the firewall, with two labelled branches: MPLS
  // (top path, straight) and Internet (bottom path, dipping below the firewall).
  return (
    <g>
      {/* MPLS path (straight through firewall) */}
      <path
        d={`M 102 ${SITE_A.y} L 528 ${SITE_B.y}`}
        fill="none"
        stroke="currentColor"
        strokeOpacity={path === 'mpls' ? 0.8 : 0.25}
        strokeWidth={path === 'mpls' ? 1.4 : 1}
        strokeDasharray="3 4"
      />
      {/* Internet path (dips below the firewall) */}
      <path
        d="M 102 150 Q 300 240 528 150"
        fill="none"
        stroke="currentColor"
        strokeOpacity={path === 'internet' ? 0.8 : 0.25}
        strokeWidth={path === 'internet' ? 1.4 : 1}
        strokeDasharray="3 4"
      />
      {/* Diamond selector */}
      <g transform={`translate(${FIREWALL.x}, 60)`}>
        <path d="M 0 -10 L 18 0 L 0 10 L -18 0 Z" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeOpacity="0.6" />
        <text y="2" textAnchor="middle" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.9">
          SD-WAN
        </text>
        <text y="22" textAnchor="middle" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.7">
          via {path}
        </text>
      </g>
      {/* Path labels at the branch points */}
      <text x="200" y="140" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity={path === 'mpls' ? 0.85 : 0.4}>
        MPLS
      </text>
      <text x="200" y="226" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity={path === 'internet' ? 0.85 : 0.4}>
        Internet
      </text>
    </g>
  );
}

function Firewall({ animate, isDeny, tick }: { animate: boolean; isDeny: boolean; tick: number }) {
  // A tall rectangle with "FW" text + scanning bar that sweeps top-bottom.
  const color = isDeny ? '#ef4444' : 'currentColor';
  return (
    <g transform={`translate(${FIREWALL.x}, ${FIREWALL.y})`}>
      {/* Firewall body */}
      <rect
        x="-14"
        y="-40"
        width="28"
        height="80"
        rx="3"
        fill="currentColor"
        fillOpacity="0.12"
        stroke={color}
        strokeOpacity={isDeny ? 0.95 : 0.6}
        strokeWidth={isDeny ? 1.5 : 1}
      />
      {/* "Brick wall" texture */}
      {Array.from({ length: 7 }).map((_, i) => (
        <line
          key={i}
          x1="-14"
          y1={-40 + (i + 1) * 10}
          x2="14"
          y2={-40 + (i + 1) * 10}
          stroke="currentColor"
          strokeOpacity="0.2"
        />
      ))}
      {/* Scan bar sweeping down */}
      {animate && (
        <rect
          key={`scan-${tick}`}
          x="-14"
          y="-40"
          width="28"
          height="4"
          fill="currentColor"
          fillOpacity="0.6"
        >
          <animate attributeName="y" values="-40;40" dur={`${CYCLE_MS / 1000}s`} repeatCount="indefinite" />
        </rect>
      )}
      {/* FW label */}
      <text y="2" textAnchor="middle" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.95" fontWeight="bold">
        FW
      </text>
      {/* Verdict badge */}
      <g transform="translate(0, 56)">
        <rect
          x="-30"
          y="-8"
          width="60"
          height="16"
          rx="8"
          fill={isDeny ? '#ef4444' : '#22c55e'}
          fillOpacity="0.9"
        />
        <text y="4" textAnchor="middle" fontSize="7" fontFamily="ui-monospace, monospace" fill="#ffffff">
          {isDeny ? 'DENY' : 'ALLOW'}
        </text>
      </g>
    </g>
  );
}

function TrafficPacket({
  direction,
  isDeny,
  viaMpls,
}: {
  direction: 'ab' | 'ba';
  isDeny: boolean;
  viaMpls: boolean;
}) {
  // Build a path based on direction + sd-wan path. On deny, after reaching
  // the firewall, the packet bounces back halfway and fades red.
  const start = direction === 'ab' ? SITE_A : SITE_B;
  const end = direction === 'ab' ? SITE_B : SITE_A;
  const mid = { x: FIREWALL.x, y: viaMpls ? FIREWALL.y : 230 };
  const toFw = `M ${start.x + (direction === 'ab' ? 32 : -32)} ${start.y} Q ${(start.x + mid.x) / 2} ${mid.y} ${mid.x} ${mid.y}`;
  const fromFw = `M ${mid.x} ${mid.y} Q ${(end.x + mid.x) / 2} ${mid.y} ${end.x + (direction === 'ab' ? -32 : 32)} ${end.y}`;
  const bounce = `M ${mid.x} ${mid.y} Q ${(start.x + mid.x) / 2} ${mid.y} ${start.x + (direction === 'ab' ? 32 : -32)} ${start.y}`;

  const fillColor = isDeny ? '#ef4444' : 'currentColor';
  const second = isDeny ? bounce : fromFw;

  return (
    <g>
      <circle r="3.4" fill={fillColor} filter="url(#ns-glow)">
        <animateMotion
          path={toFw}
          dur="0.6s"
          begin="0s"
          fill="freeze"
          calcMode="spline"
          keySplines="0.42 0 0.58 1"
          keyTimes="0;1"
        />
        <animate attributeName="opacity" values="0;1" keyTimes="0;0.2" dur="0.6s" begin="0s" fill="freeze" />
      </circle>
      <circle r="3.4" fill={fillColor} filter="url(#ns-glow)" opacity="0">
        <animate attributeName="opacity" values="0;1" keyTimes="0;0.05" dur="0.55s" begin="0.65s" fill="freeze" />
        <animateMotion
          path={second}
          dur="0.55s"
          begin="0.65s"
          fill="freeze"
          calcMode="spline"
          keySplines="0.42 0 0.58 1"
          keyTimes="0;1"
        />
        <animate attributeName="opacity" values="1;0.3" keyTimes="0;1" dur="0.55s" begin="0.65s" fill="freeze" />
      </circle>
    </g>
  );
}

function ChangeWindow({ tick }: { tick: number }) {
  // Three visible entries. Newest at top.
  const entries = Array.from({ length: 3 }).map((_, i) => {
    const t = tick - i;
    if (t < 1) return null;
    return { tick: t, line: CHANGES[(t - 1) % CHANGES.length]! };
  });
  return (
    <g transform="translate(20, 258)">
      <rect width="560" height="54" rx="6" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.25" />
      <text x="10" y="12" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.55">
        change window · live
      </text>
      <circle cx="548" cy="9" r="2" fill="currentColor" fillOpacity="0.75">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
      </circle>
      {entries.map((e, i) => {
        if (!e) return null;
        return (
          <g key={e.tick} opacity={1 - i * 0.25}>
            <text x="10" y={25 + i * 11} fontSize="6.5" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity={i === 0 ? 0.55 : 0.4}>
              {`t+${e.tick.toString().padStart(3, '0')}`}
            </text>
            <text x="48" y={25 + i * 11} fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity={i === 0 ? 0.95 : 0.65}>
              {e.line}
            </text>
          </g>
        );
      })}
    </g>
  );
}
