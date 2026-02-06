import { encodeSectionId } from '@/modules/shared/components/section-activation'
import { SectionTitle } from '@/modules/shared/components/section-title'
import { NetworkHomepageSections, SCROLL_MT_CLASSES } from '@/modules/shared/config/constants'
import { cn } from '@/modules/shared/lib/utils'

import { Builders } from './components/builders/builders'

export function BuildersSection() {
  return (
    <section
      className={cn('flex w-full flex-col gap-6', SCROLL_MT_CLASSES)}
      id={encodeSectionId(NetworkHomepageSections.Builders)}
    >
      <SectionTitle title="Builders" hash="builders" />
      <Builders />
    </section>
  )
}
