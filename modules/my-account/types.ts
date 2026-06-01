import type { LucideIcon } from 'lucide-react'
import type { Route } from 'next'

export interface SettingsNavSection {
  label: string
  href: Route
  icon: LucideIcon
}

export interface LanguageOption {
  value: string
  label: string
}
