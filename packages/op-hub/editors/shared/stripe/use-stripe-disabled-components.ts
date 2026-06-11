import { useSyncExternalStore } from "react";
import {
  getDisabledStripeComponents,
  subscribeDisabledStripeComponents,
} from "./stripe-connect.js";

/**
 * The embedded components Stripe reported as NOT enabled for the platform in
 * the latest account session for this account (empty until a session has been
 * created). Lets views explain a disabled component instead of rendering the
 * blank iframe Stripe produces for it.
 */
export function useStripeDisabledComponents(accountId: string): string[] {
  return useSyncExternalStore(subscribeDisabledStripeComponents, () =>
    getDisabledStripeComponents(accountId),
  );
}
