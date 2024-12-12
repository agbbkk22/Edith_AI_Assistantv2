import { Task } from '../types/task';
import { Reminder, ReminderPreferences } from '../types/reminder';
import { CalendarEvent } from '../types/calendar';

const DEFAULT_PREFERENCES: ReminderPreferences = {
  deadlineThreshold: 24,
  progressCheckInterval: 4,
  workloadThreshold: 5,
  quietHours: {
    start: 20, // 8 PM
    end: 8, // 8 AM
  },
  enabledTypes: new Set(['deadline', 'progress', 'calendar-conflict', 'workload']),
};

export function generateReminders(
  tasks: Task[],
  events: CalendarEvent[],
  preferences: ReminderPreferences = DEFAULT_PREFERENCES
): Reminder[] {
  const reminders: Reminder[] = [];
  const now = new Date();

  // Generate deadline reminders
  tasks.forEach(task => {
    if (task.deadline && task.status !== 'completed') {
      const hoursUntilDeadline = (task.deadline.getTime() - now.getTime()) / (1000 * 60 * 60);
      
      if (hoursUntilDeadline <= preferences.deadlineThreshold) {
        reminders.push({
          id: `deadline-${task.id}-${now.getTime()}`,
          taskId: task.id,
          type: 'deadline',
          message: `Task "${task.title}" is due in ${Math.round(hoursUntilDeadline)} hours`,
          priority: hoursUntilDeadline <= 4 ? 'high' : 'medium',
          timestamp: now,
          acknowledged: false,
        });
      }
    }
  });

  // Generate progress reminders
  tasks.forEach(task => {
    if (task.status === 'in-progress') {
      const hoursSinceCreation = (now.getTime() - task.createdAt.getTime()) / (1000 * 60 * 60);
      
      if (hoursSinceCreation >= preferences.progressCheckInterval) {
        reminders.push({
          id: `progress-${task.id}-${now.getTime()}`,
          taskId: task.id,
          type: 'progress',
          message: `How is the progress on "${task.title}"?`,
          priority: 'medium',
          timestamp: now,
          acknowledged: false,
        });
      }
    }
  });

  // Check for calendar conflicts
  const taskDeadlines = tasks
    .filter(task => task.deadline && task.status !== 'completed')
    .map(task => ({
      start: new Date(task.deadline.getTime() - (task.estimatedMinutes || 60) * 60 * 1000),
      end: task.deadline,
      task,
    }));

  events.forEach(event => {
    const conflictingTasks = taskDeadlines.filter(({ start, end }) => {
      return (start <= event.end && end >= event.start);
    });

    conflictingTasks.forEach(({ task }) => {
      reminders.push({
        id: `conflict-${task.id}-${event.id}`,
        taskId: task.id,
        type: 'calendar-conflict',
        message: `Task "${task.title}" might conflict with event "${event.title}"`,
        priority: 'high',
        timestamp: now,
        acknowledged: false,
      });
    });
  });

  // Check workload
  const tasksPerDay = new Map<string, number>();
  tasks.forEach(task => {
    if (task.deadline) {
      const dateKey = task.deadline.toISOString().split('T')[0];
      tasksPerDay.set(dateKey, (tasksPerDay.get(dateKey) || 0) + 1);
    }
  });

  tasksPerDay.forEach((count, date) => {
    if (count > preferences.workloadThreshold) {
      reminders.push({
        id: `workload-${date}`,
        taskId: '',
        type: 'workload',
        message: `You have ${count} tasks due on ${new Date(date).toLocaleDateString()}. Consider rescheduling some tasks.`,
        priority: 'medium',
        timestamp: now,
        acknowledged: false,
      });
    }
  });

  return reminders;
}