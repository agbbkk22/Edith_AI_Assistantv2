import React from 'react';
import { FollowUpPreferences } from '../../types/followup';
import { Settings, Mail } from 'lucide-react';

interface FollowUpPreferencesProps {
  preferences: FollowUpPreferences;
  onUpdate: (updates: Partial<FollowUpPreferences>) => void;
}

export function FollowUpPreferences({ preferences, onUpdate }: FollowUpPreferencesProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <Settings size={20} className="text-gray-500" />
        <h3 className="font-medium">Follow-up Preferences</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Send Delay (minutes)
          </label>
          <input
            type="number"
            value={preferences.sendDelay}
            onChange={(e) => onUpdate({ sendDelay: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Content Options
          </label>
          <div className="space-y-1">
            {[
              { key: 'includeSummary', label: 'Include Summary' },
              { key: 'includeActionItems', label: 'Include Action Items' },
              { key: 'includeDecisions', label: 'Include Decisions' },
              { key: 'includeNextSteps', label: 'Include Next Steps' },
              { key: 'ccManagers', label: 'CC Managers' },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={preferences[key as keyof FollowUpPreferences] as boolean}
                  onChange={(e) => onUpdate({ [key]: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Reminder Frequency (days)
          </label>
          <input
            type="number"
            value={preferences.reminderFrequency}
            onChange={(e) => onUpdate({ reminderFrequency: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}