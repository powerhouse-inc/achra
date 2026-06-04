'use client'

import { useSignedMutation } from '@achra/sdk/react'
import { useQueryClient } from '@tanstack/react-query'
import type {
  RsBillingCycle,
  ServiceOfferingFieldsFragment,
} from '@/modules/__generated__/graphql/switchboard-generated'
import type {
  CreateResourceInstancesResult,
  PurchaseOptionGroup,
} from '@/modules/service-purchase/types'
import { useTeamAdminDrive } from '@/modules/shared/hooks/use-team-admin-drive'
import { driveLinkFor } from '@/modules/shared/lib/switchboard-urls'
import type { ServiceOfferingState } from '@powerhousedao/op-hub/document-models/service-offering'
import type { BillingCycle as SIBillingCycle } from '@powerhousedao/op-hub/document-models/subscription-instance'

export interface SubmitPurchaseRequestInput {
  name: string
  teamName: string
  email: string
  service: ServiceOfferingFieldsFragment
  selectedTierId: string
  selectedBillingCycle: RsBillingCycle
  optionGroups: PurchaseOptionGroup[]
}

export function useSubmitPurchaseRequest() {
  const queryClient = useQueryClient()
  const { teamAdminDrive } = useTeamAdminDrive()

  return useSignedMutation<SubmitPurchaseRequestInput, CreateResourceInstancesResult>({
    mutationFn: async (input, { signer, address, client }) => {
      // The SDK owns the document/drive creation. This hook only adapts app
      // shapes to the SDK's: it casts the GraphQL offering fragment to op-hub's
      // structurally-identical `ServiceOfferingState`, reduces the selected
      // option groups to their ids, threads the user's existing team-admin
      // drive, and turns the resulting slug into a Connect drive link.
      const { driveSlug } = await client.purchases.create({
        offering: input.service as unknown as ServiceOfferingState,
        tierId: input.selectedTierId,
        billingCycle: input.selectedBillingCycle as unknown as SIBillingCycle,
        optionGroupIds: input.optionGroups
          .filter((g) => g.isSelected && g.services.length > 0)
          .map((g) => g.id),
        customer: { name: input.name, teamName: input.teamName, email: input.email },
        signer,
        address,
        existingBuilderDrive: teamAdminDrive
          ? {
              driveId: teamAdminDrive.driveId,
              builderProfileId: teamAdminDrive.builderProfileId ?? undefined,
              driveSlug: teamAdminDrive.driveSlug,
            }
          : undefined,
      })

      return {
        name: input.name,
        teamName: input.teamName,
        email: input.email,
        driveUrl: driveLinkFor(driveSlug),
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['GetBuilderDrives'] })
      void queryClient.invalidateQueries({ queryKey: ['GetBuilderDrivesSuspense'] })
    },
  })
}
