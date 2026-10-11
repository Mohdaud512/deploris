'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/config/locales';
import { getContent, scoreAnswers, type Axis } from '@/content/ai-opportunity-finder';

type Stage = { kind: 'intro' } | { kind: 'question'; index: number } | { kind: 'result' };

export function AiOpportunityFinder({ locale }: { locale: Locale }) {
  const content = useMemo(() => getContent(locale), [locale]);
  const [stage, setStage] = useState<Stage>({ kind: 'intro' });
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const totalQuestions = content.questions.length;

  function startAssessment() {
    setAnswers({});
    setStage({ kind: 'question', index: 0 });
  }
  function selectAnswer(qid: string, optId: string) {
    const next = { ...answers, [qid]: optId };
    setAnswers(next);
  }
  function goNext(idx: number) {
    if (idx + 1 >= totalQuestions) setStage({ kind: 'result' });
    else setStage({ kind: 'question', index: idx + 1 });
  }
  function goBack(idx: number) {
    if (idx === 0) setStage({ kind: 'intro' });
    else setStage({ kind: 'question', index: idx - 1 });
  }
  function restart() {
    setAnswers({});
    setStage({ kind: 'intro' });
  }

  if (stage.kind === 'intro') {
    return <Intro content={content} onStart={startAssessment} />;
  }

  if (stage.kind === 'question') {
    const q = content.questions[stage.index]!;
    const selected = answers[q.id];
    return (
      <QuestionCard
        content={content}
        question={q}
        index={stage.index}
        total={totalQuestions}
        selected={selected}
        onSelect={(opt) => selectAnswer(q.id, opt)}
        onNext={() => goNext(stage.index)}
        onBack={() => goBack(stage.index)}
      />
    );
  }

  return <Result content={content} answers={answers} locale={locale} onRestart={restart} />;
}

