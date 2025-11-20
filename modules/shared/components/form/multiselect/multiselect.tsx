'use client'

import { Command as CommandPrimitive } from 'cmdk'
import { Check, ChevronDown, XIcon } from 'lucide-react'
import * as React from 'react'
import { useEffect } from 'react'
import { OverflowList } from '@/shared/components/overflow-list'
import { Command, CommandGroup, CommandItem, CommandList } from '@/shared/components/ui/command'
import { cn } from '@/shared/lib/utils'
import { CommandEmpty } from './command-empty'
import { ItemRenderer } from './item-renderer'
import { OverflowRenderer } from './overflow-renderer'
import { transToGroupOption } from './utils'

export interface Option {
  value: string
  label: string | React.ReactNode
  disable?: boolean
  /** fixed option that can't be removed. */
  fixed?: boolean
  /** Group the options by providing key. */
  group?: string
}
export type GroupOption = Record<string, Option[]>

export type CustomItemRenderer = (
  option: Option,
  badgeClassName?: string,
  disabled?: boolean,
  onUnselect?: (option: Option) => void,
) => React.ReactNode

export type CustomOverflowRenderer = (
  overflowItems: Option[],
  badgeClassName?: string,
) => React.ReactNode

function renderItem(
  option: Option,
  badgeClassName?: string,
  disabled?: boolean,
  onUnselect?: (option: Option) => void,
  customRenderer?: CustomItemRenderer,
): React.ReactElement {
  if (customRenderer) {
    return customRenderer(option, badgeClassName, disabled, onUnselect) as React.ReactElement
  }

  return (
    <ItemRenderer
      key={option.value}
      option={option}
      badgeClassName={badgeClassName}
      disabled={disabled}
      onUnselect={onUnselect!}
    />
  )
}

function renderOverflow(
  overflowItems: Option[],
  badgeClassName?: string,
  customRenderer?: CustomOverflowRenderer,
): React.ReactElement {
  if (customRenderer) {
    return customRenderer(overflowItems, badgeClassName) as React.ReactElement
  }

  return <OverflowRenderer overflowItems={overflowItems} badgeClassName={badgeClassName} />
}

interface MultipleSelectorProps {
  value?: Option[]
  defaultOptions?: Option[]
  /** manually controlled options */
  options?: Option[]
  placeholder?: string
  /** Empty component. */
  emptyIndicator?: React.ReactNode
  onChange?: (options: Option[]) => void
  /** Limit the maximum number of selected options. */
  maxSelected?: number
  /** When the number of selected options exceeds the limit, the onMaxSelected will be called. */
  onMaxSelected?: (maxLimit: number) => void
  /** Disable the component. */
  disabled?: boolean
  /** Group the options base on provided key. */
  groupBy?: string
  className?: string
  badgeClassName?: string
  /**
   * First item selected is a default behavior by cmdk. That is why the default is true.
   * This is a workaround solution by add a dummy item.
   *
   * @reference: https://github.com/pacocoursey/cmdk/issues/171
   */
  selectFirstItem?: boolean
  /** Enable or disable the search functionality. Default is true. */
  enableSearch?: boolean
  /** Enable or disable the "Select All" functionality. Default is false. */
  enableSelectAll?: boolean
  /** Label for the "Select All" option. Used when enableSelectAll is true. */
  selectAllLabel?: string
  /** Group name to place the "Select All" option in. If not set, it will be shown at the top level. */
  selectAllGroup?: string
  /** Custom renderer for individual items in the overflow list */
  customItemRenderer?: CustomItemRenderer
  /** Custom renderer for overflow items */
  customOverflowRenderer?: CustomOverflowRenderer
  /** Props of `Command` */
  commandProps?: React.ComponentPropsWithoutRef<typeof Command>
  /** Props of `CommandInput` */
  inputProps?: Omit<
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>,
    'value' | 'placeholder' | 'disabled'
  >
  /** hide the clear all button. */
  hideClearAllButton?: boolean
}

export interface MultipleSelectorRef {
  selectedValue: Option[]
  input: HTMLInputElement
  focus: () => void
  reset: () => void
}

