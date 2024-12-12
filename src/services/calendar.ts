import { CalendarEvent } from '../types/calendar';

export async function fetchCalendarEvents(accessToken: string): Promise<CalendarEvent[]> {
  try {
    const now = new Date();
    const timeMin = now.toISOString();
    const timeMax = new Date(now.setMonth(now.getMonth() + 1)).toISOString();

    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    
    const data = await response.json();
    
    return data.items.map((event: any) => ({
      id: event.id,
      title: event.summary,
      start: new Date(event.start.dateTime || event.start.date),
      end: new Date(event.end.dateTime || event.end.date),
      description: event.description,
    }));
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    return [];
  }
}

export async function createCalendarEvent(
  accessToken: string,
  event: Omit<CalendarEvent, 'id'>
): Promise<CalendarEvent | null> {
  try {
    const response = await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          summary: event.title,
          description: event.description,
          start: {
            dateTime: event.start.toISOString(),
          },
          end: {
            dateTime: event.end.toISOString(),
          },
        }),
      }
    );
    
    const data = await response.json();
    
    return {
      id: data.id,
      title: data.summary,
      start: new Date(data.start.dateTime || data.start.date),
      end: new Date(data.end.dateTime || data.end.date),
      description: data.description,
    };
  } catch (error) {
    console.error('Error creating calendar event:', error);
    return null;
  }
}