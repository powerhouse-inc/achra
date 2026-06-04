'use client'

import { useClient } from '@achra/sdk/react'
import { useQuery } from '@tanstack/react-query'
import { useTeamAdminDrive } from '@/modules/shared/hooks/use-team-admin-drive'
import type { BuilderProfile } from '@achra/sdk'

/** The current user's builder profile shape (owned by the SDK). */
type MyBuilderProfile = BuilderProfile

/**
 * Resolves the currently authenticated user's team-admin drive AND the builder
 * profile that lives inside it.
 *
 * The drive lookup (matched by `builderProfileId`, see `useTeamAdminDrive`) also
 * returns the profile's document id, so we fetch the profile by that id rather
 * than by slug: `drive.slug` and `profile.slug` are independent backend fields,
 * so renaming a profile re-slugs the profile but not the drive and a slug match
 * silently breaks. The id is stable.
 *
 * Thin React Query wrapper: the SDK (`client.profile.get`) owns the query; this
 * hook owns caching and composition with the drive lookup.
 */
function useMyBuilderProfile() {
  const client = useClient()
  const { drivesQuery, teamAdminDrive, hasTeamAdminDrive, builderProfileId } = useTeamAdminDrive()

  const profileQuery = useQuery({
    queryKey: ['BuilderProfile', builderProfileId ?? ''],
    queryFn: async () => client.profile.get(builderProfileId ?? ''),
    enabled: Boolean(builderProfileId),
    staleTime: 30_000,
  })

  return {
    drivesQuery,
    profileQuery,
    teamAdminDrive,
    hasTeamAdminDrive,
    driveName: teamAdminDrive?.driveName,
    driveSlug: teamAdminDrive?.driveSlug,
    builderProfileId,
  }
}

export { useMyBuilderProfile }
export type { MyBuilderProfile }
