import { NetworkNavbar } from '@/modules/shared/components/navbar'

export default function NetworkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NetworkNavbar />
      <div className="pt-18 md:pt-21">{children}</div>
    </>
  )
}
