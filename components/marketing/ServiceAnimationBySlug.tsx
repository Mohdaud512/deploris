import { CustomCrmAnimation } from './CustomCrmAnimation';
import { RagAnimation } from './RagAnimation';
import { AiAgentsAnimation } from './AiAgentsAnimation';
import { WifiSurveyAnimation } from './WifiSurveyAnimation';
import { DataCenterAnimation } from './DataCenterAnimation';
import { DevelopmentAnimation } from './DevelopmentAnimation';
import { InfrastructureSupportAnimation } from './InfrastructureSupportAnimation';
import { NetworkSupportAnimation } from './NetworkSupportAnimation';
import { RolloutMigrationsAnimation } from './RolloutMigrationsAnimation';
import { DesktopSupportAnimation } from './DesktopSupportAnimation';
import { ImacProjectsAnimation } from './ImacProjectsAnimation';
import { HardwareBreakFixAnimation } from './HardwareBreakFixAnimation';

/**
 * Picks the right hero animation for a given service id. Every service has
 * its own bespoke piece now; `custom-systems` reuses the development
 * overview since it covers the general "we build what you need" story.
 */
export function ServiceAnimationBySlug({ serviceId }: { serviceId: string }) {
  switch (serviceId) {
    // Software development
    case 'custom-crm':
      return <CustomCrmAnimation />;
    case 'rag-systems':
      return <RagAnimation />;
    case 'ai-agents-automation':
      return <AiAgentsAnimation />;
    case 'custom-systems':
      return <DevelopmentAnimation />;

    // Hardware & infrastructure (one bespoke piece per service)
    case 'infrastructure-support':
      return <InfrastructureSupportAnimation />;
    case 'network-support':
      return <NetworkSupportAnimation />;
    case 'rollout-migrations':
      return <RolloutMigrationsAnimation />;
    case 'desktop-support':
      return <DesktopSupportAnimation />;
    case 'imac-projects':
      return <ImacProjectsAnimation />;
    case 'hardware-break-fix':
      return <HardwareBreakFixAnimation />;
    case 'wifi-surveys':
      return <WifiSurveyAnimation />;
    case 'data-center-maintenance':
      return <DataCenterAnimation />;

    default:
      return null;
  }
}
