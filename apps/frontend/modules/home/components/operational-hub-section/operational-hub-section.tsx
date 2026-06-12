import { Button } from '@achra/ui/button'
import Link from 'next/link'
import { DecorationDots } from '@/modules/home/components/decoration-dots'
import { SectionHeading } from '@/modules/home/components/section-heading'
import { OPERATIONAL_HUB_URL } from '@/modules/shared/lib/constants'
import { Reveal } from '@/shared/components/reveal'
import { DashboardCard } from './dashboard-card'

function OperationalHubSection() {
  return (
    <section className="w-full py-16 sm:py-20 lg:py-24" aria-labelledby="operational-hub-heading">
      <div className="container mx-auto grid max-w-2xl grid-cols-1 items-center gap-12 xl:max-w-6xl xl:grid-cols-[minmax(0,24rem)_1fr] xl:gap-x-16 xl:gap-y-0">
        <div className="relative order-2 flex justify-center xl:order-1 xl:justify-end">
          {/* brand glow + dotted texture anchoring the live dashboard mock */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="bg-primary/15 absolute top-1/2 left-1/2 size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
            <div className="bg-fusion/10 absolute top-1/4 left-1/3 size-56 -translate-x-1/2 rounded-full blur-3xl" />
            <DecorationDots
              rows={7}
              columns={7}
              dotSize={3}
              gap={14}
              fade={{ direction: 'bottom-right', from: 0, to: 0.4 }}
              className="text-primary absolute -top-6 -left-2 opacity-60 sm:left-6"
            />
            <DecorationDots
              rows={6}
              columns={6}
              dotSize={3}
              gap={14}
              fade={{ direction: 'top-left', from: 0, to: 0.35 }}
              className="text-primary absolute -right-2 -bottom-6 opacity-60 sm:right-6"
            />
          </div>
          <Reveal y={48} className="relative">
            <DashboardCard />
          </Reveal>
        </div>

        <div className="order-1 flex flex-col items-center gap-8 text-center xl:order-2 xl:items-start xl:text-left">
          <div className="flex flex-col gap-4">
            <SectionHeading
              id="operational-hub-heading"
              title="Set up Your Operational Hub"
              highlight="Operational Hub"
              className="lg:text-4xl"
            />
            <Reveal delay={0.15}>
              <div className="text-foreground/80 [&_b]:text-foreground text-lg leading-[150%] tracking-[-0.012em] [&_b]:font-medium">
                <p>A lightweight operational layer for modern, distributed teams.</p>
                <p>
                  Run <b>invoicing</b>, <b>payouts</b>, <b>reporting</b>, and <b>compliance</b>{' '}
                  through a single entity without ops becoming a second job.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.25} className="w-full xl:w-auto">
            <div className="flex flex-row flex-wrap items-center justify-center gap-3 xl:justify-start">
              <Button
                asChild
                size="lg"
                className="shadow-primary rounded-lg border-0 px-5 text-sm font-medium"
              >
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
                  aria-label="Learn more about Operational Hub"
                >
                  More Info
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export { OperationalHubSection }
