import React from 'react'
import { ExternalLinkButton } from '@/modules/shared/components/external-link-button'
import { InternalLinkButton } from '@/modules/shared/components/internal-link-buttoms'
import { RevenueCard } from './cards/revenue-card'
import { SpendingCard } from './cards/spending-card'

export function FinancesLegends() {
  return (
    <div className="mt-3.5 flex flex-col gap-4 md:mt-0 md:flex-col md:gap-6 xl:mt-3 xl:flex-col">
      <div className="flex flex-col gap-4 md:flex-row xl:flex-col">
        <div className="flex h-[248px] w-full flex-col gap-4">Chart</div>
        <div className="flex w-full flex-col gap-4 xl:flex-row xl:gap-8">
          <div className="xl:w-1/2">
            <RevenueCard />
          </div>
          <div className="xl:w-1/2">
            <SpendingCard />
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <ExternalLinkButton href="https://makerburn.com">makerburn.com</ExternalLinkButton>
        <InternalLinkButton href="/networks">Details</InternalLinkButton>
      </div>
    </div>
  )
}
