import { CalendarEvent } from '../types/calendar';
import { MeetingConstraints, TimeSlot, SchedulingSuggestion, TimePreference } from '../types/scheduling';

const WORK_HOURS: TimePreference = {
  startHour: 9,
  endHour: 17,
  preferredDays: [1, 2, 3, 4, 5], // Monday to Friday
  weight: 1,
};

function isOverlapping(slot1: { start: Date; end: Date }, slot2: { start: Date; end: Date }): boolean {
  return slot1.start < slot2.end && slot1.end > slot2.start;
}

function calculateTimeSlotScore(
  slot: Omit<TimeSlot, 'score'>,
  constraints: MeetingConstraints,
  existingEvents: CalendarEvent[],
): number {
  let score = 1;

  // Check work hours preference
  const hour = slot.start.getHours();
  const day = slot.start.getDay();
  if (
    hour < WORK_HOURS.startHour ||
    hour >= WORK_HOURS.endHour ||
    !WORK_HOURS.preferredDays.includes(day)
  ) {
    score *= 0.5;
  }

  // Check preferred time ranges
  const matchesPreferredTime = constraints.preferredTimeRanges.some(
    (pref) =>
      hour >= pref.startHour &&
      hour < pref.endHour &&
      pref.preferredDays.includes(day)
  );
  if (matchesPreferredTime) {
    score *= 1.5;
  }

  // Check proximity to other events
  const nearbyEvents = existingEvents.filter((event) => {
    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);
    const bufferBefore = constraints.bufferBefore || 15;
    const bufferAfter = constraints.bufferAfter || 15;
    
    const slotWithBuffer = {
      start: new Date(slot.start.getTime() - bufferBefore * 60000),
      end: new Date(slot.end.getTime() + bufferAfter * 60000),
    };
    
    return isOverlapping(slotWithBuffer, { start: eventStart, end: eventEnd });
  });

  if (nearbyEvents.length > 0) {
    score *= 0.7;
  }

  return score;
}

function generateTimeSlots(
  startDate: Date,
  endDate: Date,
  duration: number,
): Array<Omit<TimeSlot, 'score' | 'conflicts'>> {
  const slots: Array<Omit<TimeSlot, 'score' | 'conflicts'>> = [];
  const current = new Date(startDate);
  const durationMs = duration * 60000;

  while (current < endDate) {
    const slotEnd = new Date(current.getTime() + durationMs);
    slots.push({
      start: new Date(current),
      end: slotEnd,
    });
    current.setMinutes(current.getMinutes() + 30); // 30-minute intervals
  }

  return slots;
}

export function findOptimalMeetingTimes(
  constraints: MeetingConstraints,
  existingEvents: CalendarEvent[],
  startDate: Date = new Date(),
  daysToCheck: number = 5,
): SchedulingSuggestion {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + daysToCheck);

  const slots = generateTimeSlots(startDate, endDate, constraints.duration);

  const scoredSlots: TimeSlot[] = slots
    .map((slot) => {
      const conflicts = [];
      const overlappingEvents = existingEvents.filter((event) =>
        isOverlapping(slot, event)
      );

      if (overlappingEvents.length > 0) {
        conflicts.push(
          ...overlappingEvents.map((event) => ({
            type: 'event' as const,
            description: event.title,
          }))
        );
      }

      const score = calculateTimeSlotScore(slot, constraints, existingEvents);

      return {
        ...slot,
        score,
        conflicts,
      };
    })
    .filter((slot) => slot.conflicts.length === 0)
    .sort((a, b) => b.score - a.score);

  if (scoredSlots.length === 0) {
    throw new Error('No available time slots found matching the constraints');
  }

  const bestSlot = scoredSlots[0];
  const alternativeSlots = scoredSlots.slice(1, 4);

  // Mock attendee availability - in a real app, this would check against attendee calendars
  const attendeeAvailability = constraints.requiredAttendees.reduce(
    (acc, attendee) => ({
      ...acc,
      [attendee]: Math.random() > 0.2, // 80% chance of availability
    }),
    {}
  );

  return {
    timeSlot: bestSlot,
    alternativeSlots,
    attendeeAvailability,
  };
}