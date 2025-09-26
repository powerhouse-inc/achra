import { ArrowRight, Copy } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/modules/shared/components/ui/button'
import { cn } from '@/modules/shared/lib/utils'
import type { Wallet } from '../../../../wallets-section'

export interface WalletsListProps {
  wallets: Wallet[]
  className?: string
  onCopyAddress: (address: string) => void
}

export function WalletsList({ wallets, className, onCopyAddress }: WalletsListProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {wallets.map((wallet) => (
        <div key={wallet.id} className="flex flex-col gap-2 rounded-xl p-2 shadow-xs">
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
                      {wallet.address}
                    </Link>
                  </div>
                  <Button
                    variant="icon"
                    size="iconXsm"
                    onClick={() => {
                      onCopyAddress(wallet.address)
                    }}
                  >
                    <Copy className="size-4" />
                  </Button>
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
