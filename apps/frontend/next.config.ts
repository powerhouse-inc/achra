import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { NextConfig } from 'next'

// Resolve the monorepo root (two levels up from apps/frontend). With pnpm
// workspaces the dependency store lives at the repo root, so Turbopack module
// resolution and output-file tracing must treat that as the root rather than
// the app directory. Mirrors the __dirname/import.meta fallback in vitest.config.ts.
const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))
const monorepoRoot = path.join(dirname, '../../')

// @powerhousedao/reactor statically imports its server transport (pg →
// dns/fs/net/tls, worker pools → node:worker_threads) from its index, which
// reactor-browser re-exports. That transport is dead code in the browser
// (reactor-browser uses PGlite + a GraphQL client, never .withWorkerPool()),
// but Turbopack still tries to bundle it for the client and fails on the Node
// builtins. Stub them to an empty module for the `browser` condition only —
// server bundles keep the real modules.
const browserStub = './empty-module.cjs'
const stubNodeBuiltinsInBrowser = Object.fromEntries(
  ['dns', 'fs', 'net', 'tls', 'worker_threads'].flatMap((m) => [
    [m, { browser: browserStub }],
    [`node:${m}`, { browser: browserStub }],
  ]),
)

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  cacheComponents: true,
  outputFileTracingRoot: monorepoRoot,
  // @achra/ui ships untranspiled TS/TSX source (consumed via its package
  // exports), so Next must compile it rather than treat it as an opaque
  // node_modules dependency.
  transpilePackages: ['@achra/ui'],
  images: {
    qualities: [100, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.achra.com',
      },
    ],
  },
  productionBrowserSourceMaps: true,
  turbopack: {
    root: monorepoRoot,
    resolveAlias: stubNodeBuiltinsInBrowser,
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
}

export default nextConfig
