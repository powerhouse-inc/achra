import { useEffect } from "react";
import { refreshStripeAppearance } from "./stripe-connect.js";

/**
 * Keeps live Stripe embedded components in sync with the Connect theme:
 * re-pushes the token-derived appearance once on mount (the cached instance
 * may carry an appearance from a previous theme) and whenever the `.dark`
 * class on <html> flips.
 */
export function useStripeThemeSync(): void {
  useEffect(() => {
    const root = window.document.documentElement;
    let wasDark = root.classList.contains("dark");
    refreshStripeAppearance();
    const observer = new MutationObserver(() => {
      const isDark = root.classList.contains("dark");
      if (isDark !== wasDark) {
        wasDark = isDark;
        refreshStripeAppearance();
      }
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
}
