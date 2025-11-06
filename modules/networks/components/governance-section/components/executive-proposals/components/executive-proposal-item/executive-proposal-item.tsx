'use client'

import { ethers } from 'ethers'
import { ExternalLinkIcon } from 'lucide-react'
import { DateTime } from 'luxon'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/modules/shared/components/ui/badge'
import { Button } from '@/modules/shared/components/ui/button'
import { threeDigitsPrecisionHumanization } from '@/modules/shared/lib/humanization'
import { cn, isNumeric } from '@/modules/shared/lib/utils'
import type { ExtendedExecutiveProposal } from '@/modules/shared/types/makervote'

export interface ExecutiveProposalItemProps {
  executiveProposal: ExtendedExecutiveProposal
  isHat: boolean
  className?: string
}

interface HumanizedSkySupport {
  value: string
  suffix: string
}

export function ExecutiveProposalItem({
  executiveProposal,
  className,
  isHat,
}: ExecutiveProposalItemProps) {
  const skySupportEth = parseFloat(executiveProposal.spellData.skySupport)
  const { value: skySupportValue, suffix: skySupportSuffix }: HumanizedSkySupport = isNumeric(
    skySupportEth,
  )
    ? threeDigitsPrecisionHumanization(skySupportEth)
    : { value: 'N/A', suffix: '' }

  return (
    <div
      className={cn(
        'bg-background outline-border grid grid-cols-1 gap-2 rounded-xl outline md:grid-cols-[1fr_auto] md:gap-0',
        className,
      )}
    >
      <div className="flex h-fit flex-col gap-2 p-2 lg:gap-3 lg:p-4">
        <span className="text-foreground text-xs/4.5 font-medium lg:text-sm/5.5 lg:font-semibold xl:text-base/6">
          {executiveProposal.proposalBlurb}
        </span>
        <div className="flex flex-col justify-between gap-2 xl:flex-row xl:items-center">
          <div className="text-foreground/50 order-2 flex flex-col gap-0.5 text-xs/4.5 font-medium sm:flex-row sm:gap-2 xl:order-1 xl:text-sm/5.5 xl:font-semibold">
            {executiveProposal.spellData.datePassed && executiveProposal.spellData.dateExecuted ? (
              <>
                <span>{`Passed on ${DateTime.fromISO(executiveProposal.spellData.datePassed)
                  .toUTC()
                  .toFormat("LLL dd yyyy HH:mm 'UTC'")
                  .toUpperCase()}`}</span>
                <span className="hidden sm:inline">-</span>
                <span>{`Executed on ${DateTime.fromISO(executiveProposal.spellData.dateExecuted)
                  .toUTC()
                  .toFormat("LLL dd yyyy HH:mm 'UTC'")
                  .toUpperCase()}`}</span>
              </>
            ) : (
              <span>{`Expires at ${DateTime.fromISO(executiveProposal.spellData.expiration)
                .toUTC()
                .toFormat("LLL dd yyyy HH:mm 'UTC'")
                .toUpperCase()}`}</span>
            )}
          </div>
          {isHat && executiveProposal.address !== ethers.ZeroAddress && (
            <Badge variant="success" className="order-1 uppercase xl:order-2">
              Governing Proposal
            </Badge>
          )}
        </div>
      </div>
      <div className="flex h-fit items-center justify-between px-2 md:h-full md:gap-4 lg:pl-4 xl:gap-8 xl:pr-4 xl:pl-2 2xl:px-12">
        <div className="flex flex-col items-center gap-0.25 p-2 sm:min-w-30 md:min-w-fit lg:min-w-30">
          <span className="text-foreground/50 text-sm/5.5 font-semibold xl:text-base/6">
            Supporters
          </span>
          <span className="text-foreground text-sm/5.5 font-semibold xl:text-base/6">
            {executiveProposal.supporters.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col items-center gap-0.5 p-2 sm:min-w-30 md:min-w-fit md:items-end lg:min-w-30">
          <span className="text-foreground/50 text-sm/5.5 font-semibold xl:text-base/6">
            SKY Support
          </span>
          <div className="flex w-fit items-center gap-1">
            <span className="text-foreground text-sm/5.5 font-semibold xl:text-base/6">
              {`${skySupportValue}${skySupportSuffix}`}
            </span>
            {skySupportValue !== 'N/A' && (
              <Image src="/networks/logos/sky-vote.png" alt="Sky Vote" width={20} height={20} />
            )}
          </div>
        </div>
        <div className="flex w-fit justify-end sm:min-w-30 md:min-w-fit">
          <Button variant="outline" size="default" asChild className="w-9 lg:w-fit">
            <Link
              href={`https://vote.sky.money/executive/${executiveProposal.key}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View executive proposal"
            >
              <span className="hidden lg:block">View</span>
              <ExternalLinkIcon className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
