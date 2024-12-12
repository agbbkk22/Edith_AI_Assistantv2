import { Email, EmailSummary } from '../types/email';

function extractKeyPoints(content: string): string[] {
  // In a real implementation, this would use NLP to identify key points
  const sentences = content.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
  const keyPoints = sentences.filter(sentence => {
    const isImportant = sentence.toLowerCase().includes('important') ||
                       sentence.toLowerCase().includes('key') ||
                       sentence.toLowerCase().includes('please') ||
                       sentence.toLowerCase().includes('required');
    return isImportant && sentence.length > 20;
  });
  
  return keyPoints.slice(0, 3);
}

function generateSuggestedResponse(email: Email): string | undefined {
  // In a real implementation, this would use AI to generate contextual responses
  if (email.content.toLowerCase().includes('meeting')) {
    return 'Thank you for the meeting request. I will review my calendar and get back to you shortly.';
  }
  if (email.content.toLowerCase().includes('update')) {
    return 'Thank you for the update. I will review the information provided.';
  }
  return undefined;
}

function extractActionItems(content: string): string[] {
  // In a real implementation, this would use NLP to identify action items
  const sentences = content.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
  return sentences.filter(sentence => {
    const hasActionWord = sentence.toLowerCase().includes('please') ||
                         sentence.toLowerCase().includes('need to') ||
                         sentence.toLowerCase().includes('required') ||
                         sentence.toLowerCase().includes('must');
    return hasActionWord;
  });
}

function calculatePriority(email: Email): Email['priority'] {
  const urgentWords = ['urgent', 'asap', 'emergency', 'immediate'];
  const importantWords = ['important', 'priority', 'critical'];
  
  const content = email.subject.toLowerCase() + ' ' + email.content.toLowerCase();
  
  if (urgentWords.some(word => content.includes(word))) {
    return 'high';
  }
  if (importantWords.some(word => content.includes(word))) {
    return 'medium';
  }
  return 'low';
}

function analyzeSentiment(content: string): EmailSummary['sentiment'] {
  const positiveWords = ['thanks', 'great', 'good', 'appreciate', 'pleased'];
  const negativeWords = ['concerned', 'issue', 'problem', 'disappointed', 'urgent'];
  
  const text = content.toLowerCase();
  const positiveCount = positiveWords.filter(word => text.includes(word)).length;
  const negativeCount = negativeWords.filter(word => text.includes(word)).length;
  
  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
}

export function analyzeEmail(email: Email): EmailSummary {
  const keyPoints = extractKeyPoints(email.content);
  const actionItems = extractActionItems(email.content);
  const suggestedResponse = generateSuggestedResponse(email);
  const priority = calculatePriority(email);
  const sentiment = analyzeSentiment(email.content);
  
  // Estimate read time (average reading speed: 250 words per minute)
  const wordCount = email.content.split(/\s+/).length;
  const estimatedReadTime = Math.ceil(wordCount / 250);

  return {
    keyPoints,
    suggestedResponse,
    actionItems,
    priority,
    estimatedReadTime,
    sentiment,
  };
}