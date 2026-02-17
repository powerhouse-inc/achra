'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import SimpleBar from 'simplebar-react'
import type { BuilderProfileState } from '@/modules/__generated__/graphql/switchboard-generated'
import BuilderProfile from '@/modules/shared/components/builder-profile/builder-profile'
import { BuilderSkills } from '@/modules/shared/components/builder-skills'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent, CardFooter } from '@/modules/shared/components/ui/card'
import { Separator } from '@/modules/shared/components/ui/separator'
import { cn } from '@/modules/shared/lib/utils'
import { BuildersSkeleton } from '../../builders-skeleton'
import { LastModified } from '../last-modified/last-modified'
import { Links } from '../links'
import { NoBuildersFound } from '../no-builders-found/no-builders-found'
import { useBuildersList } from './use-builders-list'
import type { Route } from 'next'

export interface BuildersListProps {
  builders: BuilderProfileState[]
  networkSlug: string
  className?: string
  asSectionContent?: boolean
}

export function BuildersList({
  builders,
  networkSlug,
  className,
  asSectionContent = false,
}: BuildersListProps) {
  const { simpleBarRef, cardContentRef, itemsWrapperRef, isResetPending, isSkillsPending } =
    useBuildersList({
      builders,
      asSectionContent,
    })
  return (
    <div className={cn('w-full', className)}>
      {isResetPending || isSkillsPending ? (
        <BuildersSkeleton />
      ) : builders.length === 0 ? (
        <NoBuildersFound />
      ) : (
        <div ref={cardContentRef}>
          <SimpleBar
            ref={simpleBarRef}
            className={cn('-mt-2 pt-2', !asSectionContent && '-mx-2 px-2 pb-2')}
            autoHide={false}
          >
            <div
              ref={itemsWrapperRef}
              className={cn('flex w-full flex-col gap-2', asSectionContent && 'px-2 pb-2')}
            >
              {builders.map((builder) => (
                <Link
                  href={`/network/${networkSlug}/builders/${builder.slug}` as Route}
                  key={builder.id}
                >
                  <Card className="bg-background w-full gap-2 overflow-hidden border-none pt-2 pb-1">
                    <CardContent className="flex items-end justify-between px-2 md:grid md:grid-cols-[38%_37%_80px]">
                      <BuilderProfile
                        name={builder.name}
                        code={builder.code}
                        status={builder.status}
                        image={builder.icon}
                      />
                      <div className="hidden flex-col gap-0.5 md:flex">
                        <span className="text-foreground/30 text-sm/5.5 font-semibold">Skills</span>
                        <BuilderSkills skills={builder.skills} />
                      </div>
                      <div className="flex gap-4 md:gap-2">
                        <Links links={builder.links} />
                        <Button
                          variant="outline"
                          size="icon"
                          aria-label="View builder team details"
                        >
                          <ArrowRight className="size-4" />
                        </Button>
                      </div>
                    </CardContent>
                    <CardContent className="flex items-end px-2 md:hidden">
                      <div className="flex flex-col gap-1">
                        <span className="text-foreground/30 text-xs/4.5 font-medium md:text-sm/5.5 md:font-semibold">
                          Skills
                        </span>
                        <BuilderSkills skills={builder.skills} />
                      </div>
                    </CardContent>
                    <Separator className="-mt-0.25" />
                    <CardFooter className="bg-background -mt-1 w-full px-2">
                      <LastModified lastModified={builder.lastModified} isMobile />
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </SimpleBar>
        </div>
      )}
    </div>
  )
}
