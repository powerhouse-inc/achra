import { ChevronUp } from 'lucide-react'
import { motion } from 'motion/react'
import {
  StripedCard,
  StripedCardAction,
  StripedCardContent,
  StripedCardHeader,
  StripedCardTitle,
} from '@/modules/shared/components/striped-card'
import { Button } from '@/modules/shared/components/ui/button'
import { Separator } from '@/modules/shared/components/ui/separator'
import { cn } from '@/shared/lib/utils'
import { WalletsTable } from './components/wallets-table/wallets-table'
import { useWalletsCard } from './use-wallets-card'
import type { Wallet } from '../../wallets-section'

export interface WalletsCardProps {
  wallets: Wallet[]
  className?: string
}

export function WalletsCard({ wallets, className }: WalletsCardProps) {
  const { toogleWalletTable, usdsTotalBalance, skyTotalBalance, handleToogleWalletTable } =
    useWalletsCard({ wallets })
  return (
    <StripedCard className={cn('w-full', className)}>
      <StripedCardHeader className="grid-cols-[auto_auto] items-center px-4">
        <StripedCardTitle>{`Wallets: ${wallets.length || 0}`}</StripedCardTitle>
        <StripedCardAction className="flex items-center justify-between gap-10">
          <div className="flex items-center gap-3.5">
            <div className="flex items-center gap-2">
              <span className="text-accent-foreground text-base/6 font-semibold">
                {usdsTotalBalance}
              </span>
              <span className="text-accent-foreground/30 text-base/6 font-semibold">USDS</span>
            </div>
            <Separator orientation="vertical" className="h-5.5!" />
            <div className="flex items-center gap-2">
              <span className="text-accent-foreground text-base/6 font-semibold">
                {skyTotalBalance}
              </span>
              <span className="text-accent-foreground/30 text-base/6 font-semibold">SKY</span>
            </div>
          </div>
          <Button
            variant="icon"
            size="iconSm"
            className={cn('transition-all duration-300 ease-out', {
              'rotate-180': toogleWalletTable,
            })}
            onClick={handleToogleWalletTable}
          >
            <ChevronUp className="size-6" />
          </Button>
        </StripedCardAction>
      </StripedCardHeader>
      <StripedCardContent className="flex flex-col gap-2 p-0 text-sm leading-5.5 font-semibold">
        <motion.div
          initial={{
            opacity: 0,
            height: 0,
            marginBottom: 0,
          }}
          animate={{
            opacity: toogleWalletTable ? 1 : 0,
            height: toogleWalletTable ? 'auto' : 0,
            margin: toogleWalletTable ? '0 calc(var(--spacing) * 2)' : 0,
          }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
            height: { duration: 0.3, ease: 'easeInOut' },
            marginBottom: { duration: 0.3, ease: 'easeInOut' },
          }}
        >
          <WalletsTable wallets={wallets} />
        </motion.div>
      </StripedCardContent>
    </StripedCard>
  )
}
