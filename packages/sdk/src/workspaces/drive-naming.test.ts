import { describe, expect, it } from 'vitest'
import {
  deriveCustomerFolderId,
  deriveDriveNaming,
  isOperatorDriveName,
  OPERATOR_DRIVE_NAME,
  PRIMARY_DRIVE_NAME,
  slugify,
} from './drive-naming'

const ADDRESS = '0x1f3b0000000000000000000000000000000000a91c'

describe('slugify', () => {
  it('lowercases, hyphenates spaces/underscores, strips other chars', () => {
    expect(slugify('  Hello World  ')).toBe('hello-world')
    expect(slugify('foo_bar')).toBe('foo-bar')
    expect(slugify("Vitalik's Team!")).toBe('vitaliks-team')
    expect(slugify('Café déjà')).toBe('caf-dj')
  })
})

describe('isOperatorDriveName', () => {
  it('matches drives whose name ends with the operator suffix', () => {
    expect(isOperatorDriveName(`vitalik.eth ${OPERATOR_DRIVE_NAME}`)).toBe(true)
    expect(isOperatorDriveName(`vitalik.eth ${PRIMARY_DRIVE_NAME}`)).toBe(false)
  })

  it('matches legacy drives carrying the bare operator name', () => {
    expect(isOperatorDriveName(OPERATOR_DRIVE_NAME)).toBe(true)
  })
})

describe('deriveDriveNaming', () => {
  it('names the base drive with the bare canonical name, no identity prefix', () => {
    expect(deriveDriveNaming({ address: ADDRESS, name: 'Acme' }).baseDisplayName).toBe(
      PRIMARY_DRIVE_NAME,
    )
    expect(
      deriveDriveNaming({ address: ADDRESS, teamName: 'Team', ensName: 'x.eth' }).baseDisplayName,
    ).toBe(PRIMARY_DRIVE_NAME)
    expect(deriveDriveNaming({ address: ADDRESS }).baseDisplayName).toBe(PRIMARY_DRIVE_NAME)
    // identity never leaks into the drive name
    expect(deriveDriveNaming({ address: ADDRESS, name: 'Acme' }).baseDisplayName).not.toContain(
      'Acme',
    )
  })

  it('names the offering drive with the bare canonical name, no identity prefix', () => {
    expect(deriveDriveNaming({ address: ADDRESS, name: 'Acme' }).offeringDisplayName).toBe(
      OPERATOR_DRIVE_NAME,
    )
    expect(deriveDriveNaming({ address: ADDRESS, name: 'Acme' }).offeringDisplayName).not.toContain(
      'Acme',
    )
  })

  it('derives a human-readable profile slug (name → team → user-<suffix>)', () => {
    expect(deriveDriveNaming({ address: ADDRESS, name: 'Acme Labs' }).profileSlug).toBe('acme-labs')
    expect(deriveDriveNaming({ address: ADDRESS, teamName: 'Team X' }).profileSlug).toBe('team-x')
    expect(deriveDriveNaming({ address: ADDRESS }).profileSlug).toBe('user-1f3b0000')
  })

  it('profileDisplayName falls back to User <suffix> with no name/team', () => {
    expect(deriveDriveNaming({ address: ADDRESS }).profileDisplayName).toBe('User 1f3b0000')
  })

  it('assigns random, distinct base and offering slugs (not derived from identity)', () => {
    const naming = deriveDriveNaming({ address: ADDRESS, name: 'Acme' })
    expect(naming.baseSlug).not.toBe(naming.offeringSlug)
    expect(naming.baseSlug).not.toBe('acme')
    // two calls produce different random slugs
    expect(deriveDriveNaming({ address: ADDRESS, name: 'Acme' }).baseSlug).not.toBe(naming.baseSlug)
  })
})

describe('deriveCustomerFolderId', () => {
  // Mirrors `findUuid` in reactor-browser: node ids must round-trip through this
  // to be resolvable from a URL slug.
  const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

  it('is deterministic for the same address', () => {
    expect(deriveCustomerFolderId(ADDRESS)).toBe(deriveCustomerFolderId(ADDRESS))
  })

  it('is case-insensitive and whitespace-insensitive on the address', () => {
    expect(deriveCustomerFolderId(ADDRESS.toUpperCase())).toBe(deriveCustomerFolderId(ADDRESS))
    expect(deriveCustomerFolderId(`  ${ADDRESS}  `)).toBe(deriveCustomerFolderId(ADDRESS))
  })

  it('produces a UUID-shaped id (URL/node-id safe)', () => {
    expect(deriveCustomerFolderId(ADDRESS)).toMatch(UUID_RE)
  })

  it('maps distinct addresses to distinct ids', () => {
    const other = '0x2c4d0000000000000000000000000000000000b82d'
    expect(deriveCustomerFolderId(other)).not.toBe(deriveCustomerFolderId(ADDRESS))
  })
})
