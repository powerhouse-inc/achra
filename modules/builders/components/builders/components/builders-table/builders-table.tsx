'use client'
import { ArrowRight, ArrowUpDown } from 'lucide-react'
import BuilderDomain from '@/modules/shared/components/builder-domain'
import BuilderProfile from '@/modules/shared/components/builder-profile'
import BuildersRolesChip from '@/modules/shared/components/chips/builders-roles-chip/builders-roles-chip'
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
import type { Team } from '@/modules/shared/types/team'
import { LastModified } from '../last-modified'
import { Links } from '../links'
import { SortEnum, useBuildersTable } from './use-builders-table'

export interface BuildersTableProps {
  builders: Team[]
  className?: string
}

export function BuildersTable({ builders, className }: BuildersTableProps) {
  const { headersSort, sortedBuilders, proccesedBuildersTableColumns, handleSortClick } =
    useBuildersTable({
      builders,
    })

  return (
    <Table variant="pills" className={cn('w-full', className)}>
      <TableHeader className="mb-2 inline-block w-full">
        <TableRow className="flex h-fit w-full justify-between border-b-0! p-4 xl:px-6">
          {proccesedBuildersTableColumns.map((column, index) => (
            <TableHead
              key={column.accessorKey}
              className={cn(
                'inline-block h-fit p-0!',
                column.isNumeric && 'text-right',
                index === 0 && 'w-[25%]',
                index === 1 && 'w-[20%]',
                index === 2 && 'w-[18%]',
                index === 3 && 'w-[13%]',
              )}
            >
              <Button
                variant="ghost"
                aria-label={`Sort ${column.header} column`}
                onClick={() => {
                  handleSortClick(index)
                }}
                className={cn(
                  '[&_path]:stroke-foreground/30 hover:[&_path]:stroke-foreground/50 active:[&_path]:stroke-foreground! h-fit p-0! font-semibold hover:bg-transparent lg:text-base/6 dark:hover:bg-transparent',
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
          <TableHead className="h-fit w-23 p-0! text-right" />
          <TableHead className="size-9 h-fit p-0! text-right" />
        </TableRow>
      </TableHeader>
      <TableBody className="flex flex-col gap-2">
        {sortedBuilders.map((builder) => (
          <TableRow
            key={builder.id}
            className="flex h-fit w-full cursor-pointer items-center justify-between border-b-0! p-4 xl:px-6"
            aria-label={`View ${builder.name} builder`}
          >
            <TableCell className="inline-block h-fit w-[25%] p-0!">
              <BuilderProfile
                name={builder.name}
                shortCode={builder.shortCode}
                status={builder.status}
                image={builder.image}
              />
            </TableCell>
            <TableCell className="inline-block h-fit w-[20%] p-0!">
              <BuildersRolesChip role={builder.role} />
            </TableCell>
            <TableCell className="inline-block h-fit w-[18%] p-0!">
              <BuilderDomain team={builder} />
            </TableCell>
            <TableCell className="inline-block h-fit w-[13%] p-0!">
              <LastModified team={builder} />
            </TableCell>
            <TableCell className="inline-block h-fit w-23 p-0! text-right">
              <Links />
            </TableCell>
            <TableCell className="inline-block size-9 h-fit p-0! text-right">
              <Button variant="outline" size="icon" aria-label="View builder team details">
                <ArrowRight className="size-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
