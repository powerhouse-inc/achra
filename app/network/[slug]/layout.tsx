import { NetworkNavbar } from '@/modules/shared/components/navbar'

export default function NetworkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NetworkNavbar />
      <div className="pt-18 sm:pt-24.5">{children}</div>
    </>
  )
}
