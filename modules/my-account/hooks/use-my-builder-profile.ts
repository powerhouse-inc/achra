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
 * fetch the builder profile whose `slug` matches the drive `slug`.
 *
 * TODO: `drive.slug === profile.slug` is an onboarding convention, not a schema
 * guarantee — the two are independent fields on the backend. If a user with a
 * drive ever resolves no profile, switch to matching `BuilderProfile.documents`
 * by `walletAddress` and joining the enriched `builders` query by document id.
 */
function useMyBuilderProfile() {
  const drivesQuery = useUserDrives()
  const driveSlug = drivesQuery.data?.[0]?.driveSlug

  const profileQuery = useBuilderProfileQuery(
    { filter: { slug: driveSlug ?? '' } },
    {
      enabled: Boolean(driveSlug),
      staleTime: 30_000,
      select: (data): MyBuilderProfile | null => data.builders[0] ?? null,
    },
  )

  return { drivesQuery, profileQuery, driveSlug }
}

export { useMyBuilderProfile }
