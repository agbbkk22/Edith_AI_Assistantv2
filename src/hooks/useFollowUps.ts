import { useState, useEffect } from 'react';
import { FollowUpEmail, FollowUpPreferences } from '../types/followup';
import { generateFollowUpEmail } from '../utils/followupGenerator';
import { MeetingNote } from '../types/meetingNotes';

export function useFollowUps() {
  const [followUps, setFollowUps] = useState<FollowUpEmail[]>([]);
  const [preferences, setPreferences] = useState<FollowUpPreferences>({
    sendDelay: 15,
    includeSummary: true,
    includeActionItems: true,
    includeDecisions: true,
    includeNextSteps: true,
    ccManagers: false,
    reminderFrequency: 3,
  });

  const scheduleFollowUp = (
    meetingId: string,
    notes: MeetingNote[],
    attendees: string[],
  ) => {
    const followUp = generateFollowUpEmail(meetingId, notes, attendees);
    setFollowUps(prev => [...prev, followUp]);
  };

  const updatePreferences = (updates: Partial<FollowUpPreferences>) => {
    setPreferences(prev => ({ ...prev, ...updates }));
  };

  // Simulate sending follow-ups
  useEffect(() => {
    const interval = setInterval(() => {
      setFollowUps(prev => {
        const now = new Date();
        const updated = prev.map(followUp => {
          if (!followUp.sentAt && followUp.scheduledFor <= now) {
            console.log(`Sending follow-up: ${followUp.subject}`);
            return { ...followUp, sentAt: now };
          }
          return followUp;
        });
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    followUps,
    preferences,
    scheduleFollowUp,
    updatePreferences,
  };
}