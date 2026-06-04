import { generateId } from 'document-model/core'
import type { ISigner, PHBaseState } from 'document-model'
import type { ClientContext } from '../context'
import { createSignedDocument, type DocumentBlueprint } from './create-document'
import { createDrive, type CreateDriveOptions } from './drives'

type DriveController = Awaited<ReturnType<ClientContext['documents']['documentDrive']['load']>>

export interface AddDocumentArgs<TState extends PHBaseState, TController> {
  /** A registry definition, e.g. `ctx.documents.builderProfile`. */
  definition: DocumentBlueprint<TState, TController>
  /**
   * Dispatch the document's initial actions on a local controller. The
   * resulting state is baked into the document's genesis (a single
   * `CreateDocument`) — no follow-up signed mutate.
   */
  init: (controller: TController) => void
  /**
   * Optional follow-up dispatched with the document's id, which is known
   * up-front (client-generated) rather than assigned by the reactor. Runs on
   * the SAME local controller right after `init`, so state that must reference
   * the document's own id (e.g. a self-referential `id`) is baked into the
   * same genesis — the old second `initWithId` push is gone.
   */
  initWithId?: (controller: TController, id: string) => void
  /** Name of the file node registered in the drive tree. */
  fileName: string
  /** Optional folder node id to nest the file under. */
  parentFolder?: string
}

/**
 * A handle to a drive plus the orchestration mechanics for populating its
 * file tree. It is a deferred unit-of-work: `ensureFolder`, `addDocument`, and
 * `registerDocument` only STAGE work (and return synchronously-known,
 * client-generated ids); nothing hits the network until `commit()`.
 *
 * `commit()` then flushes with the minimum, parallelized round-trips
 * (validated against the reactor):
 *   1. create every staged document in parallel — each a single genesis-baked
 *      `CreateDocument` with a client-generated id (no `createEmptyDocument`,
 *      no second `initWithId` push);
 *   2. build the whole drive tree (folders + files, all ids known) in ONE
 *      signed drive push — no re-pull, because nothing was auto-registered;
 *   3. wire the drive→doc `child` relationship for every file in parallel, so
 *      drive-sync surfaces each document.
 *
 * Domain specifics (which model, which actions, naming) are supplied by the
 * caller, so this abstraction stays free of any app concept.
 */
export interface Workspace {
  readonly driveId: string
  /** Find a folder node by name, creating it (locally) if absent. Returns its id. */
  ensureFolder(name: string): Promise<string>
  /** Stage a new child document (created on `commit`). Returns its id immediately. */
  addDocument<TState extends PHBaseState, TController extends { state: { global: unknown } }>(
    args: AddDocumentArgs<TState, TController>,
  ): Promise<string>
  /**
   * Stage an already-persisted document (created elsewhere) as a file node in
   * this drive — a reference. The document itself is not created or moved; on
   * `commit` the file node is added and the drive→doc `child` relationship is
   * wired so the referenced document surfaces under this drive.
   */
  registerDocument(args: {
    documentType: string
    id: string
    name: string
    parentFolder?: string
  }): Promise<void>
  /**
   * Stamp the signer's wallet on an otherwise-empty drive (re-sets the drive
   * name). A freshly created drive carries only the genesis header sig (the
   * session key → did:key), not a wallet-signed operation; the backend
   * attributes drive ownership to the wallet that signed an *operation*, so a
   * drive with no signed ops is invisible to a wallet→drive reverse lookup.
   * Drives that get a file node via {@link addDocument}/{@link registerDocument}
   * are attributed for free by that drive push; call this only for a drive that
   * would otherwise commit with no folders or files.
   */
  touch(): void
  /** Flush all staged work (creates, drive tree, relationships). No-op if nothing was staged. */
  commit(): Promise<void>
}

