import {
  type DocumentDriveAction,
  type DocumentDrivePHState,
  driveDocumentModelModule,
  driveDocumentType,
} from '@powerhousedao/shared/document-drive'
import { defineDocumentModel } from './define'

/**
 * The DocumentDrive model, bound once here in the core. The drive model is part
 * of the framework (`@powerhousedao/shared`), not the host app's domain, so it
 * lives in the package — `workspace.ts` loads drives through it instead of
 * reaching into an app-level document registry. Exported so the host app can
 * reuse this single instance under its own `documents.documentDrive` key rather
 * than calling `forDocumentModel` a second time (which would mint a duplicate
 * controller class — see the warning in `define.ts`).
 */
export const documentDrive = defineDocumentModel<DocumentDrivePHState, DocumentDriveAction>(
  driveDocumentModelModule,
  driveDocumentType,
)
