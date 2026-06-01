import type {
  DeploymentSource,
  FormEventType,
  FormFieldType,
  VitalRating,
  VitalType,
} from "@entrolytics/shared";

/**
 * Entrolytics AppRouter Type Definition
 *
 * This file defines the type structure of the Entrolytics tRPC API router.
 * It's kept in sync with the main apps/api/src/routers/index.ts
 *
 * For external packages that need to consume the API with full type safety.
 *
 * @version 2.2.0 - Includes Phase 2 features (vitals, forms, deployments)
 */

// ============================================================================
// Analytics Types
// ============================================================================

export interface OverviewResult {
  pageviews: number;
  visitors: number;
  visits: number;
  bounces: number;
  totalTime: number;
  comparison?: {
    pageviews: number;
    visitors: number;
    visits: number;
    bounces: number;
    totalTime: number;
  };
}

export interface TopPageResult {
  path: string | null;
  views: number;
  unique_visitors?: number;
  avg_load_time?: number | null;
  p95_load_time?: number | null;
}

export interface TopReferrerResult {
  referrer_domain: string | null;
  visits: number;
  unique_visitors?: number;
}

export interface GeographyResult {
  country: string | null;
  city: string | null;
  pageviews: number;
  unique_visitors?: number;
}

export interface DeviceResult {
  device_type: string | null;
  browser: string | null;
  os: string | null;
  pageviews: number;
  unique_visitors?: number;
}

export interface TimeseriesPoint {
  date: string;
  pageviews: number;
  visitors: number;
  sessions: number;
}

export interface RealtimeVisitorsResult {
  visitors: number;
  sessions: number;
  pageviews: number;
}

export interface RealtimeSeriesPoint {
  time: string;
  visitors: number;
  pageviews: number;
}

export interface RealtimeCountryBreakdown {
  country: string;
  countryCode: string;
  visitors: number;
}

export interface RealtimeActivePage {
  path: string;
  viewers: number;
}

export interface RealtimeRecentEvent {
  timestamp: string;
  event_type: string;
  event_name: string | null;
  path: string | null;
  visitor_id?: string;
  country: string | null;
  device_type: string | null;
  browser: string | null;
}

export interface RealtimeOverviewResult {
  activeVisitors: number;
  series: RealtimeSeriesPoint[];
  countries: RealtimeCountryBreakdown[];
  urls: Array<{ path: string; visitors: number }>;
  events: Array<{
    id: string;
    type: string;
    eventName: string;
    path: string;
    country: string;
    countryCode: string;
    device: string;
    browser: string;
    timestamp: string;
  }>;
}

export interface SessionResult {
  sessionId: string;
  sessionStart: string;
  sessionEnd: string;
  pageviews: number;
  events: number;
  visitorId: string;
  country: string | null;
  city: string | null;
  deviceType: string | null;
  browser: string | null;
  os: string | null;
  referrer: string | null;
  entryPage: string | null;
  exitPage: string | null;
}

export interface SessionsResult {
  sessions: SessionResult[];
  total: number;
}

// ============================================================================
// Pagination Types
// ============================================================================

export interface PaginatedResult<T> {
  data: T;
  count: number;
  page: number;
  pageSize: number;
  orderBy?: string;
  search?: string;
}

// ============================================================================
// Website Types
// ============================================================================

export interface Website {
  id: string;
  name: string;
  domain: string;
  shareId: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  orgId: string | null;
}

// ============================================================================
// Organization Types
// ============================================================================

export interface Organization {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
}

// ============================================================================
// User Types
// ============================================================================

export interface User {
  id: string;
  email: string;
  displayName: string | null;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  createdAt: Date;
}

export interface UserListItem {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  displayName: string | null;
  role: string;
  clerkId: string;
  createdAt: Date;
  updatedAt: Date;
  websiteCount: number;
  planId: string | null;
  planStatus: string | null;
  stripeCustomerId: string | null;
}

// ============================================================================
// Link Types
// ============================================================================

