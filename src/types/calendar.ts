export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
}

export interface CalendarState {
  isOpen: boolean;
  events: CalendarEvent[];
}