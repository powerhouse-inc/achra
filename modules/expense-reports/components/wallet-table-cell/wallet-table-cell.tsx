import Link from 'next/link'
import { CopyAnimatedIcon, CopyButton, CopyTrigger } from '@/modules/shared/components/copy-button'
import { Identicon } from '@/modules/shared/components/identicon'
import Gnosis from '@/modules/shared/components/svgs/gnosis.svg'
import { cn } from '@/modules/shared/lib/utils'
import { capitalizeSentence } from '../../lib/strings'

interface WalletTableCellProps {
  imgUrl?: string
  name: string
  wallet: string
  address?: string
  className?: string
}

function WalletTableCell({ className, address, name, wallet }: WalletTableCellProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 px-6 pt-4 pb-2 md:gap-2 md:px-2 md:py-2 lg:px-4',
        className,
      )}
    >
      <Identicon value={address ?? ''} className="size-8 min-w-8" />
      <div>
        <div className="text-base/6 font-semibold md:text-sm/5.5 lg:text-base/6">
          {capitalizeSentence(name)}
        </div>
        <div className="flex items-center gap-0.5">
          <Link
            className="text-status-progress text-sm/5.5 font-semibold md:text-xs/4.5 lg:text-sm/5.5"
            href={`https://etherscan.io/address/${address}`}
          >
            {wallet.toLowerCase()}
          </Link>

          <div className="flex items-center gap-6 md:gap-4">
            <CopyButton value={address ?? ''}>
              <CopyTrigger>
                <CopyAnimatedIcon className="size-4" />
              </CopyTrigger>
            </CopyButton>

            <Link
              className="text-foreground/30"
              href={`https://app.safe.global/home?safe=eth:${address}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Gnosis className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export { WalletTableCell }
