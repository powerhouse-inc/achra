import { HardDrive, Shield } from 'lucide-react'
import type { LanguageOption, SettingsNavSection } from '@/modules/my-account/types'

export const SETTINGS_NAV_SECTIONS: readonly SettingsNavSection[] = [
  { label: 'Account', href: '/my-account', icon: Shield },
  { label: 'My Apps', href: '/my-account/apps', icon: HardDrive },
]

export const LANGUAGE_OPTIONS: readonly LanguageOption[] = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'pt', label: 'Portuguese' },
]
