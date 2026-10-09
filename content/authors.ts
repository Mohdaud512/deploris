import type { Locale } from '@/config/locales';

export type AuthorProfile = {
  slug: string;
  name: string;
  copy: Record<Locale, {
    jobTitle: string;
    headline: string;
    bio: string;
    expertise: string[];
  }>;
  social: {
    linkedin?: string;
    github?: string;
    x?: string;
  };
};

export const authors: AuthorProfile[] = [
  {
    slug: 'muhammad-daud',
    name: 'Muhammad Daud',
    copy: {
      en: {
        jobTitle: 'Founder & Managing Member, Deploris',
        headline:
          'Founder and managing member of Deploris. Writes about custom CRM, RAG systems, AI agents, and the hardware operations that keep businesses online.',
        bio:
          'Muhammad Daud is the founder and managing member of Deploris, where he leads engagements across custom CRM development, retrieval-augmented generation (RAG) systems, AI agents, and managed IT infrastructure for US and German clients. He writes field notes from real client work on this blog: what ships, what doesn’t, and the operational discipline that separates them.',
        expertise: [
          'Custom CRM development',
          'Retrieval-Augmented Generation (RAG)',
          'AI agents and workflow automation',
          'IT infrastructure support',
          'Data center operations',
          'WiFi surveys and network design',
          'Bilingual delivery for US and German clients',
        ],
      },
      de: {
        jobTitle: 'Gründer & Managing Member, Deploris',
        headline:
          'Gründer und Managing Member von Deploris. Schreibt über individuelle CRMs, RAG-Systeme, KI-Agenten und den IT-Betrieb, der Unternehmen am Laufen hält.',
        bio:
          'Muhammad Daud ist Gründer und Managing Member von Deploris. Er leitet Projekte in CRM-Entwicklung, RAG-Systemen (Retrieval-Augmented Generation), KI-Agenten und Managed IT für US- und DACH-Kunden. Auf diesem Blog schreibt er Praxis-Notizen aus echter Kundenarbeit: was produktiv geht, was nicht, und die operative Disziplin, die beides unterscheidet.',
        expertise: [
          'CRM-Entwicklung',
          'Retrieval-Augmented Generation (RAG)',
          'KI-Agenten und Workflow-Automatisierung',
          'IT-Infrastruktur-Support',
          'Rechenzentrum-Betrieb',
          'WLAN-Ausleuchtung und Netzwerk-Design',
          'Zweisprachige Lieferung für US- und DACH-Kunden',
        ],
      },
    },
    social: {
      linkedin: 'https://www.linkedin.com/in/muhammad-daud-deploris',
    },
  },
];

export function findAuthor(slug: string): AuthorProfile | undefined {
  return authors.find((a) => a.slug === slug);
}
