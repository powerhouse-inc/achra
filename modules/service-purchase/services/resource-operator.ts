import {
  type BuilderProfile_BuilderProfileState,
  useResourceOperatorQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'

export async function getResourceOperator(
  docId: string,
): Promise<BuilderProfile_BuilderProfileState | undefined> {
  const data = await useResourceOperatorQuery.fetcher({ docId })()
  const state = data.BuilderProfile?.getDocument?.state

  if (!state) {
    return undefined
  }

  return {
    operationalHubMember: {
      name: '',
      phid: '',
    },
    links: [],
    scopes: [],
    skills: [],
    ...state,
  }
}
