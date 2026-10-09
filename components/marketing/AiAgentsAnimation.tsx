'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * AiAgentsAnimation — "Think → tool → observe → commit"
 *
 * Visualizes the agentic loop that's at the core of what Deploris's AI
 * agents actually do:
 *   center    — an agent "orb" with brain-ish inner geometry
 *   satellites — three tools around the orb: API, DB, Email
 *   bottom    — a live action log that scrolls new rows up as the agent
 *               takes each step
 *
 * Each cycle: the agent "thinks" (orb pulses), picks a tool (line to the
 * tool highlights, request packet travels orb→tool), the tool runs (tool
 * glyph lights up), returns a result (response packet travels back), and
 * the orb logs a new row at the bottom. Every ACTIONS_PER_TASK cycles a
 * "committed" chevron appears to mark one full task finishing.
 */

const CYCLE_MS = 1800;
const PACKET_DURATION = 0.6;
const ACTIONS_PER_TASK = 4;

type ToolId = 'api' | 'db' | 'email';
const TOOLS: { id: ToolId; label: string; angle: number }[] = [
  { id: 'api', label: 'api.fetch', angle: -90 },
  { id: 'db', label: 'db.query', angle: 30 },
  { id: 'email', label: 'send.mail', angle: 150 },
];

const ACTIONS: { tool: ToolId; verb: string; detail: string }[] = [
  { tool: 'db', verb: 'db.query', detail: "SELECT * FROM leads WHERE stage='Won' LIMIT 10" },
  { tool: 'api', verb: 'api.fetch', detail: 'GET /crm/accounts/a_8821 → 200 OK' },
  { tool: 'email', verb: 'send.mail', detail: 'to: ops@client.co · subject: Weekly roll-up' },
  { tool: 'db', verb: 'db.query', detail: 'UPDATE activities SET sent_at=now()' },
  { tool: 'api', verb: 'api.fetch', detail: 'POST /webhooks/notify → 204 No Content' },
  { tool: 'email', verb: 'send.mail', detail: 'to: finance@client.co · attach: invoice.pdf' },
  { tool: 'db', verb: 'db.query', detail: 'SELECT COUNT(*) FROM renewals_due' },
  { tool: 'api', verb: 'api.fetch', detail: 'GET /pricing/latest → cached, 200 OK' },
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

const AGENT = { x: 230, y: 140 };
const TOOL_RADIUS = 100;

// Round to 3 decimals so SSR and client agree on the exact string
// representation of trig outputs (otherwise React warns about a hydration
// mismatch when the two emit different trailing digits).
function round3(n: number): number {
  return Math.round(n * 1000) / 1000;
}

function toolPosition(angle: number): { x: number; y: number } {
  const rad = (angle * Math.PI) / 180;
  return {
    x: round3(AGENT.x + Math.cos(rad) * TOOL_RADIUS),
    y: round3(AGENT.y + Math.sin(rad) * TOOL_RADIUS),
  };
}

export function AiAgentsAnimation() {
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
  const activeToolIndex = TOOLS.findIndex((t) => t.id === action.tool);
  const activeTool = TOOLS[activeToolIndex]!;
  const toolPos = toolPosition(activeTool.angle);
  const taskCommitted = tick > 0 && tick % ACTIONS_PER_TASK === 0;
  const animate = !reduce && inView;

  // Keep a short rolling log of the last 4 actions.
  const logEntries = Array.from({ length: 4 }).map((_, i) => {
    const t = tick - i;
    if (t < 1) return null;
    return { tick: t, action: ACTIONS[(t - 1) % ACTIONS.length]! };
  });

  return (
    <svg
      ref={ref}
      viewBox="0 0 600 320"
      role="img"
      aria-label="Animated AI agent loop: a central agent orb selects one of three tools, dispatches a request, receives a result, and appends a line to its action log"
      className="h-auto w-full max-w-xl"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="ai-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="ai-orb-grad" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.65" />
          <stop offset="60%" stopColor="currentColor" stopOpacity="0.25" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className="hero-breathe text-brand-900 dark:text-accent-400" style={{ transformOrigin: '300px 160px' }}>
        {/* Soft halo around the agent */}
        <circle cx={AGENT.x} cy={AGENT.y} r="60" fill="url(#ai-orb-grad)" />

        {/* Spokes from agent to each tool */}
        {TOOLS.map((t, i) => {
          const pos = toolPosition(t.angle);
          const isActive = i === activeToolIndex;
          return (
            <line
              key={t.id}
              x1={AGENT.x}
              y1={AGENT.y}
              x2={pos.x}
              y2={pos.y}
              stroke="currentColor"
              strokeWidth={isActive ? 1.4 : 1}
              strokeOpacity={isActive ? 0.75 : 0.22}
              strokeDasharray={isActive ? undefined : '3 4'}
              style={{ transition: 'stroke-opacity 0.3s ease-out' }}
            />
          );
        })}

        {/* Tools */}
        {TOOLS.map((t, i) => (
          <Tool
            key={t.id}
            id={t.id}
            label={t.label}
            x={toolPosition(t.angle).x}
            y={toolPosition(t.angle).y}
            isActive={i === activeToolIndex}
            animate={animate}
            tick={tick}
          />
        ))}

        {/* Agent orb */}
        <AgentOrb animate={animate} tick={tick} />

        {/* Request/response packets */}
        {animate && tick > 0 && (
          <>
            <RequestPacket key={`req-${tick}`} to={toolPos} />
            <ResponsePacket key={`res-${tick}`} from={toolPos} />
          </>
        )}

        {/* Task-committed chevron (every ACTIONS_PER_TASK cycles) */}
        {animate && taskCommitted && <TaskCommitted key={`tc-${tick}`} />}

        <ActionLog entries={logEntries} />
      </g>
    </svg>
  );
}

function AgentOrb({ animate, tick }: { animate: boolean; tick: number }) {
  return (
    <g transform={`translate(${AGENT.x}, ${AGENT.y})`}>
      {/* Outer ring */}
      <circle r="26" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeOpacity="0.65" strokeWidth="1.4" />
      {/* Inner "neural" geometry — a few concentric arcs + nodes */}
      <circle r="18" fill="none" stroke="currentColor" strokeOpacity="0.4" strokeDasharray="3 4" />
      <circle r="10" fill="currentColor" fillOpacity="0.25" />
      {/* 6 inner nodes to suggest a graph */}
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2;
        const x = round3(Math.cos(a) * 12);
        const y = round3(Math.sin(a) * 12);
        return <circle key={i} cx={x} cy={y} r="1.6" fill="currentColor" fillOpacity="0.75" />;
      })}
      {/* Pulsing center dot — the "think" indicator */}
      <circle r="3" fill="currentColor" filter="url(#ai-glow)">
        {animate && (
          <animate
            attributeName="r"
            values="3;5;3"
            dur="0.9s"
            begin={`${CYCLE_MS / 1000 - 0.3}s`}
            fill="freeze"
          />
        )}
      </circle>
      {/* "AGENT" label below */}
      <text y="42" textAnchor="middle" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.75">
        agent
      </text>
      <text y="51" textAnchor="middle" fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.55">
        step {tick + 1}
      </text>
    </g>
  );
}

