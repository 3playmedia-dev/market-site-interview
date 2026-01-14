import { QueryProvider } from './QueryProvider';
import { useTrackedQuery } from '@/hooks/useTrackedQuery';
import { api, type Post } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

function PostsContent() {
  const { data: posts, isLoading, error } = useTrackedQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: api.posts.list,
    endpoint: '/api/posts',
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-5 w-3/4 rounded bg-muted" />
              <div className="h-4 w-1/2 rounded bg-muted" />
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="pt-6">
          <p className="text-destructive">Failed to load posts. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {posts?.map((post) => (
        <Card key={post.id} className="transition-colors hover:bg-accent/50">
          <CardHeader>
            <CardTitle className="text-lg">{post.title}</CardTitle>
            <CardDescription>{post.excerpt}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span style={{ fontFamily: 'var(--font-accent-condensed)' }}>{post.author}</span>
              <span>&middot;</span>
              <span>{post.date}</span>
              <span>&middot;</span>
              <span>{post.readTime}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function PostsWidget() {
  return (
    <QueryProvider>
      <PostsContent />
    </QueryProvider>
  );
}
