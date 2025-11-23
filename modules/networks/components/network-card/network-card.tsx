import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { Network } from '@/modules/__generated__/graphql/switchboard-generated'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/modules/shared/components/ui/card'
import NetworkChip from './network-category'

interface NetworkCardProps {
  profile: Pick<Network, 'name' | 'slug' | 'logo' | 'logoBig' | 'category' | 'description'>
}

export function NetworkCard({ profile }: NetworkCardProps) {
  return (
    <Link href={`/network/${profile.slug}`} className="h-full">
      <Card
        className="flex h-64 flex-col gap-0 border-none bg-cover bg-center bg-no-repeat p-4 shadow-sm sm:p-6"
        style={{
          backgroundImage: `linear-gradient(180deg, var(--popover) 31.73%, color-mix(in srgb, var(--popover) 40%, transparent) 91.35%), url(${profile.logoBig})`,
        }}
      >
        <CardHeader className="gap-0 p-0">
          <div className="flex h-8 items-center justify-between sm:h-8 md:h-10">
            <CardTitle className="flex w-full items-center gap-2">
              {profile.logo ? (
                <div className="relative h-10 w-full items-center">
                  <Image
                    src={profile.logo}
                    fill
                    alt={`${profile.name} Logo`}
                    unoptimized
                    className="object-contain object-left"
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
            {/* categories are represented as an array but it is going to have at most one category */}
            {profile.category && profile.category.length > 0 && (
              <NetworkChip category={profile.category[0]} />
            )}
          </div>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col justify-between p-0 pt-0">
          <div className="mt-2 flex flex-col">
            <p className="text-foreground line-clamp-6 text-sm leading-5.5 font-medium sm:line-clamp-4">
              {profile.description}
            </p>
          </div>

          <div className="flex h-9 w-full justify-end">
            <Button className="text-primary-foreground bg-primary hover:bg-primary/90 inline-flex cursor-pointer items-center justify-center rounded-md !px-4 py-2">
              Explore {profile.name}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
