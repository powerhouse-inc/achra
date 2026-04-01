import { RsTemplateStatus } from '@/modules/__generated__/graphql/switchboard-generated'

export const mockResourceTemplate = {
  id: 'c6aacdfe-b182-4ec5-8a4c-dbf9f21708f8',
  title: 'Operational Hub',
  summary: 'Operational Hub for Builders',
  description: 'A turnkey legal and operational setup for open-source builder teams.',
  thumbnailUrl: null,
  status: RsTemplateStatus.Active,
  lastModified: '2026-02-23T13:05:26.472Z',
  operatorId: '0bc59a22-f7d0-4747-9a37-25faaab4ae39',
  contentSections: [],
  facetTargets: [],
  faqFields: [],
  infoLink: null,
  optionGroups: [],
  recurringServices: [],
  services: [],
  setupServices: [],
  targetAudiences: [],
}

export const mockServicePurchaseOperator = {
  id: '0bc59a22-f7d0-4747-9a37-25faaab4ae39',
  name: 'Powerhouse Inc.',
  code: 'PHI',
  icon: 'https://pbs.twimg.com/profile_images/1663915112837652480/pUIOaWoC_400x400.jpg',
  isOperator: true,
  contributors: [],
  links: [],
  products: [],
  projects: [],
  scopes: [],
  skills: [],
  operationalHubMember: { name: null, phid: null },
}
