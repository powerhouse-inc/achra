import { MoonIcon, SunIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import React from 'react'
import KebabMenu from '@/shared/components/svgs/kebab-menu.svg'
import { ThemeToggle } from '../../theme-toggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import { type User } from '../types'
import LoginAvatar from './login-avatar'

interface NavbarRightSideProps {
  isLoggedIn: boolean
  user?: User
}

function NavbarRightSide({ isLoggedIn, user }: NavbarRightSideProps) {
  const { theme, setTheme } = useTheme()

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  return (
    <>
      <div className="hidden items-center gap-2 md:flex">
        <ThemeToggle />
        <div className="bg-border mx-4 h-9 w-px" />
        <LoginAvatar isLoggedIn={isLoggedIn} user={user} />
      </div>

      <div className="flex items-center md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="text-background focus:ring-ring rounded-md focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              <KebabMenu className="h-9 w-9" />
              <span className="sr-only">Open menu</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            {isLoggedIn ? (
              <>
                <DropdownMenuItem>
                  <LoginAvatar isLoggedIn={isLoggedIn} user={user} />
                </DropdownMenuItem>
              </>
            ) : (
              <>
                {/* <DropdownMenuItem>
                  <LoginAvatar isLoggedIn={isLoggedIn} user={user} />
                </DropdownMenuItem> */}
                <DropdownMenuItem asChild>
                  <Link href="/" className="cursor-pointer">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Login</span>
                  </Link>
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleThemeToggle} className="cursor-pointer">
              {theme === 'dark' ? (
                <MoonIcon className="mr-2 h-4 w-4" />
              ) : (
                <SunIcon className="mr-2 h-4 w-4" />
              )}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}
export default NavbarRightSide
