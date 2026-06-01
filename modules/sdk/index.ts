export { useAuth, useIsAuthenticated, type AuthState } from '@/modules/sdk/auth/use-auth'
export { PowerhouseSDKProvider, type PowerhouseSDKProviderProps } from '@/modules/sdk/auth/provider'

export { reactorClient, type ReactorClient } from '@/modules/sdk/client/reactor-client'

export { defineDocumentModel, type DocumentDefinition } from '@/modules/sdk/documents/define'
export { documents, type DocumentKey } from '@/modules/sdk/documents/registry'
export { createDrive, type CreateDriveOptions } from '@/modules/sdk/documents/drives'
export {
  type AddDocumentArgs,
  createWorkspace,
  openWorkspace,
  type Workspace,
} from '@/modules/sdk/documents/workspace'

export {
  type CreatedBuilderWorkspace,
  createBuilderWorkspace,
  createOperatorOfferingDrive,
  findOperatorDriveId,
} from '@/modules/sdk/workspaces/controllers'
export {
  BUILDER_DRIVE_EDITOR,
  deriveDriveNaming,
  type DriveNaming,
  type DriveNamingInput,
  driveNamePrefix,
  isOperatorDriveName,
  OPERATOR_DRIVE_EDITOR,
  OPERATOR_DRIVE_ICON,
  OPERATOR_DRIVE_NAME,
  PRIMARY_DRIVE_ICON,
  PRIMARY_DRIVE_NAME,
  slugify,
} from '@/modules/sdk/workspaces/drive-naming'

export {
  useSignedMutation,
  type SignedContext,
  type UseSignedMutationOptions,
} from '@/modules/sdk/mutations/use-signed-mutation'

export { SDKError, isSDKError, type SDKErrorCode } from '@/modules/sdk/errors'
