import type { ResourceTemplatesQuery } from '@/modules/__generated__/graphql/switchboard-generated'

export enum ServiceEntityEnum {
  Builders = 'Builders',
  Networks = 'Networks',
  Operators = 'Operators',
  Founders = 'Founders',
  'SNO Governors' = 'SNO Governors',
}

export type Service = ResourceTemplatesQuery['resourceTemplates'][number]

export function isBuilderService(service: Service): boolean {
  return service.targetAudiences.some((audience) => audience.label === 'Builders')
}

export function isNetworkService(service: Service): boolean {
  return service.targetAudiences.some((audience) => audience.label === 'Networks')
}
