import React from 'react';
import { ResponseSuggestion } from '../../types/response';
import { MessageSquare, ThumbsUp, Copy } from 'lucide-react';

interface ResponseSuggestionsProps {
  suggestions: ResponseSuggestion[];
  onSelectResponse: (response: string) => void;
}

export function ResponseSuggestions({ suggestions, onSelectResponse }: ResponseSuggestionsProps) {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MessageSquare size={16} className="text-blue-500" />
        <h3 className="text-sm font-medium text-gray-700">Suggested Responses</h3>
      </div>

      <div className="space-y-3">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.template.id}
            className="p-3 border rounded-lg hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{suggestion.template.name}</span>
                <span className="text-xs text-gray-500">
                  ({Math.round(suggestion.confidence * 100)}% match)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectResponse(suggestion.filledResponse)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Copy size={16} className="text-gray-500" />
                </button>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 whitespace-pre-line">
              {suggestion.filledResponse}
            </p>
            
            <div className="mt-2 flex items-center gap-2">
              <span className={`
                text-xs px-2 py-1 rounded-full
                ${suggestion.template.tone === 'formal' ? 'bg-blue-100 text-blue-700' :
                  suggestion.template.tone === 'casual' ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-700'}
              `}>
                {suggestion.template.tone.charAt(0).toUpperCase() + suggestion.template.tone.slice(1)} Tone
              </span>
              <span className="text-xs text-gray-500">
                {suggestion.template.category.charAt(0).toUpperCase() + suggestion.template.category.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}