import {
  type RsServiceOfferingsFilter,
  type ServiceOfferingFieldsFragment,
  useServiceOfferingsQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'

export async function getServiceOfferings(
  filter?: RsServiceOfferingsFilter,
): Promise<ServiceOfferingFieldsFragment | undefined> {
  const data = await useServiceOfferingsQuery.fetcher({ filter })()
  return data.serviceOfferings[0]
}
