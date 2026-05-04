import {
  FALLBACK_BUILDER_SLUG,
  FALLBACK_NETWORK_SLUG,
  FALLBACK_OPERATOR_SLUG,
  FALLBACK_SERVICE_SLUG,
} from '../data/constants'

interface E2eEnv {
  baseUrl: string
  networkSlug: string
  serviceSlug: string
  operatorSlug: string
  builderSlug: string
}

function read(key: string, fallback: string): string {
  const value = process.env[key]
  if (value === undefined || value.trim() === '') return fallback
  return value
}

function requireUrl(key: string, fallback: string): string {
  const value = read(key, fallback)
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
    networkSlug: read('E2E_NETWORK_SLUG', FALLBACK_NETWORK_SLUG),
    serviceSlug: read('E2E_SERVICE_SLUG', FALLBACK_SERVICE_SLUG),
    operatorSlug: read('E2E_OPERATOR_SLUG', FALLBACK_OPERATOR_SLUG),
    builderSlug: read('E2E_BUILDER_SLUG', FALLBACK_BUILDER_SLUG),
  }
  return cached
}
