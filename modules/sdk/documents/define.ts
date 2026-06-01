import { RemoteDocumentController } from '@powerhousedao/reactor-browser'
import {
  type Action,
  type DocumentModelModule,
  type ISigner,
  type PHBaseState,
  PHDocumentController,
} from 'document-model'
import { reactorClient } from '@/modules/sdk/client/reactor-client'

/** Extract a document model's `global` state type from its full PH state. */
export type GlobalOf<TState> = TState extends { global: infer G } ? G : never

export interface CreateOptions {
  parentIdentifier: string
  signer: ISigner
}

export interface LoadOptions {
  documentId: string
  signer: ISigner
}

/**
 * Binds a document model to a typed pair of factory functions that produce
 * signed `RemoteDocumentController` instances.
 *
 * `PHDocumentController.forDocumentModel<S, A>(module)` MUST run in
 * consumer code rather than imported from the model's package — the type
 * instance of `document-model` differs across compile units and a
 * pre-built controller from the model package will silently reject our
 * locally-installed document-model's actions. This wrapper centralises
 * that incantation so it appears exactly once in the codebase.
 */
export function defineDocumentModel<TState extends PHBaseState, TAction extends Action>(
  module: DocumentModelModule<TState>,
  documentType: string,
) {
  const ControllerClass = PHDocumentController.forDocumentModel<TState, TAction>(module)

  function create(opts: CreateOptions) {
    const inner = new ControllerClass()
    return RemoteDocumentController.from(inner, {
      client: reactorClient,
      mode: 'batch',
      parentIdentifier: opts.parentIdentifier,
      signer: opts.signer,
    })
  }

  async function load(opts: LoadOptions) {
    return RemoteDocumentController.pull(ControllerClass, {
      client: reactorClient,
      documentId: opts.documentId,
      mode: 'batch',
      signer: opts.signer,
      onConflict: 'rebase',
    })
  }

  /**
   * Read a document's current global state by id, typed to this model.
   * Returns `null` when the document doesn't exist. Read-only — no signer
   * required — so it works for reference models (e.g. resource templates)
   * that are never mutated from this app.
   */
  async function getState(documentId: string): Promise<GlobalOf<TState> | null> {
    const res = await reactorClient.GetDocument({ identifier: documentId })
    const state = res.document?.document.state as { global?: GlobalOf<TState> } | undefined
    return state?.global ?? null
  }

  return {
    documentType,
    module,
    create,
    load,
    getState,
  } as const
}

export type DocumentDefinition = ReturnType<typeof defineDocumentModel>
