import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { Network } from '@/modules/__generated__/graphql/switchboard-generated'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/modules/shared/components/ui/card'

interface NetworkCardProps {
  profile: Pick<
    Network,
    'name' | 'slug' | 'logo' | 'darkThemeLogo' | 'logoBig' | 'category' | 'description'
  >
}

function NetworkCard({ profile }: NetworkCardProps) {
  const logoSrc = [profile.darkThemeLogo, profile.logo].find(
    (src): src is string => typeof src === 'string' && src.trim().length > 0,
  )

  return (
    <Link href={`/network/${profile.slug}`} className="h-full">
      <Card
        className="flex flex-col gap-4 border-none bg-cover bg-center bg-no-repeat p-4 shadow-sm sm:p-10 md:gap-10 md:p-16"
        style={{
          // We need the static colour here because the gradient should be the same for light and dark mode
          backgroundImage: `linear-gradient(180deg, #1e222b 31.73%, color-mix(in srgb, #1e222b 40%, transparent) 91.35%), url(${profile.logoBig})`,
        }}
      >
        <CardHeader className="gap-0 p-0">
          <CardTitle className="flex h-8 w-full items-center gap-2 sm:h-8 md:h-10">
            {logoSrc ? (
              <div className="flex h-full max-w-full items-center overflow-hidden">
                {/* Keep Next/Image intrinsic sizing minimal; actual display size is controlled by Tailwind
                  (`h-full w-auto max-w-full`) so height is fixed by the row and width follows aspect ratio. */}
                <Image
                  src={logoSrc}
                  width={1}
                  height={1}
                  unoptimized
                  alt={`${profile.name} Logo`}
                  className="h-full w-auto max-w-full object-contain object-left"
                />
              </div>
            ) : (
              <div className="text-accent-foreground md:text-lead flex w-full items-center gap-2 text-2xl">
                <Image
                  src="/networks/logos/unknown.png"
                  width={40}
                  height={40}
                  alt="Network Logo"
                />
                <span>{profile.name}</span>
              </div>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col justify-between gap-4 p-0 pt-0 md:gap-10">
          <div className="flex flex-col">
            <p className="text-primary-foreground line-clamp-6 max-w-145 text-sm leading-5.5 font-medium sm:line-clamp-4">
              {profile.description}
            </p>
          </div>

          <div className="flex h-9 w-full">
            <Button className="text-primary-foreground bg-primary hover:bg-primary/90 inline-flex cursor-pointer items-center justify-center rounded-md px-4! py-2">
              Explore {profile.name}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export { NetworkCard }
