import { RsTemplateStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { OperatorChipEnum } from '@/modules/operator-profile/types'
import type { Service } from '@/modules/shared/types/services'

export const SERVICES_CARDS_MOCK: Service[] = [
  {
    id: '5299be53-0808-4599-af16-40f986e43a96',
    title: 'Operational Hub',
    summary:
      'A turnkey legal and operational setup for open-source builder teams — entity formation, invoicing, payouts, and compliance bundled under one roof.',
    description:
      'A ready-to-use operational setup that gives open-source and public-goods builder teams the legal and financial infrastructure to receive funding, pay contributors, and operate compliantly from day one.\n\nStructured as a Swiss Association — a cost-efficient, privacy-preserving legal form with strong international recognition — the Operational Hub reduces personal liability for contributors, simplifies compliance, and provides a professional foundation for teams that are already doing the work.',
    thumbnailUrl:
      'https://staging.achra.com/_next/image?url=%2Fservices%2Fcovers%2Fcover-02.jpg&w=3840&q=75&dpl=dpl_FjkVSKv1rrWGpfaa2yG8PPxLE1Na',
    status: RsTemplateStatus.Active,
    targetAudiences: [
      { id: '02aad85b-88d4-4d55-b841-d9e739c54a77', label: 'Builders', color: '#0ea5e9' },
      { id: '2a9d36ae-000d-4a61-8361-8f85d34edf5f', label: 'Networks', color: '#10b981' },
    ],
    setupServices: [
      'Registered address (Zug)',
      'VAT documentation',
      'Contract templates',
      'Swiss Association setup with local counsel',
    ],
    recurringServices: [
      'Annual tax filing',
      'Reimbursement management',
      'Invoice management',
      'Monthly accounting & close',
      'Monthly expense reports',
      'Expense policies (role-based)',
      'Contributor onboarding & operations',
      'Multi-currency payouts',
      'Dedicated ops support',
      'Multiple entities',
      'Dedicated account manager',
      'Admin portal',
      'Custom workflows & reporting',
    ],
    contentSections: [
      {
        id: 'ace1fdae-8fae-e7de-89af-b11b4484a6f0',
        title: 'Why a Swiss Association?',
        content:
          'Swiss Associations are a flexible, cost-efficient legal form well suited to open-source and public-goods teams. They offer independent legal personhood, privacy protections (members are not listed in a public registry), democratic governance, international recognition, and low administrative overhead.\n\nUnlike a traditional company, a Swiss Association is non-commercial — it cannot carry out exclusively commercial activities, receive equity investments, or distribute profits. For teams receiving grants, paying contributors, and building public goods, this is the right legal fit.',
        displayOrder: 0,
      },
      {
        id: 'ba96235c-ba48-22b6-5320-d278bd6bb2cd',
        title: "What's Included",
        content:
          'Every Operational Hub subscription includes entity formation and ongoing operational support.\n\nFormation & Setup: Swiss association formation with licensed counsel, a registered address in Zug, legal document templates, and VAT documentation.\n\nOngoing Operations: Financial management (invoicing, accounting, expense reporting, tax filing), contributor operations (onboarding, multi-currency payouts, expense policies), and dedicated operational support.\n\nAdvanced & Custom: For scaling organizations — multiple entity support, a dedicated account manager, admin portal, and custom workflows. Add-ons available for exchange setup, banking, AML monitoring, and more.',
        displayOrder: 1,
      },
      {
        id: '78ef2f6b-22f1-295a-0e88-cd5d0fe1c679',
        title: 'Privacy & Liability Protection',
        content:
          'Contributors work through the entity, not as individuals — avoiding the risk of being treated as a general partnership where each person carries unlimited personal liability.\n\nMembers of a Swiss Association are not listed in any public registry. While identities are known to legal counsel and the operator for KYB/KYC compliance, they are not publicly disclosed.\n\nA legal entity protects against the majority of operational and contractual liability. It does not protect against gross negligence, willful misconduct, or criminal liability.',
        displayOrder: 2,
      },
    ],
    facetTargets: [
      {
        id: 'df976250-6b17-4f0b-b60c-34cca38d9156',
        categoryKey: 'sno-function',
        categoryLabel: 'SNO Function',
        selectedOptions: ['Operational Hub for Open Source Builders', 'Operational Hub'],
      },
      {
        id: 'c9aa8cc9-40bf-4b52-9ac0-4434061583a2',
        categoryKey: 'legal-entity',
        categoryLabel: 'Legal Entity',
        selectedOptions: ['Swiss Association', 'BVI Entity'],
      },
      {
        id: 'a519bba5-09df-461e-9364-0dd2ea3c2fb5',
        categoryKey: 'anonymity',
        categoryLabel: 'Anonymity',
        selectedOptions: ['High', 'Highest'],
      },
      {
        id: '9a57462a-678c-4c21-b2f4-578851f95cbf',
        categoryKey: 'team',
        categoryLabel: 'Team',
        selectedOptions: ['Remote', 'Local'],
      },
    ],
    faqFields: [
      {
        id: 'fd3c1dbc-8c7c-4202-9417-154b4f26bb04',
        question: 'What is an Operational Hub?',
        answer:
          'A ready-to-use, non-commercial entity that serves as a coordination and execution hub with essential legal and operational infrastructure for open-source and public-goods builder teams.',
        displayOrder: 0,
      },
      {
        id: 'd0d661ca-0a9d-422a-a41f-a5848165695a',
        question: 'Who is this for?',
        answer:
          'Builder teams, open-source projects, and DAOs that receive grants or donations, pay contributors, or hold a treasury — and need a legal and operational structure to do so properly. Particularly well suited to globally distributed teams that want to operate under a recognized legal framework without setting up a traditional company.',
        displayOrder: 1,
      },
      {
        id: '628fcf58-a69e-4cc6-b387-db1fd0148ab7',
        question: 'Do contributors need to reveal their identity?',
        answer:
          'Contributors are not publicly identified. Swiss Associations do not list members in a public registry. However, contributor identities are disclosed to legal counsel (attorney-client privilege) and the operator for KYB/KYC compliance purposes.',
        displayOrder: 2,
      },
      {
        id: '41f93228-2c7a-4bd8-933f-0cd8f3474a98',
        question: 'How does setup work?',
        answer:
          'After an initial consultation, the process includes KYB/KYC verification, a founding meeting with licensed Swiss counsel, and entity registration. Once the entity is created, ongoing operational services begin immediately.',
        displayOrder: 3,
      },
      {
        id: '65df910d-d6eb-4a7d-97e3-a2052633e1f2',
        question: "What's the difference between Starter and Standard?",
        answer:
          'Starter ($750/mo) is designed for early-stage teams and includes entity formation, financial operations, and up to 5 invoices per month. Standard ($1,250/mo + $250/contributor) is for growing teams of 3+ and adds contributor onboarding, multi-currency payouts, dedicated ops support, expense policies, and unlimited invoicing.',
        displayOrder: 4,
      },
    ],
    infoLink: null,
    lastModified: '2026-02-03T14:12:32.112Z',
    operatorId: '',
  },
  {
    id: '1bb9c40b-942d-4159-a41a-a71f4889e95a',
    title: 'COMMERCIAL OPERATIONAL HUB (OH)',
    summary: '',
    description: null,
    thumbnailUrl: null,
    status: RsTemplateStatus.ComingSoon,
    targetAudiences: [
      { id: '15f4bc1a-27d5-42cb-93a2-ca0b8117dba9', label: 'Networks', color: '#10b981' },
      { id: 'e13ea974-b9ed-4b0c-aa5a-7c9a97916efc', label: 'Builders', color: '#0ea5e9' },
    ],
    setupServices: [],
    recurringServices: [],
    contentSections: [],
    facetTargets: [],
    faqFields: [],
    infoLink: null,
    lastModified: '2026-01-30T15:03:25.605Z',
    operatorId: '',
  },
]

export const OPERATORS_MOCK = [
  {
    id: 'accountable-opc',
    title: 'Accountable OPC',
    description: 'Empowering you business with reliable bookkeeping, payroll, and tax solutions.',
    roles: [OperatorChipEnum.Accountable, OperatorChipEnum.Budgeting, OperatorChipEnum.Forecasting],
    activeSince: 'JUL 2022',
    minEngagement: '3 month',
    teamSize: '12 FTEs',
    setupTime: '7 days',
  },
  {
    id: 'powerhouse-genesis-oh',
    title: 'Powerhouse Genesis OH',
    description: 'Empowering you business with reliable bookkeeping, payroll, and tax solutions.',
    roles: [OperatorChipEnum.Accountable, OperatorChipEnum.Budgeting, OperatorChipEnum.Forecasting],
    activeSince: 'JUL 2022',
    minEngagement: '3 month',
    teamSize: '12 FTEs',
    setupTime: '7 days',
  },
  {
    id: 'accountable-opc-1',
    title: 'Accountable OPC',
    description: 'Empowering you business with reliable bookkeeping, payroll, and tax solutions.',
    roles: [OperatorChipEnum.Accountable, OperatorChipEnum.Budgeting, OperatorChipEnum.Forecasting],
    activeSince: 'JUL 2022',
    minEngagement: '3 month',
    teamSize: '12 FTEs',
    setupTime: '7 days',
  },
]
