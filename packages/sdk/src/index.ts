export {
  createClient,
  type PowerhouseClient,
  type PowerhouseClientConfig,
} from './client/create-client'
export {
  type ReactorClient,
  type ReactorClientHandle,
  type ReactorClientHandleOptions,
  type TokenProvider,
} from './client/reactor-client'
export type { ClientContext } from './context'

export {
  type BoundDefinition,
  type CreateOptions,
  defineDocumentModel,
  type DocumentDefinition,
  type GlobalOf,
  type LoadOptions,
} from './documents/define'
export { documentDrive } from './documents/drive-model'
export {
  bindDocuments,
  type BoundDocuments,
  documents,
  type DocumentKey,
} from './documents/registry'
export {
  createDrive,
  type CreateDriveOptions,
  findDriveContainingDocument,
} from './documents/drives'
export {
  createSignedDocument,
  type CreateSignedDocumentArgs,
  type DocumentBlueprint,
} from './documents/create-document'
export {
  type AddDocumentArgs,
  createWorkspace,
  openWorkspace,
  type Workspace,
} from './documents/workspace'

export {
  type CreatedBuilderWorkspace,
  createBuilderWorkspace,
  createOperatorOfferingDrive,
  findOperatorDriveId,
  setBuilderProfileOperator,
  spinUpBuilderWorkspaces,
} from './workspaces/controllers'
export {
  type EnsureRolesResult,
  ensureRoles,
  hasRole,
  type RoleId,
  roles,
  type WorkspaceIdentity,
} from './workspaces/roles'
export {
  type ExistingBuilderDrive,
  purchaseService,
  type PurchaseServiceInput,
  type PurchaseServiceResult,
} from './workspaces/purchases'
export {
  BUILDER_DRIVE_EDITOR,
  deriveDriveNaming,
  type DriveNaming,
  type DriveNamingInput,
  isOperatorDriveName,
  OPERATOR_DRIVE_EDITOR,
  OPERATOR_DRIVE_ICON,
  OPERATOR_DRIVE_NAME,
  PRIMARY_DRIVE_ICON,
  PRIMARY_DRIVE_NAME,
  slugify,
} from './workspaces/drive-naming'

export { type BuilderDrive, listBuilderDrives, resolveTeamAdminDrive } from './reads/builder-drives'
export {
  type BuilderProfile,
  type BuilderProfileLink,
  type BuilderProfileOperationalHubMember,
  getBuilderProfile,
} from './reads/builder-profile'

export { SDKError, isSDKError, type SDKErrorCode } from './errors'
