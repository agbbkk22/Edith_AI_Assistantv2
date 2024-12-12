import React from 'react';
import { CategorySuggestion } from '../../types/taskCategory';
import { categoryMetadata } from '../../utils/categoryData';
import { formatTimeSlot } from '../../utils/taskCategorization';
import * as Icons from 'lucide-react';

interface TaskCategorySuggestionsProps {
  suggestions: CategorySuggestion[];
  onSelectCategory: (category: CategorySuggestion) => void;
}

export function TaskCategorySuggestions({ 
  suggestions,
  onSelectCategory,
}: TaskCategorySuggestionsProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-700">Suggested Categories</h3>
      <div className="space-y-2">
        {suggestions.map((suggestion) => {
          const metadata = categoryMetadata[suggestion.category];
          const Icon = Icons[metadata.icon as keyof typeof Icons];
          
          return (
            <button
              key={metadata.name}
              onClick={() => onSelectCategory(suggestion)}
              className="w-full text-left p-2 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Icon size={16} className={`text-${metadata.color}-500`} />
                <span className="font-medium capitalize">
                  {metadata.name.replace('-', ' ')}
                </span>
                <span className="text-sm text-gray-500">
                  ({Math.round(suggestion.confidence * 100)}% match)
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Suggested time: {formatTimeSlot(suggestion.suggestedTimeSlot)}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}