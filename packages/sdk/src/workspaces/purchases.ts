import type { ISigner } from 'document-model'
import {
  getUserSelectionPriceBreakdown,
  type ServiceOfferingPHState,
  type ServiceOfferingState,
  type UserSelection,
} from '@powerhousedao/op-hub/document-models/service-offering'
import type { BillingCycle as SIBillingCycle } from '@powerhousedao/op-hub/document-models/subscription-instance'
import type { ClientContext } from '../context'
import { openWorkspace } from '../documents/workspace'
import { createBuilderWorkspace, findOperatorDriveId } from './controllers'
import { slugify } from './drive-naming'
import { mapOfferingToSubscription } from './map-offering-to-subscription'

/**
 * The customer's existing team-admin workspace, if they already have one. When
 * omitted, {@link purchaseService} creates a fresh builder workspace for them.
 */
export interface ExistingBuilderDrive {
  driveId: string
  builderProfileId?: string
  driveSlug: string
}

export interface PurchaseServiceInput {
  /**
   * The operator's service offering (op-hub `ServiceOfferingState`). Carries
   * the `resourceTemplateId`, `operatorId`, `thumbnailUrl`, tiers, services,
   * and option groups the purchase reads.
   */
  offering: ServiceOfferingState
  /** Selected tier id. */
  tierId: string
  /** Selected billing cycle (subscription-instance billing cycle). */
  billingCycle: SIBillingCycle
  /** Ids of the selected, non-empty option groups. */
  optionGroupIds: string[]
  /** Customer details captured by the request form. */
  customer: { name: string; teamName: string; email: string }
  signer: ISigner
  address: string
  /** The customer's existing team-admin workspace, if any. */
  existingBuilderDrive?: ExistingBuilderDrive
}

export interface PurchaseServiceResult {
  driveId: string
  driveSlug: string
  builderProfileId: string
  resourceInstanceId: string
  subscriptionInstanceId: string
  operatorDriveId: string
}

/**
 * Execute a service purchase: create the buyer's resource-instance and
 * subscription-instance documents in their builder workspace, then link both
 * into the operator's drive so the operator dashboard surfaces them.
 *
 * Domain orchestration only — auth gating, query invalidation, and URL building
 * are the caller's concern. Throws plain `Error`s for unrecoverable preflight
 * failures (no operator drive, missing template) so the caller can surface the
 * message; it does not wrap them in `SDKError`.
 */
export async function purchaseService(
  ctx: ClientContext,
  input: PurchaseServiceInput,
): Promise<PurchaseServiceResult> {
  const { offering, customer, signer, address } = input

  if (!offering.resourceTemplateId) {
    throw new Error('This service has no associated resource template.')
  }
  const resourceTemplateId = offering.resourceTemplateId

  // 0. Resolve the operator's drive up-front (read-only) so the purchase
  //    fails before creating any documents if it can't be found. Locating
  //    it only after the buyer docs are committed would strand a
  //    half-finished purchase that a retry can only duplicate (every run
  //    mints fresh document ids).
  const operatorDriveId = await findOperatorDriveId(ctx, resourceTemplateId)
  if (!operatorDriveId) {
    throw new Error('Could not locate the operator workspace for this service.')
  }

  // 1. Resolve (or create) the customer's builder-team-admin workspace —
  //    the drive carrying a builder profile, not a stray operator/preview
  //    drive that `getBuilderDrives` may also return.
  let driveId: string
  let builderProfileId: string
  let driveSlug: string

  if (input.existingBuilderDrive) {
    driveId = input.existingBuilderDrive.driveId
    builderProfileId = input.existingBuilderDrive.builderProfileId ?? ''
    driveSlug = input.existingBuilderDrive.driveSlug
  } else {
    const workspace = await createBuilderWorkspace(ctx, {
      signer,
      address,
      teamName: customer.teamName,
      name: customer.name,
    })
    driveId = workspace.driveId
    builderProfileId = workspace.builderProfileId
    driveSlug = workspace.driveSlug
  }

  const parsedTeamName = slugify(customer.teamName) || driveSlug

  // 2. Read the resource template's state for the metadata used when
  //    initializing the resource-instance document.
  const templateState = await ctx.documents.resourceTemplate.getState(resourceTemplateId)

  if (!templateState) {
    throw new Error('Resource template not found.')
  }

  // 3. Compute price breakdown from user selection. The offering global is
  //    wrapped in the PH-state shape `getUserSelectionPriceBreakdown` expects.
  const selection: UserSelection = {
    tierId: input.tierId,
    billingCycle: input.billingCycle as unknown as UserSelection['billingCycle'],
    optionGroupIds: input.optionGroupIds,
  }
  const offeringState = {
    global: offering,
    local: {},
  } as unknown as ServiceOfferingPHState
  const priceBreakdown = getUserSelectionPriceBreakdown(offeringState, selection)

  // 4. Open the drive workspace and ensure the "Service Subscriptions"
  //    folder exists to nest the new documents under.
  const workspace = openWorkspace(ctx, { driveId, signer })
  const serviceSubsFolderId = await workspace.ensureFolder('Service Subscriptions')

  // 5. Create the resource-instance document, initialized from the
  //    template, and register it in the drive tree.
  const resourceInstanceId = await workspace.addDocument({
    definition: ctx.documents.resourceInstance,
    init: (resource) => {
      resource.initializeInstance({
        operatorId: offering.operatorId as string,
        operatorDocumentType: ctx.documents.builderProfile.documentType,
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
    offering,
    tierId: input.tierId,
    selectedBillingCycle: input.billingCycle,
    customerId: builderProfileId || undefined,
    customerName: customer.name,
    customerEmail: customer.email,
    createdAt: new Date().toISOString(),
    priceBreakdown,
  })
  const subscriptionInstanceId = await workspace.addDocument({
    definition: ctx.documents.subscriptionInstance,
    init: (subscription) => {
      subscription.initializeSubscription({
        ...subscriptionInput,
        resourceId: resourceInstanceId,
        resourceLabel: templateState.title,
        resourceThumbnailUrl: offering.thumbnailUrl ?? undefined,
      })
    },
    fileName: `${parsedTeamName} Subscription Instance`,
    parentFolder: serviceSubsFolderId,
  })

  // 7. Persist the drive-tree changes (folder + both file nodes) as one
  //    signed batch.
  await workspace.commit()

  // 8. Link both instance documents into the operator's drive so the
  //    operator dashboard (op-hub service-offering-app editor) surfaces
  //    them. The dashboard reads resource/subscription documents nested in
  //    the drive's "Customers" folder; these file nodes reference the same
  //    documents created above (one document, referenced from two drives)
  //    and registerDocument wires the drive→doc relationship so each
  //    surfaces under the operator's view.
  const operatorWorkspace = openWorkspace(ctx, { driveId: operatorDriveId, signer })
  const customersFolderId = await operatorWorkspace.ensureFolder('Customers')
  await operatorWorkspace.registerDocument({
    documentType: ctx.documents.resourceInstance.documentType,
    id: resourceInstanceId,
    name: `${parsedTeamName} Resource Instance`,
    parentFolder: customersFolderId,
  })
  await operatorWorkspace.registerDocument({
    documentType: ctx.documents.subscriptionInstance.documentType,
    id: subscriptionInstanceId,
    name: `${parsedTeamName} Subscription Instance`,
    parentFolder: customersFolderId,
  })
  await operatorWorkspace.commit()

  return {
    driveId,
    driveSlug,
    builderProfileId,
    resourceInstanceId,
    subscriptionInstanceId,
    operatorDriveId,
  }
}
