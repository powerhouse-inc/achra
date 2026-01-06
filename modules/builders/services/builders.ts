import {
  type BuilderProfileState,
  type BuildersListQueryVariables,
  useBuildersListQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'

export async function getBuilders(
  filter: BuildersListQueryVariables['filter'],
): Promise<BuilderProfileState[]> {
  const data = await useBuildersListQuery.fetcher({ filter })()
  const builders = data.builders.flatMap((builder) => builder)

  // Note: contributors and projects are not needed for the builders list, but are required to satisfy the BuilderProfileState type.
  // We could omit them, but I prefer to keep using the original type.
  return builders.map<BuilderProfileState>((builder) => ({
    contributors: [],
    projects: [],
    ...builder,
  }))
}
