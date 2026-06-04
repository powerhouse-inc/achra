import type { ClientContext } from '../context'

export interface BuilderProfileLink {
  id: string
  label: string | null
  /** Non-null in the API selection. */
  url: string
}

export interface BuilderProfileOperationalHubMember {
  name: string | null
  phid: string | null
}

/** The builder/team profile, mirroring the `builders` subgraph query. */
export interface BuilderProfile {
  id: string | null
  code: string | null
  name: string | null
  slug: string | null
  icon: string | null
  description: string | null
  about: string | null
  lastModified: string | null
  status: string | null
  isOperator: boolean
  skills: string[]
  scopes: string[]
  links: BuilderProfileLink[]
  operationalHubMember: BuilderProfileOperationalHubMember | null
}

const GET_BUILDER_PROFILE = /* GraphQL */ `
  query BuilderProfile($filter: buildersFilter) {
    builders(filter: $filter) {
      code
      description
      about
      id
      icon
      lastModified
      links {
        id
        label
        url
      }
      name
      scopes
      skills
      slug
      status
      isOperator
      operationalHubMember {
        name
        phid
      }
    }
  }
`

/** Fetch a builder profile by its document id. Returns `null` if not found. */
export async function getBuilderProfile(
  ctx: ClientContext,
  opts: { id: string },
): Promise<BuilderProfile | null> {
  if (!opts.id) return null
  const data = await ctx.graphql<{ builders: BuilderProfile[] }>(GET_BUILDER_PROFILE, {
    filter: { id: opts.id },
  })
  return data.builders[0] ?? null
}
