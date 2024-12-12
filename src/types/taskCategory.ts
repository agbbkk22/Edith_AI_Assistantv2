export type TaskCategory = 
  | 'meeting'
  | 'email'
  | 'admin'
  | 'client-followup'
  | 'project'
  | 'research'
  | 'planning'
  | 'other';

export interface CategoryMetadata {
  name: TaskCategory;
  icon: string;
  color: string;
  preferredTimeSlots: TimeSlot[];
  keywordPatterns: string[];
}

export interface TimeSlot {
  startHour: number;
  endHour: number;
  preferredDays: number[]; // 0 = Sunday, 6 = Saturday
}

export interface CategorySuggestion {
  category: TaskCategory;
  confidence: number;
  suggestedTimeSlot: TimeSlot;
}