'use client'

import { useSignedMutation } from '@achra/sdk/react'
import { useQueryClient } from '@tanstack/react-query'
import type { BuilderDriveLink } from '@/modules/__generated__/graphql/switchboard-generated'
import { driveLinkFor } from '@/modules/shared/lib/switchboard-urls'

type SpinUpPersonaId = 'operator' | 'builder'

interface SpinUpDriveInput {
  personaId: SpinUpPersonaId
  name: string
  ensName?: string
}

function useSpinUpDrive() {
  const queryClient = useQueryClient()

  return useSignedMutation<SpinUpDriveInput, BuilderDriveLink>({
    mutationFn: async ({ personaId, name, ensName }, { signer, address, client }) => {
      // Idempotent + role-aware: an operator persona ensures both the builder
      // workspace and the operator role; a builder persona ensures just the
      // builder workspace. Already-provisioned roles are skipped (no dupes).
      const result = await client.workspaces.ensure(
        personaId === 'operator' ? ['builder', 'operator'] : ['builder'],
        { signer, address, name, ensName },
      )

      const driveSlug = result.builderDriveSlug ?? ''
      return {
        __typename: 'BuilderDriveLink',
        driveId: result.builderDriveId ?? '',
        driveSlug,
        driveName: result.builderDriveName ?? '',
        driveLink: driveLinkFor(driveSlug),
        builderProfileId: result.builderProfileId,
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['GetBuilderDrives'] })
      void queryClient.invalidateQueries({ queryKey: ['GetBuilderDrivesSuspense'] })
    },
  })
}

export { useSpinUpDrive }
export type { SpinUpDriveInput, SpinUpPersonaId }
