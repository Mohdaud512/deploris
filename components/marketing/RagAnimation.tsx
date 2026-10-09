'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * RagAnimation — "Question → chunks → answer"
 *
 * Literal visualization of what RAG does:
 *   top    — a question bubble appears and typewrites
 *   middle — a horizontal strip of 24 document chunks; on each cycle a
 *            random-but-deterministic 3 light up (the "retrieved" set)
 *   bottom — an answer composes word-by-word, with small citation badges
 *            that reference the specific chunks that were retrieved
 *
 * Each cycle picks a different question + a different retrieval set + a
 * different answer, so the piece reads as a real RAG endpoint handling a
 * stream of real queries, not a mock-up.
 */

const CYCLE_MS = 4000;
const CHUNK_COUNT = 24;

const QUESTIONS: string[] = [
  'What is our refund policy?',
  'How do we handle data residency in the EU?',
  'What SLA do we offer on managed infra?',
  'Which CRMs can we migrate from?',
  'How is prompt injection mitigated?',
];

// Each answer is a sequence of word tokens. Numbers map to chunk indices
// that each word cites — rendered as small superscript badges.
type AnswerToken = { text: string; cite?: number };
const ANSWERS: { tokens: AnswerToken[]; chunks: number[] }[] = [
  {
    chunks: [3, 11, 18],
    tokens: [
      { text: 'Refunds' },
      { text: 'are' },
      { text: 'granted' },
      { text: 'within' },
      { text: '30 days', cite: 1 },
      { text: 'of' },
      { text: 'invoice,' },
      { text: 'per' },
      { text: 'policy', cite: 2 },
      { text: 'section', cite: 2 },
      { text: '4.2', cite: 2 },
      { text: 'and' },
      { text: 'contract', cite: 3 },
      { text: 'clause', cite: 3 },
      { text: '7.' },
    ],
  },
  {
    chunks: [1, 9, 20],
    tokens: [
      { text: 'EU' },
      { text: 'data' },
      { text: 'stays' },
      { text: 'in' },
      { text: 'fra1', cite: 1 },
      { text: 'under' },
      { text: 'the' },
      { text: 'DPA', cite: 2 },
      { text: 'with' },
      { text: 'subprocessors', cite: 3 },
      { text: 'listed' },
      { text: 'in' },
      { text: 'the' },
      { text: 'register.' },
    ],
  },
  {
    chunks: [6, 14, 22],
    tokens: [
      { text: 'Managed' },
      { text: 'infra' },
      { text: 'ships' },
      { text: 'with' },
      { text: '99.9%', cite: 1 },
      { text: 'uptime,' },
      { text: '15-min', cite: 2 },
      { text: 'P1' },
      { text: 'response,' },
      { text: 'and' },
      { text: 'written', cite: 3 },
      { text: 'quarterly', cite: 3 },
      { text: 'reports.' },
    ],
  },
  {
    chunks: [2, 10, 17],
    tokens: [
      { text: 'We' },
      { text: 'migrate' },
      { text: 'from' },
      { text: 'HubSpot,', cite: 1 },
      { text: 'Salesforce,', cite: 1 },
      { text: 'Pipedrive,' },
      { text: 'and' },
      { text: 'legacy', cite: 2 },
      { text: 'in-house', cite: 2 },
      { text: 'tools', cite: 2 },
      { text: 'via' },
      { text: 'typed', cite: 3 },
      { text: 'ETL.' },
    ],
  },
  {
    chunks: [4, 12, 19],
    tokens: [
      { text: 'Injection' },
      { text: 'is' },
      { text: 'blocked' },
      { text: 'by' },
      { text: 'tagged', cite: 1 },
      { text: 'retrieval', cite: 1 },
      { text: 'boundaries,' },
      { text: 'system', cite: 2 },
      { text: 'reminders,' },
      { text: 'and' },
      { text: 'tool', cite: 3 },
      { text: 'allow-lists.' },
    ],
  },
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

// Progressive revealer: given a target string and a tick count that advances
// each animation frame, return the substring to currently display.
function useTypewriter(text: string, enabled: boolean, msPerChar = 30): string {
  const [shown, setShown] = useState(enabled ? '' : text);
  useEffect(() => {
    if (!enabled) {
      setShown(text);
      return;
    }
    setShown('');
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, msPerChar);
    return () => window.clearInterval(id);
  }, [text, enabled, msPerChar]);
  return shown;
}

