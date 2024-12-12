import { useState } from 'react';
import { CalendarEvent, CalendarState } from '../types/calendar';

export function useCalendar() {
  const [calendarState, setCalendarState] = useState<CalendarState>({
    isOpen: false,
    events: [],
  });

  const toggleCalendar = () => {
    setCalendarState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const addEvent = (event: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...event,
      id: Date.now().toString(),
    };
    setCalendarState(prev => ({
      ...prev,
      events: [...prev.events, newEvent],
    }));
  };

  return {
    calendarState,
    toggleCalendar,
    addEvent,
  };
}