import { generateId } from 'document-model/core'

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
  profileSlug: string
  offeringSlug: string
  offeringDisplayName: string
}

/**
 * Canonical drive display names — they mirror the preferred-editor ids below
 * (`team-admin` → "Team Admin", `service-offering` → "Service Offering") so a
 * drive's label always reflects its editor/type rather than the builder's name.
 */
export const PRIMARY_DRIVE_NAME = 'Team Admin'
export const OPERATOR_DRIVE_NAME = 'Service Offering'

/**
 * True when a drive belongs to an operator/service-offering (vs the primary
 * builder/team-admin drive). Slugs are random and opaque, so the drive type is
 * read from its (fixed) name. Drive rename is not user-exposed, so the name is
 * a stable type signal.
 */
export function isOperatorDriveName(name: string): boolean {
  return name === OPERATOR_DRIVE_NAME
}

export function deriveDriveNaming(input: DriveNamingInput): DriveNaming {
  const suffix = addressSuffix(input.address)
  const trimmedTeam = input.teamName?.trim() ?? ''
  const trimmedName = input.name?.trim() ?? ''
  // The profile keeps the builder's own name; the drive labels are canonical.
  const profileDisplayName = trimmedName || trimmedTeam || `User ${suffix}`
  return {
    baseDisplayName: PRIMARY_DRIVE_NAME,
    // Drive slugs are auto-assigned random (URL-safe) ids — not derived from
    // name or address — so they never collide and carry no guessable identity.
    baseSlug: generateId(),
    offeringSlug: generateId(),
    profileDisplayName,
    // The profile slug is distinct from the drive slug and stays human-readable:
    // it feeds the public builder URL (`/builders/<slug>`). Derived from the
    // builder's name, with the address suffix as a uniqueness fallback.
    profileSlug: slugify(trimmedName) || slugify(trimmedTeam) || `user-${suffix}`,
    offeringDisplayName: OPERATOR_DRIVE_NAME,
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