function Intro({ content, onStart }: { content: ReturnType<typeof getContent>; onStart: () => void }) {
  // Pull the one-line prompt of every question for the "What we ask" preview,
  // and the four axis labels for the "What you'll get back" preview. Both
  // are derived from the same source of truth that drives the quiz, so they
  // can never drift out of sync.
  const questionPrompts = content.questions.map((q) => q.prompt);
  const axisKeys = ['crm', 'rag', 'agents', 'managedIt'] as const;
  // Localised copy for the preview sections. Kept inline rather than pushed
  // down into content/ai-opportunity-finder.ts because this is layout copy,
  // not scoring data.
  const isDe = /de-DE|KI-Chancen/i.test(content.intro.eyebrow);
  const preview = isDe
    ? {
        asksTitle: 'Was wir fragen',
        asksDeck: 'Zehn Fragen zum Status quo — kein offenes Freitextfeld, keine E-Mail-Pflicht.',
        getsTitle: 'Was Sie zurückbekommen',
        getsDeck: 'Ihre Antworten werden gegen vier Deploris-Leistungsfelder bewertet. Das Ergebnis zeigt die beste Passung, die zweitbeste und eine ehrliche Erklärung dazu.',
        scoring: 'Deterministische Bewertung: Jede Antwort trägt feste Gewichte zu den vier Achsen bei. Keine KI im Hintergrund, kein Zufallsgenerator — gleiche Antworten erzeugen immer dasselbe Ergebnis.',
      }
    : {
        asksTitle: "What we ask",
        asksDeck: 'Ten questions about where you are today — no open-ended textarea, no email required.',
        getsTitle: "What you get back",
        getsDeck: 'Your answers are scored against four Deploris service lines. The result shows the best fit, the second best, and an honest write-up of why.',
        scoring: 'Deterministic scoring: every answer contributes fixed weights across the four axes. No LLM in the loop, no randomness — the same answers always produce the same recommendation.',
      };

  return (
    <section className="container py-14 md:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-600 dark:text-accent-400">
          {content.intro.eyebrow}
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-brand-900 md:text-5xl dark:text-white">
          {content.intro.title}
        </h1>
        <p className="mt-5 text-lg text-brand-900/80 dark:text-white/80">{content.intro.deck}</p>
        <ul className="mt-6 space-y-2 text-brand-900/85 dark:text-white/85">
          {content.intro.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <span aria-hidden className="mt-2 inline-block h-1 w-5 flex-shrink-0 rounded-full bg-accent-500" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={onStart}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-900 px-6 py-3 text-base font-medium text-white shadow hover:bg-brand-800 dark:bg-white dark:text-brand-900 dark:hover:bg-white/90"
        >
          <span>{content.intro.startLabel}</span>
          <span aria-hidden>→</span>
        </button>

        {/* Preview sections — expand the thin intro into something crawlers
            and skeptical mid-market readers can actually evaluate without
            clicking Start. Grounded in the same question + axis data the
            quiz runs on. */}
        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-xl font-semibold text-brand-900 dark:text-white">
              {preview.asksTitle}
            </h2>
            <p className="mt-2 text-sm text-brand-900/75 dark:text-white/70">{preview.asksDeck}</p>
            <ol className="mt-4 space-y-2 text-sm text-brand-900/85 dark:text-white/80">
              {questionPrompts.map((q, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-mono text-[0.75rem] text-accent-700 tabular-nums dark:text-accent-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{q}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-brand-900 dark:text-white">
              {preview.getsTitle}
            </h2>
            <p className="mt-2 text-sm text-brand-900/75 dark:text-white/70">{preview.getsDeck}</p>
            <ul className="mt-4 space-y-3">
              {axisKeys.map((key) => {
                const a = content.axes[key];
                return (
                  <li
                    key={key}
                    className="rounded-xl border border-brand-900/10 bg-white p-4 dark:border-white/10 dark:bg-white/5"
                  >
                    <p className="font-display font-semibold text-brand-900 dark:text-white">
                      {a.label}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-brand-900/70 dark:text-white/70">
                      {a.summary}
                    </p>
                  </li>
                );
              })}
            </ul>
            <p className="mt-5 rounded-lg border border-accent-500/30 bg-accent-500/5 p-3 text-xs leading-relaxed text-brand-900/85 dark:border-accent-400/30 dark:bg-accent-400/10 dark:text-white/80">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-accent-700 dark:text-accent-300">
                {isDe ? 'Wie bewertet wird' : 'How scoring works'}
              </span>
              <br />
              {preview.scoring}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuestionCard({
  content,
  question,
  index,
  total,
  selected,
  onSelect,
  onNext,
  onBack,
}: {
  content: ReturnType<typeof getContent>;
  question: ReturnType<typeof getContent>['questions'][number];
  index: number;
  total: number;
  selected: string | undefined;
  onSelect: (optId: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const isLast = index + 1 === total;
  const progress = ((index + (selected ? 1 : 0)) / total) * 100;

  return (
    <section className="container py-10 md:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-baseline justify-between font-mono text-[0.7rem] uppercase tracking-[0.14em] text-brand-900/60 dark:text-white/60">
          <span>{content.common.questionOf(index + 1, total)}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-brand-900/10 dark:bg-white/10">
          <div
            className="h-full rounded-full bg-accent-500 transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <h2 className="mt-10 font-display text-2xl font-bold leading-snug text-brand-900 md:text-3xl dark:text-white">
          {question.prompt}
        </h2>

        <fieldset className="mt-6 flex flex-col gap-3">
          <legend className="sr-only">{question.prompt}</legend>
          {question.options.map((opt) => {
            const checked = selected === opt.id;
            return (
              <label
                key={opt.id}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border px-5 py-4 transition-colors ${
                  checked
                    ? 'border-accent-500 bg-accent-500/10 text-brand-900 dark:text-white'
                    : 'border-brand-900/15 bg-white hover:border-accent-500/50 dark:border-white/15 dark:bg-white/5 dark:hover:border-accent-400/60'
                }`}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={opt.id}
                  checked={checked}
                  onChange={() => onSelect(opt.id)}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className={`mt-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border ${
                    checked
                      ? 'border-accent-500 bg-accent-500'
                      : 'border-brand-900/30 bg-white dark:border-white/30 dark:bg-transparent'
                  }`}
                >
                  {checked && <span className="h-1.5 w-1.5 rounded-full bg-white dark:bg-brand-950" />}
                </span>
                <span className="text-base text-brand-900 dark:text-white">{opt.label}</span>
              </label>
            );
          })}
        </fieldset>

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="rounded-full border border-brand-900/15 px-5 py-2.5 text-sm font-medium text-brand-900 hover:bg-brand-50 dark:border-white/15 dark:text-white dark:hover:bg-white/10"
          >
            ← {content.common.back}
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!selected}
            className="rounded-full bg-brand-900 px-5 py-2.5 text-sm font-medium text-white shadow transition-opacity hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-brand-900 dark:hover:bg-white/90"
          >
            {isLast ? content.common.finish : content.common.next} →
          </button>
        </div>
      </div>
    </section>
  );
}

function Result({
  content,
  answers,
  locale,
  onRestart,
}: {
  content: ReturnType<typeof getContent>;
  answers: Record<string, string>;
  locale: Locale;
  onRestart: () => void;
}) {
  const scores = useMemo(() => scoreAnswers(locale, answers), [locale, answers]);
  const sorted = (Object.entries(scores) as [Axis, number][]).sort((a, b) => b[1] - a[1]);
  const [primaryKey, primaryScore] = sorted[0]!;
  const [secondaryKey] = sorted[1]!;
  const primary = content.axes[primaryKey];
  const secondary = content.axes[secondaryKey];
  const maxScore = Math.max(1, ...Object.values(scores));

  return (
    <section className="container py-14 md:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-600 dark:text-accent-400">
          {content.result.eyebrow}
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-brand-900 md:text-5xl dark:text-white">
          {content.result.titleTemplate.replace('{label}', primary.label)}
        </h1>
        <p className="mt-5 text-base text-brand-900/80 dark:text-white/80">{content.result.bodyIntro}</p>

        {/* Score bars */}
        <div className="mt-10 space-y-4" role="group" aria-label="Scores">
          {sorted.map(([axis, score]) => (
            <div key={axis}>
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-medium text-brand-900 dark:text-white">{content.axes[axis].label}</span>
                <span className="font-mono text-xs text-brand-900/60 dark:text-white/60">{score} / {maxScore}</span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-brand-900/10 dark:bg-white/10">
                <div
                  className={`h-full rounded-full ${axis === primaryKey ? 'bg-accent-500' : 'bg-brand-900/40 dark:bg-white/40'}`}
                  style={{ width: `${Math.round((score / maxScore) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Primary */}
        <article className="mt-10 rounded-2xl border border-accent-500/40 bg-accent-500/10 p-6 md:p-7 dark:border-accent-400/40 dark:bg-accent-400/10">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 dark:text-accent-300">
            {content.result.recommendedKicker}
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-brand-900 dark:text-white">{primary.label}</h2>
          <p className="mt-3 text-brand-900/85 dark:text-white/85">{primary.summary}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={content.result.ctaPrimaryHref}
              className="rounded-full bg-brand-900 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-brand-800 dark:bg-white dark:text-brand-900 dark:hover:bg-white/90"
            >
              {content.result.ctaPrimary}
            </Link>
            <Link
              href={primary.serviceHref}
              className="rounded-full border border-brand-900/20 px-5 py-2.5 text-sm font-medium text-brand-900 hover:bg-brand-50 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
            >
              {primary.serviceLabel} →
            </Link>
          </div>
        </article>

        {/* Secondary */}
        {primaryScore > 0 && secondary && (
          <article className="mt-5 rounded-2xl border border-brand-900/10 bg-white p-6 dark:border-white/10 dark:bg-white/5">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-900/60 dark:text-white/60">
              {content.result.secondaryKicker}
            </p>
            <h2 className="mt-2 font-display text-xl font-semibold text-brand-900 dark:text-white">{secondary.label}</h2>
            <p className="mt-2 text-sm text-brand-900/75 dark:text-white/75">{secondary.summary}</p>
            <Link
              href={secondary.serviceHref}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent-700 hover:underline dark:text-accent-300"
            >
              {secondary.serviceLabel} →
            </Link>
          </article>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href={content.result.ctaSecondaryHref}
            className="text-sm font-medium text-brand-900 underline-offset-4 hover:underline dark:text-white"
          >
            {content.result.ctaSecondary} →
          </Link>
          <button
            type="button"
            onClick={onRestart}
            className="font-mono text-xs uppercase tracking-[0.08em] text-brand-900/60 hover:text-brand-900 dark:text-white/60 dark:hover:text-white"
          >
            ↺ {content.result.restart}
          </button>
        </div>

        <p className="mt-10 text-xs text-brand-900/50 dark:text-white/50">{content.result.disclaimer}</p>
      </div>
    </section>
  );
}
