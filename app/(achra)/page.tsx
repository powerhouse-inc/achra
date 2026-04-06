import { HomeHero } from '@/modules/home/components/home-hero'
import { PageContent } from '@/modules/shared/components/page-containers'

export default function HomePage() {
  return (
    <main className="-mt-18 sm:-mt-24.5">
      <HomeHero />
      <PageContent as="div">
        <p className="text-muted-foreground text-lg">TBD</p>
      </PageContent>
    </main>
  )
}
