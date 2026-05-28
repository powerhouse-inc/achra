'use client'

import {
  type BuilderProfileQuery,
  useBuilderProfileQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { useUserDrives } from '@/modules/shared/hooks/use-user-drives'

type MyBuilderProfile = BuilderProfileQuery['builders'][number]

/**
 * Resolves the builder profile of the currently authenticated user.
 *
 * The user's builder profile lives in their builder drive, so we first resolve
 * the user's drive (matched server-side by the renown wallet address) and then
 * fetch the builder profile by its document id (`builderProfileId`), which the
 * drive lookup returns alongside the slug.
 *
 * We match by id rather than slug because `drive.slug` and `profile.slug` are
 * independent backend fields: renaming a profile re-slugs the profile but not
 * the drive, so a slug match silently breaks. The id is stable.
 */
function useMyBuilderProfile() {
  const drivesQuery = useUserDrives()
  const drive = drivesQuery.data?.[0]
  const driveSlug = drive?.driveSlug
  const builderProfileId = drive?.builderProfileId ?? undefined

  const profileQuery = useBuilderProfileQuery(
    { filter: { id: builderProfileId ?? '' } },
    {
      enabled: Boolean(builderProfileId),
      staleTime: 30_000,
      select: (data): MyBuilderProfile | null => data.builders[0] ?? null,
    },
  )

  return { drivesQuery, profileQuery, driveSlug, builderProfileId }
}

export { useMyBuilderProfile }
