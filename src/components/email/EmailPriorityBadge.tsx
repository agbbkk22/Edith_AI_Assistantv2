import React from 'react';
import { EmailPriorityLevel } from '../../types/emailPriority';
import { AlertTriangle, AlertCircle, Bell, Info } from 'lucide-react';

interface EmailPriorityBadgeProps {
  priority: EmailPriorityLevel;
  score?: number;
}

export function EmailPriorityBadge({ priority, score }: EmailPriorityBadgeProps) {
  const getPriorityIcon = () => {
    switch (priority) {
      case 'urgent':
        return <AlertTriangle size={16} />;
      case 'important':
        return <AlertCircle size={16} />;
      case 'normal':
        return <Bell size={16} />;
      case 'low':
        return <Info size={16} />;
    }
  };

  const getPriorityColor = () => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-700';
      case 'important':
        return 'bg-yellow-100 text-yellow-700';
      case 'normal':
        return 'bg-blue-100 text-blue-700';
      case 'low':
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className={`
      inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm
      ${getPriorityColor()}
    `}>
      {getPriorityIcon()}
      <span className="capitalize">{priority}</span>
      {score !== undefined && (
        <span className="text-xs ml-1">({Math.round(score)})</span>
      )}
    </div>
  );
}