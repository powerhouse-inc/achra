import { gql } from "graphql-tag";
import type { DocumentNode } from "graphql";

export const schema: DocumentNode = gql`
  """
  Subgraph definition
  """
  type Query {
    allNetworks(filter: networkFilter): [AllNetworks!]!
  }

  input networkFilter {
    networkSlug: String
  }

  type AllNetworks {
    id: PHID
    documentType: String
    network: Network
    builders: [Builder!]!
  }

  type Network {
    name: String!
    slug: String
    icon: String
    darkThemeIcon: String
    logo: String
    darkThemeLogo: String
    logoBig: String
    website: String
    description: String
    category: [NetworkCategory!]
    x: String
    github: String
    discord: String
    youtube: String
  }

  enum NetworkCategory {
    DEFI
    OSS
    CRYPTO
    NGO
    CHARITY
  }

  type Builder {
    id: PHID
    code: String
    slug: String
    name: String!
    icon: String!
    description: String!
    lastModified: DateTime
    isOperator: Boolean!
    operationalHubMember: OpHubMember!
    contributors: [Builder!]!
    status: BuilderStatus
    skills: [BuilderSkill!]!
    scopes: [BuilderScope!]!
    links: [BuilderLink!]!
  }

  type OpHubMember {
    name: String
    phid: PHID
  }

  enum BuilderStatus {
    ACTIVE
    INACTIVE
    ON_HOLD
    COMPLETED
    ARCHIVED
  }

  enum BuilderSkill {
    FRONTEND_DEVELOPMENT
    BACKEND_DEVELOPMENT
    FULL_STACK_DEVELOPMENT
    DEVOPS_ENGINEERING
    SMART_CONTRACT_DEVELOPMENT
    UI_UX_DESIGN
    TECHNICAL_WRITING
    QA_TESTING
    DATA_ENGINEERING
    SECURITY_ENGINEERING
  }

  enum BuilderScope {
    ACC
    STA
    SUP
    STABILITY_SCOPE
    SUPPORT_SCOPE
    PROTOCOL_SCOPE
    GOVERNANCE_SCOPE
  }

  type BuilderLink {
    id: OID!
    url: URL!
    label: String
  }
`;
