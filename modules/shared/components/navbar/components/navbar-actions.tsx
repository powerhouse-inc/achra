import * as NavbarPrimitives from '../primitives'
import { ThemeToggle, ThemeToggleOption } from './theme-toggle'
import { UserButton, UserOption } from './user-button'

/**
 * Shared navbar actions (theme toggle and user button)
 */
function NavbarActions() {
  return (
    <NavbarPrimitives.ActionsArea>
      <NavbarPrimitives.ActionWithOptions className="flex md:hidden">
        <UserOption />
        <NavbarPrimitives.ActionOptionSeparator />
        <ThemeToggleOption />
      </NavbarPrimitives.ActionWithOptions>

      <NavbarPrimitives.ActionsGroup className="hidden md:flex">
        <ThemeToggle />
        <NavbarPrimitives.ActionSeparator />
        <UserButton />
      </NavbarPrimitives.ActionsGroup>
    </NavbarPrimitives.ActionsArea>
  )
}

NavbarActions.displayName = 'NavbarActions'

export { NavbarActions }
