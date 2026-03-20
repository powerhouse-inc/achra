import {
  type BuilderProfileState,
  BuilderStatus,
} from '@/modules/__generated__/graphql/switchboard-generated'

export const baseOperator: BuilderProfileState = {
  id: 'PHID-BLD-operator-001',
  name: 'Phoenix Labs',
  code: 'PHX',
  description:
    'Experienced operator managing subscription workflows, billing updates, and service lifecycle administration.',
  icon: 'https://avatars.githubusercontent.com/u/9919?s=200&v=4',
  lastModified: '2025-10-15T00:00:00.000Z',
  status: BuilderStatus.Active,
  contributors: ['PHID-USER-001', 'PHID-USER-002', 'PHID-USER-003'],
  isOperator: true,
  links: [],
  operationalHubMember: {
    name: 'Phoenix Ops',
    phid: 'PHID-OPHUB-001',
  },
  products: [],
  projects: [],
  scopes: [],
  skills: [],
  about: null,
  slug: null,
}

export const onHoldOperator: BuilderProfileState = {
  ...baseOperator,
  id: 'PHID-BLD-operator-002',
  name: 'Nebula Core',
  code: 'NBL',
  status: BuilderStatus.OnHold,
  contributors: ['PHID-USER-010'],
  description: 'Operator currently paused while migration tasks are completed.',
  icon: null,
  lastModified: '2025-07-01T00:00:00.000Z',
}
