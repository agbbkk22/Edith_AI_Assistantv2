import React from 'react';
import { ReminderPreferences } from '../../types/reminder';
import { Settings, Bell } from 'lucide-react';

interface ReminderPreferencesProps {
  preferences: ReminderPreferences;
  onUpdate: (updates: Partial<ReminderPreferences>) => void;
}

export function ReminderPreferences({ preferences, onUpdate }: ReminderPreferencesProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex items-center gap-2 mb-4">
        <Settings size={20} className="text-gray-500" />
        <h3 className="font-medium">Reminder Preferences</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Deadline Warning (hours before)
          </label>
          <input
            type="number"
            value={preferences.deadlineThreshold}
            onChange={(e) => onUpdate({ deadlineThreshold: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Progress Check Interval (hours)
          </label>
          <input
            type="number"
            value={preferences.progressCheckInterval}
            onChange={(e) => onUpdate({ progressCheckInterval: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Daily Workload Threshold
          </label>
          <input
            type="number"
            value={preferences.workloadThreshold}
            onChange={(e) => onUpdate({ workloadThreshold: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Quiet Hours</label>
          <div className="grid grid-cols-2 gap-4 mt-1">
            <div>
              <label className="block text-xs text-gray-500">Start</label>
              <input
                type="number"
                min="0"
                max="23"
                value={preferences.quietHours.start}
                onChange={(e) => onUpdate({
                  quietHours: { ...preferences.quietHours, start: Number(e.target.value) }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">End</label>
              <input
                type="number"
                min="0"
                max="23"
                value={preferences.quietHours.end}
                onChange={(e) => onUpdate({
                  quietHours: { ...preferences.quietHours, end: Number(e.target.value) }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reminder Types
          </label>
          {(['deadline', 'progress', 'calendar-conflict', 'workload'] as const).map(type => (
            <label key={type} className="flex items-center gap-2 mt-1">
              <input
                type="checkbox"
                checked={preferences.enabledTypes.has(type)}
                onChange={(e) => {
                  const newTypes = new Set(preferences.enabledTypes);
                  if (e.target.checked) {
                    newTypes.add(type);
                  } else {
                    newTypes.delete(type);
                  }
                  onUpdate({ enabledTypes: newTypes });
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 capitalize">{type.replace('-', ' ')}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}