export interface Link {
  id: string;
  name: string;
  url: string;
  slug: string;
  clicks: number;
  createdAt: Date;
  userId?: string;
  orgId: string | null;
}

export interface LinkStatsResult {
  totalClicks: number;
  uniqueVisitors: number;
  clicksByDay: Array<{ date: string; clicks: number }>;
  topReferrers: Array<{ referrer: string; clicks: number }>;
  topCountries: Array<{ country: string; clicks: number }>;
}

// ============================================================================
// Phase 2: Web Vitals Types
// ============================================================================

export type VitalMetric = VitalType;
export type { DeploymentSource, FormEventType, FormFieldType, VitalRating };

export interface VitalAggregate {
  metricName: VitalMetric;
  goodCount: number;
  needsImprovementCount: number;
  poorCount: number;
  p75Value: number;
  p95Value: number;
  avgValue: number;
  count: number;
  goodPercentage: number;
}

export interface VitalsByPage {
  path: string;
  metricName: VitalMetric;
  p75Value: number;
  sampleCount: number;
}

export interface VitalEvent {
  metricName: VitalMetric;
  metricValue: number;
  metricRating: VitalRating;
  deviceType: string;
  browser: string;
  timestamp: Date;
  path: string;
}

export interface PageBreakdown {
  path: string;
  avgLcp: number | null;
  avgInp: number | null;
  avgCls: number | null;
  avgTtfb: number | null;
  avgFcp: number | null;
  count: number;
}

// ============================================================================
// Phase 2: Form Analytics Types
// ============================================================================

export interface FormEvent {
  formId: string;
  formName: string | null;
  eventType: FormEventType;
  fieldName: string | null;
  fieldType: FormFieldType | null;
  urlPath: string;
  timestamp: Date;
}

export interface FormConversion {
  formId: string;
  formName: string | null;
  starts: number;
  submits: number;
  abandons: number;
  conversionRate: number;
}

export interface FormFieldMetrics {
  formId: string;
  fieldName: string;
  fieldType: FormFieldType;
  focusCount: number;
  blurCount: number;
  errorCount: number;
  avgTimeOnField: number;
}

export interface FormFunnelStep {
  fieldName: string;
  fieldIndex: number;
  visitors: number;
  dropOffRate: number;
}

// ============================================================================
// Phase 2: Deployment Tracking Types
// ============================================================================

export interface Deployment {
  deployId: string;
  gitSha: string | null;
  gitBranch: string | null;
  source: DeploymentSource;
  deployUrl: string | null;
  environment: string | null;
  deployedAt: Date;
  pageviews: number;
  visitors: number;
  errors: number;
}

export interface DeploymentComparison {
  deployId: string;
  gitSha: string | null;
  deployedAt: Date;
  pageviews: number;
  visitors: number;
  avgLoadTime: number | null;
  errorCount: number;
}

// ============================================================================
// Events Types
// ============================================================================

export interface EventRecord {
  eventId: string;
  eventName: string;
  eventType: string;
  timestamp: string;
  visitorId: string;
  sessionId: string;
  path: string;
  referrer: string | null;
  country: string | null;
  city: string | null;
  deviceType: string | null;
  browser: string | null;
  os: string | null;
  eventData: Record<string, unknown> | null;
}

export interface EventSeries {
  date: string;
  eventName: string;
  count: number;
  uniqueVisitors: number;
  uniqueSessions: number;
}

// ============================================================================
// Funnel Types
// ============================================================================

export interface FunnelStep {
  name: string;
  visitors: number;
  dropoff: number;
  conversionRate: number;
}

export interface FunnelResult {
  id: string;
  name: string;
  steps: FunnelStep[];
  totalConversion: number;
}

// ============================================================================
// Report Types
// ============================================================================

