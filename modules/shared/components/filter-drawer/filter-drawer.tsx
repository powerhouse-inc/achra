'use client'

import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { BrushCleaning, CheckIcon, FilterIcon } from 'lucide-react'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from '@/modules/shared/components/ui/drawer'
import { cn } from '../../lib/utils'
import { Button } from '../ui/button'

interface FilterDrawerProps extends React.PropsWithChildren {
  filterTrigger?: React.ReactNode
  onReset?: () => void
}

function FilterDrawer({ children, onReset, filterTrigger }: FilterDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        {filterTrigger ?? (
          <Button variant="outline" size="icon">
            <FilterIcon />
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <VisuallyHidden>
          <DrawerTitle>Filters</DrawerTitle>
        </VisuallyHidden>
        <div
          className={cn('mx-auto flex w-full max-w-150 flex-col gap-4 overflow-y-auto px-4', {
            'pb-8': typeof onReset !== 'function',
          })}
        >
          {children}
        </div>
        {typeof onReset === 'function' && (
          <DrawerFooter className="pt-4 pb-8">
            <div className="mx-auto w-full max-w-150">
              <Button variant="secondary" onClick={onReset} className="w-full">
                <BrushCleaning /> Reset
              </Button>
            </div>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  )
}

interface DrawerSelectProps<T extends string> {
  value?: T | T[]
  onChange: ((value: T) => void) | ((values: T[]) => void)
  label?: string
  options: Array<{ label: string | React.ReactNode; value: T }>
  multiselect?: boolean
}

function DrawerSelect<T extends string>({
  value,
  onChange,
  label,
  options,
  multiselect = false,
}: DrawerSelectProps<T>) {
  const handleToggle = (optionValue: T) => {
    if (multiselect && Array.isArray(value)) {
      const isSelected = value.includes(optionValue)
      if (isSelected) {
        ;(onChange as (values: T[]) => void)(value.filter((val) => val !== optionValue))
      } else {
        ;(onChange as (values: T[]) => void)([...value, optionValue])
      }
    } else if (!multiselect && !Array.isArray(value)) {
      ;(onChange as (value: T) => void)(optionValue)
    }
  }

  const isSelected = (optionValue: T) => {
    if (multiselect && Array.isArray(value)) {
      return value.includes(optionValue)
    }
    return value === optionValue
  }

  return (
    <div className="bg-popover flex flex-col rounded-md border py-1">
      <div className="px-8 py-2 text-sm/5.5 font-semibold">{label}</div>
      {options.map((option) => (
        <div
          key={option.value}
          className="hover:bg-accent flex cursor-pointer items-center justify-between py-2 pr-3 pl-8 text-sm/5.5"
          onClick={() => {
            handleToggle(option.value)
          }}
        >
          {option.label}
          {isSelected(option.value) && <CheckIcon className="ml-auto size-4" />}
        </div>
      ))}
    </div>
  )
}

export { FilterDrawer, DrawerSelect }
