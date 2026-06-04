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

/** Scope-of-work progress — one of the three SOW progress shapes. */
export type BuilderProfileProgress =
  | { completed: number; total: number }
  | { value: number }
  | { done: boolean }

export interface BuilderProfileProjectScope {
  status: string | null
  progress: BuilderProfileProgress | null
  deliverablesCompleted: { completed: number; total: number } | null
}

export interface BuilderProfileProject {
  id: string
  title: string | null
  code: string | null
  slug: string | null
  abstract: string | null
  budget: number | null
  currency: string | null
  scope: BuilderProfileProjectScope | null
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
  walletAddress: string | null
  skills: string[]
  scopes: string[]
  links: BuilderProfileLink[]
  operationalHubMember: BuilderProfileOperationalHubMember | null
  projects: BuilderProfileProject[]
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
      walletAddress
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
      projects {
        scope {
          status
          progress {
            ... on SOW_StoryPoint {
              completed
              total
            }
            ... on SOW_Percentage {
              value
            }
            ... on SOW_Binary {
              done
            }
          }
          deliverablesCompleted {
            completed
            total
          }
        }
        budget
        title
        code
        slug
        currency
        abstract
        id
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
