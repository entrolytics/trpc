import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { CreateTRPCClient } from "@trpc/client";
import type { AnyRouter } from "@trpc/server";
import SuperJSON from "superjson";

export interface EntrolyticsTRPCClientConfig {
  apiUrl: string;
  bearerToken?: string;
  apiKey?: string;
  headers?: Record<string, string>;
}

/**
 * Create a type-safe tRPC client for Entrolytics API
 *
 * The proper and robust way per tRPC v11 documentation:
 * - Import AnyRouter from @trpc/server for type constraint
 * - Transformer goes inside the httpBatchLink with type assertion for SuperJSON
 * - Consumer provides AppRouter type for full type safety
 *
 * @example
 * ```typescript
 * import type { AppRouter } from '@your-backend/routers';
 *
 * const client = createClient<AppRouter>({
 *   apiUrl: 'https://api.entrolytics.click',
 *   bearerToken: 'your-cli-or-session-token'
 * });
 *
 * // Fully typed API calls
 * const websites = await client.websites.list.query();
 * ```
 */
export function createClient<TRouter extends AnyRouter>(
  config: EntrolyticsTRPCClientConfig,
): CreateTRPCClient<TRouter> {
  const linkOptions = {
    headers: () => ({
      ...(config.bearerToken && { Authorization: `Bearer ${config.bearerToken}` }),
      ...(config.apiKey && { "x-api-key": config.apiKey }),
      ...config.headers,
    }),
    transformer: SuperJSON,
    url: `${config.apiUrl}/trpc`,
  } as unknown as Parameters<typeof httpBatchLink<TRouter>>[0];

  return createTRPCProxyClient<TRouter>({
    links: [httpBatchLink<TRouter>(linkOptions)],
  });
}

// Re-export useful types from tRPC
export type { TRPCClientError } from "@trpc/client";
export type { CreateTRPCClient } from "@trpc/client";
export type { AnyRouter } from "@trpc/server";

// Export Entrolytics-specific types
export type {
  // Analytics types
  OverviewResult,
  TopPageResult,
  TopReferrerResult,
  GeographyResult,
  DeviceResult,
  TimeseriesPoint,
  SessionResult,
  SessionsResult,

  // Entity types
  Website,
  Organization,
  User,
  UserListItem,
  Link,
  LinkStatsResult,
  Report,
  Board,
  BoardWidget,
  Pixel,
  Segment,
  Webhook,
  WebsiteApiKey,
  WebsiteApiKeyWithSecret,

  // Phase 2: Web Vitals
  VitalMetric,
  VitalRating,
  VitalAggregate,
  VitalsByPage,
  VitalEvent,
  PageBreakdown,

  // Phase 2: Form Analytics
  FormEventType,
  FormFieldType,
  FormEvent,
  FormConversion,
  FormFieldMetrics,
  FormFunnelStep,

  // Phase 2: Deployment Tracking
  DeploymentSource,
  Deployment,
  DeploymentComparison,

  // Events
  EventRecord,
  EventSeries,

  // Funnels
  FunnelStep,
  FunnelResult,

  // Billing
  Subscription,
  UsageRecord,

  // CLI Auth
  CliToken,

  // Pagination
  PaginatedResult,
} from "./types.js";

// Bundled AppRouter contract for external consumers
export type { AppRouter } from "./types.js";
