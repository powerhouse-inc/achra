import { callStripeSubgraph } from '@/shared/lib/switchboard-stripe-subgraph'

const PROCESS_STRIPE_WEBHOOK_EVENT_MUTATION = /* GraphQL */ `
  mutation ProcessStripeWebhookEvent($input: Stripe_ProcessStripeWebhookEventInput!) {
    Stripe_processStripeWebhookEvent(input: $input)
  }
`

// Stripe webhook events are a few KB; anything near this size is junk and
// not worth buffering or forwarding to the switchboard.
const MAX_BODY_BYTES = 1024 * 1024

/**
 * Forwarder. Stripe signs the raw request bytes, so we read the body as
 * text without parsing and pass it (with the signature header) to the
 * stripe subgraph, which holds the webhook secret and re-verifies. No
 * Stripe SDK or webhook secret in this process.
 */
export async function POST(request: Request) {
  const stripeSignature = request.headers.get('stripe-signature')
  if (!stripeSignature) {
    return Response.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0)
  if (contentLength > MAX_BODY_BYTES) {
    return Response.json({ error: 'Payload too large' }, { status: 413 })
  }

  const rawBody = await request.text()
  if (rawBody.length > MAX_BODY_BYTES) {
    return Response.json({ error: 'Payload too large' }, { status: 413 })
  }

  try {
    await callStripeSubgraph(PROCESS_STRIPE_WEBHOOK_EVENT_MUTATION, {
      input: { rawBody, stripeSignature },
    })
  } catch (error) {
    // Log the detail server-side; respond with a generic message so internal
    // errors (config, infrastructure) aren't echoed to whoever POSTed.
    const message = error instanceof Error ? error.message : 'Webhook handler error'
    // eslint-disable-next-line no-console -- surface webhook failures in server logs
    console.error(`[stripe webhook forwarder] ${message}`)
    return Response.json({ error: 'Webhook processing failed' }, { status: 400 })
  }

  return Response.json({ received: true })
}
