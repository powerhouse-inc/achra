import { NetworkNavbar } from '@/modules/shared/components/navbar'
import { cn } from '@/shared/lib/utils'

export default function NetworkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Global page background gradient */}
      <div
        className={cn(
          'fixed inset-0 -z-1 max-h-[100vh] w-full',
          'bg-[radial-gradient(35.91%_31.42%_at_100%_50%,rgba(236,96,221,0.24)_0%,rgba(253,180,255,0.24)_50%,rgba(253,180,255,0.00)_100%)]',
          'dark:bg-[radial-gradient(70.6%_33.68%_at_100%_50%,rgba(236,96,221,0.24)_0%,rgba(253,180,255,0.24)_50%,rgba(253,180,255,0.00)_100%)] dark:opacity-20',
        )}
      />
      <NetworkNavbar />
      <div className="pt-18 sm:pt-24.5">{children}</div>
    </>
  )
}
