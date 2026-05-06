---
name: nextjs
description: >-
  Next.js 16 guidance for this repository. Use when changing Next.js framework
  files or APIs: app router files, route handlers, proxy, data fetching,
  caching, next.config.ts, or Next.js CLI behavior.
  Always consult bundled Next.js docs before implementation.
targets: ["*"]
---

# Next.js 16 — Agent Guide

> **Warning:** This project uses **Next.js 16.x**, which contains breaking changes from prior versions. APIs, file conventions, and configuration you learned from training data may no longer be valid. Always check `node_modules/next/dist/docs/` before writing or modifying any Next.js code.

## When To Use

- Editing files under `app/` that depend on Next.js App Router behavior.
- Updating route handlers (`app/**/route.ts`) or `proxy.ts` behavior.
- Fixing or implementing Next.js-specific data fetching, caching, metadata, or navigation behavior.
- Updating `next.config.ts` or using Next.js CLI commands.

## When Not To Use

- Generic TypeScript or React logic with no Next.js framework behavior involved.
- Non-framework tasks like SQL tuning, CI troubleshooting, or styling-only work.
- Authoring or tuning AI skills/rules files under `.rulesync/`.

## Must-Read Docs (local)

All docs are available in `node_modules/next/dist/docs/`. Key starting points:

| Topic                                    | Path                                                           |
| ---------------------------------------- | -------------------------------------------------------------- |
| Project structure & file conventions     | `01-app/01-getting-started/02-project-structure.md`            |
| Layouts & pages                          | `01-app/01-getting-started/03-layouts-and-pages.md`            |
| Server & Client Components               | `01-app/01-getting-started/05-server-and-client-components.md` |
| Data fetching                            | `01-app/01-getting-started/06-fetching-data.md`                |
| Caching                                  | `01-app/01-getting-started/08-caching.md`                      |
| Route Handlers (API routes)              | `01-app/01-getting-started/15-route-handlers.md`               |
| Proxy (formerly Middleware)              | `01-app/api-reference/file-conventions/proxy.md`               |
| **v16 upgrade guide (breaking changes)** | `01-app/02-guides/upgrading/version-16.md`                     |
| Instant navigation                       | `01-app/02-guides/instant-navigation.md`                       |
| Cache Components (formerly dynamicIO)    | `01-app/02-guides/migrating-to-cache-components.md`            |

## Breaking Changes in Next.js 16

### Runtime Requirements

- Node.js **20.9+** required (18 no longer supported)
- TypeScript **5.1+** required

### Async Request APIs (fully synchronous access removed)

`params`, `searchParams`, cookies, headers, etc. are now **async-only**. Synchronous compatibility from v15 is gone.

```tsx
// ✅ v16
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
}

// ❌ v15 sync compat — removed in v16
export default function Page({ params }: { params: { id: string } }) {
  const { id } = params.id;
}
```

Run `npx next typegen` to auto-generate `PageProps` / `LayoutProps` helper types.

### `middleware.ts` → `proxy.ts`

Middleware has been renamed to **proxy**. The file convention is `proxy.ts` (not `middleware.ts`).

### `next lint` Command Removed

Use ESLint or Biome CLI directly. `next build` no longer runs linting automatically.

### `serverRuntimeConfig` / `publicRuntimeConfig` Removed

Use environment variables directly. Server Components read `process.env.*`; client-accessible values use `NEXT_PUBLIC_` prefix.

### `experimental.dynamicIO` → `cacheComponents`

```ts
// ✅ v16
const nextConfig = { cacheComponents: true };

// ❌ removed
const nextConfig = { experimental: { dynamicIO: true } };
```

### AMP Support Removed

`next/amp`, `useAmp()`, and `amp` config options are removed entirely.

### `unstable_` Prefix Removed from Stabilized APIs

Previously-unstable APIs (e.g., `unstable_cache`, `unstable_noStore`) have been stabilized. Drop the `unstable_` prefix.

### Turbopack is Default

Turbopack is now the default for both `next dev` and `next build`. Use `--webpack` flag to opt out.

### Open Graph / Icon Image Props are Async

`params` passed to `opengraph-image`, `twitter-image`, `icon`, and `apple-icon` generating functions are now `Promise<...>`.

## Key Conventions (v16)

- **Config file**: `next.config.ts` (TypeScript supported natively)
- **ESLint config**: `eslint.config.mjs` (flat config)
- **Proxy / edge logic**: `proxy.ts` (replaces `middleware.ts`)
- **Route Handlers**: `app/*/route.ts`
- **No `pages/api/`** — use Route Handlers in `app/`

## Instant Navigation

If fixing slow client-side navigations, `Suspense` alone is **not enough**. You must also export `unstable_instant` from the route. See `node_modules/next/dist/docs/01-app/02-guides/instant-navigation.md`.
