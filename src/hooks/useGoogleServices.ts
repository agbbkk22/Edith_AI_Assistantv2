import { useEffect } from 'react';
import { useGoogleAuth } from './useGoogleAuth';
import { fetchEmails } from '../services/gmail';
import { fetchCalendarEvents } from '../services/calendar';
import { useEmails } from './useEmails';
import { useCalendar } from './useCalendar';

export function useGoogleServices() {
  const { authState, enabledServices } = useGoogleAuth();
  const { addEmail } = useEmails();
  const { addEvent } = useCalendar();

  useEffect(() => {
    if (authState.isAuthenticated && authState.accessToken) {
      if (enabledServices.gmail) {
        fetchEmails(authState.accessToken).then(emails => {
          emails.forEach(addEmail);
        });
      }

      if (enabledServices.calendar) {
        fetchCalendarEvents(authState.accessToken).then(events => {
          events.forEach(event => {
            addEvent({
              title: event.title,
              start: event.start,
              end: event.end,
              description: event.description,
            });
          });
        });
      }
    }
  }, [authState.isAuthenticated, authState.accessToken, enabledServices]);

  return {
    isConnected: authState.isAuthenticated,
    enabledServices,
  };
}