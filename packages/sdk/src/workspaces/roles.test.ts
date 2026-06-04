import { describe, expect, it, vi } from 'vitest'
import type { ReactorClient } from '../client/reactor-client'
import type { ClientContext } from '../context'
import type { BuilderDrive } from '../reads/builder-drives'
import { bindDocuments } from '../documents/registry'
import { ensureRoles, hasRole, resolveOrder, roles } from './roles'
import { OPERATOR_DRIVE_NAME, PRIMARY_DRIVE_NAME } from './drive-naming'

const builderDrive: BuilderDrive = {
  driveId: 'drive-builder',
  driveLink: 'link',
  driveName: `Acme ${PRIMARY_DRIVE_NAME}`,
  driveSlug: 'acme',
  builderProfileId: 'profile-1',
}
const operatorDrive: BuilderDrive = {
  driveId: 'drive-operator',
  driveLink: 'link',
  driveName: `Acme ${OPERATOR_DRIVE_NAME}`,
  driveSlug: 'acme-offering',
  builderProfileId: null,
}

/** Fake ctx whose `getBuilderDrives` returns `drives`; records CreateDocument calls. */
function makeFakeContext(drives: BuilderDrive[]) {
  const createDocument = vi.fn(async (vars: { document: { header: { id: string } } }) => ({
    createDocument: { id: vars.document.header.id },
  }))
  const reactorClient = { CreateDocument: createDocument } as unknown as ReactorClient
  const graphql = vi.fn(async () => ({
    getBuilderDrives: drives,
  })) as unknown as ClientContext['graphql']
  const ctx: ClientContext = { reactorClient, graphql, documents: bindDocuments(reactorClient) }
  return { ctx, createDocument }
}

const identity = { signer: {} as never, address: '0xabc', name: 'Acme' }

describe('resolveOrder', () => {
  it('pulls in dependencies and orders them first', () => {
    expect(resolveOrder(['operator'])).toEqual(['builder', 'operator'])
  })

  it('keeps a lone builder', () => {
    expect(resolveOrder(['builder'])).toEqual(['builder'])
  })

  it('de-dupes and keeps dependency order regardless of input order', () => {
    expect(resolveOrder(['operator', 'builder'])).toEqual(['builder', 'operator'])
  })
})

describe('role detect predicates', () => {
  it('builder is present iff a team-admin drive exists', () => {
    expect(roles.builder.detect({ drives: [builderDrive], teamAdminDrive: builderDrive })).toBe(
      true,
    )
    expect(roles.builder.detect({ drives: [], teamAdminDrive: undefined })).toBe(false)
  })

  it('operator is present iff a service-offering drive exists', () => {
    expect(
      roles.operator.detect({
        drives: [builderDrive, operatorDrive],
        teamAdminDrive: builderDrive,
      }),
    ).toBe(true)
    expect(roles.operator.detect({ drives: [builderDrive], teamAdminDrive: builderDrive })).toBe(
      false,
    )
  })
})

describe('ensureRoles idempotency', () => {
  it('provisions nothing when both roles already exist (no dupes)', async () => {
    const { ctx, createDocument } = makeFakeContext([builderDrive, operatorDrive])
    const result = await ensureRoles(ctx, { roles: ['builder', 'operator'], identity })

    expect(result.created).toEqual([])
    expect(createDocument).not.toHaveBeenCalled()
    // existing builder info still surfaced from the team-admin drive
    expect(result.builderDriveId).toBe('drive-builder')
    expect(result.builderProfileId).toBe('profile-1')
  })

  it('skips an existing builder when only operator is requested', async () => {
    // builder exists, no operator drive yet
    const { ctx } = makeFakeContext([builderDrive])
    // detect tells us builder is present and operator is missing
    const drives = [builderDrive]
    expect(roles.builder.detect({ drives, teamAdminDrive: builderDrive })).toBe(true)
    expect(roles.operator.detect({ drives, teamAdminDrive: builderDrive })).toBe(false)
    // hasRole reflects the same
    await expect(hasRole(ctx, 'builder', { address: '0xabc' })).resolves.toBe(true)
    await expect(hasRole(ctx, 'operator', { address: '0xabc' })).resolves.toBe(false)
  })
})
