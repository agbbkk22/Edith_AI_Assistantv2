import React from 'react';
import { FollowUpEmail } from '../../types/followup';
import { Mail, Check, Clock } from 'lucide-react';

interface FollowUpListProps {
  followUps: FollowUpEmail[];
}

export function FollowUpList({ followUps }: FollowUpListProps) {
  const pendingFollowUps = followUps.filter(f => !f.sentAt);
  const sentFollowUps = followUps.filter(f => f.sentAt);

  return (
    <div className="space-y-4">
      {pendingFollowUps.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Pending Follow-ups</h3>
          <div className="space-y-2">
            {pendingFollowUps.map(followUp => (
              <div
                key={followUp.id}
                className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm"
              >
                <Clock size={20} className="text-yellow-500" />
                <div className="flex-1">
                  <p className="font-medium">{followUp.subject}</p>
                  <p className="text-sm text-gray-500">
                    Scheduled for: {followUp.scheduledFor.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {sentFollowUps.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Sent Follow-ups</h3>
          <div className="space-y-2">
            {sentFollowUps.map(followUp => (
              <div
                key={followUp.id}
                className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm"
              >
                <Check size={20} className="text-green-500" />
                <div className="flex-1">
                  <p className="font-medium">{followUp.subject}</p>
                  <p className="text-sm text-gray-500">
                    Sent: {followUp.sentAt?.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {followUps.length === 0 && (
        <p className="text-center text-gray-500 py-4">
          No follow-up emails yet
        </p>
      )}
    </div>
  );
}