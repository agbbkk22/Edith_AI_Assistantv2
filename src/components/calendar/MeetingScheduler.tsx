import React, { useState } from 'react';
import { CalendarEvent } from '../../types/calendar';
import { MeetingConstraints, SchedulingSuggestion } from '../../types/scheduling';
import { findOptimalMeetingTimes } from '../../utils/schedulingEngine';
import { Clock, Users, MapPin } from 'lucide-react';

interface MeetingSchedulerProps {
  events: CalendarEvent[];
  onSchedule: (event: Omit<CalendarEvent, 'id'>) => void;
  onClose: () => void;
}

export function MeetingScheduler({ events, onSchedule, onClose }: MeetingSchedulerProps) {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(30);
  const [attendees, setAttendees] = useState('');
  const [location, setLocation] = useState<'online' | 'in-person' | 'hybrid'>('online');
  const [suggestions, setSuggestions] = useState<SchedulingSuggestion | null>(null);

  const findTimes = () => {
    const constraints: MeetingConstraints = {
      duration,
      minAttendees: 2,
      requiredAttendees: attendees.split(',').map(a => a.trim()),
      preferredTimeRanges: [
        {
          startHour: 9,
          endHour: 12,
          preferredDays: [1, 2, 3, 4, 5],
          weight: 0.8,
        },
        {
          startHour: 14,
          endHour: 17,
          preferredDays: [1, 2, 3, 4, 5],
          weight: 0.7,
        },
      ],
      location,
      bufferBefore: 15,
      bufferAfter: 15,
    };

    try {
      const suggestion = findOptimalMeetingTimes(constraints, events);
      setSuggestions(suggestion);
    } catch (error) {
      console.error('Failed to find meeting times:', error);
    }
  };

  const handleSchedule = (timeSlot: SchedulingSuggestion['timeSlot']) => {
    onSchedule({
      title,
      start: timeSlot.start,
      end: timeSlot.end,
      description: `Meeting with ${attendees}\nLocation: ${location}`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Schedule Meeting</h2>
        </div>

        <div className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Meeting Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Weekly Team Sync"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Duration (minutes)
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>1 hour</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Attendees (comma-separated emails)
              </label>
              <input
                type="text"
                value={attendees}
                onChange={(e) => setAttendees(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="john@example.com, jane@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value as any)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="online">Online</option>
                <option value="in-person">In Person</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <button
              onClick={findTimes}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Find Available Times
            </button>
          </div>

          {suggestions && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Suggested Times</h3>
              <div className="space-y-3">
                {[suggestions.timeSlot, ...suggestions.alternativeSlots].map((slot, index) => (
                  <button
                    key={slot.start.toISOString()}
                    onClick={() => handleSchedule(slot)}
                    className="w-full p-3 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Clock size={20} className="text-blue-500" />
                      <div>
                        <p className="font-medium">
                          {slot.start.toLocaleString([], {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                        <p className="text-sm text-gray-500">
                          Score: {Math.round(slot.score * 100)}%
                        </p>
                      </div>
                    </div>
                    {index === 0 && (
                      <span className="text-sm text-green-600 font-medium">
                        Best Option
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}