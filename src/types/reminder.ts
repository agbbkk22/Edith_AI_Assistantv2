export interface Reminder {
  id: string;
  taskId: string;
  type: 'deadline' | 'progress' | 'calendar-conflict' | 'workload';
  message: string;
  priority: 'high' | 'medium' | 'low';
  timestamp: Date;
  acknowledged: boolean;
  snoozeUntil?: Date;
}

export interface ReminderPreferences {
  deadlineThreshold: number; // hours before deadline
  progressCheckInterval: number; // hours
  workloadThreshold: number; // tasks per day
  quietHours: {
    start: number;
    end: number;
  };
  enabledTypes: Set<Reminder['type']>;
}