export function RagAnimation() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInViewport(ref, 0.25);
  const reduce = usePrefersReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = window.setInterval(() => setTick((t) => t + 1), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  const q = QUESTIONS[tick % QUESTIONS.length]!;
  const a = ANSWERS[tick % ANSWERS.length]!;
  const animate = !reduce && inView;
  const shownQuestion = useTypewriter(q, animate, 22);
  const answerVisibleTokens = useAnswerReveal(a.tokens.length, animate);

  return (
    <svg
      ref={ref}
      viewBox="0 0 600 320"
      role="img"
      aria-label="Animated RAG pipeline: a question arrives, a few document chunks are retrieved, and an answer composes with inline citations"
      className="h-auto w-full max-w-xl"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="rag-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="hero-breathe text-brand-900 dark:text-accent-400" style={{ transformOrigin: '300px 160px' }}>
        <QuestionBubble key={`q-${tick}`} text={shownQuestion} />
        <ChunkStrip retrieved={a.chunks} tick={tick} animate={animate} />
        <RetrievalLines retrieved={a.chunks} animate={animate} />
        <AnswerBox tokens={a.tokens} visible={answerVisibleTokens} retrieved={a.chunks} />
      </g>
    </svg>
  );
}

// Reveal answer tokens one at a time with a modest cadence (after retrieval
// has finished). Caps at a reveal of all tokens for the remainder of the
// cycle.
function useAnswerReveal(total: number, enabled: boolean): number {
  const [n, setN] = useState(enabled ? 0 : total);
  useEffect(() => {
    if (!enabled) {
      setN(total);
      return;
    }
    setN(0);
    // Start after the question has had time to typewriter in and chunks
    // have lit up.
    const startDelay = 1700;
    const perToken = 110;
    const id = window.setTimeout(() => {
      let i = 0;
      const iv = window.setInterval(() => {
        i += 1;
        setN(i);
        if (i >= total) window.clearInterval(iv);
      }, perToken);
      // store on element to allow cleanup
      (window as unknown as { __ragIv?: number }).__ragIv = iv;
    }, startDelay);
    return () => {
      window.clearTimeout(id);
      const iv = (window as unknown as { __ragIv?: number }).__ragIv;
      if (iv) window.clearInterval(iv);
    };
  }, [total, enabled]);
  return n;
}

function QuestionBubble({ text }: { text: string }) {
  return (
    <g>
      {/* Avatar + bubble */}
      <circle cx="26" cy="30" r="12" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.4" />
      <circle cx="26" cy="26" r="4" fill="currentColor" fillOpacity="0.65" />
      <path d="M 18 38 Q 26 32 34 38" fill="none" stroke="currentColor" strokeOpacity="0.65" strokeWidth="1.2" />
      {/* Bubble shape */}
      <path
        d="M 48 14 L 580 14 Q 592 14 592 26 L 592 48 Q 592 60 580 60 L 60 60 L 48 70 L 48 60 Q 48 60 48 58 L 48 26 Q 48 14 60 14 Z"
        fill="currentColor"
        fillOpacity="0.08"
        stroke="currentColor"
        strokeOpacity="0.3"
      />
      {/* Prompt label */}
      <text x="58" y="28" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.5">
        user asked
      </text>
      {/* Question text */}
      <text x="58" y="48" fontSize="12" fontFamily="system-ui, sans-serif" fill="currentColor" fillOpacity="0.95">
        {text}
        <tspan dx="2" dy="-1" fontSize="12" fillOpacity="0.5">▎</tspan>
      </text>
    </g>
  );
}

