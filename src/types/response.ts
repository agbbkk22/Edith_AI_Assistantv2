export interface ResponseTemplate {
  id: string;
  name: string;
  pattern: string;
  response: string;
  category: 'meeting' | 'update' | 'request' | 'followup' | 'general';
  tone: 'formal' | 'casual' | 'neutral';
  variables?: string[];
}

export interface ResponseSuggestion {
  template: ResponseTemplate;
  confidence: number;
  filledResponse: string;
  variables?: Record<string, string>;
}

export interface ResponseState {
  templates: ResponseTemplate[];
  customTemplates: ResponseTemplate[];
  recentlyUsed: string[]; // template IDs
}