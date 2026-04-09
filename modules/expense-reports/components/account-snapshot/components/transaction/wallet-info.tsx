import Link from 'next/link'
import { CopyAnimatedIcon, CopyButton, CopyTrigger } from '@/modules/shared/components/copy-butoon'
import { Identicon } from '@/modules/shared/components/identicon'
import { formatAddress } from '../../utils/address'

interface WalletInfoProps {
  name: string
  address: string
}
function WalletInfo({ name, address }: WalletInfoProps) {
  return (
    <div className="flex items-center gap-2">
      <Identicon value={address || name} className="size-6 min-w-6 md:size-8 md:min-w-8" />
      <div>
        <div className="flex">
          <div className="text-xs/4.5 font-medium md:text-sm/5.5 md:font-semibold">{name}</div>
        </div>
        <div className="flex gap-4">
          <Link
            href={`https://etherscan.io/address/${address}`}
            target="_blank"
            className="text-status-progress text-xs/4.5 font-medium hover:opacity-80"
          >
            {formatAddress(address)}
          </Link>
          <CopyButton value={address}>
            <CopyTrigger>
              <CopyAnimatedIcon className="size-4" />
            </CopyTrigger>
          </CopyButton>
        </div>
      </div>
    </div>
  )
}

export { WalletInfo }
