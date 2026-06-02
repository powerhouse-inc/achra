'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/modules/shared/components/ui/select'
import { cn } from '../../lib/utils'

interface BasicSelectProps {
  value?: string
  onValueChange: (value: string) => void
  options: string[]
  label?: string
  placeholder?: string
  className?: string
  'aria-label'?: string
  /**
   * When true, dropdown width matches trigger exactly.
   * When false, dropdown can grow to fit content.
   * @default false
   */
  matchTriggerWidth?: boolean
  isLoading?: boolean
  disabled?: boolean
}

function BasicSelect({
  value,
  onValueChange,
  options,
  label,
  placeholder,
  className,
  'aria-label': ariaLabel,
  matchTriggerWidth = false,
  isLoading = false,
  disabled = false,
}: BasicSelectProps) {
  // Only use value if it's in the options list, otherwise show placeholder
  const validValue = value && options.includes(value) ? value : undefined

  return (
    <Select value={validValue} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger
        size="sm"
        aria-label={ariaLabel ?? label ?? 'Select option'}
        data-slot="single-select-trigger"
        className={cn(
          'bg-background dark:hover:bg-background dark:bg-background focus-visible:border-input min-w-46 focus-visible:ring-0 focus-visible:ring-offset-0 data-[size=sm]:h-9 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate',
          className,
        )}
        isLoading={isLoading}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        data-slot="single-select-content"
        className={cn(
          'border-input shadow-xl',
          matchTriggerWidth
            ? 'w-(--radix-select-trigger-width)'
            : 'min-w-(--radix-select-trigger-width)',
        )}
      >
        <SelectGroup>
          {label && (
            <SelectLabel
              data-slot="single-select-label"
              className="text-muted-foreground text-xs font-medium"
            >
              {label}
            </SelectLabel>
          )}
          <SelectGroup>
            {options.map((option) => (
              <SelectItem
                key={option}
                value={option}
                data-slot="single-select-item"
                className="hover:bg-accent/40 data-[state=checked]:bg-accent cursor-pointer rounded-sm px-2 py-1.5 transition-colors **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate data-[state=checked]:font-medium [&>span:first-child]:hidden"
              >
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export { BasicSelect }
