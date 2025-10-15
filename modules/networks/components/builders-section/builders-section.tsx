import { SectionTitle } from '../section-title'
import { BuilderTeams } from './components/builder-teams/builder-teams'

export function BuildersSection() {
  return (
    <section className="flex w-full flex-col gap-6">
      <SectionTitle title="Builders" hash="builders" />
      <BuilderTeams />
    </section>
  )
}
