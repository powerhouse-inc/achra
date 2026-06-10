import type { ClientContext } from '../context'
import { bindDocuments, type BoundDocuments } from '../documents/registry'
import {
  createDrive,
  type CreateDriveOptions,
  findDriveContainingDocument,
} from '../documents/drives'
import { createWorkspace, openWorkspace, type Workspace } from '../documents/workspace'
import {
  createBuilderWorkspace,
  createOperatorOfferingDrive,
  type CreatedBuilderWorkspace,
  findOperatorDriveId,
  spinUpBuilderWorkspaces,
} from '../workspaces/controllers'
import { purchaseService, type PurchaseServiceInput } from '../workspaces/purchases'
import {
  type EnsureRolesResult,
  ensureRoles,
  hasRole,
  type RoleId,
  type WorkspaceIdentity,
} from '../workspaces/roles'
import {
  type BuilderDrive,
  listBuilderDrives,
  resolveTeamAdminDrive,
} from '../reads/builder-drives'
import { type BuilderProfile, getBuilderProfile } from '../reads/builder-profile'
import { getOperatorPaymentAccount, type OperatorPaymentAccount } from '../reads/payment-account'
import {
  createReactorClientHandle,
  type ReactorClientHandleOptions,
  type TokenProvider,
} from './reactor-client'

/** Identity used by the workspace orchestration (sourced from auth/Renown). */
type OpenOptions = Parameters<typeof openWorkspace>[1]
type SpinUpOptions = Parameters<typeof spinUpBuilderWorkspaces>[1]
type CreateBuilderOptions = Parameters<typeof createBuilderWorkspace>[1]
type CreateOperatorOptions = Parameters<typeof createOperatorOfferingDrive>[1]

export type PowerhouseClientConfig = ReactorClientHandleOptions

/**
 * The Supabase-style instance client. One object owns the reactor connection
 * and auth, and exposes the SDK's capabilities through namespaces. Build it
 * once with {@link createClient} and pass it down (React: via
 * `PowerhouseSDKProvider` + `useClient()`).
 *
 * `signer` is NOT held on the client — it is React/Renown state, passed
 * per-call (see `useSignedMutation`). `auth` is read-only here; `login`/
 * `logout` live in the React layer.
 */
export interface PowerhouseClient {
  /** Typed document-model factories bound to this client's reactor connection. */
  readonly documents: BoundDocuments

  readonly drives: {
    create(opts: CreateDriveOptions): Promise<{ driveId: string }>
    findContaining(documentId: string): Promise<string | null>
  }

  readonly workspaces: {
    create(opts: CreateDriveOptions): Workspace
    open(opts: OpenOptions): Workspace
    /** List the wallet's drives (team-admin first, operator/offering last). */
    list(opts: { address: string }): Promise<BuilderDrive[]>
    /** The wallet's team-admin drive (the one carrying a builder profile), if any. */
    resolveTeamAdmin(opts: { address: string }): Promise<BuilderDrive | undefined>
    /**
     * Idempotent, role-aware provisioning: create only the requested roles the
     * wallet doesn't already have (dependencies pulled in automatically). The
     * extensible replacement for `spinUpBuilder` / `createOperatorOffering`.
     */
    ensure(roleIds: RoleId[], identity: WorkspaceIdentity): Promise<EnsureRolesResult>
    /** True if the wallet already holds `role`. */
    has(role: RoleId, opts: { address: string }): Promise<boolean>
    spinUpBuilder(opts: SpinUpOptions): Promise<CreatedBuilderWorkspace>
    createBuilder(opts: CreateBuilderOptions): Promise<CreatedBuilderWorkspace>
    createOperatorOffering(opts: CreateOperatorOptions): Promise<{ driveId: string }>
    findOperatorDriveId(resourceTemplateId: string): Promise<string | null>
  }

  readonly profile: {
    /** Fetch a builder profile by its document id. */
    get(id: string): Promise<BuilderProfile | null>
    /** Resolve the wallet's team-admin drive and fetch its builder profile in one call. */
    getMine(opts: { address: string }): Promise<{
      drives: BuilderDrive[]
      teamAdminDrive: BuilderDrive | undefined
      builderProfileId: string | undefined
      profile: BuilderProfile | null
    }>
  }

  readonly payments: {
    /** The payment-account (Stripe KYC) state in an operator drive, if any. */
    getOperatorAccount(opts: { driveId: string }): Promise<OperatorPaymentAccount | null>
  }

  readonly purchases: {
    create(input: PurchaseServiceInput): Promise<Awaited<ReturnType<typeof purchaseService>>>
  }

  readonly auth: {
    /** Resolve a fresh bearer token (read-only). */
    getToken(): Promise<string | null>
  }

  /** Internal: the React auth bridge swaps Renown's token provider in here. */
  setTokenProvider(provider: TokenProvider | null): void
}

/**
 * Create a Powerhouse SDK client.
 *
 * ```ts
 * const client = createClient({ switchboardUrl })
 * await client.workspaces.spinUpBuilder({ signer, address, name, isOperator })
 * ```
 */
export function createClient(config: PowerhouseClientConfig = {}): PowerhouseClient {
  const handle = createReactorClientHandle(config)
  const documents = bindDocuments(handle.reactorClient)
  const ctx: ClientContext = {
    reactorClient: handle.reactorClient,
    graphql: handle.graphql,
    documents,
  }

  return {
    documents,
    drives: {
      create: (opts) => createDrive(ctx, opts),
      findContaining: (documentId) => findDriveContainingDocument(ctx, documentId),
    },
    workspaces: {
      create: (opts) => createWorkspace(ctx, opts),
      open: (opts) => openWorkspace(ctx, opts),
      list: (opts) => listBuilderDrives(ctx, opts),
      resolveTeamAdmin: async (opts) => resolveTeamAdminDrive(await listBuilderDrives(ctx, opts)),
      ensure: (roleIds, identity) => ensureRoles(ctx, { roles: roleIds, identity }),
      has: (role, opts) => hasRole(ctx, role, opts),
      spinUpBuilder: (opts) => spinUpBuilderWorkspaces(ctx, opts),
      createBuilder: (opts) => createBuilderWorkspace(ctx, opts),
      createOperatorOffering: (opts) => createOperatorOfferingDrive(ctx, opts),
      findOperatorDriveId: (id) => findOperatorDriveId(ctx, id),
    },
    profile: {
      get: (id) => getBuilderProfile(ctx, { id }),
      getMine: async (opts) => {
        const drives = await listBuilderDrives(ctx, opts)
        const teamAdminDrive = resolveTeamAdminDrive(drives)
        const builderProfileId = teamAdminDrive?.builderProfileId ?? undefined
        const profile = builderProfileId
          ? await getBuilderProfile(ctx, { id: builderProfileId })
          : null
        return { drives, teamAdminDrive, builderProfileId, profile }
      },
    },
    payments: {
      getOperatorAccount: (opts) => getOperatorPaymentAccount(ctx, opts),
    },
    purchases: {
      create: (input) => purchaseService(ctx, input),
    },
    auth: {
      getToken: () => handle.getToken(),
    },
    setTokenProvider: handle.setTokenProvider,
  }
}
