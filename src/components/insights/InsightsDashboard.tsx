import React, { useState } from 'react';
import { DailyBriefing } from './DailyBriefing';
import { PerformanceMetrics } from './PerformanceMetrics';
import { Calendar, TrendingUp, X } from 'lucide-react';
import { Task } from '../../types/task';
import { CalendarEvent } from '../../types/calendar';
import { Email } from '../../types/email';
import { generateDailyBriefing, generateBusinessMetrics } from '../../utils/insightsGenerator';

interface InsightsDashboardProps {
  tasks: Task[];
  events: CalendarEvent[];
  emails: Email[];
  onClose: () => void;
}

export function InsightsDashboard({ 
  tasks, 
  events, 
  emails, 
  onClose 
}: InsightsDashboardProps) {
  const [activeTab, setActiveTab] = useState<'daily' | 'performance'>('daily');
  
  const briefing = generateDailyBriefing(tasks, events, emails);
  const metrics = generateBusinessMetrics(tasks, events, emails);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-50 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">Business Insights</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('daily')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'daily'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  Daily Overview
                </div>
              </button>
              <button
                onClick={() => setActiveTab('performance')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'performance'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} />
                  Performance Analytics
                </div>
              </button>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {activeTab === 'daily' ? (
            <DailyBriefing briefing={briefing} />
          ) : (
            <PerformanceMetrics metrics={metrics} />
          )}
        </div>
      </div>
    </div>
  );
}