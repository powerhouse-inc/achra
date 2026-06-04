import type { ClientContext } from '../context'
import { isOperatorDriveName } from '../workspaces/drive-naming'

/** A drive owned by a wallet, as surfaced by the `getBuilderDrives` subgraph. */
export interface BuilderDrive {
  driveId: string
  driveLink: string
  driveName: string
  driveSlug: string
  /** The builder-profile document id if this is a team-admin drive; null otherwise. */
  builderProfileId: string | null
}

const GET_BUILDER_DRIVES = /* GraphQL */ `
  query GetBuilderDrives($filter: GetBuilderDrivesFilter!) {
    getBuilderDrives(filter: $filter) {
      driveId
      driveLink
      driveName
      driveSlug
      builderProfileId
    }
  }
`

/**
 * List the drives owned by `address`, operator/service-offering drives sorted
 * last (stable) so the team-admin drive leads lists. Returns `[]` for an empty
 * address (unauthenticated) without a network call.
 */
export async function listBuilderDrives(
  ctx: ClientContext,
  opts: { address: string },
): Promise<BuilderDrive[]> {
  if (!opts.address) return []
  const data = await ctx.graphql<{ getBuilderDrives: BuilderDrive[] }>(GET_BUILDER_DRIVES, {
    filter: { ethereumAddress: opts.address },
  })
  return [...data.getBuilderDrives].sort(
    (a, b) => Number(isOperatorDriveName(a.driveName)) - Number(isOperatorDriveName(b.driveName)),
  )
}

/**
 * The team-admin drive — the single drive carrying a builder profile. Matched
 * by `builderProfileId` (not name or list order), since `getBuilderDrives` also
 * returns operator/service-offering and shared/preview drives.
 */
export function resolveTeamAdminDrive(drives: BuilderDrive[]): BuilderDrive | undefined {
  return drives.find((drive) => Boolean(drive.builderProfileId))
}
