import { useState, useCallback } from 'react';
import { Email } from '../types/email';
import { EmailPriorityRule, EmailFilter } from '../types/emailPriority';
import { prioritizeEmail } from '../utils/emailPrioritizer';
import { applyFilters } from '../utils/emailFilter';
import { defaultPriorityRules } from '../utils/priorityRules';

export function useEmailPriority() {
  const [customRules, setCustomRules] = useState<EmailPriorityRule[]>([]);
  const [filters, setFilters] = useState<EmailFilter[]>([]);

  const addCustomRule = useCallback((rule: Omit<EmailPriorityRule, 'id'>) => {
    setCustomRules(prev => [...prev, { ...rule, id: `custom-${Date.now()}` }]);
  }, []);

  const removeCustomRule = useCallback((ruleId: string) => {
    setCustomRules(prev => prev.filter(rule => rule.id !== ruleId));
  }, []);

  const addFilter = useCallback((filter: Omit<EmailFilter, 'id'>) => {
    setFilters(prev => [...prev, { ...filter, id: `filter-${Date.now()}` }]);
  }, []);

  const removeFilter = useCallback((filterId: string) => {
    setFilters(prev => prev.filter(filter => filter.id !== filterId));
  }, []);

  const processEmail = useCallback((email: Email) => {
    const priorityScore = prioritizeEmail(email, customRules);
    const matchedFilters = applyFilters(email, filters);

    return {
      priorityScore,
      matchedFilters,
      rules: [...defaultPriorityRules, ...customRules],
    };
  }, [customRules, filters]);

  return {
    customRules,
    filters,
    addCustomRule,
    removeCustomRule,
    addFilter,
    removeFilter,
    processEmail,
  };
}