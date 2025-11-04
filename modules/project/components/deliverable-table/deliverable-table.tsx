'use client'
import { ArrowUpDown } from 'lucide-react'

import type { ScopeOfWork_Deliverable } from '@/modules/__generated__/graphql/switchboard-generated'
import { getProgressPercentage } from '@/modules/roadmap/lib/type-helpers'
import { DeliverableStatusChip } from '@/modules/shared/components/chips/deliverable-status-chip'
import { Button } from '@/modules/shared/components/ui/button'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/modules/shared/components/ui/table'
import { cn } from '@/modules/shared/lib/utils'
import { SortEnum } from '@/modules/shared/types'
import { AvatarTitleAvatar, AvatarTitleRoot, AvatarTitleText } from '../avatar-title/avatar-title'
import { DeliverableListPopover } from '../deliverable-list-popover/deliverable-list-popover'
import { ProgressComponent } from '../progress-component/progress-component'
import { useDeliverableTable } from './use-deliverable-table'

export interface DeliverableTableProps {
  deliverables: ScopeOfWork_Deliverable[]
  className?: string
}

export function DeliverableTable({ deliverables, className }: DeliverableTableProps) {
  const { headersSort, sortedDeliverables, proccesedDeliverablesTableColumns, handleSortClick } =
    useDeliverableTable({
      deliverables,
    })

  return (
    <Table
      variant="pills"
      className={cn(
        '[&_table_tbody_tr]:hover:bg-popover! w-full bg-none [&_table]:flex [&_table]:flex-col [&_table_tbody_tr]:hover:shadow-xs! [&_table_tbody_tr]:hover:transition-none!',
        className,
      )}
    >
      <TableHeader className="block w-full">
        <TableRow className="flex h-fit w-full border-b-0! px-2 py-4 xl:p-4 xl:pl-3 2xl:p-4">
          {proccesedDeliverablesTableColumns.map((column, index) => (
            <TableHead
              key={column.accessorKey}
              className={cn(
                'h-fit shrink-0 p-0!',
                column.isNumeric && 'text-right',
                index === 0 && 'w-[22.9%] lg:w-[22.9%] xl:w-[22.3%]',
                index === 1 && 'w-[16.9%] lg:w-[16.9%] xl:w-[14.9%]',
                index === 2 && 'w-[13.7%] lg:w-[13.7%] xl:w-[17.8%]',
                index === 3 && 'w-[5.9%] lg:w-[5.9%] xl:w-[8.2%]',
                index === 4 && 'w-[15.3%] lg:w-[15.3%] xl:w-[13.4%]',
                index === 5 && 'w-[15.3%] lg:w-[15.3%] xl:w-[13.4%]',
              )}
            >
              <Button
                variant="ghost"
                onClick={() => {
                  handleSortClick(index)
                }}
                className={cn(
                  '[&_path]:stroke-foreground/30 hover:[&_path]:stroke-foreground/50 active:[&_path]:stroke-foreground! h-fit p-0! font-semibold hover:bg-transparent lg:text-base/6',
                  headersSort[index] === SortEnum.Asc &&
                    '[&_path:nth-child(3)]:stroke-foreground [&_path:nth-child(4)]:stroke-foreground hover:[&_path:nth-child(3)]:stroke-foreground/50 hover:[&_path:nth-child(4)]:stroke-foreground/50 hover:[&_path:nth-child(1)]:stroke-foreground/30 hover:[&_path:nth-child(2)]:stroke-foreground/30',
                  headersSort[index] === SortEnum.Desc &&
                    '[&_path:nth-child(1)]:stroke-foreground [&_path:nth-child(2)]:stroke-foreground hover:[&_path:nth-child(1)]:stroke-foreground/50 hover:[&_path:nth-child(2)]:stroke-foreground/50 hover:[&_path:nth-child(3)]:stroke-foreground/30 hover:[&_path:nth-child(4)]:stroke-foreground/30',
                )}
              >
                {column.header}
                <ArrowUpDown className="size-4" />
              </Button>
            </TableHead>
          ))}
          <TableHead className="h-fit w-[10%] shrink-0 p-0! text-right" />
        </TableRow>
      </TableHeader>
      <TableBody className="flex w-full translate-y-2 flex-col gap-2 sm:pb-2">
        {sortedDeliverables.map((deliverable) => (
          <TableRow
            key={deliverable.id}
            className="bg-popover hover:bg-popover! flex h-fit w-full items-center border-b-0! px-2 py-3 transition-none! hover:shadow-xs! xl:p-3 xl:pr-4 2xl:py-3 2xl:pr-4 2xl:pl-3.5"
          >
            <TableCell className="h-fit w-[22.9%] shrink-0 p-0! lg:w-[22.9%] xl:w-[22.3%]">
              <div className="flex items-center gap-2">
                <AvatarTitleRoot>
                  <AvatarTitleAvatar
                    src="https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png"
                    alt="Powerhouse OH"
                    className="size-8"
                  />
                  <AvatarTitleText>{deliverable.title}</AvatarTitleText>
                </AvatarTitleRoot>
              </div>
            </TableCell>
            <TableCell className="h-fit w-[16.9%] shrink-0 p-0! text-left lg:w-[16.9%] xl:w-[14.9%]">
              <div>
                <DeliverableStatusChip status={deliverable.status} />
              </div>
            </TableCell>
            <TableCell className="h-fit w-[13.7%] shrink-0 p-0! text-left lg:w-[13.7%] xl:w-[17.8%]">
              <div>
                <ProgressComponent
                  progress={getProgressPercentage(deliverable.workProgress ?? undefined)}
                />
              </div>
            </TableCell>
            <TableCell className="text-foreground h-fit w-[5.9%] shrink-0 p-0! text-right text-sm/5.5 font-semibold lg:w-[5.9%] xl:w-[8.2%]">
              {deliverable.budgetAnchor?.quantity} USD
            </TableCell>
            <TableCell className="text-foreground h-fit w-[15.3%] shrink-0 p-0! text-right text-sm/5.5 font-semibold lg:w-[15.3%] xl:w-[13.4%]">
              {deliverable.budgetAnchor?.unitCost.toLocaleString() ?? 0} USD
            </TableCell>
            <TableCell className="text-foreground h-fit w-[15.3%] shrink-0 p-0! text-right text-sm/5.5 font-semibold lg:w-[15.3%] xl:w-[13.4%]">
              {deliverable.budgetAnchor?.quantity && deliverable.budgetAnchor.unitCost
                ? (
                    deliverable.budgetAnchor.quantity * deliverable.budgetAnchor.unitCost
                  ).toLocaleString()
                : 0}
              USD
            </TableCell>
            <TableCell className="flex h-fit w-[10%] shrink-0 justify-end p-0!">
              <DeliverableListPopover
                keyResults={deliverable.keyResults}
                title="Deliverables"
                count={deliverable.keyResults.length}
                code="DR"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
