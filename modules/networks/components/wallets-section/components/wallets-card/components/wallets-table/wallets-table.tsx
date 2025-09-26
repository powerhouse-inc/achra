import { ArrowRight, ArrowUpDown, Copy } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
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
import { SortEnum, WALLETS_TABLE_COLUMNS } from './constants'
import { useWalletsTable } from './use-wallets-table'
import type { Wallet } from '../../../../wallets-section'

export interface WalletsTableProps {
  wallets: Wallet[]
}

export function WalletsTable({ wallets }: WalletsTableProps) {
  const { handleCopyAddress, onSortClick, headersSort, sortedWallets } = useWalletsTable({
    wallets,
  })

  return (
    <Table variant="pills">
      <TableHeader>
        <TableRow>
          {WALLETS_TABLE_COLUMNS.map((column, index) => (
            <TableHead key={column.accessorKey}>
              <Button
                variant="ghost"
                onClick={() => {
                  onSortClick(index)
                }}
                className={cn(
                  '[&_path]:stroke-foreground/30 hover:[&_path]:stroke-foreground/50 active:[&_path]:!stroke-foreground hover:bg-transparent',
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
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedWallets.map((wallet) => (
          <TableRow key={wallet.id}>
            <TableCell>{wallet.name}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="relative size-6 overflow-hidden rounded-full">
                    <Image
                      src={wallet.image}
                      alt={wallet.name}
                      fill
                      priority
                      quality={100}
                      objectFit="cover"
                      className="absolute"
                    />
                  </div>
                  <Link
                    href="/network/powerhouse#wallets"
                    target="_blank"
                    className="font-normal text-(--status-progress)"
                  >
                    {wallet.address}
                  </Link>
                </div>
                <Button
                  variant="icon"
                  size="iconXsm"
                  onClick={() => void handleCopyAddress(wallet.address)}
                >
                  <Copy className="size-4" />
                </Button>
              </div>
            </TableCell>
            <TableCell>{wallet.usdsBalance}</TableCell>
            <TableCell>{wallet.skyBalance}</TableCell>
            <TableCell>
              <Button variant="outline" size="icon">
                <ArrowRight className="size-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
