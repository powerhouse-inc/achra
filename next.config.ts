import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typedRoutes: true,
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
}

export default nextConfig
