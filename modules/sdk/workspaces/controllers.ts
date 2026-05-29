import { documents } from '@/modules/sdk/documents/registry'
import { createWorkspace } from '@/modules/sdk/documents/workspace'
import {
  BUILDER_DRIVE_EDITOR,
  deriveDriveNaming,
  OPERATOR_DRIVE_EDITOR,
  OPERATOR_DRIVE_ICON,
  PRIMARY_DRIVE_ICON,
} from '@/modules/sdk/workspaces/drive-naming'
import type { ISigner } from 'document-model'

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
 * SDK (`createWorkspace`); this function only supplies the achra domain
 * specifics — the builder-profile model, its actions, and the naming.
 */
export async function createBuilderWorkspace(opts: {
  signer: ISigner
  address: string
  teamName?: string
  name?: string
  isOperator?: boolean
}): Promise<CreatedBuilderWorkspace> {
  const naming = deriveDriveNaming({
    name: opts.name,
    teamName: opts.teamName,
    address: opts.address,
  })

  const workspace = await createWorkspace({
    name: naming.baseDisplayName,
    slug: naming.baseSlug,
    icon: PRIMARY_DRIVE_ICON,
    preferredEditor: BUILDER_DRIVE_EDITOR,
    signer: opts.signer,
  })

  const builderProfileId = await workspace.addDocument({
    definition: documents.builderProfile,
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
 * mechanics to the SDK (`createWorkspace`). Unlike the builder workspace, the
 * offering drive holds no child documents, so nothing has stamped the creator
 * wallet on it — `workspace.touch()` pushes the one signed op that makes it
 * visible to `getBuilderDrives`.
 */
export async function createOperatorOfferingDrive(opts: {
  signer: ISigner
  address: string
  name?: string
}): Promise<{ driveId: string }> {
  const naming = deriveDriveNaming({ name: opts.name, address: opts.address })

  const workspace = await createWorkspace({
    name: naming.offeringDisplayName,
    slug: naming.offeringSlug,
    icon: OPERATOR_DRIVE_ICON,
    preferredEditor: OPERATOR_DRIVE_EDITOR,
    signer: opts.signer,
  })
  await workspace.touch()

  return { driveId: workspace.driveId }
}
