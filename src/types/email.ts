export interface Email {
  id: string;
  subject: string;
  sender: string;
  recipients: string[];
  content: string;
  timestamp: Date;
  priority: 'high' | 'medium' | 'low';
  category?: 'action-required' | 'fyi' | 'follow-up' | 'urgent';
  read: boolean;
}

export interface EmailSummary {
  keyPoints: string[];
  suggestedResponse?: string;
  actionItems: string[];
  priority: Email['priority'];
  estimatedReadTime: number;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export interface EmailState {
  emails: Email[];
  selectedEmail: Email | null;
  summaries: Record<string, EmailSummary>;
}