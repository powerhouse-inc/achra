'use client'

import {
  getUserSelectionPriceBreakdown,
  type ServiceOfferingPHState,
  type UserSelection,
} from '@powerhousedao/op-hub/document-models/service-offering'
import { useQueryClient } from '@tanstack/react-query'
import type {
  RsBillingCycle,
  ServiceOfferingFieldsFragment,
} from '@/modules/__generated__/graphql/switchboard-generated'
import {
  createBuilderWorkspace,
  documents,
  openWorkspace,
  slugify,
  useSignedMutation,
} from '@/modules/sdk'
import { mapOfferingToSubscription } from '@/modules/service-purchase/lib/map-offering-to-subscription'
import type {
  CreateResourceInstancesResult,
  PurchaseOptionGroup,
} from '@/modules/service-purchase/types'
import { useUserDrives } from '@/modules/shared/hooks/use-user-drives'
import { driveLinkFor } from '@/modules/shared/lib/switchboard-urls'

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
  const drivesQuery = useUserDrives()

  return useSignedMutation<SubmitPurchaseRequestInput, CreateResourceInstancesResult>({
    mutationFn: async (input, { signer, address }) => {
      if (!input.service.resourceTemplateId) {
        throw new Error('This service has no associated resource template.')
      }

      // 1. Resolve (or create) the customer's builder-team-admin workspace.
      const existing = drivesQuery.data?.[0]
      let driveId: string
      let builderProfileId: string
      let driveSlug: string

      if (existing) {
        driveId = existing.driveId as string
        builderProfileId = (existing.builderProfileId as string | null) ?? ''
        driveSlug = existing.driveSlug
      } else {
        const workspace = await createBuilderWorkspace({
          signer,
          address,
          teamName: input.teamName,
          name: input.name,
        })
        driveId = workspace.driveId
        builderProfileId = workspace.builderProfileId
        driveSlug = workspace.driveSlug
      }

      const parsedTeamName = slugify(input.teamName) || driveSlug

      // 2. Read the resource template's state for the metadata used when
      //    initializing the resource-instance document.
      const resourceTemplateId = input.service.resourceTemplateId as string
      const templateState = await documents.resourceTemplate.getState(resourceTemplateId)

      if (!templateState) {
        throw new Error('Resource template not found.')
      }

      // 3. Compute price breakdown from user selection. The achra
      //    ServiceOfferingFieldsFragment is structurally compatible with
      //    op-hub's ServiceOfferingPHState — same tier/optionGroup/service
      //    shape — so we cast through unknown.
      const selection: UserSelection = {
        tierId: input.selectedTierId,
        billingCycle: input.selectedBillingCycle as unknown as UserSelection['billingCycle'],
        optionGroupIds: input.optionGroups
          .filter((g) => g.isSelected && g.services.length > 0)
          .map((g) => g.id),
      }
      const offeringState = {
        global: input.service,
        local: {},
      } as unknown as ServiceOfferingPHState
      const priceBreakdown = getUserSelectionPriceBreakdown(offeringState, selection)

      // 4. Open the drive workspace and ensure the "Service Subscriptions"
      //    folder exists to nest the new documents under.
      const workspace = openWorkspace({ driveId, signer })
      const serviceSubsFolderId = await workspace.ensureFolder('Service Subscriptions')

      // 5. Create the resource-instance document, initialized from the
      //    template, and register it in the drive tree.
      const resourceInstanceId = await workspace.addDocument({
        definition: documents.resourceInstance,
        init: (resource) => {
          resource.initializeInstance({
            operatorId: input.service.operatorId as string,
            operatorDocumentType: documents.builderProfile.documentType,
            resourceTemplateId,
            customerId: builderProfileId || undefined,
            customerName: parsedTeamName,
            templateName: templateState.title,
            thumbnailUrl: templateState.thumbnailUrl ?? undefined,
            infoLink: templateState.infoLink ?? undefined,
            description: templateState.description ?? undefined,
          })
          for (const facetTarget of templateState.facetTargets) {
            if (facetTarget.selectedOptions.length > 0) {
              resource.setInstanceFacet({
                id: facetTarget.id,
                categoryKey: facetTarget.categoryKey,
                categoryLabel: facetTarget.categoryLabel,
                selectedOption: facetTarget.selectedOptions[0],
              })
            }
          }
        },
        fileName: `${parsedTeamName} Resource Instance`,
        parentFolder: serviceSubsFolderId,
      })

      // 6. Create the subscription-instance document from the mapped input
      //    and register it alongside the resource instance.
      const subscriptionInput = mapOfferingToSubscription({
        offering: offeringState.global,
        tierId: input.selectedTierId,
        selectedBillingCycle: input.selectedBillingCycle as unknown as Parameters<
          typeof mapOfferingToSubscription
        >[0]['selectedBillingCycle'],
        customerId: builderProfileId || undefined,
        customerName: input.name,
        customerEmail: input.email,
        createdAt: new Date().toISOString(),
        priceBreakdown,
      })
      await workspace.addDocument({
        definition: documents.subscriptionInstance,
        init: (subscription) => {
          subscription.initializeSubscription({
            ...subscriptionInput,
            resourceId: resourceInstanceId,
            resourceLabel: templateState.title,
            resourceThumbnailUrl: input.service.thumbnailUrl ?? undefined,
          })
        },
        fileName: `${parsedTeamName} Subscription Instance`,
        parentFolder: serviceSubsFolderId,
      })

      // 7. Persist the drive-tree changes (folder + both file nodes) as one
      //    signed batch.
      await workspace.commit()

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
