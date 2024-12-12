export type EmailPriorityLevel = 'urgent' | 'important' | 'normal' | 'low';

export interface EmailPriorityRule {
  id: string;
  name: string;
  pattern: RegExp | string;
  senderPatterns?: string[];
  subjectPatterns?: string[];
  priority: EmailPriorityLevel;
  category: 'work' | 'personal' | 'project' | 'admin';
  autoRespond?: boolean;
}

export interface EmailPriorityScore {
  score: number;
  reasons: string[];
  suggestedPriority: EmailPriorityLevel;
  category?: string;
}

export interface EmailFilter {
  id: string;
  name: string;
  conditions: {
    field: 'subject' | 'sender' | 'content' | 'recipients';
    operator: 'contains' | 'equals' | 'startsWith' | 'endsWith' | 'matches';
    value: string;
  }[];
  action: 'categorize' | 'prioritize' | 'flag' | 'archive';
  actionValue: string;
}