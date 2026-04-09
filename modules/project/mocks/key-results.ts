import type { ScopeOfWork_KeyResult } from '@/modules/__generated__/graphql/switchboard-generated'

export const mockKeyResults: ScopeOfWork_KeyResult[] = [
  {
    __typename: 'ScopeOfWork_KeyResult',
    id: '1',
    title: 'RWA Portfolio conceptual wireframes',
    link: 'RWA Portfolio conceptual wireframes',
  },
  {
    __typename: 'ScopeOfWork_KeyResult',
    id: '2',
    title: 'Technical demo of RWA Portfolio - Feb 21',
    link: 'Technical demo of RWA Portfolio - Feb 21',
  },
]

export const mockKeyResultsWithLinks: ScopeOfWork_KeyResult[] = [
  {
    __typename: 'ScopeOfWork_KeyResult',
    id: 'kr1',
    title: 'RWA Portfolio conceptual wireframes',
    link: 'www.examplelink.com',
  },
  {
    __typename: 'ScopeOfWork_KeyResult',
    id: 'kr2',
    title: 'Technical demo of RWA Portfolio - Feb 21',
    link: 'www.celestia-portfolio.com',
  },
]

export const mockKeyResultWithLink: ScopeOfWork_KeyResult = {
  __typename: 'ScopeOfWork_KeyResult',
  id: 'kr1',
  title: 'Market research report completed',
  link: 'https://example.com/report',
}

export const mockKeyResultWithoutLink: ScopeOfWork_KeyResult = {
  __typename: 'ScopeOfWork_KeyResult',
  id: 'kr2',
  title: 'Analysis in progress',
  link: '',
}

export const mockKeyResultsMixedLinks: ScopeOfWork_KeyResult[] = [
  {
    __typename: 'ScopeOfWork_KeyResult',
    id: 'kr3',
    title: 'Expense Dashboard deployment v0.33.0',
    link: 'https://expenses.example.com',
  },
  {
    __typename: 'ScopeOfWork_KeyResult',
    id: 'kr4',
    title: 'Source code on Powerhouse Github repo',
    link: '',
  },
]
