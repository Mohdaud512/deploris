import type { Locale } from '@/config/locales';

export function WhyBoth({ locale }: { locale: Locale }) {
  const de = locale === 'de';
  const prefix = de ? '/de' : '';
  const copy = de
    ? {
        eyebrow: 'Die uncontested Position',
        title: 'Ein Team. Zwei Probleme. Eine SLA.',
        deck: 'Keiner der 40 Mittelstand-Dienstleister, die wir vermessen haben, deckt beides ab: individuelle KI-Software und die Infrastruktur, auf der sie läuft. Deshalb ist das die Position, die Deploris besetzt.',
        buildLabel: 'Wir entwickeln',
        runLabel: 'Wir betreiben',
        buildItems: ['Individuelle CRM-Systeme', 'RAG-Pipelines', 'KI-Agenten und Automatisierung', 'Individualsoftware'],
        runItems: ['Server, Storage, Virtualisierung', 'Netzwerk und WLAN', 'Desktops, IMAC, Break-Fix', 'Rechenzentrum, 24/7'],
        bridge: 'dieselben Ingenieure, dieselbe Rufbereitschaft, derselbe Vertrag',
        points: [
          {
            kicker: '01',
            title: 'Kein Zweit-Dienstleister.',
            body: 'Wenn Ihre RAG-Pipeline mehr GPU braucht, verhandelt dasselbe Team, das sie gebaut hat, auch die Server. Kein Ticket, das zwischen Softwarehaus und MSP hin- und hergeschoben wird.',
          },
          {
            kicker: '02',
            title: 'Gemeinsame Rufbereitschaft.',
            body: 'Produktions-Incident um 3 Uhr nachts? Der Entwickler des Systems und der Netzwerk-Lead sind in derselben On-Call-Rotation. Ein Eskalationspfad statt zwei.',
          },
          {
            kicker: '03',
            title: 'Eine schriftliche SLA, End-to-End.',
            body: 'Vom ersten Commit bis zum zuletzt gepatchten Switch läuft jedes Artefakt unter einem Vertrag. Keine Grauzone, in der Verantwortung verschwindet.',
          },
        ],
        ctaText: 'Wie wir das in der Praxis zusammenziehen',
        ctaHref: `${prefix}/services`,
      }
    : {
        eyebrow: 'The uncontested quadrant',
        title: 'One team. Two problems. One SLA.',
        deck: 'None of the 40 mid-market firms we benchmarked cover both: custom AI software and the hardware it runs on. That is the square Deploris occupies.',
        buildLabel: 'We build',
        runLabel: 'We run',
        buildItems: ['Custom CRM systems', 'RAG pipelines', 'AI agents and automation', 'Bespoke software'],
        runItems: ['Servers, storage, virtualization', 'Networks and WiFi', 'Desktops, IMAC, break-fix', 'Data center, 24/7'],
        bridge: 'same engineers, same on-call, same contract',
        points: [
          {
            kicker: '01',
            title: 'No handoff between vendors.',
            body: 'When your RAG pipeline runs out of GPU, the same team that built it also owns the server contract. No ticket bouncing between a dev shop and an MSP.',
          },
          {
            kicker: '02',
            title: 'Shared on-call.',
            body: 'Production incident at 3am? The engineer who wrote the system and the network lead who knows the switches are on the same rotation. One escalation path, not two.',
          },
          {
            kicker: '03',
            title: 'One written SLA, end to end.',
            body: 'From the first commit to the last patched switch, every artifact lives under one agreement. No seam where responsibility quietly disappears.',
          },
        ],
        ctaText: 'See how we wire it together in practice',
        ctaHref: `${prefix}/services`,
      };

  return (
    <section className="relative overflow-hidden border-y border-brand-900/10 bg-brand-50/60 py-20 md:py-24 dark:border-white/10 dark:bg-brand-950/40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-500/50 to-transparent"
      />

      <div className="container">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-600 dark:text-accent-400">
            {copy.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-brand-900 md:text-4xl lg:text-5xl dark:text-white">
            {copy.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base text-brand-900/75 md:text-lg dark:text-white/75">
            {copy.deck}
          </p>
        </div>

        {/* Build / Run split */}
        <div className="mt-12 grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-stretch md:gap-4">
          <WedgeColumn label={copy.buildLabel} items={copy.buildItems} side="left" />
          <WedgeBridge text={copy.bridge} />
          <WedgeColumn label={copy.runLabel} items={copy.runItems} side="right" />
        </div>

        {/* Three integration advantages */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {copy.points.map((p) => (
            <article
              key={p.kicker}
              className="relative rounded-2xl border border-brand-900/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs tracking-[0.1em] text-accent-600 dark:text-accent-400">
                  {p.kicker}
                </span>
                <span className="h-px flex-1 bg-brand-900/10 ml-3 dark:bg-white/10" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-brand-900 dark:text-white">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-900/75 dark:text-white/70">{p.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={copy.ctaHref}
            className="group inline-flex items-center gap-2 text-sm font-medium text-brand-900 underline-offset-4 hover:underline dark:text-white"
          >
            <span>{copy.ctaText}</span>
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function WedgeColumn({
  label,
  items,
  side,
}: {
  label: string;
  items: string[];
  side: 'left' | 'right';
}) {
  return (
    <div
      className={`relative rounded-2xl border border-brand-900/10 bg-white p-6 shadow-sm md:p-7 dark:border-white/10 dark:bg-white/5 ${
        side === 'right' ? 'md:text-right' : ''
      }`}
    >
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-accent-600 dark:text-accent-400">
        {label}
      </p>
      <ul className="mt-5 space-y-2.5 text-sm md:text-[0.95rem]">
        {items.map((it, i) => (
          <li
            key={i}
            className={`flex items-center gap-2.5 text-brand-900/85 dark:text-white/85 ${
              side === 'right' ? 'md:flex-row-reverse md:text-right' : ''
            }`}
          >
            <span
              aria-hidden
              className="inline-block h-1 w-5 flex-shrink-0 rounded-full bg-accent-500/70"
            />
            <span className="min-w-0">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WedgeBridge({ text }: { text: string }) {
  return (
    <div className="relative flex items-center justify-center py-3 md:py-0">
      <div
        aria-hidden
        className="absolute inset-0 flex items-center md:flex-col md:justify-center"
      >
        <span className="hidden h-full w-px bg-gradient-to-b from-accent-500/0 via-accent-500/60 to-accent-500/0 md:block" />
        <span className="h-px w-full bg-gradient-to-r from-accent-500/0 via-accent-500/60 to-accent-500/0 md:hidden" />
      </div>
      <span className="relative rounded-full border border-accent-500/40 bg-white px-3 py-1.5 text-center font-mono text-[0.68rem] uppercase tracking-[0.1em] text-accent-600 shadow-sm md:max-w-[8rem] md:text-[0.64rem] md:leading-tight dark:bg-brand-950 dark:text-accent-400">
        {text}
      </span>
    </div>
  );
}
