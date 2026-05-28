import {
  BuilderProfileV1,
  ResourceInstanceV1,
  ResourceTemplateV1,
  SubscriptionInstanceV1,
} from '@powerhousedao/op-hub/document-models'
import {
  type BuilderProfileAction,
  builderProfileDocumentType,
  type BuilderProfilePHState,
} from '@powerhousedao/op-hub/document-models/builder-profile'
import {
  type ResourceInstanceAction,
  resourceInstanceDocumentType,
  type ResourceInstancePHState,
} from '@powerhousedao/op-hub/document-models/resource-instance'
import {
  type ResourceTemplateAction,
  resourceTemplateDocumentType,
  type ResourceTemplatePHState,
} from '@powerhousedao/op-hub/document-models/resource-template'
import {
  type SubscriptionInstanceAction,
  subscriptionInstanceDocumentType,
  type SubscriptionInstancePHState,
} from '@powerhousedao/op-hub/document-models/subscription-instance'
import {
  type DocumentDriveAction,
  type DocumentDrivePHState,
  driveDocumentModelModule,
  driveDocumentType,
} from '@powerhousedao/shared/document-drive'
import { defineDocumentModel } from '@/modules/sdk/documents/define'

/**
 * Central registry of every document model the app knows about. Adding a
 * new doc type = one line here. Consumers reach for `documents.<name>` and
 * never write `PHDocumentController.forDocumentModel<S, A>` themselves.
 *
 * This file is the ONLY SDK file that imports app-specific document
 * models. When the SDK is extracted to a package, this file stays in the
 * app and re-exports the package's `defineDocumentModel` factory.
 */
export const documents = {
  builderProfile: defineDocumentModel<BuilderProfilePHState, BuilderProfileAction>(
    BuilderProfileV1,
    builderProfileDocumentType,
  ),
  documentDrive: defineDocumentModel<DocumentDrivePHState, DocumentDriveAction>(
    driveDocumentModelModule,
    driveDocumentType,
  ),
  resourceInstance: defineDocumentModel<ResourceInstancePHState, ResourceInstanceAction>(
    ResourceInstanceV1,
    resourceInstanceDocumentType,
  ),
  resourceTemplate: defineDocumentModel<ResourceTemplatePHState, ResourceTemplateAction>(
    ResourceTemplateV1,
    resourceTemplateDocumentType,
  ),
  subscriptionInstance: defineDocumentModel<
    SubscriptionInstancePHState,
    SubscriptionInstanceAction
  >(SubscriptionInstanceV1, subscriptionInstanceDocumentType),
} as const

export type DocumentKey = keyof typeof documents
