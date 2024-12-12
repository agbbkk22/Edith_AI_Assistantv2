import { Email } from '../types/email';
import { EmailPriorityRule, EmailPriorityScore, EmailPriorityLevel } from '../types/emailPriority';
import { defaultPriorityRules } from './priorityRules';

function calculateBaseScore(email: Email): number {
  let score = 50; // Base score

  // Time-based scoring
  const now = new Date();
  const emailAge = now.getTime() - email.timestamp.getTime();
  const hoursOld = emailAge / (1000 * 60 * 60);
  
  if (hoursOld < 1) score += 20;
  else if (hoursOld < 4) score += 10;
  else if (hoursOld > 24) score -= 10;
  
  return score;
}

function evaluateRule(email: Email, rule: EmailPriorityRule): boolean {
  const content = `${email.subject} ${email.content}`.toLowerCase();
  
  if (typeof rule.pattern === 'string') {
    return content.includes(rule.pattern.toLowerCase());
  }
  
  return rule.pattern.test(content);
}

function getPriorityScore(priority: EmailPriorityLevel): number {
  switch (priority) {
    case 'urgent': return 40;
    case 'important': return 30;
    case 'normal': return 20;
    case 'low': return 10;
    default: return 0;
  }
}

export function prioritizeEmail(
  email: Email,
  customRules: EmailPriorityRule[] = []
): EmailPriorityScore {
  const rules = [...defaultPriorityRules, ...customRules];
  let score = calculateBaseScore(email);
  const reasons: string[] = [];
  const matchedRules = new Set<EmailPriorityRule>();

  // Evaluate each rule
  rules.forEach(rule => {
    if (evaluateRule(email, rule)) {
      matchedRules.add(rule);
      score += getPriorityScore(rule.priority);
      reasons.push(`Matches ${rule.name} criteria`);
    }
  });

  // Determine suggested priority based on score
  let suggestedPriority: EmailPriorityLevel;
  if (score >= 90) suggestedPriority = 'urgent';
  else if (score >= 70) suggestedPriority = 'important';
  else if (score >= 40) suggestedPriority = 'normal';
  else suggestedPriority = 'low';

  // Determine category if any rule matched
  const category = matchedRules.size > 0
    ? Array.from(matchedRules)[0].category
    : undefined;

  return {
    score,
    reasons,
    suggestedPriority,
    category,
  };
}