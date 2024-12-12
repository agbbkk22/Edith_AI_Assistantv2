import React from 'react';
import { CalendarEvent } from '../../types/calendar';

interface CalendarGridProps {
  events: CalendarEvent[];
}

export function CalendarGrid({ events }: CalendarGridProps) {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  // Get first day of month and total days
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const totalDays = lastDay.getDate();
  const startingDay = firstDay.getDay();

  // Generate calendar days
  const days = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - startingDay + 1;
    if (dayNumber < 1 || dayNumber > totalDays) return null;
    return dayNumber;
  });

  // Get events for a specific day
  const getEventsForDay = (day: number | null) => {
    if (!day) return [];
    const date = new Date(currentYear, currentMonth, day);
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.getDate() === day &&
             eventDate.getMonth() === currentMonth &&
             eventDate.getFullYear() === currentYear;
    });
  };

  return (
    <div className="mb-4">
      <div className="grid grid-cols-7 gap-1 mb-1">
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          const dayEvents = getEventsForDay(day);
          const isToday = day === today.getDate() && 
                         currentMonth === today.getMonth() && 
                         currentYear === today.getFullYear();

          return (
            <div
              key={i}
              className={`
                min-h-[80px] border rounded-lg p-1
                ${day ? 'hover:bg-gray-50' : 'bg-gray-50'}
                ${isToday ? 'border-blue-500' : 'border-gray-200'}
              `}
            >
              {day && (
                <>
                  <div className={`text-sm ${isToday ? 'font-bold text-blue-600' : ''}`}>
                    {day}
                  </div>
                  <div className="mt-1">
                    {dayEvents.slice(0, 2).map((event, index) => (
                      <div
                        key={event.id}
                        className="text-xs p-1 mb-1 rounded bg-blue-100 text-blue-800 truncate"
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}