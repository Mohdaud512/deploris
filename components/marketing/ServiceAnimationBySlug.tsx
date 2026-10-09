import { CustomCrmAnimation } from './CustomCrmAnimation';
import { RagAnimation } from './RagAnimation';
import { AiAgentsAnimation } from './AiAgentsAnimation';
import { WifiSurveyAnimation } from './WifiSurveyAnimation';
import { DataCenterAnimation } from './DataCenterAnimation';
import { HardwareAnimation } from './HardwareAnimation';
import { DevelopmentAnimation } from './DevelopmentAnimation';

/**
 * Picks the right hero animation for a given service id. Returns null for
 * services that don't yet have a bespoke piece — in that case the detail
 * page's hero stays text-only (keeping the single-column look rather than
 * leaving an awkward empty column).
 */
export function ServiceAnimationBySlug({ serviceId }: { serviceId: string }) {
  switch (serviceId) {
    // Software development flagships
    case 'custom-crm':
      return <CustomCrmAnimation />;
    case 'rag-systems':
      return <RagAnimation />;
    case 'ai-agents-automation':
      return <AiAgentsAnimation />;
    case 'custom-systems':
      // No bespoke yet — fall back to the development overview animation
      // so the page still feels animated.
      return <DevelopmentAnimation />;

    // Hardware flagships
    case 'wifi-surveys':
      return <WifiSurveyAnimation />;
    case 'data-center-maintenance':
      return <DataCenterAnimation />;

    // Other hardware services share the overview topology as a sensible
    // visual that reads as "operations across your estate".
    case 'infrastructure-support':
    case 'network-support':
    case 'rollout-migrations':
    case 'desktop-support':
    case 'imac-projects':
    case 'hardware-break-fix':
      return <HardwareAnimation />;

    default:
      return null;
  }
}
