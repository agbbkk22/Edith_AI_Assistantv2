import { useState } from 'react';
import { Email, EmailState, EmailSummary } from '../types/email';
import { analyzeEmail } from '../utils/emailAnalyzer';

export function useEmails() {
  const [emailState, setEmailState] = useState<EmailState>({
    emails: [],
    selectedEmail: null,
    summaries: {},
  });

  const addEmail = (email: Omit<Email, 'id' | 'timestamp' | 'read'>) => {
    const newEmail: Email = {
      ...email,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };

    const summary = analyzeEmail(newEmail);

    setEmailState(prev => ({
      ...prev,
      emails: [newEmail, ...prev.emails],
      summaries: {
        ...prev.summaries,
        [newEmail.id]: summary,
      },
    }));
  };

  const selectEmail = (emailId: string) => {
    const email = emailState.emails.find(e => e.id === emailId);
    if (email && !email.read) {
      // Mark as read
      setEmailState(prev => ({
        ...prev,
        emails: prev.emails.map(e =>
          e.id === emailId ? { ...e, read: true } : e
        ),
      }));
    }
    setEmailState(prev => ({
      ...prev,
      selectedEmail: email ?? null,
    }));
  };

  return {
    emailState,
    addEmail,
    selectEmail,
  };
}