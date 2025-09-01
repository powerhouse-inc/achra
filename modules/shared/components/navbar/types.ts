type NavItem = {
  label: string
  href: string
  isExternal?: boolean
}

interface NavbarProps {
  navItems: NavItem[]
  isLoggedIn?: boolean
}

type NavbarConfig = {
  Isotype?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  Logotype?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  navItems: NavItem[]
  authComponent: 'loginButton' | 'avatar' | 'launchButton' | null
  launchButtonText?: string
  launchButtonHref?: string
}

export type { NavbarConfig, NavItem, NavbarProps }
