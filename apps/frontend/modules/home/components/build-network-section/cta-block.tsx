'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Fragment } from 'react'
import { AchraTabIsotype } from '@/modules/home/components/build-network-section/achra-tab-isotype'
import { TextFlip } from '@/modules/shared/components/text-flip'
import { CtaDecorativeIsotype } from './cta-decorative-isotype'
import { CtaMeshBackground } from './cta-mesh-background'

function CtaBlock() {
  return (
    <div className="flex h-full p-3">
      <Link
        href="/get-started"
        className="group focus-visible:ring-primary/30 relative isolate flex h-full min-h-[200px] w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl px-5 py-4 text-center transition-opacity hover:opacity-95 focus-visible:ring-[3px] focus-visible:outline-none sm:gap-4 sm:px-6"
      >
        <CtaMeshBackground />

        <CtaDecorativeIsotype className="pointer-events-none absolute -top-16 -left-16 z-1 size-48 sm:-top-25 sm:-left-25 sm:size-50" />

        <AchraTabIsotype variant="builders" isActive className="relative z-1" />

        <div className="relative z-1 flex flex-col gap-0.5">
          <h3 className="text-foreground text-lg font-semibold tracking-tight">Get started</h3>
          <p className="text-foreground max-w-[16rem] text-sm leading-snug">
            Begin your journey as <br />{' '}
            <TextFlip
              words={[
                <Fragment key="builder">
                  <span className="font-normal">a</span> Builder
                </Fragment>,
                <Fragment key="operator">
                  <span className="font-normal">an</span> Operator
                </Fragment>,
                <Fragment key="organization">
                  <span className="font-normal">an</span> Organization
                </Fragment>,
              ]}
              className="font-bold"
            />
          </p>
        </div>
        <span
          aria-hidden
          className="text-foreground relative z-1 mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm transition-shadow group-hover:shadow-md group-focus-visible:shadow-md"
        >
          <ArrowRight className="size-4" strokeWidth={2} />
        </span>
      </Link>
    </div>
  )
}

export { CtaBlock }
