import { Task } from './task';
import { CalendarEvent } from './calendar';
import { Email } from './email';

export interface ProductivityMetrics {
  tasksCompleted: number;
  tasksInProgress: number;
  averageTaskCompletionTime: number;
  meetingsAttended: number;
  emailResponseRate: number;
  focusTime: number; // in minutes
}

export interface DailyBriefing {
  date: Date;
  upcomingTasks: Task[];
  upcomingMeetings: CalendarEvent[];
  priorityEmails: Email[];
  productivityTips: string[];
  focusAreas: string[];
}

export interface PerformanceInsight {
  type: 'success' | 'warning' | 'info';
  metric: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  percentageChange: number;
  recommendation?: string;
}

export interface BusinessMetrics {
  insights: PerformanceInsight[];
  productivityScore: number;
  timeUtilization: {
    meetings: number;
    tasks: number;
    email: number;
    focus: number;
  };
}