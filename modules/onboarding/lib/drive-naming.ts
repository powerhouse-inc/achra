export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/_/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

function addressSuffix(address: string): string {
  return address.replace(/^0x/i, '').slice(0, 8).toLowerCase()
}

export interface DriveNamingInput {
  name?: string
  teamName?: string
  address: string
}

export interface DriveNaming {
  baseDisplayName: string
  baseSlug: string
  profileDisplayName: string
  offeringSlug: string
  offeringDisplayName: string
}

/** Suffix appended to a builder drive's slug to derive its operator/service-offering drive. */
export const OPERATOR_DRIVE_SLUG_SUFFIX = '-operator'

/** True when a drive slug belongs to an operator/service-offering drive (vs the primary builder drive). */
export function isOperatorDriveSlug(slug: string): boolean {
  return slug.endsWith(OPERATOR_DRIVE_SLUG_SUFFIX)
}

export function deriveDriveNaming(input: DriveNamingInput): DriveNaming {
  const suffix = addressSuffix(input.address)
  const trimmedTeam = input.teamName?.trim() ?? ''
  const trimmedName = input.name?.trim() ?? ''
  const baseDisplayName = trimmedTeam || trimmedName || `User ${suffix}`
  const baseSlug = slugify(trimmedTeam) || slugify(trimmedName) || `user-${suffix}`
  const profileDisplayName = trimmedName || trimmedTeam || `User ${suffix}`
  return {
    baseDisplayName,
    baseSlug,
    profileDisplayName,
    offeringSlug: `${baseSlug}${OPERATOR_DRIVE_SLUG_SUFFIX}`,
    offeringDisplayName: `${baseDisplayName} Operator`,
  }
}

export const PRIMARY_DRIVE_ICON =
  'https://www.pngall.com/wp-content/uploads/12/Engineer-Helmet-Equipment-PNG-Image-HD.png'
export const OPERATOR_DRIVE_ICON = 'https://cdn-icons-png.magnific.com/256/17754/17754439.png'
export const BUILDER_DRIVE_EDITOR = 'builder-team-admin'
export const OPERATOR_DRIVE_EDITOR = 'service-offering-app'
