import { cva } from 'class-variance-authority'
import { cn } from '@/modules/shared/lib/utils'
import { KeyResultStatus } from '../../types'

interface KeyResultStatusChipProps {
  status: KeyResultStatus
  size?: 'sm' | 'md'
  className?: string
}

const chipVariants = cva(
  'inline-flex items-center justify-center rounded-md text-xs font-semibold text-nowrap uppercase',
  {
    variants: {
      size: {
        sm: 'px-3 py-0.75',
        md: 'px-3 py-1.75',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  },
)

const CHIP_MAP = {
  [KeyResultStatus.DRAFT]: {
    label: 'Draft',
    bgColor: 'bg-status-progress/30',
    textColor: 'text-status-progress',
  },
  [KeyResultStatus.WONT_DO]: {
    label: "Won't Do",
    bgColor: 'bg-gray-200',
    textColor: 'text-gray-500',
  },
  [KeyResultStatus.IN_PROGRESS]: {
    label: 'In Progress',
    bgColor: 'bg-status-progress/30',
    textColor: 'text-status-progress',
  },
  [KeyResultStatus.DELIVERED]: {
    label: 'Delivered',
    bgColor: 'bg-status-success/30',
    textColor: 'text-status-success',
  },
  [KeyResultStatus.CANCELED]: {
    label: 'Canceled',
    bgColor: 'bg-destructive/30',
    textColor: 'text-destructive',
  },
  [KeyResultStatus.TODO]: {
    label: 'To Do',
    bgColor: 'bg-status-warning/30',
    textColor: 'text-status-warning',
  },
  [KeyResultStatus.BLOCKED]: {
    label: 'Blocked',
    bgColor: 'bg-gray-200',
    textColor: 'text-gray-500',
  },
}

export function KeyResultStatusChip({ status, size, className }: KeyResultStatusChipProps) {
  const { label, bgColor, textColor } = CHIP_MAP[status]

  return <div className={cn(chipVariants({ size }), bgColor, textColor, className)}>{label}</div>
}
