import { Email } from '../types/email';
import { EmailFilter } from '../types/emailPriority';

function evaluateCondition(
  email: Email,
  field: EmailFilter['conditions'][0]['field'],
  operator: EmailFilter['conditions'][0]['operator'],
  value: string
): boolean {
  let fieldValue = '';
  switch (field) {
    case 'subject':
      fieldValue = email.subject;
      break;
    case 'sender':
      fieldValue = email.sender;
      break;
    case 'content':
      fieldValue = email.content;
      break;
    case 'recipients':
      fieldValue = email.recipients.join(',');
      break;
  }

  switch (operator) {
    case 'contains':
      return fieldValue.toLowerCase().includes(value.toLowerCase());
    case 'equals':
      return fieldValue.toLowerCase() === value.toLowerCase();
    case 'startsWith':
      return fieldValue.toLowerCase().startsWith(value.toLowerCase());
    case 'endsWith':
      return fieldValue.toLowerCase().endsWith(value.toLowerCase());
    case 'matches':
      return new RegExp(value, 'i').test(fieldValue);
    default:
      return false;
  }
}

export function applyFilters(email: Email, filters: EmailFilter[]): EmailFilter[] {
  return filters.filter(filter =>
    filter.conditions.every(condition =>
      evaluateCondition(email, condition.field, condition.operator, condition.value)
    )
  );
}