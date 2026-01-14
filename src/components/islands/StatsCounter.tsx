import { QueryProvider } from './QueryProvider';
import { useTrackedQuery } from '@/hooks/useTrackedQuery';
import { api, type Stats } from '@/lib/api';

function StatsContent() {
  const { data: stats, isLoading } = useTrackedQuery<Stats>({
    queryKey: ['stats'],
    queryFn: api.stats.get,
    endpoint: '/api/stats',
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse text-center">
            <div className="mx-auto h-10 w-24 rounded bg-muted" />
            <div className="mx-auto mt-2 h-4 w-20 rounded bg-muted" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="text-center">
        <p
          className="text-4xl font-bold text-primary"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {stats ? formatNumber(stats.activeUsers) : '—'}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">Active Users</p>
      </div>
      <div className="text-center">
        <p
          className="text-4xl font-bold text-primary"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {stats ? formatNumber(stats.totalPosts) : '—'}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">Total Posts</p>
      </div>
      <div className="text-center">
        <p
          className="text-4xl font-bold text-primary"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {stats ? `${stats.engagement}%` : '—'}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">Engagement Rate</p>
      </div>
    </div>
  );
}

export default function StatsCounter() {
  return (
    <QueryProvider>
      <StatsContent />
    </QueryProvider>
  );
}
