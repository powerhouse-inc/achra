import {
  type ServiceOfferingsQuery,
  useServiceOfferingsQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'

export type ServiceOffering = ServiceOfferingsQuery['serviceOfferings'][number]

export async function getServiceOfferings(): Promise<ServiceOffering[]> {
  const data = await useServiceOfferingsQuery.fetcher()()
  return data.serviceOfferings
}
