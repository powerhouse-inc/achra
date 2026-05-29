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

// Drive icons + preferred editors must match op-hub. Connect resolves a
// drive's editor by matching `header.meta.preferredEditor` to the editor
// module's `config.id`; op-hub renamed those modules (builder-team-admin →
// team-admin, service-offering-app → service-offering) and ships a canonical
// background icon per editor (see op-hub scripts/drive-sync/upload.sh).
export const PRIMARY_DRIVE_ICON = 'https://i.postimg.cc/FztDhVrh/team-admin-bg.png'
export const OPERATOR_DRIVE_ICON = 'https://i.postimg.cc/QtFy8Mc4/service-offering-bg.png'
export const BUILDER_DRIVE_EDITOR = 'team-admin'
export const OPERATOR_DRIVE_EDITOR = 'service-offering'
