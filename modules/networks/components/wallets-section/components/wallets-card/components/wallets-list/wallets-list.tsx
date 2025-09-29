import { ArrowRight, Copy } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/modules/shared/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/modules/shared/components/ui/tooltip'
import { cn } from '@/modules/shared/lib/utils'
import { useWalletsList } from './use-wallets-list'
import type { ProccesedWallets } from '../../use-wallets-card'

export interface WalletsListProps {
  wallets: ProccesedWallets[]
  tooltip: string | null
  hoveredRowIndex: number | null
  onCopyAddress: (event: React.MouseEvent<HTMLButtonElement>, address: string) => void
  onCopyMouseEnter: (index: number) => void
  onCopyMouseLeave: () => void
  className?: string
}

export function WalletsList({
  wallets,
  tooltip,
  hoveredRowIndex,
  className,
  onCopyAddress,
  onCopyMouseEnter,
  onCopyMouseLeave,
}: WalletsListProps) {
  const { handleItemClick } = useWalletsList()
  return (
    <div className={cn('space-y-2', className)}>
      {wallets.map((wallet, index) => (
        <div
          key={wallet.id}
          className="flex cursor-pointer flex-col gap-2 rounded-xl p-2 shadow-xs"
          onClick={(event) => {
            handleItemClick(event, wallet.address)
          }}
        >
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="text-sm/5.5 font-semibold">{wallet.name}</span>
              <div className="flex items-center justify-between">
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
                      {wallet.shortAddress}
                    </Link>
                  </div>
                  <Tooltip open={!!tooltip && hoveredRowIndex === index}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="icon"
                        size="iconXsm"
                        onClick={(event) => {
                          onCopyAddress(event, wallet.address)
                        }}
                        onMouseEnter={() => {
                          onCopyMouseEnter(index)
                        }}
                        onMouseLeave={onCopyMouseLeave}
                      >
                        <Copy className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      className="pointer-events-none max-w-66"
                      side="bottom"
                      align="start"
                      arrowPadding={16}
                    >
                      {tooltip}
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
            <Button variant="outline" size="icon" asChild>
              <Link href="/network/powerhouse#wallets" target="_blank">
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="flex justify-between px-2 py-1">
            <span className="text-foreground/50 text-sm/5.5 font-semibold">Balance (USDS)</span>
            <span className="text-foreground text-sm/5.5 font-semibold">{wallet.usdsBalance}</span>
          </div>
          <div className="flex justify-between px-2 py-1">
            <span className="text-foreground/50 text-sm/5.5 font-semibold">Balance (SKY)</span>
            <span className="text-foreground text-sm/5.5 font-semibold">{wallet.skyBalance}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
