import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/modules/shared/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/modules/shared/components/ui/card'
import { type RouteWithDynamicPages } from '@/modules/shared/types/routes'

interface NetworkCardProps {
  isotype: React.ReactNode
  title: string
  tag: string
  tagColor: string
  description: string
  buttonText: string
  backgroundImage: string
  href: RouteWithDynamicPages
  titleColor: string
}

export function NetworkCard({
  isotype,
  title,
  tag,
  tagColor,
  description,
  buttonText,
  backgroundImage,
  href,
  titleColor,
}: NetworkCardProps) {
  const cardStyle = {
    backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.7) 31.73%, rgba(255, 255, 255, 0.40) 91.35%), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    boxShadow: '1px 4px 15px 0 rgba(74, 88, 115, 0.25)',
    gap: 0,
  }

  return (
    <Card className="flex h-64 flex-col p-4 md:p-6" style={cardStyle}>
      <CardHeader className="gap-0 p-0">
        <div className="flex h-10 items-center justify-between sm:h-8 md:h-10">
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-6 w-6 md:h-8 md:w-8">{isotype}</div>
            <div className="text-accent-foreground md:text-lead flex w-full items-center text-2xl">
              {title}
            </div>
          </CardTitle>
          <Badge variant="secondary" className={`${titleColor} ${tagColor}`}>
            {tag}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-between p-0 pt-0">
        <div className="mt-2 flex flex-col">
          <p className="text-foreground text-sm font-medium">{description}</p>
        </div>

        <div className="flex h-9 w-full justify-end">
          <Link
            href={href}
            className="text-primary-foreground bg-primary hover:bg-primary/90 inline-flex items-center justify-center rounded-md px-4 py-2"
          >
            {buttonText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