function ChunkStrip({
  retrieved,
  tick,
  animate,
}: {
  retrieved: number[];
  tick: number;
  animate: boolean;
}) {
  // 24 chunks laid out in a 2x12 grid representing a document corpus.
  const cols = 12;
  const stripX = 20;
  const stripY = 95;
  const cellW = 46;
  const cellH = 22;
  const gap = 2;

  return (
    <g>
      <text x={stripX} y={stripY - 8} fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.5">
        corpus · {CHUNK_COUNT} chunks
      </text>
      <text
        x={stripX + 420}
        y={stripY - 8}
        fontSize="7"
        fontFamily="ui-monospace, monospace"
        fill="currentColor"
        fillOpacity="0.65"
      >
        retrieved {retrieved.length}
      </text>
      {Array.from({ length: CHUNK_COUNT }).map((_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = stripX + col * (cellW + gap);
        const y = stripY + row * (cellH + gap);
        const retrievedIndex = retrieved.indexOf(i);
        const isLit = retrievedIndex >= 0;
        return (
          <g key={i} transform={`translate(${x}, ${y})`}>
            <rect
              width={cellW}
              height={cellH}
              rx="3"
              fill="currentColor"
              fillOpacity={isLit ? 0.75 : 0.07}
              stroke="currentColor"
              strokeOpacity={isLit ? 0.9 : 0.2}
              strokeWidth={isLit ? 1.2 : 1}
              filter={isLit && animate ? 'url(#rag-glow)' : undefined}
              style={{ transition: 'fill-opacity 0.4s ease-out, stroke-opacity 0.4s ease-out' }}
            />
            {/* Mini "text lines" inside each chunk */}
            <rect
              x="4"
              y="5"
              width={cellW - 14}
              height="2"
              rx="1"
              fill="#ffffff"
              fillOpacity={isLit ? 0.65 : 0.25}
            />
            <rect
              x="4"
              y="10"
              width={cellW - 20}
              height="2"
              rx="1"
              fill="#ffffff"
              fillOpacity={isLit ? 0.5 : 0.18}
            />
            <rect
              x="4"
              y="15"
              width={cellW - 24}
              height="2"
              rx="1"
              fill="#ffffff"
              fillOpacity={isLit ? 0.4 : 0.14}
            />
            {/* Index badge when retrieved */}
            {isLit && (
              <g>
                <circle cx={cellW - 7} cy="7" r="5" fill="#ffffff" fillOpacity="0.9" />
                <text
                  x={cellW - 7}
                  y="9.5"
                  textAnchor="middle"
                  fontSize="6"
                  fontFamily="ui-monospace, monospace"
                  fill="currentColor"
                  fillOpacity="0.95"
                >
                  {retrievedIndex + 1}
                </text>
              </g>
            )}
          </g>
        );
      })}
      {/* Scan sweep over the strip when a new retrieval fires. */}
      {animate && (
        <rect
          key={`sweep-${tick}`}
          x={stripX}
          y={stripY}
          width="30"
          height={cellH * 2 + gap}
          fill="currentColor"
          fillOpacity="0"
        >
          <animate
            attributeName="x"
            values={`${stripX};${stripX + cols * (cellW + gap) - 30}`}
            dur="1.2s"
            fill="freeze"
          />
          <animate
            attributeName="opacity"
            values="0;0.18;0"
            keyTimes="0;0.5;1"
            dur="1.2s"
            fill="freeze"
          />
        </rect>
      )}
    </g>
  );
}

function RetrievalLines({ retrieved, animate }: { retrieved: number[]; animate: boolean }) {
  // Draw thin curves from each retrieved chunk down to the answer box.
  const cols = 12;
  const stripX = 20;
  const stripY = 95;
  const cellW = 46;
  const cellH = 22;
  const gap = 2;
  const answerAnchorY = 190;

  return (
    <g>
      {retrieved.map((idx, order) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        const cx = stripX + col * (cellW + gap) + cellW / 2;
        const cy = stripY + row * (cellH + gap) + cellH;
        const anchorX = 90 + order * 160;
        const midY = (cy + answerAnchorY) / 2;
        const d = `M ${cx} ${cy} C ${cx} ${midY}, ${anchorX} ${midY}, ${anchorX} ${answerAnchorY}`;
        return (
          <g key={idx}>
            <path
              d={d}
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.5"
              strokeWidth="1"
              strokeDasharray="2 3"
            />
            {animate && (
              <circle r="1.8" fill="currentColor" filter="url(#rag-glow)">
                <animateMotion
                  path={d}
                  dur="0.9s"
                  begin={`${0.6 + order * 0.15}s`}
                  fill="freeze"
                  calcMode="spline"
                  keySplines="0.42 0 0.58 1"
                  keyTimes="0;1"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;0"
                  keyTimes="0;0.4;1"
                  dur="0.9s"
                  begin={`${0.6 + order * 0.15}s`}
                  fill="freeze"
                />
              </circle>
            )}
          </g>
        );
      })}
    </g>
  );
}

