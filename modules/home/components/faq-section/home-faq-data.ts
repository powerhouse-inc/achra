export interface HomeFaqItem {
  id: string
  question: string
  answer: string
}

/** Two columns of FAQs — copy matches Framer (product name Achra for this site). */
export const HOME_FAQ_COLUMNS: HomeFaqItem[][] = [
  [
    {
      id: 'faq-legal-compliance',
      question: 'How does Achra handle legal and compliance?',
      answer:
        'Achra provides a framework that integrates legal and compliance requirements directly into the operational workflow. This includes automated KYC/AML checks, smart contract-based governance rules, and tools for generating legally binding documents. By embedding these processes, Achra ensures that all activities on the platform adhere to relevant regulations, reducing the risk of non-compliance.',
    },
    {
      id: 'faq-on-off-chain',
      question: 'Can Achra be used for both on-chain and off-chain activities?',
      answer:
        'Yes, Achra is designed to bridge the gap between on-chain and off-chain operations. It supports on-chain governance and transactions while also providing tools for managing off-chain tasks like legal documentation, payroll, and project management. This hybrid approach allows organizations to leverage the benefits of blockchain technology while maintaining the necessary connections to traditional business processes.',
    },
    {
      id: 'faq-blockchain-networks',
      question: 'Is Achra compatible with existing blockchain networks?',
      answer:
        "Achra is built to be chain-agnostic, meaning it can integrate with various blockchain networks. Currently, it supports major networks like Ethereum and Polygon, with plans to expand to other ecosystems. This flexibility allows organizations to choose the network that best fits their needs while still benefiting from Achra's comprehensive management tools.",
    },
    {
      id: 'faq-data-security',
      question: "How does Achra ensure the security of my organization's data?",
      answer:
        "Security is a top priority for Achra. The platform uses advanced encryption and decentralized storage solutions to protect sensitive data. Additionally, all smart contracts used by Achra undergo rigorous audits by leading security firms. Users also have full control over their data and can manage access permissions through the platform's robust identity management system.",
    },
    {
      id: 'faq-new-org-support',
      question: 'What kind of support does Achra offer for new organizations?',
      answer:
        'Achra offers a range of support services to help new organizations get started. This includes comprehensive documentation, video tutorials, and a dedicated support team. Additionally, Achra provides onboarding assistance and consulting services for organizations with complex needs, ensuring a smooth transition to the platform.',
    },
  ],
  [
    {
      id: 'faq-costs',
      question: 'What are the costs associated with using Achra?',
      answer:
        'Achra offers a tiered pricing model based on the size and needs of the organization. There is a free tier for small teams and startups, as well as premium tiers with advanced features and higher usage limits. Detailed pricing information can be found on our pricing page, and we also offer custom enterprise solutions for large-scale organizations.',
    },
    {
      id: 'faq-governance-customize',
      question: 'Can I customize the governance rules for my organization?',
      answer:
        'Absolutely. Achra provides a highly flexible governance engine that allows organizations to define their own rules and processes. This includes setting voting thresholds, defining roles and permissions, and creating custom proposal types. These rules are encoded into smart contracts, ensuring they are executed transparently and automatically.',
    },
    {
      id: 'faq-disputes',
      question: 'How does Achra handle dispute resolution?',
      answer:
        'Achra includes built-in tools for dispute resolution, ranging from simple internal voting mechanisms to integration with external decentralized arbitration services like Kleros. Organizations can choose the method that best suits their needs and incorporate it into their governance framework. This ensures that any conflicts can be resolved fairly and efficiently within the platform.',
    },
    {
      id: 'faq-mobile-app',
      question: 'Is there a mobile app for Achra?',
      answer:
        "Currently, Achra is a web-based platform optimized for desktop and mobile browsers. We are actively developing a dedicated mobile app to provide a more seamless experience for users on the go. In the meantime, the web platform's responsive design ensures that all features are accessible and functional on mobile devices.",
    },
    {
      id: 'faq-integrations',
      question: 'Can Achra integrate with other tools we already use?',
      answer:
        'Yes, Achra is designed to be highly interoperable. It offers a range of APIs and pre-built integrations with popular tools like Slack, Discord, Google Workspace, and various project management software. This allows organizations to connect Achra with their existing workflows and data sources, creating a unified operational hub.',
    },
    {
      id: 'faq-get-started',
      question: 'How do I get started with Achra?',
      answer:
        'Getting started with Achra is easy. Simply visit our website and sign up for an account. You can then follow our step-by-step onboarding guide to set up your organization, invite team members, and start managing your operations. If you need any help along the way, our support team is always available to assist you.',
    },
  ],
]
