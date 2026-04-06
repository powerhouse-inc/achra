import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/shared/components/ui/button'
import { OPERATIONAL_HUB_URL } from '@/shared/config/constants'
import { cn } from '@/shared/lib/utils'

const OPERATIONAL_HUB_MORE_INFO_URL = 'https://operationalhub.io/opshub'

const bodyClass = 'text-lg leading-[150%] tracking-[-0.012em] text-[rgb(87,87,87)]'
const keywordClass = 'font-medium text-[rgb(10,10,10)]'

function OperationalHubSection() {
  return (
    <section
      className="w-full bg-[rgb(250,249,247)] px-6 py-16 sm:px-10 sm:py-20 lg:py-24"
      aria-labelledby="operational-hub-heading"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-0">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2
              id="operational-hub-heading"
              className="text-3xl font-semibold tracking-tight text-balance text-[rgb(10,10,10)] sm:text-4xl"
            >
              Set up Your Operational Hub
            </h2>
            <div className="flex flex-col gap-4">
              <p className={bodyClass}>
                A lightweight operational layer for modern, distributed teams.
              </p>
              <p className={bodyClass}>
                Run <span className={keywordClass}>invoicing</span>,{' '}
                <span className={keywordClass}>payouts</span>,{' '}
                <span className={keywordClass}>reporting</span>, and{' '}
                <span className={keywordClass}>compliance</span> through a single entity without ops
                becoming a second job.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button
              asChild
              size="lg"
              className={cn(
                'h-10 rounded-lg border-0 px-5 text-sm font-medium text-white',
                'bg-[rgb(122,58,255)] hover:bg-[rgb(122,58,255)]/90',
              )}
            >
              <Link href={OPERATIONAL_HUB_URL} target="_blank" rel="noopener noreferrer">
                Schedule a Call
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-10 rounded-lg border-[rgb(201,201,201)] bg-transparent text-sm font-medium text-[rgb(10,10,10)] hover:bg-black/[0.04]"
            >
              <Link href={OPERATIONAL_HUB_MORE_INFO_URL} target="_blank" rel="noopener noreferrer">
                More Info
              </Link>
            </Button>
          </div>
        </div>

        <div>
          <div className="relative w-full overflow-hidden rounded-xl bg-[rgb(240,240,240)] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
            <Image
              src="/home/operational-hub/hero.png"
              alt="Operational Hub dashboard and workflows preview"
              width={792}
              height={1052}
              className="h-auto w-full object-cover object-top"
              sizes="(min-width: 1024px) 480px, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export { OperationalHubSection }
