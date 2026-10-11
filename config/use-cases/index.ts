import type { Locale } from '../locales';
import type { UseCase } from './types';
import { midMarketCustomCrm } from './mid-market-custom-crm';
import { operationsAiAutomation } from './operations-ai-automation';
import { supportRagKnowledgeBase } from './support-rag-knowledge-base';
import { mspHandoffManagedIt } from './msp-handoff-managed-it';
import { warehouseWifiSurveys } from './warehouse-wifi-surveys';
import { dataCenterRemoteHands } from './data-center-remote-hands';

export type { UseCase, UseCaseCopy, UseCaseFact, UseCaseStep, UseCaseComparisonRow, UseCaseFaq } from './types';

/** Ordered as they appear on the hub + /industries grid. */
export const useCases: UseCase[] = [
  midMarketCustomCrm,
  operationsAiAutomation,
  supportRagKnowledgeBase,
  mspHandoffManagedIt,
  warehouseWifiSurveys,
  dataCenterRemoteHands,
];

export function findUseCaseBySlug(locale: Locale, slug: string): UseCase | undefined {
  return useCases.find((u) => u.copy[locale].slug === slug);
}

/** Reverse lookup: given a service id, find the use-case page that targets it.
 *  Used by service detail pages to render a cross-link back to the pillar,
 *  which both humans and crawlers follow (two-way internal link = better SEO). */
export function findUseCaseByServiceId(serviceId: string): UseCase | undefined {
  return useCases.find((u) => u.serviceId === serviceId);
}
