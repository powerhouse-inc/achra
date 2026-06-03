'use client'

import { cn } from '@achra/ui/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SETTINGS_NAV_SECTIONS } from '@/modules/my-account/lib/constants'

function SettingsNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Account settings sections" className="bg-card rounded-xl border p-2 shadow-sm">
      <ul className="flex flex-col gap-0.5">
        {SETTINGS_NAV_SECTIONS.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm transition-colors',
                  isActive
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'text-foreground hover:bg-accent/60',
                )}
              >
                <Icon className="text-muted-foreground size-4 shrink-0" aria-hidden="true" />
                <span>{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export { SettingsNav }
