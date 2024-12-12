import { EmailPriorityRule } from '../types/emailPriority';

export const defaultPriorityRules: EmailPriorityRule[] = [
  {
    id: 'urgent-keywords',
    name: 'Urgent Keywords',
    pattern: /\b(urgent|asap|emergency|immediate|critical)\b/i,
    priority: 'urgent',
    category: 'work',
    autoRespond: true,
  },
  {
    id: 'deadline-mentions',
    name: 'Deadline Mentions',
    pattern: /\b(deadline|due|by|until)\b.*\b(today|tomorrow|monday|tuesday|wednesday|thursday|friday)\b/i,
    priority: 'important',
    category: 'work',
  },
  {
    id: 'action-required',
    name: 'Action Required',
    pattern: /\b(action required|please|kindly|review|approve|confirm)\b/i,
    priority: 'important',
    category: 'work',
  },
  {
    id: 'project-updates',
    name: 'Project Updates',
    pattern: /\b(update|status|progress|report)\b/i,
    priority: 'normal',
    category: 'project',
  },
  {
    id: 'meeting-related',
    name: 'Meeting Related',
    pattern: /\b(meeting|call|sync|discussion)\b/i,
    priority: 'normal',
    category: 'work',
  },
  {
    id: 'fyi-messages',
    name: 'FYI Messages',
    pattern: /\b(fyi|for your information|heads up)\b/i,
    priority: 'low',
    category: 'work',
  },
];