import { CalendarClock, HandCoins, UserCheck } from 'lucide-react'
import { ProposalKeyValueElement } from '@/modules/shared/components/proposal-key-value-element'

export default function WorkstreamStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-x-6 xl:grid-cols-3 xl:grid-cols-[1fr_1fr_1.3fr] sm:[&>*:last-child]:col-span-2 lg:[&>*:last-child]:col-span-1">
      <ProposalKeyValueElement keyValue="Issuer" keyIcon={UserCheck} value="Powerhouse RGH Team" />
      <ProposalKeyValueElement keyValue="Budget Range" keyIcon={HandCoins} value="10K - 25K USD" />
      <ProposalKeyValueElement
        keyValue={
          <div>
            <span className="sm:hidden">Deadline</span>
            <span className="hidden sm:block">Submission Deadline</span>
          </div>
        }
        keyIcon={CalendarClock}
        value="12 SEP 2025 @ 12:00 CET"
      />
    </div>
  )
}
