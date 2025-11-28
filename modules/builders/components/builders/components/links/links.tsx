import { Link } from 'lucide-react'
import {
  HoverPopover,
  HoverPopoverContent,
  HoverPopoverTrigger,
} from '@/modules/shared/components/hover-popover'
import { Button } from '@/modules/shared/components/ui/button'

interface LinksProps {
  isMobile?: boolean
}

export function Links({ isMobile }: LinksProps) {
  return (
    <HoverPopover>
      <HoverPopoverTrigger asChild>
        {isMobile ? (
          <Button variant="secondary" size="icon">
            <Link />
          </Button>
        ) : (
          <Button variant="secondary" size="lg" className="focus-visible:ring-0">
            <Link />
            Links
          </Button>
        )}
      </HoverPopoverTrigger>
      <HoverPopoverContent className="w-fit p-2" align="end">
        <div className="flex flex-col gap-1">
          <span>Website</span>
          <span>Forum</span>
          <span>Discord</span>
          <span>Twitter</span>
          <span>Github</span>
        </div>
      </HoverPopoverContent>
    </HoverPopover>
  )
}
