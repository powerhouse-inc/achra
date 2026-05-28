import {
  BUILDER_DRIVE_EDITOR,
  deriveDriveNaming,
  PRIMARY_DRIVE_ICON,
} from '@/modules/onboarding/lib/drive-naming'
import { createWorkspace, documents } from '@/modules/sdk'
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
      profile.updateProfile({ name: naming.profileDisplayName, slug: naming.baseSlug })
      profile.setWalletAddress({ walletAddress: opts.address })
      if (opts.isOperator) {
        profile.setOperator({ isOperator: true })
      }
    },
    fileName: `${naming.baseSlug} Builder Profile`,
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
