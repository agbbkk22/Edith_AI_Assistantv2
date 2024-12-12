import React from 'react';
import { InsightsDashboard } from '../../insights/InsightsDashboard';

interface InsightsPanelProps {
  state: any;
  onClose: () => void;
}

export function InsightsPanel({ state, onClose }: InsightsPanelProps) {
  return (
    <InsightsDashboard
      tasks={state.tasks}
      events={state.events}
      emails={state.emails}
      onClose={onClose}
    />
  );
}