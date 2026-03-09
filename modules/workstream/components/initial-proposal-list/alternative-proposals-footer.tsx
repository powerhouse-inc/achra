import { FilePenLine } from 'lucide-react'
import { Button } from '@/modules/shared/components/ui/button'

interface AlternativeProposalsFooterProps {
  isVisible: boolean
}

function AlternativeProposalsFooter({ isVisible }: Readonly<AlternativeProposalsFooterProps>) {
  if (!isVisible) return null

  return (
    <div className="flex flex-col gap-2 p-2 sm:gap-4 sm:p-4">
      <div className="text-sm/5.5 font-semibold sm:text-lg sm:leading-[120%] xl:text-xl xl:font-bold">
        Alternative Proposals
      </div>
      <Button className="w-fit">
        <span>Create Alternative Proposal</span>
        <FilePenLine className="size-4" />
      </Button>
    </div>
  )
}

export { AlternativeProposalsFooter }
