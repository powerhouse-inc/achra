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
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import { cn } from '@/shared/lib/utils'
import { WalletsList } from './components/wallets-list/wallets-list'
import { WalletsTable } from './components/wallets-table/wallets-table'
import { useWalletsCard } from './use-wallets-card'
import type { Wallet } from '../../wallets-section'

export interface WalletsCardProps {
  wallets: Wallet[]
  className?: string
}

export function WalletsCard({ wallets, className }: WalletsCardProps) {
  const {
    toogleWalletTable,
    usdsTotalBalance,
    skyTotalBalance,
    hoveredRowIndex,
    tooltip,
    proccesedWallets,
    handleToogleWalletTable,
    handleCopyMouseEnter,
    handleCopyMouseLeave,
    handleCopyAddress,
  } = useWalletsCard({ wallets })
  const isMobile = useMediaQuery({ to: 'md' })
  return (
    <StripedCard className={cn('w-full', className)}>
      <StripedCardHeader className="grid-cols-[auto_auto] items-center px-4">
        <StripedCardTitle className="text-sm/5.5 md:text-base/6">{`Wallets: ${wallets.length || 0}`}</StripedCardTitle>
        <StripedCardAction className="flex items-center justify-between gap-6 md:gap-8 lg:gap-10">
          <div className="flex flex-col items-end gap-0 text-sm/5.5 md:flex-row md:items-center md:gap-2 xl:gap-3.5 xl:text-base/6">
            <div className="flex items-center gap-2">
              <span className="text-accent-foreground font-semibold">{usdsTotalBalance}</span>
              <span className="text-accent-foreground/30 font-semibold">USDS</span>
            </div>
            <Separator orientation="vertical" className="hidden h-5.5! md:block" />
            <div className="flex items-center gap-2">
              <span className="text-accent-foreground font-semibold">{skyTotalBalance}</span>
              <span className="text-accent-foreground/30 font-semibold">SKY</span>
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
            margin: toogleWalletTable
              ? `${isMobile ? 'calc(var(--spacing) * 2)' : '0'} calc(var(--spacing) * 2)`
              : 0,
          }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
            height: { duration: 0.3, ease: 'easeInOut' },
            marginBottom: { duration: 0.3, ease: 'easeInOut' },
          }}
        >
          <WalletsTable
            wallets={proccesedWallets}
            tooltip={tooltip}
            hoveredRowIndex={hoveredRowIndex}
            className="hidden md:table"
            onCopyAddress={(address) => {
              void handleCopyAddress(address)
            }}
            onCopyMouseEnter={handleCopyMouseEnter}
            onCopyMouseLeave={handleCopyMouseLeave}
          />
          <WalletsList
            wallets={proccesedWallets}
            tooltip={tooltip}
            hoveredRowIndex={hoveredRowIndex}
            className="block md:hidden"
            onCopyAddress={(address) => {
              void handleCopyAddress(address)
            }}
            onCopyMouseEnter={handleCopyMouseEnter}
            onCopyMouseLeave={handleCopyMouseLeave}
          />
        </motion.div>
      </StripedCardContent>
    </StripedCard>
  )
}
