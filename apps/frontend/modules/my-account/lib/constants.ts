import { HardDrive, Shield } from 'lucide-react'
import type { SettingsNavSection } from '@/modules/my-account/types'

export const SETTINGS_NAV_SECTIONS: readonly SettingsNavSection[] = [
  { label: 'Account', href: '/my-account', icon: Shield },
  { label: 'My Apps', href: '/my-account/apps', icon: HardDrive },
]