export interface Report {
  id: string;
  name: string;
  description: string | null;
  type: "pageviews" | "events" | "funnel" | "retention" | "journey" | "goal";
  config: Record<string, unknown>;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// Board/Widget Types
// ============================================================================

export interface Board {
  id: string;
  name: string;
  description: string | null;
  config: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface BoardWidget {
  id: string;
  boardId: string;
  type: string;
  title: string | null;
  config: Record<string, unknown> | null;
  position: number;
}

// ============================================================================
// Pixel Types
// ============================================================================

export interface Pixel {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// Segment Types
// ============================================================================

export interface Segment {
  id: string;
  websiteId: string;
  name: string;
  type: string;
  parameters: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// Webhook Types
// ============================================================================

export interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  active: boolean;
  createdAt: Date;
}

// ============================================================================
// API Key Types
// ============================================================================

export interface WebsiteApiKey {
  id: string;
  websiteId: string;
  name: string;
  prefix: string;
  scopes: string[];
  lastUsedAt: Date | null;
  createdAt: Date;
  expiresAt: Date | null;
}

export interface WebsiteApiKeyWithSecret extends WebsiteApiKey {
  key: string;
}

// ============================================================================
// Billing Types
// ============================================================================

export interface Subscription {
  id: string;
  planId: "free" | "pro" | "business" | "enterprise";
  status: "active" | "canceled" | "past_due" | "trialing";
  eventsLimit: number;
  websitesLimit: number;
  currentPeriodStart: Date | null;
  currentPeriodEnd: Date | null;
}

export interface UsageRecord {
  eventsCount: number;
  pageviews: number;
  customEvents: number;
  websitesCount: number;
}

// ============================================================================
// CLI Auth Types
// ============================================================================

export interface CliToken {
  id: string;
  name: string;
  createdAt: Date;
  lastUsedAt: Date | null;
  expiresAt: Date;
}

// ============================================================================
// AppRouter Type Definition
// ============================================================================

/**
 * AppRouter type for the Entrolytics API
 *
 * Full type interface mirroring the actual tRPC router.
 * Includes all 20 router namespaces as of v2.2.0.
 */
export interface AppRouter {
  // -------------------------------------------------------------------------
  // Analytics Router
  // -------------------------------------------------------------------------
  analytics: {
    overview: {
      query: (input: {
        websiteId: string;
        startDate: Date;
        endDate: Date;
      }) => Promise<OverviewResult>;
    };
    timeseries: {
      query: (input: {
        websiteId: string;
        startDate: Date;
        endDate: Date;
        interval?: "hour" | "day" | "week" | "month";
      }) => Promise<TimeseriesPoint[]>;
    };
    topPages: {
      query: (input: {
        websiteId: string;
        startDate: Date;
        endDate: Date;
        limit?: number;
      }) => Promise<TopPageResult[]>;
    };
    topReferrers: {
      query: (input: {
        websiteId: string;
        startDate: Date;
        endDate: Date;
        limit?: number;
      }) => Promise<TopReferrerResult[]>;
    };
    geography: {
      query: (input: {
        websiteId: string;
        startDate: Date;
        endDate: Date;
      }) => Promise<GeographyResult[]>;
    };
    devices: {
      query: (input: {
        websiteId: string;
        startDate: Date;
        endDate: Date;
      }) => Promise<DeviceResult[]>;
    };
    sessions: {
      query: (input: {
        websiteId: string;
        startDate: Date;
        endDate: Date;
        limit?: number;
        offset?: number;
      }) => Promise<SessionsResult>;
    };
  };

  // -------------------------------------------------------------------------
  // Events Router
  // -------------------------------------------------------------------------
  events: {
    list: {
      query: (input: {
        websiteId: string;
        startDate: Date;
        endDate: Date;
        limit?: number;
        offset?: number;
        eventName?: string;
      }) => Promise<EventRecord[]>;
    };
    details: {
      query: (input: {
        websiteId: string;
        startDate: Date;
        endDate: Date;
        eventName: string;
      }) => Promise<unknown[]>;
    };
    series: {
      query: (input: {
        websiteId: string;
        startDate: Date;
        endDate: Date;
        interval?: "hour" | "day" | "week" | "month";
        eventName?: string;
      }) => Promise<EventSeries[]>;
    };
  };

