import {
  type DocumentDriveDocument,
  driveCreateDocument,
} from '@powerhousedao/shared/document-drive'
import { reactorClient } from '@/modules/sdk/client/reactor-client'

export interface CreateDriveOptions {
  name: string
  slug: string
  /** Drive icon URL stored on the global state. */
  icon?: string
  /** `header.meta.preferredEditor` the drive opens with in Connect. */
  preferredEditor?: string
}

/**
 * Create and persist a new DocumentDrive.
 *
 * Centralises the drive-document construction and the single
 * `as unknown as Record<string, unknown>` cast that `CreateDocument`
 * requires — consumers pass typed options instead of hand-building the
 * document and reaching for the raw `reactorClient`.
 *
 * Drive creation is intentionally unsigned (`CreateDocument` takes no
 * signer); the documents placed *inside* the drive are signed via their
 * controllers. This preserves the existing server contract.
 */
export async function createDrive(opts: CreateDriveOptions): Promise<{ driveId: string }> {
  const doc: DocumentDriveDocument = driveCreateDocument({
    global: { name: opts.name, icon: opts.icon ?? null, nodes: [] },
  })
  doc.header.name = opts.name
  doc.header.slug = opts.slug
  if (opts.preferredEditor) {
    doc.header.meta ??= {}
    doc.header.meta.preferredEditor = opts.preferredEditor
  }

  const res = await reactorClient.CreateDocument({
    document: doc as unknown as Record<string, unknown>,
  })
  return { driveId: res.createDocument.id }
}
