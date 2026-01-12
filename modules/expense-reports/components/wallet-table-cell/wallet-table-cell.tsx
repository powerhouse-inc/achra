import Link from 'next/link'
import { CopyAnimatedIcon, CopyButton, CopyTrigger } from '@/modules/shared/components/copy-butoon'
import { ExternalLink } from '@/modules/shared/components/external-link'
import { Identicon } from '@/modules/shared/components/identicon'
import { cn } from '@/modules/shared/lib/utils'
import { capitalizeSentence } from '../../lib/strings'

interface WalletTableCellProps {
  imgUrl?: string
  name: string
  wallet: string
  address?: string
  className?: string
}

export function WalletTableCell({ className, address, name, wallet }: WalletTableCellProps) {
  return (
    <div className={cn('flex h-[77px] items-center md:h-[72px]', className)}>
      <Identicon value={address ?? ''} className="mx-4 size-8 md:ml-2 lg:ml-4" />
      <div className="h-10">
        <div className="text-base/6 font-semibold md:text-sm/5.5 lg:text-base/6">
          {capitalizeSentence(name)}
        </div>
        <div className="flex items-center">
          <ExternalLink href={`https://etherscan.io/address/${address}`}>
            {wallet.toLowerCase()}
          </ExternalLink>

          <div className="ml-6 flex items-center gap-6 md:ml-0.5 md:gap-4">
            <CopyButton value={address ?? ''}>
              <CopyTrigger>
                <CopyAnimatedIcon className="size-4" />
              </CopyTrigger>
            </CopyButton>

            <Link href={`https://app.safe.global/home?safe=eth:${address}`} target="_blank">
              Gnosis icon here
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
