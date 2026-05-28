'use client'

import { useQueryClient } from '@tanstack/react-query'
import type { BuilderDriveLink } from '@/modules/__generated__/graphql/switchboard-generated'
import { createBuilderWorkspace } from '@/modules/onboarding/lib/controllers'
import {
  deriveDriveNaming,
  OPERATOR_DRIVE_EDITOR,
  OPERATOR_DRIVE_ICON,
} from '@/modules/onboarding/lib/drive-naming'
import { createDrive, documents, useSignedMutation } from '@/modules/sdk'
import { driveLinkFor } from '@/modules/shared/lib/switchboard-urls'

type SpinUpPersonaId = 'operator' | 'builder'

interface SpinUpDriveInput {
  personaId: SpinUpPersonaId
  name: string
}

function useSpinUpDrive() {
  const queryClient = useQueryClient()

  return useSignedMutation<SpinUpDriveInput, BuilderDriveLink>({
    mutationFn: async ({ personaId, name }, { signer, address }) => {
      const isOperator = personaId === 'operator'

      const workspace = await createBuilderWorkspace({
        signer,
        address,
        name,
        isOperator,
      })

      if (isOperator) {
        const naming = deriveDriveNaming({ name, address })
        const { driveId: offeringDriveId } = await createDrive({
          name: naming.offeringDisplayName,
          slug: naming.offeringSlug,
          icon: OPERATOR_DRIVE_ICON,
          preferredEditor: OPERATOR_DRIVE_EDITOR,
        })
        // Drive creation goes through an unsigned `CreateDocument`, so the
        // drive carries no wallet-signed operation. The backend attributes
        // drive ownership to the wallet that signed an operation on it, so we
        // push one signed op here to record the creator — otherwise this
        // service-offering drive is invisible to `getBuilderDrives`. Loading
        // the drive with the signer and re-setting its name is a harmless
        // signed touch that stamps `signer.user.address`.
        const offeringDrive = await documents.documentDrive.load({
          documentId: offeringDriveId,
          signer,
        })
        offeringDrive.setDriveName({ name: naming.offeringDisplayName })
        await offeringDrive.push()
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
