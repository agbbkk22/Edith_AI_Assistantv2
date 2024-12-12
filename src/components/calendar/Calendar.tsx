import React, { useState } from 'react';
import { CalendarEvent } from '../../types/calendar';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { CalendarEventList } from './CalendarEventList';
import { MeetingScheduler } from './MeetingScheduler';
import { Plus } from 'lucide-react';

interface CalendarProps {
  events: CalendarEvent[];
  onClose: () => void;
  onAddEvent: (event: Omit<CalendarEvent, 'id'>) => void;
}

export function Calendar({ events, onClose, onAddEvent }: CalendarProps) {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
        <CalendarHeader onClose={onClose} />
        <div className="p-4">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsSchedulerOpen(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Plus size={16} />
              Schedule Meeting
            </button>
          </div>
          <CalendarGrid events={events} />
          <CalendarEventList events={events} />
        </div>
      </div>

      {isSchedulerOpen && (
        <MeetingScheduler
          events={events}
          onSchedule={onAddEvent}
          onClose={() => setIsSchedulerOpen(false)}
        />
      )}
    </div>
  );
}