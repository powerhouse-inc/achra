import { ArrowRight, Copy } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { CopyButton } from '@/modules/shared/components/copy-butoon/copy-button'
import { Button } from '@/modules/shared/components/ui/button'
import { cn } from '@/modules/shared/lib/utils'
import { useWalletsList } from './use-wallets-list'
import type { ProccesedWallets } from '../../use-wallets-card'

export interface WalletsListProps {
  wallets: ProccesedWallets[]
  className?: string
}

export function WalletsList({ wallets, className }: WalletsListProps) {
  const { handleItemClick } = useWalletsList()
  return (
    <div className={cn('space-y-2', className)}>
      {wallets.map((wallet) => (
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
                  <CopyButton.Root value={wallet.address}>
                    <CopyButton.Tooltip
                      side="bottom"
                      tooltip="Copy Address"
                      copiedTooltip="Copied!"
                    >
                      <CopyButton.Trigger variant="icon" size="iconXsm">
                        <Copy />
                      </CopyButton.Trigger>
                    </CopyButton.Tooltip>
                  </CopyButton.Root>
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
            <span className="text-foreground text-sm/5.5 font-semibold">
              {wallet.usdsBalance.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between px-2 py-1">
            <span className="text-foreground/50 text-sm/5.5 font-semibold">Balance (SKY)</span>
            <span className="text-foreground text-sm/5.5 font-semibold">
              {wallet.skyBalance.toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
