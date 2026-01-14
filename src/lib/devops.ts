/**
 * DevOps Error Reporting Module
 *
 * This module provides centralized error reporting to our DevOps monitoring system.
 * All API errors should be reported through this interface for consistent alerting.
 *
 * IMPORTANT: When fetching data, always use the useTrackedQuery hook from @/hooks/useTrackedQuery
 * instead of raw useQuery. This ensures all errors are properly reported to DevOps.
 */

export interface ErrorReport {
  message: string;
  endpoint?: string;
  statusCode?: number;
  timestamp: Date;
  context?: Record<string, unknown>;
}

/**
 * Reports an error to the DevOps monitoring system.
 * In production, this would send to Datadog/Sentry/etc.
 */
export function reportErrorToDevOps(error: ErrorReport): void {
  // In a real app, this would POST to your monitoring service
  console.error('[DevOps Error Report]', {
    ...error,
    environment: import.meta.env.MODE,
  });

  // Pretend we're sending to an external service
  if (import.meta.env.DEV) {
    console.log(
      '%c[DevOps] Error reported to monitoring',
      'background: #e6006f; color: white; padding: 2px 6px; border-radius: 3px;',
      error.message
    );
  }
}

/**
 * Creates a structured error report from an API error
 */
export function createApiErrorReport(
  error: Error,
  endpoint: string,
  context?: Record<string, unknown>
): ErrorReport {
  return {
    message: error.message,
    endpoint,
    statusCode: (error as { statusCode?: number }).statusCode,
    timestamp: new Date(),
    context,
  };
}
