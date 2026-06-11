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

function driveLinkParts(driveSlug: string): { connect: string; driveUrl: string } {
  // Direct process.env.X access so Next.js inlines the value into the
  // browser bundle. process.env[key] with a dynamic key would not inline.
  const connect = trimTrailingSlash(process.env.NEXT_PUBLIC_CONNECT_URL || DEFAULT_CONNECT_URL)
  const switchboard = switchboardOrigin(
    process.env.NEXT_PUBLIC_SWITCHBOARD_URL || DEFAULT_SWITCHBOARD_URL,
  )
  return { connect, driveUrl: `${switchboard}/d/${driveSlug}` }
}

export function driveLinkFor(driveSlug: string): string {
  const { connect, driveUrl } = driveLinkParts(driveSlug)
  // The /d/<slug> path makes Connect OPEN the drive after importing it;
  // ?driveUrl=... alone only imports it and leaves the user at the home view.
  return `${connect}/d/${driveSlug}?driveUrl=${driveUrl}`
}

/**
 * Deep link to a document inside a drive: Connect imports the drive (the
 * `driveUrl` param), opens it (the `/d/<slug>` path), and then opens the
 * document node (`/<documentId>` path segment).
 */
export function driveDocumentLinkFor(driveSlug: string, documentId: string): string {
  const { connect, driveUrl } = driveLinkParts(driveSlug)
  return `${connect}/d/${driveSlug}/${documentId}?driveUrl=${driveUrl}`
}
