import { generateId } from 'document-model/core'
import { v5 as uuidv5 } from 'uuid'

export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/_/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

/**
 * Fixed UUIDv5 namespace for deriving per-customer folder ids in an operator's
 * Service Offering drive. NEVER change this — it would re-home every existing
 * customer folder (the id is the rename-proof link between a folder and its
 * customer).
 */
export const CUSTOMER_FOLDER_NAMESPACE = '7b6d0c2e-2c9a-4d2b-9b1e-2a4f6c8d0e12'

/**
 * Deterministic, rename-proof folder id for a customer inside an operator's
 * drive. Seeded from the customer's wallet address (lowercased) so the same
 * customer always maps to the same folder node id — letting the purchase flow
 * group a customer's documents and reuse their folder across purchases even
 * after the operator renames it. UUIDv5 output is `8-4-4-4-12` shaped, so it
 * round-trips through the drive's URL/node id parsing.
 */
export function deriveCustomerFolderId(address: string): string {
  return uuidv5(address.trim().toLowerCase(), CUSTOMER_FOLDER_NAMESPACE)
}

function addressSuffix(address: string): string {
  return address.replace(/^0x/i, '').slice(0, 8).toLowerCase()
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
 * Canonical drive display names — they mirror the preferred-editor ids below
 * (`team-admin` → "Team Admin", `service-offering` → "Service Offering"). Each
 * drive is named with its bare type and nothing else, so the type is readable
 * directly off the drive name.
 */
export const PRIMARY_DRIVE_NAME = 'Team Admin'
export const OPERATOR_DRIVE_NAME = 'Service Offering'

/**
 * True when a drive belongs to an operator/service-offering (vs the primary
 * builder/team-admin drive). Rename is not user-exposed, so the canonical type
 * name is a stable signal. `endsWith` (not `===`) keeps legacy drives created
 * with a builder-identity prefix matching too (`"Acme Service
 * Offering".endsWith("Service Offering")`).
 */
export function isOperatorDriveName(name: string): boolean {
  return name.endsWith(OPERATOR_DRIVE_NAME)
}

export function deriveDriveNaming(input: DriveNamingInput): DriveNaming {
  const suffix = addressSuffix(input.address)
  const trimmedTeam = input.teamName?.trim() ?? ''
  const trimmedName = input.name?.trim() ?? ''
  // Drives carry only their canonical type name — no builder-identity prefix.
  // The builder's identity lives on the profile (display name + slug) below.
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
