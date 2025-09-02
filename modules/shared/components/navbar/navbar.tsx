'use client'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AchraLogo from '@/modules/shared/components/svgs/achra-logo.svg'
import { cn } from '../../lib/utils'
import { KebabMenu } from '../svgs'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { getNavbarConfig } from './navbar-config'

function Navbar() {
  // TODO: get from auth state
  const isLoggedIn = false
  const pathname = usePathname()

  const config = getNavbarConfig(pathname)

  const { isotype: BrandLogo, logotype: BrandLogotype, navItems } = config

  return (
    <header className="border2 bg-muted/50 sticky top-0 mx-auto flex max-w-[var(--container-width)] items-center justify-center rounded-3xl backdrop-blur-[7.5px] md:top-1.5 md:p-2.5">
      <div className="bg-card flex flex-1 items-center justify-between rounded-2xl pr-4 md:pr-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="text-border bg-primary/5 border-border flex items-center justify-center rounded-l-lg border-r-1 px-4 py-3.5 md:px-6 md:py-4.5">
              <AchraLogo className="h-9 w-9" />
            </div>
            <div className="flex items-center gap-2">
              {BrandLogo && <BrandLogo className="h-8 w-8" />}
              {BrandLogotype && <BrandLogotype className="hidden:md:flex h-8 w-16" />}
            </div>
            <div className="flex min-w-37.75 items-center gap-8 md:hidden">
              <div>Select Network</div>
            </div>
          </div>

          <nav className="hidden items-center gap-2 md:flex md:gap-4 lg:gap-12">
            {navItems.map((item) => {
              return (
                <div key={item.label} className="flex items-center gap-1">
                  <Link
                    href={item.href}
                    target={item.isExternal ? '_blank' : '_self'}
                    className={cn(
                      'text-muted-foreground hover:text-foreground flex items-center gap-1 font-medium',
                      pathname === item.href && 'text-foreground',
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.isExternal && <ExternalLink className="h-4 w-4" />}
                </div>
              )
            })}
          </nav>
          <div className="text-background flex items-center md:hidden">
            <KebabMenu className="h-9 w-9" />
          </div>
          {!isLoggedIn ? (
            <div className="hidden items-center md:flex">
              <Button variant="outline">Log in</Button>
            </div>
          ) : (
            <div className="hidden items-center md:flex">
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/100?img=5" alt="avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
export default Navbar
