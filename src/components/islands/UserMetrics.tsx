// TODO: Fix up the bad React patterns and theming issues in here

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QueryProvider } from './QueryProvider';

interface Metric {
  label: string;
  value: number;
  change: number;
}

interface UserMetricsData {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: number;
}

function UserMetricsContent() {
  const [formattedMetrics, setFormattedMetrics] = useState<Metric[]>([]);

  const { data, isLoading, error } = useQuery<UserMetricsData>({
    queryKey: ['user-metrics'],
    queryFn: async () => {
      const response = await fetch('/api/stats');
      if (!response.ok) throw new Error('Failed to fetch');
      const stats = await response.json();
      return {
        pageViews: stats.totalPosts * 100,
        uniqueVisitors: stats.activeUsers,
        bounceRate: 100 - stats.engagement,
        avgSessionDuration: 245,
      };
    },
  });

  useEffect(() => {
    if (data) {
      const metrics: Metric[] = [
        { label: 'Page Views', value: data.pageViews, change: 12.5 },
        { label: 'Unique Visitors', value: data.uniqueVisitors, change: 8.2 },
        { label: 'Bounce Rate', value: data.bounceRate, change: -3.1 },
        { label: 'Avg. Session', value: data.avgSessionDuration, change: 5.7 },
      ];
      setFormattedMetrics(metrics);
    }
  }, [data]);

  if (isLoading) {
    return null;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {formattedMetrics.map((metric) => (
        <div
          key={metric.label}
          className="rounded-lg p-4"
          style={{ backgroundColor: '#f3f4f6' }}
        >
          <p
            className="text-sm font-medium"
            style={{ color: '#6b7280' }}
          >
            {metric.label}
          </p>
          <p
            className="mt-1 text-2xl font-bold"
            style={{ color: '#111827' }}
          >
            {metric.label === 'Bounce Rate'
              ? `${metric.value}%`
              : metric.label === 'Avg. Session'
                ? `${Math.floor(metric.value / 60)}m ${metric.value % 60}s`
                : metric.value.toLocaleString()}
          </p>
          <p
            className="mt-1 text-xs"
            style={{ color: metric.change >= 0 ? '#10b981' : '#ef4444' }}
          >
            {metric.change >= 0 ? '+' : ''}
            {metric.change}% vs last week
          </p>
        </div>
      ))}
    </div>
  );
}

export default function UserMetrics() {
  return (
    <QueryProvider>
      <UserMetricsContent />
    </QueryProvider>
  );
}