  // -------------------------------------------------------------------------
  // Phase 2: Vitals Router
  // -------------------------------------------------------------------------
  vitals: {
    overview: {
      query: (input: {
        websiteId: string;
        startDate: Date;
        endDate: Date;
      }) => Promise<VitalAggregate[]>;
    };
    byPage: {
      query: (input: {
        websiteId: string;
        startDate: Date;
        endDate: Date;
        metricName?: VitalMetric;
        limit?: number;
      }) => Promise<VitalsByPage[]>;
    };
    trend: {
      query: (input: {
        websiteId: string;
        startDate: Date;
        endDate: Date;
        metricName: VitalMetric;
        interval?: "hour" | "day" | "week";
      }) => Promise<unknown[]>;
    };
    recentEvents: {
      query: (input: { websiteId: string; limit?: number }) => Promise<VitalEvent[]>;
    };
    pageBreakdown: {
      query: (input: {
        websiteId: string;
        startDate: Date;
        endDate: Date;
        limit?: number;
      }) => Promise<PageBreakdown[]>;
    };
    track: {
      mutate: (input: {
        websiteId: string;
        visitorId: string;
        sessionId: string;
        url: string;
        path: string;
        metricName: VitalMetric;
        metricValue: number;
        deviceType?: string;
        browser?: string;
      }) => Promise<{ success: boolean }>;
    };
  };

  // -------------------------------------------------------------------------
  // Phase 2: Forms Router
  // -------------------------------------------------------------------------
  forms: {
    conversions: {
      query: (input: {
        websiteId: string;
        startDate: Date;
        endDate: Date;
      }) => Promise<FormConversion[]>;
    };
    fieldMetrics: {
      query: (input: {
        websiteId: string;
        formId: string;
        startDate: Date;
        endDate: Date;
      }) => Promise<FormFieldMetrics[]>;
    };
    funnel: {
      query: (input: {
        websiteId: string;
        formId: string;
        startDate: Date;
        endDate: Date;
      }) => Promise<FormFunnelStep[]>;
    };
    recentEvents: {
      query: (input: { websiteId: string; limit?: number }) => Promise<FormEvent[]>;
    };
    track: {
      mutate: (input: {
        websiteId: string;
        visitorId: string;
        sessionId: string;
        formId: string;
        formName?: string;
        urlPath: string;
        eventType: FormEventType;
        fieldName?: string;
        fieldType?: FormFieldType;
        fieldIndex?: number;
        timeOnField?: number;
        timeSinceStart?: number;
        errorMessage?: string;
        success?: boolean;
      }) => Promise<{ success: boolean }>;
    };
  };

  // -------------------------------------------------------------------------
  // Phase 2: Deployments Router
  // -------------------------------------------------------------------------
  deployments: {
    list: {
      query: (input: {
        websiteId: string;
        startDate: Date;
        endDate: Date;
        limit?: number;
      }) => Promise<Deployment[]>;
    };
    compare: {
      query: (input: { websiteId: string; limit?: number }) => Promise<DeploymentComparison[]>;
    };
    latest: {
      query: (input: { websiteId: string }) => Promise<Deployment | null>;
    };
    track: {
      mutate: (input: {
        websiteId: string;
        deployId: string;
        gitSha?: string;
        gitBranch?: string;
        source: DeploymentSource;
        deployUrl?: string;
        environment?: string;
      }) => Promise<{ success: boolean }>;
    };
  };

  // -------------------------------------------------------------------------
  // Funnels Router
  // -------------------------------------------------------------------------
  funnels: {
    list: { query: (input: { websiteId: string }) => Promise<FunnelResult[]> };
    get: { query: (input: { funnelId: string }) => Promise<FunnelResult> };
    create: {
      mutate: (input: {
        websiteId: string;
        name: string;
        steps: string[];
      }) => Promise<FunnelResult>;
    };
    delete: { mutate: (input: { funnelId: string }) => Promise<{ success: boolean }> };
  };

