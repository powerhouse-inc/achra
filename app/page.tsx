import { ThemeToggle } from '@/shared/components/theme-toggle'

export default function Home() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-6">
      <div className="space-y-3 text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Achra</h1>
        <p className="text-muted-foreground text-base sm:text-lg">Coming soon</p>
        <ThemeToggle />
      </div>
    </main>
  )
}
