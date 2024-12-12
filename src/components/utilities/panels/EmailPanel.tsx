import React from 'react';
import { EmailList } from '../../email/EmailList';

interface EmailPanelProps {
  state: any;
  onClose: () => void;
}

export function EmailPanel({ state, onClose }: EmailPanelProps) {
  return (
    <EmailList
      emails={state.emailState.emails}
      summaries={state.emailState.summaries}
      onSelectEmail={state.selectEmail}
    />
  );
}