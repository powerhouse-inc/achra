import {
  type Builder,
  type BuildersListQueryVariables,
  useBuildersListQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'

export async function getBuilders(
  filter: BuildersListQueryVariables['filter'],
): Promise<Builder[]> {
  const data = await useBuildersListQuery.fetcher({ filter })()
  const builders = data.allNetworks.flatMap((network) => network.builders)

  // BuildersList query doesn't return contributors; provide an empty array to satisfy Builder.
  // There is an infinite loop when trying to fetch contributors.
  return builders.map<Builder>((builder) => ({
    contributors: [],
    ...builder,
  }))
}
