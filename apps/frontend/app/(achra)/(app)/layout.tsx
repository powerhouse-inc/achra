import { cn } from '@achra/ui/lib/utils'

export default function AchraAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Global page background gradient (marketing pages opt out via the (marketing) group) */}
      <div
        className={cn(
          'fixed inset-0 -z-1 max-h-dvh w-full',
          'bg-[radial-gradient(35.91%_31.42%_at_100%_50%,rgba(236,96,221,0.24)_0%,rgba(253,180,255,0.24)_50%,rgba(253,180,255,0.00)_100%)]',
          'dark:bg-[radial-gradient(70.6%_33.68%_at_100%_50%,rgba(236,96,221,0.24)_0%,rgba(253,180,255,0.24)_50%,rgba(253,180,255,0.00)_100%)] dark:opacity-20',
        )}
      />
      {children}
    </>
  )
}
