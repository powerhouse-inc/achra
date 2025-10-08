import { ExternalLink } from './components/external-link/external-link'

export function ExternalLinks() {
  return (
    <div className="align-center flex flex-col gap-4 sm:flex-row md:gap-6">
      <ExternalLink
        href="https://sky-atlas.powerhouse.io/"
        imageSrc="/networks/logos/atlas.png"
        name="Powerhouse Atlas"
        description="Launch Atlas Explorer"
      />
      <ExternalLink
        href="https://vote.sky.money/"
        imageSrc="/networks/logos/sky-vote.png"
        name="Sky Vote"
        description="Launch Sky Vote"
      />
    </div>
  )
}
