import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface NetworkPageProps {
  params: Promise<{ slug: string }>
}

export default async function NetworkPage({ params }: NetworkPageProps) {
  const { slug } = await params

  return (
    <main className="flex min-h-[calc(100dvh-8rem)] items-center justify-center px-6">
      <div className="space-y-3 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-indigo-800 sm:text-5xl">
          Achra - {slug}
        </h1>
        <p className="text-muted-foreground sm:text-md text-base">Coming soon</p>
        <div className="flex h-9 w-full justify-center">
          <Link
            href={`/network/${slug}/roadmap`}
            className="text-primary-foreground bg-primary hover:bg-primary/90 inline-flex items-center justify-center rounded-md px-4 py-2"
          >
            View Roadmap
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}
