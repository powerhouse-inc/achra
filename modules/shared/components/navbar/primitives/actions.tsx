import { EllipsisVertical } from 'lucide-react'
import { cn } from '@/modules/shared/lib/utils'
import { Button } from '../../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'

export interface ActionsAreaProps {
  children: React.ReactNode
}

/**
 * Container for navbar action items (right side)
 */
function ActionsArea({ children }: ActionsAreaProps) {
  return <div>{children}</div>
}
ActionsArea.displayName = 'NavbarActionsArea'

export interface ActionsGroupProps {
  children: React.ReactNode
  className?: string
}

/**
 * Groups related action items with consistent spacing
 */
function ActionsGroup({ children, className }: ActionsGroupProps) {
  return <div className={cn('flex items-center gap-4', className)}>{children}</div>
}
ActionsGroup.displayName = 'NavbarActionsGroup'

/**
 * Visual separator between action items
 */
function ActionSeparator() {
  return <div className="bg-border h-9 w-px" />
}
ActionSeparator.displayName = 'NavbarActionSeparator'

export interface ActionWithOptionsProps {
  children: React.ReactNode
  className?: string
}

/**
 * Dropdown menu container for action options (mobile)
 */
function ActionWithOptions({ children, className }: ActionWithOptionsProps) {
  return (
    <div className={cn('flex items-center', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Open menu">
            <EllipsisVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-160 w-56" align="end">
          {children}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
ActionWithOptions.displayName = 'NavbarActionWithOptions'

export type ActionOptionProps = React.ComponentProps<typeof DropdownMenuItem>

/**
 * Individual action option in dropdown menu
 */
function ActionOption({ children, className, ...props }: ActionOptionProps) {
  return (
    <DropdownMenuItem className={cn('cursor-pointer', className)} {...props}>
      {children}
    </DropdownMenuItem>
  )
}
ActionOption.displayName = 'NavbarActionOption'

/**
 * Separator between action options in dropdown menu
 */
function ActionOptionSeparator() {
  return <DropdownMenuSeparator />
}
ActionOptionSeparator.displayName = 'NavbarActionOptionSeparator'

export {
  ActionsArea,
  ActionsGroup,
  ActionSeparator,
  ActionWithOptions,
  ActionOption,
  ActionOptionSeparator,
}
