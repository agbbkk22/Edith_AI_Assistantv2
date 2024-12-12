import React from 'react';
import { Calendar } from '../../calendar/Calendar';

interface CalendarPanelProps {
  state: any;
  onClose: () => void;
}

export function CalendarPanel({ state, onClose }: CalendarPanelProps) {
  return (
    <Calendar
      events={state.calendarState.events}
      onClose={onClose}
      onAddEvent={state.addEvent}
    />
  );
}