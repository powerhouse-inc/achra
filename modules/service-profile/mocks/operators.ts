import {
  type BuilderProfileState,
  BuilderScope,
  BuilderSkill,
  BuilderStatus,
} from '@/modules/__generated__/graphql/switchboard-generated'

export const mockedOperator: BuilderProfileState = {
  __typename: 'BuilderProfileState',
  id: 'b3130bc2-fcb0-4768-b80b-89872a034d92',
  name: 'Powerhouse',
  code: 'PW',
  slug: 'powerhouse',
  icon: 'https://pbs.twimg.com/profile_images/1663915112837652480/pUIOaWoC_400x400.jpg',
  description:
    'Powerhouse is a team bringing a decentralized operations toolkit for open organizations.',
  about: null,
  status: BuilderStatus.Active,
  isOperator: true,
  lastModified: '2026-03-05T10:33:17.467Z',
  skills: [
    BuilderSkill.FrontendDevelopment,
    BuilderSkill.BackendDevelopment,
    BuilderSkill.FullStackDevelopment,
    BuilderSkill.DevopsEngineering,
  ],
  scopes: [BuilderScope.Sup],
  links: [
    {
      __typename: 'BuilderLink',
      id: '59b1cff9-c82e-4c65-81f9-d381218503e3',
      label: 'Website',
      url: 'https://powerhouse.io/',
    },
  ],
  contributors: [],
  operationalHubMember: { __typename: 'OpHubMember', name: null, phid: null },
  products: [],
  projects: [],
}
