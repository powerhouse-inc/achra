import {
  type DocumentDriveDocument,
  driveCreateDocument,
  driveDocumentType,
} from '@powerhousedao/shared/document-drive'
import { createSignedHeader } from '@powerhousedao/shared/document-model'
import { reactorClient } from '@/modules/sdk/client/reactor-client'
import type { ISigner } from 'document-model'

export interface CreateDriveOptions {
  name: string
  slug: string
  /** Drive icon URL stored on the global state. */
  icon?: string
  /** `header.meta.preferredEditor` the drive opens with in Connect. */
  preferredEditor?: string
  /**
   * Signer whose session key (ECDSA-P256) signs the drive's genesis header.
   * Required — every drive must carry a verifiable creation proof.
   */
  signer: ISigner
}

/**
 * Create and persist a new DocumentDrive.
 *
 * Centralises the drive-document construction and the single
 * `as unknown as Record<string, unknown>` cast that `CreateDocument`
 * requires — consumers pass typed options instead of hand-building the
 * document and reaching for the raw `reactorClient`.
 *
 * `driveCreateDocument` produces a *presigned* (unsigned) header with a normal
 * `generateId()` UUID. `createSignedHeader` signs
 * `${documentType}:${createdAtUtcIso}:${nonce}` and stamps `sig.publicKey` +
 * `sig.nonce` — but it also overwrites `header.id` with the base64 signature
 * (its content-addressed design). Per the validated reference
 * (`op-hub/scripts/renown-signing`), we **restore the UUID** so drives keep
 * short, ecosystem-consistent ids; the `sig` block is kept, so the reactor
 * still records the creator's *session key* (→ did:key) on the genesis
 * `CREATE_DOCUMENT` op.
 *
 * Note the header sig records the session public key, not the wallet address.
 * Wallet attribution (→ did:pkh) rides on the signed operations pushed onto the
 * drive afterward (`context.signer.user.address`); that is what a wallet→drive
 * reverse-lookup actually reads.
 */
export async function createDrive(opts: CreateDriveOptions): Promise<{ driveId: string }> {
  const doc: DocumentDriveDocument = driveCreateDocument({
    global: { name: opts.name, icon: opts.icon ?? null, nodes: [] },
  })
  // Set header fields BEFORE signing: createSignedHeader copies name/slug/meta
  // from the unsigned header into the signed one, so order matters.
  doc.header.name = opts.name
  doc.header.slug = opts.slug
  if (opts.preferredEditor) {
    doc.header.meta ??= {}
    doc.header.meta.preferredEditor = opts.preferredEditor
  }

  const driveUuid = doc.header.id
  const signedHeader = await createSignedHeader(doc.header, driveDocumentType, opts.signer)
  doc.header = { ...signedHeader, id: driveUuid }

  const res = await reactorClient.CreateDocument({
    document: doc as unknown as Record<string, unknown>,
  })
  return { driveId: res.createDocument.id }
}

/**
 * Find the drive that holds `documentId` as a file-tree child.
 *
 * A drive carries a `child` relationship to every document registered in its
 * file tree, so a document's *incoming* `child` relationships are exactly the
 * drives that contain it. This is an O(1), pagination-proof index lookup —
 * preferred over scanning every drive's outgoing children. Returns the first
 * matching drive's id, or null if none holds the document.
 */
export async function findDriveContainingDocument(documentId: string): Promise<string | null> {
  const res = await reactorClient.GetDocumentIncomingRelationships({
    targetIdentifier: documentId,
    relationshipType: 'child',
  })
  const drive = res.documentIncomingRelationships.items.find(
    (item) => item.documentType === driveDocumentType,
  )
  return drive?.id ?? null
}
