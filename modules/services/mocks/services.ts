import { type Service, ServiceEntityEnum } from '@/modules/shared/types/services'

export const SERVICES_CARDS_MOCK: Service[] = [
  {
    id: 'sno-embryonic-hub',
    title: 'SNO Embryonic Hub',
    description: [
      'Embryonic legal entity for early-stage networks with coverage of all the major functions. Embryonic legal entity for early-stage networks with coverage of all the major functions.',
    ],
    descriptionItems: [
      'Contributor Operations',
      'Proof of Work tickets',
      'Ip holding and protection',
      'SAFT Issuance',
      'Legal Protection',
    ],
    entities: [ServiceEntityEnum.Founders, ServiceEntityEnum['SNO Governors']],
    sections: [
      {
        title: 'Formation & Setup',
        items: [
          'Legal needs analysis',
          'Entity incorporation',
          'Payment processor setup',
          'Contributor on-boarding',
          'Wind-down planning',
        ],
      },
      {
        title: 'Recurring Services',
        items: [
          'Contracts administration',
          'Payment processing',
          'Transparency reporting',
          'Tax administration & filing',
        ],
      },
    ],
    cover: '/services/covers/service-cover-01.svg',
    unavailable: false,
  },
  {
    id: 'swiss-association-operational-hub',
    title: 'Swiss Association Operational Hub',
    description: [
      'Light-weight legal entity for open-source builders and operators to manage their contributor relationship, compliance, and payment processing. ',
      'Offers protection for liability risk and conflict resolution with strong privacy protection.',
    ],
    entities: [ServiceEntityEnum.Builders, ServiceEntityEnum.Operators],
    sections: [
      {
        title: 'Formation & Setup',
        items: [
          'Legal needs analysis',
          'Entity incorporation',
          'Payment processor setup',
          'Contributor on-boarding',
          'Wind-down planning',
        ],
      },
      {
        title: 'Recurring Services',
        items: [
          'Contracts administration',
          'Payment processing',
          'Transparency reporting',
          'Tax administration & filing',
        ],
      },
    ],
    cover: '/services/covers/service-cover-02.svg',
    unavailable: false,
  },
  {
    id: 'ip-spv',
    title: 'IP SPV',
    description: ['Special purpose vehicle for holding and protecting SNO intellectual property. '],
    descriptionItems: [
      'Trademarks',
      'Software licenses',
      'Domain names',
      'SAFT Issuance',
      'Social Media accounts',
    ],
    entities: [ServiceEntityEnum['SNO Governors']],
    sections: [
      {
        title: 'Formation & Setup',
        items: [
          'Legal needs analysis',
          'Entity incorporation',
          'Payment processor setup',
          'Contributor on-boarding',
          'Wind-down planning',
        ],
      },
      {
        title: 'Recurring Services',
        items: [
          'Contracts administration',
          'Payment processing',
          'Transparency reporting',
          'Tax administration & filing',
        ],
      },
    ],
    cover: '/services/covers/service-cover-03.svg',
    unavailable: true,
  },
  {
    id: 'revenue-generating-hub',
    title: 'Revenue Generating Hub',
    description: ['A revenue generating hub secures and leverages network assets:'],
    descriptionItems: [
      'Brand Assets',
      'Content Licensing',
      'Data Usage Rights',
      'Software Patents',
    ],
    entities: [ServiceEntityEnum['SNO Governors']],
    sections: [
      {
        title: 'Formation & Setup',
        items: [
          'Legal needs analysis',
          'Entity incorporation',
          'Payment processor setup',
          'Contributor on-boarding',
          'Wind-down planning',
        ],
      },
      {
        title: 'Recurring Services',
        items: [
          'Contracts administration',
          'Payment processing',
          'Transparency reporting',
          'Tax administration & filing',
        ],
      },
    ],
    cover: '/services/covers/service-cover-04.svg',
    unavailable: true,
  },
  {
    id: 'operational-collateral-fund',
    title: 'Operational Collateral Fund',
    description: ["A dedicated fund to safeguard and grow the network's operational assets:"],
    descriptionItems: [
      'Registered Trademarks',
      'Proprietary Codebase',
      'Key Domain Names',
      'Branded Content',
    ],
    entities: [ServiceEntityEnum['SNO Governors']],
    sections: [
      {
        title: 'Formation & Setup',
        items: [
          'Legal needs analysis',
          'Entity incorporation',
          'Payment processor setup',
          'Contributor on-boarding',
          'Wind-down planning',
        ],
      },
      {
        title: 'Recurring Services',
        items: [
          'Contracts administration',
          'Payment processing',
          'Transparency reporting',
          'Tax administration & filing',
        ],
      },
    ],
    cover: '/services/covers/service-cover-05.svg',
    unavailable: true,
  },
  {
    id: 'sky-star-foundation',
    title: 'Sky Star Foundation',
    description: [
      'Infrastructure hub for Star Agent onboarding, capital access, and standardized governance tooling.',
    ],
    descriptionItems: [
      'Senior Risk Capital origination',
      'Star Artifact templates & deployment support',
      'Governance-neutral execution & Sky Primitive access',
      'Ecosystem Upkeep enforcement',
      'ISRC and treasury buffer integration',
    ],
    entities: [ServiceEntityEnum['SNO Governors']],
    sections: [
      {
        title: 'Formation & Setup',
        items: [
          'Legal needs analysis',
          'Entity incorporation',
          'Payment processor setup',
          'Contributor on-boarding',
          'Wind-down planning',
        ],
      },
      {
        title: 'Recurring Services',
        items: [
          'Contracts administration',
          'Payment processing',
          'Transparency reporting',
          'Tax administration & filing',
        ],
      },
    ],
    cover: '/services/covers/service-cover-06.svg',
    unavailable: true,
  },
]
