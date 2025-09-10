import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/modules/shared/components/ui/card'
import { type RouteWithDynamicPages } from '@/modules/shared/types/routes'
import { type ChipVariant } from '../types'
import NetworkChip from './network-chips'

interface NetworkCardProps {
  isotype: React.ReactNode
  logotype?: React.ReactNode
  title?: string | React.ReactNode
  tag: string
  description: string
  buttonText: string
  backgroundImage: string
  href: RouteWithDynamicPages
  variant: ChipVariant
}

export function NetworkCard({
  isotype,
  title,
  tag,
  description,
  buttonText,
  backgroundImage,
  href,
  variant,
  logotype,
}: NetworkCardProps) {
  const cardStyle = {
    backgroundImage: `linear-gradient(180deg, #FFF 31.73%, rgba(255, 255, 255, 0.40) 91.35%), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    boxShadow: '1px 4px 15px 0 rgba(74, 88, 115, 0.25)',
    gap: 0,
  }

  const buttonStyles =
    'text-primary-foreground bg-primary hover:bg-primary/90 inline-flex items-center justify-center rounded-md !px-4 py-2 cursor-pointer'

  return (
    <Link href={href} className="h-full">
      <Card className="flex h-64 flex-col p-4 sm:p-6" style={cardStyle}>
        <CardHeader className="gap-0 p-0">
          <div className="flex h-8 items-center justify-between sm:h-8 md:h-10">
            <CardTitle className="flex items-center gap-2">
              {logotype ? (
                <div className="flex items-center gap-1.5 md:gap-2">
                  {isotype} {logotype}
                </div>
              ) : (
                <div className="flex items-center">{isotype}</div>
              )}
              <div className="text-accent-foreground md:text-lead flex w-full items-center text-2xl">
                {title}
              </div>
            </CardTitle>
            <NetworkChip variant={variant}>{tag}</NetworkChip>
          </div>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col justify-between p-0 pt-0">
          <div className="mt-2 flex flex-col">
            <p className="text-foreground text-sm leading-5.5 font-medium">{description}</p>
          </div>

          <div className="flex h-9 w-full justify-end">
            <Button className={buttonStyles}>
              {buttonText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
