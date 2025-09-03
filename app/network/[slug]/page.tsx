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
      </div>
    </main>
  )
}
