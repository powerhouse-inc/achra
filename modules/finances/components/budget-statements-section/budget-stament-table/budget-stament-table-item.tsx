import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { LastModified } from '@/modules/builders/components/builders/components/last-modified'
import { BuildersStatusChip } from '@/modules/shared/components/chips/builders-status-chip'
import { Button } from '@/modules/shared/components/ui/button'
import { TableCell, TableRow } from '@/modules/shared/components/ui/table'
import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import type { Team } from '@/modules/shared/types/team'
import { ContributorProfileInfo } from '../contributor-profile-info/contributor-profile-info'

export interface BudgetStamentTableItemProps {
  builder: Team
}

// px-2 py-3 xl:p-3 xl:pr-4 2xl:py-3 2xl:pr-4 2xl:pl-4
export function BudgetStamentTableItem({ builder }: BudgetStamentTableItemProps) {
  return (
    <TableRow
      key={builder.id}
      className="flex h-15.5! w-full cursor-pointer items-center justify-between rounded-none! border-b-0! px-2 xl:pr-4 2xl:pl-4"
    >
      <TableCell className="inline-block h-full w-[27%] p-0! py-3">
        <Link
          href={`/network/powerhouse/builders/${builder.id}`}
          className="flex h-full w-full items-center"
        >
          <ContributorProfileInfo
            name={builder.name}
            code={builder.code}
            isCoreUnit={true}
            icon={true}
          />
        </Link>
      </TableCell>
      <TableCell className="inline-block h-full w-[15%] p-0!">
        <Link
          href={`/network/powerhouse/builders/${builder.id}`}
          className="flex h-full w-full items-center"
        >
          <div>March 2023</div>
        </Link>
      </TableCell>
      <TableCell className="inline-block h-full w-[15%] p-0! text-right">
        <Link
          href={`/network/powerhouse/builders/${builder.id}`}
          className="flex h-full w-full items-center justify-start"
        >
          <div className="text-foreground text-sm/5.5 font-semibold">
            {usLocalizedNumber(1245555)} USD
          </div>
        </Link>
      </TableCell>
      <TableCell className="inline-block h-full w-[14%] p-0! text-right">
        <Link
          href={`/network/powerhouse/builders/${builder.id}`}
          className="flex h-full w-full items-center justify-start  "
        >
          <BuildersStatusChip status={builder.status} />
        </Link>
      </TableCell>

      <TableCell className="inline-block h-full w-[19%] p-0! text-right">
        <Link
          href={`/network/powerhouse/builders/${builder.id}`}
          className="flex h-full w-full items-center justify-start"
        >
          <span className="text-foreground text-sm/5.5 font-semibold">
            <LastModified team={builder} />
          </span>
        </Link>
      </TableCell>
      <TableCell className="inline-flex h-full w-[10%] p-0! text-right">
        <Link
          href={`/network/powerhouse/builders/${builder.id}`}
          className="group/link flex h-full w-full items-center justify-end"
        >
          <Button variant="outline" asChild className="pointer-events-none">
            <div>
              View
              <ArrowRight className="size-4 transition-transform duration-200 ease-in-out group-hover/link:translate-x-1.5" />
            </div>
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  )
}
