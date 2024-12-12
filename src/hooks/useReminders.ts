import { useState, useEffect } from 'react';
import { Reminder, ReminderPreferences } from '../types/reminder';
import { generateReminders } from '../utils/reminderGenerator';
import { Task } from '../types/task';
import { CalendarEvent } from '../types/calendar';

export function useReminders(tasks: Task[], events: CalendarEvent[]) {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [preferences, setPreferences] = useState<ReminderPreferences>({
    deadlineThreshold: 24,
    progressCheckInterval: 4,
    workloadThreshold: 5,
    quietHours: {
      start: 20,
      end: 8,
    },
    enabledTypes: new Set(['deadline', 'progress', 'calendar-conflict', 'workload']),
  });

  useEffect(() => {
    const checkReminders = () => {
      const currentHour = new Date().getHours();
      const isQuietHours = currentHour >= preferences.quietHours.start || 
                          currentHour < preferences.quietHours.end;

      if (!isQuietHours) {
        const newReminders = generateReminders(tasks, events, preferences);
        setReminders(prev => {
          const existingIds = new Set(prev.map(r => r.id));
          return [
            ...prev,
            ...newReminders.filter(r => !existingIds.has(r.id))
          ];
        });
      }
    };

    checkReminders();
    const interval = setInterval(checkReminders, 15 * 60 * 1000); // Check every 15 minutes
    
    return () => clearInterval(interval);
  }, [tasks, events, preferences]);

  const acknowledgeReminder = (reminderId: string) => {
    setReminders(prev =>
      prev.map(reminder =>
        reminder.id === reminderId
          ? { ...reminder, acknowledged: true }
          : reminder
      )
    );
  };

  const snoozeReminder = (reminderId: string, duration: number) => {
    const snoozeUntil = new Date();
    snoozeUntil.setMinutes(snoozeUntil.getMinutes() + duration);

    setReminders(prev =>
      prev.map(reminder =>
        reminder.id === reminderId
          ? { ...reminder, snoozeUntil }
          : reminder
      )
    );
  };

  const updatePreferences = (updates: Partial<ReminderPreferences>) => {
    setPreferences(prev => ({ ...prev, ...updates }));
  };

  const activeReminders = reminders.filter(reminder => {
    if (reminder.acknowledged) return false;
    if (reminder.snoozeUntil && reminder.snoozeUntil > new Date()) return false;
    return true;
  });

  return {
    reminders: activeReminders,
    acknowledgeReminder,
    snoozeReminder,
    updatePreferences,
    preferences,
  };
}