import type {
  ExecutiveProposal,
  ExecutiveProposalSupporters,
  ExtendedExecutiveProposal,
} from '@/modules/shared/types/makervote'

export const mockedExecutiveProposals: ExecutiveProposal[] = [
  {
    about: 'This executive proposal includes several governance updates.',
    content: 'Detailed content about the proposal...',
    title: 'Executive Proposal - January 2025',
    proposalBlurb: 'Monthly governance updates and parameter changes',
    key: 'exec-proposal-2025-01',
    address: '0x1234567890123456789012345678901234567890',
    date: '2025-01-15T10:00:00Z',
    active: true,
    proposalLink: 'https://vote.makerdao.com/executive/exec-proposal-2025-01',
    spellData: {
      hasBeenCast: false,
      hasBeenScheduled: false,
      eta: '2025-01-20T10:00:00Z',
      expiration: '2025-02-15T10:00:00Z',
      nextCastTime: '2025-01-18T10:00:00Z',
      datePassed: '2025-01-16T15:30:00Z',
      dateExecuted: '2025-01-17T08:00:00Z',
      skySupport: '5000000000000000000000000',
      executiveHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      officeHours: true,
    },
  },
  {
    about: 'This is the currently governing proposal.',
    content: 'Active governance spell content...',
    title: 'Executive Proposal - December 2024 (Active)',
    proposalBlurb: 'Current governing proposal with active parameters',
    key: 'exec-proposal-2024-12',
    address: '0x0987654321098765432109876543210987654321',
    date: '2024-12-10T10:00:00Z',
    active: true,
    proposalLink: 'https://vote.makerdao.com/executive/exec-proposal-2024-12',
    spellData: {
      hasBeenCast: true,
      hasBeenScheduled: true,
      eta: '2024-12-15T10:00:00Z',
      expiration: '2025-01-10T10:00:00Z',
      nextCastTime: '',
      datePassed: '2024-12-11T12:00:00Z',
      dateExecuted: '2024-12-12T09:00:00Z',
      skySupport: '8500000000000000000000000',
      executiveHash: '0x9876543210abcdef9876543210abcdef9876543210abcdef9876543210abcdef',
      officeHours: true,
    },
  },
  {
    about: 'Previously passed executive proposal.',
    content: 'Historical proposal content...',
    title: 'Executive Proposal - November 2024',
    proposalBlurb: 'Q4 parameter adjustments and updates',
    key: 'exec-proposal-2024-11',
    address: '0xaabbccddee11223344556677889900aabbccddee',
    date: '2024-11-05T10:00:00Z',
    active: false,
    proposalLink: 'https://vote.makerdao.com/executive/exec-proposal-2024-11',
    spellData: {
      hasBeenCast: true,
      hasBeenScheduled: true,
      eta: '2024-11-10T10:00:00Z',
      expiration: '2024-12-05T10:00:00Z',
      nextCastTime: '',
      datePassed: '2024-11-06T14:00:00Z',
      dateExecuted: '2024-11-07T11:00:00Z',
      skySupport: '7200000000000000000000000',
      executiveHash: '0x1122334455667788990011223344556677889900112233445566778899001122',
      officeHours: false,
    },
  },
  {
    about: 'Another passed proposal from October.',
    content: 'October governance updates...',
    title: 'Executive Proposal - October 2024',
    proposalBlurb: 'Monthly governance cycle updates',
    key: 'exec-proposal-2024-10',
    address: '0x1111222233334444555566667777888899990000',
    date: '2024-10-08T10:00:00Z',
    active: false,
    proposalLink: 'https://vote.makerdao.com/executive/exec-proposal-2024-10',
    spellData: {
      hasBeenCast: true,
      hasBeenScheduled: true,
      eta: '2024-10-12T10:00:00Z',
      expiration: '2024-11-08T10:00:00Z',
      nextCastTime: '',
      datePassed: '2024-10-09T16:00:00Z',
      dateExecuted: '2024-10-10T10:00:00Z',
      skySupport: '6800000000000000000000000',
      executiveHash: '0xffeeddccbbaa99887766554433221100ffeeddccbbaa998877665544332211',
      officeHours: true,
    },
  },
]

export const mockedExecutiveProposalSupporters: ExecutiveProposalSupporters = {
  '0x1234567890123456789012345678901234567890': [
    { address: '0xsupporter1', deposits: '1000000000000000000000', percent: '20' },
    { address: '0xsupporter2', deposits: '500000000000000000000', percent: '10' },
  ],
  '0x0987654321098765432109876543210987654321': [
    { address: '0xsupporter3', deposits: '2000000000000000000000', percent: '23.5' },
    { address: '0xsupporter4', deposits: '1500000000000000000000', percent: '17.6' },
    { address: '0xsupporter5', deposits: '800000000000000000000', percent: '9.4' },
  ],
  '0xaabbccddee11223344556677889900aabbccddee': [
    { address: '0xsupporter6', deposits: '1200000000000000000000', percent: '16.7' },
  ],
  '0x1111222233334444555566667777888899990000': [
    { address: '0xsupporter7', deposits: '900000000000000000000', percent: '13.2' },
    { address: '0xsupporter8', deposits: '700000000000000000000', percent: '10.3' },
  ],
}

// Mock hat address (the currently governing proposal)
export const mockedHatAddress = '0x0987654321098765432109876543210987654321'

// Helper to get extended proposals with supporter counts
export function getMockedExtendedProposals(): ExtendedExecutiveProposal[] {
  return mockedExecutiveProposals.map((proposal) => {
    const supporters = mockedExecutiveProposalSupporters[proposal.address]
    return {
      ...proposal,
      supporters: supporters.length,
    }
  })
}
