import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  cacheComponents: true,
  images: {
    qualities: [100, 75],
    // Service assets can come from dynamic third-party URLs, so allow all remote hosts.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  productionBrowserSourceMaps: true,
  async rewrites() {
    if (!process.env.HOMEPAGE_REMOTE_URL) {
      return []
    }

    return [
      {
        source: '/',
        destination: process.env.HOMEPAGE_REMOTE_URL ?? '',
      },
      {
        source: '/cases',
        destination: `${process.env.HOMEPAGE_REMOTE_URL!}/cases`,
      },
    ]
  },
  turbopack: {
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
