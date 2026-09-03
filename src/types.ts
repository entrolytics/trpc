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
