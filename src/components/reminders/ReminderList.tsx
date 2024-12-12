import React from 'react';
import { Reminder } from '../../types/reminder';
import { Bell, Clock, X, Check } from 'lucide-react';

interface ReminderListProps {
  reminders: Reminder[];
  onAcknowledge: (reminderId: string) => void;
  onSnooze: (reminderId: string, duration: number) => void;
}

export function ReminderList({ reminders, onAcknowledge, onSnooze }: ReminderListProps) {
  if (reminders.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-sm w-full space-y-2">
      {reminders.map(reminder => (
        <div
          key={reminder.id}
          className={`
            bg-white rounded-lg shadow-lg p-4 border-l-4
            ${reminder.priority === 'high' ? 'border-red-500' :
              reminder.priority === 'medium' ? 'border-yellow-500' :
              'border-blue-500'}
          `}
        >
          <div className="flex items-start gap-3">
            <Bell size={20} className="text-gray-500 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <p className="text-sm text-gray-900">{reminder.message}</p>
              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() => onSnooze(reminder.id, 15)}
                  className="text-xs text-gray-500 flex items-center gap-1 hover:text-gray-700"
                >
                  <Clock size={12} />
                  Snooze 15m
                </button>
                <button
                  onClick={() => onSnooze(reminder.id, 60)}
                  className="text-xs text-gray-500 flex items-center gap-1 hover:text-gray-700"
                >
                  <Clock size={12} />
                  Snooze 1h
                </button>
              </div>
            </div>
            <button
              onClick={() => onAcknowledge(reminder.id)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <Check size={16} className="text-green-500" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}