'use client'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/modules/shared/components/ui/button'
import { Table, TableHead, TableHeader, TableRow } from '@/modules/shared/components/ui/table'
import { cn } from '@/modules/shared/lib/utils'
import type { Team } from '@/modules/shared/types/team'
import { SortEnum, useBuildersTable } from './use-builders-table'

export interface BuildersTableProps {
  builders: Team[]
  className?: string
}

export function BuildersTable({ builders, className }: BuildersTableProps) {
  const { headersSort, proccesedBuildersTableColumns, handleSortClick } = useBuildersTable({
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
                index === 0 && 'w-[24%]',
                index === 1 && 'w-[16%]',
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
          <TableHead className="size-9 h-fit p-0! text-right" />
          <TableHead className="h-fit w-23 p-0! text-right" />
        </TableRow>
      </TableHeader>
    </Table>
  )
}
