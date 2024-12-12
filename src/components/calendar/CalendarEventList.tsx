import React from 'react';
import { CalendarEvent } from '../../types/calendar';
import { Clock } from 'lucide-react';

interface CalendarEventListProps {
  events: CalendarEvent[];
}

export function CalendarEventList({ events }: CalendarEventListProps) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Upcoming Events</h3>
      <div className="space-y-2">
        {events.length === 0 ? (
          <p className="text-gray-500 text-sm">No upcoming events</p>
        ) : (
          events.map(event => (
            <div key={event.id} className="flex items-center gap-2 p-2 border rounded-lg">
              <Clock size={16} className="text-blue-600" />
              <div>
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-gray-500">
                  {event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}