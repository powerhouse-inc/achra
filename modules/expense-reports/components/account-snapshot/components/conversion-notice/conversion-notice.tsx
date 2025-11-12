import { UsdsIcon } from '@/modules/shared/components/svgs'
import { cn } from '@/modules/shared/lib/utils'

interface ConversionNoticeProps {
  className?: string
}

function ConversionNotice({ className }: ConversionNoticeProps) {
  return (
    <div className={cn('flex items-center gap-2 text-sm/5.5 font-semibold', className)}>
      <UsdsIcon className="size-5" /> *All values are converted to USDS
    </div>
  )
}

export { ConversionNotice }
