import type { ISigner } from 'document-model'
import type { ClientContext } from '../context'
import { findDriveContainingDocument } from '../documents/drives'
import { createWorkspace } from '../documents/workspace'
import {
  BUILDER_DRIVE_EDITOR,
  deriveDriveNaming,
  OPERATOR_DRIVE_EDITOR,
  OPERATOR_DRIVE_ICON,
  PRIMARY_DRIVE_ICON,
} from './drive-naming'

export interface CreatedBuilderWorkspace {
  driveId: string
  driveSlug: string
  driveName: string
  builderProfileId: string
  profileDisplayName: string
}

/**
 * Create a builder-team-admin drive + builder-profile for a wallet.
 *
 * App-specific workspace orchestration: spins up the drive, creates the
 * profile inside it, signs and pushes the profile actions, then registers
 * the profile as a file node in the drive. The drive mechanics live in the
 * SDK core (`createWorkspace`); this function only supplies the achra domain
 * specifics — the builder-profile model, its actions, and the naming.
 */
export async function createBuilderWorkspace(
  ctx: ClientContext,
  opts: {
    signer: ISigner
    address: string
    teamName?: string
    name?: string
    ensName?: string
    isOperator?: boolean
  },
): Promise<CreatedBuilderWorkspace> {
  const naming = deriveDriveNaming({
    name: opts.name,
    teamName: opts.teamName,
    ensName: opts.ensName,
    address: opts.address,
  })

  const workspace = createWorkspace(ctx, {
    name: naming.baseDisplayName,
    slug: naming.baseSlug,
    icon: PRIMARY_DRIVE_ICON,
    preferredEditor: BUILDER_DRIVE_EDITOR,
    signer: opts.signer,
  })

  const builderProfileId = await workspace.addDocument({
    definition: ctx.documents.builderProfile,
    init: (profile) => {
      profile.updateProfile({ name: naming.profileDisplayName, slug: naming.profileSlug })
      profile.setWalletAddress({ walletAddress: opts.address })
      if (opts.isOperator) {
        profile.setOperator({ isOperator: true })
      }
    },
    // Stamp the profile's self-referential `id` now that the reactor has
    // assigned it. Otherwise Connect's builder-profile editor backfills it on
    // first open with a non-wallet (app=connect) signed op; pre-setting it
    // here keeps every profile operation attributed to the user's wallet.
    initWithId: (profile, id) => {
      profile.updateProfile({ id })
    },
    fileName: `${naming.profileSlug} Builder Profile`,
  })
  await workspace.commit()

  return {
    driveId: workspace.driveId,
    driveSlug: naming.baseSlug,
    driveName: naming.baseDisplayName,
    builderProfileId,
    profileDisplayName: naming.profileDisplayName,
  }
}

/**
 * Create the operator's service-offering drive for a wallet.
 *
 * The achra-domain companion to {@link createBuilderWorkspace}: it supplies
 * the canonical service-offering naming/icon/editor and delegates the drive
 * mechanics to the SDK core (`createWorkspace`). Unlike the builder workspace,
 * the offering drive holds no child documents, so nothing has stamped the
 * creator wallet on it — `workspace.touch()` pushes the one signed op that
 * makes it visible to `getBuilderDrives`.
 */
export async function createOperatorOfferingDrive(
  ctx: ClientContext,
  opts: {
    signer: ISigner
    address: string
    name?: string
    ensName?: string
  },
): Promise<{ driveId: string }> {
  const naming = deriveDriveNaming({
    name: opts.name,
    ensName: opts.ensName,
    address: opts.address,
  })

  const workspace = createWorkspace(ctx, {
    name: naming.offeringDisplayName,
    slug: naming.offeringSlug,
    icon: OPERATOR_DRIVE_ICON,
    preferredEditor: OPERATOR_DRIVE_EDITOR,
    signer: opts.signer,
  })
  // The offering drive holds no documents, so nothing else stamps the creator
  // wallet on it. `touch()` stages a wallet-signed op; `commit()` creates the
  // drive and flushes it, making the drive visible to `getBuilderDrives`.
  workspace.touch()
  await workspace.commit()

  return { driveId: workspace.driveId }
}

/**
 * Spin up a builder's workspace(s) for onboarding.
 *
 * Always creates the builder-team-admin workspace (drive + builder profile).
 * When `isOperator` is true, additionally creates the operator's
 * service-offering drive. Returns the builder workspace so the caller can build
 * a drive link and surface it.
 */
export async function spinUpBuilderWorkspaces(
  ctx: ClientContext,
  opts: {
    signer: ISigner
    address: string
    name: string
    ensName?: string
    isOperator: boolean
  },
): Promise<CreatedBuilderWorkspace> {
  const workspace = await createBuilderWorkspace(ctx, {
    signer: opts.signer,
    address: opts.address,
    name: opts.name,
    ensName: opts.ensName,
    isOperator: opts.isOperator,
  })

  if (opts.isOperator) {
    await createOperatorOfferingDrive(ctx, {
      signer: opts.signer,
      address: opts.address,
      name: opts.name,
      ensName: opts.ensName,
    })
  }

  return workspace
}

/**
 * Resolve the operator's service-offering drive from one of its resource
 * templates.
 *
 * A service offering's resource template lives in the operator's drive file
 * tree, so the drive that holds the template is the operator drive. Used by
 * the purchase flow to link a buyer's new resource/subscription instances
 * into the operator's drive (where the operator dashboard reads them).
 * Returns null if no drive holds the template.
 */
export async function findOperatorDriveId(
  ctx: ClientContext,
  resourceTemplateId: string,
): Promise<string | null> {
  return findDriveContainingDocument(ctx, resourceTemplateId)
}

/**
 * Flip a builder profile's `isOperator` flag to true via a wallet-signed
 * operation. Used when promoting an existing builder to operator (the
 * `operator` role): the profile already exists, so its state is mutated rather
 * than baked at genesis.
 */
export async function setBuilderProfileOperator(
  ctx: ClientContext,
  opts: { builderProfileId: string; signer: ISigner },
): Promise<void> {
  const profile = await ctx.documents.builderProfile.load({
    documentId: opts.builderProfileId,
    signer: opts.signer,
  })
  profile.setOperator({ isOperator: true })
  await profile.push()
}
