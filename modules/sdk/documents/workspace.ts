import { generateId } from 'document-model/core'
import type { CreateOptions } from '@/modules/sdk/documents/define'
import { createDrive, type CreateDriveOptions } from '@/modules/sdk/documents/drives'
import { documents } from '@/modules/sdk/documents/registry'
import type { ISigner } from 'document-model'

type DriveController = Awaited<ReturnType<typeof documents.documentDrive.load>>

/** The minimal push contract a child controller must satisfy. */
interface PushableController {
  push: () => Promise<{ remoteDocument: { id: string } }>
}

/**
 * Structural view of a registry definition (e.g. `documents.builderProfile`):
 * a document type plus a controller factory. Kept structural rather than
 * `DocumentDefinition` so the specialized controller type — with its action
 * methods — flows through to `init` instead of widening to the base.
 */
interface DocumentFactory<TController> {
  documentType: string
  create: (opts: CreateOptions) => TController
}

export interface AddDocumentArgs<TController> {
  /** A registry definition, e.g. `documents.builderProfile`. */
  definition: DocumentFactory<TController>
  /**
   * Dispatch the document's initial actions synchronously on the freshly
   * created controller. The controller is pushed (signed) right after this
   * returns.
   */
  init: (controller: TController) => void
  /** Name of the file node registered in the drive tree. */
  fileName: string
  /** Optional folder node id to nest the file under. */
  parentFolder?: string
}

/**
 * A handle to a drive plus the orchestration mechanics for populating its
 * file tree: create a child document, push it, and register it as a node.
 *
 * Drive-tree mutations (`ensureFolder`, the `addFile` inside `addDocument`)
 * are dispatched locally on a single cached drive controller and only hit
 * the network on `commit()` — one signed batch for the whole tree, per the
 * Powerhouse local-first model. Child documents are each pushed as their
 * own signed batch inside `addDocument`.
 *
 * Domain specifics (which model, which actions, naming) are supplied by the
 * caller, so this abstraction stays free of any app concept.
 */
export interface Workspace {
  readonly driveId: string
  /** Find a folder node by name, creating it (locally) if absent. Returns its id. */
  ensureFolder(name: string): Promise<string>
  /** Create + sign-push a child document and register it in the drive tree. Returns its id. */
  addDocument<TController extends PushableController>(
    args: AddDocumentArgs<TController>,
  ): Promise<string>
  /**
   * Register an already-persisted document as a file node in this drive
   * (a reference — the document itself is not created or moved). Use this to
   * link a document that lives elsewhere, e.g. surfacing a shared profile.
   */
  registerDocument(args: {
    documentType: string
    id: string
    name: string
    parentFolder?: string
  }): Promise<void>
  /** Push the accumulated drive-tree changes as one signed batch. No-op if nothing was queued. */
  commit(): Promise<void>
}

function makeWorkspace(driveId: string, signer: ISigner): Workspace {
  let drivePromise: Promise<DriveController> | null = null
  let dirty = false

  async function drive(): Promise<DriveController> {
    drivePromise ??= documents.documentDrive.load({ documentId: driveId, signer })
    return drivePromise
  }

  async function ensureFolder(name: string): Promise<string> {
    const controller = await drive()
    const existing = controller.state.global.nodes.find(
      (node) => node.kind === 'folder' && node.name === name,
    )
    if (existing) return existing.id

    const id = generateId()
    controller.addFolder({ id, name })
    dirty = true
    return id
  }

  async function addDocument<TController extends PushableController>(
    args: AddDocumentArgs<TController>,
  ): Promise<string> {
    const controller = args.definition.create({ parentIdentifier: driveId, signer })
    args.init(controller)
    const pushed = await controller.push()
    const id = pushed.remoteDocument.id

    const driveController = await drive()
    driveController.addFile({
      documentType: args.definition.documentType,
      id,
      name: args.fileName,
      parentFolder: args.parentFolder,
    })
    dirty = true
    return id
  }

  async function registerDocument(args: {
    documentType: string
    id: string
    name: string
    parentFolder?: string
  }): Promise<void> {
    const driveController = await drive()
    driveController.addFile({
      documentType: args.documentType,
      id: args.id,
      name: args.name,
      parentFolder: args.parentFolder,
    })
    dirty = true
  }

  async function commit(): Promise<void> {
    if (!dirty) return
    const controller = await drive()
    await controller.push()
    dirty = false
  }

  return { driveId, ensureFolder, addDocument, registerDocument, commit }
}

/** Create a new drive and return a {@link Workspace} bound to it. */
export async function createWorkspace(
  opts: CreateDriveOptions & { signer: ISigner },
): Promise<Workspace> {
  const { driveId } = await createDrive(opts)
  return makeWorkspace(driveId, opts.signer)
}

/** Bind a {@link Workspace} to an already-existing drive. */
export function openWorkspace(opts: { driveId: string; signer: ISigner }): Workspace {
  return makeWorkspace(opts.driveId, opts.signer)
}
