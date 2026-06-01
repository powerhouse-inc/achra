import { generateId } from 'document-model/core'
import { reactorClient } from '@/modules/sdk/client/reactor-client'
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
  /**
   * Optional follow-up dispatched after the document exists and its id has
   * been assigned. The reactor assigns the id at push time, so it is unknown
   * during `init`; this runs on the same controller once the id is known and
   * is pushed as a second signed batch. Use to set state that must reference
   * the document's own id (e.g. a self-referential `id` field).
   */
  initWithId?: (controller: TController, id: string) => void
  /** Name of the file node registered in the drive tree. */
  fileName: string
  /** Optional folder node id to nest the file under. */
  parentFolder?: string
}

/**
 * A handle to a drive plus the orchestration mechanics for populating its
 * file tree: create a child document, push it, and register it as a node.
 *
 * Drive-tree mutations (`ensureFolder`, `addDocument`, `registerDocument`)
 * are accumulated and flushed as one signed batch on `commit()`, which
 * re-pulls first so it reconciles with the file nodes the reactor
 * auto-registers for freshly created child documents (per the Powerhouse
 * local-first model). Child documents are each pushed as their own signed
 * batch inside `addDocument`.
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
   * link a document that lives elsewhere, e.g. surfacing a shared profile or
   * a buyer's purchase into the operator's drive. Also wires the drive→doc
   * `child` relationship so drive-sync surfaces the referenced document.
   */
  registerDocument(args: {
    documentType: string
    id: string
    name: string
    parentFolder?: string
  }): Promise<void>
  /**
   * Push one harmless signed operation (re-setting the drive's own name) to
   * stamp the signer's wallet on the drive. A freshly created drive carries
   * only the genesis header sig (the session key → did:key), not a
   * wallet-signed operation; the backend attributes drive ownership to the
   * wallet that signed an *operation*, so a drive with no signed ops is
   * invisible to a wallet→drive reverse lookup. Drives that get a child
   * document via {@link addDocument} are attributed for free by that push;
   * call this only for an otherwise-empty drive that needs attribution.
   */
  touch(): Promise<void>
  /** Push the accumulated drive-tree changes as one signed batch. No-op if nothing was queued. */
  commit(): Promise<void>
}

interface PendingFolder {
  id: string
  name: string
}

interface PendingFile {
  id: string
  name: string
  documentType: string
  parentFolder?: string
}

function makeWorkspace(driveId: string, signer: ISigner): Workspace {
  let drivePromise: Promise<DriveController> | null = null

  // Drive-tree node edits are accumulated here and flushed as one signed
  // batch in commit(). They are NOT dispatched eagerly, because creating a
  // child document with `parentIdentifier=driveId` (see addDocument) makes the
  // reactor auto-register a UUID-named file node at the drive ROOT. A plain
  // `addFile` for that same id then collides ("node already exists") and is
  // dropped on the commit rebase, stranding the document at the root under its
  // UUID. commit() instead re-pulls so it sees the auto-registered nodes, then
  // branches on presence: an already-present node (auto-registered, or a
  // pre-existing one) is renamed in place + moved into its folder; an absent
  // one (a cross-drive reference added via registerDocument) is added.
  const pendingFolders: PendingFolder[] = []
  const pendingFiles: PendingFile[] = []

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

    const queued = pendingFolders.find((folder) => folder.name === name)
    if (queued) return queued.id

    const id = generateId()
    pendingFolders.push({ id, name })
    return id
  }

  async function addDocument<TController extends PushableController>(
    args: AddDocumentArgs<TController>,
  ): Promise<string> {
    const controller = args.definition.create({ parentIdentifier: driveId, signer })
    args.init(controller)
    const pushed = await controller.push()
    const id = pushed.remoteDocument.id

    if (args.initWithId) {
      args.initWithId(controller, id)
      await controller.push()
    }

    // The child push above auto-registered a root node for `id`. Defer its
    // rename + folder placement to commit() (see the pending-edits note).
    pendingFiles.push({
      id,
      name: args.fileName,
      documentType: args.definition.documentType,
      parentFolder: args.parentFolder,
    })
    return id
  }

  async function registerDocument(args: {
    documentType: string
    id: string
    name: string
    parentFolder?: string
  }): Promise<void> {
    // Wire the reactor relationship index so drive-sync pulls this
    // (foreign-created) document into the drive's view. `addFile` alone only
    // updates the drive's `nodes` array; without the explicit drive→doc
    // `child` relationship the document renders as an orphan and never
    // appears. Documents created *in* this drive via `addDocument` get this
    // relationship for free at creation time, so only references need it.
    await reactorClient.AddRelationship({
      sourceIdentifier: driveId,
      targetIdentifier: args.id,
      relationshipType: 'child',
    })
    pendingFiles.push({ ...args })
  }

  async function touch(): Promise<void> {
    const controller = await drive()
    controller.setDriveName({ name: controller.state.global.name })
    await controller.push()
  }

  async function commit(): Promise<void> {
    if (pendingFolders.length === 0 && pendingFiles.length === 0) return

    // Re-pull: the cached controller predates the child pushes in addDocument,
    // so it doesn't yet see the nodes the reactor auto-registered for them.
    drivePromise = documents.documentDrive.load({ documentId: driveId, signer })
    const controller = await drive()
    const present = new Set(controller.state.global.nodes.map((node) => node.id))

    for (const folder of pendingFolders) {
      if (!present.has(folder.id)) {
        controller.addFolder({ id: folder.id, name: folder.name })
      }
    }

    for (const file of pendingFiles) {
      if (present.has(file.id)) {
        // Auto-registered (UUID-named) or pre-existing node: rename in place,
        // then move it into the target folder. `moveNode.srcFolder` is the
        // node being moved (the field name is a misnomer; it moves files too).
        controller.updateFile({ id: file.id, name: file.name })
        if (file.parentFolder) {
          controller.moveNode({ srcFolder: file.id, targetParentFolder: file.parentFolder })
        }
      } else {
        // A reference to a document that lives in another drive — no node for
        // it exists here yet, so add one directly.
        controller.addFile({
          documentType: file.documentType,
          id: file.id,
          name: file.name,
          parentFolder: file.parentFolder,
        })
      }
    }

    await controller.push()
    pendingFolders.length = 0
    pendingFiles.length = 0
  }

  return { driveId, ensureFolder, addDocument, registerDocument, touch, commit }
}

/** Create a new drive and return a {@link Workspace} bound to it. */
export async function createWorkspace(opts: CreateDriveOptions): Promise<Workspace> {
  const { driveId } = await createDrive(opts)
  return makeWorkspace(driveId, opts.signer)
}

/** Bind a {@link Workspace} to an already-existing drive. */
export function openWorkspace(opts: { driveId: string; signer: ISigner }): Workspace {
  return makeWorkspace(opts.driveId, opts.signer)
}
