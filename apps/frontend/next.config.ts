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

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  cacheComponents: true,
  outputFileTracingRoot: monorepoRoot,
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