  // -------------------------------------------------------------------------
  // Reports Router
  // -------------------------------------------------------------------------
  reports: {
    list: { query: (input: { websiteId: string }) => Promise<Report[]> };
    get: { query: (input: { reportId: string }) => Promise<Report> };
    create: {
      mutate: (input: {
        websiteId: string;
        name: string;
        type: Report["type"];
        config: Record<string, unknown>;
      }) => Promise<Report>;
    };
    delete: { mutate: (input: { reportId: string }) => Promise<{ success: boolean }> };
  };

  // -------------------------------------------------------------------------
  // Realtime Router
  // -------------------------------------------------------------------------
  realtime: {
    currentVisitors: {
      query: (input: { websiteId: string }) => Promise<RealtimeVisitorsResult>;
    };
    recentEvents: {
      query: (input: { websiteId: string; limit?: number }) => Promise<RealtimeRecentEvent[]>;
    };
    activePages: {
      query: (input: { websiteId: string }) => Promise<RealtimeActivePage[]>;
    };
    timeSeries: {
      query: (input: { websiteId: string }) => Promise<RealtimeSeriesPoint[]>;
    };
    countryBreakdown: {
      query: (input: { websiteId: string }) => Promise<RealtimeCountryBreakdown[]>;
    };
    overview: {
      query: (input: { websiteId: string }) => Promise<RealtimeOverviewResult>;
    };
  };

  // -------------------------------------------------------------------------
  // Websites Router
  // -------------------------------------------------------------------------
  websites: {
    list: { query: () => Promise<Website[]> };
    get: { query: (input: { websiteId: string }) => Promise<Website> };
    create: { mutate: (input: { name: string; domain: string }) => Promise<Website> };
    update: {
      mutate: (input: { websiteId: string; name?: string; domain?: string }) => Promise<Website>;
    };
    delete: { mutate: (input: { websiteId: string }) => Promise<{ success: boolean }> };
    apiKeys: {
      list: { query: (input: { websiteId: string }) => Promise<WebsiteApiKey[]> };
      create: {
        mutate: (input: {
          websiteId: string;
          name: string;
          scopes?: string[];
        }) => Promise<WebsiteApiKeyWithSecret>;
      };
      revoke: { mutate: (input: { keyId: string }) => Promise<{ success: boolean }> };
    };
  };

  // -------------------------------------------------------------------------
  // Orgs Router
  // -------------------------------------------------------------------------
  orgs: {
    list: { query: () => Promise<Organization[]> };
    get: { query: (input: { id: string }) => Promise<Organization> };
    create: { mutate: (input: { name: string; slug: string }) => Promise<Organization> };
  };

  // -------------------------------------------------------------------------
  // Users Router
  // -------------------------------------------------------------------------
  users: {
    list: {
      query: (input: {
        search?: string;
        page?: number;
        pageSize?: number;
        orderBy?:
          | "id"
          | "email"
          | "firstName"
          | "lastName"
          | "displayName"
          | "role"
          | "createdAt"
          | "updatedAt";
        sortDescending?: boolean;
        role?: string;
        plan?: string;
        status?: string;
      }) => Promise<PaginatedResult<UserListItem[]>>;
    };
    me: { query: () => Promise<{ user: User; grant: string; orgId: string | null }> };
    updateProfile: {
      mutate: (input: {
        displayName?: string;
        firstName?: string;
        lastName?: string;
      }) => Promise<User>;
    };
  };

  // -------------------------------------------------------------------------
  // Auth Router
  // -------------------------------------------------------------------------
  auth: {
    cli: {
      generateToken: {
        mutate: (input: { name?: string }) => Promise<{ token: string; expiresAt: string }>;
      };
      listTokens: { query: () => Promise<CliToken[]> };
      revokeToken: { mutate: (input: { tokenId: string }) => Promise<{ success: boolean }> };
      revokeAllTokens: { mutate: () => Promise<{ count: number }> };
      validateToken: {
        query: (input: { token: string }) => Promise<{ valid: boolean; userId: string }>;
      };
    };
  };

