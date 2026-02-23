'use client'

import { CheckIcon, LinkIcon } from 'lucide-react'
import Link from 'next/link'
import AchraLarge from '@/modules/shared/components/svgs/achra-large.svg'
import AchraRounded from '@/modules/shared/components/svgs/achra-rounded.svg'
import BookCall from '@/modules/shared/components/svgs/book-call.svg'
import PhoneLarge from '@/modules/shared/components/svgs/phone-large.svg'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { cn } from '@/modules/shared/lib/utils'
import { OPERATIONAL_HUB_URL } from '../../config/constants'
import { useServicePurchaseState } from '../../providers/service-purchase-store-provider'
import { ActionCard } from './action-card'
import type { Route } from 'next'

function ConfirmationStep() {
  const { requestEntityData } = useServicePurchaseState()

  return (
    <Card className="bg-background border-border mt-16 w-full self-center rounded-lg p-6 shadow-xs md:max-w-156">
      <CardContent className={cn('flex flex-col items-center gap-6 px-0')}>
        <div className="flex flex-col items-center gap-4">
          <div className="bg-muted w-fit rounded-lg p-2">
            <CheckIcon className="text-foreground size-6" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-foreground text-lg/5.5 font-bold">
              Request Successfully Sent!
            </span>
            <span className="text-foreground/50 text-center text-sm/5.5">
              Thank you{' '}
              <span className="text-primary font-semibold">{requestEntityData?.name}</span>!<br />{' '}
              We have emailed the summary to{' '}
              <span className="text-primary">{requestEntityData?.email}</span>
              <br /> We will contact you shortly to schedule an introduction meeting!
            </span>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {/* TODO: extract link to a constant file */}
          <Link href={OPERATIONAL_HUB_URL}>
            <ActionCard
              icon={<BookCall className="size-6 min-w-6 rounded-md" />}
              title="Book a Call"
              description="Schedule a call to get started"
              bgImage={<PhoneLarge className="absolute top-0 right-0 h-full" />}
            />
          </Link>
          <Link href="/services">
            <ActionCard
              icon={<AchraRounded className="size-6 min-w-6 rounded-md" />}
              title="Explore ACHRA"
              description="Learn more about the ecosystem and other available"
              bgImage={<AchraLarge className="absolute top-0 right-0 h-full" />}
            />
          </Link>
        </div>

        {requestEntityData?.driveUrl && (
          <Button variant="outline" className="w-full" asChild>
            <Link
              href={requestEntityData.driveUrl as Route}
              target="_blank"
              rel="noopener noreferrer"
            >
              Share Configuration <LinkIcon className="size-4" />
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export { ConfirmationStep }
