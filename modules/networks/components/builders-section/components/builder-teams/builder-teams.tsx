import { BuilderTeamsList } from './components/builder-teams-list/builder-teams-list'

interface BuilderTeamsProps {
  className?: string
}

export function BuilderTeams({ className }: BuilderTeamsProps) {
  // Backend requests will be implemented here

  return <BuilderTeamsList className={className} />
}
