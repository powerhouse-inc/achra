import Link from 'next/link'
import { Button } from '@/modules/shared/components/ui/button'

function ServicesRecommendationCta() {
  return (
    <section className="bg-primary/5 mt-4 rounded-2xl p-6 sm:p-8 lg:p-10">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-foreground text-lg font-bold sm:text-xl">Not sure where to start?</h2>
          <p className="text-muted-foreground text-sm">
            Tell us about your organization and we&apos;ll recommend the right services for you.
          </p>
        </div>
        <Button asChild variant="outline" size="lg" className="shrink-0">
          <Link href="#">Get a Recommendation</Link>
        </Button>
      </div>
    </section>
  )
}

export { ServicesRecommendationCta }
