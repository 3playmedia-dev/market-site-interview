import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query';
import { reportErrorToDevOps, createApiErrorReport } from '@/lib/devops';
import { useEffect, useRef } from 'react';

/**
 * useTrackedQuery - A wrapper around TanStack Query's useQuery that automatically
 * reports errors to our DevOps monitoring system.
 *
 * ALWAYS use this hook instead of raw useQuery for API calls.
 * This ensures consistent error reporting across the application.
 *
 * @example
 * ```tsx
 * const { data, isLoading, error } = useTrackedQuery({
 *   queryKey: ['posts'],
 *   queryFn: () => fetch('/api/posts').then(r => r.json()),
 *   endpoint: '/api/posts', // Required: used for error context
 * });
 * ```
 */
export interface TrackedQueryOptions<TData, TError = Error>
  extends Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'> {
  queryKey: readonly unknown[];
  queryFn: () => Promise<TData>;
  /** The API endpoint being called - used for error reporting context */
  endpoint: string;
  /** Additional context to include in error reports */
  errorContext?: Record<string, unknown>;
}

export function useTrackedQuery<TData, TError = Error>(
  options: TrackedQueryOptions<TData, TError>
): UseQueryResult<TData, TError> {
  const { endpoint, errorContext, ...queryOptions } = options;
  const reportedRef = useRef(false);

  const result = useQuery<TData, TError>({
    ...queryOptions,
  });

  // Report errors to DevOps when they occur
  useEffect(() => {
    if (result.error && !reportedRef.current) {
      reportedRef.current = true;
      reportErrorToDevOps(
        createApiErrorReport(
          result.error as Error,
          endpoint,
          errorContext
        )
      );
    }

    // Reset the reported flag when the error clears
    if (!result.error) {
      reportedRef.current = false;
    }
  }, [result.error, endpoint, errorContext]);

  return result;
}
