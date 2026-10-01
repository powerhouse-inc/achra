// Raw NEXT_PUBLIC_* flag values, read in their own module on purpose.
//
// Container images are built with placeholder values (__NEXT_PUBLIC_<NAME>__)
// that the entrypoint replaces with the runtime env at start-up. If a flag were
// compared in the module that reads it (e.g. `process.env.X === 'true'`), the
// minifier would fold the comparison against the placeholder at build time and
// the runtime value could never take effect. Comparing in the importing module
// keeps the string literal in the bundle so it can be substituted.

export const PUBLIC_SHOW_WHITELIST_OVERLAY = process.env.NEXT_PUBLIC_SHOW_WHITELIST_OVERLAY

export const PUBLIC_LEAVE_PAGE_GUARD_ENABLED = process.env.NEXT_PUBLIC_LEAVE_PAGE_GUARD_ENABLED

export const PUBLIC_ENABLE_SERVICE_PURCHASE_STORE_PERSISTENCE =
  process.env.NEXT_PUBLIC_ENABLE_SERVICE_PURCHASE_STORE_PERSISTENCE
