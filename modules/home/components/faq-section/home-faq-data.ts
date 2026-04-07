export interface HomeFaqItem {
  id: string
  question: string
  answer: string
}

/** Two columns of FAQs — copy matches Framer (product name Achra for this site). */
export const HOME_FAQ_COLUMNS: HomeFaqItem[][] = [
  [
    {
      id: 'faq-scale',
      question: 'How does Achra help network organizations scale?',
      answer:
        'Achra lowers the costs of coordination. It connects organizations, builders, and operators in a shared system where governance, payments, and services are integrated. By structuring procurement, automating execution, and aligning incentives, network organizations can grow across borders without the friction of traditional firms.',
    },
    {
      id: 'faq-governance-execution',
      question: 'How does Achra connect governance with day-to-day execution?',
      answer:
        'Governance decisions are not left onchain or in the forums. Achra integrates permissions and approvals from governance directly to into workflows, payouts, and records. Atlas powers this layer so that proposals, budgets, and milestones can move from decision to execution automatically.',
    },
    {
      id: 'faq-workstreams',
      question: 'How do workstreams, proposals, and roadmaps connect?',
      answer:
        'Workstreams are open calls for contribution. Builders submit proposals that describe how they will deliver. Approved proposals roll into roadmaps where progress is tracked and contributors get paid. This creates a structured flow from idea to delivery and keeps the network work structured and transparent.',
    },
    {
      id: 'faq-payments',
      question: 'How does Achra handle payments, budgets, and financial transparency?',
      answer:
        'Every roadmap, project, and deliverable carries its own wallet. Budgets and expenses are visible at each level, so contributors know how funds are allocated and spent. Milestone-based payouts run in stablecoins, with automated tax reporting to keep compliance manageable.',
    },
    {
      id: 'faq-resources',
      question: 'What are resources, and how do services connect to them?',
      answer:
        'A resource is anything a network depends on, such as a builder team, a legal entity, or a treasury. Services attach to these resources in three stages: setup, maintenance, and wind-down. This makes it easy to plug in the right operational support at the right stage of a resource\u2019s lifecycle.',
    },
  ],
  [
    {
      id: 'faq-operational-hub',
      question: 'What is an operational hub, and how does it replace auditors?',
      answer:
        'Instead of relying on external auditors, Achra introduces operational hubs. Hubs verify that deliverables, budgets, and services line up with governance decisions. They provide a live check on execution, so networks can act with confidence and reduce the lag of periodic audits.',
    },
    {
      id: 'faq-ai-automation',
      question: 'How does Achra support AI and automation in operations?',
      answer:
        'Achra\u2019s workflows and data structures are designed for automation from the start. Specifications, approvals, and payouts are machine readable, which makes it possible for AI agents to participate directly in operations. They can draft proposals, monitor execution, and run services in ways that are transparent and safe.',
    },
    {
      id: 'faq-powerhouse-stack',
      question: 'How does Achra fit into the Powerhouse stack?',
      answer:
        'Powerhouse is the ecosystem for Scalable Network Organizations. It combines services, governance, and software to help decentralized groups grow into platform economies. Achra is Powerhouse\u2019s global coordination platform, where organizations, builders, and operators execute work through RFPs, services, and automated governance. Vetra is the builder platform for creating applications on a reactive document architecture with spec-driven AI, enabling developers to define workflows once and deploy them globally. Together, Achra and Vetra form the operational and technical backbone for SNOs, supported by Powerhouse\u2019s broader framework of services and models. At the core is Open-Source Capitalism, which treats code and models as shared infrastructure, funds development sustainably, and resists the concentration of power in a few centralized platforms.',
    },
    {
      id: 'faq-open-source',
      question: 'Is Achra open source?',
      answer:
        'Yes. Achra and the Powerhouse stack are released under the Daimon Dual Phase License (DDPL). In its first phase, the license requires contributors who build on the code to share improvements back, protecting early builders from one-sided extraction. After a defined change date, the code automatically converts to a permissive license, ensuring openness for the long term. The DDPL model balances sustainability with accessibility, making open-source development viable while keeping the infrastructure free for everyone over time.',
    },
    {
      id: 'faq-get-started',
      question: 'How do organizations, builders, and operators get started on Achra?',
      answer:
        'Organizations can create a network, post RFPs, and set up workstreams. Builders can register to discover funded projects and submit proposals. Operators can list their services in the marketplace and connect to resources.',
    },
  ],
]
