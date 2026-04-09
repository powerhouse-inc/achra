import {
  type RsServiceOfferingsFilter,
  type ServiceOfferingsQuery,
  useServiceOfferingsQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'

export type ServiceOffering = ServiceOfferingsQuery['serviceOfferings'][number]

export async function getServiceOfferings(
  filter?: RsServiceOfferingsFilter,
): Promise<ServiceOffering | undefined> {
  const data = await useServiceOfferingsQuery.fetcher({ filter })()
  return data.serviceOfferings[0]
}
