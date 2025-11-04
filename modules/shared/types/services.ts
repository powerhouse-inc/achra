// Temporary types for the services page
export enum ServiceEntityEnum {
  Builders = 'Builders',
  Operators = 'Operators',
  Founders = 'Founders',
  'SNO Governors' = 'SNO Governors',
}

export interface ServiceCover {
  desktop: string
  mobile: string
}

export interface Service {
  id: string
  cover: ServiceCover
  title: string
  description: string[]
  descriptionItems?: string[]
  entities: ServiceEntityEnum[]
  formationAndSetup: string[]
  recurringServices: string[]
  unavailable: boolean
}
