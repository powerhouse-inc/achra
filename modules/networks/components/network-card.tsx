import { Card, CardContent, CardHeader, CardTitle } from '@/modules/shared/components/ui/card'
import { Badge } from '@/modules/shared/components/ui/badge'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface NetworkCardProps {
  isotype: React.ReactNode
  title: string
  tag: string
  tagColor: string
  description: string
  buttonText: string
  backgroundImage: string
  href: string
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
}: NetworkCardProps) {
  const cardStyle = {
    backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.7) 31.73%, rgba(255, 255, 255, 0.40) 91.35%), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    gap: 0,
  }

  return (
    <Card className="flex h-64 flex-col p-4 md:p-6" style={cardStyle}>
      <CardHeader className="p-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 md:h-9 md:w-9">{isotype}</div>
            <div className="text-accent-foreground flex w-full items-center text-2xl md:text-3xl">
              {title}
            </div>
          </CardTitle>
          <Badge
            variant="secondary"
            className={`text-foreground ${tagColor}`}
          >
            {tag}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-between p-0 pt-0">
        <div className="flex flex-col mt-2">
          <p className="text-foreground text-sm font-medium">{description}</p>
        </div>

        <div className="flex w-full justify-end">
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
