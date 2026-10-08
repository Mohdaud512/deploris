import type { Locale } from '@/config/locales';

export type CareerRole = {
  slug: string;
  employmentType: string;
  datePosted: string;
  copy: Record<Locale, { title: string; summary: string; body: string }>;
};

export const roles: CareerRole[] = [
  {
    slug: 'senior-backend-engineer',
    employmentType: 'FULL_TIME',
    datePosted: '2025-01-15',
    copy: {
      en: {
        title: 'Senior Backend Engineer CRM & RAG systems',
        summary: 'Ship production TypeScript / Node backends for custom CRM and RAG projects. US or DE, remote.',
        body: 'You will lead the backend of custom CRM and RAG engagements data modeling, integrations, security review, and handover. Comfortable owning production, comfortable writing tests, comfortable saying no to premature abstraction.',
      },
      de: {
        title: 'Senior Backend Engineer CRM & RAG-Systeme',
        summary: 'Sie liefern produktive TypeScript/Node-Backends für individuelle CRM- und RAG-Projekte. USA oder DE, remote.',
        body: 'Sie führen das Backend individueller CRM- und RAG-Projekte Datenmodell, Integrationen, Sicherheits-Review und Übergabe. Sie fühlen sich verantwortlich für Produktion, schreiben gerne Tests und sagen Nein zu voreiligen Abstraktionen.',
      },
    },
  },
  {
    slug: 'infrastructure-engineer',
    employmentType: 'FULL_TIME',
    datePosted: '2025-01-15',
    copy: {
      en: {
        title: 'Infrastructure Engineer Managed IT & data centre',
        summary: 'Run managed IT and data-centre engagements under SLA. US-remote with occasional on-site.',
        body: 'You will run managed IT and data-centre work end-to-end under written SLAs monitoring, patching, change control, and incident response.',
      },
      de: {
        title: 'Infrastructure Engineer Managed IT & Rechenzentrum',
        summary: 'Sie betreuen Managed-IT- und Rechenzentrum-Kunden unter SLA. USA-Remote mit gelegentlichen Vor-Ort-Einsätzen.',
        body: 'Sie betreuen Managed-IT- und Rechenzentrum-Projekte end-to-end unter schriftlicher SLA Monitoring, Patching, Change-Kontrolle und Incident Response.',
      },
    },
  },
  {
    slug: 'ai-solutions-engineer',
    employmentType: 'FULL_TIME',
    datePosted: '2025-01-15',
    copy: {
      en: {
        title: 'AI Solutions Engineer Agents & automation',
        summary: 'Design and ship agentic automations that finish real work under guardrails, with human-in-the-loop.',
        body: 'You will design and ship AI-agent automations end-to-end process discovery, tool selection, guardrails, evaluation, and hand-off.',
      },
      de: {
        title: 'AI Solutions Engineer Agenten & Automatisierung',
        summary: 'Sie entwerfen und liefern agentische Automatisierungen, die reale Arbeit abschließen unter Guardrails, mit Human-in-the-Loop.',
        body: 'Sie entwerfen und liefern KI-Agent-Automatisierungen end-to-end Prozess-Erhebung, Tool-Auswahl, Guardrails, Evaluation und Übergabe.',
      },
    },
  },
];
