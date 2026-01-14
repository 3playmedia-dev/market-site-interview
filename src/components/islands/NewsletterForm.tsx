import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { QueryProvider } from './QueryProvider';
import { api } from '@/lib/api';
import { reportErrorToDevOps, createApiErrorReport } from '@/lib/devops';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

function NewsletterContent() {
  const [email, setEmail] = useState('');

  const mutation = useMutation({
    mutationFn: api.newsletter.subscribe,
    onError: (error) => {
      reportErrorToDevOps(
        createApiErrorReport(error as Error, '/api/newsletter', { email })
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      mutation.mutate(email);
    }
  };

  if (mutation.isSuccess) {
    return (
      <div className="flex items-center gap-2 text-primary">
        <CheckCircle2 className="h-5 w-5" />
        <span>{mutation.data?.message}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1"
        disabled={mutation.isPending}
        aria-label="Email address"
      />
      <Button type="submit" disabled={mutation.isPending || !email}>
        {mutation.isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Subscribing...
          </>
        ) : (
          'Subscribe'
        )}
      </Button>
      {mutation.isError && (
        <div className="flex items-center gap-2 text-destructive sm:hidden">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">{mutation.error?.message || 'Something went wrong'}</span>
        </div>
      )}
    </form>
  );
}

export default function NewsletterForm() {
  return (
    <QueryProvider>
      <NewsletterContent />
    </QueryProvider>
  );
}
