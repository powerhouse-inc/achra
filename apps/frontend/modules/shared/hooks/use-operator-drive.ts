'use client'

import { isOperatorDriveName } from '@achra/sdk'
import { useUserDrives } from '@/modules/shared/hooks/use-user-drives'

/**
 * Resolves the current user's operator/service-offering drive — the drive whose
 * name carries the canonical "Service Offering" suffix.
 *
 * The presence of this drive is the SDK's own definition of "is an operator"
 * (`roles.operator.detect`), so `hasOperatorDrive` is the authoritative operator
 * signal — no separate `isOperator` profile read is needed. Reads the same
 * cached `useUserDrives` query as `useTeamAdminDrive`, so it adds no extra fetch.
 */
function useOperatorDrive() {
  const drivesQuery = useUserDrives()
  const operatorDrive = drivesQuery.data?.find((drive) => isOperatorDriveName(drive.driveName))

  return {
    drivesQuery,
    operatorDrive,
    hasOperatorDrive: Boolean(operatorDrive),
  }
}

export { useOperatorDrive }
