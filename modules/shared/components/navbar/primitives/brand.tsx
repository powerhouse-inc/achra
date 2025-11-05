import Link from 'next/link'
import AchraImagotipo from '@/modules/shared/components/svgs/achra-imagotipo.svg'
import AchraLogo from '@/modules/shared/components/svgs/achra-logo.svg'

export interface BrandAreaProps {
  children: React.ReactNode
}

/**
 * Container for brand elements (left side of navbar)
 */
function BrandArea({ children }: BrandAreaProps) {
  return <div className="flex items-center gap-4 sm:gap-9 xl:gap-4">{children}</div>
}
BrandArea.displayName = 'NavbarBrandArea'

/**
 * Achra brand logo (icon on mobile, imagotype on desktop)
 */
function AchraBrand() {
  return (
    <div
      className="text-border flex items-center justify-center overflow-hidden py-4.5 pl-6"
      data-brand="achra"
    >
      <Link href="/" target="_self" className="cursor-pointer" aria-label="Achra homepage">
        <AchraLogo className="text-primary h-9 w-9 sm:hidden" />

        <AchraImagotipo className="text-primary [&_path[data-type='text']]:fill-foreground hidden h-9 w-42 sm:flex" />
      </Link>
    </div>
  )
}
AchraBrand.displayName = 'NavbarAchraBrand'

export { BrandArea, AchraBrand }
