import type { Milestone } from '../milestone-card/types'

export const milestones: Milestone[] = [
  {
    id: '1',
    sequenceCode: 'PH01',
    code: 'POC',
    title: 'Decentralised Operations Platform - POC',
    abstract: 'Decentralized Operations Platform - Proof of Concept, including: First technical integration of RWA Portfolio (Connect & Switchboard); Expense dashboard increments (on-chain data, budget breakdowns).',
    targetDate: '2024-03-31',
    status: 'In Progress',
    progress: 50
  },
  {
    id: '2',
    sequenceCode: 'PH02',
    code: 'MVP',
    title: 'Decentralized Operations Platform - MVP',
    abstract: 'Decentralized Operations Platform - Minimum Viable Product Release, including: MVP release of the MakerDAO transparency reporting information; Integrated Powerhouse Platform delivery.',
    targetDate: '2024-03-31',
    status: 'To do',
    progress: 0
  },
  {
    id: '3',
    sequenceCode: 'PH03',
    code: 'PROD',
    title: 'Decentralized Operations Platform - Production',
    abstract: 'Decentralized Operations Platform - Production release, including: (scope not final) Production grade release of the MakerDAO transparency reporting information; Integrated Powerhouse platform.',
    targetDate: '2024-09-30',
    status: 'Delivered',
    progress: 100
  },
  {
    id: '4',
    sequenceCode: 'PH04',
    code: 'ATLA',
    title: 'Atlas + I/A POC',
    abstract: 'Decentralized Operations Platform - Atlas Editor + Integration / Automation PoC, including: (scope not final) of Atlas Editor document model; Automation process POC.',
    targetDate: '2024-09-30',
    status: 'To do',
    progress: 0
  },
  {
    id: '5',
    sequenceCode: 'PH05',
    code: 'SPIN',
    title: 'Powerhouse Spin-off',
    abstract: 'Powerhouse spin-off research, creation and structuring, including: legal entity; business model; token model; new customers; public comms.',
    targetDate: '2024-09-30',
    status: 'In Progress',
    progress: 33
  },
  {
    id: '6',
    sequenceCode: 'PH06',
    code: 'PMC',
    title: 'MakerDAO PM Consultancy',
    abstract: 'MakerDAO project management consultancy, including: Endgame advisory & Operations coordination; Management & delivelt of Pointable AI SOW1; related OCF work & management.',
    targetDate: '2024-09-30',
    status: 'In Progress',
    progress: 66
  }
]
