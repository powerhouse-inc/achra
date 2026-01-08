'use client'
import { ArrowRight, ArrowUpDown } from 'lucide-react'
import Link from 'next/link'
import type { BuilderProfileState } from '@/modules/__generated__/graphql/switchboard-generated'
import BuilderProfile from '@/modules/shared/components/builder-profile'
import BuilderSkills from '@/modules/shared/components/builder-skills'
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
import { LastModified } from '../last-modified'
import { Links } from '../links'
import { SortEnum, useBuildersTable } from './use-builders-table'
import type { Route } from 'next'

export interface BuildersTableProps {
  builders: BuilderProfileState[]
  className?: string
  networkSlug: string
}

export function BuildersTable({ builders, className, networkSlug }: BuildersTableProps) {
  const { headersSort, sortedBuilders, proccesedBuildersTableColumns, handleSortClick } =
    useBuildersTable({
      builders,
    })

  return (
    <Table variant="pills" className={cn('w-full', className)}>
      <TableHeader className="mb-2 inline-block w-full">
        <TableRow className="flex h-fit w-full border-b-0! py-4">
          {proccesedBuildersTableColumns.map((column, index) => (
            <TableHead
              key={column.accessorKey}
              className={cn(
                'inline-block h-fit p-0!',
                column.isNumeric && 'text-right',
                index === 0 && 'w-[35%] pl-4! xl:pl-6!',
                index === 1 && 'w-[30%]',
                index === 2 && 'w-[24%]',
                index === 3 && 'flex-1',
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
          <TableHead className="h-fit flex-1 p-0!" />
          <TableHead className="h-fit p-0!" />
        </TableRow>
      </TableHeader>
      <TableBody className="flex flex-col gap-2">
        {sortedBuilders.map((builder) => {
          const builderLink = `/network/${networkSlug}/builders/${builder.slug ?? ''}` as Route
          return (
            <TableRow
              key={builder.id}
              className="flex h-fit w-full cursor-pointer items-center border-b-0!"
              aria-label={`View ${builder.name} builder`}
            >
              <TableCell className="inline-flex h-21.5 min-w-[35%] p-0!">
                <Link href={builderLink} className="w-full py-4! pr-0! pl-4! xl:pl-6!">
                  <BuilderProfile
                    name={builder.name}
                    code={builder.code}
                    status={builder.status}
                    image={builder.icon}
                  />
                </Link>
              </TableCell>
              <TableCell className="inline-flex h-21.5 min-w-[30%] items-center p-0!">
                <Link href={builderLink} className="w-full px-0! py-4!">
                  <BuilderSkills skills={builder.skils} className="h-fit" />
                </Link>
              </TableCell>
              <TableCell className="inline-flex h-21.5 flex-1 items-center p-0!">
                <Link href={builderLink} className="w-full px-0! py-4!">
                  <LastModified lastModified={builder.lastModified} />
                </Link>
              </TableCell>
              <TableCell className="inline-flex h-21.5 w-fit items-center justify-end p-0! text-right">
                <Link href={builderLink} className="py-4! pr-4! pl-0!">
                  <Links links={builder.links} />
                </Link>
              </TableCell>
              <TableCell className="inline-flex h-21.5 w-fit items-center p-0! text-right">
                <Link href={builderLink} className="py-4! pr-4! pl-0! xl:pr-6!">
                  <Button variant="outline" size="icon" aria-label="View builder team details">
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
