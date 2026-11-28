# Changelog

All notable changes to this project are documented in this file. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [4.0.1] - 2026-11-28

### Changed

- Requires `@entrolytics/shared` 3.2.2.
- `@trpc/client` and `@trpc/server` 11.32.2.

## [4.0.0] - 2026-11-28

### Changed

- **Breaking.** Router types come from `@entrolytics/api-types` 7.0.0, which describes the API after
  sign-in moved from Clerk to the dashboard itself. `AuthContext` no longer carries `clerkUserId` or
  `clerkOrgId`, no organization carries `clerkOrgId` or `clerkSyncRequestedAt`, `users.delete` no
  longer answers `pending`, and accepting an invitation no longer returns `clerkSynced`. User rows
  carry `bannedAt`. Nothing changes at run time.

## [3.1.2] - 2026-11-26

### Changed

- Depends on `@trpc/client` and `@trpc/server` 11.31.4.
- Built and released with pnpm 12.24.0.

## [3.1.1] - 2026-11-26

### Changed

- Requires `@entrolytics/api-types` 6.0.3 and `@entrolytics/shared` 3.2.1. The re-exported
  `AppRouter` type now describes the API at 4.1.0 (persistent visitor identity in the retention
  report; pixel stats report; slug validation; consolidated REST/tRPC procedures).
- tRPC 11.31 and superjson updated; toolchain on pnpm 12.23.

[Unreleased]: https://github.com/entrolytics/trpc/compare/v4.0.1...HEAD
[4.0.1]: https://github.com/entrolytics/trpc/compare/v4.0.0...v4.0.1
[4.0.0]: https://github.com/entrolytics/trpc/compare/v3.1.2...v4.0.0
[3.1.2]: https://github.com/entrolytics/trpc/compare/v3.1.1...v3.1.2
[3.1.1]: https://github.com/entrolytics/trpc/releases/tag/v3.1.1
