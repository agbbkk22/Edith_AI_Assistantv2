export interface TimePreference {
  startHour: number;
  endHour: number;
  preferredDays: number[]; // 0 = Sunday, 6 = Saturday
  weight: number; // 0-1, importance of this preference
}

export interface MeetingConstraints {
  duration: number; // in minutes
  minAttendees: number;
  maxAttendees?: number;
  requiredAttendees: string[];
  optionalAttendees?: string[];
  preferredTimeRanges: TimePreference[];
  location?: 'online' | 'in-person' | 'hybrid';
  bufferBefore?: number; // minutes
  bufferAfter?: number; // minutes
}

export interface TimeSlot {
  start: Date;
  end: Date;
  score: number;
  conflicts: Array<{
    type: 'event' | 'preference' | 'buffer';
    description: string;
  }>;
}

export interface SchedulingSuggestion {
  timeSlot: TimeSlot;
  alternativeSlots: TimeSlot[];
  attendeeAvailability: Record<string, boolean>;
}