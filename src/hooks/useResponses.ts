import { useState } from 'react';
import { ResponseState, ResponseTemplate, ResponseSuggestion } from '../types/response';
import { Email } from '../types/email';
import { generateResponseSuggestions } from '../utils/responseGenerator';

export function useResponses() {
  const [responseState, setResponseState] = useState<ResponseState>({
    templates: [],
    customTemplates: [],
    recentlyUsed: [],
  });

  const addCustomTemplate = (template: Omit<ResponseTemplate, 'id'>) => {
    const newTemplate: ResponseTemplate = {
      ...template,
      id: `custom-${Date.now()}`,
    };
    
    setResponseState(prev => ({
      ...prev,
      customTemplates: [...prev.customTemplates, newTemplate],
    }));
  };

  const removeCustomTemplate = (templateId: string) => {
    setResponseState(prev => ({
      ...prev,
      customTemplates: prev.customTemplates.filter(t => t.id !== templateId),
    }));
  };

  const markTemplateAsUsed = (templateId: string) => {
    setResponseState(prev => ({
      ...prev,
      recentlyUsed: [
        templateId,
        ...prev.recentlyUsed.filter(id => id !== templateId),
      ].slice(0, 5), // Keep only last 5
    }));
  };

  const getSuggestedResponses = (email: Email): ResponseSuggestion[] => {
    const suggestions = generateResponseSuggestions(email);
    
    // Sort suggestions, prioritizing recently used templates
    return suggestions.sort((a, b) => {
      const aRecentIndex = responseState.recentlyUsed.indexOf(a.template.id);
      const bRecentIndex = responseState.recentlyUsed.indexOf(b.template.id);
      
      if (aRecentIndex !== -1 && bRecentIndex === -1) return -1;
      if (bRecentIndex !== -1 && aRecentIndex === -1) return 1;
      if (aRecentIndex !== -1 && bRecentIndex !== -1) {
        return aRecentIndex - bRecentIndex;
      }
      
      return b.confidence - a.confidence;
    });
  };

  return {
    responseState,
    addCustomTemplate,
    removeCustomTemplate,
    markTemplateAsUsed,
    getSuggestedResponses,
  };
}