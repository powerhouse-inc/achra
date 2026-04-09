import Link from 'next/link'
import { CopyAnimatedIcon, CopyButton, CopyTrigger } from '@/modules/shared/components/copy-butoon'

interface TxHashProps {
  txHash: string | null
  className?: string
}
function TxHash({ txHash, ...props }: TxHashProps) {
  const formattedHash = !txHash ? '' : txHash.length <= 16 ? txHash : `${txHash.slice(0, 16)}...`

  return (
    <div className="flex items-center gap-0.5" {...props}>
      <Link
        href={`https://etherscan.io/tx/${txHash}`}
        target="_blank"
        className="text-status-progress text-xs/4.5 font-medium hover:opacity-80"
      >
        {formattedHash}
      </Link>

      {txHash && (
        <CopyButton value={txHash}>
          <CopyTrigger>
            <CopyAnimatedIcon className="size-4" />
          </CopyTrigger>
        </CopyButton>
      )}
    </div>
  )
}

export { TxHash }
