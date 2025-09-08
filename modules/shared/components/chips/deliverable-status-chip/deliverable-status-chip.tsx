import { useMemo } from 'react'
import { DeliverableStatus } from '@/modules/roadmap/components/milestone-details-card/types'

interface DeliverableStatusChipProps {
  status: DeliverableStatus
}

export default function DeliverableStatusChip({ status }: DeliverableStatusChipProps) {
  const { label, bgColor, textColor } = useMemo(() => {
    switch (status) {
      case DeliverableStatus.IN_PROGRESS:
        return {
          label: 'In Progress',
          bgColor: 'bg-status-progress/30',
          textColor: 'text-status-progress',
        }
      case DeliverableStatus.DELIVERED:
        return {
          label: 'Delivered',
          bgColor: 'bg-status-success/30',
          textColor: 'text-status-success',
        }
      case DeliverableStatus.BLOCKED:
        return {
          label: 'Blocked',
          bgColor: 'bg-slate-50', // TODO: replace colors
          textColor: 'text-gray-500',
        }
      case DeliverableStatus.DRAFT:
      case DeliverableStatus.TODO:
        return {
          label: status === DeliverableStatus.DRAFT ? 'Draft' : 'To do',
          bgColor: 'bg-status-warning/30',
          textColor: 'text-status-warning',
        }
      case DeliverableStatus.WONT_DO:
        return {
          label: "Won't do",
          bgColor: 'bg-gray-100', // TODO: replace colors
          textColor: 'text-gray-600',
        }
      default:
        return {
          label: 'To do',
          bgColor: 'bg-status-warning/30',
          textColor: 'text-status-warning',
        }
    }
  }, [status])

  return (
    <div
      className={`inline-flex items-center justify-center rounded-md px-4 py-1 text-sm leading-[22px] font-semibold text-nowrap ${bgColor} ${textColor}`}
    >
      {label}
    </div>
  )
}
