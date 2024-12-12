import React from 'react';
import { Email, EmailSummary } from '../../types/email';
import { Mail, AlertTriangle, Clock } from 'lucide-react';

interface EmailListProps {
  emails: Email[];
  summaries: Record<string, EmailSummary>;
  onSelectEmail: (emailId: string) => void;
}

export function EmailList({ emails, summaries, onSelectEmail }: EmailListProps) {
  return (
    <div className="space-y-2">
      {emails.map(email => {
        const summary = summaries[email.id];
        
        return (
          <div
            key={email.id}
            onClick={() => onSelectEmail(email.id)}
            className={`
              p-3 rounded-lg cursor-pointer transition-all
              ${email.read ? 'bg-white' : 'bg-blue-50'}
              hover:shadow-md
            `}
          >
            <div className="flex items-center gap-3">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${summary.priority === 'high' ? 'bg-red-100' :
                  summary.priority === 'medium' ? 'bg-yellow-100' :
                  'bg-green-100'}
              `}>
                <Mail size={20} className={`
                  ${summary.priority === 'high' ? 'text-red-600' :
                    summary.priority === 'medium' ? 'text-yellow-600' :
                    'text-green-600'}
                `} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`font-medium truncate ${!email.read && 'font-semibold'}`}>
                    {email.subject}
                  </h3>
                  <time className="text-xs text-gray-500">
                    {email.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </time>
                </div>
                
                <div className="flex items-center gap-4">
                  <p className="text-sm text-gray-600 truncate">
                    {email.sender}
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    {summary.actionItems.length > 0 && (
                      <span className="flex items-center gap-1 text-amber-600">
                        <AlertTriangle size={12} />
                        {summary.actionItems.length} actions
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-gray-500">
                      <Clock size={12} />
                      {summary.estimatedReadTime}m
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {emails.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          No emails to display
        </p>
      )}
    </div>
  );
}