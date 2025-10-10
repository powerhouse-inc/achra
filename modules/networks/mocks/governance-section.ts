import type {
  ExecutiveProposal,
  ExecutiveProposalSupporters,
  ExtendedExecutiveProposal,
} from '@/modules/shared/types/makervote'
import type { Topic } from '../lib/fetch-forum-posts'

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
      skySupport: '50000000000000',
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
      skySupport: '85000000000000',
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
      skySupport: '72000000000000',
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
      skySupport: '68000000000000',
      executiveHash: '0xffeeddccbbaa99887766554433221100ffeeddccbbaa998877665544332211',
      officeHours: true,
    },
  },
]

export const mockedExecutiveProposalSupporters: ExecutiveProposalSupporters = {
  '0x1234567890123456789012345678901234567890': [
    { address: '0xsupporter1', deposits: '1000000000000', percent: '20' },
    { address: '0xsupporter2', deposits: '5000000000000', percent: '10' },
  ],
  '0x0987654321098765432109876543210987654321': [
    { address: '0xsupporter3', deposits: '20000000000000', percent: '23.5' },
    { address: '0xsupporter4', deposits: '15000000000000', percent: '17.6' },
    { address: '0xsupporter5', deposits: '80000000000000', percent: '9.4' },
  ],
  '0xaabbccddee11223344556677889900aabbccddee': [
    { address: '0xsupporter6', deposits: '12000000000000', percent: '16.7' },
  ],
  '0x1111222233334444555566667777888899990000': [
    { address: '0xsupporter7', deposits: '9000000000000', percent: '13.2' },
    { address: '0xsupporter8', deposits: '7000000000000', percent: '10.3' },
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

export const mockedForumPosts: Topic[] = [
  // Category 89 - General Discussion
  {
    id: 20686,
    title: 'About the General Discussion category',
    slug: 'about-the-general-discussion-category',
    posts_count: 1,
    created_at: '2023-04-28T14:34:30.799Z',
    tags: [],
    like_count: 7,
    category_id: 89,
  },
  {
    id: 27291,
    title: 'Risk Month in Review: September 2025',
    slug: 'risk-month-in-review-september-2025',
    posts_count: 1,
    created_at: '2025-10-07T10:11:35.393Z',
    tags: ['ba-labs'],
    like_count: 2,
    category_id: 89,
  },
  {
    id: 27206,
    title: 'SKY Token Staking Reward Systems (Ideas)',
    slug: 'sky-token-staking-reward-systems-ideas',
    posts_count: 2,
    created_at: '2025-09-24T21:09:44.198Z',
    tags: [],
    like_count: 1,
    category_id: 89,
  },
  // Category 68 - New to MakerDAO (Onboarding)
  {
    id: 27310,
    title: 'Welcome! Start Here: Community Guidelines and FAQ',
    slug: 'welcome-start-here-community-guidelines-and-faq',
    posts_count: 4,
    created_at: '2025-10-08T09:00:00.000Z',
    tags: ['welcome', 'guide'],
    like_count: 5,
    category_id: 68,
  },
  {
    id: 27311,
    title: 'How to get SKY and participate in governance',
    slug: 'how-to-get-sky-and-participate-in-governance',
    posts_count: 6,
    created_at: '2025-10-06T12:30:00.000Z',
    tags: ['onboarding', 'governance'],
    like_count: 8,
    category_id: 68,
  },
  // Category 92 - Maker Core (Finances)
  {
    id: 27320,
    title: 'Treasury Report: Q3 2025 Overview',
    slug: 'treasury-report-q3-2025-overview',
    posts_count: 10,
    created_at: '2025-10-04T15:00:00.000Z',
    tags: ['treasury', 'report'],
    like_count: 12,
    category_id: 92,
  },
  {
    id: 27321,
    title: 'DAI Reserve Allocation Discussion',
    slug: 'dai-reserve-allocation-discussion',
    posts_count: 7,
    created_at: '2025-10-05T18:45:00.000Z',
    tags: ['finances', 'allocation'],
    like_count: 9,
    category_id: 92,
  },
  // Category 78 - Alignment Conservers (Governance)
  {
    id: 27330,
    title: 'Proposal: Update to Voting Thresholds',
    slug: 'proposal-update-to-voting-thresholds',
    posts_count: 14,
    created_at: '2025-10-07T08:20:00.000Z',
    tags: ['proposal', 'voting'],
    like_count: 20,
    category_id: 78,
  },
  {
    id: 27331,
    title: 'Governance Process Improvements — Feedback Wanted',
    slug: 'governance-process-improvements-feedback-wanted',
    posts_count: 9,
    created_at: '2025-10-03T11:10:00.000Z',
    tags: ['governance', 'process'],
    like_count: 15,
    category_id: 78,
  },
  // Category 101 - Atlas (Governance AI Tools)
  {
    id: 27299,
    title:
      'Request: Assistance — DAI (PoS) tokens accidentally sent to DAI contract on Polygon (TxID included',
    slug: 'request-assistance-dai-pos-tokens-accidentally-sent-to-dai-contract-on-polygon-txid-included',
    posts_count: 2,
    created_at: '2025-10-08T14:10:08.274Z',
    tags: [],
    like_count: 0,
    category_id: 101,
  },
  {
    id: 27256,
    title: 'DAI coin stuck on Andromeda Chain (Métis)',
    slug: 'dai-coin-stuck-on-andromeda-chain-metis',
    posts_count: 3,
    created_at: '2025-10-02T20:06:16.891Z',
    tags: ['dai', 'aave', 'metis'],
    like_count: 1,
    category_id: 101,
  },
]
