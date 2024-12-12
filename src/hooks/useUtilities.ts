import { useState } from 'react';
import { useCalendar } from './useCalendar';
import { useTasks } from './useTasks';
import { useEmails } from './useEmails';
import { useInsights } from './useInsights';

export type UtilityPanelType = 'tasks' | 'calendar' | 'email' | 'insights' | null;

export function useUtilities() {
  const [activePanel, setActivePanel] = useState<UtilityPanelType>(null);
  const calendar = useCalendar();
  const tasks = useTasks();
  const emails = useEmails();
  const insights = useInsights();

  const handleUtilityClick = (panel: UtilityPanelType) => {
    setActivePanel(panel === activePanel ? null : panel);
  };

  return {
    activePanel,
    utilityState: {
      calendar,
      tasks,
      emails,
      insights,
    },
    handleUtilityClick,
  };
}