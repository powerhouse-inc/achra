import { ExternalLinkIcon } from 'lucide-react'
import { cn } from '@/modules/shared/lib/utils'

interface OpenModalTransparencyProps {
  name: string
  handleOpenModal?: () => void
  className?: string
}

function OpenModalTransparency({ name, handleOpenModal, className }: OpenModalTransparencyProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {name}
      <div className="hover:text-primary size-5 cursor-pointer" onClick={handleOpenModal}>
        <ExternalLinkIcon className="size-4" />
      </div>
    </div>
  )
}

export { OpenModalTransparency }
