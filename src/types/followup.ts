export interface FollowUpEmail {
  id: string;
  meetingId: string;
  subject: string;
  content: string;
  recipients: string[];
  sentAt?: Date;
  scheduledFor: Date;
}

export interface FollowUpPreferences {
  sendDelay: number; // minutes after meeting
  includeSummary: boolean;
  includeActionItems: boolean;
  includeDecisions: boolean;
  includeNextSteps: boolean;
  ccManagers: boolean;
  reminderFrequency: number; // days
}