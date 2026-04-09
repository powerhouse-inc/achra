import {
  type BuilderProfileState,
  BuilderScope,
  BuilderSkill,
  BuilderStatus,
} from '@/modules/__generated__/graphql/switchboard-generated'

export const mockBuilderProfile: BuilderProfileState = {
  __typename: 'BuilderProfileState',
  id: 'b3130bc2-fcb0-4768-b80b-89872a034d92',
  name: 'Powerhouse',
  code: 'PW',
  slug: 'powerhouse',
  icon: 'https://pbs.twimg.com/profile_images/1663915112837652480/pUIOaWoC_400x400.jpg',
  description:
    'Powerhouse is a team bringing a decentralized operations toolkit for open organizations.',
  about:
    'We build scalable, open-source tooling for decentralized teams — from budget transparency to project management and governance workflows.',
  status: BuilderStatus.Active,
  isOperator: true,
  lastModified: '2026-03-05T10:33:17.467Z',
  skills: [
    BuilderSkill.FrontendDevelopment,
    BuilderSkill.BackendDevelopment,
    BuilderSkill.FullStackDevelopment,
    BuilderSkill.DevopsEngineering,
    BuilderSkill.SmartContractDevelopment,
    BuilderSkill.UiUxDesign,
    BuilderSkill.TechnicalWriting,
    BuilderSkill.QaTesting,
    BuilderSkill.DataEngineering,
    BuilderSkill.SecurityEngineering,
  ],
  scopes: [BuilderScope.Sup],
  links: [
    {
      __typename: 'BuilderLink',
      id: 'b9663c8a-1df7-4e64-9ea2-061dfb277916',
      label: 'X',
      url: 'https://x.com/PowerhouseDAO',
    },
    {
      __typename: 'BuilderLink',
      id: '4e271914-bbe6-492c-8b18-ea56fe04cba6',
      label: 'Forum',
      url: 'https://forum.sky.money/t/professional-ecosystem-actor-introduction-powerhouse/21057',
    },
    {
      __typename: 'BuilderLink',
      id: '7b36f53e-9e7a-4cc9-8ab3-42b2a209e237',
      label: 'Discord',
      url: 'https://discord.com/invite/h7GKvqDyDP',
    },
    {
      __typename: 'BuilderLink',
      id: '5a4a5354-9003-4dd6-a787-6e48b5887446',
      label: 'Github',
      url: 'https://github.com/powerhouse-inc',
    },
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
