import {
  type BuilderProfileQueryVariables,
  type BuilderProfileState,
  useBuilderProfileQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'

export async function getBuilderProfile(
  filter: BuilderProfileQueryVariables['filter'],
): Promise<BuilderProfileState | undefined> {
  const data = await useBuilderProfileQuery.fetcher({ filter })()
  if (data.builders.length === 0) return undefined
  const builder = data.builders[0]

  const projects = builder.projects.map((project) => ({
    ...project,
    scope: project.scope
      ? {
          ...project.scope,
          deliverables: [],
        }
      : project.scope,
  }))

  return {
    contributors: [],
    products: [],
    ...builder,
    projects,
  }
}
