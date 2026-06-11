import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

let stripeClient: Stripe | null = null;

/**
 * Lazily instantiates the Stripe client so the reactor can boot without
 * STRIPE_SECRET_KEY — only calls into the stripe subgraph require it.
 *
 * The secret key is deliberately NOT prefixed with PH_CONNECT_: that prefix
 * is the Connect studio's vite `envPrefix`, so anything carrying it gets
 * exposed to the browser bundle. Only the publishable key may use it.
 */
export function getStripe(): Stripe {
  if (stripeClient) return stripeClient;
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set in the reactor environment (.env)",
    );
  }
  stripeClient = new Stripe(secretKey, {
    apiVersion: "2026-05-27.dahlia",
  });
  return stripeClient;
}

export function getWebhookSecret(): string | undefined {
  return process.env.STRIPE_WEBHOOK_SECRET;
}