function AnswerBox({
  tokens,
  visible,
  retrieved,
}: {
  tokens: AnswerToken[];
  visible: number;
  retrieved: number[];
}) {
  const boxX = 20;
  const boxY = 200;
  const boxW = 560;
  const boxH = 100;

  // Lay tokens out left-to-right with wrapping. We measure approximate
  // widths from character count; it's good enough for an SVG mockup.
  const tokenPositions: { x: number; y: number; w: number; token: AnswerToken; index: number }[] = [];
  let cx = boxX + 16;
  let cy = boxY + 26;
  const lineHeight = 20;
  const maxX = boxX + boxW - 16;
  tokens.forEach((t, i) => {
    const w = Math.max(14, t.text.length * 6.6) + (t.cite ? 10 : 2);
    if (cx + w > maxX) {
      cx = boxX + 16;
      cy += lineHeight;
    }
    tokenPositions.push({ x: cx, y: cy, w, token: t, index: i });
    cx += w;
  });

  return (
    <g>
      {/* Answer box */}
      <rect
        x={boxX}
        y={boxY}
        width={boxW}
        height={boxH}
        rx="10"
        fill="currentColor"
        fillOpacity="0.06"
        stroke="currentColor"
        strokeOpacity="0.3"
      />
      {/* Header strip inside box */}
      <text x={boxX + 16} y={boxY + 14} fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.55">
        answer
      </text>
      <circle cx={boxX + boxW - 22} cy={boxY + 11} r="2" fill="currentColor" fillOpacity="0.75">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
      </circle>
      <text
        x={boxX + boxW - 16}
        y={boxY + 14}
        textAnchor="end"
        fontSize="7"
        fontFamily="ui-monospace, monospace"
        fill="currentColor"
        fillOpacity="0.75"
      >
        streaming
      </text>

      {/* Tokens revealed one at a time */}
      {tokenPositions.map((p) => {
        const isVisible = p.index < visible;
        const cite = p.token.cite;
        return (
          <g key={p.index} opacity={isVisible ? 1 : 0} style={{ transition: 'opacity 0.2s ease-out' }}>
            <text
              x={p.x}
              y={p.y}
              fontSize="11"
              fontFamily="system-ui, sans-serif"
              fill="currentColor"
              fillOpacity="0.95"
            >
              {p.token.text}
            </text>
            {cite !== undefined && (
              <g transform={`translate(${p.x + p.token.text.length * 6.6 + 2}, ${p.y - 7})`}>
                <circle r="5" fill="currentColor" fillOpacity="0.85" />
                <text
                  textAnchor="middle"
                  y="2.2"
                  fontSize="6.5"
                  fontFamily="ui-monospace, monospace"
                  fill="#ffffff"
                >
                  {cite}
                </text>
              </g>
            )}
          </g>
        );
      })}

      {/* Citation legend at the bottom of the answer */}
      <g transform={`translate(${boxX + 16}, ${boxY + boxH - 10})`}>
        <text fontSize="6" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.5">
          sources:
        </text>
        {retrieved.map((idx, order) => (
          <g key={idx} transform={`translate(${50 + order * 48}, -4)`}>
            <rect x="0" y="0" width="42" height="10" rx="5" fill="currentColor" fillOpacity="0.12" />
            <text
              x="6"
              y="7.5"
              fontSize="6"
              fontFamily="ui-monospace, monospace"
              fill="currentColor"
              fillOpacity="0.85"
            >
              [{order + 1}] chunk {String(idx).padStart(2, '0')}
            </text>
          </g>
        ))}
      </g>
    </g>
  );
}
