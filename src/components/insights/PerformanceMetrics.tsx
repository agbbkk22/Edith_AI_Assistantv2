import React from 'react';
import { BusinessMetrics } from '../../types/insights';
import { TrendingUp, TrendingDown, Minus, PieChart } from 'lucide-react';

interface PerformanceMetricsProps {
  metrics: BusinessMetrics;
}

export function PerformanceMetrics({ metrics }: PerformanceMetricsProps) {
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={16} className="text-green-500" />;
      case 'down':
        return <TrendingDown size={16} className="text-red-500" />;
      case 'stable':
        return <Minus size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Performance Metrics</h2>
        <div className="flex items-center gap-2">
          <PieChart size={20} className="text-blue-600" />
          <span className="text-lg font-medium">
            {Math.round(metrics.productivityScore)}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Performance Insights */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">Key Insights</h3>
          <div className="space-y-4">
            {metrics.insights.map((insight, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  insight.type === 'success' ? 'bg-green-50' :
                  insight.type === 'warning' ? 'bg-yellow-50' :
                  'bg-blue-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{insight.metric}</span>
                  <div className="flex items-center gap-2">
                    <span className={`
                      text-sm font-medium
                      ${insight.type === 'success' ? 'text-green-700' :
                        insight.type === 'warning' ? 'text-yellow-700' :
                        'text-blue-700'}
                    `}>
                      {Math.round(insight.value)}%
                    </span>
                    {getTrendIcon(insight.trend)}
                  </div>
                </div>
                {insight.recommendation && (
                  <p className="text-sm text-gray-600">
                    {insight.recommendation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Time Utilization */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">Time Utilization</h3>
          <div className="space-y-4">
            {Object.entries(metrics.timeUtilization).map(([category, percentage]) => (
              <div key={category} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm capitalize">{category}</span>
                  <span className="text-sm text-gray-500">
                    {Math.round(percentage)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      category === 'meetings' ? 'bg-blue-500' :
                      category === 'tasks' ? 'bg-green-500' :
                      category === 'email' ? 'bg-yellow-500' :
                      'bg-purple-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}