import { ThemeToggle } from '../theme-toggle'

export function Navbar() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="text-2xl font-bold">Achra</div>
        <ThemeToggle />
      </div>
    </header>
  )
}
