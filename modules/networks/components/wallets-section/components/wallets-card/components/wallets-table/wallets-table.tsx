import { ArrowRight, ArrowUpDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { CopyButton } from '@/modules/shared/components/copy-butoon/copy-button'
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

export function WalletsTable({ wallets, className }: WalletsTableProps) {
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
    <Table variant="pills" className={cn('w-full', className)}>
      <TableHeader className="mb-2 inline-block w-full">
        <TableRow className="flex h-fit w-full justify-between border-b-0! px-2 py-4 xl:p-4 xl:pl-3 2xl:p-4">
          {proccesedWalletsTableColumns.map((column, index) => (
            <TableHead
              key={column.accessorKey}
              className={cn(
                'inline-block h-fit p-0!',
                column.isNumeric && 'text-right',
                index === 0 && 'w-[24%]',
                index === 1 && 'w-[16%]',
                index === 2 && 'w-[24%]',
                index === 3 && 'w-[24%]',
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
          <TableHead className="size-9 h-fit p-0! text-right" />
        </TableRow>
      </TableHeader>
      <TableBody className="flex flex-col gap-2">
        {sortedWallets.map((wallet) => (
          <TableRow
            key={wallet.id}
            className="flex h-fit w-full cursor-pointer items-center justify-between border-b-0! px-2 py-3 xl:p-3 xl:pr-4 2xl:py-3 2xl:pr-4 2xl:pl-3.5"
            onClick={(event) => {
              handleRowClick(event, wallet.address)
            }}
          >
            <TableCell className="inline-block h-fit w-[24%] p-0!">
              <span className="text-wrap">{wallet.name}</span>
            </TableCell>
            <TableCell className="inline-block h-fit w-[16%] p-0!">
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
                    className="text-status-progress font-normal"
                  >
                    {wallet.shortAddress}
                  </Link>
                </div>
                <CopyButton value={wallet.address} tooltip="Copy Address." />
              </div>
            </TableCell>
            <TableCell className="inline-block h-fit w-[24%] p-0! text-right">
              {wallet.usdsBalance.toLocaleString()}
            </TableCell>
            <TableCell className="inline-block h-fit w-[24%] p-0! text-right">
              {wallet.skyBalance.toLocaleString()}
            </TableCell>
            <TableCell className="inline-block size-9 h-fit p-0! text-right">
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
