# @entrolytics/trpc-client

Type-safe tRPC client for Entrolytics API.

## Installation

```bash
npm install @entrolytics/trpc-client

# or

pnpm add @entrolytics/trpc-client

# or

yarn add @entrolytics/trpc-client
```

## Usage

```typescript
import { createClient } from "@entrolytics/trpc-client";

const client = createClient({
  apiUrl: "https://api.entrolytics.click",
  apiKey: "your-api-key",
});

// List websites
const websites = await client.websites.list.query();

// Create a website
const newWebsite = await client.websites.create.mutate({
  name: "My Website",
  domain: "example.com",
});

// Get analytics
const analytics = await client.analytics.overview.query({
  websiteId: "website-id",
  startDate: new Date("2024-01-01"),
  endDate: new Date("2024-01-31"),
});
```

## Features

- ✅ Full type safety with TypeScript
- ✅ Auto-completion for all API methods
- ✅ Automatic batching of requests
- ✅ Built-in error handling

## API Reference

See the [full API documentation](https://docs.entrolytics.click/api) for all available methods.

## Migration from REST Client

If you're migrating from `@entrolytics/api-client`, see the [migration guide](./MIGRATION.md).
