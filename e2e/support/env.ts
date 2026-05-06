import { BUILDER_SLUG, NETWORK_SLUG, OPERATOR_SLUG, SERVICE_SLUG } from '../data/constants'

interface E2eEnv {
  baseUrl: string
  networkSlug: string
  serviceSlug: string
  operatorSlug: string
  builderSlug: string
}

function requireUrl(key: string, fallback: string): string {
  const raw = process.env[key]
  const value = raw === undefined || raw.trim() === '' ? fallback : raw
  try {
    new URL(value)
    return value
  } catch {
    throw new Error(
      `[e2e/support/env] ${key} is not a valid URL: '${value}'. Set it in e2e/.env.e2e.`,
    )
  }
}

let cached: E2eEnv | null = null

export function getEnv(): E2eEnv {
  if (cached) return cached
  cached = {
    baseUrl: requireUrl('E2E_BASE_URL', 'http://localhost:3000'),
    networkSlug: NETWORK_SLUG,
    serviceSlug: SERVICE_SLUG,
    operatorSlug: OPERATOR_SLUG,
    builderSlug: BUILDER_SLUG,
  }
  return cached
}
