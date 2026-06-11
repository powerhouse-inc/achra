import { gql } from "graphql-tag";
import type { DocumentNode } from "graphql";

export const schema: DocumentNode = gql`
  """
  Stripe Connect mutations: operator onboarding and webhook processing.
  The Stripe secret key only lives in the reactor process — browser code
  must go through these mutations.
  """
  type Mutation {
    Stripe_createConnectAccount(
      input: Stripe_CreateConnectAccountInput!
    ): Stripe_CreateConnectAccountResult!
    Stripe_createConnectAccountSession(
      input: Stripe_CreateConnectAccountSessionInput!
    ): Stripe_CreateConnectAccountSessionResult!
    Stripe_syncConnectAccount(
      input: Stripe_SyncConnectAccountInput!
    ): Stripe_SyncConnectAccountResult!
    Stripe_processStripeWebhookEvent(
      input: Stripe_ProcessStripeWebhookEventInput!
    ): Boolean!
  }

  input Stripe_CreateConnectAccountInput {
    "Id of the payment-account document the connected account belongs to"
    documentId: String!
    "PHID of the operator's builder profile (stored as account metadata)"
    operatorId: String
    email: String
    "ISO 3166-1 alpha-2 country code; defaults to US"
    country: String
  }

  type Stripe_CreateConnectAccountResult {
    stripeAccountId: String!
  }

  input Stripe_CreateConnectAccountSessionInput {
    stripeAccountId: String!
  }

  type Stripe_CreateConnectAccountSessionResult {
    clientSecret: String!
    """
    Requested embedded components the platform has NOT enabled (Stripe
    Dashboard -> Settings -> Connect -> Embedded components). Stripe silently
    drops them from the session and their iframes render nothing, so clients
    surface this list instead of showing a blank component.
    """
    disabledComponents: [String!]!
  }

  input Stripe_SyncConnectAccountInput {
    stripeAccountId: String!
  }

  type Stripe_SyncConnectAccountResult {
    chargesEnabled: Boolean!
    payoutsEnabled: Boolean!
    detailsSubmitted: Boolean!
    requirementsCurrentlyDue: [String!]!
    disabledReason: String
  }

  input Stripe_ProcessStripeWebhookEventInput {
    rawBody: String!
    stripeSignature: String!
  }
`;
