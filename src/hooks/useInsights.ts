import { useState, useCallback } from 'react';
import { generateDailyBriefing, generateBusinessMetrics } from '../utils/insightsGenerator';
import { Task } from '../types/task';
import { CalendarEvent } from '../types/calendar';
import { Email } from '../types/email';

export function useInsights() {
  const [isOpen, setIsOpen] = useState(false);

  const generateInsights = useCallback((tasks: Task[], events: CalendarEvent[], emails: Email[]) => {
    const briefing = generateDailyBriefing(tasks, events, emails);
    const metrics = generateBusinessMetrics(tasks, events, emails);
    return { briefing, metrics };
  }, []);

  return {
    isOpen,
    setIsOpen,
    generateInsights,
  };
}