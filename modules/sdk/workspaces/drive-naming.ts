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

/**
 * Generates a concise, human-friendly representation of a wallet address,
 * displaying the first and last four hexadecimal characters separated by an
 * ellipsis (e.g., `0x1f3b…a91c`). Used as a fallback drive-name prefix when
 * neither a name nor an ENS is provided by the builder.
 */
function walletShortLabel(address: string): string {
  const hex = address.replace(/^0x/i, '').toLowerCase()
  return `0x${hex.slice(0, 4)}…${hex.slice(-4)}`
}

export interface DriveNamingInput {
  name?: string
  teamName?: string
  ensName?: string
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
 * Canonical drive-type suffixes — they mirror the preferred-editor ids below
 * (`team-admin` → "Team Admin", `service-offering` → "Service Offering"). A
 * drive's full label is `<builder-prefix> <type>` (e.g. "vitalik.eth Team
 * Admin"), so the type is always readable off the tail of the name.
 */
export const PRIMARY_DRIVE_NAME = 'Team Admin'
export const OPERATOR_DRIVE_NAME = 'Service Offering'

/**
 * The builder-identity prefix prepended to a drive's type suffix. Priority: the
 * name entered during onboarding, then the builder's ENS name, then a short
 * form of the wallet address. Never empty — the wallet label always resolves.
 */
function deriveDrivePrefix(input: DriveNamingInput): string {
  const name = input.name?.trim() ?? ''
  const teamName = input.teamName?.trim() ?? ''
  const ensName = input.ensName?.trim() ?? ''
  // `||` (not `??`) so an empty field falls through to the next candidate.
  return name || teamName || ensName || walletShortLabel(input.address)
}

/**
 * True when a drive belongs to an operator/service-offering (vs the primary
 * builder/team-admin drive). Names are `<prefix> <type>` and rename is not
 * user-exposed, so the type suffix is a stable signal — match the tail. Legacy
 * drives created before the prefix carry the bare type name and still match
 * (`"Service Offering".endsWith("Service Offering")`).
 */
export function isOperatorDriveName(name: string): boolean {
  return name.endsWith(OPERATOR_DRIVE_NAME)
}

/**
 * Recover the builder-identity prefix from a drive's display name by stripping
 * the canonical type suffix (`"vitalik.eth Team Admin"` → `"vitalik.eth"`).
 * Legacy bare-named drives ("Team Admin") have no prefix and return unchanged.
 */
export function driveNamePrefix(name: string): string {
  for (const type of [PRIMARY_DRIVE_NAME, OPERATOR_DRIVE_NAME]) {
    const suffix = ` ${type}`
    if (name.endsWith(suffix)) return name.slice(0, -suffix.length)
  }
  return name
}

export function deriveDriveNaming(input: DriveNamingInput): DriveNaming {
  const suffix = addressSuffix(input.address)
  const trimmedTeam = input.teamName?.trim() ?? ''
  const trimmedName = input.name?.trim() ?? ''
  const prefix = deriveDrivePrefix(input)
  // The profile keeps the builder's own name; the drive labels prepend that
  // same identity to the canonical type suffix → "<prefix> Team Admin".
  const profileDisplayName = trimmedName || trimmedTeam || `User ${suffix}`
  return {
    baseDisplayName: `${prefix} ${PRIMARY_DRIVE_NAME}`,
    // Drive slugs are auto-assigned random (URL-safe) ids — not derived from
    // name or address — so they never collide and carry no guessable identity.
    baseSlug: generateId(),
    offeringSlug: generateId(),
    profileDisplayName,
    // The profile slug is distinct from the drive slug and stays human-readable:
    // it feeds the public builder URL (`/builders/<slug>`). Derived from the
    // builder's name, with the address suffix as a uniqueness fallback.
    profileSlug: slugify(trimmedName) || slugify(trimmedTeam) || `user-${suffix}`,
    offeringDisplayName: `${prefix} ${OPERATOR_DRIVE_NAME}`,
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