function Tool({
  id,
  label,
  x,
  y,
  isActive,
  animate,
  tick,
}: {
  id: ToolId;
  label: string;
  x: number;
  y: number;
  isActive: boolean;
  animate: boolean;
  tick: number;
}) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Tool pod */}
      <circle
        r="22"
        fill="currentColor"
        fillOpacity={isActive ? 0.18 : 0.07}
        stroke="currentColor"
        strokeOpacity={isActive ? 0.9 : 0.4}
        strokeWidth={isActive ? 1.4 : 1}
        style={{ transition: 'fill-opacity 0.3s ease-out, stroke-opacity 0.3s ease-out' }}
      />
      {/* Glyph */}
      <ToolGlyph id={id} />
      {/* Pulsing arc when active */}
      {isActive && animate && (
        <circle
          r="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            values="0;0.8;0"
            keyTimes="0;0.4;1"
            dur="0.9s"
            begin={`${PACKET_DURATION * 0.9}s`}
            fill="freeze"
          />
          <animate
            attributeName="r"
            values="22;36"
            dur="0.9s"
            begin={`${PACKET_DURATION * 0.9}s`}
            fill="freeze"
          />
        </circle>
      )}
      {/* Label */}
      <text y="38" textAnchor="middle" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.8">
        {label}
      </text>
      {/* Hidden tick consumer */}
      <text x="0" y="0" fontSize="0" opacity="0">
        {tick}
      </text>
    </g>
  );
}

