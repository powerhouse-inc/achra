// Temporary types for the services page
export enum ServiceEntityEnum {
  Builders = 'Builders',
  Operators = 'Operators',
  Founders = 'Founders',
  'SNO Governors' = 'SNO Governors',
}

export interface ServiceSection {
  title: string
  items: string[]
}
export interface Service {
  id: string
  cover: string
  title: string
  description: string[]
  descriptionItems?: string[]
  entities: ServiceEntityEnum[]
  sections: ServiceSection[]
  unavailable: boolean
}
