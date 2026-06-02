'use client'

import {
  type BuilderProfileQuery,
  useBuilderProfileQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { useTeamAdminDrive } from '@/modules/shared/hooks/use-team-admin-drive'

type MyBuilderProfile = BuilderProfileQuery['builders'][number]

/**
 * Resolves the currently authenticated user's team-admin drive AND the builder
 * profile that lives inside it, in one call.
 *
 * The drive lookup (matched by `builderProfileId`, see `useTeamAdminDrive`) also
 * returns the profile's document id, so we fetch the profile by that id rather
 * than by slug: `drive.slug` and `profile.slug` are independent backend fields,
 * so renaming a profile re-slugs the profile but not the drive and a slug match
 * silently breaks. The id is stable.
 */
function useMyBuilderProfile() {
  const { drivesQuery, teamAdminDrive, hasTeamAdminDrive, builderProfileId } = useTeamAdminDrive()

  const profileQuery = useBuilderProfileQuery(
    { filter: { id: builderProfileId ?? '' } },
    {
      enabled: Boolean(builderProfileId),
      staleTime: 30_000,
      select: (data): MyBuilderProfile | null => data.builders[0] ?? null,
    },
  )

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
