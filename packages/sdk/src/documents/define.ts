import { RemoteDocumentController } from '@powerhousedao/reactor-browser'
import {
  type Action,
  type DocumentModelModule,
  type ISigner,
  type PHBaseState,
  PHDocumentController,
} from 'document-model'
import type { ReactorClient } from '../client/reactor-client'

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
 * Binds a document model to a controller class **once**, then exposes
 * `bind(reactorClient)` to mint the per-client factory functions
 * (`create` / `load` / `getState`).
 *
 * `PHDocumentController.forDocumentModel<S, A>(module)` MUST run in
 * consumer code rather than imported from the model's package — the type
 * instance of `document-model` differs across compile units and a
 * pre-built controller from the model package will silently reject our
 * locally-installed document-model's actions. This wrapper centralises
 * that incantation so it appears exactly once in the codebase.
 *
 * The controller class is minted here in the outer closure (once per module
 * evaluation, client-independent). `bind` may be called many times — once per
 * {@link import('../client/reactor-client').ReactorClientHandle} — and each
 * call closes over the SAME already-minted class with a different reactor
 * client. So multiple SDK client instances are safe: only the thin factory
 * functions multiply, never the controller class.
 */
export function defineDocumentModel<TState extends PHBaseState, TAction extends Action>(
  module: DocumentModelModule<TState>,
  documentType: string,
) {
  const ControllerClass = PHDocumentController.forDocumentModel<TState, TAction>(module)

  function bind(reactorClient: ReactorClient) {
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

    /**
     * A fresh LOCAL controller (no reactor client). Dispatching its action
     * methods applies the reducer synchronously and updates `.state`, with no
     * network. Used by the transaction's genesis-bake create: run the caller's
     * `init` on it, read the resulting `state.global`, and bake that into a
     * single `CreateDocument` (no `createEmptyDocument`, no follow-up mutate).
     */
    function createLocal() {
      return new ControllerClass()
    }

    return {
      documentType,
      module,
      create,
      load,
      getState,
      createLocal,
    } as const
  }

  return {
    documentType,
    module,
    bind,
  } as const
}

/** An unbound model definition (controller class minted, awaiting a reactor client). */
export type DocumentDefinition = ReturnType<typeof defineDocumentModel>
/** A model definition bound to a reactor client — exposes `create` / `load` / `getState`. */
export type BoundDefinition = ReturnType<DocumentDefinition['bind']>
