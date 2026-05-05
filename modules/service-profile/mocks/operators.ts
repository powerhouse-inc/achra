import {
  BuilderStatus,
  type ResourceOperatorFieldsFragment,
} from '@/modules/__generated__/graphql/switchboard-generated'

export const mockedOperator: ResourceOperatorFieldsFragment = {
  __typename: 'BuilderProfileState',
  id: 'b3130bc2-fcb0-4768-b80b-89872a034d92',
  name: 'Powerhouse',
  code: 'PW',
  slug: 'powerhouse',
  icon: 'https://pbs.twimg.com/profile_images/1663915112837652480/pUIOaWoC_400x400.jpg',
  description:
    'Powerhouse is a team bringing a decentralized operations toolkit for open organizations.',
  status: BuilderStatus.Active,
  lastModified: '2026-03-05T10:33:17.467Z',
  contributors: [],
}
