import { cva } from 'class-variance-authority'

type VariantColorType = 'blue' | 'yellow' | 'orange' | 'green' | 'red' | 'gray' | 'purple' | 'lime'
type VariantSizeType = 'large' | 'default' | 'small'
type VariantType = 'filled' | 'bordered' | 'compact' | 'underline' | 'capsule'

const filledVariant = cva('uppercase rounded-md text-xs/4.5 font-medium', {
  variants: {
    color: {
      blue: 'bg-status-progress/30 text-status-progress',
      yellow: 'bg-yellow/30 text-yellow',
      orange: 'bg-status-warning/30 text-status-warning',
      green: 'bg-status-success/30 text-status-success',
      red: 'bg-destructive/30 text-destructive',
      gray: 'bg-muted text-muted-foreground',
      purple: 'bg-purple/30 text-purple',
      lime: 'bg-lime-500/30 text-lime-500',
    } satisfies Record<VariantColorType, string>,
    size: {
      large: 'px-3 py-1.75',
      default: 'px-3 py-0.75',
      small: 'px-2 py-0.5',
    } satisfies Record<VariantSizeType, string>,
  },
  defaultVariants: {
    size: 'default',
  },
})

const borderedVariant = cva('rounded-md border-2 text-sm/5.5 font-semibold', {
  variants: {
    color: {
      blue: 'bg-status-progress/30 text-status-progress border-status-progress',
      yellow: 'bg-yellow/30 text-yellow border-yellow',
      orange: 'bg-status-warning/30 text-status-warning border-status-warning',
      green: 'bg-status-success/30 text-status-success border-status-success',
      red: 'bg-destructive/30 text-destructive border-destructive',
      gray: 'bg-muted text-muted-foreground border-muted-foreground',
      purple: 'bg-purple/30 text-purple border-purple',
      lime: 'bg-lime-500/30 text-lime-500 border-lime-500',
    } satisfies Record<VariantColorType, string>,
    size: {
      large: 'px-1.5 py-0.75',
      default: 'px-1.5 leading-5 py-0',
      small: 'px-0.75 py-0.5 text-xs/4.5',
    } satisfies Record<VariantSizeType, string>,
  },
  defaultVariants: {
    size: 'default',
  },
})

const compactVariant = cva('rounded-md border-2 text-sm/5.5 font-semibold text-foreground/50', {
  variants: {
    color: {
      blue: 'border-status-progress/30',
      yellow: 'border-yellow/30',
      orange: 'border-status-warning/30',
      green: 'border-status-success/30',
      red: 'border-destructive/30',
      gray: 'border-muted-foreground/30',
      purple: 'border-purple/30',
      lime: 'border-lime-500/30',
    } satisfies Record<VariantColorType, string>,
    size: {
      large: 'px-3.5 py-0.75',
      default: 'px-3.5 py-0 leading-5',
      small: 'px-2 py-px text-xs/4.5 font-medium',
    } satisfies Record<VariantSizeType, string>,
  },
  defaultVariants: {
    size: 'default',
  },
})

const underlineVariant = cva(
  'rounded-md border-b-2 text-sm/5.25 font-semibold text-foreground/50',
  {
    variants: {
      color: {
        blue: 'bg-status-progress/30 border-status-progress',
        yellow: 'bg-yellow/30 border-yellow',
        orange: 'bg-status-warning/30 border-status-warning',
        green: 'bg-status-success/30 border-status-success',
        red: 'bg-destructive/30 border-destructive',
        gray: 'bg-muted border-muted-foreground',
        purple: 'bg-purple/30 border-purple',
        lime: 'bg-lime-500/30 border-lime-500',
      } satisfies Record<VariantColorType, string>,
      size: {
        large: 'px-2 py-1',
        default: 'px-1 pt-px',
        small: 'px-1 pt-px text-xs/4.5 font-medium',
      } satisfies Record<VariantSizeType, string>,
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

const capsuleVariant = cva('rounded-tr-xl rounded-bl-xl border text-sm/5.5 font-semibold', {
  variants: {
    color: {
      blue: 'text-status-progress border-status-progress',
      yellow: 'text-yellow border-yellow',
      orange: 'text-status-warning border-status-warning',
      green: 'text-status-success border-status-success',
      red: 'text-destructive border-destructive',
      gray: 'text-muted-foreground border-muted-foreground',
      purple: 'text-purple border-purple',
      lime: 'text-lime-500 border-lime-500',
    } satisfies Record<VariantColorType, string>,
    size: {
      large: 'px-2.5 py-0.75',
      default: 'px-2 py-0',
      small: 'px-1 py-0 text-xs/4.5 font-medium rounded-tr-lg rounded-bl-lg',
    } satisfies Record<VariantSizeType, string>,
  },
  defaultVariants: {
    size: 'default',
  },
})

export { filledVariant, borderedVariant, compactVariant, underlineVariant, capsuleVariant }
export type { VariantColorType, VariantSizeType, VariantType }
