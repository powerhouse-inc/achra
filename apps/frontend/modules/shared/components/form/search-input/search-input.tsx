'use client'

import { Loader2, Search } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import { Input } from '@/shared/components/ui/input'
import { cn } from '@/shared/lib/utils'

const OsCommandKeyboardShortcut = dynamic(
  async () => {
    const mod = await import('react-device-detect')
    return {
      default: () => <span>{mod.isMacOs ? '⌘' : 'Ctrl'}</span>,
    }
  },
  {
    ssr: false,
    loading: () => <span>Ctrl</span>, // Default fallback
  },
)

interface SearchInputProps extends Omit<React.ComponentProps<typeof Input>, 'value' | 'onChange'> {
  value: string
  isLoading?: boolean
  showKeyboardShortcut?: boolean
  onChange: (value: string) => void
}

function SearchInput({
  value,
  isLoading = false,
  onChange,
  placeholder = 'Search...',
  showKeyboardShortcut = true,
  className,
  ...props
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div
      className={cn(
        'bg-accent flex h-9 w-full items-center justify-between rounded-md pr-1 pl-3',
        className,
      )}
    >
      <div className="flex h-full flex-1 items-center gap-3">
        <div className="h-4 w-4 shrink-0">
          {isLoading ? (
            <Loader2 className="text-accent-foreground/30 h-4 w-4 animate-spin" />
          ) : (
            <Search className="text-accent-foreground/30 h-4 w-4" />
          )}
        </div>
        <Input
          ref={inputRef}
          type="search"
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
          }}
          placeholder={placeholder}
          className={cn(
            // Layout & spacing
            'h-full flex-1 p-0',
            // Borders & background
            'border-0 bg-transparent shadow-none dark:bg-transparent',
            // Typography & color
            'placeholder:text-accent-foreground/30 text-sm',
            // Focus
            'focus-visible:ring-0 focus-visible:ring-offset-0',
            // Hide native search cancel button (Webkit)
            '[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-cancel-button]:appearance-none',
          )}
          {...props}
        />
      </div>
      {showKeyboardShortcut && (
        <div className="text-foreground/30 flex shrink-0 items-center gap-1 text-sm/4.5 font-medium">
          <div className="bg-background rounded-md border px-2 py-1">
            <OsCommandKeyboardShortcut />
          </div>
          <div className="bg-background rounded-md border px-2 py-1">
            <span>K</span>
          </div>
        </div>
      )}
    </div>
  )
}

export { SearchInput }
