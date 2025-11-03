import { NetworkHomepageSections, SCROLL_MT_CLASSES } from '@/modules/shared/config/constants'
import { cn } from '@/modules/shared/lib/utils'
import { encodeSectionId } from '../../../shared/components/section-activation/section-id-utils'
import { SectionTitle } from '../section-title'
import { BuilderTeams } from './components/builder-teams/builder-teams'

export function BuildersSection() {
  return (
    <section
      className={cn('flex w-full flex-col gap-6', SCROLL_MT_CLASSES)}
      id={encodeSectionId(NetworkHomepageSections.Builders)}
    >
      <SectionTitle title="Builders" hash="builders" />
      <BuilderTeams />
    </section>
  )
}
