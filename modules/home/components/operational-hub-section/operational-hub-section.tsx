import Link from 'next/link'

import { Button } from '@/shared/components/ui/button'
import { OPERATIONAL_HUB_URL } from '@/shared/config/constants'

import { DashboardCard } from './dashboard-card'

function OperationalHubSection() {
  return (
    <section
      className="w-full px-6 py-16 sm:px-10 sm:py-20 lg:py-24"
      aria-labelledby="operational-hub-heading"
    >
      <div className="container grid max-w-2xl grid-cols-1 items-center gap-12 xl:max-w-none xl:grid-cols-2 xl:gap-x-16 xl:gap-y-0">
        <div className="order-2 flex justify-center xl:order-1 xl:justify-end">
          <DashboardCard />
        </div>

        <div className="order-1 flex flex-col items-center gap-8 text-center xl:order-2 xl:items-start xl:text-left">
          <div className="flex flex-col gap-4">
            <h2
              id="operational-hub-heading"
              className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
            >
              Set up Your Operational Hub
            </h2>
            <div className="text-muted-foreground [&_b]:text-foreground text-lg leading-[150%] tracking-[-0.012em] [&_b]:font-medium">
              <p>A lightweight operational layer for modern, distributed teams.</p>
              <p>
                Run <b>invoicing</b>, <b>payouts</b>, <b>reporting</b>, and <b>compliance</b>{' '}
                through a single entity without ops becoming a second job.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center xl:justify-start">
            <Button asChild size="lg" className="rounded-lg border-0 px-5 text-sm font-medium">
              <Link href={OPERATIONAL_HUB_URL} target="_blank" rel="noopener noreferrer">
                Schedule a Call
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border text-foreground hover:bg-accent h-10 rounded-lg bg-transparent text-sm font-medium"
            >
              <Link
                href="https://operationalhub.io/opshub"
                target="_blank"
                rel="noopener noreferrer"
              >
                More Info
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export { OperationalHubSection }
