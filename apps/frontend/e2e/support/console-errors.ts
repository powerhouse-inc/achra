import type { ConsoleMessage, Page } from '@playwright/test'

/**
 * Substrings of console-error / pageerror messages that are known third-party
 * noise on the staging build and not signal of a regression. Add to this list
 * sparingly and with a comment explaining the source.
 */
const ALLOWLIST: readonly RegExp[] = [
  // React DevTools download nag emitted in dev builds.
  /Download the React DevTools/i,
  // Recharts emits this warning on responsive containers when width/height = 0
  // during initial mount; harmless and resolves on first paint.
  /The width\(\d+\) and height\(\d+\) of chart should be greater than 0/i,
  // Next.js DevTools websocket noise during page transitions.
  /\[Fast Refresh\]/i,
  // GraphQL Suspense boundary warnings during initial hydration.
  /A component suspended while responding to synchronous input/i,
]

export interface ConsoleErrorRecorder {
  errors: string[]
  /** Throws if any non-allowlisted console error or pageerror was captured. */
  assertNone: () => void
  /** Detaches listeners. */
  dispose: () => void
}

export function recordConsoleErrors(page: Page): ConsoleErrorRecorder {
  const errors: string[] = []

  const onConsole = (msg: ConsoleMessage): void => {
    if (msg.type() !== 'error') return
    const text = msg.text()
    if (ALLOWLIST.some((pattern) => pattern.test(text))) return
    errors.push(`[console.error] ${text}`)
  }

  const onPageError = (err: Error): void => {
    const text = err.message
    if (ALLOWLIST.some((pattern) => pattern.test(text))) return
    errors.push(`[pageerror] ${text}`)
  }

  page.on('console', onConsole)
  page.on('pageerror', onPageError)

  return {
    errors,
    assertNone(): void {
      if (errors.length > 0) {
        throw new Error(`Captured ${errors.length} console error(s):\n${errors.join('\n')}`)
      }
    },
    dispose(): void {
      page.off('console', onConsole)
      page.off('pageerror', onPageError)
    },
  }
}