  // -------------------------------------------------------------------------
  // Links Router
  // -------------------------------------------------------------------------
  links: {
    list: { query: () => Promise<Link[]> };
    get: { query: (input: { linkId: string }) => Promise<Link> };
    create: {
      mutate: (input: {
        description?: string;
        name: string;
        url: string;
        slug: string;
        orgId: string;
      }) => Promise<Link>;
    };
    update: { mutate: (input: { linkId: string; name?: string; url?: string }) => Promise<Link> };
    delete: { mutate: (input: { linkId: string }) => Promise<{ success: boolean }> };
    stats: {
      query: (input: {
        linkId: string;
        startDate: Date;
        endDate: Date;
      }) => Promise<LinkStatsResult>;
    };
  };

  // -------------------------------------------------------------------------
  // Pixels Router
  // -------------------------------------------------------------------------
  pixels: {
    list: { query: () => Promise<Pixel[]> };
    get: { query: (input: { pixelId: string }) => Promise<Pixel> };
    create: { mutate: (input: { name: string; slug: string }) => Promise<Pixel> };
    delete: { mutate: (input: { pixelId: string }) => Promise<{ success: boolean }> };
  };

  // -------------------------------------------------------------------------
  // Webhooks Router
  // -------------------------------------------------------------------------
  webhooks: {
    list: { query: (input: { websiteId: string }) => Promise<Webhook[]> };
    create: {
      mutate: (input: {
        websiteId: string;
        name: string;
        url: string;
        events: string[];
      }) => Promise<Webhook>;
    };
    delete: { mutate: (input: { webhookId: string }) => Promise<{ success: boolean }> };
  };

  // -------------------------------------------------------------------------
  // Boards Router
  // -------------------------------------------------------------------------
  boards: {
    list: { query: () => Promise<Board[]> };
    get: { query: (input: { boardId: string }) => Promise<Board> };
    create: { mutate: (input: { name: string; description?: string }) => Promise<Board> };
    delete: { mutate: (input: { boardId: string }) => Promise<{ success: boolean }> };
    widgets: {
      list: { query: (input: { boardId: string }) => Promise<BoardWidget[]> };
      get: { query: (input: { widgetId: string }) => Promise<BoardWidget> };
      create: {
        mutate: (input: {
          boardId: string;
          type: string;
          title?: string;
          config?: Record<string, unknown>;
        }) => Promise<BoardWidget>;
      };
      delete: { mutate: (input: { widgetId: string }) => Promise<{ success: boolean }> };
    };
  };

  // -------------------------------------------------------------------------
  // Segments Router
  // -------------------------------------------------------------------------
  segments: {
    list: { query: (input: { websiteId: string }) => Promise<Segment[]> };
    create: {
      mutate: (input: {
        websiteId: string;
        name: string;
        type: string;
        parameters?: Record<string, unknown>;
      }) => Promise<Segment>;
    };
    delete: { mutate: (input: { segmentId: string }) => Promise<{ success: boolean }> };
  };

  // -------------------------------------------------------------------------
  // Billing Router
  // -------------------------------------------------------------------------
  billing: {
    subscription: { query: () => Promise<Subscription | null> };
    usage: { query: () => Promise<UsageRecord> };
    checkout: { mutate: (input: { planId: string }) => Promise<{ checkoutUrl: string }> };
    portal: { mutate: () => Promise<{ portalUrl: string }> };
  };

  // -------------------------------------------------------------------------
  // Integrations Router
  // -------------------------------------------------------------------------
  integrations: {
    list: { query: () => Promise<unknown[]> };
    connect: {
      mutate: (input: {
        provider: string;
        config: Record<string, unknown>;
      }) => Promise<{ success: boolean }>;
    };
    disconnect: { mutate: (input: { integrationId: string }) => Promise<{ success: boolean }> };
  };
}