function MultipleSelector({
  value,
  onChange,
  placeholder,
  defaultOptions: arrayDefaultOptions = [],
  options: arrayOptions,
  emptyIndicator,
  maxSelected = Number.MAX_SAFE_INTEGER,
  onMaxSelected,
  disabled = false,
  groupBy,
  className,
  badgeClassName,
  selectFirstItem = true,
  enableSearch = true,
  enableSelectAll = false,
  selectAllLabel,
  selectAllGroup,
  customItemRenderer,
  customOverflowRenderer,
  commandProps,
  inputProps,
  hideClearAllButton = false,
}: MultipleSelectorProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  const [selected, setSelected] = React.useState<Option[]>(value ?? [])
  const [options, setOptions] = React.useState<GroupOption>(
    transToGroupOption(arrayDefaultOptions, groupBy),
  )
  const [inputValue, setInputValue] = React.useState('')
  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setOpen(false)
    }
  }

  const handleUnselect = React.useCallback(
    (option: Option) => {
      if (option.fixed) {
        return
      }
      const newOptions = selected.filter((s) => s.value !== option.value)
      setSelected(newOptions)
      onChange?.(newOptions)
    },
    [onChange, selected],
  )

  // Get all available options (flattened from groups)
  const allAvailableOptions = React.useMemo(() => {
    return Object.values(options).flat()
  }, [options])

  // Check if all options are selected
  const allOptionsSelected = React.useMemo(() => {
    if (allAvailableOptions.length === 0) return false
    return allAvailableOptions.every((option) => selected.some((s) => s.value === option.value))
  }, [allAvailableOptions, selected])

  // Handle select all/unselect all
  const handleSelectAll = React.useCallback(() => {
    if (allOptionsSelected) {
      // Unselect all (keep only fixed options)
      const newOptions = selected.filter((s) => s.fixed)
      setSelected(newOptions)
      onChange?.(newOptions)
    } else {
      // Select all available options
      const newOptions = [
        ...selected,
        ...allAvailableOptions.filter((option) => !selected.some((s) => s.value === option.value)),
      ]
      setSelected(newOptions)
      onChange?.(newOptions)
    }
  }, [allOptionsSelected, selected, allAvailableOptions, onChange])

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '' && selected.length > 0) {
            // Find the last non-fixed option to remove
            for (let i = selected.length - 1; i >= 0; i--) {
              const option = selected[i]
              if (!option.fixed) {
                handleUnselect(option)
                break
              }
            }
          }
        }
        // This is not a default behavior of the <input /> field
        if (e.key === 'Escape') {
          input.blur()
        }
      }
    },
    [handleUnselect, selected],
  )

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchend', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchend', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchend', handleClickOutside)
    }
  }, [open])

  useEffect(() => {
    if (value) {
      // disabled to keep the component as it come form shadcn
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setSelected(value)
    }
  }, [value])

  useEffect(() => {
    if (!arrayOptions) {
      return
    }
    const newOption = transToGroupOption(arrayOptions, groupBy)

    // Compare options by their values and structure
    const hasChanged =
      Object.keys(newOption).length !== Object.keys(options).length ||
      Object.keys(newOption).some((key) => {
        const newGroup = newOption[key]
        const oldGroup = options[key]
        if (newGroup.length !== oldGroup.length) return true
        return newGroup.some((newItem, index) => {
          const oldItem = oldGroup[index]
          return (
            newItem.value !== oldItem.value ||
            newItem.disable !== oldItem.disable ||
            newItem.fixed !== oldItem.fixed
          )
        })
      })

    if (hasChanged) {
      setOptions(newOption)
    }
  }, [arrayDefaultOptions, arrayOptions, groupBy, options])

  const EmptyItem = React.useCallback(() => {
    if (!emptyIndicator) return undefined

    return <CommandEmpty>{emptyIndicator}</CommandEmpty>
  }, [emptyIndicator])

  const selectables = React.useMemo<GroupOption>(() => {
    if (!enableSearch || !inputValue) return options

    const filteredOptions: GroupOption = {}
    Object.entries(options).forEach(([groupKey, groupOptions]) => {
      const filtered = groupOptions.filter((option) => {
        return (
          typeof option.label === 'string' &&
          option.label.toLowerCase().includes(inputValue.toLowerCase())
        )
      })
      if (filtered.length > 0) {
        filteredOptions[groupKey] = filtered
      }
    })

    return filteredOptions
  }, [options, inputValue, enableSearch])

  const commandFilter = React.useCallback(() => {
    if (commandProps?.filter) {
      return commandProps.filter
    }
    // Using default filter in `cmdk`. We don't have to provide it.
    return undefined
  }, [commandProps?.filter])

  return (
    <Command
      ref={dropdownRef}
      {...commandProps}
      onKeyDown={(e) => {
        handleKeyDown(e)
        commandProps?.onKeyDown?.(e)
      }}
      className={cn('h-auto overflow-visible bg-transparent', commandProps?.className)}
      shouldFilter={commandProps?.shouldFilter ?? true}
      filter={commandFilter()}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (disabled) return
          setOpen(!open)
        }}
        className={cn(
          'border-input focus-visible:border-ring focus-visible:ring-ring/50 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 has-aria-invalid:border-destructive relative flex max-h-9 min-h-9 w-full rounded-md border text-left text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          {
            'p-1': selected.length !== 0,
            'px-3 py-2': selected.length === 0,
          },
          className,
        )}
        aria-label="Open multiselect"
      >
        <div className="flex w-full max-w-full items-center pr-12">
          <OverflowList
            items={selected}
            className={cn('items-center gap-1', {
              hidden: selected.length === 0,
            })}
            itemRenderer={(option) =>
              renderItem(option, badgeClassName, disabled, handleUnselect, customItemRenderer)
            }
            overflowRenderer={(overflowItems) =>
              renderOverflow(overflowItems, badgeClassName, customOverflowRenderer)
            }
          />
          <span
            className={cn('text-muted-foreground/70', {
              hidden: selected.length > 0,
            })}
          >
            {placeholder}
          </span>
        </div>
        <div
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            // Keep only fixed options when clearing all
            const fixedOptions = selected.filter((s) => s.fixed)
            setSelected(fixedOptions)
            onChange?.(fixedOptions)
          }}
          className={cn(
            'text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute end-6 top-0 z-10 flex size-9 items-center justify-center rounded-md border border-transparent transition-[color,box-shadow] outline-none focus-visible:ring-[3px]',
            (hideClearAllButton ||
              disabled ||
              selected.filter((s) => s.fixed).length === selected.length) &&
              'hidden',
          )}
          aria-label="Clear all"
        >
          <XIcon size={16} aria-hidden="true" />
        </div>
        <div className="text-muted-foreground/80 pointer-events-none absolute end-0 top-0 flex size-9 items-center justify-center">
          <ChevronDown size={16} aria-hidden="true" />
        </div>
      </button>
      <div className="relative">
        <div
          className={cn(
            'border-input bg-popover absolute top-1 z-10 w-full overflow-hidden rounded-md border shadow-xl',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            !open && 'hidden',
          )}
          data-state={open ? 'open' : 'closed'}
        >
          {open && (
            <>
              {enableSearch && (
                <div className="border-b px-3 py-2">
                  <CommandPrimitive.Input
                    {...inputProps}
                    ref={inputRef}
                    value={inputValue}
                    onValueChange={(value) => {
                      setInputValue(value)
                      inputProps?.onValueChange?.(value)
                    }}
                    placeholder="Type to search..."
                    className={cn(
                      'placeholder:text-muted-foreground/70 w-full bg-transparent text-sm outline-hidden',
                      inputProps?.className,
                    )}
                  />
                </div>
              )}
              <CommandList className="bg-popover text-popover-foreground shadow-lg outline-hidden">
                <>
                  {EmptyItem()}
                  {!selectFirstItem && <CommandItem value="-" className="hidden" />}
                  {enableSelectAll && !selectAllGroup && (
                    <CommandItem
                      value="__select_all__"
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onSelect={() => {
                        handleSelectAll()
                      }}
                      className="cursor-pointer font-medium"
                    >
                      <div className="flex flex-1 items-center gap-2">
                        <div className="flex h-4 w-4 items-center justify-center">
                          {allOptionsSelected && <Check className="h-4 w-4" />}
                        </div>
                        <span>{selectAllLabel ?? 'Select All'}</span>
                      </div>
                    </CommandItem>
                  )}
                  {Object.entries(selectables).map(([key, dropdowns]) => (
                    <CommandGroup key={key} heading={key} className="h-full overflow-auto">
                      <>
                        {enableSelectAll && selectAllGroup === key && (
                          <CommandItem
                            value="__select_all__"
                            onMouseDown={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                            }}
                            onSelect={() => {
                              handleSelectAll()
                            }}
                            className="cursor-pointer font-medium"
                          >
                            <div className="flex flex-1 items-center gap-2">
                              <div className="flex h-4 w-4 items-center justify-center">
                                {allOptionsSelected && <Check className="h-4 w-4" />}
                              </div>
                              <span>{selectAllLabel ?? 'Select All'}</span>
                            </div>
                          </CommandItem>
                        )}
                        {dropdowns.map((option) => {
                          const isSelected = selected.some((s) => s.value === option.value)
                          return (
                            <CommandItem
                              key={option.value}
                              value={option.value}
                              disabled={option.disable}
                              onMouseDown={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                              }}
                              onSelect={() => {
                                const isAlreadySelected = selected.some(
                                  (s) => s.value === option.value,
                                )

                                if (isAlreadySelected) {
                                  // If already selected, only remove it if it's not fixed
                                  if (option.fixed) {
                                    return // Don't allow unselecting fixed options
                                  }
                                  const newOptions = selected.filter(
                                    (s) => s.value !== option.value,
                                  )
                                  setSelected(newOptions)
                                  onChange?.(newOptions)
                                } else {
                                  // If not selected, add it (toggle on)
                                  if (selected.length >= maxSelected) {
                                    onMaxSelected?.(selected.length)
                                    return
                                  }
                                  setInputValue('')
                                  const newOptions = [...selected, option]
                                  setSelected(newOptions)
                                  onChange?.(newOptions)
                                }
                              }}
                              className={cn(
                                'cursor-pointer',
                                option.disable &&
                                  'pointer-events-none cursor-not-allowed opacity-50',
                              )}
                            >
                              <div className="flex flex-1 items-center gap-2">
                                <div className="flex h-4 w-4 items-center justify-center">
                                  {isSelected && <Check className="h-4 w-4" />}
                                </div>
                                {typeof option.label === 'string' ? (
                                  <span>{option.label}</span>
                                ) : (
                                  option.label
                                )}
                              </div>
                            </CommandItem>
                          )
                        })}
                      </>
                    </CommandGroup>
                  ))}
                </>
              </CommandList>
            </>
          )}
        </div>
      </div>
    </Command>
  )
}

MultipleSelector.displayName = 'MultipleSelector'
export { MultipleSelector }
