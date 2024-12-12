import React from 'react';
import { DailyBriefing as DailyBriefingType } from '../../types/insights';
import { Calendar, Mail, CheckSquare, Lightbulb, Target } from 'lucide-react';

interface DailyBriefingProps {
  briefing: DailyBriefingType;
}

export function DailyBriefing({ briefing }: DailyBriefingProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Daily Briefing</h2>
        <time className="text-sm text-gray-500">
          {briefing.date.toLocaleDateString()}
        </time>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tasks and Meetings */}
        <div className="space-y-6">
          {/* Upcoming Tasks */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckSquare className="text-blue-600" size={20} />
              <h3 className="font-medium">Priority Tasks</h3>
            </div>
            {briefing.upcomingTasks.length > 0 ? (
              <ul className="space-y-2">
                {briefing.upcomingTasks.map(task => (
                  <li key={task.id} className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      task.priority === 'high' ? 'bg-red-500' :
                      task.priority === 'medium' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`} />
                    <span className="text-sm">{task.title}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No urgent tasks for today</p>
            )}
          </div>

          {/* Upcoming Meetings */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="text-blue-600" size={20} />
              <h3 className="font-medium">Today's Meetings</h3>
            </div>
            {briefing.upcomingMeetings.length > 0 ? (
              <ul className="space-y-2">
                {briefing.upcomingMeetings.map(meeting => (
                  <li key={meeting.id} className="text-sm">
                    <time className="text-gray-500">
                      {meeting.start.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </time>
                    <span className="ml-2">{meeting.title}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No meetings scheduled</p>
            )}
          </div>
        </div>

        {/* Emails and Tips */}
        <div className="space-y-6">
          {/* Priority Emails */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Mail className="text-blue-600" size={20} />
              <h3 className="font-medium">Priority Emails</h3>
            </div>
            {briefing.priorityEmails.length > 0 ? (
              <ul className="space-y-2">
                {briefing.priorityEmails.map(email => (
                  <li key={email.id} className="text-sm">
                    <p className="font-medium">{email.subject}</p>
                    <p className="text-gray-500">From: {email.sender}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No priority emails</p>
            )}
          </div>

          {/* Focus Areas */}
          {briefing.focusAreas.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Target className="text-blue-600" size={20} />
                <h3 className="font-medium">Focus Areas</h3>
              </div>
              <ul className="space-y-2">
                {briefing.focusAreas.map((area, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    • {area}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Productivity Tips */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="text-blue-600" size={20} />
              <h3 className="font-medium">Daily Tip</h3>
            </div>
            <p className="text-sm text-gray-700">
              {briefing.productivityTips[0]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}