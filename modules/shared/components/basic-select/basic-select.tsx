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
}

export function BasicSelect({
  value,
  onValueChange,
  options,
  label,
  placeholder,
  className,
  'aria-label': ariaLabel,
  matchTriggerWidth = false,
}: BasicSelectProps) {
  // Only use value if it's in the options list, otherwise show placeholder
  const validValue = value && options.includes(value) ? value : undefined

  return (
    <Select value={validValue} onValueChange={onValueChange}>
      <SelectTrigger
        size="sm"
        className={cn(
          'bg-background dark:bg-background [&_svg]:text-foreground! focus-visible:border-input min-w-46 border! shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 [&_svg]:opacity-100 [&_svg]:transition-transform [&_svg]:duration-200 data-[state=open]:[&_svg]:rotate-180',
          className,
        )}
        aria-label={ariaLabel ?? label ?? 'Select option'}
        data-slot="single-select-trigger"
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        side="bottom"
        align="end"
        data-slot="single-select-content"
        className={cn(
          'rounded-xl',
          matchTriggerWidth
            ? 'w-[var(--radix-select-trigger-width)]'
            : 'min-w-[var(--radix-select-trigger-width)]',
        )}
      >
        <SelectGroup>
          {label && (
            <SelectLabel
              className="text-foreground mb-1 px-0! py-2 text-xs font-bold tracking-wide"
              data-slot="single-select-label"
            >
              {label}
            </SelectLabel>
          )}
          <SelectGroup className="bg-background gap-0.5 rounded-xl px-1! py-1!">
            {options.map((option) => (
              <SelectItem
                key={option}
                value={option}
                data-slot="single-select-item"
                className="hover:bg-accent/40 data-[state=checked]:bg-accent cursor-pointer rounded-sm py-2.5 transition-colors data-[state=checked]:font-medium [&>span:first-child]:hidden"
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
