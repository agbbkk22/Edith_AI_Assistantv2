import React from 'react';
import { Email, EmailSummary } from '../../types/email';
import { Clock, AlertTriangle, CheckCircle, MessageCircle, Brain } from 'lucide-react';

interface EmailSummarizerProps {
  email: Email;
  summary: EmailSummary;
}

export function EmailSummarizer({ email, summary }: EmailSummarizerProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="border-b pb-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">{email.subject}</h2>
          <div className={`
            px-2 py-1 rounded-full text-sm
            ${summary.priority === 'high' ? 'bg-red-100 text-red-700' :
              summary.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-green-100 text-green-700'}
          `}>
            {summary.priority.charAt(0).toUpperCase() + summary.priority.slice(1)} Priority
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            {summary.estimatedReadTime} min read
          </div>
          <div className={`flex items-center gap-1
            ${summary.sentiment === 'positive' ? 'text-green-600' :
              summary.sentiment === 'negative' ? 'text-red-600' :
              'text-gray-600'}
          `}>
            {summary.sentiment === 'positive' ? <CheckCircle size={16} /> :
             summary.sentiment === 'negative' ? <AlertTriangle size={16} /> :
             <MessageCircle size={16} />}
            {summary.sentiment.charAt(0).toUpperCase() + summary.sentiment.slice(1)} Tone
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {summary.keyPoints.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Brain size={16} />
              Key Points
            </h3>
            <ul className="list-disc list-inside space-y-1">
              {summary.keyPoints.map((point, index) => (
                <li key={index} className="text-gray-600">{point}</li>
              ))}
            </ul>
          </div>
        )}

        {summary.actionItems.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <AlertTriangle size={16} />
              Action Items
            </h3>
            <ul className="list-disc list-inside space-y-1">
              {summary.actionItems.map((item, index) => (
                <li key={index} className="text-gray-600">{item}</li>
              ))}
            </ul>
          </div>
        )}

        {summary.suggestedResponse && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <MessageCircle size={16} />
              Suggested Response
            </h3>
            <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
              {summary.suggestedResponse}
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t">
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
          View Full Email
        </button>
      </div>
    </div>
  );
}