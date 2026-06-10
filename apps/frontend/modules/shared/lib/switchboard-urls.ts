const DEFAULT_CONNECT_URL = 'http://localhost:3001'
const DEFAULT_SWITCHBOARD_URL = 'http://localhost:4001'

function trimTrailingSlash(value: string): string {
  return value.replace(/\/$/, '')
}

/**
 * Removes a trailing "/graphql" segment and any trailing slash from the given URL.
 */
function switchboardOrigin(url: string): string {
  return trimTrailingSlash(url).replace(/\/graphql$/, '')
}

export function driveLinkFor(driveSlug: string): string {
  // Direct process.env.X access so Next.js inlines the value into the
  // browser bundle. process.env[key] with a dynamic key would not inline.
  const connect = trimTrailingSlash(process.env.NEXT_PUBLIC_CONNECT_URL || DEFAULT_CONNECT_URL)
  const switchboard = switchboardOrigin(
    process.env.NEXT_PUBLIC_SWITCHBOARD_URL || DEFAULT_SWITCHBOARD_URL,
  )
  // The /d/<slug> path makes Connect OPEN the drive after importing it;
  // ?driveUrl=... alone only imports it and leaves the user at the home view.
  return `${connect}/d/${driveSlug}?driveUrl=${switchboard}/d/${driveSlug}`
}
