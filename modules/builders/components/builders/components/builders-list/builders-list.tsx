'use client'

import { ArrowRight } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { type MouseEvent, useCallback } from 'react'
import BuilderDomain from '@/modules/shared/components/builder-domain/builder-domain'
import BuilderProfile from '@/modules/shared/components/builder-profile/builder-profile'
import BuildersRolesChip from '@/modules/shared/components/chips/builders-roles-chip'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent, CardFooter } from '@/modules/shared/components/ui/card'
import { Separator } from '@/modules/shared/components/ui/separator'
import { cn } from '@/modules/shared/lib/utils'
import type { Team } from '@/modules/shared/types/team'
import { LastModified } from '../last-modified/last-modified'
import { Links } from '../links'
import type { Route } from 'next'

export interface BuildersListProps {
  builders: Team[]
  className?: string
}

export function BuildersList({ builders, className }: BuildersListProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleCardClick = useCallback(
    (event: MouseEvent<HTMLElement>, id: string) => {
      const target = event.target as HTMLElement

      if (target.closest('a')) return

      const nextPath = `${pathname.replace(/\/$/, '')}/${id}` as Route
      router.push(nextPath)
    },
    [pathname, router],
  )

  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      {builders.map((builder) => (
        <Card
          key={builder.id}
          className="w-full gap-2 overflow-hidden border-none pt-2 pb-1"
          onClick={(event) => {
            handleCardClick(event, builder.id)
          }}
        >
          <CardContent className="flex items-end justify-between px-2 md:grid md:grid-cols-[30%_17%_28%_80px]">
            <BuilderProfile
              name={builder.name}
              shortCode={builder.shortCode}
              status={builder.status}
              image={builder.image}
            />
            <div className="hidden flex-col gap-0.5 md:flex">
              <span className="text-foreground/30 text-sm/5.5 font-semibold">Scope</span>
              <BuilderDomain team={builder} domain="scope" isMobile />
            </div>
            <div className="hidden flex-col gap-0.5 md:flex">
              <span className="text-foreground/30 text-sm/5.5 font-semibold">Role</span>
              <BuildersRolesChip role={builder.role} />
            </div>
            <div className="flex gap-4 md:gap-2">
              <Links />
              <Button variant="outline" size="icon" aria-label="View builder team details">
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </CardContent>
          <CardContent className="flex items-end justify-between px-2 md:hidden">
            <div className="flex flex-col gap-1">
              <span className="text-foreground/30 text-xs/4.5 font-medium md:text-sm/5.5 md:font-semibold">
                Role
              </span>
              <BuildersRolesChip role={builder.role} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-foreground/30 text-xs/4.5 font-medium md:text-sm/5.5 md:font-semibold">
                Scope
              </span>
              <BuilderDomain team={builder} domain="scope" isMobile />
            </div>
          </CardContent>
          <Separator className="-mt-0.25" />
          <CardFooter className="bg-background -mt-1 w-full px-2">
            <LastModified team={builder} isMobile />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
