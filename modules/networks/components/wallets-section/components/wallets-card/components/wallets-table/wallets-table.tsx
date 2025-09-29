import { ArrowRight, ArrowUpDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { CopyTooltip } from '@/modules/shared/components/copy-tooltip/copy-tooltip'
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
import { SortEnum, useWalletsTable } from './use-wallets-table'
import type { ProccesedWallets } from '../../use-wallets-card'

export interface WalletsTableProps {
  wallets: ProccesedWallets[]
  tooltip: string | null
  hoveredRowIndex: number | null
  onCopyAddress: (event: React.MouseEvent<HTMLButtonElement>, address: string) => void
  onCopyMouseEnter: (index: number) => void
  onCopyMouseLeave: () => void
  className?: string
}

export function WalletsTable({
  wallets,
  className,
  tooltip,
  hoveredRowIndex,
  onCopyMouseEnter,
  onCopyMouseLeave,
  onCopyAddress,
}: WalletsTableProps) {
  const {
    headersSort,
    sortedWallets,
    proccesedWalletsTableColumns,
    handleSortClick,
    handleRowClick,
  } = useWalletsTable({
    wallets,
  })

  return (
    <Table variant="pills" className={className}>
      <TableHeader>
        <TableRow>
          {proccesedWalletsTableColumns.map((column, index) => (
            <TableHead key={column.accessorKey} className={cn(column.isNumeric && 'text-right')}>
              <Button
                variant="ghost"
                onClick={() => {
                  handleSortClick(index)
                }}
                className={cn(
                  '[&_path]:stroke-foreground/30 hover:[&_path]:stroke-foreground/50 active:[&_path]:!stroke-foreground h-fit p-0! font-semibold hover:bg-transparent lg:text-base/6',
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
          <TableHead className="text-right" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedWallets.map((wallet, index) => (
          <TableRow
            key={wallet.id}
            className="cursor-pointer"
            onClick={(event) => {
              handleRowClick(event, wallet.address)
            }}
          >
            <TableCell>
              <span className="text-wrap">{wallet.name}</span>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="relative size-6 overflow-hidden rounded-full">
                    <Image
                      src={wallet.image}
                      alt={wallet.name}
                      fill
                      priority
                      className="absolute"
                    />
                  </div>
                  <Link
                    href="/network/powerhouse#wallets"
                    target="_blank"
                    className="font-normal text-(--status-progress)"
                  >
                    {wallet.shortAddress}
                  </Link>
                </div>
                <CopyTooltip
                  open={!!tooltip && hoveredRowIndex === index}
                  tooltip={tooltip}
                  onTriggerClick={(event) => {
                    onCopyAddress(event, wallet.address)
                  }}
                  onTriggerMouseEnter={() => {
                    onCopyMouseEnter(index)
                  }}
                  onTriggerMouseLeave={onCopyMouseLeave}
                />
              </div>
            </TableCell>
            <TableCell className="text-right">{wallet.usdsBalance}</TableCell>
            <TableCell className="text-right">{wallet.skyBalance}</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="icon" asChild>
                <Link href="/network/powerhouse#wallets" target="_blank">
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
