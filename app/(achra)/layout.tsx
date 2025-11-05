import { AchraNavbar } from '@/modules/shared/components/navbar'

export default function AchraLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AchraNavbar />
      <div className="pt-18 md:pt-21">{children}</div>
    </>
  )
}
