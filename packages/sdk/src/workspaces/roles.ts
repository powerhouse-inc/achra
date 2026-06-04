import type { ISigner } from 'document-model'
import type { ClientContext } from '../context'
import {
  listBuilderDrives,
  resolveTeamAdminDrive,
  type BuilderDrive,
} from '../reads/builder-drives'
import {
  createBuilderWorkspace,
  createOperatorOfferingDrive,
  setBuilderProfileOperator,
} from './controllers'
import { isOperatorDriveName } from './drive-naming'

/**
 * The roles a wallet can hold. Adding a future role is a single entry in
 * {@link roles} below + (optionally) a `dependsOn` — `ensureRoles` and the
 * client surface don't change (Open/Closed).
 */
export type RoleId = 'builder' | 'operator'

/** Identity used to name and attribute the provisioned workspaces. */
export interface WorkspaceIdentity {
  signer: ISigner
  address: string
  name?: string
  ensName?: string
  teamName?: string
}

/** A snapshot of what the wallet already has, used by each role's `detect`. */
interface ExistingState {
  drives: BuilderDrive[]
  teamAdminDrive: BuilderDrive | undefined
}

/** Mutable run state threaded through provisioning, in dependency order. */
interface ProvisionState {
  ctx: ClientContext
  identity: WorkspaceIdentity
  existing: ExistingState
  /** The builder profile id — from the existing team-admin drive or set by `builder.provision`. */
  builderProfileId?: string
  builderDriveId?: string
  builderDriveSlug?: string
  builderDriveName?: string
  operatorDriveId?: string
  operatorDriveSlug?: string
  operatorDriveName?: string
}

interface RoleDefinition {
  id: RoleId
  /** Roles that must be ensured before this one (and pulled in automatically). */
  dependsOn?: RoleId[]
  /** Is this role already provisioned for the wallet? */
  detect(existing: ExistingState): boolean
  /** Provision the role, updating `state`. Only called when `detect` is false. */
  provision(state: ProvisionState): Promise<void>
}

export const roles: Record<RoleId, RoleDefinition> = {
  builder: {
    id: 'builder',
    // The team-admin drive is the one carrying a builder profile.
    detect: (existing) => Boolean(existing.teamAdminDrive),
    provision: async (state) => {
      const created = await createBuilderWorkspace(state.ctx, {
        signer: state.identity.signer,
        address: state.identity.address,
        name: state.identity.name,
        ensName: state.identity.ensName,
        teamName: state.identity.teamName,
      })
      state.builderDriveId = created.driveId
      state.builderDriveSlug = created.driveSlug
      state.builderDriveName = created.driveName
      state.builderProfileId = created.builderProfileId
    },
  },
  operator: {
    id: 'operator',
    dependsOn: ['builder'],
    // The operator's artifact is the service-offering drive.
    detect: (existing) => existing.drives.some((drive) => isOperatorDriveName(drive.driveName)),
    provision: async (state) => {
      const { driveId, driveSlug, driveName } = await createOperatorOfferingDrive(state.ctx, {
        signer: state.identity.signer,
        address: state.identity.address,
        name: state.identity.name,
        ensName: state.identity.ensName,
      })
      state.operatorDriveId = driveId
      state.operatorDriveSlug = driveSlug
      state.operatorDriveName = driveName
      // Mark the builder profile as an operator. The profile exists by now
      // (created above, or pre-existing — `operator` dependsOn `builder`).
      if (state.builderProfileId) {
        await setBuilderProfileOperator(state.ctx, {
          builderProfileId: state.builderProfileId,
          signer: state.identity.signer,
        })
      }
    },
  },
}

export interface EnsureRolesResult {
  /** Roles newly provisioned by this call (empty if everything already existed). */
  created: RoleId[]
  builderDriveId?: string
  builderDriveSlug?: string
  builderDriveName?: string
  builderProfileId?: string
  operatorDriveId?: string
  operatorDriveSlug?: string
  operatorDriveName?: string
}

/**
 * Expand the requested roles with their dependencies and return them in
 * dependency order (dependencies first, de-duplicated). Exported for testing.
 */
export function resolveOrder(requested: RoleId[]): RoleId[] {
  const ordered: RoleId[] = []
  const visit = (id: RoleId) => {
    if (ordered.includes(id)) return
    for (const dep of roles[id].dependsOn ?? []) visit(dep)
    ordered.push(id)
  }
  for (const id of requested) visit(id)
  return ordered
}

/**
 * Idempotent, role-aware provisioning. Reads what the wallet already has, then
 * provisions ONLY the missing roles (in dependency order) — so onboarding a
 * fresh user as an operator creates both the builder workspace and the
 * service-offering drive, while a user who already has a builder workspace gets
 * only the operator parts (no duplicate builder workspace).
 *
 * Extensible: add a role to {@link roles}; callers pass its id here.
 */
export async function ensureRoles(
  ctx: ClientContext,
  opts: { roles: RoleId[]; identity: WorkspaceIdentity },
): Promise<EnsureRolesResult> {
  const drives = await listBuilderDrives(ctx, { address: opts.identity.address })
  const teamAdminDrive = resolveTeamAdminDrive(drives)
  const existing: ExistingState = { drives, teamAdminDrive }

  const state: ProvisionState = {
    ctx,
    identity: opts.identity,
    existing,
    builderProfileId: teamAdminDrive?.builderProfileId ?? undefined,
    builderDriveId: teamAdminDrive?.driveId,
    builderDriveSlug: teamAdminDrive?.driveSlug,
    builderDriveName: teamAdminDrive?.driveName,
  }

  const created: RoleId[] = []
  for (const roleId of resolveOrder(opts.roles)) {
    const role = roles[roleId]
    if (role.detect(existing)) continue
    await role.provision(state)
    created.push(roleId)
  }

  return {
    created,
    builderDriveId: state.builderDriveId,
    builderDriveSlug: state.builderDriveSlug,
    builderDriveName: state.builderDriveName,
    builderProfileId: state.builderProfileId,
    operatorDriveId: state.operatorDriveId,
    operatorDriveSlug: state.operatorDriveSlug,
    operatorDriveName: state.operatorDriveName,
  }
}

/** True if the wallet already holds `role`. */
export async function hasRole(
  ctx: ClientContext,
  role: RoleId,
  opts: { address: string },
): Promise<boolean> {
  const drives = await listBuilderDrives(ctx, { address: opts.address })
  return roles[role].detect({ drives, teamAdminDrive: resolveTeamAdminDrive(drives) })
}
