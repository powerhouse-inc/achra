/**
 * Shared resource-operator service used by service-profile and service-purchase modules.
 *
 * This lives in shared/services so that service-profile and service-purchase
 * modules can reuse the same implementation and avoid code duplication.
 * If at any point the needed data differs between modules, then we should add a new service in each module and remove this one.
 */

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
