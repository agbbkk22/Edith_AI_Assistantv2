import { Task } from '../types/task';
import { CategorySuggestion, TaskCategory, TimeSlot } from '../types/taskCategory';
import { categoryMetadata } from './categoryData';

function calculateCategoryConfidence(text: string, category: TaskCategory): number {
  const metadata = categoryMetadata[category];
  const words = text.toLowerCase().split(/\s+/);
  
  let matches = 0;
  for (const pattern of metadata.keywordPatterns) {
    if (text.toLowerCase().includes(pattern.toLowerCase())) {
      matches++;
    }
  }
  
  return matches > 0 ? Math.min(matches * 0.3, 1) : 0;
}

function findBestTimeSlot(category: TaskCategory): TimeSlot {
  const now = new Date();
  const currentDay = now.getDay();
  const slots = categoryMetadata[category].preferredTimeSlots;
  
  // Find the next available preferred time slot
  for (const slot of slots) {
    if (slot.preferredDays.includes(currentDay)) {
      const currentHour = now.getHours();
      if (currentHour < slot.endHour) {
        return slot;
      }
    }
  }
  
  // If no slot found today, return the first slot for the next preferred day
  const slot = slots[0];
  const nextDay = slot.preferredDays.find(day => day > currentDay) ?? slot.preferredDays[0];
  return { ...slot, preferredDays: [nextDay] };
}

export function categorizeTask(task: Task): CategorySuggestion[] {
  const text = `${task.title} ${task.description ?? ''} ${task.tags.join(' ')}`;
  
  const suggestions: CategorySuggestion[] = Object.keys(categoryMetadata)
    .map(category => {
      const confidence = calculateCategoryConfidence(text, category as TaskCategory);
      return {
        category: category as TaskCategory,
        confidence,
        suggestedTimeSlot: findBestTimeSlot(category as TaskCategory),
      };
    })
    .filter(suggestion => suggestion.confidence > 0)
    .sort((a, b) => b.confidence - a.confidence);

  // If no categories match, return 'other'
  if (suggestions.length === 0) {
    return [{
      category: 'other',
      confidence: 1,
      suggestedTimeSlot: findBestTimeSlot('other'),
    }];
  }

  return suggestions;
}

export function formatTimeSlot(slot: TimeSlot): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const formatHour = (hour: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    return `${adjustedHour}${period}`;
  };

  const dayNames = slot.preferredDays.map(day => days[day]).join(' or ');
  return `${dayNames} between ${formatHour(slot.startHour)} and ${formatHour(slot.endHour)}`;
}