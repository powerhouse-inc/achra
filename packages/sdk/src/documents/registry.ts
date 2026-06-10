import {
  BuilderProfileV1,
  PaymentAccountV1,
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
  type PaymentAccountAction,
  paymentAccountDocumentType,
  type PaymentAccountPHState,
} from '@powerhousedao/op-hub/document-models/payment-account'
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
import type { ReactorClient } from '../client/reactor-client'
import { defineDocumentModel } from './define'
import { documentDrive } from './drive-model'

/**
 * Central registry of every document model the SDK knows about. Adding a
 * new doc type = one line here. Consumers reach for `documents.<name>` and
 * never write `PHDocumentController.forDocumentModel<S, A>` themselves.
 *
 * This is the achra-domain seam: the one place that names the app's concrete
 * document models (sourced from `@powerhousedao/op-hub`). The framework
 * `documentDrive` entry reuses the package's single instance (see
 * `drive-model.ts`) rather than re-binding the model — re-binding would mint a
 * duplicate controller class (see the warning in `define.ts`).
 *
 * Entries are *unbound*: the controller class is minted once here, but the
 * reactor-client-dependent factories (`create` / `load` / `getState`) are
 * produced per SDK instance via {@link bindDocuments}.
 */
export const documents = {
  builderProfile: defineDocumentModel<BuilderProfilePHState, BuilderProfileAction>(
    BuilderProfileV1,
    builderProfileDocumentType,
  ),
  documentDrive,
  paymentAccount: defineDocumentModel<PaymentAccountPHState, PaymentAccountAction>(
    PaymentAccountV1,
    paymentAccountDocumentType,
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

/**
 * Bind every registry entry to a reactor client, producing the
 * `create` / `load` / `getState` factories. Called once per SDK client
 * instance (in `createClient`); the underlying controller classes are NOT
 * re-minted (see `define.ts`). Returned `as const` so each entry keeps its
 * specific controller type (the typed action methods that `init` callbacks
 * dispatch), rather than widening to the base `BoundDefinition`.
 */
export function bindDocuments(reactorClient: ReactorClient) {
  return {
    builderProfile: documents.builderProfile.bind(reactorClient),
    documentDrive: documents.documentDrive.bind(reactorClient),
    paymentAccount: documents.paymentAccount.bind(reactorClient),
    resourceInstance: documents.resourceInstance.bind(reactorClient),
    resourceTemplate: documents.resourceTemplate.bind(reactorClient),
    subscriptionInstance: documents.subscriptionInstance.bind(reactorClient),
  } as const
}

/** The registry with every entry bound to one reactor client. */
export type BoundDocuments = ReturnType<typeof bindDocuments>
