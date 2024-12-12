import React from 'react';
import { Lightbulb } from 'lucide-react';

interface SuggestedQueriesProps {
  onSelectQuery: (query: string) => void;
}

export function SuggestedQueries({ onSelectQuery }: SuggestedQueriesProps) {
  const suggestions = [
    "Create a meeting agenda template",
    "Summarize this quarter's goals",
    "Draft a professional email",
    "Generate a project timeline",
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb size={16} className="text-yellow-500" />
        <h3 className="text-sm font-medium text-gray-700">Suggested Queries</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onSelectQuery(suggestion)}
            className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}