function ToolGlyph({ id }: { id: ToolId }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.3, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (id === 'api') {
    // Angle brackets
    return (
      <g>
        <path d="M -8 -6 L -12 0 L -8 6" {...common} />
        <path d="M 8 -6 L 12 0 L 8 6" {...common} />
        <line x1="-4" y1="7" x2="4" y2="-7" {...common} />
      </g>
    );
  }
  if (id === 'db') {
    // Cylinder
    return (
      <g>
        <ellipse cx="0" cy="-7" rx="10" ry="3" {...common} />
        <path d="M -10 -7 L -10 6" {...common} />
        <path d="M 10 -7 L 10 6" {...common} />
        <path d="M -10 6 Q 0 10 10 6" {...common} />
        <ellipse cx="0" cy="-2" rx="10" ry="3" {...common} />
      </g>
    );
  }
  // email: envelope
  return (
    <g>
      <rect x="-10" y="-6" width="20" height="13" rx="1.5" {...common} />
      <path d="M -10 -6 L 0 2 L 10 -6" {...common} />
    </g>
  );
}

function RequestPacket({ to }: { to: { x: number; y: number } }) {
  // Agent → tool.
  const d = `M ${AGENT.x} ${AGENT.y} L ${to.x} ${to.y}`;
  return (
    <circle r="3.4" fill="currentColor" filter="url(#ai-glow)">
      <animateMotion
        path={d}
        dur={`${PACKET_DURATION}s`}
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
        dur={`${PACKET_DURATION}s`}
        fill="freeze"
      />
    </circle>
  );
}

function ResponsePacket({ from }: { from: { x: number; y: number } }) {
  // Tool → agent. Fires after the request + the tool-run has had a moment.
  const d = `M ${from.x} ${from.y} L ${AGENT.x} ${AGENT.y}`;
  return (
    <circle r="3" fill="currentColor" filter="url(#ai-glow)">
      <animateMotion
        path={d}
        dur={`${PACKET_DURATION * 0.8}s`}
        begin={`${PACKET_DURATION + 0.4}s`}
        fill="freeze"
        calcMode="spline"
        keySplines="0.42 0 0.58 1"
        keyTimes="0;1"
      />
      <animate
        attributeName="opacity"
        values="0;0;1;1;0"
        keyTimes="0;0.5;0.6;0.95;1"
        dur={`${PACKET_DURATION * 2}s`}
        fill="freeze"
      />
    </circle>
  );
}

function TaskCommitted() {
  // Small "task committed" chevron that fades in and out at the top-right.
  return (
    <g transform="translate(520, 20)" opacity="0">
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.4s" fill="freeze" />
      <rect x="0" y="0" width="60" height="14" rx="7" fill="#22c55e" fillOpacity="0.85" />
      <path d="M 6 7 L 10 11 L 16 4" fill="none" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <text x="36" y="10" textAnchor="middle" fontSize="6" fontFamily="ui-monospace, monospace" fill="#ffffff">
        task done
      </text>
    </g>
  );
}

function ActionLog({ entries }: { entries: ({ tick: number; action: typeof ACTIONS[number] } | null)[] }) {
  const baseY = 250;
  const rowHeight = 15;
  return (
    <g>
      {/* Panel */}
      <rect
        x="20"
        y={baseY - 10}
        width="560"
        height={rowHeight * entries.length + 20}
        rx="8"
        fill="currentColor"
        fillOpacity="0.05"
        stroke="currentColor"
        strokeOpacity="0.25"
      />
      <text x="32" y={baseY + 2} fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.55">
        action log
      </text>
      <circle cx="562" cy={baseY - 1} r="2" fill="currentColor" fillOpacity="0.75">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
      </circle>
      {/* Rows */}
      {entries.map((e, i) => {
        if (!e) return null;
        const y = baseY + 14 + i * rowHeight;
        const isNewest = i === 0;
        return (
          <g key={e.tick} opacity={1 - i * 0.22}>
            <text
              x="32"
              y={y}
              fontSize="6.5"
              fontFamily="ui-monospace, monospace"
              fill="currentColor"
              fillOpacity={isNewest ? 0.55 : 0.4}
            >
              {`t+${e.tick.toString().padStart(3, '0')}`}
            </text>
            <text
              x="72"
              y={y}
              fontSize="7"
              fontFamily="ui-monospace, monospace"
              fill="currentColor"
              fillOpacity={isNewest ? 0.95 : 0.65}
            >
              {e.action.verb}
            </text>
            <text
              x="138"
              y={y}
              fontSize="6.5"
              fontFamily="ui-monospace, monospace"
              fill="currentColor"
              fillOpacity={isNewest ? 0.85 : 0.55}
            >
              → {e.action.detail}
            </text>
          </g>
        );
      })}
    </g>
  );
}
