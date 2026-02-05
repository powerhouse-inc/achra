import Link from 'next/link'
import { Suspense } from 'react'
import {
  HomepageBanner,
  HomepageBannerSkeleton,
} from '@/modules/networks/components/homepage-banner'
import { PageContent } from '@/modules/shared/components/page-containers'
import { Button } from '@/modules/shared/components/ui/button'

interface NetworkPageProps {
  params: Promise<{ slug: string }>
}

export default async function NetworkPage({ params }: NetworkPageProps) {
  const { slug } = await params

  return (
    <PageContent className="gap-8">
      <Suspense fallback={<HomepageBannerSkeleton />}>
        <HomepageBanner
          backgroundImage="/networks/backgrounds/powerhouse.png"
          title="Powerhouse Dashboard"
          description="Lorem ipsum dolor sit amet consectetur. In et sed malesuada ornare bibendum nisl egestas. Tellus semper facilisis elit mauris aliquam. Venenatis nunc sapien duis adipiscing proin mauris. Amet sed mauris natoque nisi porttitor montes. Elit vel euismod quis."
        />
      </Suspense>
      <Button asChild className="w-fit">
        <Link href={`/network/${slug}/builders`}>Go to builders</Link>
      </Button>
    </PageContent>
  )
}
