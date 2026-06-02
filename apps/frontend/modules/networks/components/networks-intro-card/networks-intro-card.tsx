import { Card, CardContent } from '@/modules/shared/components/ui/card'

function NetworksIntroCard() {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center">
        <p className="text-foreground max-w-4xl py-6 text-center text-base/6 font-semibold sm:text-2xl sm:leading-[120%] sm:font-bold">
          Networks are <span className="text-primary">ecosystems</span> of talent, technology, and
          operational intelligence. On <span className="text-primary">Achra</span>, networks of
          like-minded builders, operators, and AI agents can coordinate to{' '}
          <span className="text-primary">achieve common goals</span> and{' '}
          <span className="text-primary">run their own platforms</span>.
        </p>
      </CardContent>
    </Card>
  )
}

export { NetworksIntroCard }