interface StagedDoc {
  id: string
  // deferred genesis-bake create, captured with its definition + init
  create: () => Promise<unknown>
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

/** A drive create deferred until `commit`, so it can run in parallel with doc creates. */
interface PendingDriveCreate {
  opts: CreateDriveOptions
}

function makeWorkspace(
  ctx: ClientContext,
  driveId: string,
  signer: ISigner,
  pendingDriveCreate: PendingDriveCreate | null,
): Workspace {
  let drivePromise: Promise<DriveController> | null = null
  let driveCreated = pendingDriveCreate === null

  const stagedDocs: StagedDoc[] = []
  const pendingFolders: PendingFolder[] = []
  const pendingFiles: PendingFile[] = []
  let pendingTouch = false

  async function drive(): Promise<DriveController> {
    drivePromise ??= ctx.documents.documentDrive.load({ documentId: driveId, signer })
    return drivePromise
  }

  async function ensureFolder(name: string): Promise<string> {
    // Only an existing drive can already hold folders; a not-yet-created drive
    // is empty, so skip the (network) load entirely.
    if (driveCreated) {
      const controller = await drive()
      const existing = controller.state.global.nodes.find(
        (node) => node.kind === 'folder' && node.name === name,
      )
      if (existing) return existing.id
    }

    const queued = pendingFolders.find((folder) => folder.name === name)
    if (queued) return queued.id

    const id = generateId()
    pendingFolders.push({ id, name })
    return id
  }

  async function addDocument<
    TState extends PHBaseState,
    TController extends { state: { global: unknown } },
  >(args: AddDocumentArgs<TState, TController>): Promise<string> {
    const id = generateId()
    stagedDocs.push({
      id,
      create: () =>
        createSignedDocument(ctx, {
          definition: args.definition,
          id,
          signer,
          name: args.fileName,
          init: (controller) => {
            args.init(controller)
            args.initWithId?.(controller, id)
          },
        }),
    })
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
    pendingFiles.push({ ...args })
  }

  function touch(): void {
    pendingTouch = true
  }

  async function commit(): Promise<void> {
    const needsDriveCreate = !driveCreated
    if (
      !needsDriveCreate &&
      stagedDocs.length === 0 &&
      pendingFolders.length === 0 &&
      pendingFiles.length === 0 &&
      !pendingTouch
    ) {
      return
    }

    // 1. Create the drive (if deferred) and every staged document in parallel.
    //    Each is a single genesis-baked `CreateDocument` with a client id — no
    //    `createEmptyDocument`, no second push. Independent, so fan them out.
    await Promise.all([
      ...(needsDriveCreate && pendingDriveCreate
        ? [createDrive(ctx, pendingDriveCreate.opts)]
        : []),
      ...stagedDocs.map((doc) => doc.create()),
    ])
    driveCreated = true

    const hasTreeEdits = pendingFolders.length > 0 || pendingFiles.length > 0
    if (hasTreeEdits || pendingTouch) {
      // 2. Build the whole drive tree in one signed push. No re-pull: the
      //    documents were created standalone (no `parentIdentifier`), so the
      //    reactor auto-registered nothing and the loaded controller is current.
      const controller = await drive()
      const present = new Set(controller.state.global.nodes.map((node) => node.id))

      for (const folder of pendingFolders) {
        if (!present.has(folder.id)) {
          controller.addFolder({ id: folder.id, name: folder.name })
        }
      }

      for (const file of pendingFiles) {
        if (present.has(file.id)) {
          // Pre-existing node (re-run / existing drive): rename + move in place.
          controller.updateFile({ id: file.id, name: file.name })
          if (file.parentFolder) {
            controller.moveNode({ srcFolder: file.id, targetParentFolder: file.parentFolder })
          }
        } else {
          controller.addFile({
            documentType: file.documentType,
            id: file.id,
            name: file.name,
            parentFolder: file.parentFolder,
          })
        }
      }

      if (!hasTreeEdits && pendingTouch) {
        // Empty drive needing attribution: one harmless wallet-signed op.
        controller.setDriveName({ name: controller.state.global.name })
      }

      await controller.push()
    }

    // 3. Wire the drive→doc `child` relationship for every file. Documents are
    //    created standalone, so `addFile` alone leaves them orphaned in the
    //    drive's view; the relationship is what drive-sync follows to surface
    //    them (confirmed: childIds populates only after AddRelationship).
    await Promise.all(
      pendingFiles.map((file) =>
        ctx.reactorClient.AddRelationship({
          sourceIdentifier: driveId,
          targetIdentifier: file.id,
          relationshipType: 'child',
        }),
      ),
    )

    stagedDocs.length = 0
    pendingFolders.length = 0
    pendingFiles.length = 0
    pendingTouch = false
  }

  return { driveId, ensureFolder, addDocument, registerDocument, touch, commit }
}

/**
 * Create a new drive and return a {@link Workspace} bound to it. The drive id is
 * generated client-side, so the workspace is usable immediately; the drive
 * document itself is created on `commit` (in parallel with any staged docs).
 */
export function createWorkspace(ctx: ClientContext, opts: CreateDriveOptions): Workspace {
  const driveId = opts.id ?? generateId()
  return makeWorkspace(ctx, driveId, opts.signer, { opts: { ...opts, id: driveId } })
}

/** Bind a {@link Workspace} to an already-existing drive. */
export function openWorkspace(
  ctx: ClientContext,
  opts: { driveId: string; signer: ISigner },
): Workspace {
  return makeWorkspace(ctx, opts.driveId, opts.signer, null)
}
