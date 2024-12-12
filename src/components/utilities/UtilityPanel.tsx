import React from 'react';
import { UtilityPanelType } from '../../hooks/useUtilities';
import { TaskPanel } from './panels/TaskPanel';
import { CalendarPanel } from './panels/CalendarPanel';
import { EmailPanel } from './panels/EmailPanel';
import { InsightsPanel } from './panels/InsightsPanel';

interface UtilityPanelProps {
  type: UtilityPanelType;
  state: any;
  onClose: () => void;
}

export function UtilityPanel({ type, state, onClose }: UtilityPanelProps) {
  switch (type) {
    case 'tasks':
      return <TaskPanel state={state.tasks} onClose={onClose} />;
    case 'calendar':
      return <CalendarPanel state={state.calendar} onClose={onClose} />;
    case 'email':
      return <EmailPanel state={state.emails} onClose={onClose} />;
    case 'insights':
      return <InsightsPanel state={state.insights} onClose={onClose} />;
    default:
      return null;
  }
}