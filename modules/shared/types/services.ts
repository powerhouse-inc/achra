// Temporary types for the services page
export enum ServiceEntityEnum {
  Builders = 'Builders',
  Operators = 'Operators',
  Founders = 'Founders',
  'SNO Governors' = 'SNO Governors',
}

export interface Service {
  id: string
  cover: string
  title: string
  description: string[]
  extendedDescription?: string
  descriptionItems?: string[]
  entities: ServiceEntityEnum[]
  formationAndSetup: string[]
  recurringServices: string[]
  unavailable: boolean
  // TODO: Remove this once the filtering by entity is implemented
  isBuilders?: boolean
}
