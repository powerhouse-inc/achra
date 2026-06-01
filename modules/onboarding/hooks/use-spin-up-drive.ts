'use client'

import { useQueryClient } from '@tanstack/react-query'
import type { BuilderDriveLink } from '@/modules/__generated__/graphql/switchboard-generated'
import {
  createBuilderWorkspace,
  createOperatorOfferingDrive,
  useSignedMutation,
} from '@/modules/sdk'
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
    mutationFn: async ({ personaId, name, ensName }, { signer, address }) => {
      const isOperator = personaId === 'operator'

      const workspace = await createBuilderWorkspace({
        signer,
        address,
        name,
        ensName,
        isOperator,
      })

      if (isOperator) {
        await createOperatorOfferingDrive({ signer, address, name, ensName })
      }

      return {
        __typename: 'BuilderDriveLink',
        driveId: workspace.driveId,
        driveSlug: workspace.driveSlug,
        driveName: workspace.driveName,
        driveLink: driveLinkFor(workspace.driveSlug),
        builderProfileId: workspace.builderProfileId,
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
