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
  brandLogo?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  brandLogotype?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  navItems: NavItem[]
  authComponent: 'loginButton' | 'avatar' | 'launchButton' | null
  launchButtonText?: string
  launchButtonHref?: string
}

export type { NavbarConfig, NavItem, NavbarProps }
