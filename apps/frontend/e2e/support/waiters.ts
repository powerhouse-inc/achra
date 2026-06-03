import type { Page } from '@playwright/test'

/**
 * Waits until the page has no in-flight network requests for `idleMs` ms.
 * Lighter than `networkidle` and tunable per call site. Prefer this over
 * `page.waitForLoadState('networkidle')` for pages with chatty TanStack Query
 * background polling.
 */
export async function waitForNetworkQuiet(
  page: Page,
  idleMs = 500,
  totalTimeoutMs = 15_000,
): Promise<void> {
  let inflight = 0
  let lastChange = Date.now()
  const startedAt = Date.now()

  const onRequest = (): void => {
    inflight += 1
    lastChange = Date.now()
  }
  const onSettled = (): void => {
    inflight = Math.max(0, inflight - 1)
    lastChange = Date.now()
  }

  page.on('request', onRequest)
  page.on('requestfinished', onSettled)
  page.on('requestfailed', onSettled)

  try {
    while (Date.now() - startedAt < totalTimeoutMs) {
      if (inflight === 0 && Date.now() - lastChange >= idleMs) return
      await page.waitForTimeout(50)
    }
  } finally {
    page.off('request', onRequest)
    page.off('requestfinished', onSettled)
    page.off('requestfailed', onSettled)
  }
}

/**
 * Resolves once the next response matching `urlOrPattern` arrives. Useful for
 * binding an action (e.g. clicking a filter) to its resulting GraphQL call.
 */
export async function waitForGraphQL(
  page: Page,
  operationName?: string,
  timeoutMs = 10_000,
): Promise<void> {
  await page.waitForResponse(
    (response) => {
      if (!response.url().includes('graphql')) return false
      if (!operationName) return true
      const request = response.request()
      const postData = request.postData() ?? ''
      return postData.includes(`"operationName":"${operationName}"`)
    },
    { timeout: timeoutMs },
  )
}
