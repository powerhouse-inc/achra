/* eslint-disable react-hooks/rules-of-hooks, @typescript-eslint/no-invalid-void-type --
   Playwright's `test.extend(...)` callback receives a `use` callback as its
   second argument; the React-hooks rule mistakes this name for `React.use`.
   The `void` type on the auto-fixture mirrors Playwright's documented pattern
   for fixtures with no exposed value. */
import { test as base, type Page } from '@playwright/test'
import { BuilderProfilePage } from '../pages/builder-profile.page'
import { BuildersListPage } from '../pages/builders-list.page'
import { CasesPage } from '../pages/cases.page'
import { ServicePurchaseFlow } from '../pages/flows/service-purchase.flow'
import { HomePage } from '../pages/home.page'
import { NetworkDashboardPage } from '../pages/network-dashboard.page'
import { NetworkFinancesPage } from '../pages/network-finances.page'
import { NetworkRoadmapsPage } from '../pages/network-roadmaps.page'
import { NetworksPage } from '../pages/networks.page'
import { NotFoundPage } from '../pages/not-found.page'
import { OperatorPage } from '../pages/operator.page'
import { ServiceDetailPage } from '../pages/service-detail.page'
import { ServicesPage } from '../pages/services.page'
import { WorkstreamsPage } from '../pages/workstreams.page'
import { type ConsoleErrorRecorder, recordConsoleErrors } from '../support/console-errors'
import { installStorageReset } from '../support/storage'
import { type AuthFixture, buildAuthFixture } from './auth.fixture'

interface PomFixtures {
  homePage: HomePage
  networksPage: NetworksPage
  networkDashboardPage: NetworkDashboardPage
  networkFinancesPage: NetworkFinancesPage
  networkRoadmapsPage: NetworkRoadmapsPage
  buildersListPage: BuildersListPage
  builderProfilePage: BuilderProfilePage
  servicesPage: ServicesPage
  serviceDetailPage: ServiceDetailPage
  purchaseFlow: ServicePurchaseFlow
  operatorPage: OperatorPage
  casesPage: CasesPage
  workstreamsPage: WorkstreamsPage
  notFoundPage: NotFoundPage
  auth: AuthFixture
  consoleErrors: ConsoleErrorRecorder
}

interface AutoFixtures {
  cleanState: void
}

/**
 * Single source of truth for the e2e `test` runner. Specs import:
 *   `import { test, expect } from '@/../e2e/fixtures'`
 *
 * Adding a new POM here is a one-liner: import the class, type it on
 * PomFixtures, and add the factory below.
 */
export const test = base.extend<PomFixtures & AutoFixtures>({
  cleanState: [
    async ({ page }: { page: Page }, use: () => Promise<void>): Promise<void> => {
      await installStorageReset(page)
      await use()
    },
    { auto: true },
  ],

  homePage: async ({ page }, use): Promise<void> => {
    await use(new HomePage(page))
  },
  networksPage: async ({ page }, use): Promise<void> => {
    await use(new NetworksPage(page))
  },
  networkDashboardPage: async ({ page }, use): Promise<void> => {
    await use(new NetworkDashboardPage(page))
  },
  networkFinancesPage: async ({ page }, use): Promise<void> => {
    await use(new NetworkFinancesPage(page))
  },
  networkRoadmapsPage: async ({ page }, use): Promise<void> => {
    await use(new NetworkRoadmapsPage(page))
  },
  buildersListPage: async ({ page }, use): Promise<void> => {
    await use(new BuildersListPage(page))
  },
  builderProfilePage: async ({ page }, use): Promise<void> => {
    await use(new BuilderProfilePage(page))
  },
  servicesPage: async ({ page }, use): Promise<void> => {
    await use(new ServicesPage(page))
  },
  serviceDetailPage: async ({ page }, use): Promise<void> => {
    await use(new ServiceDetailPage(page))
  },
  purchaseFlow: async ({ page }, use): Promise<void> => {
    await use(new ServicePurchaseFlow(page))
  },
  operatorPage: async ({ page }, use): Promise<void> => {
    await use(new OperatorPage(page))
  },
  casesPage: async ({ page }, use): Promise<void> => {
    await use(new CasesPage(page))
  },
  workstreamsPage: async ({ page }, use): Promise<void> => {
    await use(new WorkstreamsPage(page))
  },
  notFoundPage: async ({ page }, use): Promise<void> => {
    await use(new NotFoundPage(page))
  },

  auth: async ({ page }, use): Promise<void> => {
    await use(buildAuthFixture(page))
  },

  consoleErrors: async ({ page }, use): Promise<void> => {
    const recorder = recordConsoleErrors(page)
    try {
      await use(recorder)
    } finally {
      recorder.dispose()
    }
  },
})

export { expect } from '@playwright/test'
