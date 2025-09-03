import Link from 'next/link';
import AchraLogo from '@/modules/shared/components/svgs/achra-logo.svg';
import AchraIsotype from '@/modules/shared/components/svgs/achra-imagotipo.svg';
import { cn } from '@/modules/shared/lib/utils';
import React from 'react';

interface NavbarBrandProps {
  isNetworksPage: boolean;
  BrandLogo?: React.ElementType;
  BrandLogotype?: React.ElementType;
}

export function NavbarBrand({ isNetworksPage, BrandLogo, BrandLogotype }: NavbarBrandProps) {

  const MainLogoComponent = isNetworksPage ? AchraIsotype : AchraLogo;
  const logoContainerClasses = cn(
    'text-border flex items-center justify-center overflow-hidden py-4.5',
    {
      'rounded-l-2xl border-r bg-primary/5 border-border px-4 md:px-6': !isNetworksPage,
      'pl-6': isNetworksPage,
    }
  );

  return (
    <div className="flex items-center gap-4 md:gap-6">
      <div className={logoContainerClasses}>
        <Link href="/networks">
          <MainLogoComponent className={cn('h-9', isNetworksPage ? 'w-42 text-primary' : 'w-9')} />
        </Link>
      </div>
      {!isNetworksPage && BrandLogo && BrandLogotype && (
        <div className="flex items-center gap-2">
          <BrandLogo className="h-8 w-8" />
          <BrandLogotype className="hidden h-8 w-16 md:flex" />
        </div>
      )}
    </div>
  );
}