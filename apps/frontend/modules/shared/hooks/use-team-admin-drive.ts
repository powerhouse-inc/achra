'use client'

import { useUserDrives } from '@/modules/shared/hooks/use-user-drives'

/**
 * Resolves the current user's team-admin drive — the single drive carrying a
 * builder profile.
 *
 * `useUserDrives` (`getBuilderDrives`) also returns operator/service-offering
 * and shared/preview drives, so the team-admin drive is matched explicitly by
 * `builderProfileId` rather than by list order or name. This is the canonical
 * answer to "does the user have a builder workspace, and which drive is it?" —
 * used for onboarding redirects, workspace links, the purchase flow, and as the
 * base of `useMyBuilderProfile`.
 */
function useTeamAdminDrive() {
  const drivesQuery = useUserDrives()
  const teamAdminDrive = drivesQuery.data?.find((drive) => Boolean(drive.builderProfileId))

  return {
    drivesQuery,
    teamAdminDrive,
    hasTeamAdminDrive: Boolean(teamAdminDrive),
    builderProfileId: teamAdminDrive?.builderProfileId ?? undefined,
  }
}

export { useTeamAdminDrive }
