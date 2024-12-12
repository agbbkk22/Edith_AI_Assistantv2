import { Email } from '../types/email';
import { ResponseTemplate, ResponseSuggestion } from '../types/response';

const defaultTemplates: ResponseTemplate[] = [
  {
    id: 'meeting-accept',
    name: 'Accept Meeting',
    pattern: '(meeting|discuss|call|sync).*\\b(schedule|set up|arrange)\\b',
    response: 'Thank you for the meeting invitation. I would be happy to join. The proposed time works for me, and I have added it to my calendar. Looking forward to our discussion.',
    category: 'meeting',
    tone: 'formal',
  },
  {
    id: 'meeting-reschedule',
    name: 'Reschedule Request',
    pattern: '(reschedule|change time|different time|postpone)',
    response: 'I apologize, but I need to reschedule our meeting. Could we please look for an alternative time? Here are a few slots that work for me: [AVAILABLE_TIMES]. Please let me know which works best for you.',
    category: 'meeting',
    tone: 'formal',
    variables: ['AVAILABLE_TIMES'],
  },
  {
    id: 'update-acknowledge',
    name: 'Acknowledge Update',
    pattern: '(update|status|progress|report)',
    response: 'Thank you for the detailed update. I have reviewed the information provided and appreciate being kept in the loop. I will follow up if I have any questions.',
    category: 'update',
    tone: 'neutral',
  },
  {
    id: 'request-received',
    name: 'Acknowledge Request',
    pattern: '(please|could you|would you|can you).*\\b(help|review|provide|send|check)\\b',
    response: 'I have received your request and will look into this. I aim to get back to you by [RESPONSE_DATE]. Please let me know if you need anything else in the meantime.',
    category: 'request',
    tone: 'formal',
    variables: ['RESPONSE_DATE'],
  },
  {
    id: 'followup-pending',
    name: 'Pending Follow-up',
    pattern: '(following up|checking in|any update|status)',
    response: 'Thank you for following up. I am currently working on this and will have an update for you by [RESPONSE_DATE]. I appreciate your patience.',
    category: 'followup',
    tone: 'neutral',
    variables: ['RESPONSE_DATE'],
  },
];

function calculateResponseDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 1); // Default to next business day
  return date.toLocaleDateString();
}

function extractVariables(email: Email): Record<string, string> {
  // In a real implementation, this would use NLP to extract context-specific variables
  return {
    RESPONSE_DATE: calculateResponseDate(),
    AVAILABLE_TIMES: '- Tomorrow at 2 PM\n- Thursday at 10 AM\n- Friday at 3 PM',
  };
}

function calculateConfidence(template: ResponseTemplate, email: Email): number {
  const content = `${email.subject} ${email.content}`.toLowerCase();
  const pattern = new RegExp(template.pattern, 'i');
  
  // Base confidence on pattern match
  if (!pattern.test(content)) return 0;
  
  let confidence = 0.6; // Base confidence for pattern match
  
  // Adjust based on keyword presence
  const keywords = template.pattern.split('|');
  const matchCount = keywords.filter(keyword => 
    content.includes(keyword.replace(/[()\\b]/g, ''))
  ).length;
  
  confidence += (matchCount / keywords.length) * 0.4;
  
  return Math.min(confidence, 1);
}

function fillTemplate(template: ResponseTemplate, variables: Record<string, string>): string {
  let response = template.response;
  if (template.variables) {
    template.variables.forEach(variable => {
      response = response.replace(`[${variable}]`, variables[variable] || `[${variable}]`);
    });
  }
  return response;
}

export function generateResponseSuggestions(email: Email): ResponseSuggestion[] {
  const variables = extractVariables(email);
  
  return defaultTemplates
    .map(template => {
      const confidence = calculateConfidence(template, email);
      if (confidence === 0) return null;
      
      return {
        template,
        confidence,
        filledResponse: fillTemplate(template, variables),
        variables,
      };
    })
    .filter((suggestion): suggestion is ResponseSuggestion => suggestion !== null)
    .sort((a, b) => b.confidence - a.confidence);
}