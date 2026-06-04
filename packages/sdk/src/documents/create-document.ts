import { createSignedHeader } from '@powerhousedao/shared/document-model'
import type { DocumentModelModule, ISigner, PHBaseState } from 'document-model'
import { generateId } from 'document-model/core'
import type { ClientContext } from '../context'

/**
 * The minimal surface the genesis-bake create needs from a registry definition
 * (e.g. `ctx.documents.builderProfile`). A bound definition
 * (`ReturnType<defineDocumentModel(...).bind>`) satisfies it structurally, and
 * the generics keep the specific controller type — with its typed action
 * methods — flowing into `init`.
 */
export interface DocumentBlueprint<TState extends PHBaseState, TController> {
  readonly documentType: string
  readonly module: DocumentModelModule<TState>
  /** A fresh local (non-remote) controller for computing genesis state offline. */
  createLocal: () => TController
}

export interface CreateSignedDocumentArgs<TState extends PHBaseState, TController> {
  definition: DocumentBlueprint<TState, TController>
  /**
   * Dispatch the document's initial actions on a local controller. The
   * resulting `state.global` is baked into the genesis document — so the doc
   * is created with its full initial state (including any self-referential
   * `id`) in a SINGLE `CreateDocument`, with no follow-up mutate.
   */
  init: (controller: TController) => void
  signer: ISigner
  /** Pre-generated client UUID. Defaults to a fresh one. Returned by the call. */
  id?: string
  /** Optional `header.name` / `header.slug` for the document. */
  name?: string
  slug?: string
}

/**
 * Create a new document in ONE `CreateDocument` call, with its initial state
 * baked into genesis and a client-generated UUID known upfront.
 *
 * Generalizes what `createDrive` proved for drives to any registered model
 * (validated against the reactor): run `init` on a local controller to compute
 * the initial `global` state, rebuild a clean genesis document from that state
 * (state only — no operations), sign the header (session key → did:key),
 * restore the UUID (`createSignedHeader` overwrites `header.id` with the
 * signature), then `CreateDocument`.
 *
 * The document carries no wallet-attributed operation — it is referenced from a
 * wallet-attributed drive (the drive-tree push) and read by id + state, so
 * genesis-only attribution is sufficient. Replaces the old `createEmptyDocument`
 * (server id) + mutate + `initWithId` second push.
 */
export async function createSignedDocument<
  TState extends PHBaseState,
  TController extends { state: { global: unknown } },
>(ctx: ClientContext, args: CreateSignedDocumentArgs<TState, TController>): Promise<string> {
  const id = args.id ?? generateId()

  const local = args.definition.createLocal()
  args.init(local)
  const global = local.state.global

  // `createDocument`'s param is the model's typed `Partial<TState>`; the
  // controller's `global` is `unknown` through the generic, so widen the
  // method's parameter for the call (return type is preserved).
  type GenesisFactory = (state?: {
    global?: unknown
    local?: unknown
  }) => ReturnType<DocumentModelModule<TState>['utils']['createDocument']>
  const createGenesis = args.definition.module.utils.createDocument as GenesisFactory
  const doc = createGenesis({ global })
  doc.header.id = id
  if (args.name) doc.header.name = args.name
  if (args.slug) doc.header.slug = args.slug

  const signed = await createSignedHeader(doc.header, args.definition.documentType, args.signer)
  doc.header = { ...signed, id }

  await ctx.reactorClient.CreateDocument({
    document: doc as unknown as Record<string, unknown>,
  })
  return id
}
