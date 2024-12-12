import { CategoryMetadata, TaskCategory } from '../types/taskCategory';
import { Mail, Users, FileText, Phone, Briefcase, BookOpen, Calendar, MoreHorizontal } from 'lucide-react';

export const categoryMetadata: Record<TaskCategory, CategoryMetadata> = {
  meeting: {
    name: 'meeting',
    icon: Calendar.name,
    color: 'blue',
    preferredTimeSlots: [
      { startHour: 9, endHour: 12, preferredDays: [1, 2, 3, 4, 5] }, // Morning meetings
      { startHour: 14, endHour: 16, preferredDays: [1, 2, 3, 4, 5] }, // Afternoon meetings
    ],
    keywordPatterns: [
      'meet',
      'discuss',
      'call',
      'sync',
      'conference',
      'zoom',
      'teams',
    ],
  },
  email: {
    name: 'email',
    icon: Mail.name,
    color: 'indigo',
    preferredTimeSlots: [
      { startHour: 8, endHour: 9, preferredDays: [1, 2, 3, 4, 5] }, // Morning emails
      { startHour: 16, endHour: 17, preferredDays: [1, 2, 3, 4, 5] }, // End of day emails
    ],
    keywordPatterns: [
      'email',
      'reply',
      'send',
      'message',
      'inbox',
      'correspondence',
    ],
  },
  admin: {
    name: 'admin',
    icon: FileText.name,
    color: 'gray',
    preferredTimeSlots: [
      { startHour: 13, endHour: 14, preferredDays: [1, 2, 3, 4, 5] }, // After lunch
      { startHour: 16, endHour: 17, preferredDays: [1, 2, 3, 4, 5] }, // End of day
    ],
    keywordPatterns: [
      'report',
      'document',
      'file',
      'organize',
      'update',
      'review',
      'process',
    ],
  },
  'client-followup': {
    name: 'client-followup',
    icon: Phone.name,
    color: 'green',
    preferredTimeSlots: [
      { startHour: 10, endHour: 12, preferredDays: [1, 2, 3, 4, 5] }, // Late morning
      { startHour: 14, endHour: 16, preferredDays: [1, 2, 3, 4, 5] }, // Afternoon
    ],
    keywordPatterns: [
      'client',
      'follow up',
      'followup',
      'check in',
      'status update',
      'feedback',
    ],
  },
  project: {
    name: 'project',
    icon: Briefcase.name,
    color: 'purple',
    preferredTimeSlots: [
      { startHour: 9, endHour: 12, preferredDays: [1, 2, 3, 4, 5] }, // Morning focus
      { startHour: 14, endHour: 17, preferredDays: [1, 2, 3, 4, 5] }, // Afternoon focus
    ],
    keywordPatterns: [
      'project',
      'develop',
      'implement',
      'create',
      'build',
      'design',
    ],
  },
  research: {
    name: 'research',
    icon: BookOpen.name,
    color: 'yellow',
    preferredTimeSlots: [
      { startHour: 9, endHour: 12, preferredDays: [1, 2, 3, 4, 5] }, // Morning focus
    ],
    keywordPatterns: [
      'research',
      'analyze',
      'study',
      'investigate',
      'explore',
      'learn',
    ],
  },
  planning: {
    name: 'planning',
    icon: Users.name,
    color: 'orange',
    preferredTimeSlots: [
      { startHour: 14, endHour: 17, preferredDays: [1, 5] }, // End of week planning
    ],
    keywordPatterns: [
      'plan',
      'strategy',
      'roadmap',
      'schedule',
      'coordinate',
      'organize',
    ],
  },
  other: {
    name: 'other',
    icon: MoreHorizontal.name,
    color: 'gray',
    preferredTimeSlots: [
      { startHour: 13, endHour: 17, preferredDays: [1, 2, 3, 4, 5] },
    ],
    keywordPatterns: [],
  },
};